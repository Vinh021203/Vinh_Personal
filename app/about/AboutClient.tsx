"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Download, Gauge, Heart, Layers3, Lightbulb, Mail, MapPin, Palette, Search, ShieldCheck, Sparkles, UserRound, Workflow } from "lucide-react";
import { SiMongodb, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

const capabilities = [
  { number:"01", icon:Code2, title:"Phát triển Web", text:"Website và web app nhanh, ổn định, dễ mở rộng với Next.js và TypeScript.", tags:["Next.js","React","API"] },
  { number:"02", icon:Palette, title:"UI/UX thực dụng", text:"Giao diện rõ ràng, đúng nhận diện và tập trung vào hành vi người dùng.", tags:["Figma","Responsive","Design System"] },
  { number:"03", icon:Gauge, title:"Hiệu suất & SEO", text:"Tối ưu tốc độ, cấu trúc nội dung và nền tảng kỹ thuật cho tìm kiếm.", tags:["Core Web Vitals","SEO","Analytics"] },
  { number:"04", icon:Workflow, title:"Vận hành lâu dài", text:"Bàn giao minh bạch, hướng dẫn quản trị và hỗ trợ sau khi ra mắt.", tags:["Deploy","CMS","Maintenance"] },
];

const principles = [
  { icon:Lightbulb, title:"Hiểu bài toán trước", text:"Không bắt đầu bằng framework. Tôi bắt đầu bằng mục tiêu, người dùng và điều doanh nghiệp thật sự cần." },
  { icon:Layers3, title:"Một đầu mối xuyên suốt", text:"Bạn làm việc trực tiếp với người thiết kế và lập trình sản phẩm, không qua nhiều tầng trung gian." },
  { icon:ShieldCheck, title:"Minh bạch trong thực thi", text:"Phạm vi, tiến độ và quyết định kỹ thuật đều được trao đổi rõ ràng trong từng giai đoạn." },
];

const technologies = [
  {name:"Next.js",icon:SiNextdotjs,color:"text-zinc-950"},{name:"React",icon:SiReact,color:"text-[#61DAFB]"},
  {name:"TypeScript",icon:SiTypescript,color:"text-[#3178C6]"},{name:"Tailwind",icon:SiTailwindcss,color:"text-[#06B6D4]"},
  {name:"MongoDB",icon:SiMongodb,color:"text-[#47A248]"},{name:"Vercel",icon:SiVercel,color:"text-zinc-950"},
];

const reveal = { initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:"-80px"} };

export default function AboutClient() {
  return <main className="overflow-hidden bg-white text-zinc-950">
    <section className="relative border-b border-zinc-900 bg-[#fff8e9] py-14 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]"><UserRound size={14} className="text-[#d98200]"/>About me · Independent developer</span>
          <h1 className="mt-8 max-w-3xl text-5xl font-black leading-[.9] tracking-[-.06em] sm:text-7xl xl:text-8xl">Tôi là Vinh.<br/><span className="text-[#d98200]">Tôi xây sản phẩm số.</span></h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">Tôi là một lập trình viên web độc lập tại Hạ Long. Tôi đồng hành trực tiếp cùng khách hàng từ lúc làm rõ ý tưởng, thiết kế trải nghiệm đến khi sản phẩm hoạt động ổn định.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="group inline-flex items-center gap-5 border border-zinc-900 bg-[#ffb21c] px-6 py-3.5 text-xs font-black uppercase shadow-[4px_4px_0_#18181b] transition-transform hover:-translate-y-1">Trao đổi dự án <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/></Link>
            <a href="/CV_Website.pdf" download className="inline-flex items-center gap-3 border border-zinc-900 bg-white px-6 py-3.5 text-xs font-black uppercase hover:bg-zinc-950 hover:text-white"><Download size={16}/>Tải CV</a>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-zinc-300 pt-5 text-[10px] font-black uppercase tracking-[.12em] text-zinc-500"><span className="flex items-center gap-2"><MapPin size={14} className="text-[#d98200]"/>Hạ Long, Việt Nam</span><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-emerald-500"/>Đang nhận dự án mới</span></div>
        </motion.div>

        <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -left-5 -top-5 h-20 w-20 border-l-2 border-t-2 border-[#ffb21c]"/>
          <div className="border border-zinc-900 bg-white p-3 shadow-[10px_10px_0_#ffb21c]">
            <div className="mb-3 flex items-center justify-between border-b border-zinc-900 pb-3 text-[9px] font-black uppercase tracking-[.16em]"><span>Portrait / 2026</span><span>Hạ Long · VN</span></div>
            <div className="relative aspect-[4/5] overflow-hidden bg-amber-100 sm:aspect-[4/3]"><Image src="/me.jpg" alt="Lương Vinh" fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover object-center"/></div>
          </div>
          <span className="absolute -bottom-5 -right-2 rotate-2 border border-zinc-900 bg-zinc-950 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white shadow-[3px_3px_0_#ffb21c]">Design · Code · Deliver</span>
        </motion.div>
      </div>
      <a href="#story" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-zinc-400 md:block"><ArrowDown size={20}/></a>
    </section>

    <section id="story" className="border-b border-zinc-900 bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
        <motion.div {...reveal}><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">01 · Câu chuyện</span><h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-.05em] md:text-6xl">Một người.<br/>Một cam kết<br/><span className="text-[#d98200]">xuyên suốt.</span></h2></motion.div>
        <motion.div {...reveal} className="border-l border-zinc-900 pl-6 md:pl-10">
          <p className="text-xl font-bold leading-9 tracking-[-.02em] text-zinc-800 md:text-3xl md:leading-[1.45]">Tôi tin một website tốt không cần phô trương. Nó cần truyền tải đúng giá trị, tạo cảm giác tin cậy và giúp người dùng hành động dễ dàng.</p>
          <div className="mt-8 grid gap-5 text-sm leading-7 text-zinc-600 sm:grid-cols-2"><p>Vì làm việc độc lập, tôi có thể theo sát từng chi tiết và phản hồi nhanh. Mỗi quyết định thiết kế đều được cân nhắc cùng khả năng triển khai thực tế.</p><p>Mục tiêu của tôi không chỉ là bàn giao một giao diện đẹp, mà là tạo ra nền tảng số có thể sử dụng, quản trị và phát triển lâu dài.</p></div>
        </motion.div>
      </div>
    </section>

    <section className="bg-[#fff8e9] py-16 md:py-24">
      <SectionHeading eyebrow="02 · Cách tôi làm việc" title={<>Giá trị của việc<br/><span>làm việc trực tiếp</span></>}/>
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
        {principles.map((item,index)=><motion.article key={item.title} {...reveal} transition={{delay:index*.08}} className="about-card border border-zinc-900 bg-white p-7 md:p-8"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center border border-zinc-900 bg-[#ffb21c]"><item.icon size={22}/></span><span className="text-4xl font-black text-zinc-100">0{index+1}</span></div><h3 className="mt-7 text-xl font-black">{item.title}</h3><p className="mt-4 text-sm leading-7 text-zinc-600">{item.text}</p></motion.article>)}
      </div>
    </section>

    <section className="border-y border-zinc-900 bg-white py-16 md:py-24">
      <SectionHeading eyebrow="03 · Năng lực" title={<>Từ chiến lược đến<br/><span>sản phẩm hoàn chỉnh</span></>}/>
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:px-8">
        {capabilities.map((item,index)=><motion.article key={item.number} {...reveal} transition={{delay:index*.06}} className={`capability-card group border border-zinc-900 p-7 md:p-9 ${index===0 ? "bg-zinc-950 text-white" : "bg-white"}`}><div className="flex items-center justify-between"><span className={`grid h-12 w-12 place-items-center border ${index===0 ? "border-[#ffb21c] bg-[#ffb21c] text-zinc-950" : "border-zinc-900 bg-[#fff8e9]"}`}><item.icon size={22}/></span><span className={`text-4xl font-black ${index===0 ? "text-white/10" : "text-zinc-100"}`}>{item.number}</span></div><h3 className="mt-7 text-2xl font-black">{item.title}</h3><p className={`mt-3 text-sm leading-7 ${index===0 ? "text-zinc-300" : "text-zinc-600"}`}>{item.text}</p><div className="mt-6 flex flex-wrap gap-2">{item.tags.map(tag=><span key={tag} className={`border px-3 py-1.5 text-[9px] font-black uppercase tracking-wide ${index===0 ? "border-white/30 text-zinc-300" : "border-zinc-300 text-zinc-600"}`}>{tag}</span>)}</div></motion.article>)}
      </div>
    </section>

    <section className="overflow-hidden border-b border-zinc-900 bg-[#fff8e9] py-12">
      <p className="mb-8 text-center text-[9px] font-black uppercase tracking-[.2em] text-zinc-500">Bộ công nghệ tôi sử dụng mỗi ngày</p>
      <div className="about-tech flex w-max items-center">{[...technologies,...technologies].map((tech,index)=><div key={`${tech.name}-${index}`} className="mx-8 flex items-center gap-3 md:mx-14"><tech.icon size={28} className={tech.color}/><span className="text-xl font-black">{tech.name}</span></div>)}</div>
    </section>

    <section className="bg-zinc-950 py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1fr_auto] lg:px-8">
        <motion.div {...reveal}><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#ffb21c]">Một nguyên tắc đơn giản</span><blockquote className="mt-6 max-w-4xl text-3xl font-black leading-[1.15] tracking-[-.045em] md:text-6xl">“Code không chỉ để máy tính hiểu. Nó còn phải tạo ra trải nghiệm mà <span className="text-[#ffb21c]">con người cảm nhận được.</span>”</blockquote><p className="mt-6 text-sm text-zinc-400">— Lương Vinh, Independent Web Developer</p></motion.div>
        <div className="relative hidden h-52 w-52 place-items-center border border-white/20 bg-white/[.03] lg:grid"><Heart size={88} strokeWidth={1.2} className="text-[#ffb21c]"/><span className="absolute -left-6 -top-6 grid h-14 w-14 place-items-center border border-[#ffb21c] bg-zinc-950 text-[#ffb21c]"><Code2 size={24}/></span><span className="absolute -bottom-6 -right-6 grid h-14 w-14 place-items-center border border-[#ffb21c] bg-[#ffb21c] text-zinc-950"><Sparkles size={24}/></span></div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <motion.div {...reveal}>
          <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-3 py-2 text-[8px] font-black uppercase tracking-[.16em] shadow-[3px_3px_0_#ffb21c] sm:px-4 sm:text-[9px] sm:tracking-[.2em]"><Sparkles size={13} className="text-[#d98200] sm:size-[14px]"/>Start a conversation</span>
          <h2 className="mx-auto mt-7 max-w-4xl text-[38px] font-black leading-[1.02] tracking-[-.055em] sm:text-5xl md:mt-8 md:text-7xl md:leading-[.94]">Bạn có một ý tưởng?<span className="mt-2 block text-[#d98200] sm:mt-3">Hãy cùng làm nó tốt hơn.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-zinc-600">Chia sẻ với tôi mục tiêu của bạn. Tôi sẽ phản hồi bằng một hướng tiếp cận rõ ràng và thực tế.</p>
          <div className="mx-auto mt-8 flex max-w-xs flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/contact" className="group inline-flex w-full items-center justify-center gap-4 border border-zinc-900 bg-[#ffb21c] px-6 py-3.5 text-[10px] font-black uppercase shadow-[4px_4px_0_#18181b] sm:w-auto sm:px-7 sm:py-4 sm:text-xs">Liên hệ hợp tác <Mail size={16}/></Link>
            <a href="https://webgiare.id.vn" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 border border-zinc-900 bg-white px-6 py-3.5 text-[10px] font-black uppercase sm:w-auto sm:px-7 sm:py-4 sm:text-xs">Xem webgiare.id.vn <ArrowUpRight size={16}/></a>
          </div>
        </motion.div>
      </div>
    </section>

    <style jsx global>{`
      .about-card,.capability-card{box-shadow:6px 6px 0 rgba(24,24,27,.14)!important}.about-card:hover,.capability-card:hover{box-shadow:6px 6px 0 #ffb21c!important;transform:translateY(-4px)}
      @keyframes aboutTech{to{transform:translateX(-50%)}}.about-tech{animation:aboutTech 26s linear infinite}@media(prefers-reduced-motion:reduce){.about-tech{animation-play-state:paused}}
    `}</style>
  </main>;
}

const SectionHeading = ({eyebrow,title}:{eyebrow:string;title:React.ReactNode}) => <div className="mx-auto max-w-7xl px-5 text-center lg:px-8"><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">{eyebrow}</span><h2 className="mt-5 text-4xl font-black leading-[.95] tracking-[-.05em] text-zinc-950 [&>span]:text-[#d98200] md:text-6xl">{title}</h2></div>;
