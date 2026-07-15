"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex min-h-14 items-center justify-center gap-3 border border-zinc-950 bg-white px-7 py-4 text-[11px] font-black uppercase tracking-[.12em] text-zinc-950 shadow-[4px_4px_0_rgba(24,24,27,.18)] transition-all hover:-translate-y-1 hover:bg-zinc-950 hover:text-white"
    >
      <ArrowLeft size={18} />
      Quay lại
    </button>
  );
}
