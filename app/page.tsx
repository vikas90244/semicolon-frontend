// import LoginBtn from "@/components/auth/login-btn";
// export default function Home() {
//   return (
//     <main style={{ padding: "2rem" }}>
//       <LoginBtn />
//     </main>
//   )
// }

import React from "react";
import Image from "next/image";
import icon from "./icon.svg";

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto py-20">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-3 mb-6">
            <Image src={icon} alt="semicolon" width={48} height={48} />
            <span className="text-2xl font-bold text-zinc-200">semicolon</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            Beautiful, fast file uploads — built for developers
          </h1>

          <p className="mt-6 text-lg text-zinc-300 max-w-2xl">
            A lightweight, tus-inspired resumable upload engine focused on
            streamlining reliable chunked uploads. It implements a small,
            custom resumable protocol (tus-inspired) that makes it easy to
            resume interrupted transfers, retry failed chunks, and integrate
            with minimal client code.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-4 py-2 rounded-md shadow-md"
            >
              Get started
            </a>

            <a
              href="https://github.com/vikas90244/semicolon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/10 text-white/90 px-4 py-2 rounded-md hover:bg-white/5"
            >
              View repository
            </a>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/2 p-6 border border-white/5 shadow-lg">
            <div className="bg-gradient-to-r from-violet-500 via-pink-500 to-emerald-400 p-1 rounded-xl">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-white font-semibold">Upload demo</h3>
                <p className="mt-2 text-sm text-zinc-400">This demo shows chunked, resumable uploads — the client uploads in parts, can retry failed chunks, and resumes from the last acknowledged offset.</p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded-md flex items-center justify-center text-2xl">📁</div>
                    <div>
                      <div className="text-sm text-zinc-300">Ready to upload (resumable)</div>
                      <div className="text-xs text-zinc-500">Chunked transfers · resume & retry support</div>
                    </div>
                  </div>

                  <button className="bg-rose-400 hover:bg-rose-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    Choose file
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Resumable by design" desc="Chunked uploads with resume and retry logic to survive flaky networks." />
        <Card title="tus-inspired protocol" desc="A small, interoperable resumable spec that’s easy to implement in clients and servers." />
        <Card title="Self-hostable" desc="Run the engine on your infrastructure — simple deployment, local control over files and retention." />
      </div>

    
    </section>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-white/6 p-6 bg-white/2">
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="mt-2 text-zinc-300 text-sm">{desc}</p>
    </div>
  );
}