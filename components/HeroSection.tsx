"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight,
  Code,
  Layers,
  Zap,
  Sparkles,
  MousePointer2,
  Globe,
  Cpu,
  Rocket,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax effect cho background
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // Range -10 to 10
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  // Smooth spring animation cho 3D card
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(
    useTransform(scrollY, [0, 100], [0, 0]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(scrollY, [0, 100], [0, 0]),
    springConfig
  );

  useEffect(() => {
    rotateX.set(-mousePosition.y);
    rotateY.set(mousePosition.x);
  }, [mousePosition, rotateX, rotateY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex items-center min-h-screen pt-20 overflow-hidden bg-white"
    >
      {/* --- BACKGROUND CREATIVE LAYERS --- */}

      {/* 1. Gradient Mesh Background Sáng */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[120%] bg-gradient-to-br from-purple-200/40 via-pink-100/40 to-orange-100/40 blur-[120px] rounded-full mix-blend-multiply opacity-80 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[100%] bg-gradient-to-bl from-blue-200/40 via-cyan-100/40 to-emerald-100/40 blur-[100px] rounded-full mix-blend-multiply opacity-80 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[80%] bg-gradient-to-t from-yellow-100/40 via-amber-100/40 to-red-100/40 blur-[100px] rounded-full mix-blend-multiply opacity-80 animate-blob animation-delay-4000" />
      </div>

      {/* 2. Abstract Shapes Parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-[10%] opacity-20 pointer-events-none"
      >
        <div className="w-64 h-64 border-[30px] border-rose-300/30 rounded-full blur-sm" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-40 left-[5%] opacity-20 pointer-events-none"
      >
        <div className="w-40 h-40 rotate-45 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-md" />
      </motion.div>

      {/* 3. Grid Pattern tinh tế */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT COLUMN: TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20"
          >
            {/* Creative Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold border rounded-full shadow-lg bg-white/80 backdrop-blur-md text-slate-800 border-white/50 ring-1 ring-purple-500/10"
            >
              <span className="flex w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                Available for Freelance & Projects
              </span>
            </motion.div>

            {/* Headline Siêu Lớn & Gradient */}
            <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9]">
              <span className="block mb-2">Digital</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 animate-gradient-x">
                  Solutions
                </span>
                {/* Underline sáng tạo */}
                <svg
                  className="absolute left-0 z-0 w-full h-3 text-yellow-400 -bottom-1"
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
              <span className="block mt-2 text-4xl font-bold text-slate-400 sm:text-5xl">
                Creator.
              </span>
            </h1>

            {/* Typing Effect Description */}
            <div className="h-20 mt-6 text-xl font-medium text-slate-600 sm:h-auto">
              Tôi giúp bạn xây dựng{" "}
              <span className="font-bold text-slate-800">
                <TypeAnimation
                  sequence={[
                    "Website hiệu năng cao ⚡",
                    2000,
                    "Giao diện UI/UX đột phá 🎨",
                    2000,
                    "Hệ thống Web App phức tạp 💻",
                    2000,
                    "Giải pháp SEO toàn diện 🚀",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
                />
              </span>
            </div>

            {/* Buttons Sáng tạo */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-4 overflow-hidden font-bold text-white shadow-xl group rounded-2xl bg-slate-900 shadow-purple-500/20"
                >
                  <div className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <span>Xem Dự Án</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.8)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 font-bold transition-all bg-white border shadow-lg text-slate-700 border-slate-200 rounded-2xl hover:shadow-xl"
                >
                  <MousePointer2 className="w-5 h-5 text-pink-500" />
                  <span>Liên Hệ</span>
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-12 text-sm font-semibold text-slate-400">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${
                      i % 2 === 0
                        ? "from-blue-400 to-cyan-300"
                        : "from-purple-400 to-pink-300"
                    } shadow-sm`}
                  />
                ))}
              </div>
              <p>
                Trusted by{" "}
                <span className="font-bold text-slate-800">30+ Clients</span>{" "}
                worldwide
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 3D INTERACTIVE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              perspective: 1000,
            }}
            className="relative lg:block h-full min-h-[500px] flex items-center justify-center"
          >
            {/* 3D Floating Container */}
            <motion.div
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-md"
            >
              {/* Background Glow đằng sau Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-orange-400 blur-[60px] opacity-40 rounded-full transform translate-z-[-50px]" />

              {/* MAIN CARD GLASSMORPHISM */}
              <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transform transition-transform duration-200 hover:shadow-[0_40px_80px_-15px_rgba(124,58,237,0.2)]">
                {/* Header Card */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-mono text-slate-500 border border-white">
                    vinhworks-portfolio.tsx
                  </div>
                </div>

                {/* Code Snippet Visual */}
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex gap-3">
                    <span className="text-slate-300">01</span>
                    <p>
                      <span className="font-bold text-purple-600">const</span>{" "}
                      <span className="text-blue-600">Developer</span> = {`{`}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-300">02</span>
                    <p className="pl-4">
                      name: <span className="text-emerald-600">"Vinh"</span>,
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-300">03</span>
                    <p className="pl-4">
                      skills: [<span className="text-amber-600">"React"</span>,{" "}
                      <span className="text-amber-600">"NextJS"</span>],
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-300">04</span>
                    <p className="pl-4">
                      hardWorker:{" "}
                      <span className="font-bold text-rose-500">true</span>,
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-300">05</span>
                    <p>{`}`};</p>
                  </div>
                </div>

                {/* Floating Skill Badges (Elements nổi trên bề mặt Card) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute z-20 flex items-center gap-2 p-3 bg-white border border-blue-100 shadow-xl -right-8 top-20 rounded-2xl"
                >
                  <div className="p-2 text-blue-600 bg-blue-100 rounded-lg">
                    <Code size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Clean Code
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute z-20 flex items-center gap-2 p-3 bg-white border border-purple-100 shadow-xl -left-6 bottom-20 rounded-2xl"
                >
                  <div className="p-2 text-purple-600 bg-purple-100 rounded-lg">
                    <Layers size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Modern UI
                  </span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute z-20 flex items-center gap-2 p-3 text-white shadow-xl -bottom-6 right-10 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl shadow-orange-500/30"
                >
                  <Rocket size={20} className="text-yellow-200" />
                  <span className="text-sm font-bold">Fast Speed</span>
                </motion.div>
              </div>

              {/* Decorative Abstract Elements Behind */}
              <div className="absolute -z-10 top-[-20px] right-[-20px] w-24 h-24 bg-yellow-200/50 rounded-full blur-xl animate-pulse" />
              <div className="absolute -z-10 bottom-[-30px] left-[-10px] w-32 h-32 bg-cyan-200/50 rounded-full blur-xl animate-pulse delay-75" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
