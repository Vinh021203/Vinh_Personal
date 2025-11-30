"use client";

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  LogOut,
  Camera,
  Save,
  Loader2,
  Briefcase,
  MapPin,
  FolderKanban,
  FileText,
  Star,
  Zap,
  Heart,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

// --- CONFIG & THEME ---
const THEME = {
  gradientText:
    "text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-red-500",
  gradientBg: "bg-gradient-to-r from-orange-500 to-amber-500",
  glass: "bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl",
};

// --- COMPONENTS ---

// 1. Floating Badge (Hiệu ứng nổi)
const FloatingBadge = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    className={`absolute z-20 p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md border border-white/60 ${className}`}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// 2. Stat Card (Bento Style)
const StatCard = ({ label, value, icon: Icon, color, bg, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`group relative overflow-hidden rounded-[24px] p-6 hover:-translate-y-1 transition-all duration-300 border border-white/60 shadow-sm hover:shadow-lg bg-white/40 backdrop-blur-md`}
  >
    <div
      className={`inline-block p-3 mb-4 transition-transform duration-300 bg-white shadow-sm rounded-2xl w-fit group-hover:scale-110 ${color}`}
    >
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <h3 className="mb-1 text-3xl font-black text-slate-800">{value}</h3>
    <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
      {label}
    </p>
  </motion.div>
);

export default function ProfilePage() {
  const { user, loading, logout } = useUser();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Redirect logic
  useEffect(() => {
    if (!loading && !user) router.push("/login");
    setMounted(true);
  }, [user, loading, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock API Call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Cập nhật hồ sơ thành công!");
    }, 1500);
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fff7ed]">
        <div className="w-12 h-12 border-4 border-orange-200 rounded-full border-t-orange-500 animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen overflow-hidden font-sans bg-[#fff7ed] text-slate-900 selection:bg-orange-200 pt-24 pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange-200/30 rounded-full blur-[120px] animate-blob mix-blend-multiply" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative z-10 max-w-6xl px-6 mx-auto">
        {/* --- HEADER PROFILE --- */}
        <div className="flex flex-col items-center gap-12 mb-20 lg:flex-row lg:gap-20">
          {/* LEFT: AVATAR 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-sm lg:w-1/3 shrink-0"
          >
            <div className="relative aspect-square">
              {/* Rotating Rings */}
              <div className="absolute inset-0 border-[2px] border-dashed border-orange-300/50 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-6 border-[2px] border-dashed border-purple-300/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

              {/* Avatar Container */}
              <div className="absolute flex items-center justify-center overflow-hidden border-8 border-white rounded-full shadow-2xl cursor-pointer inset-10 bg-gradient-to-br from-orange-100 to-white group">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=f97316&color=fff&size=512`
                  }
                  alt={user.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                {/* Edit Overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/30 group-hover:opacity-100">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Badges */}
              <FloatingBadge className="right-0 top-10 bg-white/90">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-600">
                  <Shield size={16} className="fill-orange-500" />
                  <span className="uppercase">{user.role}</span>
                </div>
              </FloatingBadge>
              <FloatingBadge
                className="left-0 bottom-10 bg-white/90"
                delay={0.2}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online</span>
                </div>
              </FloatingBadge>
            </div>
          </motion.div>

          {/* RIGHT: INFO & ACTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="mb-8">
              <h1 className="mb-2 text-4xl font-black tracking-tight lg:text-6xl text-slate-900">
                Xin chào, <br className="hidden lg:block" />
                <span className={THEME.gradientText}>{user.name}</span>
              </h1>
              <p className="flex items-center justify-center gap-2 text-lg font-medium text-slate-500 lg:justify-start">
                <Mail size={18} className="text-orange-400" /> {user.email}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
              <StatCard
                label="Dự án"
                value="12"
                icon={FolderKanban}
                color="text-blue-600"
                delay={0.1}
              />
              <StatCard
                label="Bài viết"
                value="08"
                icon={FileText}
                color="text-orange-600"
                delay={0.2}
              />
              <StatCard
                label="Đánh giá"
                value="4.9"
                icon={Star}
                color="text-yellow-500"
                delay={0.3}
              />
              <StatCard
                label="Tham gia"
                value="2024"
                icon={Calendar}
                color="text-purple-600"
                delay={0.4}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={logout}
                className="px-8 py-3.5 bg-white border-2 border-slate-100 hover:border-red-200 text-slate-600 hover:text-red-600 font-bold rounded-2xl transition-all flex items-center gap-2 group"
              >
                <LogOut
                  size={20}
                  className="transition-transform group-hover:-translate-x-1"
                />{" "}
                Đăng xuất
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- PROFILE SETTINGS FORM (Glassmorphism) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`relative rounded-[40px] p-8 lg:p-12 ${THEME.glass}`}
        >
          <div className="absolute top-0 p-4 -translate-x-1/2 -translate-y-1/2 bg-white border border-orange-100 rounded-full shadow-lg left-1/2">
            <Edit3 size={32} className="text-orange-500" />
          </div>

          <div className="mt-4 mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-900">
              Cập nhật thông tin
            </h2>
            <p className="mt-2 font-medium text-slate-500">
              Thay đổi thông tin cá nhân và bảo mật
            </p>
          </div>

          <form onSubmit={handleUpdate} className="max-w-3xl mx-auto space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-xs font-bold tracking-wider uppercase text-slate-400">
                  Họ và tên
                </label>
                <div className="relative group">
                  <User
                    className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-orange-500"
                    size={20}
                  />
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full py-4 pl-12 pr-4 font-bold transition-all border bg-white/50 border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-xs font-bold tracking-wider uppercase text-slate-400">
                  Email (Chỉ xem)
                </label>
                <div className="relative">
                  <Mail
                    className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full py-4 pl-12 pr-4 font-medium border cursor-not-allowed bg-slate-100/50 border-slate-200 rounded-2xl text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-xs font-bold tracking-wider uppercase text-slate-400">
                  Giới thiệu
                </label>
                <textarea
                  rows={4}
                  placeholder="Hãy viết đôi dòng về bạn..."
                  className="w-full p-4 font-medium transition-all border resize-none bg-white/50 border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSaving}
                className={`px-12 py-4 ${THEME.gradientBg} text-white font-bold rounded-2xl text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-3 disabled:opacity-70`}
              >
                {isSaving ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <Save size={24} />
                )}
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
