"use client";

import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { ArrowUpRight, Facebook, Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const navigation = [
  { label: "Trang chủ", href: "/" }, { label: "Giới thiệu", href: "/about" },
  { label: "Dịch vụ", href: "/services" }, { label: "Dự án", href: "/projects" },
  { label: "Bảng giá", href: "/pricing" },
];

const services = ["Website doanh nghiệp", "Landing Page", "Web Application", "UI/UX Design", "SEO & Performance"];

export const Footer = () => (
  <footer className="border-t border-zinc-900 bg-[#fff8e9] text-zinc-950">
    <div className="overflow-hidden border-b border-zinc-900 bg-zinc-950 py-3 text-white">
      <div className="footer-ticker flex w-max items-center text-[10px] font-black uppercase tracking-[.2em]">
        {[0,1].map(copy => <div key={copy} className="footer-ticker-group flex shrink-0 items-center justify-around">{["Available for selected projects", "Based in Vietnam", "Working worldwide"].map((item,index) => <span key={`${copy}-${index}`} className="flex shrink-0 items-center gap-8 px-8"><i className="h-2 w-2 rounded-full bg-[#ffb21c]"/>{item}</span>)}</div>)}
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_.7fr_.7fr_1fr] lg:gap-10">
        <div>
          <Link href="/" aria-label="VinhWorks - Trang chủ" className="mb-5 inline-flex lg:mb-7">
            <BrandLogo className="h-10 w-auto" />
          </Link>
          <span className="inline-flex rotate-[-3deg] border border-zinc-900 bg-white px-3 py-1.5 text-[8px] font-black uppercase tracking-[.18em] shadow-[3px_3px_0_#ffb21c] lg:text-[9px]">Let&apos;s work together</span>
          <h2 className="mt-6 max-w-xl text-3xl font-black leading-[.95] tracking-[-.05em] sm:text-5xl lg:mt-7">Biến ý tưởng thành<br/><span className="text-[#d98200]">sản phẩm giá trị.</span></h2>
          <p className="mt-4 max-w-md text-xs leading-6 text-zinc-600 sm:text-sm sm:leading-7 lg:mt-5">Thiết kế và phát triển những trải nghiệm số rõ ràng, hiệu quả và sẵn sàng tăng trưởng cùng doanh nghiệp.</p>
          <Link href="/contact" className="group mt-5 inline-flex items-center gap-4 border border-zinc-900 bg-[#ffb21c] px-5 py-3 text-[10px] font-black uppercase tracking-wide shadow-[4px_4px_0_#18181b] transition-transform hover:-translate-y-1 lg:mt-7 lg:px-6 lg:py-3.5 lg:text-xs">Bắt đầu dự án <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></Link>
        </div>

        <div>
          <FooterTitle index="01">Khám phá</FooterTitle>
          <nav className="grid grid-cols-2 gap-x-5 lg:grid-cols-1 lg:gap-0">
            {navigation.map(item => <Link key={item.href} href={item.href} className="group flex items-center justify-between border-b border-zinc-300 py-3 text-sm font-bold"><span className="transition-colors group-hover:text-[#d98200]">{item.label}</span><ArrowUpRight size={13} className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"/></Link>)}
          </nav>
        </div>

        <div className="hidden lg:block">
          <FooterTitle index="02">Chuyên môn</FooterTitle>
          <ul>{services.map((service,index) => <li key={service} className="flex gap-3 border-b border-zinc-300 py-3 text-sm text-zinc-600"><span className="text-[10px] font-black text-[#d98200]">0{index+1}</span>{service}</li>)}</ul>
        </div>

        <div>
          <FooterTitle index="03">Liên hệ</FooterTitle>
          <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            <a href="tel:0971386588" className="group flex items-center gap-3 font-black"><span className="grid h-9 w-9 place-items-center border border-zinc-900 bg-white group-hover:bg-[#ffb21c]"><Phone size={15}/></span>0971 386 588</a>
            <a href="mailto:contact@vinhwork.io.vn" className="group flex items-center gap-3"><span className="grid h-9 w-9 place-items-center border border-zinc-900 bg-white group-hover:bg-[#ffb21c]"><Mail size={15}/></span><span className="break-all">contact@vinhwork.io.vn</span></a>
            <a href="https://webgiare.id.vn" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 font-bold"><span className="grid h-9 w-9 shrink-0 place-items-center border border-zinc-900 bg-white group-hover:bg-[#ffb21c]"><Globe size={15}/></span><span>webgiare.id.vn</span><ArrowUpRight size={13} className="text-[#d98200] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></a>
            <p className="flex items-start gap-3 leading-6"><span className="grid h-9 w-9 shrink-0 place-items-center border border-zinc-900 bg-white"><MapPin size={15}/></span><span className="pt-1">Hạ Long, Quảng Ninh<br/>Việt Nam</span></p>
          </div>
          <div className="mt-5 flex gap-2 lg:mt-7">
            {[{Icon:Facebook,label:"Facebook"},{Icon:Linkedin,label:"LinkedIn"},{Icon:Github,label:"GitHub"}].map(({Icon,label}) => <a key={label} href="#" aria-label={label} className="grid h-10 w-10 place-items-center border border-zinc-900 bg-white transition-all hover:-translate-y-1 hover:bg-[#ffb21c] hover:shadow-[2px_2px_0_#18181b]"><Icon size={16}/></a>)}
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-zinc-300 pt-4 text-[9px] font-black uppercase tracking-[.12em] text-zinc-500 lg:mt-7 lg:pt-5 lg:text-[10px]"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"/><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"/></span>Đang nhận dự án mới</div>
        </div>
      </div>
    </div>

    <div className="border-t border-zinc-900 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[9px] font-bold uppercase tracking-[.14em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} VinhWorks. All rights reserved.</p>
        <div className="flex flex-wrap gap-5"><span>Built with Next.js</span><span>Designed in Vietnam</span></div>
      </div>
    </div>

    <style jsx global>{`@keyframes footerTicker{to{transform:translateX(-50%)}}.footer-ticker-group{min-width:100vw}.footer-ticker{animation:footerTicker 22s linear infinite;will-change:transform}@media(prefers-reduced-motion:reduce){.footer-ticker{animation-play-state:paused}}`}</style>
  </footer>
);

const FooterTitle = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <h3 className="mb-5 flex items-center justify-between border-b border-zinc-900 pb-3 text-[11px] font-black uppercase tracking-[.16em]"><span>{children}</span><span className="text-[#d98200]">{index}</span></h3>
);
