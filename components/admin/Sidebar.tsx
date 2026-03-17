"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  MessageCircle,
  Settings,
  Wrench,
  Home,
  ChevronRight,
  LogOut,
  Bell,
  Crown,
  Database,
  Search,
  Command,
  PieChart,
  BarChart3,
  MoreVertical,
  Star,
} from "lucide-react";

// --- TYPES ---
type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon: any;
  badge?: number | string;
  isNew?: boolean;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

// --- DATA ---
const menuGroups: MenuGroup[] = [
  {
    title: "Overview",
    items: [
      {
        id: "dash",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
        isNew: true,
      },
      {
        id: "finance",
        label: "Tài chính",
        href: "/admin/finance",
        icon: PieChart,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        id: "posts",
        label: "Bài viết",
        href: "/admin/posts",
        icon: FileText,
        badge: 3,
      },
      {
        id: "projects",
        label: "Dự án",
        href: "/admin/projects",
        icon: FolderKanban,
      },
      { id: "users", label: "Người dùng", href: "/admin/users", icon: Users },
      {
        id: "services",
        label: "Dịch vụ",
        href: "/admin/services",
        icon: Wrench,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        id: "messages",
        label: "Tin nhắn",
        href: "/admin/messages",
        icon: MessageCircle,
        badge: "9+",
      },
      {
        id: "feedback",
        label: "Feedback",
        href: "/admin/feedback",
        icon: Star,
      },
    ],
  },
];

// --- SUB COMPONENTS ---

const RevenueWidget = () => (
  <div className="relative flex-shrink-0 p-4 mx-4 mt-6 mb-2 overflow-hidden text-white shadow-xl rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/30 group">
    <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 transition-all rounded-full bg-white/20 blur-2xl group-hover:bg-white/30" />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] font-bold text-orange-100 uppercase tracking-wider">
            Revenue Today
          </p>
          <h4 className="text-xl font-extrabold text-white mt-0.5">
            $2,450.50
          </h4>
        </div>
        <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
          <TrendingUpIcon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="flex items-end w-full h-12 gap-1">
        {[40, 65, 45, 70, 50, 80, 60, 90, 75, 100].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="flex-1 transition-opacity bg-white rounded-t-sm opacity-60 group-hover:opacity-100"
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-orange-100 font-medium">
        <span className="px-1 font-bold text-white rounded bg-white/20">
          +12.5%
        </span>
        <span>vs yesterday</span>
      </div>
    </div>
  </div>
);

const StorageWidget = () => (
  <div className="flex-shrink-0 px-4 py-2">
    <div className="p-3 border border-dashed border-orange-200/60 rounded-xl bg-white/60 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
          <Database size={12} className="text-orange-600" /> Storage
        </span>
        <span className="text-[10px] font-bold text-orange-700">75%</span>
      </div>
      <div className="h-1.5 w-full bg-orange-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
        />
      </div>
      <p className="text-[10px] text-slate-500 mt-1.5 font-medium">
        Using 15GB of 20GB plan
      </p>
      <button className="mt-2 w-full py-1.5 text-[10px] font-bold text-orange-700 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors shadow-sm">
        Upgrade Plan
      </button>
    </div>
  </div>
);

const SearchInput = () => (
  <div className="flex-shrink-0 px-4 mb-2">
    <div className="relative group">
      <Search className="absolute w-4 h-4 transition-colors -translate-y-1/2 left-3 top-1/2 text-slate-400 group-hover:text-orange-600" />
      <input
        type="text"
        placeholder="Search anything..."
        className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 transition-all placeholder:text-slate-400 text-slate-700 font-medium shadow-sm"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 border border-slate-100 rounded px-1.5 py-0.5 bg-slate-50">
        <Command size={10} className="text-slate-400" />
        <span className="text-[10px] font-bold text-slate-400">K</span>
      </div>
    </div>
  </div>
);

// --- MAIN ---
type SidebarProps = { onClose?: () => void };

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const [activeGroup, setActiveGroup] = useState<string | null>("Overview");
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className="flex flex-col w-[280px] h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border-r border-orange-100/50 shadow-2xl shadow-orange-500/5 z-50 overflow-hidden">
      {/* --- 1. HEADER BRANDING --- */}
      <div className="flex-shrink-0 px-5 pt-6 pb-4">
        <div className="flex flex-col items-center gap-1">
          <Image
            src="/logo.svg"
            alt="VinhWorks"
            width={250}
            height={22}
            className="object-contain"
            priority
          />
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
            <Image
              src="/solution.svg"
              alt="Tech Solutions"
              width={170}
              height={11}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* --- 2. SEARCH --- */}
      <SearchInput />

      {/* --- 3. SCROLLABLE CONTENT --- */}
      <div className="flex-1 py-2 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <RevenueWidget />

        <div className="px-3 space-y-6">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 mb-2 text-[11px] font-extrabold text-amber-900/50 uppercase tracking-widest flex items-center justify-between group cursor-pointer">
                {group.title}
                <MoreVertical
                  size={12}
                  className="transition-opacity opacity-0 group-hover:opacity-100 text-amber-700"
                />
              </h3>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className="relative block group"
                    >
                      <motion.div
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 border ${
                          active
                            ? "bg-white border-orange-100 text-orange-700 shadow-md shadow-orange-500/10"
                            : "bg-transparent border-transparent text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm"
                        }`}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeLine"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-orange-500 rounded-r-full"
                          />
                        )}

                        <div
                          className={`relative z-10 flex items-center justify-center w-5 h-5 transition-colors ${
                            active
                              ? "text-orange-600"
                              : "text-slate-400 group-hover:text-orange-500"
                          }`}
                        >
                          <item.icon size={18} strokeWidth={active ? 2.5 : 2} />
                        </div>

                        <span
                          className={`text-sm font-medium flex-1 ${active ? "font-bold" : ""}`}
                        >
                          {item.label}
                        </span>

                        <div className="flex items-center gap-2">
                          {item.isNew && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-blue-500 rounded shadow-sm shadow-blue-200">
                              NEW
                            </span>
                          )}
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold text-orange-700 bg-orange-100 rounded-md border border-orange-200">
                              {item.badge}
                            </span>
                          )}
                          {active && (
                            <ChevronRight
                              size={14}
                              className="text-orange-400"
                            />
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <StorageWidget />
      </div>

      {/* --- 4. FOOTER PROFILE --- */}
      <div className="flex-shrink-0 p-4 border-t border-orange-200/60 bg-white/40 backdrop-blur-md">
        <div className="flex items-center justify-between px-1 mb-4">
          <Link
            href="/"
            className="p-2 transition-colors rounded-lg shadow-sm text-slate-500 hover:text-orange-600 hover:bg-white hover:shadow"
            title="Home"
          >
            <Home size={18} />
          </Link>

          <button
            className="p-2 transition-colors rounded-lg shadow-sm text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow"
            title="Notifications"
          >
            <div className="relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
            </div>
          </button>

          <Link
            href="/admin/settings"
            onClick={onClose}
            className="p-2 transition-colors rounded-lg shadow-sm text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow"
            title="Settings"
          >
            <Settings size={18} />
          </Link>
        </div>

        <div className="flex items-center gap-3 p-3 transition-all bg-white border shadow-sm cursor-pointer border-orange-100/50 rounded-xl hover:shadow-md hover:border-orange-300 group">
          {/* Avatar with progress ring */}
          <div className="relative flex-shrink-0 w-10 h-10">
            <svg
              className="absolute inset-0 w-10 h-10 -rotate-90"
              viewBox="0 0 40 40"
            >
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={113}
                strokeDashoffset={20}
                className="text-orange-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
                alt="Admin"
                className="rounded-full w-7 h-7 bg-slate-100"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold truncate transition-colors text-slate-900 group-hover:text-orange-600">
                Admin
              </p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded border border-orange-200">
                PRO
              </span>
            </div>
            <p className="text-xs truncate text-slate-500 group-hover:text-slate-700">
              admin@vinhworks.com
            </p>
          </div>

          <LogOut
            size={16}
            className="transition-colors text-slate-400 group-hover:text-red-500"
          />
        </div>
      </div>
    </aside>
  );
}

// --- ICON HELPER ---
function TrendingUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
