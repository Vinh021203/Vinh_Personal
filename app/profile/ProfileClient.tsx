"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, ExternalLink, Fingerprint, LayoutDashboard,
  LockKeyhole, LogOut, Mail, Settings, ShieldCheck, UserRound,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProfileClient() {
  const { user, loading, logout } = useUser();
  const router = useRouter();

  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [loading, router, user]);

  if (loading) return <ProfileLoading />;
  if (!user) return null;

  const initials = user.name.split(" ").filter(Boolean).slice(-2).map((part) => part[0]).join("").toUpperCase();
  const memberId = user._id ? user._id.slice(-8).toUpperCase() : "VINHWORKS";
  const isAdmin = user.role === "admin";

  return <main className="min-h-screen bg-white text-zinc-950">
    <section className="relative overflow-hidden border-b border-zinc-900 bg-[#fff8e9] py-14 md:py-20">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border-[65px] border-[#ffb21c]/15" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:px-8">
        <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="border border-zinc-900 bg-white p-5 shadow-[9px_9px_0_#ffb21c]">
            <div className="relative aspect-square overflow-hidden border border-zinc-900 bg-zinc-950">
              {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-[clamp(5rem,10vw,9rem)] font-black tracking-[-.08em] text-[#ffb21c]">{initials}</div>}
              <span className="absolute bottom-4 left-4 flex items-center gap-2 border border-zinc-900 bg-white px-3 py-2 text-[9px] font-black uppercase tracking-wider"><i className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Đang hoạt động</span>
            </div>
            <div className="mt-5 flex items-center justify-between"><div><p className="text-[8px] font-black uppercase tracking-[.16em] text-zinc-400">Member ID</p><p className="mt-1 font-mono text-sm font-black">#{memberId}</p></div><span className="border border-zinc-900 bg-[#fff8e9] px-3 py-2 text-[9px] font-black uppercase tracking-wider">{user.role}</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 }}>
          <span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.18em] shadow-[3px_3px_0_#ffb21c]"><UserRound size={14} className="text-[#d98200]" /> Account overview</span>
          <h1 className="mt-7 text-[clamp(3.2rem,6.8vw,6.5rem)] font-black leading-[.88] tracking-[-.07em]">Xin chào,<br /><span className="break-words text-[#d98200]">{user.name}</span></h1>
          <p className="mt-6 flex items-center gap-2 break-all text-sm font-semibold text-zinc-500 md:text-base"><Mail size={17} className="shrink-0 text-[#d98200]" />{user.email}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isAdmin && <Link href="/admin/dashboard" className="group inline-flex items-center gap-5 border border-zinc-900 bg-[#ffb21c] px-6 py-4 text-[10px] font-black uppercase shadow-[4px_4px_0_#18181b]"><LayoutDashboard size={17} /> Dashboard <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>}
            <Link href="/settings" className="inline-flex items-center gap-3 border border-zinc-900 bg-white px-6 py-4 text-[10px] font-black uppercase hover:bg-zinc-950 hover:text-white"><Settings size={16} /> Cài đặt</Link>
            <button onClick={logout} className="inline-flex items-center gap-3 border border-zinc-900 bg-white px-6 py-4 text-[10px] font-black uppercase text-red-600 hover:bg-red-600 hover:text-white"><LogOut size={16} /> Đăng xuất</button>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="border-b border-zinc-900 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-3 px-0 lg:px-8">
        <Status icon={<ShieldCheck size={19} />} label="Vai trò" value={isAdmin ? "Quản trị viên" : "Thành viên"} />
        <Status icon={<CheckCircle2 size={19} />} label="Phiên đăng nhập" value="Đang hoạt động" />
        <Status icon={<LockKeyhole size={19} />} label="Bảo vệ" value="Cookie bảo mật" last />
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
        <div>
          <div className="mb-8"><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">01 · Thông tin tài khoản</p><h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-5xl">Dữ liệu nhận diện.</h2></div>
          <div className="border border-zinc-900 bg-[#fff8e9] shadow-[7px_7px_0_#ffb21c]">
            <InfoRow icon={<UserRound size={18} />} label="Họ và tên" value={user.name} />
            <InfoRow icon={<Mail size={18} />} label="Email đăng nhập" value={user.email} />
            <InfoRow icon={<ShieldCheck size={18} />} label="Quyền truy cập" value={isAdmin ? "Quản trị toàn hệ thống" : "Tài khoản thành viên"} />
            <InfoRow icon={<Fingerprint size={18} />} label="Mã tài khoản" value={`#${memberId}`} last />
          </div>
        </div>

        <aside className="border border-zinc-900 bg-zinc-950 text-white shadow-[7px_7px_0_#ffb21c]">
          <div className="border-b border-white/20 p-6"><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Account security</p><h2 className="mt-2 text-2xl font-black">Bảo mật tài khoản</h2></div>
          <Security title="Email đăng nhập" text="Được sử dụng để xác định duy nhất tài khoản của bạn." />
          <Security title="Phiên xác thực" text="Được lưu bằng HTTP-only cookie và không truy cập từ JavaScript." />
          <Security title="Đăng xuất an toàn" text="Kết thúc phiên hiện tại trên thiết bị này ngay lập tức." last />
          <div className="p-6"><Link href="/settings" className="group flex items-center justify-between border border-white bg-[#ffb21c] px-5 py-4 text-[10px] font-black uppercase text-zinc-950">Mở cài đặt tài khoản <ExternalLink size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
        </aside>
      </div>
    </section>
  </main>;
}

function Status({ icon, label, value, last = false }: { icon: React.ReactNode; label: string; value: string; last?: boolean }) { return <div className={`flex min-w-0 flex-col items-center px-2 py-5 text-center md:flex-row md:gap-4 md:px-6 md:py-7 md:text-left ${last ? "" : "border-r border-white/20"}`}><span className="grid h-9 w-9 shrink-0 place-items-center border border-[#ffb21c] text-[#ffb21c]">{icon}</span><div className="mt-2 min-w-0 md:mt-0"><p className="text-[7px] font-black uppercase tracking-[.1em] text-zinc-500 md:text-[8px] md:tracking-[.14em]">{label}</p><p className="mt-1 truncate text-[9px] font-black md:text-xs">{value}</p></div></div>; }
function InfoRow({ icon, label, value, last = false }: { icon: React.ReactNode; label: string; value: string; last?: boolean }) { return <div className={`grid grid-cols-[44px_1fr] gap-4 p-5 md:grid-cols-[48px_180px_1fr] md:items-center md:p-6 ${last ? "" : "border-b border-zinc-900"}`}><span className="row-span-2 grid h-11 w-11 place-items-center border border-zinc-900 bg-white text-[#d98200] md:row-span-1">{icon}</span><p className="text-[8px] font-black uppercase tracking-[.14em] text-zinc-400">{label}</p><p className="break-all text-sm font-black md:text-base">{value}</p></div>; }
function Security({ title, text, last = false }: { title: string; text: string; last?: boolean }) { return <div className={`flex gap-4 p-6 ${last ? "" : "border-b border-white/20"}`}><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#ffb21c]" /><div><h3 className="text-xs font-black uppercase tracking-wide">{title}</h3><p className="mt-2 text-[11px] leading-5 text-zinc-400">{text}</p></div></div>; }
function ProfileLoading() { return <LoadingSpinner fullScreen size="lg" label="Đang tải hồ sơ" />; }
