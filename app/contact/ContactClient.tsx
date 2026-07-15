"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Clock3, Code2, ExternalLink,
  Globe2, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck,
  Sparkles, UserRound,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";

const services = ["Website doanh nghiệp", "Landing Page", "Web Application", "UI/UX Design", "SEO & Performance", "Content & Design", "Khác"];
const budgets = ["Dưới 5 triệu", "5 – 10 triệu", "10 – 20 triệu", "20 – 50 triệu", "Trên 50 triệu", "Cần tư vấn"];
const planMap: Record<string, string> = { landing: "Landing Page", business: "Website doanh nghiệp", custom: "Web Application" };

export default function ContactClient() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", subject: "", message: "", website: "" });

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan && planMap[plan]) setForm((current) => ({ ...current, service: planMap[plan], subject: `Tư vấn gói ${planMap[plan]}` }));
  }, [searchParams]);

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.website) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Vui lòng điền đủ họ tên, email và nội dung.");
      return;
    }
    setSubmitting(true);
    try {
      const leadResponse = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact" }),
      });

      if (!leadResponse.ok) {
        throw new Error("Không thể lưu yêu cầu liên hệ");
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { ...form, time: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", budget: "", subject: "", message: "", website: "" });
      toast.success("Đã gửi yêu cầu thành công.");
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Chưa thể gửi tin nhắn. Bạn có thể gọi hoặc gửi email trực tiếp.");
    } finally {
      setSubmitting(false);
    }
  };

  return <main className="overflow-hidden bg-white text-zinc-950">
    <Toaster position="top-center" toastOptions={{ style: { border: "1px solid #18181b", borderRadius: 0, boxShadow: "4px 4px 0 #ffb21c", fontWeight: 700 } }} />

    <section className="relative border-b border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#ffb21c]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]"><MessageCircle size={14} className="text-[#d98200]" /> Start a conversation</span>
          <h1 className="mt-8 text-[clamp(3.4rem,7vw,7rem)] font-black leading-[.88] tracking-[-.07em]">Hãy nói về<br /><span className="text-[#d98200]">dự án của bạn.</span></h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">Chia sẻ mục tiêu, phạm vi và thời gian dự kiến. Lương Vinh sẽ phản hồi bằng một hướng tiếp cận rõ ràng, phù hợp với nhu cầu thực tế.</p>
        </motion.div>
        <div className="border border-zinc-900 bg-zinc-950 text-white shadow-[8px_8px_0_#ffb21c]">
          <div className="border-b border-white/20 p-6"><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Trao đổi trực tiếp</p><h2 className="mt-2 text-2xl font-black">Không qua trung gian.</h2></div>
          <QuickContact icon={<Phone size={18} />} label="Điện thoại" value="0971 386 588" href="tel:0971386588" />
          <QuickContact icon={<Mail size={18} />} label="Email" value="contact@vinhworks.com" href="mailto:contact@vinhworks.com" />
          <QuickContact icon={<Globe2 size={18} />} label="Website" value="webgiare.id.vn" href="https://webgiare.id.vn" last />
        </div>
      </div>
    </section>

    <section id="contact-form" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
        <aside className="self-start lg:sticky lg:top-24">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">01 · Trước khi gửi</p>
          <h2 className="mt-5 text-4xl font-black leading-[.96] tracking-[-.05em] md:text-5xl">Thông tin càng rõ,<br /><span className="text-[#d98200]">tư vấn càng sát.</span></h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-zinc-600">Bạn chưa cần có tài liệu hoàn chỉnh. Chỉ cần mô tả vấn đề, mục tiêu và ngân sách dự kiến.</p>
          <div className="mt-8 border border-zinc-900 bg-[#fff8e9]">
            <Note icon={<Clock3 size={17} />} title="Phản hồi trong 24 giờ" text="Các yêu cầu gửi ngoài giờ sẽ được xử lý vào ngày làm việc tiếp theo." />
            <Note icon={<ShieldCheck size={17} />} title="Thông tin được bảo mật" text="Nội dung trao đổi chỉ được sử dụng để tư vấn và báo giá dự án." last />
          </div>
          <div className="mt-7 flex items-center gap-4 border-l-4 border-[#ffb21c] pl-5"><MapPin size={20} className="shrink-0 text-[#d98200]" /><div><p className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Địa điểm</p><p className="mt-1 text-sm font-black">Hạ Long, Quảng Ninh, Việt Nam</p></div></div>
        </aside>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-zinc-900 bg-[#fff8e9] shadow-[8px_8px_0_#18181b]">
          <div className="flex items-start justify-between gap-5 border-b border-zinc-900 bg-white p-6 md:p-8">
            <div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#d98200]">Project enquiry</p><h2 className="mt-2 text-2xl font-black md:text-3xl">Gửi yêu cầu dự án</h2></div>
            <span className="grid h-12 w-12 shrink-0 place-items-center border border-zinc-900 bg-[#ffb21c]"><Send size={20} /></span>
          </div>

          {sent ? <Success reset={() => setSent(false)} /> : <form onSubmit={submit} className="p-6 md:p-8">
            <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={update} className="hidden" aria-hidden="true" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Họ và tên" required><Input icon={<UserRound size={17} />} name="name" value={form.name} onChange={update} placeholder="Tên của bạn" autoComplete="name" /></Field>
              <Field label="Email" required><Input icon={<Mail size={17} />} type="email" name="email" value={form.email} onChange={update} placeholder="email@domain.com" autoComplete="email" /></Field>
              <Field label="Số điện thoại"><Input icon={<Phone size={17} />} type="tel" name="phone" value={form.phone} onChange={update} placeholder="0971 386 588" autoComplete="tel" /></Field>
              <Field label="Dịch vụ quan tâm"><Select name="service" value={form.service} onChange={update} placeholder="Chọn dịch vụ" options={services} /></Field>
              <Field label="Ngân sách dự kiến"><Select name="budget" value={form.budget} onChange={update} placeholder="Chọn khoảng ngân sách" options={budgets} /></Field>
              <Field label="Chủ đề"><input name="subject" value={form.subject} onChange={update} placeholder="Ví dụ: Website giới thiệu doanh nghiệp" className="h-14 w-full border border-zinc-900 bg-white px-4 text-sm font-semibold outline-none focus:shadow-[3px_3px_0_#ffb21c]" /></Field>
            </div>
            <Field label="Mô tả yêu cầu" required className="mt-5"><textarea required name="message" value={form.message} onChange={update} rows={6} placeholder="Mục tiêu dự án, tính năng cần có, thời gian mong muốn..." className="w-full resize-none border border-zinc-900 bg-white p-4 text-sm leading-7 outline-none focus:shadow-[3px_3px_0_#ffb21c]" /></Field>
            <div className="mt-6 flex flex-col justify-between gap-5 border-t border-zinc-300 pt-6 sm:flex-row sm:items-center">
              <p className="flex max-w-sm items-start gap-2 text-[10px] leading-5 text-zinc-500"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />Bằng việc gửi form, bạn đồng ý để tôi liên hệ lại về yêu cầu này.</p>
              <button disabled={submitting} className="group inline-flex min-h-14 items-center justify-center gap-6 border border-zinc-900 bg-[#ffb21c] px-7 text-xs font-black uppercase shadow-[4px_4px_0_#18181b] disabled:cursor-wait disabled:opacity-60">{submitting ? <><span className="h-4 w-4 animate-spin border-2 border-zinc-900 border-t-transparent" />Đang gửi</> : <>Gửi yêu cầu <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></>}</button>
            </div>
          </form>}
        </motion.div>
      </div>
    </section>

    <section className="border-y border-zinc-900 bg-zinc-950 py-10 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8"><div className="mb-6 text-center md:mb-9"><p className="text-[8px] font-black uppercase tracking-[.18em] text-[#ffb21c] md:text-[9px] md:tracking-[.2em]">Sau khi bạn gửi</p><h2 className="mx-auto mt-3 max-w-[290px] text-2xl font-black leading-[1.08] tracking-[-.03em] md:max-w-none md:text-5xl">Quy trình tiếp theo rất đơn giản.</h2></div><div className="grid grid-cols-3 border border-white/20">{[{n:"01",t:"Tiếp nhận",d:"Đọc và phân tích yêu cầu."},{n:"02",t:"Trao đổi",d:"Làm rõ phạm vi và mục tiêu."},{n:"03",t:"Đề xuất",d:"Gửi hướng triển khai và báo giá."}].map((item,index)=><div key={item.n} className={`px-2 py-4 text-center sm:p-4 md:p-7 md:text-left ${index<2?"border-r border-white/20":""}`}><span className="text-xs font-black text-[#ffb21c] md:text-sm">{item.n}</span><h3 className="mt-2 text-[10px] font-black leading-tight sm:text-xs md:mt-3 md:text-lg">{item.t}</h3><p className="mt-2 hidden text-xs leading-6 text-zinc-400 sm:block">{item.d}</p></div>)}</div></div>
    </section>

    <section className="bg-[#fff8e9] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_auto] md:items-center lg:px-8"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">Không tiện điền form?</p><h2 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.05em] md:text-6xl">Gọi trực tiếp để<br />trao đổi nhanh hơn.</h2></div><a href="tel:0971386588" className="group inline-flex items-center gap-6 border border-zinc-900 bg-white px-7 py-5 text-sm font-black shadow-[6px_6px_0_#ffb21c]"><span className="grid h-11 w-11 place-items-center border border-zinc-900 bg-[#ffb21c]"><Phone size={18} /></span><span><small className="block text-[8px] uppercase tracking-wider text-zinc-400">Hotline</small>0971 386 588</span><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a></div>
    </section>
  </main>;
}

function QuickContact({ icon, label, value, href, last = false }: { icon: React.ReactNode; label: string; value: string; href: string; last?: boolean }) {
  return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`group grid grid-cols-[42px_1fr_auto] items-center gap-4 p-5 hover:bg-white/5 ${last ? "" : "border-b border-white/20"}`}><span className="grid h-10 w-10 place-items-center border border-[#ffb21c] text-[#ffb21c]">{icon}</span><span><small className="block text-[8px] font-black uppercase tracking-[.15em] text-zinc-500">{label}</small><strong className="mt-1 block break-all text-sm">{value}</strong></span><ExternalLink size={14} className="text-zinc-500 group-hover:text-[#ffb21c]" /></a>;
}
function Note({ icon, title, text, last = false }: { icon: React.ReactNode; title: string; text: string; last?: boolean }) { return <div className={`grid grid-cols-[40px_1fr] gap-4 p-5 ${last ? "" : "border-b border-zinc-900"}`}><span className="grid h-10 w-10 place-items-center border border-zinc-900 bg-white text-[#d98200]">{icon}</span><div><h3 className="text-xs font-black uppercase tracking-wide">{title}</h3><p className="mt-2 text-[11px] leading-5 text-zinc-500">{text}</p></div></div>; }
function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) { return <label className={`block ${className}`}><span className="mb-2 block text-[10px] font-black uppercase tracking-[.12em]">{label}{required && <b className="ml-1 text-[#d98200]">*</b>}</span>{children}</label>; }
function Input({ icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) { return <span className="relative block"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</span><input required={props.name === "name" || props.name === "email"} {...props} className="h-14 w-full border border-zinc-900 bg-white pl-11 pr-4 text-sm font-semibold outline-none focus:shadow-[3px_3px_0_#ffb21c]" /></span>; }
function Select({ options, placeholder, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder: string }) { return <select {...props} className="h-14 w-full border border-zinc-900 bg-white px-4 text-sm font-semibold outline-none focus:shadow-[3px_3px_0_#ffb21c]"><option value="">{placeholder}</option>{options.map((option)=><option key={option} value={option}>{option}</option>)}</select>; }
function Success({ reset }: { reset: () => void }) { return <div className="grid min-h-[520px] place-items-center p-8 text-center"><div className="max-w-md"><span className="mx-auto grid h-20 w-20 place-items-center border border-zinc-900 bg-[#ffb21c] shadow-[5px_5px_0_#18181b]"><CheckCircle2 size={36} /></span><h3 className="mt-8 text-3xl font-black">Yêu cầu đã được gửi.</h3><p className="mt-4 text-sm leading-7 text-zinc-600">Cảm ơn bạn đã chia sẻ thông tin. Lương Vinh sẽ xem xét và phản hồi trong thời gian sớm nhất.</p><button onClick={reset} className="mt-7 border border-zinc-900 bg-white px-6 py-3 text-[10px] font-black uppercase shadow-[3px_3px_0_#ffb21c]">Gửi yêu cầu khác</button></div></div>; }
