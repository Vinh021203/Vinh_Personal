"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Code2, FileText, Gauge, HelpCircle, Layers, MessageSquare, Minus, Palette, PenTool, Plus, Rocket, Search, ShieldCheck, Sparkles, UserRound, Workflow } from "lucide-react";
import { iconMap } from "@/components/admin/SelectIconField";

interface ServiceItem { _id:string; name:string; description:string; icon:string; status?:string; visibility?: "draft" | "published"; isNew?:boolean }

const fallbackServices:ServiceItem[] = [
  {_id:"web",name:"Website doanh nghiệp",description:"Website chuyên nghiệp, thể hiện rõ thương hiệu, dịch vụ và tạo điểm chạm tin cậy với khách hàng.",icon:"LayoutTemplate"},
  {_id:"landing",name:"Landing Page",description:"Trang đích tập trung vào một chiến dịch, sản phẩm hoặc mục tiêu chuyển đổi cụ thể.",icon:"Rocket"},
  {_id:"app",name:"Web Application",description:"Ứng dụng web theo quy trình nghiệp vụ riêng, có tài khoản, dữ liệu và trang quản trị.",icon:"Code2"},
  {_id:"ui",name:"UI/UX Design",description:"Thiết kế giao diện rõ ràng, responsive và nhất quán với nhận diện thương hiệu.",icon:"Palette"},
  {_id:"seo",name:"SEO & Performance",description:"Tối ưu cấu trúc kỹ thuật, tốc độ tải và khả năng tiếp cận trên công cụ tìm kiếm.",icon:"TrendingUp"},
  {_id:"care",name:"Bảo trì & Nâng cấp",description:"Theo dõi, sửa lỗi và phát triển thêm tính năng khi sản phẩm đi vào vận hành.",icon:"Settings"},
];

const supplementalServices:ServiceItem[] = [
  {_id:"content",name:"Content & Copywriting",description:"Xây dựng cấu trúc nội dung, thông điệp và lời kêu gọi hành động rõ ràng để website thuyết phục hơn.",icon:"FileText",isNew:true},
  {_id:"visual",name:"Brand & Visual Design",description:"Thiết kế hình ảnh, banner và hệ thống yếu tố thị giác đồng bộ với cá tính thương hiệu.",icon:"PenTool",isNew:true},
];

const outcomes = [
  {icon:Gauge,title:"Nhanh và ổn định",text:"Tối ưu hiệu suất trên thiết bị thực, không chỉ đẹp trong bản thiết kế."},
  {icon:Palette,title:"Đúng nhận diện",text:"Giao diện bám sát cá tính thương hiệu và mục tiêu kinh doanh."},
  {icon:Search,title:"Sẵn sàng cho SEO",text:"Cấu trúc, metadata và nội dung có nền tảng tốt cho tìm kiếm."},
  {icon:ShieldCheck,title:"Dễ quản trị",text:"Bàn giao rõ ràng, hướng dẫn sử dụng và kiến trúc dễ nâng cấp."},
];

const process = [
  {number:"01",icon:MessageSquare,title:"Trao đổi",text:"Làm rõ mục tiêu, người dùng, phạm vi và ngân sách dự kiến."},
  {number:"02",icon:Workflow,title:"Định hướng",text:"Đề xuất cấu trúc, giải pháp kỹ thuật và kế hoạch triển khai."},
  {number:"03",icon:Code2,title:"Thực hiện",text:"Thiết kế, lập trình và cập nhật tiến độ theo từng mốc rõ ràng."},
  {number:"04",icon:Rocket,title:"Bàn giao",text:"Kiểm thử, triển khai, hướng dẫn quản trị và hỗ trợ vận hành."},
];

const faqs = [
  {q:"Chi phí một website được xác định như thế nào?",a:"Chi phí dựa trên phạm vi trang, tính năng, mức độ thiết kế riêng và yêu cầu tích hợp. Sau buổi trao đổi, tôi sẽ gửi đề xuất có phạm vi và chi phí rõ ràng."},
  {q:"Mất bao lâu để hoàn thành?",a:"Landing page thường nhanh hơn website doanh nghiệp hoặc web app. Thời gian cụ thể được xác định sau khi thống nhất nội dung, tính năng và lịch phản hồi."},
  {q:"Tôi có thể tự cập nhật nội dung không?",a:"Có. Nếu dự án cần quản trị nội dung, tôi sẽ tích hợp CMS hoặc trang quản trị phù hợp và hướng dẫn sử dụng khi bàn giao."},
  {q:"Sau khi website hoạt động có được hỗ trợ không?",a:"Có. Phạm vi bảo hành và hỗ trợ vận hành sẽ được ghi rõ trong đề xuất. Bạn cũng có thể chọn gói bảo trì dài hạn nếu cần."},
];

const reveal={initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:true,margin:"-70px"}};

export default function ServicesClient(){
  const [services,setServices]=useState<ServiceItem[]>([]); const [loading,setLoading]=useState(true); const [faqOpen,setFaqOpen]=useState(0);
  useEffect(()=>{fetch("/api/services?public=1").then(r=>{if(!r.ok)throw new Error();return r.json()}).then((data:ServiceItem[])=>setServices(data)).catch(()=>setServices(fallbackServices)).finally(()=>setLoading(false))},[]);
  const baseServices=services.length?services:fallbackServices;
  const displayServices=[...baseServices,...supplementalServices.filter(extra=>!baseServices.some(item=>item.name.toLowerCase().includes(extra._id)))];
  return <main className="overflow-hidden bg-white text-zinc-950">
    <section className="relative border-b border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}><span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]"><Sparkles size={14} className="text-[#d98200]"/>Services by Lương Vinh</span><h1 className="mt-8 text-5xl font-black leading-[.9] tracking-[-.06em] sm:text-7xl xl:text-8xl">Giải pháp web<br/><span className="text-[#d98200]">được làm đúng.</span></h1><p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">Tôi trực tiếp thiết kế và phát triển sản phẩm từ đầu đến cuối — một đầu mối, một quy trình rõ ràng và một tiêu chuẩn chất lượng nhất quán.</p><div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:gap-4"><a href="#service-list" className="group inline-flex min-w-0 items-center justify-center gap-2 border border-zinc-900 bg-[#ffb21c] px-3 py-3.5 text-[8px] font-black uppercase shadow-[4px_4px_0_#18181b] sm:gap-5 sm:px-6 sm:text-xs">Khám phá dịch vụ <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1 sm:size-[17px]"/></a><Link href="/contact" className="inline-flex min-w-0 items-center justify-center gap-2 border border-zinc-900 bg-white px-3 py-3.5 text-[8px] font-black uppercase hover:bg-zinc-950 hover:text-white sm:gap-3 sm:px-6 sm:text-xs">Nhận tư vấn <ArrowUpRight size={14} className="shrink-0 sm:size-[16px]"/></Link></div></motion.div>
        <div className="flex flex-col justify-end gap-5">
          <div className="border border-zinc-900 bg-zinc-950 p-6 text-white shadow-[6px_6px_0_#ffb21c] md:p-7">
            <div className="flex items-center justify-between border-b border-white/20 pb-4"><span className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Phạm vi hợp tác</span><Layers size={20} className="text-[#ffb21c]"/></div>
            <h2 className="mt-5 text-2xl font-black tracking-[-.03em] md:text-3xl">Một người đồng hành,<br/>đủ năng lực triển khai.</h2>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] font-bold text-zinc-300">{["Định hướng nội dung","Thiết kế UI/UX","Lập trình hệ thống","Triển khai & hỗ trợ"].map(item=><span key={item} className="flex items-center gap-2"><Check size={13} className="text-[#ffb21c]"/>{item}</span>)}</div>
          </div>
          <div className="grid grid-cols-2 border border-zinc-900 bg-white">{[{value:"01",label:"Đầu mối trực tiếp"},{value:"04",label:"Giai đoạn rõ ràng"},{value:"100%",label:"Responsive"},{value:"VN",label:"Hỗ trợ tiếng Việt"}].map((item,index)=><div key={item.label} className={`p-5 md:p-6 ${index%2===0?"border-r border-zinc-900":""} ${index<2?"border-b border-zinc-900":""}`}><strong className="block text-3xl font-black text-[#d98200] md:text-4xl">{item.value}</strong><span className="mt-2 block text-[8px] font-black uppercase tracking-[.13em] text-zinc-500 md:text-[9px]">{item.label}</span></div>)}</div>
        </div>
      </div>
    </section>

    <section id="service-list" className="bg-white py-16 md:py-24"><Heading eyebrow="01 · Dịch vụ" title={<>Những gì tôi có thể<br/><span>thực hiện cho bạn</span></>}/><div className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">{loading?<div className="grid h-40 place-items-center"><span className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-[#d98200]"/></div>:<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{displayServices.map((service,index)=><ServiceCard key={service._id||index} service={service} index={index}/>)}</div>}</div></section>

    <section className="border-y border-zinc-900 bg-[#fff8e9] py-16 md:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><motion.div {...reveal} className="text-center lg:text-left"><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">02 · Giá trị nhận được</span><h2 className="mt-5 text-4xl font-black leading-[.95] tracking-[-.05em] md:text-6xl">Không chỉ là<br/><span className="text-[#d98200]">một giao diện đẹp.</span></h2><p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-zinc-600 lg:mx-0">Sản phẩm cần hoạt động tốt trong thực tế, dễ sử dụng và có nền tảng để tiếp tục phát triển.</p></motion.div><div className="grid gap-4 sm:grid-cols-2">{outcomes.map((item,index)=><motion.article key={item.title} {...reveal} transition={{delay:index*.06}} className="outcome-card border border-zinc-900 bg-white p-6"><span className="grid h-11 w-11 place-items-center border border-zinc-900 bg-[#ffb21c]"><item.icon size={20}/></span><h3 className="mt-5 text-lg font-black">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p></motion.article>)}</div></div></section>

    <section className="bg-white py-16 md:py-24"><Heading eyebrow="03 · Quy trình" title={<>Từ yêu cầu đến<br/><span>sản phẩm hoạt động</span></>}/><div className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">{process.map((step,index)=><motion.article key={step.number} {...reveal} transition={{delay:index*.06}} className="process-service-card border border-zinc-900 bg-white p-6"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center border border-zinc-900 bg-[#ffb21c]"><step.icon size={21}/></span><strong className="text-4xl font-black text-zinc-100">{step.number}</strong></div><h3 className="mt-6 text-xl font-black">{step.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{step.text}</p></motion.article>)}</div></section>

    <section className="border-y border-zinc-900 bg-zinc-950 text-white"><div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">{[{icon:UserRound,title:"Làm việc trực tiếp",text:"Trao đổi thẳng với người thực hiện."},{icon:Check,title:"Phạm vi rõ ràng",text:"Biết chính xác những gì sẽ bàn giao."},{icon:Layers,title:"Có thể mở rộng",text:"Sẵn sàng cho giai đoạn tiếp theo."},{icon:ShieldCheck,title:"Trách nhiệm xuyên suốt",text:"Một đầu mối từ bắt đầu đến vận hành."}].map((item,index)=><div key={item.title} className={`group relative p-4 sm:p-6 md:p-8 ${index<2?"border-b border-white/15 lg:border-b-0":""} ${index%2===0?"border-r border-white/15":""} ${index<3?"lg:border-r lg:border-white/15":""}`}><div className="flex items-start justify-between"><span className="grid h-9 w-9 place-items-center border border-[#ffb21c] text-[#ffb21c] transition-colors group-hover:bg-[#ffb21c] group-hover:text-zinc-950 sm:h-11 sm:w-11"><item.icon size={17} className="sm:size-[20px]"/></span><span className="text-2xl font-black text-white sm:text-3xl">0{index+1}</span></div><h3 className="mt-4 text-xs font-black leading-tight sm:mt-5 sm:text-base">{item.title}</h3><p className="mt-2 text-[10px] leading-5 text-zinc-400 sm:text-xs sm:leading-6">{item.text}</p></div>)}</div></section>

    <section className="bg-[#fff8e9] py-16 md:py-24"><div className="mx-auto max-w-4xl px-5"><Heading eyebrow="04 · FAQ" title={<>Trước khi chúng ta<br/><span>bắt đầu hợp tác</span></>}/><div className="mt-12 space-y-4">{faqs.map((faq,index)=>{const open=faqOpen===index;return <article key={faq.q} className={`service-faq border border-zinc-900 bg-white ${open?"open":""}`}><button onClick={()=>setFaqOpen(open?-1:index)} className="flex w-full items-center gap-4 p-5 text-left md:p-6"><span className={`grid h-10 w-10 shrink-0 place-items-center border border-zinc-900 text-xs font-black ${open?"bg-[#ffb21c]":"bg-[#fff8e9]"}`}>{String(index+1).padStart(2,"0")}</span><span className="flex-1 text-sm font-black md:text-lg">{faq.q}</span><span className={`grid h-9 w-9 place-items-center border border-zinc-900 ${open?"bg-zinc-950 text-white":""}`}>{open?<Minus size={17}/>:<Plus size={17}/>}</span></button><AnimatePresence initial={false}>{open&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><p className="border-t border-zinc-300 px-5 py-5 text-sm leading-7 text-zinc-600 md:ml-[80px] md:pr-16">{faq.a}</p></motion.div>}</AnimatePresence></article>})}</div></div></section>

    <section className="bg-white py-14 md:py-24"><div className="mx-auto max-w-5xl px-5 text-center"><span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-3 py-2 text-[8px] font-black uppercase tracking-[.16em] shadow-[3px_3px_0_#ffb21c] sm:px-4 sm:text-[9px] sm:tracking-[.2em]"><HelpCircle size={13} className="text-[#d98200] sm:size-[14px]"/>Tell me about your project</span><h2 className="mx-auto mt-7 max-w-4xl text-[38px] font-black leading-[1.02] tracking-[-.055em] sm:text-5xl md:mt-8 md:text-7xl md:leading-[.94]">Bạn cần một website?<span className="mt-2 block text-[#d98200] sm:mt-3">Hãy bắt đầu bằng cuộc trò chuyện.</span></h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-zinc-600">Gửi cho tôi mục tiêu, phạm vi dự kiến và thời gian mong muốn. Tôi sẽ phản hồi bằng hướng tiếp cận phù hợp.</p><Link href="/contact" className="group mt-8 inline-flex w-full max-w-xs items-center justify-center gap-4 border border-zinc-900 bg-[#ffb21c] px-6 py-3.5 text-[10px] font-black uppercase shadow-[4px_4px_0_#18181b] sm:w-auto sm:max-w-none sm:px-7 sm:py-4 sm:text-xs">Liên hệ Lương Vinh <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 sm:size-[17px]"/></Link></div></section>

    <style jsx global>{`.service-card,.outcome-card,.process-service-card{box-shadow:6px 6px 0 rgba(24,24,27,.13)!important}.service-card:hover,.outcome-card:hover,.process-service-card:hover{box-shadow:6px 6px 0 #ffb21c!important;transform:translateY(-4px)}.service-faq.open{box-shadow:5px 5px 0 #ffb21c!important}`}</style>
  </main>
}

const ServiceCard=({service,index}:{service:ServiceItem;index:number})=>{const customIcons:Record<string,typeof Layers>={FileText,PenTool};const Icon=customIcons[service.icon]||iconMap[service.icon]||Layers;return <motion.article {...reveal} transition={{delay:(index%6)*.05}} className={`service-card group flex min-h-[280px] flex-col border border-zinc-900 p-6 md:p-7 ${index===0?"bg-zinc-950 text-white":"bg-white"}`}><div className="flex items-start justify-between"><span className={`grid h-12 w-12 place-items-center border ${index===0?"border-[#ffb21c] bg-[#ffb21c] text-zinc-950":"border-zinc-900 bg-[#fff8e9]"}`}><Icon size={22}/></span><div className="flex items-center gap-3">{service.isNew&&<span className="border border-[#d98200] px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#d98200]">Mới</span>}<span className={`text-4xl font-black ${index===0?"text-white/10":"text-zinc-100"}`}>{String(index+1).padStart(2,"0")}</span></div></div><h3 className="mt-7 text-2xl font-black tracking-[-.03em]">{service.name}</h3><p className={`mt-4 flex-1 text-sm leading-7 ${index===0?"text-zinc-300":"text-zinc-600"}`}>{service.description}</p><Link href="/contact" className={`mt-6 flex items-center justify-between border-t pt-4 text-[10px] font-black uppercase tracking-wide ${index===0?"border-white/20 text-[#ffb21c]":"border-zinc-300"}`}>Trao đổi dịch vụ <ArrowRight size={16}/></Link></motion.article>}

const Heading=({eyebrow,title}:{eyebrow:string;title:React.ReactNode})=><div className="mx-auto max-w-7xl px-5 text-center lg:px-8"><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">{eyebrow}</span><h2 className="mt-5 text-4xl font-black leading-[.95] tracking-[-.05em] [&>span]:text-[#d98200] md:text-6xl">{title}</h2></div>
