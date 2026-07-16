"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Code2, Palette, Zap } from "lucide-react";

const strengths = [
  { number: "01", icon: Code2, title: "Clean Code", detail: "Dễ mở rộng" },
  { number: "02", icon: Palette, title: "Modern UI", detail: "Đúng nhận diện" },
  { number: "03", icon: Zap, title: "Fast & SEO", detail: "Tối ưu hiệu suất" },
];

export const HeroSection = () => (
  <section className="relative overflow-hidden border-b border-zinc-900 bg-white py-16 md:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <div className="mb-7 inline-flex rotate-[-4deg] border border-amber-500 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">
          Digital studio
        </div>
        <h1 className="max-w-xl text-5xl font-black leading-[.94] tracking-[-.055em] text-zinc-950 sm:text-6xl xl:text-7xl">
          We build digital
          <br />
          <span className="relative">
            experiences
            <svg className="absolute -bottom-3 left-0 h-3 w-full text-[#ffad0a]" viewBox="0 0 200 12" preserveAspectRatio="none">
              <path d="M2 8 Q100 1 198 7" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="mt-8 max-w-lg text-sm leading-7 text-zinc-600">
          Thiết kế và phát triển website hiện đại, rõ ràng và hiệu quả — từ ý tưởng đầu tiên đến sản phẩm vận hành thực tế.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/projects" className="group inline-flex min-w-[170px] items-center justify-between gap-5 border border-zinc-900 bg-[#ffb21c] px-6 py-3.5 text-xs font-black shadow-[4px_4px_0_#18181b] transition-transform hover:-translate-y-1">
            Xem dự án <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/contact" className="group inline-flex min-w-[190px] items-center justify-between gap-5 border border-zinc-900 bg-white px-6 py-3.5 text-xs font-black transition-colors hover:bg-zinc-950 hover:text-white">
            Bắt đầu dự án <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-11 grid max-w-xl grid-cols-3 border border-zinc-900">
          {strengths.map((item, index) => (
            <div key={item.title} className={`hero-feature group relative bg-white p-3 transition-colors hover:bg-[#fff2d4] sm:p-5 ${index < strengths.length - 1 ? "border-r border-zinc-900" : ""}`}>
              <span className="absolute right-1.5 top-1.5 text-[7px] font-black tracking-wider text-zinc-500 group-hover:text-[#9a4f00] sm:right-3 sm:top-2 sm:text-[9px]">{item.number}</span>
              <span className="mb-3 grid h-8 w-8 shrink-0 place-items-center border border-zinc-900 bg-[#ffb21c] sm:mb-4 sm:h-9 sm:w-9"><item.icon size={15} /></span>
              <div>
                <p className="text-[8px] font-black uppercase leading-tight tracking-wide text-zinc-950 sm:text-[11px]">{item.title}</p>
                <p className="mt-1 text-[8px] leading-tight text-zinc-500 sm:text-[10px]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[620px]">
        <div className="absolute -left-5 -top-5 h-16 w-16 border-l-2 border-t-2 border-[#ffad0a]" />
        <div className="border border-zinc-900 bg-[#fff9ed] p-3 shadow-[10px_10px_0_#ffb21c]">
          <div className="mb-3 flex items-center justify-between border-b border-zinc-900 pb-3">
            <span className="text-[10px] font-black uppercase tracking-[.15em]">Creative developer</span>
            <div className="flex gap-2"><i className="h-2 w-2 rounded-full bg-zinc-950" /><i className="h-2 w-2 rounded-full bg-[#ffad0a]" /></div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#f3e7d2]">
            <Image src="/me.jpg" alt="VinhWorks developer" fill priority sizes="(max-width: 1024px) 100vw, 620px" className="object-cover object-center grayscale-[15%]" />
            <div className="absolute bottom-4 left-4 border border-zinc-900 bg-white px-4 py-3 text-xs font-black shadow-[3px_3px_0_#18181b]">AVAILABLE FOR WORK · 2026</div>
          </div>
        </div>
        <div className="absolute -bottom-7 -right-3 rotate-3 border border-zinc-900 bg-zinc-950 px-5 py-3 text-xs font-black text-white shadow-[3px_3px_0_#ffb21c]">NEXT.JS / UI·UX</div>
      </div>
    </div>
  </section>
);
