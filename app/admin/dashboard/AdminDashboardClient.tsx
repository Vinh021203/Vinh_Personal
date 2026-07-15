"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity, ArrowRight, BriefcaseBusiness, CheckCircle2, CircleDollarSign,
  FolderKanban, Gauge, MessageCircle, Plus, RefreshCw, Server, ShieldCheck,
  Sparkles, TrendingUp, UserCog, Users, Wrench,
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

type DashboardData = {
  totals: { projects: number; messages: number; users: number; services: number };
  projects: { completed: number; active: number; averageProgress: number; totalBudget: number };
  users: { admins: number; members: number };
  timeline: { label: string; projects: number; users: number }[];
  recentProjects: { _id: string; name: string; client: string; status: string; progress: number; priority: string; updatedAt: string }[];
  recentMessages: { _id: string; senderName: string; content: string; isAdmin: boolean; createdAt: string }[];
  generatedAt: string;
};

export default function AdminDashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (manual = false) => {
    manual ? setRefreshing(true) : setLoading(true); setError("");
    try { const response = await fetch("/api/dashboard", { cache: "no-store" }); if (!response.ok) throw new Error(); setData(await response.json()); }
    catch { setError("Chưa thể kết nối dữ liệu dashboard."); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);
  useEffect(() => { load(); }, [load]);
  if (loading) return <div className="grid min-h-[calc(100dvh-72px)] place-items-center bg-[#fff8e9]"><LoadingSpinner size="lg" label="Đang tải dashboard" /></div>;
  if (!data) return <div className="grid min-h-[60vh] place-items-center bg-[#fff8e9] p-6 text-center"><div><p className="font-black">{error}</p><button onClick={() => load()} className="mt-5 border border-zinc-900 bg-[#ffb21c] px-5 py-3 text-[9px] font-black uppercase shadow-[4px_4px_0_#18181b]">Thử lại</button></div></div>;

  const stats = [
    { label: "Dự án", value: data.totals.projects, note: `${data.projects.completed} đã hoàn thành`, icon: FolderKanban, href: "/admin/projects", tone: "yellow" },
    { label: "Dịch vụ", value: data.totals.services, note: "Danh mục trên hệ thống", icon: Wrench, href: "/admin/services", tone: "white" },
    { label: "Người dùng", value: data.totals.users, note: `${data.users.admins} quản trị viên`, icon: Users, href: "/admin/users", tone: "dark" },
    { label: "Tin nhắn", value: data.totals.messages, note: "Trao đổi đã ghi nhận", icon: MessageCircle, href: "/admin/messages", tone: "white" },
  ];

  return <main className="min-h-full overflow-hidden bg-[#fff8e9] text-zinc-950">
    <section className="relative border-b border-zinc-900 bg-white"><div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(135deg,transparent_40%,rgba(255,178,28,.12)_40%)]" /><div className="relative mx-auto flex max-w-[1500px] flex-col gap-7 px-5 py-10 md:flex-row md:items-end md:justify-between lg:px-8"><div><span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-900 bg-[#fff8e9] px-3 py-2 text-[8px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]"><Sparkles size={13} className="text-[#d98200]" /> Live backend overview</span><h1 className="mt-6 text-5xl font-black leading-[.88] tracking-[-.065em] md:text-7xl">Control<br /><span className="text-[#d98200]">Center.</span></h1><p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">Toàn cảnh dữ liệu, tiến độ và hoạt động đang vận hành trên VinhWorks.</p></div><div className="flex flex-wrap gap-3"><button onClick={() => load(true)} disabled={refreshing} className="inline-flex min-h-12 items-center gap-3 border border-zinc-900 bg-white px-5 text-[9px] font-black uppercase hover:bg-zinc-950 hover:text-white"><RefreshCw size={15} className={refreshing ? "animate-spin" : ""} /> Làm mới</button><Link href="/admin/projects/create" className="inline-flex min-h-12 items-center gap-3 border border-zinc-900 bg-[#ffb21c] px-5 text-[9px] font-black uppercase shadow-[4px_4px_0_#18181b]"><Plus size={15} /> Tạo dự án</Link></div></div></section>

    <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8 lg:py-10">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((item, index) => <StatCard key={item.label} {...item} number={`0${index + 1}`} />)}</section>

      <section className="mt-8 grid gap-7 xl:grid-cols-[1.45fr_.55fr]">
        <div className="border border-zinc-900 bg-white shadow-[7px_7px_0_#ffb21c]">
          <SectionHead eyebrow="Growth signals" title="Tăng trưởng 6 tháng" icon={<TrendingUp size={20} />} />
          <div className="p-5 md:p-7"><TrendChart data={data.timeline} /><div className="mt-6 flex flex-wrap gap-5 border-t border-zinc-200 pt-5 text-[9px] font-black uppercase tracking-[.1em]"><span className="flex items-center gap-2"><i className="h-3 w-3 bg-[#ffb21c]" /> Dự án mới</span><span className="flex items-center gap-2"><i className="h-3 w-3 bg-zinc-950" /> Người dùng mới</span><span className="ml-auto text-zinc-400">Dữ liệu từ MongoDB</span></div></div>
        </div>

        <div className="grid gap-7">
          <div className="border border-zinc-900 bg-zinc-950 p-6 text-white shadow-[7px_7px_0_#ffb21c]"><div className="flex items-center justify-between"><div><p className="text-[8px] font-black uppercase tracking-[.2em] text-[#ffb21c]">Delivery rate</p><h2 className="mt-2 text-xl font-black">Tiến độ dự án</h2></div><Gauge className="text-[#ffb21c]" /></div><div className="mt-7 flex items-center gap-6"><Donut value={data.projects.averageProgress} /><div><p className="text-3xl font-black">{data.projects.averageProgress}%</p><p className="mt-2 text-[9px] uppercase tracking-wider text-zinc-400">Tiến độ trung bình</p></div></div><div className="mt-6 grid grid-cols-2 border border-white/20"><Mini value={data.projects.active} label="Đang chạy" /><Mini value={data.projects.completed} label="Hoàn thành" last /></div></div>
          <div className="border border-zinc-900 bg-[#ffb21c] p-5 shadow-[6px_6px_0_#18181b]"><div className="flex items-center justify-between"><CircleDollarSign size={20} /><span className="text-[8px] font-black uppercase tracking-[.18em]">Tổng ngân sách</span></div><p className="mt-6 text-3xl font-black tracking-[-.04em]">{formatMoney(data.projects.totalBudget)}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-wider">Từ dữ liệu dự án hiện tại</p></div>
        </div>
      </section>

      <section className="mt-8 grid items-start gap-7 xl:grid-cols-[1.2fr_.8fr]">
        <div className="border border-zinc-900 bg-white"><SectionHead eyebrow="Project pipeline" title="Dự án cập nhật gần đây" icon={<BriefcaseBusiness size={20} />} /><div>{data.recentProjects.length ? data.recentProjects.map((project, index) => <ProjectRow key={project._id} project={project} index={index} last={index === data.recentProjects.length - 1} />) : <Empty text="Chưa có dự án trong hệ thống." />}</div><Link href="/admin/projects" className="flex min-h-14 items-center justify-between border-t border-zinc-900 bg-[#fff8e9] px-5 text-[9px] font-black uppercase">Quản lý toàn bộ dự án <ArrowRight size={15} /></Link></div>
        <div className="border border-zinc-900 bg-white"><SectionHead eyebrow="Inbox activity" title="Trao đổi mới nhất" icon={<MessageCircle size={20} />} /><div>{data.recentMessages.length ? data.recentMessages.map((message, index) => <MessageRow key={message._id} message={message} last={index === data.recentMessages.length - 1} />) : <Empty text="Chưa có tin nhắn mới." />}</div><Link href="/admin/messages" className="flex min-h-14 items-center justify-between border-t border-zinc-900 bg-zinc-950 px-5 text-[9px] font-black uppercase text-white">Mở hộp thư <ArrowRight size={15} className="text-[#ffb21c]" /></Link></div>
      </section>

      <section className="mt-8 grid border border-zinc-900 bg-zinc-950 text-white md:grid-cols-4"><Health icon={<Server size={17} />} title="Database" text="MongoDB connected" /><Health icon={<ShieldCheck size={17} />} title="Authentication" text="Session protected" /><Health icon={<Activity size={17} />} title="API status" text="Operational" /><Health icon={<CheckCircle2 size={17} />} title="Last sync" text={new Date(data.generatedAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} last /></section>
    </div>
  </main>;
}

function StatCard({ label, value, note, icon: Icon, href, tone, number }: any) { const palette = tone === "yellow" ? "bg-[#ffb21c] shadow-[6px_6px_0_#18181b]" : tone === "dark" ? "bg-zinc-950 text-white shadow-[6px_6px_0_#ffb21c]" : "bg-white shadow-[6px_6px_0_#dedede]"; return <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}><Link href={href} className={`group block min-h-52 border border-zinc-900 p-5 transition-transform hover:-translate-y-1 ${palette}`}><div className="flex justify-between"><span className={`grid h-12 w-12 place-items-center border ${tone === "dark" ? "border-white/30 text-[#ffb21c]" : "border-zinc-900 bg-white"}`}><Icon size={20} /></span><span className="text-[9px] font-black opacity-40">{number}</span></div><p className="mt-8 text-4xl font-black">{value}</p><div className="mt-3 flex items-end"><div><p className="text-xs font-black uppercase tracking-[.12em]">{label}</p><p className="mt-2 text-[9px] opacity-60">{note}</p></div><ArrowRight size={16} className="ml-auto transition-transform group-hover:translate-x-1" /></div></Link></motion.div>; }
function SectionHead({ eyebrow, title, icon }: { eyebrow: string; title: string; icon: React.ReactNode }) { return <div className="flex items-center justify-between border-b border-zinc-900 p-5 md:p-6"><div><p className="text-[8px] font-black uppercase tracking-[.2em] text-[#d98200]">{eyebrow}</p><h2 className="mt-2 text-xl font-black md:text-2xl">{title}</h2></div>{icon}</div>; }
function TrendChart({ data }: { data: DashboardData["timeline"] }) { const max = Math.max(...data.flatMap((item) => [item.projects, item.users]), 1); const width = 600, height = 210, pad = 24; const points = (key: "projects" | "users") => data.map((item, index) => `${pad + index * ((width - pad * 2) / Math.max(data.length - 1, 1))},${height - pad - item[key] / max * (height - pad * 2)}`).join(" "); return <div className="relative h-[260px] w-full"><svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-[220px] w-full overflow-visible"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffb21c" stopOpacity=".35"/><stop offset="1" stopColor="#ffb21c" stopOpacity="0"/></linearGradient></defs>{[0,1,2,3,4].map((line)=><line key={line} x1={pad} x2={width-pad} y1={pad+line*38} y2={pad+line*38} stroke="#e4e4e7" strokeDasharray="4 5" />)}<polyline points={points("projects")} fill="none" stroke="#ffb21c" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/><polyline points={points("users")} fill="none" stroke="#18181b" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>{data.map((item,index)=>{const x=pad+index*((width-pad*2)/Math.max(data.length-1,1)); const y=height-pad-item.projects/max*(height-pad*2); return <circle key={item.label} cx={x} cy={y} r="5" fill="#ffb21c" stroke="#18181b" strokeWidth="2"/>})}</svg><div className="grid grid-cols-6 text-center text-[8px] font-black uppercase text-zinc-400">{data.map((item)=><span key={item.label}>{item.label}</span>)}</div></div>; }
function Donut({ value }: { value: number }) { return <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#ffb21c ${value * 3.6}deg,rgba(255,255,255,.12) 0)` }}><div className="grid h-16 w-16 place-items-center rounded-full bg-zinc-950 text-xs font-black">{value}%</div></div>; }
function Mini({ value, label, last = false }: { value: number; label: string; last?: boolean }) { return <div className={`p-4 ${last ? "" : "border-r border-white/20"}`}><strong className="text-xl">{value}</strong><p className="mt-1 text-[8px] uppercase tracking-wider text-zinc-400">{label}</p></div>; }
function ProjectRow({ project, index, last }: { project: DashboardData["recentProjects"][number]; index: number; last: boolean }) { return <div className={`grid gap-3 p-5 sm:grid-cols-[36px_1fr_140px_55px] sm:items-center ${last ? "" : "border-b border-zinc-300"}`}><span className="text-[9px] font-black text-[#d98200]">0{index + 1}</span><div className="min-w-0"><p className="truncate text-xs font-black">{project.name}</p><p className="mt-1 truncate text-[9px] text-zinc-500">{project.client}</p></div><div className="h-2 border border-zinc-900 bg-[#fff8e9] p-px"><span className="block h-full bg-[#ffb21c]" style={{ width: `${project.progress || 0}%` }} /></div><strong className="text-right text-xs">{project.progress || 0}%</strong></div>; }
function MessageRow({ message, last }: { message: DashboardData["recentMessages"][number]; last: boolean }) { return <div className={`flex gap-3 p-5 ${last ? "" : "border-b border-zinc-300"}`}><span className="grid h-10 w-10 shrink-0 place-items-center border border-zinc-900 bg-[#fff8e9] text-[10px] font-black">{message.senderName?.slice(0,2).toUpperCase()}</span><div className="min-w-0"><div className="flex items-center gap-2"><p className="truncate text-xs font-black">{message.senderName}</p>{message.isAdmin && <UserCog size={12} className="text-[#d98200]" />}</div><p className="mt-2 line-clamp-2 text-[10px] leading-5 text-zinc-500">{message.content}</p><p className="mt-2 text-[8px] font-bold text-zinc-400">{new Date(message.createdAt).toLocaleDateString("vi-VN")}</p></div></div>; }
function Health({ icon, title, text, last = false }: { icon: React.ReactNode; title: string; text: string; last?: boolean }) { return <div className={`flex gap-3 p-5 md:p-6 ${last ? "" : "border-b border-white/20 md:border-b-0 md:border-r"}`}><span className="grid h-10 w-10 shrink-0 place-items-center border border-[#ffb21c] text-[#ffb21c]">{icon}</span><div><p className="text-[9px] font-black uppercase">{title}</p><p className="mt-2 text-[9px] text-zinc-400">{text}</p></div></div>; }
function Empty({ text }: { text: string }) { return <div className="grid min-h-44 place-items-center p-6 text-center text-xs text-zinc-400">{text}</div>; }
function formatMoney(value: number) { return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value || 0); }
