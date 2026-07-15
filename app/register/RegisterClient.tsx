"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, Code2, Eye, EyeOff,
  Lock, Mail, ShieldCheck, Sparkles, UserRound, XCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!accepted) { toast.error("Vui lòng xác nhận điều khoản sử dụng."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.custom((current) => <ToastCard visible={current.visible} success={false} title="Đăng ký thất bại" text={data.message || "Email này có thể đã được sử dụng."} />);
        return;
      }
      toast.custom((current) => <ToastCard visible={current.visible} success title="Tạo tài khoản thành công" text="Đang chuyển hướng đến trang đăng nhập." />);
      setName(""); setEmail(""); setPassword("");
      window.setTimeout(() => router.push("/login"), 900);
    } catch {
      toast.error("Không thể kết nối máy chủ. Vui lòng thử lại.");
    } finally { setLoading(false); }
  };

  return <main className="fixed inset-0 z-[80] grid h-[100dvh] w-full max-w-full overflow-hidden bg-[#fff8e9] text-zinc-950 lg:grid-cols-[1.15fr_.85fr]">
    <Toaster position="top-center" />

    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative hidden overflow-hidden border-r border-zinc-900 bg-zinc-950 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-32 -top-32 h-[430px] w-[430px] rounded-full border-[70px] border-[#ffb21c]/10" />
      <div className="absolute -bottom-32 left-1/4 h-80 w-80 rotate-45 border-[55px] border-white/[.035]" />
      <div className="relative flex items-center justify-between border-b border-white/15 px-8 py-6 xl:px-12">
        <Link href="/" aria-label="VinhWorks - Trang chủ" className="group rounded-sm bg-white px-3 py-2"><BrandLogo priority className="h-8 w-auto transition-transform group-hover:scale-[1.03]" /></Link>
        <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[.18em] text-zinc-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Create workspace access</span>
      </div>
      <div className="relative px-8 xl:px-12">
        <span className="inline-flex -rotate-2 items-center gap-2 border border-white bg-zinc-950 px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]"><Code2 size={14} className="text-[#ffb21c]" /> Join VinhWorks</span>
        <h1 className="mt-8 max-w-3xl text-[clamp(3.4rem,5.6vw,6.4rem)] font-black leading-[.87] tracking-[-.07em]">Bắt đầu một<br /><span className="text-[#ffb21c]">không gian mới.</span></h1>
        <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 xl:text-base xl:leading-8">Tạo tài khoản để truy cập hệ thống, theo dõi thông tin cá nhân và sử dụng những tính năng dành cho thành viên.</p>
        <div className="mt-9 grid max-w-2xl grid-cols-3 border border-white/20"><Benefit number="01" text="Tài khoản riêng" /><Benefit number="02" text="Dữ liệu bảo mật" /><Benefit number="03" text="Truy cập nhanh" last /></div>
      </div>
      <div className="relative flex items-center justify-between border-t border-white/15 px-8 py-5 text-[8px] font-black uppercase tracking-[.16em] text-zinc-500 xl:px-12"><span>© 2026 VinhWorks</span><span>webgiare.id.vn</span></div>
    </motion.section>

    <section className="relative h-full min-h-0 overflow-hidden bg-[#fff8e9]">
      <div className="pointer-events-none absolute -right-28 top-20 h-64 w-64 rounded-full bg-[#ffb21c]/20 blur-3xl" />
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-xl flex-col px-5 py-3 sm:px-9 lg:max-w-none lg:px-[clamp(2.25rem,5vw,4.5rem)] lg:py-4">
        <div className="flex items-center justify-between"><Link href="/" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.14em] text-zinc-500 hover:text-zinc-950"><ArrowLeft size={15} /> Trang chủ</Link><Link href="/login" className="border border-zinc-900 bg-white px-4 py-2.5 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0_#ffb21c]">Đăng nhập</Link></div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} className="my-auto py-0">
          <Link href="/" aria-label="VinhWorks - Trang chủ" className="mb-5 inline-flex lg:hidden"><BrandLogo priority className="h-8 w-auto" /></Link>
          <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-[#b85f00]"><Sparkles size={14} /> New member</span>
          <h2 className="mt-2 text-4xl font-black leading-[.92] tracking-[-.055em]">Tạo tài khoản<br /><span className="text-[#d98200]">VinhWorks.</span></h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">Chỉ mất một phút để bắt đầu.</p>

          <form onSubmit={submit} className="mt-4 space-y-3">
            <Field label="Họ và tên"><Input icon={<UserRound size={16} />} value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="name" placeholder="Tên của bạn" /></Field>
            <Field label="Email" valid={email.includes("@") && email.includes(".")}><Input type="email" icon={<Mail size={16} />} value={email} onChange={(event) => setEmail(event.target.value)} name="email" autoComplete="email" placeholder="name@example.com" /></Field>
            <Field label="Mật khẩu"><span className="relative block"><Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" /><input type={showPassword ? "text" : "password"} required minLength={6} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Tối thiểu 6 ký tự" className="w-full border border-zinc-900 bg-white py-3 pl-11 pr-12 text-sm font-semibold outline-none placeholder:text-zinc-300 focus:shadow-[4px_4px_0_#ffb21c]" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center hover:bg-[#fff8e9]">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span><PasswordMeter password={password} /></Field>

            <label className="flex cursor-pointer items-start gap-3 text-[10px] leading-5 text-zinc-500"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="peer sr-only" /><span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center border border-zinc-900 bg-white peer-checked:bg-[#ffb21c]">{accepted && <Check size={11} strokeWidth={3} />}</span><span>Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của VinhWorks.</span></label>
            <button type="submit" disabled={loading} className="group flex w-full items-center justify-between border border-zinc-900 bg-[#ffb21c] px-5 py-3 text-xs font-black uppercase shadow-[5px_5px_0_#18181b] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"><span className="flex min-w-[166px] items-center gap-3">{loading && <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-zinc-900/30 border-t-zinc-900" />}{loading ? "Đang tạo tài khoản" : "Đăng ký"}</span><ArrowRight size={17} className={`transition-all ${loading ? "opacity-30" : "group-hover:translate-x-1"}`} /></button>
          </form>

          <div className="mt-3 flex items-center justify-between gap-4 border-t border-zinc-300 pt-3"><p className="text-xs text-zinc-500">Đã có tài khoản?</p><Link href="/login" className="text-[10px] font-black uppercase tracking-wider text-[#b85f00] hover:underline">Đăng nhập →</Link></div>
          <p className="mt-2 flex items-center gap-2 text-[8px] font-black uppercase tracking-[.16em] text-zinc-400"><ShieldCheck size={13} className="text-emerald-600" /> Mật khẩu được mã hóa trước khi lưu trữ</p>
        </motion.div>
      </div>
    </section>
  </main>;
}

function Field({ label, valid, children }: { label: string; valid?: boolean; children: React.ReactNode }) { return <label className="block"><span className="mb-1.5 flex items-center justify-between text-[9px] font-black uppercase tracking-[.14em]"><span>{label}</span>{valid && <span className="flex items-center gap-1 text-emerald-600"><Check size={11} /> Hợp lệ</span>}</span>{children}</label>; }
function Input({ icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) { return <span className="relative block"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</span><input required {...props} className="w-full border border-zinc-900 bg-white py-3 pl-11 pr-4 text-sm font-semibold outline-none placeholder:text-zinc-300 focus:shadow-[4px_4px_0_#ffb21c]" /></span>; }
function PasswordMeter({ password }: { password: string }) { const score = [password.length >= 6, password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password)].filter(Boolean).length; return <div className="mt-2 flex items-center gap-2"><div className="flex flex-1 gap-1">{[1,2,3,4].map((level)=><span key={level} className={`h-1 flex-1 ${score >= level ? score <= 1 ? "bg-red-500" : score <= 2 ? "bg-[#ffb21c]" : "bg-emerald-500" : "bg-zinc-200"}`} />)}</div>{password && <span className="text-[8px] font-black uppercase text-zinc-400">{score <= 1 ? "Yếu" : score <= 2 ? "Trung bình" : "Tốt"}</span>}</div>; }
function Benefit({ number, text, last = false }: { number: string; text: string; last?: boolean }) { return <div className={`p-5 ${last ? "" : "border-r border-white/20"}`}><span className="text-xs font-black text-[#ffb21c]">{number}</span><p className="mt-3 text-[10px] font-black uppercase leading-5 tracking-[.1em] text-zinc-300 xl:text-xs">{text}</p></div>; }
function ToastCard({ visible, success, title, text }: { visible: boolean; success: boolean; title: string; text: string }) { return <div className={`${visible ? "animate-enter" : "animate-leave"} flex w-full max-w-sm items-start gap-3 border border-zinc-900 bg-white p-4 shadow-[5px_5px_0_#ffb21c]`}>{success ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} /> : <XCircle className="mt-0.5 shrink-0 text-red-500" size={20} />}<div><p className="text-sm font-black">{title}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p></div></div>; }
