"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Layers,
  Zap,
  MousePointer2,
  Rocket,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center min-h-[85vh] md:min-h-[90vh] pt-16 pb-6 overflow-hidden md:pt-20 lg:pt-6 bg-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[120%] bg-gradient-to-br from-purple-200/40 via-pink-100/40 to-orange-100/40 blur-[120px] rounded-full mix-blend-multiply opacity-80 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[100%] bg-gradient-to-bl from-blue-200/40 via-cyan-100/40 to-emerald-100/40 blur-[100px] rounded-full mix-blend-multiply opacity-80 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[80%] bg-gradient-to-t from-yellow-100/40 via-amber-100/40 to-red-100/40 blur-[100px] rounded-full mix-blend-multiply opacity-80 animate-blob animation-delay-4000" />
      </div>

      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-[10%] opacity-20 pointer-events-none hidden lg:block"
      >
        <div className="w-48 h-48 border-[25px] border-rose-300/30 rounded-full blur-sm" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-32 left-[5%] opacity-20 pointer-events-none hidden lg:block"
      >
        <div className="w-32 h-32 rotate-45 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-md" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      {/* MAIN CONTENT */}
      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          {/* LEFT: TEXT CONTENT - COMPACT SPACING */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 text-center lg:text-left"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-5 text-xs md:text-sm font-bold border rounded-full shadow-lg bg-white/80 backdrop-blur-md text-slate-800 border-white/50 ring-1 ring-purple-500/10"
            >
              <span className="flex w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                Available for Freelance & Projects
              </span>
            </motion.div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[0.9]">
              <span className="block mb-1.5">Digital</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 animate-gradient-x">
                  Solutions
                </span>
                <svg
                  className="absolute left-0 z-0 w-full h-2 md:h-3 text-yellow-400 -bottom-1"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
              <span className="block mt-1.5 text-2xl font-bold sm:text-3xl md:text-4xl text-slate-400">
                Creator.
              </span>
            </h1>

            <div className="h-14 mt-3 text-base font-medium md:mt-4 md:text-lg text-slate-600 md:h-8">
              Tôi giúp bạn xây dựng{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Hệ thống Web App
              </span>
            </div>

            <div className="flex flex-row justify-center gap-2 mt-5 lg:justify-start md:gap-3 lg:gap-4 md:mt-2">
              <Link href="/projects" className="flex-1 sm:flex-initial">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full px-4 py-3 overflow-hidden font-bold text-white shadow-xl sm:w-auto sm:px-6 md:px-8 md:py-3.5 group rounded-2xl bg-slate-900 shadow-purple-500/20"
                >
                  <div className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-center gap-1.5 md:gap-2 lg:gap-3">
                    <span className="text-xs sm:text-sm md:text-base">
                      Xem Dự Án
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform md:w-5 md:h-5 group-hover:translate-x-1" />
                  </div>
                </motion.button>
              </Link>

              <Link href="/contact" className="flex-1 sm:flex-initial">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.8)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-1.5 px-4 py-3 font-bold transition-all bg-white border shadow-lg sm:w-auto sm:px-6 md:px-8 md:py-3.5 md:gap-2 lg:gap-3 text-slate-700 border-slate-200 rounded-2xl hover:shadow-xl"
                >
                  <MousePointer2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-pink-500" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Liên Hệ
                  </span>
                </motion.button>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3 mt-5 text-xs font-semibold md:flex-row md:mt-6 lg:justify-start md:text-sm text-slate-400">
              <div className="flex -space-x-2.5">
                {[
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                ].map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 1 }}
                    className="relative w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400"
                  >
                    <Image
                      src={avatar}
                      alt={`Client ${i + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-center md:text-left">
                Trusted by{" "}
                <span className="font-bold text-slate-800">30+ Clients</span>{" "}
                worldwide
              </p>
            </div>
          </motion.div>

          {/* RIGHT: DIAGONAL CARDS - BIGGER SIZE + COLORED SHADOWS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center h-full min-h-[350px] lg:min-h-[500px]"
          >
            <div className="relative w-full h-full">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 blur-[100px] opacity-15" />

              {/* CODE CARD 1 (Top-Right) - BLUE/PURPLE SHADOW */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [-3, -2.5, -3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 -right-2 md:right-4 lg:right-8 z-20 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[70%]"
                style={{
                  transformOrigin: "center",
                  transform:
                    "perspective(1000px) rotateY(-8deg) rotateZ(-3deg)",
                }}
              >
                <CodeCard
                  gradientFrom="from-blue-500"
                  gradientTo="to-purple-600"
                  shadowColor="shadow-blue-500/30"
                  filename="vinhworks-portfolio.tsx"
                  lineNumbers={["01", "02", "03", "04", "05"]}
                  codeLines={[
                    { line: "const Developer = {", indent: 0 },
                    { line: 'name: "Vinh",', indent: 1 },
                    { line: 'skills: ["React", "NextJS"],', indent: 1 },
                    { line: "hardWorker: true,", indent: 1 },
                    { line: "};", indent: 0 },
                  ]}
                  badges={[
                    {
                      icon: Code,
                      label: "Clean Code",
                      color: "blue",
                      position: "-right-1 md:-right-3 top-8 md:top-12",
                      delay: 0,
                    },
                    {
                      icon: Layers,
                      label: "Modern UI",
                      color: "purple",
                      position: "-left-1 md:-left-3 bottom-8 md:bottom-12",
                      delay: 0.5,
                    },
                  ]}
                  floatingBadge={{
                    icon: Rocket,
                    label: "Fast Speed",
                    position: "-bottom-2 right-4 md:right-8",
                  }}
                />
              </motion.div>

              {/* CODE CARD 2 (Bottom-Left) - EMERALD/CYAN SHADOW */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotateZ: [3, 2.5, 3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-24 md:top-28 lg:top-32 -left-2 md:left-4 lg:left-8 z-10 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[70%]"
                style={{
                  transformOrigin: "center",
                  transform: "perspective(1000px) rotateY(8deg) rotateZ(3deg)",
                }}
              >
                <CodeCard
                  gradientFrom="from-emerald-500"
                  gradientTo="to-cyan-600"
                  shadowColor="shadow-emerald-500/30"
                  filename="next.config.js"
                  lineNumbers={["01", "02", "03", "04", "05"]}
                  codeLines={[
                    { line: "module.exports = {", indent: 0 },
                    { line: "reactStrictMode: true,", indent: 1 },
                    { line: "swcMinify: true,", indent: 1 },
                    { line: "images: { domains: [...] },", indent: 1 },
                    { line: "};", indent: 0 },
                  ]}
                  badges={[
                    {
                      icon: Zap,
                      label: "Optimized",
                      color: "green",
                      position: "-right-1 md:-right-3 top-8 md:top-12",
                      delay: 0.2,
                    },
                    {
                      icon: Sparkles,
                      label: "SEO Ready",
                      color: "cyan",
                      position: "-left-1 md:-left-3 bottom-8 md:bottom-12",
                      delay: 0.7,
                    },
                  ]}
                  floatingBadge={{
                    icon: Rocket,
                    label: "Production",
                    position: "-bottom-2 right-4 md:right-8",
                  }}
                />
              </motion.div>

              {/* Floating Sparkle Icons */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-2 right-2 md:bottom-6 md:right-6 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/40"
              >
                <Sparkles size={20} className="text-white md:w-7 md:h-7" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-20 left-2 md:bottom-24 md:left-6 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-cyan-500/40"
              >
                <Sparkles size={20} className="text-white md:w-7 md:h-7" />
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-[15%] right-[8%] w-20 h-20 md:w-32 md:h-32 bg-yellow-200/25 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -z-10 bottom-[15%] left-[8%] w-24 h-24 md:w-36 md:h-36 bg-cyan-200/25 rounded-full blur-2xl animate-pulse delay-75" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// CODE CARD COMPONENT - BIGGER SIZE + COLORED SHADOW
interface CodeCardProps {
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  filename: string;
  lineNumbers: string[];
  codeLines: { line: string; indent: number }[];
  badges: Array<{
    icon: any;
    label: string;
    color: string;
    position: string;
    delay: number;
  }>;
  floatingBadge: {
    icon: any;
    label: string;
    position: string;
  };
}

const CodeCard = ({
  gradientFrom,
  gradientTo,
  shadowColor,
  filename,
  lineNumbers,
  codeLines,
  badges,
  floatingBadge,
}: CodeCardProps) => {
  return (
    <div className="relative">
      {/* Gradient Glow - With Specific Color */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${gradientFrom} ${gradientTo} blur-[60px] md:blur-[70px] opacity-20 rounded-3xl`}
      />

      {/* Main Card - Slightly Bigger */}
      <div
        className={`relative bg-white/85 backdrop-blur-xl border border-white/70 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] hover:shadow-[0_40px_90px_-15px] ${shadowColor} transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b md:pb-3 md:mb-4 border-slate-200/60">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-rose-400 shadow-sm" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400 shadow-sm" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-400 shadow-sm" />
          </div>
          <div className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-slate-100/80 backdrop-blur-sm text-[9px] md:text-[10px] font-mono text-slate-600 border border-slate-200/50">
            {filename}
          </div>
        </div>

        {/* Code Lines */}
        <div className="space-y-1.5 font-mono text-[11px] md:space-y-2 md:text-sm">
          {codeLines.map((code, idx) => (
            <div key={idx} className="flex gap-2 md:gap-3">
              <span className="text-slate-300 select-none text-[10px] md:text-xs">
                {lineNumbers[idx]}
              </span>
              <p
                className="leading-relaxed"
                style={{ paddingLeft: `${code.indent * 14}px` }}
              >
                <SyntaxHighlight line={code.line} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Badges */}
      {badges.map((badge, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, badge.delay * 10 - 5, 0] }}
          transition={{
            duration: 3 + idx,
            repeat: Infinity,
            ease: "easeInOut",
            delay: badge.delay,
          }}
          className={`absolute z-30 flex items-center gap-1 md:gap-1.5 p-1.5 md:p-2.5 bg-white/95 backdrop-blur-md border shadow-lg rounded-lg md:rounded-xl ${badge.position} ${
            badge.color === "blue"
              ? "border-blue-100"
              : badge.color === "purple"
                ? "border-purple-100"
                : badge.color === "green"
                  ? "border-emerald-100"
                  : "border-cyan-100"
          }`}
        >
          <div
            className={`p-1.5 md:p-2 rounded-md ${
              badge.color === "blue"
                ? "bg-blue-100 text-blue-600"
                : badge.color === "purple"
                  ? "bg-purple-100 text-purple-600"
                  : badge.color === "green"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-cyan-100 text-cyan-600"
            }`}
          >
            <badge.icon size={14} className="md:w-5 md:h-5" />
          </div>
          <span className="pr-1 text-[11px] md:text-sm font-bold text-slate-800 whitespace-nowrap">
            {badge.label}
          </span>
        </motion.div>
      ))}

      {/* Gradient Floating Badge */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute z-30 flex items-center gap-1 md:gap-1.5 p-1.5 md:p-2.5 text-white shadow-xl rounded-lg md:rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} ${floatingBadge.position}`}
      >
        <floatingBadge.icon size={14} className="text-white md:w-5 md:h-5" />
        <span className="pr-1 text-[11px] md:text-sm font-bold whitespace-nowrap">
          {floatingBadge.label}
        </span>
      </motion.div>
    </div>
  );
};

// Syntax Highlight Helper
const SyntaxHighlight = ({ line }: { line: string }) => {
  if (line.includes("const") || line.includes("module.exports")) {
    return (
      <>
        <span className="font-bold text-purple-600">{line.split(" ")[0]}</span>{" "}
        <span className="text-blue-600">{line.split(" ")[1]}</span>{" "}
        {line.split(" ").slice(2).join(" ")}
      </>
    );
  }
  if (line.includes(":")) {
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":");
    return (
      <>
        {key}:
        {value?.includes("true") ? (
          <span className="font-bold text-rose-500">{value}</span>
        ) : value?.includes('"') ? (
          <span className="text-emerald-600">{value}</span>
        ) : (
          <span className="text-amber-600">{value}</span>
        )}
      </>
    );
  }
  return <>{line}</>;
};
