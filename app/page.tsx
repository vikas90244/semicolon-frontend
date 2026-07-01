import Link from "next/link";

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto py-28 px-6">
      {/* Hero */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        inspired by tus · resumable uploads
      </div>

      <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
        Upload files.<br />
        <span className="text-zinc-500">Even on bad networks.</span>
      </h1>

      <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
        A file upload service that handles interruptions gracefully. Files split into 1MB chunks and upload sequentially. If your connection drops, resume from where you left off.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/home"
          className="bg-zinc-100 text-zinc-900 font-medium px-5 py-2.5 rounded-md hover:bg-white transition-colors text-sm text-center"
        >
          Try demo
        </Link>
        <a
          href="https://github.com/vikas90244/semicolon"
          target="_blank"
          rel="noreferrer"
          className="border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-medium px-5 py-2.5 rounded-md transition-colors text-sm text-center"
        >
          View source ↗
        </a>
      </div>

      {/* How it works */}
      <div className="mt-24 border-t border-zinc-800 pt-16 space-y-10">
        <p className="text-xs uppercase tracking-widest text-zinc-600">How it works</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Step n="01" title="Split into chunks" desc="Files are split into 1MB pieces. Each chunk uploaded with its offset position (e.g., 0MB, 1MB, 2MB...)." />
          <Step n="02" title="Track progress" desc="Backend tracks upload position in database. If connection fails, client resumes from last successful offset." />
          <Step n="03" title="Write at offset" desc="Server uses file.seek() to write each chunk at the correct position. No reassembly needed." />
        </div>
      </div>

      {/* What it is / isn't */}
      <div className="mt-20 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-sm text-zinc-400 leading-relaxed space-y-4">
        <div>
          <p className="text-zinc-200 font-medium mb-2">What this is</p>
          <p>
            A portfolio project demonstrating chunked resumable uploads with Django REST Framework and Next.js. 
            Supports files up to 500MB with automatic retry logic and real-time progress tracking.
          </p>
        </div>
        <div>
          <p className="text-zinc-200 font-medium mb-2">What this isn't</p>
          <p>
            Not production-ready at scale. Uses local file storage (not S3), no virus scanning, no multi-file uploads. 
            Built for learning and demonstrating the core concepts.
          </p>
        </div>
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
