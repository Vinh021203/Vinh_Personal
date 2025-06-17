"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  LogIn,
  Sparkles,
  Eye,
  EyeOff,
  Monitor,
  Shield,
  Github,
  Zap,
  Send,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    nameInputRef.current?.focus();
    setIsClient(true);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (password.length === 0) setPasswordStrength("");
    else if (password.length < 6) setPasswordStrength("Yếu");
    else if (
      password.match(/[0-9]/) &&
      password.match(/[a-z]/) &&
      password.match(/[A-Z]/)
    )
      setPasswordStrength("Mạnh");
    else setPasswordStrength("Trung bình");
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Đăng ký thất bại");
      } else {
        toast.success(data.message || "Đăng ký thành công!");
        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error("Lỗi mạng hoặc máy chủ");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    toast("🔐 Chức năng đăng ký bằng Google chưa được kích hoạt.");
  };

  // Pre-generate particle positions to avoid hydration mismatch
  const particlePositions = [
    { left: 15, top: 25 },
    { left: 85, top: 35 },
    { left: 20, top: 75 },
    { left: 90, top: 65 },
    { left: 50, top: 20 },
    { left: 75, top: 85 },
    { left: 30, top: 45 },
    { left: 80, top: 75 },
    { left: 40, top: 90 },
    { left: 65, top: 30 },
    { left: 25, top: 80 },
    { left: 70, top: 50 },
    { left: 10, top: 60 },
    { left: 95, top: 40 },
    { left: 45, top: 10 },
  ];

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            color: "#fff",
            border: "1px solid rgba(147, 51, 234, 0.3)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
          },
        }}
      />

      {/* Add CSS for grid animation */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>

      {/* Futuristic Background */}
      <section className="relative flex items-center justify-center min-h-screen px-4 py-20 pt-32 overflow-hidden md:pt-28 lg:pt-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>

        {/* Dynamic Gradient Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute rounded-full w-96 h-96 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
              left: `${mousePosition.x * 0.02}px`,
              top: `${mousePosition.y * 0.02}px`,
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
          <motion.div
            className="absolute rounded-full w-80 h-80 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              right: `${mousePosition.x * 0.015}px`,
              bottom: `${mousePosition.y * 0.015}px`,
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating Tech Elements - Only render on client */}
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
                  y: [0, -40, 0],
                  opacity: [0.1, 0.4, 0.1],
                  rotate: [0, 180, 360],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 6 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-purple-400/20" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Main Register Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative z-10 w-full max-w-lg mx-4 md:mx-6 lg:mx-8"
        >
          {/* Glassmorphism Card */}
          <div className="relative">
            {/* Enhanced Glow Effect */}
            <div className="absolute opacity-75 -inset-2 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl" />

            {/* Main Card with enhanced padding */}
            <div className="relative px-6 py-10 border shadow-2xl md:px-8 md:py-12 lg:px-10 lg:py-14 bg-slate-800/30 backdrop-blur-2xl rounded-3xl border-purple-500/20">
              {/* Tech-inspired Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-center md:mb-10 lg:mb-12"
              >
                {/* Enhanced Logo with better spacing */}
                <motion.div
                  className="flex items-center justify-center gap-3 mb-4 md:gap-4 md:mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="relative">
                    {/* Multi-layer glow */}
                    <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg animate-pulse" />
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-sm" />
                    <span className="relative flex items-center justify-center text-white shadow-2xl w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-2xl">
                      <Monitor size={28} className="md:w-8 md:h-8" />
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-transparent md:text-3xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
                      VinhWorks
                    </span>
                    <span className="-mt-1 text-xs font-normal text-gray-400 md:text-sm">
                      Advanced Tech Solutions
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400 md:w-6 md:h-6" />
                  </motion.div>
                </motion.div>

                {/* Welcome Message with better spacing */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4 space-y-2 md:space-y-3 md:mb-6"
                >
                  <h1 className="text-xl font-bold text-white md:text-2xl">
                    Tạo tài khoản mới 🚀
                  </h1>
                  <p className="px-2 text-sm text-gray-300 md:text-base">
                    Tham gia cộng đồng công nghệ hiện đại và khám phá những giải
                    pháp tuyệt vời
                  </p>
                </motion.div>

                {/* Security Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs text-purple-300 border rounded-full md:px-4 md:py-2 bg-purple-500/10 border-purple-500/20"
                >
                  <Shield size={12} className="md:w-4 md:h-4" />
                  <span>Bảo mật SSL 256-bit</span>
                </motion.div>
              </motion.div>

              {/* Enhanced Form with better spacing */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 space-y-5 md:space-y-6 md:mb-8"
              >
                {/* Name Input with enhanced styling */}
                <motion.div
                  className="relative group"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl group-focus-within:opacity-100 blur-sm" />
                  <div className="relative">
                    <div className="absolute z-10 transform -translate-y-1/2 left-4 top-1/2">
                      <User
                        className="text-purple-400 transition-colors duration-300 group-focus-within:text-blue-400"
                        size={20}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Tên đầy đủ của bạn"
                      required
                      ref={nameInputRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border md:py-4 bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 group-focus-within:opacity-100" />
                  </div>
                </motion.div>

                {/* Email Input */}
                <motion.div
                  className="relative group"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl group-focus-within:opacity-100 blur-sm" />
                  <div className="relative">
                    <div className="absolute z-10 transform -translate-y-1/2 left-4 top-1/2">
                      <Mail
                        className="text-purple-400 transition-colors duration-300 group-focus-within:text-blue-400"
                        size={20}
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Nhập email của bạn"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border md:py-4 bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 group-focus-within:opacity-100" />
                  </div>
                </motion.div>

                {/* Password Input with enhanced styling */}
                <motion.div
                  className="relative group"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl group-focus-within:opacity-100 blur-sm" />
                  <div className="relative">
                    <div className="absolute z-10 transform -translate-y-1/2 left-4 top-1/2">
                      <Lock
                        className="text-purple-400 transition-colors duration-300 group-focus-within:text-blue-400"
                        size={20}
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Tạo mật khẩu mạnh"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-12 pr-12 text-white placeholder-gray-400 transition-all duration-300 border md:py-4 bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-10 text-purple-400 transition-colors duration-300 transform -translate-y-1/2 right-4 top-1/2 hover:text-blue-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.button>
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 group-focus-within:opacity-100" />
                  </div>

                  {/* Enhanced Password strength indicator */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-1 mt-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-600/50">
                          <div
                            className={`h-full transition-all duration-500 ${
                              passwordStrength === "Yếu"
                                ? "w-1/3 bg-gradient-to-r from-red-500 to-red-400"
                                : passwordStrength === "Trung bình"
                                ? "w-2/3 bg-gradient-to-r from-yellow-500 to-orange-400"
                                : "w-full bg-gradient-to-r from-green-500 to-emerald-400"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium min-w-fit ${
                            passwordStrength === "Yếu"
                              ? "text-red-400"
                              : passwordStrength === "Trung bình"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {passwordStrength}
                        </span>
                      </div>
                      <p className="px-1 mt-2 text-xs text-gray-400">
                        Sử dụng ít nhất 6 ký tự với chữ hoa, chữ thường và số
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Enhanced Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className={`w-full relative overflow-hidden px-6 py-3 md:py-4 text-white font-semibold rounded-2xl transition-all duration-300 mt-6 md:mt-8 ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-2xl"
                  }`}
                >
                  {!loading && (
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-indigo-400/30 blur-xl hover:opacity-100" />
                  )}

                  <div className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                        <span>Đang tạo tài khoản...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Tạo tài khoản ngay</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.form>

              {/* Enhanced Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="relative my-6 text-center md:my-8"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-500/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 py-1 text-sm text-gray-400 rounded-full bg-slate-800/50 backdrop-blur-sm">
                    hoặc tiếp tục với
                  </span>
                </div>
              </motion.div>

              {/* Enhanced Social Login */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-6 space-y-3 md:mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleRegister}
                  className="flex items-center justify-center w-full gap-3 px-6 py-3 text-white transition-all duration-300 border md:py-4 rounded-2xl border-purple-500/30 bg-slate-700/30 backdrop-blur-sm hover:border-purple-400/50 hover:bg-slate-700/50 group"
                >
                  <Github
                    size={20}
                    className="text-gray-400 transition-colors group-hover:text-white"
                  />
                  <span className="font-medium">Đăng ký với GitHub</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </motion.div>

              {/* Enhanced Footer Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-4 text-center md:space-y-6"
              >
                <p className="text-sm text-gray-400">
                  Đã có tài khoản?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-transparent transition-all bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text hover:from-purple-300 hover:to-blue-300"
                  >
                    Đăng nhập ngay →
                  </Link>
                </p>

                <motion.div
                  className="flex items-center justify-center gap-2 px-4 text-xs text-gray-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap className="flex-shrink-0 w-4 h-4 text-yellow-400" />
                  <span className="text-center text-transparent bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text">
                    Trở thành một phần của cộng đồng lập trình hiện đại
                  </span>
                  <Zap className="flex-shrink-0 w-4 h-4 text-yellow-400" />
                </motion.div>

                {/* Terms and Privacy */}
                <p className="px-4 text-xs leading-relaxed text-gray-500">
                  Bằng việc đăng ký, bạn đồng ý với{" "}
                  <Link
                    href="/terms"
                    className="text-purple-400 underline hover:text-purple-300"
                  >
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-400 underline hover:text-purple-300"
                  >
                    Chính sách bảo mật
                  </Link>{" "}
                  của chúng tôi.
                </p>
              </motion.div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute w-16 h-16 rounded-full top-4 right-4 md:w-20 md:h-20 bg-gradient-to-br from-purple-500/5 to-blue-500/5 blur-2xl"></div>
              <div className="absolute w-12 h-12 rounded-full bottom-4 left-4 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 blur-2xl"></div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
