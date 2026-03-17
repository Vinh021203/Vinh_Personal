"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  Search,
  CloudSun,
  Calendar,
  Clock,
  HelpCircle,
  Command,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type HeaderProps = {
  onToggleSidebar?: () => void;
  isMobileMenuOpen?: boolean;
};

interface UserData {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export default function Header({
  onToggleSidebar,
  isMobileMenuOpen,
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateTime, setDateTime] = useState<Date | null>(null);

  // State cho User
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const router = useRouter();

  // --- EFFECTS ---
  useEffect(() => {
    setDateTime(new Date());
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Admin Data
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // Giả lập lấy user hiện tại (Trong thực tế bạn sẽ gọi /api/auth/me hoặc tương tự)
        // Ở đây mình lấy danh sách user và chọn người đầu tiên là Admin để hiển thị
        const res = await fetch("/api/users");
        const data = await res.json();
        const admin = data.find((u: any) => u.role === "admin") || data[0]; // Fallback user đầu tiên nếu ko có admin

        if (admin) {
          setCurrentUser({
            name: admin.name,
            email: admin.email,
            role: admin.role,
            avatar:
              admin.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${admin.name}`,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data");
      }
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
      setShowNotifications(false);
    };
    const timeout = setTimeout(
      () => document.addEventListener("click", handleClickOutside),
      100,
    );
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown, showNotifications]);

  const handleLogout = () => {
    // Xử lý logout ở đây (xóa cookie, token...)
    router.push("/");
  };

  // --- FORMATTERS ---
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  // --- MOCK NOTIFICATIONS ---
  const notifications = [
    {
      id: 1,
      title: "Đơn hàng mới #DH-2024",
      message: "Khách hàng Nguyễn Văn A vừa đặt hàng.",
      time: "2 phút trước",
      type: "success",
    },
    {
      id: 2,
      title: "Cảnh báo hệ thống",
      message: "CPU server đang hoạt động ở mức 90%.",
      time: "10 phút trước",
      type: "warning",
    },
  ];

  const quickActions = [
    { label: "Hồ sơ cá nhân", href: "/admin/profile", icon: User },
    { label: "Cài đặt hiển thị", href: "/admin/settings", icon: Settings },
    { label: "Trung tâm trợ giúp", href: "/admin/help", icon: HelpCircle },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b shadow-sm border-orange-200/50"
      style={{
        background:
          "linear-gradient(to right, rgba(255, 247, 237, 0.9), rgba(255, 251, 235, 0.9))",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between h-20 px-4 md:px-8 max-w-[1920px] mx-auto">
        {/* --- LEFT: SEARCH & TOGGLE --- */}
        <div className="flex items-center gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSidebar?.();
            }}
            className="p-2.5 transition-all border border-orange-200 rounded-xl lg:hidden text-slate-600 hover:bg-orange-100 hover:text-orange-600 hover:border-orange-300"
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>

          <div className="relative hidden md:block group">
            <div className="relative">
              <Search
                className="absolute transition-colors transform -translate-y-1/2 text-slate-400 left-4 top-1/2 group-hover:text-orange-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Tìm kiếm nhanh (Ctrl+K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 py-2.5 pl-11 pr-12 text-sm font-medium transition-all duration-300 border border-orange-200/60 rounded-2xl lg:w-96 text-slate-700 bg-white/60 focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 hover:border-orange-300 hover:shadow-sm placeholder:text-slate-400"
              />
              <div className="absolute flex items-center transform -translate-y-1/2 right-3 top-1/2">
                <kbd className="hidden lg:flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <Command size={10} /> K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: ACTIONS & PROFILE --- */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="items-center hidden gap-5 pr-6 mr-2 border-r border-orange-200/60 xl:flex">
            <div className="flex flex-col items-end text-right">
              <span className="flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider">
                <Calendar size={12} />
                {dateTime ? formatDate(dateTime) : "Loading..."}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-extrabold text-slate-700 tabular-nums">
                <Clock size={14} className="text-slate-400" />
                {dateTime ? formatTime(dateTime) : "--:--:--"}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-orange-100 shadow-sm">
              <CloudSun size={20} className="text-amber-500" />
              <span className="text-sm font-bold text-slate-700">28°C</span>
            </div>
          </div>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2.5 transition-colors rounded-xl md:hidden text-slate-500 hover:text-orange-600 hover:bg-orange-50"
          >
            <Search size={22} />
          </button>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowDropdown(false);
              }}
              className={`relative p-2.5 transition-all duration-200 rounded-xl border ${
                showNotifications
                  ? "bg-orange-100 text-orange-600 border-orange-200"
                  : "text-slate-500 hover:text-orange-600 hover:bg-white hover:border-orange-100 border-transparent"
              }`}
            >
              <Bell size={22} />
              <span className="absolute top-2 right-2.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 ring-2 ring-white"></span>
              </span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 z-50 mt-4 overflow-hidden origin-top-right bg-white border shadow-2xl w-80 sm:w-96 border-slate-100 rounded-2xl ring-1 ring-black/5 focus:outline-none"
                >
                  <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#fff7ed] to-[#fffbeb] border-b border-orange-100">
                    <h3 className="text-sm font-extrabold text-slate-800">
                      Thông báo
                    </h3>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold text-orange-700 bg-orange-100 rounded-full border border-orange-200">
                      2 Mới
                    </span>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto py-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-5 py-3.5 border-b border-slate-50 hover:bg-orange-50/50 cursor-pointer transition-colors group last:border-0"
                      >
                        <div className="flex gap-3.5">
                          <div
                            className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                              notif.type === "success"
                                ? "bg-green-500"
                                : "bg-amber-500"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-bold transition-colors text-slate-700 group-hover:text-orange-700">
                              {notif.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                              {notif.message}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative pl-4 border-l sm:pl-6 border-orange-200/60">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
                setShowNotifications(false);
              }}
              className={`flex items-center gap-3 group rounded-xl p-1 transition-all ${
                showDropdown
                  ? "bg-white shadow-sm ring-1 ring-orange-100"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="hidden text-right lg:block">
                <p className="text-sm font-bold transition-colors text-slate-700 group-hover:text-orange-700">
                  {currentUser ? currentUser.name : "Đang tải..."}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {currentUser ? currentUser.role : "Guest"}
                </p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 overflow-hidden transition-all rounded-full shadow-sm ring-2 ring-white group-hover:ring-orange-200">
                  <Image
                    src={currentUser?.avatar || "/placeholder-user.jpg"}
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized // Fix lỗi hiển thị ảnh external
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-300 ${
                  showDropdown
                    ? "rotate-180 text-orange-500"
                    : "group-hover:text-orange-500"
                }`}
              />
            </button>

            <AnimatePresence>
              {showDropdown && currentUser && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 z-50 w-64 mt-4 overflow-hidden origin-top-right bg-white border shadow-2xl border-slate-100 rounded-2xl ring-1 ring-black/5"
                >
                  <div className="px-5 py-4 border-b border-orange-100 bg-gradient-to-br from-orange-50 to-white">
                    <p className="text-sm font-extrabold text-slate-800">
                      {currentUser.name}
                    </p>
                    <p className="text-xs truncate text-slate-500">
                      {currentUser.email}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <Shield size={12} className="text-orange-500" />
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-orange-200 text-orange-700 rounded-md shadow-sm uppercase tracking-wider">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.href}
                        onClick={() => router.push(action.href)}
                        className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 hover:text-orange-600 transition-all group"
                      >
                        <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 group-hover:text-orange-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <action.icon size={16} />
                        </div>
                        {action.label}
                      </button>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-50 bg-slate-50/50">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-all group"
                    >
                      <div className="p-1.5 bg-red-50 rounded-lg text-red-400 group-hover:text-red-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <LogOut size={16} />
                      </div>
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
