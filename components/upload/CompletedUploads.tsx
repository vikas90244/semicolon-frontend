"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { BiErrorCircle, BiDownload } from "react-icons/bi";
import { LuRefreshCw } from "react-icons/lu";

interface CompletedUpload {
  upload_id: string;
  filename: string;
  size: number;
  created_at: string;
  status: string;
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CompletedUploads() {
  const [uploads, setUploads] = useState<CompletedUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient<{ uploads: CompletedUpload[] }>("/api/upload/list/");
      setUploads(data.uploads);
    } catch {
      setError("Failed to load uploads.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleDownload = async (uploadId: string, filename: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const downloadUrl = `${backendUrl}/api/upload/download/${uploadId}/`;
      
      // Fetch with credentials to send cookies
      const response = await fetch(downloadUrl, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      // Get the blob and create a download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file');
    }
  };

  if (loading) {
    return (
      <div className="mt-10 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-zinc-800/60 animate-pulse" />
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
        No completed uploads yet.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-300">
          Your uploads
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
        {uploads.map((upload) => (
          <li
            key={upload.upload_id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 flex items-center justify-between"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-200">
                {upload.filename}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {formatBytes(upload.size)} · {formatDate(upload.created_at)}
              </p>
            </div>
            
            <button
              onClick={() => handleDownload(upload.upload_id, upload.filename)}
              className="ml-4 flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              <BiDownload size={14} />
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
