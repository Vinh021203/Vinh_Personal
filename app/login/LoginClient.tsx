"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, Code2, Eye, EyeOff,
  Lock, Mail, ShieldCheck, Sparkles, XCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/contexts/UserContext";

export default function LoginClient() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.custom((current) => <ToastCard visible={current.visible} success={false} title="Đăng nhập thất bại" text={data.message || "Vui lòng kiểm tra lại email và mật khẩu."} />);
        return;
      }
      if (data?.user) {
        setUser(data.user);
        toast.custom((current) => <ToastCard visible={current.visible} success title="Chào mừng trở lại" text="Đang chuyển hướng vào hệ thống." />);
        router.replace(data.user.role === "admin" ? "/admin/dashboard" : "/");
      } else router.push("/");
    } catch {
      toast.error("Không thể kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return <main className="fixed inset-0 z-[80] grid h-[100dvh] w-full max-w-full overflow-hidden bg-[#fff8e9] text-zinc-950 lg:grid-cols-[1.08fr_.92fr]">
    <Toaster position="top-center" toastOptions={{ duration: 3500 }} />

    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative hidden overflow-hidden border-r border-zinc-900 bg-zinc-950 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-32 -top-32 h-[430px] w-[430px] rounded-full border-[70px] border-[#ffb21c]/10" />
      <div className="absolute -bottom-32 left-1/4 h-80 w-80 rotate-45 border-[55px] border-white/[.035]" />
      <div className="relative flex items-center justify-between border-b border-white/15 px-8 py-6 xl:px-12">
        <Link href="/" aria-label="VinhWorks - Trang chủ" className="group rounded-sm bg-white px-3 py-2"><BrandLogo priority className="h-8 w-auto transition-transform group-hover:scale-[1.03]" /></Link>
        <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[.18em] text-zinc-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Secure access</span>
      </div>

      <div className="relative px-8 xl:px-12">
        <span className="inline-flex -rotate-2 items-center gap-2 border border-white bg-zinc-950 px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]"><Code2 size={14} className="text-[#ffb21c]" /> Workspace by Lương Vinh</span>
        <h1 className="mt-8 max-w-3xl text-[clamp(3.4rem,5.6vw,6.4rem)] font-black leading-[.87] tracking-[-.07em]">Quản lý dự án.<br /><span className="text-[#ffb21c]">Tập trung hơn.</span></h1>
        <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 xl:text-base xl:leading-8">Đăng nhập để truy cập bảng điều khiển, theo dõi dữ liệu và quản lý những nội dung đang vận hành trên VinhWorks.</p>
        <div className="mt-9 grid max-w-2xl grid-cols-3 border border-white/20">
          <Benefit number="01" text="Dữ liệu tập trung" />
          <Benefit number="02" text="Trạng thái rõ ràng" />
          <Benefit number="03" text="Truy cập bảo mật" last />
        </div>
      </div>

      <div className="relative flex items-center justify-between border-t border-white/15 px-8 py-5 text-[8px] font-black uppercase tracking-[.16em] text-zinc-500 xl:px-12"><span>© 2026 VinhWorks</span><span>Hạ Long · Việt Nam</span></div>
    </motion.section>

    <section className="relative h-full min-h-0 overflow-hidden bg-[#fff8e9]">
      <div className="pointer-events-none absolute -right-28 top-20 h-64 w-64 rounded-full bg-[#ffb21c]/20 blur-3xl" />
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-xl flex-col px-5 py-4 sm:px-9 lg:max-w-none lg:px-[clamp(2.5rem,6vw,6rem)] lg:py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.14em] text-zinc-500 hover:text-zinc-950"><ArrowLeft size={15} /> Trang chủ</Link>
          <Link href="/register" className="border border-zinc-900 bg-white px-4 py-2.5 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0_#ffb21c]">Tạo tài khoản</Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} className="my-auto py-4 lg:py-2">
          <Link href="/" aria-label="VinhWorks - Trang chủ" className="mb-7 inline-flex lg:hidden"><BrandLogo priority className="h-9 w-auto" /></Link>
          <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-[#b85f00]"><Sparkles size={14} /> Member access</span>
          <h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-.055em] sm:text-5xl">Chào mừng<br /><span className="text-[#d98200]">bạn trở lại.</span></h2>
          <p className="mt-4 text-sm leading-6 text-zinc-600">Nhập thông tin tài khoản để tiếp tục vào hệ thống.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block"><span className="mb-2 flex items-center justify-between text-[9px] font-black uppercase tracking-[.14em]"><span>Email</span>{email.includes("@") && email.includes(".") && <span className="flex items-center gap-1 text-emerald-600"><Check size={12} /> Hợp lệ</span>}</span><span className="relative block"><Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" /><input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="h-14 w-full border border-zinc-900 bg-white pl-11 pr-4 text-sm font-semibold outline-none transition-shadow placeholder:text-zinc-300 focus:shadow-[4px_4px_0_#ffb21c]" /></span></label>

            <label className="block"><span className="mb-2 flex items-center justify-between text-[9px] font-black uppercase tracking-[.14em]"><span>Mật khẩu</span><Link href="/contact" className="text-[#b85f00] hover:underline">Cần hỗ trợ?</Link></span><span className="relative block"><Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" /><input type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="h-14 w-full border border-zinc-900 bg-white pl-11 pr-12 text-sm font-semibold outline-none transition-shadow placeholder:text-zinc-300 focus:shadow-[4px_4px_0_#ffb21c]" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center hover:bg-[#fff8e9]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>

            <button type="submit" disabled={loading} className="group flex h-14 w-full items-center justify-between border border-zinc-900 bg-[#ffb21c] px-5 text-xs font-black uppercase shadow-[5px_5px_0_#18181b] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"><span className="flex min-w-[138px] items-center gap-3">{loading && <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-zinc-900/30 border-t-zinc-900" />}{loading ? "Đang xác thực" : "Đăng nhập"}</span><ArrowRight size={17} className={`transition-all ${loading ? "opacity-30" : "group-hover:translate-x-1"}`} /></button>
          </form>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-300 pt-4"><p className="text-xs text-zinc-500">Chưa có tài khoản?</p><Link href="/register" className="text-[10px] font-black uppercase tracking-wider text-[#b85f00] hover:underline">Đăng ký ngay →</Link></div>
          <p className="mt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-[.16em] text-zinc-400"><ShieldCheck size={13} className="text-emerald-600" /> Phiên đăng nhập được bảo vệ bằng cookie bảo mật</p>
        </motion.div>
      </div>
    </section>
  </main>;
}

function Benefit({ number, text, last = false }: { number: string; text: string; last?: boolean }) { return <div className={`p-5 ${last ? "" : "border-r border-white/20"}`}><span className="text-xs font-black text-[#ffb21c]">{number}</span><p className="mt-3 text-[10px] font-black uppercase leading-5 tracking-[.1em] text-zinc-300 xl:text-xs">{text}</p></div>; }
function ToastCard({ visible, success, title, text }: { visible: boolean; success: boolean; title: string; text: string }) { return <div className={`${visible ? "animate-enter" : "animate-leave"} flex w-full max-w-sm items-start gap-3 border border-zinc-900 bg-white p-4 shadow-[5px_5px_0_#ffb21c]`}>{success ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} /> : <XCircle className="mt-0.5 shrink-0 text-red-500" size={20} />}<div><p className="text-sm font-black">{title}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p></div></div>; }
