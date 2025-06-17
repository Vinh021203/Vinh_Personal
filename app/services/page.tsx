"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Code2,
  ChevronDown,
  Monitor,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Star,
  Zap,
  Shield,
  Globe,
  Rocket,
  Clock,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import Head from "next/head";
import Link from "next/link";
import { iconMap } from "@/components/admin/SelectIconField";

interface IService {
  _id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  status: "Hiển thị" | "Ẩn";
  category?: string;
  isNew?: boolean;
}

const benefits = [
  { text: "Tối ưu SEO & Core Web Vitals", icon: TrendingUp },
  { text: "Responsive mọi thiết bị", icon: Globe },
  { text: "Kết nối backend/API linh hoạt", icon: Code2 },
  { text: "Thiết kế chuẩn thương hiệu", icon: Award },
  { text: "Giao diện đẹp, dễ dùng", icon: Star },
  { text: "Dễ mở rộng, bảo trì", icon: Shield },
];

const faqData = [
  {
    question: "Chi phí thiết kế website là bao nhiêu?",
    answer:
      "Chi phí tùy vào tính năng và độ phức tạp. Từ 5-50 triệu tùy dự án. Hãy liên hệ để nhận báo giá chi tiết và tư vấn miễn phí.",
  },
  {
    question: "Thời gian hoàn thành dự án?",
    answer:
      "Landing page: 3-7 ngày. Website phức tạp: 2-4 tuần. E-commerce: 3-6 tuần. Chúng tôi đảm bảo đúng tiến độ cam kết.",
  },
  {
    question: "Có hỗ trợ bảo trì sau khi bàn giao?",
    answer:
      "Có! Chúng tôi hỗ trợ bảo trì miễn phí 3-6 tháng đầu, bao gồm fix bug, cập nhật nội dung và hỗ trợ kỹ thuật.",
  },
  {
    question: "Website có tối ưu SEO không?",
    answer:
      "Tất cả website đều được tối ưu SEO cơ bản: meta tags, sitemap, schema markup, tốc độ tải, mobile-friendly và Core Web Vitals.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Tư vấn & Phân tích",
    desc: "Lắng nghe nhu cầu, phân tích yêu cầu và đưa ra giải pháp tối ưu",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "Thiết kế UI/UX",
    desc: "Tạo wireframe, mockup và prototype để bạn hình dung rõ sản phẩm",
    icon: Monitor,
  },
  {
    step: "03",
    title: "Lập trình & Phát triển",
    desc: "Code clean, tối ưu performance và tích hợp các tính năng cần thiết",
    icon: Code2,
  },
  {
    step: "04",
    title: "Test & Bàn giao",
    desc: "Kiểm tra kỹ lưỡng, training sử dụng và hỗ trợ triển khai",
    icon: Rocket,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Lỗi tải dịch vụ:", err))
      .finally(() => setLoading(false));
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
  ];

  return (
    <>
      <Head>
        <title>Dịch vụ lập trình | VinhWorks</title>
        <meta
          name="description"
          content="Thiết kế website, tối ưu SEO, lập trình Frontend/Backend chuyên nghiệp với công nghệ hiện đại."
        />
        <meta property="og:title" content="Dịch vụ lập trình | VinhWorks" />
        <meta
          property="og:description"
          content="Thiết kế website, tối ưu SEO, lập trình Frontend/Backend chuyên nghiệp với công nghệ hiện đại."
        />
        <meta property="og:image" content="/seo-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/services" />
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
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Dịch vụ chuyên nghiệp
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Giải pháp công nghệ hiện đại
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl">
              Tập trung vào{" "}
              <strong className="text-white">
                hiệu suất, SEO, trải nghiệm người dùng
              </strong>{" "}
              và khả năng mở rộng để phù hợp mọi loại hình kinh doanh.
              <br />
              <span className="font-medium text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                Biến ý tưởng thành sản phẩm số hoàn hảo! 🚀
              </span>
            </p>
          </motion.div>

          {/* Enhanced Services Grid */}
          {loading ? (
            <div className="flex justify-center mt-20">
              <div className="relative">
                <div className="w-12 h-12 border-4 rounded-full border-purple-500/30"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {services.map((svc, i) => {
                  const Icon = iconMap[svc.icon] || Code2;
                  return (
                    <motion.div
                      key={svc._id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="relative p-6 transition-all duration-300 border group md:p-8 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40">
                        <div className="relative">
                          <Icon className="w-12 h-12 mb-4 text-purple-400 transition-transform group-hover:scale-110" />
                          <h3 className="mb-3 text-xl font-bold text-white">
                            {svc.name}
                          </h3>
                          <p className="leading-relaxed text-gray-300">
                            {svc.description}
                          </p>
                        </div>
                        {svc.isNew && (
                          <span className="absolute px-3 py-1 text-xs font-medium text-white rounded-full top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500">
                            Mới
                          </span>
                        )}
                        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-3xl group-hover:opacity-100" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Enhanced Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                ✨ Lợi ích khi chọn VinhWorks
              </h2>
              <p className="max-w-2xl mx-auto text-gray-300">
                Những giá trị cốt lõi chúng tôi mang lại cho mỗi dự án
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, i) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-4 p-4 transition-all duration-300 border md:p-6 rounded-2xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40 group"
                  >
                    <IconComponent className="flex-shrink-0 w-6 h-6 text-purple-400 transition-colors group-hover:text-blue-400" />
                    <span className="text-gray-300 transition-colors group-hover:text-white">
                      {benefit.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                🎯 Quy trình làm việc chuyên nghiệp
              </h3>
              <p className="max-w-2xl mx-auto text-gray-300">
                Quy trình 4 bước đảm bảo chất lượng và tiến độ dự án
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative p-6 text-center transition-all duration-300 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40 group"
                  >
                    <div className="relative mb-4">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <span className="absolute flex items-center justify-center w-8 h-8 text-xs font-bold text-black rounded-full -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400">
                        {step.step}
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-white">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced FAQ Section */}
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
              <p className="max-w-2xl mx-auto text-gray-300">
                Những thắc mắc phổ biến từ khách hàng
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqData.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 transition-all duration-300 border rounded-2xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40"
                >
                  <button
                    onClick={() =>
                      setFaqOpenIndex(faqOpenIndex === i ? null : i)
                    }
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="pr-4 font-semibold text-white transition-colors group-hover:text-purple-300">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-purple-400 transition-all duration-300 flex-shrink-0 ${
                        faqOpenIndex === i
                          ? "rotate-180 text-blue-400"
                          : "group-hover:text-purple-300"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {faqOpenIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pl-1 mt-4 leading-relaxed text-gray-300">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                🚀 Sẵn sàng bắt đầu dự án?
              </h3>
              <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                Hãy cùng chúng tôi biến ý tưởng của bạn thành hiện thực với công
                nghệ hiện đại nhất
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
                    <span>Nhận tư vấn miễn phí</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-purple-400 transition-all duration-300 border rounded-2xl border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50 hover:bg-purple-500/20 backdrop-blur-sm"
                  >
                    <Star size={20} />
                    <span>Xem bảng giá</span>
                  </Link>
                </motion.div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>50+ Khách hàng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Giao hàng đúng hẹn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Chất lượng cao</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
