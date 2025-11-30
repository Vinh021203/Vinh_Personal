"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Code2,
  Rocket,
  Heart,
  Coffee,
  Brain,
  Globe,
  Zap,
  Award,
  Users,
  CheckCircle2,
  Download,
  Github,
  Linkedin,
  Mail,
  Layers,
  Cpu,
  Sparkles,
  MousePointer2,
  Palette,
  Terminal,
  Database,
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

// --- ICONS ---
import {
  CalendarClock,
  Smartphone,
  CloudLightning,
  Server,
} from "lucide-react"; // Import thêm icons

// --- COMPONENTS ---

// 1. Floating 3D Badge
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

// 2. Interactive Skill Card
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
      {/* Mouse Follow Gradient Spotlight */}
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

// --- MAIN PAGE ---

export default function AboutPage() {
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
      <Head>
        <title>Về VinhWorks | Hành trình Sáng tạo & Công nghệ</title>
        <meta
          name="description"
          content="Khám phá hành trình của VinhWorks - Nơi nghệ thuật gặp gỡ công nghệ."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Scroll Progress Bar (Bright Gradient) */}
      <motion.div
        style={{ scaleX }}
        className={`fixed top-0 left-0 right-0 h-1.5 ${gradients.primary} origin-left z-[100]`}
      />

      <main className="min-h-screen overflow-hidden font-sans bg-white text-slate-900">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
          {/* Vivid Background Blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange-300/20 rounded-full blur-[120px] animate-blob mix-blend-multiply" />
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply" />
            {/* Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              {/* LEFT: TEXT CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 text-center lg:text-left"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold text-orange-600 bg-white border border-orange-100 rounded-full shadow-sm"
                >
                  <Sparkles size={16} className="fill-orange-500" />
                  <span>Creative Developer & UI Designer</span>
                </motion.div>

                <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl mb-6 leading-[1.1]">
                  Tôi là <span className={gradients.text}>Vinh.</span> <br />
                  Xây dựng thế giới số.
                </h1>

                <p className="max-w-2xl mx-auto mb-10 text-xl font-medium leading-relaxed text-slate-600 lg:mx-0">
                  Kết hợp tư duy logic của một{" "}
                  <span className="font-bold text-blue-600">
                    Lập trình viên
                  </span>{" "}
                  với tâm hồn bay bổng của một{" "}
                  <span className="font-bold text-pink-600">Nghệ sĩ</span>. Tôi
                  tạo ra những trải nghiệm web không chỉ chạy tốt, mà còn chạm
                  đến cảm xúc.
                </p>

                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-4 ${gradients.primary} text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center gap-3 text-lg`}
                    >
                      <Mail size={20} />
                      Liên hệ hợp tác
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#F8FAFC" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 text-lg font-bold transition-all bg-white border-2 text-slate-700 border-slate-100 rounded-2xl hover:border-purple-200 hover:text-purple-600"
                  >
                    <Download size={20} />
                    Tải CV
                  </motion.button>
                </div>

                <div className="flex items-center justify-center gap-8 mt-12 lg:justify-start text-slate-400">
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

              {/* RIGHT: 3D AVATAR VISUAL */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex-1 w-full max-w-lg"
              >
                <div className="relative aspect-square">
                  {/* Rotating Rings */}
                  <div className="absolute inset-0 border-[3px] border-dashed border-orange-200 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-4 border-[3px] border-dashed border-purple-200 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Main Avatar Container */}
                  <div className="absolute flex items-center justify-center overflow-hidden border-8 border-white rounded-full shadow-2xl inset-8 bg-gradient-to-br from-orange-100 via-white to-purple-100">
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

                  {/* Floating Badges */}
                  <FloatingBadge className="top-10 right-10 bg-white/90">
                    <div className="flex items-center gap-2 font-bold text-orange-600">
                      <Zap size={20} className="fill-orange-500" />
                      <span>Fast & Furious</span>
                    </div>
                  </FloatingBadge>

                  <FloatingBadge
                    className="left-0 bottom-20 bg-white/90"
                    delay={0.2}
                  >
                    <div className="flex items-center gap-2 font-bold text-purple-600">
                      <Code2 size={20} />
                      <span>Clean Code</span>
                    </div>
                  </FloatingBadge>

                  <FloatingBadge
                    className="top-1/2 -right-8 bg-white/90"
                    delay={0.4}
                  >
                    <div className="flex items-center gap-2 font-bold text-pink-600">
                      <Heart size={20} className="fill-pink-500" />
                      <span>UI/UX Lover</span>
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
        <section className="relative py-24">
          <div className="container max-w-6xl px-6 mx-auto">
            <div className="mb-20 text-center">
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
        <section className="relative py-24 overflow-hidden bg-slate-50/50">
          <div className="container relative z-10 max-w-5xl px-6 mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-black md:text-5xl text-slate-900">
                Hành trình <span className="text-blue-600">phát triển</span>
              </h2>
            </div>

            <div className="relative">
              {/* Vertical Line (Kẻ dọc chính giữa) - Chỉ hiện trên Desktop */}
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
                    {/* 1. Empty Space for Alignment (Khoảng trống đối diện) */}
                    <div className="hidden md:block w-[45%]" />

                    {/* 2. Center Dot (Chấm tròn trung tâm) */}
                    <div className="absolute z-20 flex items-center justify-center -translate-x-1/2 left-8 md:left-1/2">
                      <div
                        className={`w-4 h-4 rounded-full ${item.color} ring-4 ring-white shadow-lg`}
                      />
                    </div>

                    {/* 3. Content Card */}
                    <div className="w-full md:w-[45%] pl-16 md:pl-0">
                      <div
                        className={`relative p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 ${
                          idx % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        {/* Arrow Pointer (Mũi tên chỉ vào Dot) */}
                        <div
                          className={`hidden md:block absolute top-6 w-4 h-4 bg-white border-t border-r border-slate-100 rotate-45 ${
                            idx % 2 === 0
                              ? "-right-2.5 border-l-0 border-b-0" // Mũi tên bên phải
                              : "-left-2.5 border-t-0 border-r-0 border-l border-b" // Mũi tên bên trái
                          }`}
                        />

                        {/* Mobile Line Connector (Kẻ dọc cho Mobile) */}
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

                        {/* Highlight Badge */}
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

        {/* ================= QUOTE / PHILOSOPHY (Light Mode) ================= */}
        <section className="py-24">
          <div className="container max-w-5xl px-6 mx-auto">
            <div className="relative rounded-[3rem] bg-white border border-slate-100 p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-slate-200/50">
              {/* Abstract shapes (Light Mode Colors) */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[20%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
                <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
              </div>

              <div className="relative z-10">
                <div className="inline-block p-4 mb-8 text-purple-600 border rounded-full shadow-lg bg-gradient-to-br from-slate-50 to-white border-slate-100">
                  <Brain size={32} />
                </div>

                <h2 className="mb-8 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                  "Code không chỉ để máy tính hiểu.
                  <br />
                  Code là để{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">
                    con người
                  </span>{" "}
                  cảm nhận."
                </h2>

                <div className="flex items-center justify-center gap-2">
                  <div className="h-0.5 w-12 bg-slate-200 rounded-full"></div>
                  <p className="text-lg font-bold tracking-widest uppercase  text-slate-500">
                    Triết lý làm việc
                  </p>
                  <div className="h-0.5 w-12 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative py-24 overflow-hidden text-center">
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

// Helper Component for Social Links
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
