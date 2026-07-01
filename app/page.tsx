import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto py-28 px-6">
      {/* Hero */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        tus protocol · resumable uploads
      </div>

      <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
        Upload files.<br />
        <span className="text-zinc-500">Even on bad networks.</span>
      </h1>

      <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
        semicolon is a simple self-hosted setup that brings resumable file uploads to your stack using the{" "}
        <a
          href="https://tus.io"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-200 underline underline-offset-4 hover:text-white transition-colors"
        >
          tus protocol
        </a>
        . Drop it in, point your client at it, and uploads survive interruptions automatically.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/home"
          className="bg-zinc-100 text-zinc-900 font-medium px-5 py-2.5 rounded-md hover:bg-white transition-colors text-sm text-center"
        >
          Try it out
        </Link>
        <a
          href="https://tus.io/protocols/resumable-upload"
          target="_blank"
          rel="noreferrer"
          className="border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-medium px-5 py-2.5 rounded-md transition-colors text-sm text-center"
        >
          tus spec ↗
        </a>
      </div>

      {/* How it works */}
      <div className="mt-24 border-t border-zinc-800 pt-16 space-y-10">
        <p className="text-xs uppercase tracking-widest text-zinc-600">How it works</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Step n="01" title="Pick a file" desc="Select any file from your device. Large files are split into chunks automatically." />
          <Step n="02" title="Upload resumes" desc="If the connection drops, the upload picks up from where it left off — no restart needed." />
          <Step n="03" title="File lands safely" desc="Once all chunks arrive, the server reassembles and stores the complete file." />
        </div>
      </div>

      {/* What it is / isn't */}
      <div className="mt-20 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-sm text-zinc-400 leading-relaxed">
        <p className="text-zinc-200 font-medium mb-2">What this is</p>
        <p>
          A minimal Django backend + Next.js frontend wired together with the tus resumable upload protocol.
          No SDKs, no magic — just a straightforward reference implementation you can run yourself.
        </p>
      </div>
    </section>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div>
      <span className="font-mono text-xs text-zinc-600">{n}</span>
      <h4 className="mt-2 text-zinc-100 font-medium">{title}</h4>
      <p className="mt-1 text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
