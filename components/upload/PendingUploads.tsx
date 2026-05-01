"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPendingUploads, resumeUpload } from "./upload";
import { PendingUpload } from "./type";
import { BiErrorCircle } from "react-icons/bi";
import { LuRefreshCw, LuUpload } from "react-icons/lu";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function UploadCard({ upload, onDone }: { upload: PendingUpload; onDone: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(
    upload.size > 0 ? Math.round((upload.offset / upload.size) * 100) : 0
  );
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(upload.status === "COMPLETED");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setError(null);
    if (f && f.name !== upload.filename) {
      setError(`File must be "${upload.filename}"`);
      return;
    }
    setFile(f);
  }

  async function handleResume() {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await resumeUpload(file, upload.upload_id, upload.offset);
      setProgress(100);
      setDone(true);
      setTimeout(onDone, 800);
    } catch {
      setError("Resume failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <li className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-4 space-y-3">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-200">{upload.filename}</p>
          <p className="mt-0.5 text-xs text-zinc-500">
            {formatBytes(upload.offset)} of {formatBytes(upload.size)} · {formatDate(upload.created_at)}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium
          ${done
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : "border-amber-500/30 bg-amber-500/10 text-amber-400"}`}>
          {done ? "COMPLETED" : upload.status}
        </span>
      </div>

      {/* progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-right text-xs text-zinc-600">{progress}%</p>

      {/* file picker + resume */}
      {!done && (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-1 truncate rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-left text-xs text-zinc-400 hover:bg-zinc-700 transition-colors"
          >
            {file ? file.name : "Select file to resume…"}
          </button>
          <button
            onClick={handleResume}
            disabled={!file || uploading}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <LuUpload size={12} />
            {uploading ? "Resuming…" : "Resume"}
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400">
          <BiErrorCircle size={14} /> {error}
        </div>
      )}
    </li>
  );
}

export default function PendingUploads() {
  const [uploads, setUploads] = useState<PendingUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setUploads(await fetchPendingUploads());
    } catch {
      setError("Failed to load pending uploads.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="mt-10 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-zinc-800/60 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        <BiErrorCircle size={18} /> {error}
      </div>
    );
  }

  if (uploads.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-10 text-center text-sm text-zinc-500">
        No interrupted uploads. You&apos;re all caught up.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-300">
          Interrupted uploads
          <span className="ml-2 rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
            {uploads.length}
          </span>
        </p>
        <button
          onClick={load}
          className="flex items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 transition-colors"
        >
          <LuRefreshCw size={12} /> Refresh
        </button>
      </div>

      <ul className="space-y-3">
        {uploads.map((u) => (
          <UploadCard key={u.upload_id} upload={u} onDone={load} />
        ))}
      </ul>
    </div>
  );
}
