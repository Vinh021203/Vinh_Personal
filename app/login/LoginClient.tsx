"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Code2,
  Heart,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";

const gradients = {
  primary: "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500",
  text: "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500",
  glass: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl",
};

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
    className={`absolute z-20 px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.12)] backdrop-blur-md border border-white/80 bg-white/90 ${className}`}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const PasswordStrength = ({ password }: { password: string }) => {
  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 5) score++;
    if (pass.length > 7) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };
  const score = getStrength(password);
  const label = score <= 2 ? "Yếu" : score <= 3 ? "Trung bình" : "Mạnh";
  const color =
    score <= 2
      ? "text-red-400"
      : score <= 3
        ? "text-yellow-500"
        : "text-green-500";
  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex h-1.5 gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-full flex-1 rounded-full transition-all duration-500 ${
              score >= level
                ? score <= 2
                  ? "bg-red-400"
                  : score <= 3
                    ? "bg-yellow-400"
                    : "bg-green-400"
                : "bg-slate-100"
            }`}
          />
        ))}
      </div>
      <p className={`text-[10px] font-bold text-right ${color}`}>{label}</p>
    </div>
  );
};

export default function LoginClient() {
  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.custom((t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-sm w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex gap-3 p-4 items-start border border-red-100`}
          >
            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800">
                Đăng nhập thất bại
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {data.message || "Vui lòng kiểm tra lại thông tin."}
              </p>
            </div>
          </div>
        ));
      } else {
        toast.custom((t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-sm w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex gap-3 p-4 items-start border border-green-100`}
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800">
                Chào mừng trở lại!
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Đang chuyển hướng vào hệ thống...
              </p>
            </div>
          </div>
        ));
        const resUser = await fetch("/api/auth/me");
        const userData = await resUser.json();
        if (userData?.user) {
          setUser(userData.user);
          router.push(
            userData.user.role === "admin" ? "/admin/dashboard" : "/",
          );
        } else {
          router.push("/");
        }
      }
    } catch {
      toast.error("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 flex overflow-hidden font-sans bg-white text-slate-900">
      <Toaster position="top-center" />

      {/* ========== LEFT — Visual Showcase ========== */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative hidden lg:flex lg:w-[58%] flex-col items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-300/20 rounded-full blur-[120px] animate-blob mix-blend-multiply" />
          <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* 3D tilt container — full width tận dụng ngang */}
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-10 w-full px-10 xl:px-16"
        >
          {/* ── TOP ROW: Logo + Badge ── */}
          <div className="flex items-end justify-between mb-8">
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/logo.svg"
                  alt="VinhWorks"
                  width={170}
                  height={42}
                  className="object-contain"
                  priority
                />
                <Image
                  src="/solution.svg"
                  alt="Tech Solutions"
                  width={112}
                  height={16}
                  className="object-contain mt-1"
                  priority
                />
              </motion.div>
            </div>

            {/* Live badge — góc phải */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 backdrop-blur-sm shadow-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full" />
              </span>
              <span className="text-xs font-bold text-slate-600 tracking-wide">
                System Online
              </span>
            </motion.div>
          </div>

          {/* ── MAIN GLASS CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className={`relative rounded-[2.5rem] p-8 ${gradients.glass} overflow-hidden`}
          >
            {/* Shimmer line top */}
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Headline + desc nằm ngang */}
            <div className="flex items-start justify-between gap-8 mb-8">
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-sm font-bold text-orange-600 bg-white border border-orange-100 rounded-full shadow-sm"
                >
                  <Sparkles size={14} className="fill-orange-500" />
                  Nền tảng quản lý thế hệ mới
                </motion.div>

                <h1 className="text-5xl xl:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
                  Chào mừng <br />
                  <span className={gradients.text}>trở lại!</span>
                </h1>
              </div>

              {/* Stats dọc — bên phải headline */}
              <div className="flex flex-col gap-3 shrink-0 pt-2">
                {[
                  { value: "50+", label: "Dự án", color: "text-orange-500" },
                  { value: "99%", label: "Uptime", color: "text-purple-500" },
                  { value: "10k+", label: "Users", color: "text-blue-500" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/60 border border-white/70 backdrop-blur-sm min-w-[110px]"
                  >
                    <p className={`text-2xl font-black ${s.color}`}>
                      {s.value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-tight">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="mb-7 text-base font-medium leading-relaxed text-slate-600 max-w-md">
              Đăng nhập để tiếp tục hành trình xây dựng{" "}
              <span className="font-bold text-blue-600">sản phẩm</span> tuyệt
              vời cùng{" "}
              <span className="font-bold text-pink-600">VinhWorks</span>.
            </p>

            {/* ── FEATURE TAGS ROW — tận dụng chiều ngang ── */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                {
                  icon: Zap,
                  label: "Real-time Analytics",
                  color: "text-orange-500",
                  bg: "bg-orange-50 border-orange-100",
                },
                {
                  icon: Code2,
                  label: "Clean Architecture",
                  color: "text-purple-600",
                  bg: "bg-purple-50 border-purple-100",
                },
                {
                  icon: Heart,
                  label: "UI/UX First",
                  color: "text-pink-500",
                  bg: "bg-pink-50 border-pink-100",
                },
              ].map(({ icon: Icon, label, color, bg }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${bg} cursor-default transition-all`}
                >
                  <Icon size={15} className={color} />
                  <span className={`text-sm font-bold ${color}`}>{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Shimmer line bottom */}
            <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          </motion.div>

          {/* ── BOTTOM ROW: 2 floating info cards nằm ngang ── */}
          <div className="flex gap-4 mt-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-sm shadow-sm"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-600">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">AI-Powered</p>
                <p className="text-[11px] text-slate-400 font-medium">
                  Tự động hóa thông minh
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-sm shadow-sm"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600">
                <Zap size={18} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">Fast Deploy</p>
                <p className="text-[11px] text-slate-400 font-medium">
                  Zero downtime release
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ========== RIGHT — Form ========== */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="flex w-full lg:w-[42%] bg-white border-l border-slate-100 items-center justify-center shadow-[-20px_0_60px_rgba(0,0,0,0.03)]"
      >
        <div className="w-full max-w-sm px-8 space-y-5">
          {/* Mobile logo */}
          <div className="flex flex-col items-center lg:hidden mb-2">
            <Image
              src="/logo.svg"
              alt="VinhWorks"
              width={140}
              height={36}
              className="object-contain"
              priority
            />
            <Image
              src="/solution.svg"
              alt="Tech Solutions"
              width={100}
              height={14}
              className="object-contain mt-1"
              priority
            />
          </div>

          {/* Header */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-bold text-orange-600 bg-white border border-orange-100 rounded-full shadow-sm"
            >
              <Sparkles size={14} className="fill-orange-500" />
              Đăng nhập tài khoản
            </motion.div>

            {/* Animated heading — stagger từng từ */}
            <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-tight overflow-hidden">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                Xin chào,{" "}
              </motion.span>
              <motion.span
                className={`block ${gradients.text}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              >
                chào mừng!
              </motion.span>
            </h2>

            {/* Subtitle — fade + blur in */}
            <motion.p
              className="mt-2 text-sm font-medium text-slate-500"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              Nhập thông tin để truy cập hệ thống.
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="space-y-1.5"
            >
              <label
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${emailFocused ? "text-violet-600" : "text-slate-500"}`}
              >
                Email
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${emailFocused ? "text-violet-500" : "text-slate-400"}`}
                >
                  <Mail size={17} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                  placeholder="name@example.com"
                  className={`w-full pl-11 pr-10 py-3.5 bg-slate-50 border rounded-2xl transition-all outline-none font-medium text-slate-900 placeholder:text-slate-300 text-sm ${
                    emailFocused
                      ? "bg-white border-violet-400 ring-4 ring-violet-500/10 shadow-lg shadow-violet-500/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <AnimatePresence>
                  {email.includes("@") && email.includes(".") && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                    >
                      <CheckCircle2 size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <label
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${passFocused ? "text-violet-600" : "text-slate-500"}`}
                >
                  Mật khẩu
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${passFocused ? "text-violet-500" : "text-slate-400"}`}
                >
                  <Lock size={17} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  required
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3.5 bg-slate-50 border rounded-2xl transition-all outline-none font-medium text-slate-900 placeholder:text-slate-300 text-sm ${
                    passFocused
                      ? "bg-white border-violet-400 ring-4 ring-violet-500/10 shadow-lg shadow-violet-500/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PasswordStrength password={password} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit — 1 màu orange solid */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -12px rgba(249,115,22,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className="relative w-full py-3.5 font-bold text-white rounded-2xl bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                    <span>Đang xác thực...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>Đăng nhập ngay</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              hoặc
            </span>
            <div className="flex-1 h-px bg-slate-100" />
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white border-2 border-slate-100 hover:border-slate-200 hover:shadow-md transition-all font-bold text-slate-700 text-sm group"
            >
              <Github
                size={18}
                className="transition-transform group-hover:scale-110"
              />
              GitHub
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white border-2 border-slate-100 hover:border-slate-200 hover:shadow-md transition-all font-bold text-slate-700 text-sm group"
            >
              <svg
                className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="text-center text-sm font-medium text-slate-500"
          >
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="font-bold text-violet-600 hover:text-orange-500 transition-colors hover:underline"
            >
              Đăng ký miễn phí
            </Link>
          </motion.p>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-300 uppercase tracking-widest"
          >
            <Lock size={9} />
            <span>Protected by 256-bit TLS Encryption</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
