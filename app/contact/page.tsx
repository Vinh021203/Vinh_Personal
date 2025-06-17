"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  Loader2,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Monitor,
  Sparkles,
  User,
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
  Shield,
  Star,
} from "lucide-react";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 1500);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Liên hệ đã được gửi thành công! 🎉");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Không thể gửi liên hệ. Vui lòng thử lại! 😔");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-generate particle positions
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
    { left: 25, top: 40 },
    { left: 85, top: 75 },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Điện thoại",
      value: "0971 386 588",
      link: "tel:0971386588",
      color: "text-purple-400",
      bg: "from-purple-500/10 to-blue-500/10",
    },
    {
      icon: Mail,
      title: "Email",
      value: "luongvinh02122003@gmail.com",
      link: "mailto:luongvinh02122003@gmail.com",
      color: "text-blue-400",
      bg: "from-blue-500/10 to-indigo-500/10",
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      value: "TP. Hạ Long, Quảng Ninh",
      link: "#",
      color: "text-indigo-400",
      bg: "from-indigo-500/10 to-purple-500/10",
    },
    {
      icon: Clock,
      title: "Thời gian làm việc",
      value: "8:00 - 22:00 (T2-CN)",
      link: "#",
      color: "text-pink-400",
      bg: "from-pink-500/10 to-purple-500/10",
    },
  ];

  const features = [
    { icon: Zap, text: "Phản hồi nhanh trong 24h", color: "text-yellow-400" },
    {
      icon: Shield,
      text: "Bảo mật thông tin tuyệt đối",
      color: "text-green-400",
    },
    { icon: Star, text: "Tư vấn miễn phí 100%", color: "text-purple-400" },
    { icon: Globe, text: "Hỗ trợ 24/7", color: "text-blue-400" },
  ];

  return (
    <>
      <Head>
        <title>Liên hệ | VinhWorks</title>
        <meta
          name="description"
          content="Liên hệ với VinhWorks để được tư vấn miễn phí về các giải pháp công nghệ hiện đại."
        />
        <meta property="og:title" content="Liên hệ | VinhWorks" />
        <meta
          property="og:description"
          content="Trang liên hệ chính thức của VinhWorks - Nhận tư vấn miễn phí 24/7."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

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

      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 rounded-full border-purple-500/30"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <motion.p
                className="mt-6 text-lg font-medium text-purple-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Đang tải trang liên hệ...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <section
        className={`relative min-h-screen px-4 py-20 pt-32 md:pt-28 lg:pt-24 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 transition-all duration-500 ${
          loading
            ? "blur-sm pointer-events-none select-none opacity-30"
            : "opacity-100"
        }`}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
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
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-purple-400/20" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center md:mb-20"
          >
            {/* Header Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-purple-300 border rounded-full bg-purple-500/10 border-purple-500/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Liên hệ với chúng tôi
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Hãy kết nối với chúng tôi! 🚀
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
              <br />
              <span className="font-medium text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                Gửi tin nhắn và nhận phản hồi trong vòng 24 giờ!
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute opacity-75 -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl" />

                {/* Main Form Card */}
                <div className="relative p-6 border shadow-2xl md:p-8 lg:p-10 bg-slate-800/30 backdrop-blur-2xl rounded-3xl border-purple-500/20">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Gửi tin nhắn
                      </h2>
                    </div>
                    <p className="text-gray-300">
                      Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với
                      bạn sớm nhất có thể.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <motion.div
                      className="relative group"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block mb-2 text-sm font-medium text-purple-300">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <User
                          className="absolute text-purple-400 transition-colors transform -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-400"
                          size={20}
                        />
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Nhập họ và tên của bạn"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border md:py-4 bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                        />
                      </div>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      className="relative group"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block mb-2 text-sm font-medium text-purple-300">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute text-purple-400 transition-colors transform -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-400"
                          size={20}
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border md:py-4 bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                        />
                      </div>
                    </motion.div>

                    {/* Subject Input */}
                    <motion.div
                      className="relative group"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block mb-2 text-sm font-medium text-purple-300">
                        Chủ đề
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Chủ đề tin nhắn"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border md:py-4 bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                      />
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div
                      className="relative group"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block mb-2 text-sm font-medium text-purple-300">
                        Nội dung *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder="Chia sẻ chi tiết về dự án hoặc câu hỏi của bạn..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border resize-none md:py-4 bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                      />
                    </motion.div>

                    {/* Enhanced Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full relative overflow-hidden px-6 py-3 md:py-4 text-white font-semibold rounded-2xl transition-all duration-300 ${
                        isSubmitting
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-2xl"
                      }`}
                    >
                      {!isSubmitting && (
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-indigo-400/30 blur-xl hover:opacity-100" />
                      )}

                      <div className="relative flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Đang gửi...</span>
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            <span>Gửi tin nhắn</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {features.map((feature, i) => {
                      const IconComponent = feature.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-gray-400"
                        >
                          <IconComponent
                            className={`w-4 h-4 ${feature.color}`}
                          />
                          <span>{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Thông tin liên hệ
                </h3>
                <p className="text-gray-300">
                  Bạn có thể liên hệ trực tiếp qua các kênh bên dưới hoặc ghé
                  thăm văn phòng của chúng tôi.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, i) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <a
                        href={info.link}
                        className={`block p-6 rounded-3xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br ${info.bg} hover:border-purple-400/40 transition-all duration-300 group`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 transition-colors bg-slate-700/50 rounded-2xl group-hover:bg-slate-600/50">
                            <IconComponent
                              className={`w-6 h-6 ${info.color}`}
                            />
                          </div>
                          <div>
                            <h4 className="mb-1 font-semibold text-white">
                              {info.title}
                            </h4>
                            <p className="text-sm text-gray-300">
                              {info.value}
                            </p>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-emerald-500/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <h4 className="text-lg font-bold text-white">
                    Cam kết phản hồi
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-gray-300">
                  Chúng tôi cam kết phản hồi mọi tin nhắn trong vòng{" "}
                  <strong className="text-green-400">24 giờ</strong>. Đối với
                  các yêu cầu khẩn cấp, vui lòng gọi trực tiếp số hotline để
                  được hỗ trợ nhanh nhất.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
