"use client";

import { motion } from "framer-motion";
import { Check, Code2, Layout, MessageSquare, Rocket, ShieldCheck, Users, Zap } from "lucide-react";

const steps = [
  { number: "01", icon: MessageSquare, title: "Tư vấn & Khảo sát", subtitle: "Consulting & Research", description: "Lắng nghe ý tưởng, phân tích yêu cầu và đề xuất giải pháp công nghệ phù hợp nhất.", tasks: ["Phân tích yêu cầu", "Nghiên cứu đối thủ", "Sitemap & user flow", "Báo giá & hợp đồng"] },
  { number: "02", icon: Layout, title: "Thiết kế UI/UX", subtitle: "Interface & Experience", description: "Phác thảo luồng trải nghiệm và thiết kế giao diện chi tiết, nhất quán với thương hiệu.", tasks: ["Wireframe", "UI trên Figma", "Tối ưu responsive", "Feedback & chỉnh sửa"] },
  { number: "03", icon: Code2, title: "Lập trình & Kiểm thử", subtitle: "Development & Testing", description: "Chuyển thiết kế thành sản phẩm thực tế với mã nguồn sạch, bảo mật và hiệu năng cao.", tasks: ["Frontend Next.js", "Backend & API", "Tích hợp dữ liệu", "Kiểm thử QA/QC"] },
  { number: "04", icon: Rocket, title: "Bàn giao & Hỗ trợ", subtitle: "Delivery & Support", description: "Triển khai lên server, hướng dẫn quản trị và đồng hành kỹ thuật sau khi bàn giao.", tasks: ["Deploy Hosting/VPS", "Đào tạo quản trị", "Bàn giao source code", "Bảo hành kỹ thuật"] },
];

const commitments = [
  { icon: ShieldCheck, label: "Bảo mật thông tin" },
  { icon: Users, label: "Đồng hành 1:1" },
  { icon: Rocket, label: "Bàn giao đúng hạn" },
];

export const ProcessSection = () => (
  <section className="relative overflow-hidden bg-white pb-8 pt-14 md:py-24">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <header className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
        <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-amber-500 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-amber-700"><Zap size={14} className="fill-amber-500"/>Quy trình tinh gọn</span>
        <h2 className="mt-6 text-4xl font-black leading-[.95] tracking-[-.05em] text-zinc-950 sm:text-6xl">Từ ý tưởng đến<br/><span className="text-[#d98200]">sản phẩm thực tế</span></h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-600 md:text-base">Quy trình Agile linh hoạt và minh bạch trong từng giai đoạn, giúp dự án luôn đúng mục tiêu và tiến độ.</p>
      </header>

      <div className="relative">
        <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-zinc-900 lg:block"/>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article key={step.number} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}} className="process-card group relative flex flex-col border border-zinc-900 bg-white p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="relative z-10 mb-7 flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center border border-zinc-900 bg-[#ffb21c] shadow-[3px_3px_0_#18181b]"><step.icon size={24}/></span>
                <span className="text-4xl font-black tracking-[-.06em] text-zinc-200 transition-colors group-hover:text-[#ffb21c]">{step.number}</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#d98200]">{step.subtitle}</p>
              <h3 className="mt-2 text-xl font-black tracking-[-.025em] text-zinc-950">{step.title}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-600">{step.description}</p>
              <ul className="mt-6 space-y-3 border-t border-zinc-300 pt-5">
                {step.tasks.map(task => <li key={task} className="flex items-center gap-2 text-xs font-medium text-zinc-500"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700"><Check size={11} strokeWidth={3}/></span>{task}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-3 border border-zinc-900 bg-[#fff8e9] md:mt-12">
        {commitments.map((item,index) => <div key={item.label} className={`flex flex-col items-center justify-center gap-2 px-2 py-4 text-center text-[7px] font-black uppercase leading-tight tracking-[.08em] text-zinc-700 sm:flex-row sm:gap-3 sm:px-5 sm:py-5 sm:text-xs sm:tracking-[.1em] ${index < commitments.length-1 ? "border-r border-zinc-900" : ""}`}><item.icon size={17} className="shrink-0 text-[#d98200] sm:size-[19px]"/>{item.label}</div>)}
      </div>
    </div>
    <style jsx global>{`.boston-home .process-card{box-shadow:5px 5px 0 rgba(24,24,27,.12)!important}.boston-home .process-card:hover{box-shadow:5px 5px 0 #ffb21c!important}`}</style>
  </section>
);
