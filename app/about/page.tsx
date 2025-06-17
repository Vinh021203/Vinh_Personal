"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Sparkles,
  Code,
  Rocket,
  Smile,
  Lightbulb,
  HeartHandshake,
  Server,
  Paintbrush2,
  BadgeCheck,
  FolderGit2,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  MessageCircle,
  Clock,
  Star,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutPage() {
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

  const techStack = [
    {
      name: "React",
      icon: BadgeCheck,
      color: "text-blue-400",
      bg: "from-blue-500/10 to-blue-600/10",
    },
    {
      name: "Next.js",
      icon: FolderGit2,
      color: "text-purple-400",
      bg: "from-purple-500/10 to-purple-600/10",
    },
    {
      name: "Tailwind CSS",
      icon: Paintbrush2,
      color: "text-pink-400",
      bg: "from-pink-500/10 to-pink-600/10",
    },
    {
      name: "Node.js",
      icon: Server,
      color: "text-green-400",
      bg: "from-green-500/10 to-green-600/10",
    },
    {
      name: "MongoDB",
      icon: Server,
      color: "text-emerald-400",
      bg: "from-emerald-500/10 to-emerald-600/10",
    },
    {
      name: "shadcn/ui",
      icon: Sparkles,
      color: "text-yellow-400",
      bg: "from-yellow-500/10 to-yellow-600/10",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Đẹp & Tối ưu",
      description:
        "Chú trọng UI/UX hiện đại, tốc độ tải nhanh, chuẩn SEO, điểm Lighthouse cao.",
      color: "text-purple-400",
      bg: "from-purple-500/10 to-blue-500/10",
    },
    {
      icon: Code,
      title: "Công nghệ tiên tiến",
      description:
        "Sử dụng stack công nghệ mới nhất: React, Next.js, TypeScript, AI Integration.",
      color: "text-blue-400",
      bg: "from-blue-500/10 to-indigo-500/10",
    },
    {
      icon: Rocket,
      title: "Triển khai nhanh",
      description:
        "Đảm bảo đúng deadline, dễ nâng cấp và hỗ trợ tận tình sau bàn giao.",
      color: "text-pink-400",
      bg: "from-pink-500/10 to-purple-500/10",
    },
    {
      icon: Shield,
      title: "Bảo mật cao",
      description:
        "Áp dụng các tiêu chuẩn bảo mật mới nhất, SSL, authentication hiện đại.",
      color: "text-green-400",
      bg: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Globe,
      title: "Responsive Design",
      description:
        "Tối ưu cho mọi thiết bị, từ mobile đến desktop, tablet và các màn hình lớn.",
      color: "text-indigo-400",
      bg: "from-indigo-500/10 to-purple-500/10",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Tối ưu hiệu suất, lazy loading, code splitting, CDN integration.",
      color: "text-yellow-400",
      bg: "from-yellow-500/10 to-orange-500/10",
    },
  ];

  const values = [
    {
      icon: Smile,
      text: "Luôn lắng nghe và tư vấn đúng nhu cầu",
      color: "text-purple-400",
    },
    {
      icon: Lightbulb,
      text: "Đề xuất giải pháp rõ ràng, minh bạch",
      color: "text-yellow-400",
    },
    {
      icon: HeartHandshake,
      text: "Hỗ trợ bảo trì và nâng cấp miễn phí ban đầu",
      color: "text-pink-400",
    },
  ];

  return (
    <>
      <Head>
        <title>Giới thiệu về tôi | VinhWorks</title>
        <meta
          name="description"
          content="Vinh là lập trình viên chuyên phát triển website hiện đại, dùng React, Next.js, Tailwind, MongoDB..."
        />
        <meta property="og:title" content="Giới thiệu về tôi | VinhWorks" />
        <meta
          property="og:description"
          content="Giới thiệu về Vinh - nhà phát triển web yêu UI/UX, tối ưu hiệu suất, mang lại trải nghiệm tuyệt vời cho khách hàng."
        />
        <meta property="og:image" content="/seo-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      <section className="relative min-h-screen px-4 py-20 pt-32 overflow-hidden md:pt-28 lg:pt-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
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
          {/* Hero Section */}
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
              <Monitor className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Về tôi
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="relative mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl" />
              <div className="relative w-32 h-32 mx-auto md:w-40 md:h-40">
                <Image
                  src="/me.jpg"
                  alt="Ảnh lập trình viên Vinh"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full border-4 rounded-full shadow-2xl border-purple-500/30"
                />
                <div className="absolute flex items-center justify-center w-8 h-8 border-4 rounded-full -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-400 border-slate-900">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="mb-6 text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              👋 Xin chào, mình là Vinh
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              className="max-w-3xl mx-auto mb-8 text-lg text-gray-300 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-purple-300 border rounded-full bg-purple-500/10 border-purple-500/20 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-sm font-medium">
                  "Biến ý tưởng thành website sống động | từng dòng code là tâm
                  huyết."
                </span>
              </div>
              <p className="leading-relaxed">
                Một <strong className="text-white">lập trình viên web</strong>{" "}
                với đam mê xây dựng giao diện đẹp, mượt mà và chuẩn SEO. Mình sử
                dụng{" "}
                <strong className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  React, Next.js, Tailwind CSS, Node.js, MongoDB
                </strong>{" "}
                và{" "}
                <strong className="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                  AI Technology
                </strong>{" "}
                để hiện thực hóa ý tưởng thành sản phẩm thực tế.
              </p>
            </motion.div>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                🛠 Tech Stack & Tools
              </h2>
              <p className="max-w-2xl mx-auto text-gray-300">
                Công nghệ và công cụ tôi sử dụng để tạo ra những sản phẩm tuyệt
                vời
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
              {techStack.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`relative p-4 md:p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br ${tech.bg} hover:border-purple-400/40 transition-all duration-300 group`}
                  >
                    <div className="text-center">
                      <IconComponent
                        className={`w-8 h-8 md:w-10 md:h-10 ${tech.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}
                      />
                      <span className="text-sm font-medium text-white md:text-base">
                        {tech.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl group-hover:opacity-100" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                ✨ Điểm mạnh & Chuyên môn
              </h2>
              <p className="max-w-2xl mx-auto text-gray-300">
                Những giá trị cốt lõi tôi mang lại cho mỗi dự án
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`relative p-6 md:p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br ${feature.bg} hover:border-purple-400/40 transition-all duration-300 group`}
                  >
                    <div className="relative">
                      <IconComponent
                        className={`w-12 h-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
                      />
                      <h3 className="mb-3 text-xl font-bold text-white">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-3xl group-hover:opacity-100" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <h3 className="mb-8 text-2xl font-bold text-center text-white">
                💎 Giá trị cốt lõi
              </h3>
              <div className="space-y-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 transition-all border rounded-2xl bg-slate-800/30 backdrop-blur-sm border-purple-500/10 hover:border-purple-400/30"
                    >
                      <IconComponent
                        className={`w-6 h-6 ${value.color} flex-shrink-0`}
                      />
                      <span className="text-gray-300">{value.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="mb-6 text-lg italic leading-relaxed text-gray-300 md:text-xl">
                "Website do Vinh làm cực nhanh, đẹp và tối ưu SEO tốt. Rất nhiệt
                tình và chuyên nghiệp. Đặc biệt ấn tượng với hiệu ứng animation
                và responsive design."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  N
                </div>
                <div>
                  <p className="font-semibold text-white">Anh Nam</p>
                  <p className="text-sm text-gray-400">CEO VN Tech</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                ❓ Câu hỏi thường gặp
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border md:p-8 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                <div className="flex items-start gap-4 mb-4">
                  <MessageCircle className="flex-shrink-0 w-6 h-6 mt-1 text-purple-400" />
                  <div>
                    <p className="mb-2 font-bold text-purple-400">
                      Chi phí thiết kế website là bao nhiêu?
                    </p>
                    <p className="text-gray-300">
                      Chi phí tùy độ phức tạp & yêu cầu. Từ 5-50 triệu tùy dự
                      án. Hãy{" "}
                      <Link
                        href="/contact"
                        className="font-medium text-purple-400 underline hover:text-purple-300"
                      >
                        liên hệ
                      </Link>{" "}
                      để được tư vấn chi tiết miễn phí.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border md:p-8 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                <div className="flex items-start gap-4 mb-4">
                  <Clock className="flex-shrink-0 w-6 h-6 mt-1 text-blue-400" />
                  <div>
                    <p className="mb-2 font-bold text-blue-400">
                      Thời gian hoàn thành?
                    </p>
                    <p className="text-gray-300">
                      Thông thường từ 1-4 tuần tùy dự án. Landing page: 3-7
                      ngày. Website phức tạp: 2-4 tuần. Đảm bảo đúng tiến độ cam
                      kết.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                🚀 Sẵn sàng bắt đầu dự án?
              </h3>
              <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                Hãy cùng tôi biến ý tưởng của bạn thành hiện thực với công nghệ
                hiện đại nhất
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl"
                  >
                    <MessageCircle size={20} />
                    <span>Liên hệ ngay</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-purple-400 transition-all duration-300 border rounded-2xl border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50 hover:bg-purple-500/20 backdrop-blur-sm"
                  >
                    <Rocket size={20} />
                    <span>Xem dự án</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
