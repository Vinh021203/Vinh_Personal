"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const services = ["Website doanh nghiệp", "Landing Page", "Web Application", "UI/UX Design", "SEO & Performance", "Content & Design", "Khác"];
const budgets = ["Dưới 5 triệu", "5 – 10 triệu", "10 – 20 triệu", "20 – 50 triệu", "Trên 50 triệu", "Cần tư vấn"];
const timelines = ["Càng sớm càng tốt", "1–2 tuần", "3–5 tuần", "1–2 tháng", "Chưa rõ thời gian"];
const projectTypes = ["Website giới thiệu", "Landing page", "E-commerce", "Web app", "CMS/Admin", "Tối ưu hoặc redesign"];
const planMap: Record<string, string> = { landing: "Landing Page", business: "Website doanh nghiệp", custom: "Web Application" };

export default function ContactClient() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    projectType: "",
    budget: "",
    timeline: "",
    subject: "",
    message: "",
    website: "",
  });

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan && planMap[plan]) {
      setForm((current) => ({ ...current, service: planMap[plan], subject: `Tư vấn gói ${planMap[plan]}` }));
    }
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

      if (!leadResponse.ok) throw new Error("Không thể gửi yêu cầu liên hệ");

      setSent(true);
      setForm({ name: "", email: "", phone: "", company: "", service: "", projectType: "", budget: "", timeline: "", subject: "", message: "", website: "" });
      toast.success("Đã gửi yêu cầu thành công.");
    } catch (error) {
      console.error("Contact submit error:", error);
      toast.error("Chưa thể gửi tin nhắn. Bạn có thể gọi hoặc gửi email trực tiếp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      <Toaster position="top-center" toastOptions={{ style: { border: "1px solid #18181b", borderRadius: 0, boxShadow: "4px 4px 0 #ffb21c", fontWeight: 700 } }} />

      <section className="relative border-b border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
        <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#ffb21c]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]">
              <MessageCircle size={14} className="text-[#d98200]" /> Start a conversation
            </span>
            <h1 className="mt-8 text-[clamp(3.4rem,7vw,7rem)] font-black leading-[.88] tracking-[-.07em]">
              Hãy nói về<br /><span className="text-[#d98200]">dự án của bạn.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
              Chia sẻ mục tiêu, phạm vi và thời gian dự kiến. Lương Vinh sẽ phản hồi bằng một hướng tiếp cận rõ ràng, phù hợp với nhu cầu thực tế.
            </p>
          </motion.div>

          <div className="border border-zinc-900 bg-zinc-950 text-white shadow-[8px_8px_0_#ffb21c]">
            <div className="border-b border-white/20 p-6">
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Trao đổi trực tiếp</p>
              <h2 className="mt-2 text-2xl font-black">Không qua trung gian.</h2>
            </div>
            <QuickContact icon={<Phone size={18} />} label="Điện thoại" value="0971 386 588" href="tel:0971386588" />
            <QuickContact icon={<Mail size={18} />} label="Email" value="contact@vinhworks.com" href="mailto:contact@vinhworks.com" />
            <QuickContact icon={<Globe2 size={18} />} label="Website" value="webgiare.id.vn" href="https://webgiare.id.vn" last />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 border border-zinc-900 bg-[#fff8e9] px-4 py-2 text-[9px] font-black uppercase tracking-[.18em] shadow-[3px_3px_0_#ffb21c]">
              <Sparkles size={14} className="text-[#d98200]" /> Brief rõ ràng
            </span>
            <h2 className="mt-7 text-4xl font-black leading-[.95] tracking-[-.06em] md:text-6xl">
              Gửi thông tin.<br /><span className="text-[#d98200]">Nhận hướng đi.</span>
            </h2>
            <div className="mt-8 grid gap-3">
              <InfoRow icon={<Clock3 size={18} />} title="Phản hồi nhanh" text="Thông thường trong 24 giờ làm việc." />
              <InfoRow icon={<ShieldCheck size={18} />} title="Thông tin riêng tư" text="Brief chỉ dùng để tư vấn và lập phạm vi dự án." />
              <InfoRow icon={<CheckCircle2 size={18} />} title="Đề xuất thực tế" text="Ưu tiên giải pháp phù hợp ngân sách và mục tiêu." />
            </div>
          </div>

          <form onSubmit={submit} className="border border-zinc-900 bg-[#fff8e9] p-5 shadow-[8px_8px_0_#111] sm:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <Input icon={<UserRound size={18} />} label="Họ và tên" name="name" value={form.name} onChange={update} required placeholder="Lương Vinh" />
              <Input icon={<Mail size={18} />} label="Email" name="email" type="email" value={form.email} onChange={update} required placeholder="name@example.com" />
              <Input icon={<Phone size={18} />} label="Số điện thoại" name="phone" value={form.phone} onChange={update} placeholder="0971 386 588" />
              <Input icon={<Building2 size={18} />} label="Công ty / thương hiệu" name="company" value={form.company} onChange={update} placeholder="Tên thương hiệu nếu có" />

              <Select label="Dịch vụ quan tâm" name="service" value={form.service} onChange={update} options={services} />
              <Select label="Loại dự án" name="projectType" value={form.projectType} onChange={update} options={projectTypes} />
              <Select label="Ngân sách dự kiến" name="budget" value={form.budget} onChange={update} options={budgets} />
              <Select label="Thời gian mong muốn" name="timeline" value={form.timeline} onChange={update} options={timelines} icon={<CalendarDays size={18} />} />

              <div className="md:col-span-2">
                <Input label="Tiêu đề" name="subject" value={form.subject} onChange={update} placeholder="Tư vấn website cho thương hiệu..." />
              </div>
              <label className="md:col-span-2">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-zinc-500">Nội dung *</span>
                <textarea name="message" value={form.message} onChange={update} required rows={7} placeholder="Bạn cần website như thế nào, mục tiêu chính, tính năng mong muốn..." className="w-full border border-zinc-900 bg-white px-4 py-4 text-sm font-semibold leading-7 outline-none transition focus:shadow-[4px_4px_0_#ffb21c]" />
              </label>
              <input name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            </div>

            <button disabled={submitting} className="mt-6 inline-flex w-full items-center justify-center gap-3 border border-zinc-900 bg-[#ffb21c] px-6 py-5 text-sm font-black uppercase tracking-[.14em] shadow-[5px_5px_0_#111] transition hover:-translate-y-0.5 disabled:opacity-60">
              {submitting ? "Đang gửi..." : sent ? "Gửi thêm yêu cầu" : "Gửi yêu cầu"} <Send size={18} />
            </button>
            <p className="mt-4 text-center text-xs font-semibold leading-6 text-zinc-500">
              Thông tin của bạn chỉ dùng để tư vấn dự án và sẽ được phản hồi trực tiếp bởi Lương Vinh.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function QuickContact({ icon, label, value, href, last }: { icon: React.ReactNode; label: string; value: string; href: string; last?: boolean }) {
  return (
    <a href={href} className={`flex items-center justify-between gap-4 p-6 transition hover:bg-white/5 ${last ? "" : "border-b border-white/20"}`}>
      <span className="flex items-center gap-4">
        <span className="grid h-11 w-11 place-items-center border border-white/25 bg-white/10 text-[#ffb21c]">{icon}</span>
        <span>
          <span className="block text-[9px] font-black uppercase tracking-[.18em] text-white/45">{label}</span>
          <strong className="mt-1 block text-lg">{value}</strong>
        </span>
      </span>
      <ArrowUpRight size={18} className="text-[#ffb21c]" />
    </a>
  );
}

function InfoRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4 border border-zinc-900 bg-white p-4 shadow-[4px_4px_0_#e4ded0]">
      <span className="grid h-11 w-11 shrink-0 place-items-center border border-zinc-900 bg-[#ffb21c]">{icon}</span>
      <div>
        <h3 className="font-black">{title}</h3>
        <p className="mt-1 text-sm font-semibold leading-6 text-zinc-600">{text}</p>
      </div>
    </div>
  );
}

function Input({ label, icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: React.ReactNode }) {
  return (
    <label>
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-zinc-500">{label}</span>
      <span className="relative block">
        {icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</span>}
        <input {...props} className={`w-full border border-zinc-900 bg-white py-4 text-sm font-semibold outline-none transition focus:shadow-[4px_4px_0_#ffb21c] ${icon ? "pl-12 pr-4" : "px-4"}`} />
      </span>
    </label>
  );
}

function Select({ label, icon, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; icon?: React.ReactNode; options: string[] }) {
  return (
    <label>
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-zinc-500">{label}</span>
      <span className="relative block">
        {icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</span>}
        <select {...props} className={`w-full border border-zinc-900 bg-white py-4 text-sm font-black outline-none transition focus:shadow-[4px_4px_0_#ffb21c] ${icon ? "pl-12 pr-4" : "px-4"}`}>
          <option value="">Chọn thông tin</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </span>
    </label>
  );
}
