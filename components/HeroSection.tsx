"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import {
  FaRocket,
  FaLaptopCode,
  FaArrowRight,
  FaCode,
  FaPalette,
  FaSearch,
  FaMobile,
} from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";
import {
  Monitor,
  Sparkles,
  Code,
  Palette,
  Globe,
  Zap,
  Star,
  ArrowRight,
  Play,
  ChevronDown,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
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
    { left: 25, top: 40 },
    { left: 85, top: 75 },
    { left: 35, top: 90 },
    { left: 60, top: 25 },
  ];

  const stats = [
    {
      icon: Award,
      label: "Dự án hoàn thành",
      value: "50+",
      color: "text-purple-400",
    },
    {
      icon: Users,
      label: "Khách hàng hài lòng",
      value: "30+",
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      label: "Năm kinh nghiệm",
      value: "3+",
      color: "text-indigo-400",
    },
  ];

  const features = [
    { icon: Code, text: "Frontend Development", color: "text-purple-400" },
    { icon: Palette, text: "UI/UX Design", color: "text-blue-400" },
    { icon: Globe, text: "SEO Optimization", color: "text-indigo-400" },
    { icon: Zap, text: "Performance Tuning", color: "text-pink-400" },
  ];

  return (
    <section
      className="relative flex items-center justify-center min-h-screen pt-24 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        VinhWorks - Thiết kế website, lập trình ứng dụng UI/UX chuẩn SEO & theo
        yêu cầu
      </h1>

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

      <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-11rem)]">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-sm font-medium">
                  Chào mừng đến với VinhWorks
                </span>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
                className="flex justify-center lg:justify-start"
              >
                <Monitor className="w-16 h-16 text-purple-400 md:w-20 md:h-20 animate-bounce" />
              </motion.div>

              <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
                <div className="mb-2 text-white">
                  Xin chào, tôi là{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
                    Vinh
                  </span>
                </div>

                <div className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text">
                  <TypeAnimation
                    sequence={[
                      "Web Developer 💻",
                      2000,
                      "UI/UX Designer 🎨",
                      2000,
                      "SEO Specialist 🚀",
                      2000,
                      "Full-stack Developer ⚡",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="inline-block"
                  />
                </div>
              </h2>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
                Tôi chuyên tạo ra những{" "}
                <span className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  website hiện đại
                </span>{" "}
                với thiết kế đẹp mắt, tối ưu SEO và trải nghiệm người dùng tuyệt
                vời.
              </p>
              <p className="mt-2 text-purple-300">
                Biến ý tưởng của bạn thành hiện thực số! 🚀
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid max-w-2xl grid-cols-1 gap-4 mx-auto sm:grid-cols-2 lg:mx-0"
            >
              {features.map((feature, i) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 transition-colors border bg-white/5 backdrop-blur-sm border-white/10 rounded-xl hover:border-purple-500/30"
                  >
                    <IconComponent
                      className={`w-5 h-5 ${feature.color} flex-shrink-0`}
                    />
                    <span className="text-sm font-medium text-gray-300">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/projects">
                  <Button className="flex items-center w-full gap-3 px-8 py-4 text-lg font-bold text-white transition-all duration-300 shadow-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 rounded-2xl hover:shadow-purple-500/25 sm:w-auto">
                    <FaRocket className="w-5 h-5" />
                    <span>Xem dự án</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <Button className="flex items-center w-full gap-3 px-8 py-4 text-lg font-bold text-purple-400 transition-all duration-300 border-2 border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50 hover:bg-purple-500/20 rounded-2xl backdrop-blur-sm sm:w-auto">
                    <Play className="w-4 h-4" />
                    <span>Liên hệ ngay</span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats - Thêm padding bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-8 pt-4 pb-12 lg:justify-start md:pb-16"
            >
              {stats.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <div key={i} className="text-center">
                    <IconComponent
                      className={`w-6 h-6 ${stat.color} mx-auto mb-2`}
                    />
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              {/* Main Visual Card */}
              <div className="relative">
                <div className="absolute opacity-75 -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl" />
                <div className="relative p-6 border md:p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-purple-500/20 rounded-3xl">
                  {/* Code Preview */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="ml-4 font-mono text-sm text-gray-400">
                        VinhWorks.tsx
                      </span>
                    </div>
                    <div className="p-4 overflow-x-auto font-mono text-sm bg-slate-900/80 rounded-xl">
                      <div className="text-purple-400">
                        const <span className="text-blue-400">developer</span> ={" "}
                        {`{`}
                      </div>
                      <div className="ml-4 text-gray-300">
                        name: <span className="text-green-400">"Vinh"</span>,
                      </div>
                      <div className="ml-4 text-gray-300">
                        skills: [
                        <span className="text-yellow-400">"React"</span>,{" "}
                        <span className="text-yellow-400">"Next.js"</span>],
                      </div>
                      <div className="ml-4 text-gray-300">
                        passion:{" "}
                        <span className="text-pink-400">
                          "Creating amazing UX"
                        </span>
                      </div>
                      <div className="text-purple-400">{`}`}</div>
                    </div>
                  </div>

                  {/* Tech Stack Icons */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                      { name: "React", color: "text-blue-400" },
                      { name: "Next.js", color: "text-white" },
                      { name: "TypeScript", color: "text-blue-500" },
                      { name: "Tailwind", color: "text-cyan-400" },
                    ].map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="flex flex-col items-center p-3 transition-colors border bg-white/5 backdrop-blur-sm border-white/10 rounded-xl hover:border-purple-500/30"
                      >
                        <Code className={`w-6 h-6 ${tech.color} mb-2`} />
                        <span className="text-xs font-medium text-center text-gray-300">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute p-4 shadow-2xl -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl"
              >
                <Zap className="w-6 h-6 text-black" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute p-4 shadow-2xl -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl"
              >
                <Globe className="w-6 h-6 text-black" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Đã có khoảng cách phù hợp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-purple-400"
          >
            <span className="text-sm font-medium">Khám phá thêm</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
