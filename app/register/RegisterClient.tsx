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
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Github,
  LayoutTemplate,
  CheckCircle2,
  XCircle,
  Rocket,
  Users,
  Star,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

// --- SUB-COMPONENTS ---

const BackgroundBlob = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob ${className}`}
  />
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
  const bars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1 mt-2 h-1.5">
      {bars.map((level) => (
        <div
          key={level}
          className={`h-full flex-1 rounded-full transition-all duration-300 ${
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
  );
};

const BenefitItem = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="flex items-start gap-4 p-4 transition-all border shadow-sm cursor-default rounded-2xl bg-white/60 border-white/60 backdrop-blur-sm hover:shadow-md"
  >
    <div className="p-3 text-white shadow-lg rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/20">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
    </div>
  </motion.div>
);

// --- MAIN CLIENT COMPONENT ---
export default function RegisterClient() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Focus States
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  // 3D Tilt Logic
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <div className="flex-1 ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Đăng ký thất bại
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {data.message || "Email này có thể đã được sử dụng."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div className="flex-1 ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Tạo tài khoản thành công!
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Đang chuyển hướng đến trang đăng nhập...
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));

        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex w-full min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <Toaster position="top-center" />

      {/* --- LEFT COLUMN: Interactive Showcase --- */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex-col items-center justify-center hidden p-12 overflow-hidden bg-white lg:flex lg:w-7/12"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Blobs Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <BackgroundBlob className="bg-purple-300 top-0 left-0 w-[800px] h-[800px] animate-blob" />
          <BackgroundBlob className="bg-pink-300 bottom-0 right-0 w-[800px] h-[800px] animate-blob animation-delay-2000" />
          <BackgroundBlob className="bg-blue-300 top-[40%] left-[40%] w-[600px] h-[600px] animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>

        {/* 3D Content Container */}
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-10 w-full max-w-2xl"
        >
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-10 shadow-2xl shadow-purple-500/10 transform transition-transform">
            {/* Header */}
            <div className="mb-10 transform translate-z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 border border-white rounded-full shadow-sm bg-white/60">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold tracking-wide text-slate-700">
                  Join 10,000+ Developers
                </span>
              </div>

              <h1 className="text-5xl font-black text-slate-900 leading-[1.1] mb-4">
                Unlock your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 animate-gradient-x">
                  Creative Potential
                </span>
              </h1>
              <p className="max-w-lg text-lg text-slate-600">
                Tham gia cộng đồng công nghệ hàng đầu. Truy cập kho tài nguyên
                khổng lồ và các công cụ phát triển độc quyền.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-4 transform translate-z-20">
              <BenefitItem
                icon={Rocket}
                title="Fast Deployment"
                desc="Triển khai dự án của bạn chỉ trong vài cú click chuột."
              />
              <BenefitItem
                icon={Users}
                title="Community Support"
                desc="Kết nối với hàng ngàn lập trình viên và chuyên gia."
              />
              <BenefitItem
                icon={ShieldCheck}
                title="Enterprise Security"
                desc="Bảo vệ dữ liệu của bạn với các tiêu chuẩn an ninh cao nhất."
              />
            </div>
          </div>
        </motion.div>

        <div className="absolute flex items-center gap-2 text-sm font-medium bottom-8 left-12 text-slate-500">
          <LayoutTemplate size={16} />
          <span>© 2025 VinhWorks Inc.</span>
        </div>
      </motion.div>

      {/* --- RIGHT COLUMN: Register Form --- */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="flex w-full lg:w-5/12 items-center justify-center p-6 md:p-12 bg-white relative shadow-[-20px_0_40px_rgba(0,0,0,0.02)]"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Header - ĐÃ BỎ ICON */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl text-slate-900">
              Tạo tài khoản
            </h2>
            <p className="mt-3 font-medium text-slate-500">
              Bắt đầu hành trình số của bạn ngay hôm nay.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-bold transition-colors ${
                  nameFocused ? "text-purple-600" : "text-slate-700"
                }`}
              >
                Họ và Tên
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    nameFocused ? "text-purple-600" : "text-slate-400"
                  }`}
                >
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  required
                  placeholder="Nguyen Van A"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-xl transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 ${
                    nameFocused
                      ? "bg-white border-purple-500 ring-4 ring-purple-500/10 shadow-lg shadow-purple-500/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-bold transition-colors ${
                  emailFocused ? "text-purple-600" : "text-slate-700"
                }`}
              >
                Email
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    emailFocused ? "text-purple-600" : "text-slate-400"
                  }`}
                >
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                  placeholder="name@example.com"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-xl transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 ${
                    emailFocused
                      ? "bg-white border-purple-500 ring-4 ring-purple-500/10 shadow-lg shadow-purple-500/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                {email.includes("@") && email.includes(".") && (
                  <div className="absolute text-green-500 -translate-y-1/2 right-4 top-1/2">
                    <CheckCircle2 size={18} />
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-bold transition-colors ${
                  passFocused ? "text-purple-600" : "text-slate-700"
                }`}
              >
                Mật khẩu
              </label>
              <div className="relative group">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    passFocused ? "text-purple-600" : "text-slate-400"
                  }`}
                >
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  required
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50 border rounded-xl transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 ${
                    passFocused
                      ? "bg-white border-purple-500 ring-4 ring-purple-500/10 shadow-lg shadow-purple-500/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute p-1 transition-colors -translate-y-1/2 rounded-md right-4 top-1/2 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Strength Meter */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <PasswordStrength password={password} />
                    <p className="text-[10px] text-slate-400 mt-1 text-right">
                      Gợi ý: Dùng chữ hoa, số và ký tự đặc biệt
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="relative w-full py-4 mt-4 overflow-hidden font-bold text-white transition-all shadow-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl shadow-purple-500/20 hover:shadow-pink-500/40 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                    <span>Đang khởi tạo...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng ký ngay</span>
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Social Login */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs font-bold tracking-wider uppercase text-slate-400">
              <span className="px-4 bg-white">Hoặc đăng ký với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 group">
              <Github
                size={22}
                className="transition-transform group-hover:scale-110"
              />
              <span className="hidden sm:inline">GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 group">
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-110"
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
              <span className="hidden sm:inline">Google</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="pt-2 text-center">
            <p className="text-sm font-medium text-slate-500">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-bold text-purple-600 transition-colors hover:text-pink-600 hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
            <p className="text-[10px] text-slate-400 mt-4 max-w-xs mx-auto">
              Bằng việc đăng ký, bạn đồng ý với{" "}
              <Link href="/terms" className="underline">
                Điều khoản
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="underline">
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
