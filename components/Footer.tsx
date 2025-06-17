"use client";

import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Monitor,
  ArrowUp,
  Send,
  Sparkles,
  Heart,
  Code,
  Zap,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false); // Fix hydration

  useEffect(() => {
    setIsClient(true); // Chỉ render particles sau khi mount
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  // Pre-generate fixed positions để tránh hydration mismatch
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
    { left: 25, top: 40 },
    { left: 85, top: 75 },
    { left: 35, top: 90 },
    { left: 60, top: 25 },
    { left: 20, top: 55 },
    { left: 75, top: 35 },
    { left: 40, top: 80 },
    { left: 95, top: 45 },
    { left: 30, top: 65 },
  ];

  const services = [
    { name: "Thiết kế Website", icon: Code },
    { name: "Tối ưu SEO", icon: Zap },
    { name: "Ứng dụng Mobile", icon: Globe },
    { name: "Bảo trì & Nâng cấp", icon: Heart },
  ];

  const quickLinks = [
    { name: "Về chúng tôi", href: "/about" },
    { name: "Dự án", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Liên hệ", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-500",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-3xl animate-pulse"></div>
      </div>

      {/* Fixed floating particles - chỉ render sau khi mount */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-300/20"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + (i % 3), // Variation nhưng deterministic
                repeat: Infinity,
                delay: i * 0.3, // Fixed delay
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 px-6 pt-20 pb-12">
        {/* Enhanced Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-16 text-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg animate-pulse"></div>
              <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-sm"></div>
              <span className="relative flex items-center justify-center text-white shadow-2xl w-14 h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl">
                <Monitor size={28} />
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text">
                VinhWorks
              </h2>
              <span className="-mt-1 text-sm font-normal text-gray-400">
                Tech Solutions
              </span>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
          <p className="max-w-2xl leading-relaxed text-gray-300">
            Tạo ra những giải pháp công nghệ hiện đại, tối ưu hiệu suất và trải
            nghiệm người dùng tuyệt vời.
            <br />
            <span className="font-medium text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Biến ý tưởng thành hiện thực số! 🚀
            </span>
          </p>
        </motion.div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 gap-12 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Liên hệ
            </h3>
            <div className="space-y-4">
              <motion.a
                href="tel:0971386588"
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-3 p-3 text-gray-300 transition-all duration-300 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                  <Phone size={16} className="text-purple-400" />
                </div>
                <span className="text-sm">0971 386 588</span>
              </motion.a>

              <motion.a
                href="mailto:luongvinh02122003@gmail.com"
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-3 p-3 text-gray-300 transition-all duration-300 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                  <Mail size={16} className="text-purple-400" />
                </div>
                <span className="text-sm">luongvinh02122003@gmail.com</span>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-3 p-3 text-gray-300 transition-all duration-300 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                  <MapPin size={16} className="text-purple-400" />
                </div>
                <span className="text-sm">TP. Hạ Long, Quảng Ninh</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Dịch vụ
            </h3>
            <div className="space-y-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.name}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-3 p-2 text-gray-300 transition-all duration-300 rounded-lg cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 group"
                  >
                    <IconComponent
                      size={16}
                      className="text-purple-400 transition-colors group-hover:text-pink-400"
                    />
                    <span className="text-sm">{service.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Liên kết nhanh
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ scale: 1.05, x: 5 }}>
                  <Link
                    href={link.href}
                    className="block p-2 text-sm text-gray-300 transition-all duration-300 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter & Social Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Kết nối
            </h3>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 text-gray-400 transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 ${social.color}`}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white">
                Nhận thông tin mới
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    required
                    className="w-full px-4 py-3 text-white transition-all duration-300 border rounded-xl bg-slate-700/50 border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50 backdrop-blur-sm"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 shadow-lg rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
                >
                  <Send size={16} />
                  Đăng ký nhận tin
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-12 mt-16 text-center border-t border-purple-500/20"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} VinhWorks. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-400" />
              </motion.div>
              <span>in Vietnam</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed z-50 p-4 text-white transition-all duration-300 rounded-full shadow-2xl bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            aria-label="Lên đầu trang"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
