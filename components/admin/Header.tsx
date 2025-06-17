"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import Avatar from "./Avatar";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  Monitor,
  Sparkles,
  Crown,
  Shield,
  Activity,
  Search,
  Command,
  Sun,
  Moon,
  Maximize,
  Minimize,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type HeaderProps = {
  onToggleSidebar?: () => void;
  isMobileMenuOpen?: boolean; // Fix: Thêm prop này
};

export default function Header({
  onToggleSidebar,
  isMobileMenuOpen,
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useUser();
  const router = useRouter();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
      setShowNotifications(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    window.location.reload();
  };

  const notifications = [
    {
      id: 1,
      title: "Tin nhắn mới",
      message: "Bạn có 3 tin nhắn chưa đọc",
      time: "5 phút trước",
      type: "message",
    },
    {
      id: 2,
      title: "Cập nhật hệ thống",
      message: "Phiên bản 2.1.0 đã sẵn sàng",
      time: "1 giờ trước",
      type: "update",
    },
    {
      id: 3,
      title: "Backup hoàn tất",
      message: "Sao lưu dữ liệu thành công",
      time: "2 giờ trước",
      type: "success",
    },
  ];

  const quickActions = [
    { label: "Trang cá nhân", href: "/admin/profile", icon: User },
    { label: "Cài đặt hệ thống", href: "/admin/settings", icon: Settings },
    { label: "Hoạt động gần đây", href: "/admin/activity", icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-30 border-b shadow-2xl border-purple-500/20 bg-slate-900/95 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Mobile Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-white transition-all duration-200 border rounded-xl md:hidden hover:bg-purple-500/20 border-purple-500/30"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>

          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-2xl">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400">
                <Crown className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                VinhWorks Admin
              </h1>
              <p className="text-xs text-gray-400">Trung tâm quản trị</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <Search
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                size={16}
              />
              <input
                type="text"
                placeholder="Tìm kiếm... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50 backdrop-blur-sm"
              />
              <div className="absolute flex items-center gap-1 transform -translate-y-1/2 right-3 top-1/2">
                <kbd className="px-1.5 py-0.5 text-xs text-gray-400 bg-slate-600/50 rounded border border-gray-500/30">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 text-xs text-gray-400 bg-slate-600/50 rounded border border-gray-500/30">
                  K
                </kbd>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* System Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-300">Online</span>
          </div>

          {/* Current Time */}
          <div className="hidden text-sm text-gray-300 lg:block">
            {currentTime.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>

          {/* Quick Search Button (Mobile) */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-gray-400 transition-all duration-200 lg:hidden hover:text-white rounded-xl hover:bg-purple-500/20"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowDropdown(false);
              }}
              className="relative p-2 text-gray-400 transition-all duration-200 hover:text-white rounded-xl hover:bg-purple-500/20"
            >
              <Bell size={20} />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1 animate-ping"></span>
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 z-50 mt-2 overflow-hidden border shadow-2xl w-80 bg-slate-800/95 backdrop-blur-xl border-purple-500/20 rounded-2xl"
                >
                  <div className="p-4 border-b border-purple-500/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Thông báo</h3>
                      <span className="px-2 py-1 text-xs text-purple-400 rounded-full bg-purple-500/20">
                        {notifications.length} mới
                      </span>
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-64 custom-scrollbar">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 transition-colors border-b cursor-pointer border-purple-500/10 hover:bg-purple-500/5"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === "message"
                                ? "bg-blue-400"
                                : notification.type === "update"
                                ? "bg-yellow-400"
                                : "bg-green-400"
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">
                              {notification.title}
                            </h4>
                            <p className="mt-1 text-xs text-gray-400">
                              {notification.message}
                            </p>
                            <span className="block mt-2 text-xs text-purple-400">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-purple-500/20">
                    <button className="w-full text-sm text-purple-400 transition-colors hover:text-purple-300">
                      Xem tất cả thông báo
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-2 transition-all duration-200 border border-transparent rounded-xl hover:bg-purple-500/20 hover:border-purple-500/30"
            >
              <div className="relative">
                <Avatar size={32} />
                <div className="absolute flex items-center justify-center w-4 h-4 bg-green-400 border-2 rounded-full -bottom-1 -right-1 border-slate-900">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-white">
                  {user?.name || "Administrator"}
                </p>
                <p className="text-xs text-gray-400">{user?.role || "Admin"}</p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 z-50 w-64 mt-2 overflow-hidden border shadow-2xl bg-slate-800/95 backdrop-blur-xl border-purple-500/20 rounded-2xl"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <Avatar size={40} />
                      <div>
                        <p className="font-semibold text-white">
                          {user?.name || "Administrator"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user?.email || "admin@vinhworks.com"}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Shield className="w-3 h-3 text-purple-400" />
                          <span className="text-xs text-purple-400">
                            {user?.role || "Super Admin"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-2">
                    {quickActions.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <motion.a
                          key={action.href}
                          href={action.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 transition-all duration-200 hover:text-white hover:bg-purple-500/10 rounded-xl"
                        >
                          <IconComponent
                            size={16}
                            className="text-purple-400"
                          />
                          <span>{action.label}</span>
                        </motion.a>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-purple-500/20">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full gap-3 px-3 py-2 text-sm text-red-400 transition-all duration-200 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
                    >
                      <LogOut size={16} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-t lg:hidden border-purple-500/20"
          >
            <div className="relative">
              <Search
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                size={16}
              />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 border bg-slate-700/50 border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
