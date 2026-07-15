"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, HelpCircle, Minus, Plus } from "lucide-react";
import Link from "next/link";

const faqs = [
  { question: "Chi phí thiết kế website là bao nhiêu?", answer: "Chi phí phụ thuộc vào tính năng và độ phức tạp. Các gói linh hoạt từ landing page cơ bản đến website thương mại điện tử hoặc web app chuyên biệt. Hãy liên hệ để nhận báo giá chi tiết." },
  { question: "Thời gian hoàn thành dự án bao lâu?", answer: "Thông thường từ 2–4 tuần cho website doanh nghiệp và 6–8 tuần cho dự án phức tạp. Tiến độ cụ thể sẽ được thống nhất rõ trong kế hoạch triển khai." },
  { question: "Website có chuẩn SEO và chạy tốt trên điện thoại không?", answer: "Có. Sản phẩm được xây dựng responsive cho mọi thiết bị và tối ưu SEO on-page, hiệu suất, metadata cùng cấu trúc nội dung ngay từ đầu." },
  { question: "Sau khi bàn giao tôi có được hỗ trợ không?", answer: "Có. Chúng tôi hướng dẫn quản trị, hỗ trợ vận hành và bảo hành các lỗi phát sinh từ mã nguồn theo chính sách đã thống nhất." },
  { question: "Bạn sử dụng công nghệ gì để phát triển website?", answer: "Nền tảng chính gồm Next.js, React, TypeScript, Tailwind CSS và MongoDB, giúp website nhanh, bảo mật và dễ nâng cấp." },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden bg-[#fff8e9] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-zinc-800 shadow-[3px_3px_0_#ffb21c]"><HelpCircle size={14} className="text-[#d98200]"/>Hỗ trợ khách hàng</span>
          <h2 className="mt-7 text-5xl font-black leading-[.92] tracking-[-.06em] text-zinc-950 sm:text-7xl">Câu hỏi <span className="relative inline-block text-[#d98200]">thường gặp<span className="absolute -bottom-3 left-0 h-1.5 w-full bg-[#ffb21c]"/></span></h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-zinc-600">Những thông tin quan trọng bạn cần biết trước khi bắt đầu một dự án mới.</p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq,index) => {
            const open = openIndex === index;
            return <article key={faq.question} className={`faq-editorial border border-zinc-900 bg-white ${open ? "is-open" : ""}`}>
              <button onClick={() => setOpenIndex(open ? null : index)} className="group flex w-full items-center gap-4 p-5 text-left md:gap-6 md:p-7" aria-expanded={open}>
                <span className={`grid h-11 w-11 shrink-0 place-items-center border border-zinc-900 text-sm font-black ${open ? "bg-[#ffb21c]" : "bg-[#fff8e9]"}`}>{String(index+1).padStart(2,"0")}</span>
                <span className={`flex-1 text-base font-black tracking-[-.015em] md:text-xl ${open ? "text-[#b85f00]" : "text-zinc-950"}`}>{faq.question}</span>
                <span className={`grid h-10 w-10 shrink-0 place-items-center border border-zinc-900 transition-colors ${open ? "bg-zinc-950 text-white" : "bg-white group-hover:bg-[#ffb21c]"}`}>{open ? <Minus size={19}/> : <Plus size={19}/>}</span>
              </button>
              <AnimatePresence initial={false}>{open && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.25}} className="overflow-hidden"><div className="border-t border-zinc-300 px-5 pb-7 pt-5 md:ml-[92px] md:px-0 md:pr-20"><p className="text-sm leading-7 text-zinc-600 md:text-base">{faq.answer}</p></div></motion.div>}</AnimatePresence>
            </article>;
          })}
        </div>

        <div className="faq-cta mt-10 flex flex-col items-center justify-between gap-5 border border-zinc-900 bg-zinc-950 p-6 text-white sm:flex-row md:p-8">
          <div><h3 className="text-xl font-black">Bạn vẫn còn câu hỏi?</h3><p className="mt-1 text-sm text-zinc-400">Trao đổi trực tiếp để nhận tư vấn phù hợp với dự án.</p></div>
          <Link href="/contact" className="group inline-flex w-full items-center justify-center gap-3 border border-[#ffb21c] bg-[#ffb21c] px-6 py-3 text-xs font-black uppercase tracking-wide text-zinc-950 sm:w-auto">Liên hệ ngay <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/></Link>
        </div>
      </div>
      <style jsx global>{`.boston-home .faq-editorial{box-shadow:5px 5px 0 rgba(24,24,27,.12)!important}.boston-home .faq-editorial.is-open{box-shadow:5px 5px 0 #ffb21c!important}.boston-home .faq-cta{box-shadow:6px 6px 0 #ffb21c!important}`}</style>
    </section>
  );
};
