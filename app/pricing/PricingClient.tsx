"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Code2,
  Mail,
  Phone,
  Rocket,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const plans = [
  {
    id: "landing",
    icon: Rocket,
    name: "Landing Page",
    price: "Từ 5 triệu",
    fit: "Cá nhân, sự kiện, quảng cáo",
    time: "Khoảng 1–2 tuần",
    summary: "Một trang tập trung cho chiến dịch, sản phẩm hoặc dịch vụ cụ thể.",
    features: ["Thiết kế responsive theo nhận diện", "Tối đa 5–7 section nội dung", "Form liên hệ hoặc CTA", "SEO on-page cơ bản", "Cấu hình analytics cơ bản", "Hướng dẫn bàn giao"],
  },
  {
    id: "business",
    icon: Building2,
    name: "Website doanh nghiệp",
    price: "Từ 12 triệu",
    fit: "SME, thương hiệu, dịch vụ",
    time: "Khoảng 3–5 tuần",
    summary: "Website đa trang giúp doanh nghiệp giới thiệu năng lực và xây dựng niềm tin.",
    popular: true,
    features: ["Thiết kế UI/UX riêng", "5–10 trang nội dung", "CMS quản trị nội dung", "Blog hoặc dự án", "SEO kỹ thuật & metadata", "Đào tạo quản trị"],
  },
  {
    id: "custom",
    icon: Code2,
    name: "Web App / Custom",
    price: "Báo giá riêng",
    fit: "Startup, hệ thống nội bộ",
    time: "Theo phạm vi",
    summary: "Sản phẩm có nghiệp vụ, tài khoản, dữ liệu hoặc tích hợp theo yêu cầu.",
    features: ["Phân tích yêu cầu nghiệp vụ", "Thiết kế luồng và giao diện", "Tài khoản & phân quyền", "API và cơ sở dữ liệu", "Tích hợp dịch vụ bên thứ ba", "Kế hoạch phát triển theo giai đoạn"],
  },
];

const budgetOptions = ["Dưới 5 triệu", "5 – 10 triệu", "10 – 20 triệu", "20 – 50 triệu", "Trên 50 triệu", "Cần tư vấn"];
const timelineOptions = ["Càng sớm càng tốt", "1–2 tuần", "3–5 tuần", "1–2 tháng", "Chưa rõ thời gian"];

type Plan = (typeof plans)[number];

export default function PricingClient() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      <Toaster position="top-center" />

      <section className="relative border-b border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]">
              <Sparkles size={14} className="text-[#d98200]" /> Pricing by Lương Vinh
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[.9] tracking-[-.06em] sm:text-7xl xl:text-8xl">
              Chi phí rõ ràng.<br /><span className="text-[#d98200]">Phạm vi minh bạch.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
              Chọn gói phù hợp để gửi nhanh thông tin dự án. Yêu cầu sẽ được lưu vào CMS và gửi thông báo về email của bạn qua backend.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#plans" className="group inline-flex items-center gap-5 border border-zinc-900 bg-[#ffb21c] px-6 py-3.5 text-xs font-black uppercase shadow-[4px_4px_0_#18181b]">Xem các gói <ArrowRight size={17} /></a>
              <Link href="/contact" className="inline-flex items-center gap-3 border border-zinc-900 bg-white px-6 py-3.5 text-xs font-black uppercase hover:bg-zinc-950 hover:text-white">Tư vấn riêng <ArrowUpRight size={16} /></Link>
            </div>
          </motion.div>

          <div className="border border-zinc-900 bg-zinc-950 p-6 text-white shadow-[7px_7px_0_#ffb21c] md:p-8">
            <span className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Trước khi chọn gói</span>
            <h2 className="mt-5 text-2xl font-black md:text-3xl">Giá tốt nhất là giá đúng với phạm vi.</h2>
            <ul className="mt-6 space-y-4 text-sm text-zinc-300">
              {["Không thêm tính năng không cần thiết", "Báo rõ phần bao gồm và chưa bao gồm", "Chi phí bên thứ ba được tách riêng", "Thay đổi phạm vi luôn được xác nhận"].map((item) => (
                <li key={item} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-[#ffb21c]" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="plans" className="bg-white py-16 md:py-24">
        <Heading eyebrow="01 · Gói dịch vụ" title={<>Chọn điểm bắt đầu<br /><span>phù hợp với bạn</span></>} />
        <div className="mx-auto mt-12 grid max-w-7xl gap-7 px-5 lg:grid-cols-3 lg:px-8">
          {plans.map((plan, index) => <PriceCard key={plan.id} plan={plan} index={index} onSelect={() => setSelectedPlan(plan)} />)}
        </div>
      </section>

      <section className="border-y border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
        <Heading eyebrow="02 · So sánh nhanh" title={<>Bạn nhận được gì<br /><span>trong từng gói?</span></>} />
        <div className="mx-auto mt-12 max-w-6xl overflow-x-auto px-5 pb-3">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 bg-white text-left shadow-[7px_7px_0_rgba(24,24,27,.14)]">
            <thead>
              <tr>
                <th className="border border-zinc-900 bg-[#ffb21c] p-5 text-sm font-black">Hạng mục</th>
                {plans.map((plan) => <th key={plan.id} className={`border-y border-r border-zinc-900 p-5 text-sm font-black ${plan.popular ? "bg-zinc-950 text-white" : "bg-white"}`}>{plan.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {["Responsive", "UI riêng", "CMS quản trị", "SEO metadata", "Hướng dẫn bàn giao"].map((row) => (
                <tr key={row}>
                  <th className="border-x border-b border-zinc-900 bg-[#fff8e9] p-4 text-xs font-black">{row}</th>
                  {plans.map((plan) => <td key={plan.id} className="border-b border-r border-zinc-900 p-4 text-center"><span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check size={15} strokeWidth={3} /></span></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]">
            <Sparkles size={14} className="text-[#d98200]" /> Need a custom quote?
          </span>
          <h2 className="mt-8 text-[38px] font-black leading-[1.02] tracking-[-.055em] sm:text-5xl md:text-7xl md:leading-[.94]">
            Chưa thấy gói phù hợp?<span className="mt-2 block text-[#d98200]">Hãy chọn phạm vi riêng.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-zinc-600">Gửi mục tiêu, tính năng và ngân sách dự kiến. Tôi sẽ giúp bạn xác định hướng triển khai phù hợp.</p>
          <button onClick={() => setSelectedPlan(plans[2])} className="group mt-8 inline-flex items-center gap-5 border border-zinc-900 bg-[#ffb21c] px-7 py-4 text-xs font-black uppercase shadow-[4px_4px_0_#18181b]">
            Yêu cầu báo giá <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <AnimatePresence>
        {selectedPlan && <PlanLeadModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
      </AnimatePresence>
    </main>
  );
}

function PriceCard({ plan, index, onSelect }: { plan: Plan; index: number; onSelect: () => void }) {
  const Icon = plan.icon;
  return (
    <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.08 }} className={`relative flex flex-col border border-zinc-900 p-6 shadow-[6px_6px_0_rgba(24,24,27,.13)] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#ffb21c] md:p-8 ${plan.popular ? "bg-zinc-950 text-white" : "bg-white"}`}>
      {plan.popular && <span className="absolute right-4 top-4 border border-[#ffb21c] px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#ffb21c]">Phổ biến</span>}
      <div className="flex items-start justify-between"><span className={`grid h-12 w-12 place-items-center border ${plan.popular ? "border-[#ffb21c] bg-[#ffb21c] text-zinc-950" : "border-zinc-900 bg-[#fff8e9]"}`}><Icon size={22} /></span><span className={`text-4xl font-black ${plan.popular ? "text-white/10" : "text-zinc-100"}`}>0{index + 1}</span></div>
      <h3 className="mt-7 text-2xl font-black">{plan.name}</h3>
      <p className={`mt-3 min-h-[48px] text-sm leading-6 ${plan.popular ? "text-zinc-300" : "text-zinc-600"}`}>{plan.summary}</p>
      <div className={`my-6 border-y py-5 ${plan.popular ? "border-white/20" : "border-zinc-300"}`}><strong className="block text-3xl font-black text-[#d98200]">{plan.price}</strong><span className={`mt-2 block text-[9px] font-bold uppercase tracking-wide ${plan.popular ? "text-zinc-400" : "text-zinc-500"}`}>{plan.fit} · {plan.time}</span></div>
      <ul className="flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className={`flex gap-2 text-xs leading-5 ${plan.popular ? "text-zinc-300" : "text-zinc-600"}`}><Check size={14} className="mt-0.5 shrink-0 text-[#d98200]" />{feature}</li>)}</ul>
      <button onClick={onSelect} className={`group mt-7 flex items-center justify-between border border-zinc-900 px-5 py-3.5 text-[10px] font-black uppercase ${plan.popular ? "bg-[#ffb21c] text-zinc-950" : "bg-white hover:bg-[#ffb21c]"}`}>Chọn gói này <ArrowRight size={16} /></button>
    </motion.article>
  );
}

function PlanLeadModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", budget: "", timeline: "", message: "" });

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Vui lòng nhập họ tên, email và nội dung.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service: plan.name,
          projectType: plan.id,
          subject: `Yêu cầu báo giá gói ${plan.name}`,
          source: "contact",
          message: `[Gói đã chọn: ${plan.name} - ${plan.price}]\n${form.message}`,
        }),
      });
      if (!response.ok) throw new Error("Không thể gửi yêu cầu");
      toast.success("Đã gửi yêu cầu báo giá.");
      onClose();
    } catch (error) {
      toast.error("Chưa gửi được yêu cầu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-zinc-950/65 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto border border-zinc-900 bg-[#fff8e9] shadow-[10px_10px_0_#ffb21c]">
        <div className="flex items-start justify-between border-b border-zinc-900 bg-zinc-950 p-5 text-white sm:p-6">
          <div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Pricing request</p><h2 className="mt-2 text-2xl font-black">Chọn gói {plan.name}</h2><p className="mt-2 text-sm text-zinc-400">{plan.price} · {plan.time}</p></div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center border border-white/30 hover:bg-white hover:text-zinc-950"><X size={18} /></button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <Input icon={<UserRound size={17} />} label="Họ và tên" name="name" value={form.name} onChange={update} required />
          <Input icon={<Mail size={17} />} label="Email" name="email" value={form.email} onChange={update} required type="email" />
          <Input icon={<Phone size={17} />} label="Số điện thoại" name="phone" value={form.phone} onChange={update} />
          <Input icon={<Building2 size={17} />} label="Công ty / thương hiệu" name="company" value={form.company} onChange={update} />
          <Select label="Ngân sách dự kiến" name="budget" value={form.budget} onChange={update} options={budgetOptions} />
          <Select label="Thời gian mong muốn" name="timeline" value={form.timeline} onChange={update} options={timelineOptions} />
          <label className="sm:col-span-2"><span className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-zinc-500">Nội dung *</span><textarea name="message" value={form.message} onChange={update} required rows={6} placeholder="Mô tả nhanh mục tiêu, tính năng hoặc website tham khảo..." className="w-full border border-zinc-900 bg-white px-4 py-4 text-sm font-semibold leading-7 outline-none focus:shadow-[4px_4px_0_#ffb21c]" /></label>
        </div>
        <div className="flex flex-col gap-3 border-t border-zinc-900 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-xs font-semibold leading-6 text-zinc-500">Yêu cầu sẽ được lưu vào CMS Leads và gửi mail qua EmailJS backend.</p>
          <button disabled={loading} className="inline-flex items-center justify-center gap-3 border border-zinc-900 bg-[#ffb21c] px-6 py-4 text-[10px] font-black uppercase shadow-[4px_4px_0_#18181b] disabled:opacity-60">{loading ? "Đang gửi..." : "Gửi yêu cầu"} <Send size={16} /></button>
        </div>
      </motion.form>
    </motion.div>
  );
}

function Input({ label, icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: React.ReactNode }) {
  return <label><span className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-zinc-500">{label}</span><span className="relative block">{icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</span>}<input {...props} className={`h-14 w-full border border-zinc-900 bg-white text-sm font-semibold outline-none focus:shadow-[4px_4px_0_#ffb21c] ${icon ? "pl-12 pr-4" : "px-4"}`} /></span></label>;
}

function Select({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  return <label><span className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-zinc-500">{label}</span><select {...props} className="h-14 w-full border border-zinc-900 bg-white px-4 text-sm font-black outline-none focus:shadow-[4px_4px_0_#ffb21c]"><option value="">Chọn thông tin</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function Heading({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-5 text-center lg:px-8"><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">{eyebrow}</span><h2 className="mt-5 text-4xl font-black leading-[.95] tracking-[-.05em] [&>span]:text-[#d98200] md:text-6xl">{title}</h2></div>;
}
