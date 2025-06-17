"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  MessageCircle,
  Settings,
  Wrench,
  Home,
  Monitor,
  Sparkles,
  ChevronRight,
  LogOut,
  Bell,
  Crown,
  Zap,
  Shield,
  Activity,
  TrendingUp,
  Database,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  onClose?: () => void;
};

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    color: "from-purple-500 to-blue-500",
    description: "Tổng quan hệ thống",
  },
  {
    label: "Bài viết",
    href: "/admin/posts",
    icon: FileText,
    color: "from-blue-500 to-indigo-500",
    description: "Quản lý nội dung",
  },
  {
    label: "Dự án",
    href: "/admin/projects",
    icon: FolderKanban,
    color: "from-indigo-500 to-purple-500",
    description: "Portfolio & dự án",
  },
  {
    label: "Dịch vụ",
    href: "/admin/services",
    icon: Wrench,
    color: "from-purple-500 to-pink-500",
    description: "Gói dịch vụ",
  },
  {
    label: "Người dùng",
    href: "/admin/users",
    icon: Users,
    color: "from-pink-500 to-purple-500",
    description: "Quản lý thành viên",
  },
  {
    label: "Tin nhắn",
    href: "/admin/messages",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-500",
    description: "Hỗ trợ khách hàng",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    description: "Thống kê & báo cáo",
  },
  {
    label: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
    color: "from-gray-500 to-slate-500",
    description: "Cấu hình hệ thống",
  },
];

const quickActions = [
  { label: "Về trang chủ", href: "/", icon: Home },
  { label: "Thông báo", href: "/admin/notifications", icon: Bell },
  { label: "Đăng xuất", href: "/logout", icon: LogOut },
];

export default function Sidebar({ onClose }: Props) {
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Pre-generate particle positions
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
  ];

  return (
    <aside className="relative flex flex-col w-full h-full overflow-hidden text-white border-r shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 border-purple-500/20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Tech Elements */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <div className="w-1 h-1 rounded-full bg-purple-400/20" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex-shrink-0 px-6 py-8 text-center border-b border-purple-500/20"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 shadow-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-2xl">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400">
              <Crown className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              VinhWorks
            </h2>
            <p className="text-xs font-medium text-purple-300">Admin Panel</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-purple-500/20 border-purple-500/30 backdrop-blur-sm">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-xs text-gray-300">System Online</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </motion.div>

      {/* Enhanced Menu */}
      <div className="relative z-10 flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        <div className="mb-4">
          <h3 className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider text-purple-300 uppercase">
            <Database className="w-3 h-3" />
            Quản lý chính
          </h3>
        </div>

        {menuItems.map((item, index) => {
          const isActive = pathname.startsWith(item.href);
          const IconComponent = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                onClick={() => onClose?.()}
                className={`group relative flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white border border-purple-400/50 shadow-lg"
                    : "hover:bg-white/5 text-gray-300 hover:text-white border border-transparent hover:border-purple-500/30"
                }`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} shadow-lg`
                      : `bg-white/5 group-hover:bg-gradient-to-r group-hover:${item.color} group-hover:shadow-lg`
                  }`}
                >
                  <IconComponent size={18} className="text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <ChevronRight size={16} className="text-purple-300" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 bottom-0 left-0 w-1 rounded-r-full bg-gradient-to-b from-purple-400 to-blue-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Hover glow effect */}
                {hoveredItem === item.href && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5 rounded-2xl`}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}

        {/* Quick Actions */}
        <div className="pt-6 mt-8 border-t border-purple-500/20">
          <h3 className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider text-purple-300 uppercase">
            <Zap className="w-3 h-3" />
            Thao tác nhanh
          </h3>

          <div className="space-y-2">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={action.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (menuItems.length + index) * 0.1 }}
                >
                  <Link
                    href={action.href}
                    onClick={() => onClose?.()}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 transition-all duration-300 group hover:text-white rounded-xl hover:bg-white/5"
                  >
                    <IconComponent
                      size={16}
                      className="transition-colors group-hover:text-purple-400"
                    />
                    <span>{action.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex-shrink-0 px-4 py-4 border-t border-purple-500/20"
      >
        <div className="flex items-center gap-3 p-3 border bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border-purple-500/20 backdrop-blur-sm">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              A
            </div>
            <div className="absolute flex items-center justify-center w-4 h-4 bg-green-400 border-2 rounded-full -bottom-1 -right-1 border-slate-900">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white">Administrator</p>
              <Crown className="w-3 h-3 text-yellow-400" />
            </div>
            <p className="text-xs text-gray-400 truncate">
              admin@vinhworks.com
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:text-white hover:bg-white/10"
          >
            <Settings size={16} />
          </motion.button>
        </div>

        {/* System Status */}
        <div className="flex items-center justify-between px-3 mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Activity className="w-3 h-3 text-green-400" />
            <span>System Health: Good</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
