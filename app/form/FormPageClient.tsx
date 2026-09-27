"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, LoaderCircle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfVKUXPoOmp77kLffJWNofKhP4JAPkFlT1onk4lgIzafaX08A/viewform";
const EMBED_URL = `${GOOGLE_FORM_URL}?embedded=true`;

export default function FormPageClient() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-[#fff8e9] text-zinc-950">
      <header className="flex min-h-[72px] shrink-0 items-center justify-between gap-4 border-b-2 border-zinc-950 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            className="grid h-11 w-11 shrink-0 place-items-center border border-zinc-950 bg-white transition-colors hover:bg-[#ffb21c] focus:outline-none focus:ring-4 focus:ring-amber-300"
            aria-label="Quay về trang chủ"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </Link>
          <div className="hidden h-8 w-px bg-zinc-300 sm:block" />
          <BrandLogo priority className="hidden h-8 w-auto sm:block" />
          <div className="min-w-0 border-l-0 sm:border-l sm:border-zinc-300 sm:pl-4">
            <p className="truncate text-[10px] font-black uppercase tracking-[.18em] text-[#9a4f00]">VinhWorks</p>
            <h1 className="truncate text-sm font-black sm:text-base">Khảo sát trực tuyến</h1>
          </div>
        </div>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-zinc-950 bg-[#ffb21c] px-3 py-2 text-xs font-black shadow-[3px_3px_0_#18181b] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-300 sm:px-4"
        >
          <span className="hidden sm:inline">Mở trong Google Forms</span>
          <span className="sm:hidden">Mở riêng</span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </header>

      <section className="relative min-h-0 flex-1 overflow-hidden" aria-label="Biểu mẫu khảo sát">
        {isLoading && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-[#fff8e9]" role="status">
            <div className="flex items-center gap-3 border-2 border-zinc-950 bg-white px-5 py-4 font-bold shadow-[5px_5px_0_#ffb21c]">
              <LoaderCircle className="animate-spin" size={20} aria-hidden="true" />
              Đang tải khảo sát...
            </div>
          </div>
        )}
        <iframe
          src={EMBED_URL}
          title="Biểu mẫu khảo sát VinhWorks"
          className="block h-full w-full border-0"
          onLoad={() => setIsLoading(false)}
          allow="clipboard-write"
        >
          Đang tải biểu mẫu khảo sát.
        </iframe>
      </section>
    </main>
  );
}
