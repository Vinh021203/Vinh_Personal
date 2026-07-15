"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, LayoutTemplate, Palette, Rocket, Search, Sparkles, Zap } from "lucide-react";

const services = [
  { number: "01", icon: Code2, title: "Web Development", description: "Xây dựng website hiệu năng cao với React và Next.js. Code sạch, dễ bảo trì và sẵn sàng mở rộng.", features: ["React / Next.js", "TypeScript", "API & Database", "CMS Integration"] },
  { number: "02", icon: Palette, title: "UI/UX Design", description: "Thiết kế giao diện hiện đại, tập trung vào trải nghiệm người dùng và hiệu quả chuyển đổi.", features: ["Figma Design", "User Research", "Wireframing", "Prototyping"], featured: true },
  { number: "03", icon: Search, title: "SEO & Marketing", description: "Tối ưu công cụ tìm kiếm, cải thiện khả năng tiếp cận và xây dựng tăng trưởng bền vững.", features: ["Keyword Research", "On-page SEO", "Technical Audit", "Content Strategy"] },
];

const stats = [
  { value: "50+", label: "Dự án đã giao", icon: Rocket },
  { value: "98%", label: "Khách hàng hài lòng", icon: Sparkles },
  { value: "24/7", label: "Hỗ trợ", icon: Zap },
];

export const ServiceSection = () => (
  <section id="services" className="relative overflow-hidden bg-[#fff8e9] pt-16 md:pt-24">
    <div className="pointer-events-none absolute -right-32 top-12 h-[480px] w-[480px] rounded-full bg-orange-100/50 blur-[100px]"/>
    <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
      <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
        <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-amber-500 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-amber-700"><LayoutTemplate size={14}/>Giải pháp từ ý tưởng đến vận hành</span>
        <h2 className="mt-6 text-4xl font-black leading-[.95] tracking-[-.05em] text-zinc-950 sm:text-6xl">Giải pháp công nghệ<br/><span className="text-[#d98200]">Đột phá &amp; Hiệu quả</span></h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-600 md:text-base">Không chỉ là viết code, chúng tôi mang đến giải pháp số giúp doanh nghiệp tăng trưởng, tối ưu vận hành và chinh phục khách hàng.</p>
      </header>

      <div className="grid gap-7 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article key={service.number} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}} className={`service-editorial-card group relative flex flex-col border border-zinc-900 p-6 transition-transform duration-300 hover:-translate-y-2 md:p-8 ${service.featured ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"}`}>
            {service.featured && <span className="absolute right-5 top-5 border border-[#ffb21c] px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[#ffb21c]">Phổ biến</span>}
            <span className={`absolute right-6 top-16 text-6xl font-black leading-none ${service.featured ? "text-white/5" : "text-zinc-100"}`}>{service.number}</span>
            <span className="mb-7 grid h-14 w-14 place-items-center border border-zinc-900 bg-[#ffb21c] text-zinc-950"><service.icon size={25}/></span>
            <h3 className={`text-2xl font-black tracking-[-.03em] ${service.featured ? "text-white" : "text-zinc-950"}`}>{service.title}</h3>
            <p className={`mt-4 min-h-[72px] text-sm leading-6 ${service.featured ? "text-zinc-300" : "text-zinc-600"}`}>{service.description}</p>
            <ul className={`my-7 grid grid-cols-2 gap-x-3 gap-y-3 border-y py-6 ${service.featured ? "border-white/20" : "border-zinc-300"}`}>
              {service.features.map(feature => <li key={feature} className={`flex items-center gap-2 text-[11px] font-bold ${service.featured ? "text-zinc-300" : "text-zinc-600"}`}><span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${service.featured ? "bg-[#ffb21c] text-zinc-950" : "bg-amber-100 text-amber-700"}`}><Check size={12} strokeWidth={3}/></span>{feature}</li>)}
            </ul>
            <Link href="/contact" className={`group/link mt-auto inline-flex items-center justify-between text-xs font-black uppercase tracking-wide ${service.featured ? "text-[#ffb21c]" : "text-zinc-950"}`}>Tư vấn ngay <ArrowRight size={17} className="transition-transform group-hover/link:translate-x-1"/></Link>
          </motion.article>
        ))}
      </div>
    </div>

    <div className="mt-16 border-y border-zinc-900 bg-zinc-950 text-white md:mt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-3 md:grid-cols-[1fr_1fr_1fr_auto]">
        {stats.map((stat,index) => <div key={stat.label} className={`flex flex-col items-center justify-center gap-2 px-2 py-6 text-center sm:flex-row sm:gap-4 sm:px-6 sm:text-left ${index < stats.length-1 ? "border-r border-white/20" : "md:border-r md:border-white/20"}`}><stat.icon size={18} className="text-[#ffb21c] sm:size-[22px]"/><div><strong className="block text-2xl font-black text-white sm:text-3xl">{stat.value}</strong><span className="block text-[7px] font-bold uppercase leading-tight tracking-[.12em] text-zinc-400 sm:text-[9px] sm:tracking-[.16em]">{stat.label}</span></div></div>)}
        <Link href="/contact" className="group col-span-3 flex items-center justify-center gap-3 border-t border-zinc-900 bg-[#ffb21c] px-9 py-5 text-xs font-black uppercase tracking-wide text-zinc-950 transition-colors hover:bg-white md:col-span-1 md:border-t-0">Bắt đầu ngay <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/></Link>
      </div>
    </div>
    <style jsx global>{`.boston-home .service-editorial-card{box-shadow:6px 6px 0 rgba(24,24,27,.16)!important}.boston-home .service-editorial-card:hover{box-shadow:6px 6px 0 #ffb21c!important}`}</style>
  </section>
);
