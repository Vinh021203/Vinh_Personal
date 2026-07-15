"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  FolderKanban,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  Sparkles,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const navigation = [
  { label: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboard, number: "01" },
  { label: "Dự án", href: "/admin/projects", icon: FolderKanban, number: "02" },
  { label: "Dịch vụ", href: "/admin/services", icon: Wrench, number: "03" },
  { label: "Người dùng", href: "/admin/users", icon: Users, number: "04" },
  { label: "Tin nhắn", href: "/admin/messages", icon: MessageCircle, number: "05" },
  { label: "Leads", href: "/admin/leads", icon: Inbox, number: "06" },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(-2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "LV";

  return (
    <aside className="flex h-[100dvh] w-[280px] flex-col border-r border-zinc-900 bg-[#fff8e9] text-zinc-950">
      <div className="flex h-[84px] shrink-0 items-center justify-between border-b border-zinc-900 px-5">
        <Link href="/" aria-label="VinhWorks" className="inline-flex">
          <Image src="/vinhworks-logo-header.png" alt="VinhWorks" width={1709} height={275} priority className="h-8 w-auto object-contain" />
        </Link>
        <button onClick={onClose} aria-label="Đóng menu" className="grid h-9 w-9 place-items-center border border-zinc-900 bg-white md:hidden">
          <X size={17} />
        </button>
      </div>

      <div className="shrink-0 border-b border-zinc-900 bg-zinc-950 px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-black uppercase tracking-[.2em] text-[#ffb21c]">CMS Workspace</span>
          <Sparkles size={13} className="text-[#ffb21c]" />
        </div>
        <p className="mt-2 text-base font-black leading-tight">Quản trị VinhWorks.</p>
        <div className="mt-3 flex items-center gap-2 text-[7px] font-black uppercase tracking-[.13em] text-zinc-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Hệ thống trực tuyến
        </div>
      </div>

      <nav className="scrollbar-hide flex-1 overflow-y-auto px-3 py-5" aria-label="Điều hướng quản trị">
        <p className="px-3 pb-3 text-[8px] font-black uppercase tracking-[.22em] text-zinc-400">Điều hướng chính</p>
        <div className="space-y-2">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group relative flex min-h-14 items-center gap-3 border px-3 transition-all ${
                  active ? "border-zinc-900 bg-[#ffb21c] shadow-[4px_4px_0_#18181b]" : "border-transparent hover:border-zinc-900 hover:bg-white"
                }`}
              >
                {active && <motion.span layoutId="admin-nav" className="absolute -left-px inset-y-0 w-1 bg-zinc-950" />}
                <span className={`grid h-9 w-9 shrink-0 place-items-center border ${active ? "border-zinc-900 bg-white" : "border-zinc-300 bg-white group-hover:border-zinc-900"}`}>
                  <item.icon size={16} />
                </span>
                <span className="flex-1 text-[11px] font-black uppercase tracking-[.08em]">{item.label}</span>
                <span className="text-[9px] font-black text-zinc-400 group-hover:text-zinc-950">{item.number}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-7 border-t border-zinc-300 pt-5">
          <p className="px-3 pb-3 text-[8px] font-black uppercase tracking-[.22em] text-zinc-400">Hệ thống</p>
          <Link href="/admin/settings" onClick={onClose} className={`flex min-h-12 items-center gap-3 border px-3 text-[10px] font-black uppercase ${pathname.startsWith("/admin/settings") ? "border-zinc-900 bg-zinc-950 text-white" : "border-transparent hover:border-zinc-900 hover:bg-white"}`}>
            <Settings size={16} /> Cài đặt
          </Link>
          <Link href="/" className="mt-1 flex min-h-12 items-center gap-3 border border-transparent px-3 text-[10px] font-black uppercase hover:border-zinc-900 hover:bg-white">
            <Home size={16} /> Xem website <ArrowUpRight size={14} className="ml-auto" />
          </Link>
        </div>
      </nav>

      <div className="shrink-0 border-t border-zinc-900 bg-white p-4">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <Link href="/admin/messages" className="grid h-10 place-items-center border border-zinc-900 hover:bg-[#ffb21c]" aria-label="Tin nhắn">
            <Bell size={16} />
          </Link>
          <Link href="/admin/settings" className="grid h-10 place-items-center border border-zinc-900 hover:bg-[#ffb21c]" aria-label="Cài đặt">
            <Settings size={16} />
          </Link>
        </div>
        <div className="flex items-center gap-3 border border-zinc-900 bg-[#fff8e9] p-3 shadow-[3px_3px_0_#ffb21c]">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden border border-zinc-900 bg-zinc-950 text-xs font-black text-[#ffb21c]">
            {user?.avatar ? <img src={user.avatar} alt={`Ảnh đại diện ${user.name}`} className="h-full w-full object-cover" /> : initials}
            <i className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-black">{user?.name || "Lương Vinh"}</p>
            <p className="mt-1 truncate text-[8px] font-bold uppercase tracking-wider text-zinc-400">{user?.role || "Admin"}</p>
          </div>
          <button onClick={() => logout()} aria-label="Đăng xuất" className="grid h-9 w-9 place-items-center border border-transparent hover:border-zinc-900 hover:bg-white hover:text-red-600">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
