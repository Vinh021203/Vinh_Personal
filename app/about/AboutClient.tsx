"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Code2,
  Rocket,
  Heart,
  Brain,
  Globe,
  Zap,
  Award,
  Download,
  Github,
  Linkedin,
  Mail,
  Layers,
  Sparkles,
  Palette,
  CalendarClock,
  Smartphone,
  CloudLightning,
  Server,
} from "lucide-react";

// --- DATA & CONFIG ---

const gradients = {
  primary: "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500",
  text: "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500",
  glass: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl",
  cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)]",
};

const stats = [
  {
    label: "Năm kinh nghiệm",
    value: "05+",
    icon: CalendarClock,
    color: "text-blue-500",
  },
  {
    label: "Dự án thành công",
    value: "50+",
    icon: Rocket,
    color: "text-orange-500",
  },
  {
    label: "Khách hàng hài lòng",
    value: "98%",
    icon: Heart,
    color: "text-rose-500",
  },
  { label: "Tech Stack", value: "15+", icon: Layers, color: "text-purple-500" },
];

const skillsBento = [
  {
    title: "Frontend Mastery",
    desc: "Pixel-perfect UI với hiệu suất tối đa.",
    icon: Palette,
    tags: ["React", "Next.js", "Tailwind", "Framer Motion", "Three.js"],
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    border: "border-blue-100",
  },
  {
    title: "Backend Robustness",
    desc: "Hệ thống chịu tải cao, bảo mật.",
    icon: Server,
    tags: ["Node.js", "NestJS", "PostgreSQL", "Redis"],
    colSpan: "md:col-span-1",
    bg: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
    border: "border-purple-100",
  },
  {
    title: "DevOps & Cloud",
    desc: "CI/CD tự động hóa, deploy nhanh.",
    icon: CloudLightning,
    tags: ["Docker", "AWS", "Vercel", "GitHub Actions"],
    colSpan: "md:col-span-1",
    bg: "bg-gradient-to-br from-orange-50 to-amber-50",
    border: "border-orange-100",
  },
  {
    title: "Mobile & Cross-platform",
    desc: "Ứng dụng đa nền tảng mượt mà.",
    icon: Smartphone,
    tags: ["React Native", "Flutter", "PWA"],
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-br from-pink-50 to-rose-50",
    border: "border-pink-100",
  },
];

const timeline = [
  {
    year: "2024",
    role: "Senior Full-stack Developer",
    company: "VinhWorks Agency",
    desc: "Sáng lập agency chuyên cung cấp giải pháp số. Dẫn dắt team 5 người xây dựng các sản phẩm SaaS.",
    highlight: "Tăng trưởng 200% doanh thu",
    color: "bg-orange-500",
  },
  {
    year: "2022",
    role: "Lead Frontend Engineer",
    company: "Global Tech Corp",
    desc: "Chịu trách nhiệm kiến trúc Frontend cho hệ thống E-commerce phục vụ 1M+ user.",
    highlight: "Giảm 40% thời gian tải trang",
    color: "bg-purple-500",
  },
  {
    year: "2020",
    role: "Web Developer",
    company: "Creative Studio",
    desc: "Phát triển các website landing page với hiệu ứng animation phức tạp.",
    highlight: "Đạt giải Awwwards Site of the Day",
    color: "bg-blue-500",
  },
];

// --- COMPONENTS ---

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
    className={`absolute z-20 p-3 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] backdrop-blur-md border border-white/80 ${className}`}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const BentoCard = ({ item }: { item: (typeof skillsBento)[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.colSpan} ${item.bg} border ${item.border}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${x}px ${y}px,
              rgba(255,255,255,0.8),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="inline-block p-3 mb-6 transition-transform duration-300 bg-white shadow-sm rounded-2xl text-slate-700 group-hover:scale-110">
          <item.icon size={28} />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-slate-900">{item.title}</h3>
        <p className="mb-6 font-medium text-slate-600">{item.desc}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-bold border rounded-lg shadow-sm bg-white/60 border-white/50 text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function AboutClient() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vinh",
    jobTitle: "Senior Full-stack Developer",
    url: "https://vinhworks.com/about",
    description:
      "Chuyên gia xây dựng giải pháp Web App hiện đại với Next.js và AI.",
  };

  return (
    <>
      {/* Đã bỏ <Head> ở đây để dùng metadata ở server */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <motion.div
        style={{ scaleX }}
        className={`fixed top-0 left-0 right-0 h-1.5 ${gradients.primary} origin-left z-[100]`}
      />

      <main className="min-h-screen overflow-hidden font-sans bg-white text-slate-900">
        {/* ================= HERO SECTION (MOBILE OPTIMIZED) ================= */}
        <section className="relative pt-12 pb-8 lg:py-8">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange-300/20 rounded-full blur-[120px] animate-blob mix-blend-multiply" />
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-8 lg:gap-16 lg:flex-row">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 text-center lg:text-left"
              >
                {/* Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 text-xs sm:text-sm font-bold text-orange-600 bg-white border border-orange-100 rounded-full shadow-sm"
                >
                  <Sparkles
                    size={14}
                    className="fill-orange-500 sm:w-4 sm:h-4"
                  />
                  <span className="hidden sm:inline">
                    Creative Developer & UI Designer
                  </span>
                  <span className="sm:hidden">Dev & Designer</span>
                </motion.div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 lg:text-7xl mb-4 sm:mb-6 leading-[1.1]">
                  Tôi là <span className={gradients.text}>Vinh.</span> <br />
                  <span className="text-2xl sm:text-3xl lg:text-5xl">
                    Xây dựng thế giới số.
                  </span>
                </h1>

                {/* Description */}
                <p className="max-w-2xl mx-auto mb-6 sm:mb-10 text-sm sm:text-lg lg:text-xl font-medium leading-relaxed text-slate-600 lg:mx-0">
                  Kết hợp tư duy logic của một{" "}
                  <span className="font-bold text-blue-600">
                    Lập trình viên
                  </span>{" "}
                  với tâm hồn bay bổng của một{" "}
                  <span className="font-bold text-pink-600">Nghệ sĩ</span>. Tôi
                  tạo ra những trải nghiệm web không chỉ chạy tốt, mà còn chạm
                  đến cảm xúc.
                </p>

                {/* CTA Buttons - 2 NÚT NGANG MOBILE */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 lg:justify-start mb-8 sm:mb-12">
                  <Link href="/contact" className="flex-1 sm:flex-none">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 ${gradients.primary} text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg`}
                    >
                      <Mail size={16} className="sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Liên hệ hợp tác</span>
                      <span className="sm:hidden">Liên hệ</span>
                    </motion.button>
                  </Link>

                  <motion.a
                    href="/CV_Website.pdf"
                    download="CV_VinhWorks.pdf"
                    whileHover={{ scale: 1.05, backgroundColor: "#F8FAFC" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-bold transition-all bg-white border-2 text-slate-700 border-slate-100 rounded-xl sm:rounded-2xl hover:border-purple-200 hover:text-purple-600"
                  >
                    <Download size={16} className="sm:w-5 sm:h-5" />
                    <span>Tải CV</span>
                  </motion.a>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-6 sm:gap-8 lg:justify-start text-slate-400">
                  <SocialLink
                    icon={Github}
                    href="#"
                    hoverColor="hover:text-slate-900"
                  />
                  <SocialLink
                    icon={Linkedin}
                    href="#"
                    hoverColor="hover:text-blue-700"
                  />
                  <SocialLink
                    icon={Globe}
                    href="#"
                    hoverColor="hover:text-pink-600"
                  />
                </div>
              </motion.div>

              {/* Right - Avatar with Floating Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex-1 w-full max-w-sm lg:max-w-lg"
              >
                <div className="relative aspect-square">
                  {/* Spinning Borders */}
                  <div className="absolute inset-0 border-[2px] sm:border-[3px] border-dashed border-orange-200 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-3 sm:inset-4 border-[2px] sm:border-[3px] border-dashed border-purple-200 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Avatar Image */}
                  <div className="absolute flex items-center justify-center overflow-hidden border-4 sm:border-8 border-white rounded-full shadow-2xl inset-6 sm:inset-8 bg-gradient-to-br from-orange-100 via-white to-purple-100">
                    <Image
                      src="/me.jpg"
                      alt="Vinh Avatar"
                      width={500}
                      height={500}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                      priority
                      unoptimized
                    />
                  </div>

                  {/* Floating Badges - MOBILE OPTIMIZED */}
                  <FloatingBadge className="top-8 sm:top-10 right-8 sm:right-10 bg-white/90">
                    <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-orange-600 text-xs sm:text-sm">
                      <Zap
                        size={16}
                        className="fill-orange-500 sm:w-5 sm:h-5"
                      />
                      <span className="hidden sm:inline">Fast & Furious</span>
                      <span className="sm:hidden">Fast</span>
                    </div>
                  </FloatingBadge>

                  <FloatingBadge
                    className="left-0 bottom-16 sm:bottom-20 bg-white/90"
                    delay={0.2}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-purple-600 text-xs sm:text-sm">
                      <Code2 size={16} className="sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Clean Code</span>
                      <span className="sm:hidden">Code</span>
                    </div>
                  </FloatingBadge>

                  <FloatingBadge
                    className="top-1/2 -right-4 sm:-right-8 bg-white/90"
                    delay={0.4}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-pink-600 text-xs sm:text-sm">
                      <Heart
                        size={16}
                        className="fill-pink-500 sm:w-5 sm:h-5"
                      />
                      <span className="hidden sm:inline">UI/UX Lover</span>
                      <span className="sm:hidden">UI/UX</span>
                    </div>
                  </FloatingBadge>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="py-10">
          <div className="container max-w-6xl px-6 mx-auto">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl ${gradients.glass}`}
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center cursor-default group"
                >
                  <div
                    className={`flex justify-center mb-3 ${stat.color} group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon size={32} />
                  </div>
                  <h3 className="mb-1 text-4xl font-black text-slate-900">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SKILLS BENTO GRID ================= */}
        <section className="relative py-8">
          <div className="container max-w-6xl px-6 mx-auto">
            <div className="mb-10 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="px-4 py-1 text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-100 rounded-full bg-purple-50"
              >
                Vũ khí bí mật
              </motion.span>
              <h2 className="mt-4 text-4xl font-black md:text-5xl text-slate-900">
                Công nghệ tôi <span className={gradients.text}>làm chủ</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {skillsBento.map((item, idx) => (
                <BentoCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= JOURNEY TIMELINE ================= */}
        <section className="relative py-8 overflow-hidden bg-slate-50/50">
          <div className="container relative z-10 max-w-5xl px-6 mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black md:text-5xl text-slate-900">
                Hành trình <span className="text-blue-600">phát triển</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />

              <div className="space-y-12">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${
                      idx % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="hidden md:block w-[45%]" />

                    <div className="absolute z-20 flex items-center justify-center -translate-x-1/2 left-8 md:left-1/2">
                      <div
                        className={`w-4 h-4 rounded-full ${item.color} ring-4 ring-white shadow-lg`}
                      />
                    </div>

                    <div className="w-full md:w-[45%] pl-16 md:pl-0">
                      <div
                        className={`relative p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 ${
                          idx % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <div
                          className={`hidden md:block absolute top-6 w-4 h-4 bg-white border-t border-r border-slate-100 rotate-45 ${
                            idx % 2 === 0
                              ? "-right-2.5 border-l-0 border-b-0"
                              : "-left-2.5 border-t-0 border-r-0 border-l border-b"
                          }`}
                        />

                        <div className="absolute left-[-33px] top-0 bottom-0 w-0.5 bg-slate-200 md:hidden" />

                        <span
                          className={`inline-block px-3 py-1 mb-3 rounded-lg text-xs font-bold text-white shadow-sm ${item.color}`}
                        >
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          {item.role}
                        </h3>
                        <h4 className="mb-3 text-base font-semibold text-slate-500">
                          {item.company}
                        </h4>
                        <p className="mb-4 text-sm leading-relaxed text-slate-600">
                          {item.desc}
                        </p>

                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 ${
                            idx % 2 === 0 ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <Award size={14} className="text-yellow-500" />
                          {item.highlight}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= QUOTE / PHILOSOPHY ================= */}
        <section className="py-10 sm:py-16">
          <div className="container max-w-5xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Gradient border wrapper */}
              <div className="p-[2px] rounded-[2.5rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 shadow-2xl shadow-purple-500/20">
                <div className="relative rounded-[2.4rem] bg-white overflow-hidden">

                  {/* Background blobs */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-1/4 right-0 w-[600px] h-[600px] bg-purple-100/60 rounded-full blur-[120px] animate-blob" />
                    <div className="absolute -bottom-1/4 left-0 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.04)_0%,_transparent_70%)]" />
                  </div>

                  <div className="relative z-10 px-6 py-12 sm:px-14 sm:py-16 md:px-20 md:py-20 text-center">

                    {/* Decorative quote marks */}
                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-[80px] sm:text-[120px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-violet-200 to-fuchsia-100 select-none pointer-events-none">
                      &ldquo;
                    </div>
                    <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-[80px] sm:text-[120px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-200 to-fuchsia-100 select-none pointer-events-none rotate-180">
                      &ldquo;
                    </div>

                    {/* Brain icon */}
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mb-6 sm:mb-8 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 border border-violet-200 shadow-lg shadow-violet-100"
                    >
                      <Brain size={28} className="text-violet-600 sm:w-8 sm:h-8" />
                    </motion.div>

                    {/* Quote text */}
                    <h2 className="relative z-10 mb-6 sm:mb-10 text-2xl sm:text-3xl md:text-5xl font-black leading-[1.25] text-slate-900">
                      Code không chỉ để{" "}
                      <span className="relative inline-block">
                        <span className="relative z-10">máy tính hiểu.</span>
                      </span>
                      <br />
                      Code là để{" "}
                      <span className="relative inline-block">
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
                          con người
                        </span>
                        <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 opacity-60" />
                      </span>{" "}
                      cảm nhận.
                    </h2>

                    {/* Divider + Label */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-slate-200 rounded-full" />
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-100">
                        <Sparkles size={14} className="text-violet-500" />
                        <p className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-violet-600">
                          Triết lý làm việc
                        </p>
                      </div>
                      <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-slate-200 rounded-full" />
                    </div>

                    {/* Author row */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 sm:mt-8 flex items-center justify-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-violet-200 shadow-md">
                        <Image
                          src="/me.jpg"
                          alt="Vinh"
                          width={36}
                          height={36}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-slate-800">Lương Xuân Vinh</p>
                        <p className="text-xs text-slate-400 font-medium">Full-stack Developer & Founder</p>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative py-8 overflow-hidden text-center">
          <div className="container relative z-10 px-6 mx-auto">
            <h2 className="mb-8 text-4xl font-black md:text-6xl text-slate-900">
              Sẵn sàng tạo nên <br /> điều{" "}
              <span className={gradients.text}>kỳ diệu?</span>
            </h2>
            <p className="max-w-2xl mx-auto mb-10 text-xl text-slate-600">
              Đừng ngần ngại. Hãy chia sẻ ý tưởng của bạn, và chúng ta sẽ cùng
              nhau biến nó thành hiện thực.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-5 ${gradients.primary} text-white font-bold rounded-full text-xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all`}
              >
                Bắt đầu dự án ngay
              </motion.button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

const SocialLink = ({
  icon: Icon,
  href,
  hoverColor,
}: {
  icon: any;
  href: string;
  hoverColor: string;
}) => (
  <a
    href={href}
    className={`p-3 rounded-full bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${hoverColor}`}
  >
    <Icon size={24} />
  </a>
);
