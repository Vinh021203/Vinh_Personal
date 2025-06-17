"use client";

import {
  Code,
  MonitorSmartphone,
  Layers,
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Palette,
  Rocket,
  Star,
  Award,
} from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Xây dựng website hiện đại với React, Next.js và công nghệ tiên tiến. Tối ưu hiệu suất và bảo mật cao.",
    features: [
      "React & Next.js",
      "TypeScript",
      "API Integration",
      "Database Design",
    ],
    color: "from-purple-500 to-blue-500",
    iconColor: "text-purple-400",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Thiết kế giao diện đẹp mắt, trải nghiệm người dùng tối ưu và responsive trên mọi thiết bị.",
    features: [
      "Figma Design",
      "Responsive Layout",
      "User Experience",
      "Brand Identity",
    ],
    color: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-400",
  },
  {
    icon: Rocket,
    title: "SEO & Performance",
    description:
      "Tối ưu tốc độ tải, chuẩn SEO Google, Core Web Vitals và tăng thứ hạng tìm kiếm.",
    features: [
      "SEO Optimization",
      "Core Web Vitals",
      "Page Speed",
      "Analytics",
    ],
    color: "from-indigo-500 to-purple-500",
    iconColor: "text-indigo-400",
  },
];

const stats = [
  {
    icon: Award,
    label: "Dự án hoàn thành",
    value: "50+",
    color: "text-purple-400",
  },
  {
    icon: Star,
    label: "Đánh giá 5 sao",
    value: "98%",
    color: "text-yellow-400",
  },
  {
    icon: Zap,
    label: "Tốc độ trung bình",
    value: "<2s",
    color: "text-green-400",
  },
  {
    icon: Globe,
    label: "Website đang hoạt động",
    value: "40+",
    color: "text-blue-400",
  },
];

export const ServiceSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

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
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-20 overflow-hidden md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 grid-animation"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute rounded-full w-96 h-96 blur-3xl float-animation pulse-glow"
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
          className="absolute rounded-full w-80 h-80 blur-3xl float-animation-reverse pulse-glow"
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

      <div className="relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:mb-20"
        >
          {/* Header Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-purple-300 border rounded-full bg-purple-500/10 border-purple-500/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">
              Dịch vụ chuyên nghiệp
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>

          <h2 id="services-heading" className="sr-only">
            Dịch vụ cung cấp
          </h2>

          <h3 className="mb-6 text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
            Dịch vụ công nghệ hiện đại
          </h3>

          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl">
            Kết hợp kinh nghiệm, sáng tạo và công nghệ tiên tiến để mang lại{" "}
            <span className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              giải pháp tối ưu
            </span>{" "}
            cho mục tiêu kinh doanh của bạn.
          </p>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6 mb-16 md:grid-cols-4 md:mb-20"
        >
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 text-center transition-all duration-300 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40"
              >
                <IconComponent
                  className={`w-8 h-8 ${stat.color} mx-auto mb-3`}
                />
                <div className="mb-1 text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid gap-8 mb-16 md:gap-10 md:grid-cols-2 lg:grid-cols-3 md:mb-20">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative overflow-hidden transition-all duration-300 border shadow-2xl group rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40"
              >
                {/* Service Card Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm group-hover:scale-110">
                    <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h4 className="mb-4 text-2xl font-bold text-white transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="mb-6 leading-relaxed text-gray-300">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-purple-400 transition-colors group-hover:text-purple-300">
                    <span className="text-sm font-medium">Tìm hiểu thêm</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              🚀 Sẵn sàng bắt đầu dự án?
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              Hãy để tôi giúp bạn biến ý tưởng thành hiện thực với công nghệ
              hiện đại và thiết kế chuyên nghiệp
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  aria-label="Đi tới trang liên hệ VinhWorks"
                >
                  <button className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl">
                    <Sparkles size={20} />
                    <span>Liên hệ ngay</span>
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/pricing"
                  aria-label="Xem bảng giá dịch vụ VinhWorks"
                >
                  <button className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-purple-400 transition-all duration-300 border rounded-2xl border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50 hover:bg-purple-500/20 backdrop-blur-sm">
                    <Star size={20} />
                    <span>Xem bảng giá</span>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Chất lượng cao</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Giao hàng nhanh</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-400" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
