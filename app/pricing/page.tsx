"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Quote,
  Rocket,
  Building2,
  Settings2,
  Star,
  Zap,
  Shield,
  Crown,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Users,
  Clock,
  Award,
  ChevronDown,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const plans = [
  {
    name: "Cơ bản",
    icon: Rocket,
    price: "5-15 triệu",
    originalPrice: "20 triệu",
    badge: "🔥 Tiết kiệm 25%",
    description:
      "Dành cho cá nhân hoặc startup nhỏ cần một trang giới thiệu chuyên nghiệp.",
    features: [
      "Giao diện 1 trang chuẩn UX/UI",
      "Responsive hoàn hảo mọi thiết bị",
      "SEO cơ bản tối ưu Google",
      "Tốc độ tải nhanh < 3s",
      "SSL miễn phí",
      "Hỗ trợ kỹ thuật 7 ngày đầu",
    ],
    color: "from-purple-500 to-blue-500",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
  },
  {
    name: "Doanh nghiệp",
    icon: Building2,
    price: "15-35 triệu",
    originalPrice: "45 triệu",
    badge: "⭐ Phổ biến nhất",
    description:
      "Phù hợp cho doanh nghiệp muốn mở rộng thương hiệu và tiếp cận khách hàng hiệu quả.",
    features: [
      "Trang giới thiệu + dịch vụ đa trang",
      "Form liên hệ và CTA hấp dẫn",
      "SEO nâng cao + Core Web Vitals",
      "Tích hợp Google Analytics",
      "Chat widget & Social media",
      "Content Management System",
      "Hỗ trợ kỹ thuật 1 tháng",
    ],
    highlight: true,
    color: "from-blue-500 to-indigo-500",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-400",
  },
  {
    name: "Tùy chỉnh",
    icon: Settings2,
    price: "35-100 triệu",
    originalPrice: "120 triệu",
    badge: "👑 Premium",
    description:
      "Thiết kế linh hoạt theo mục tiêu kinh doanh và tính năng đặc thù.",
    features: [
      "Tư vấn demo giao diện chi tiết",
      "Tích hợp API, CMS nâng cao",
      "E-commerce & Payment gateway",
      "Multi-language support",
      "Advanced animations & effects",
      "Performance optimization",
      "Bảo trì và mở rộng lâu dài",
    ],
    color: "from-indigo-500 to-purple-500",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-400",
  },
];

const faqs = [
  {
    question: "Chi phí thiết kế website là bao nhiêu?",
    answer:
      "Giá phụ thuộc vào mức độ tùy chỉnh và tính năng. Gói cơ bản từ 5-15 triệu, doanh nghiệp 15-35 triệu, tùy chỉnh 35-100 triệu. Hãy liên hệ để được tư vấn miễn phí và nhận báo giá chi tiết.",
  },
  {
    question: "Mất bao lâu để hoàn thành?",
    answer:
      "Landing page: 3-7 ngày. Website doanh nghiệp: 2-4 tuần. Dự án tùy chỉnh: 4-8 tuần. Chúng tôi đảm bảo đúng tiến độ cam kết và cập nhật tiến độ hàng tuần.",
  },
  {
    question: "Có bảo hành và hỗ trợ sau khi bàn giao không?",
    answer:
      "Có! Mỗi gói đều có thời gian hỗ trợ kỹ thuật miễn phí. Gói cơ bản: 7 ngày, doanh nghiệp: 1 tháng, tùy chỉnh: 3 tháng. Bao gồm fix bug, cập nhật nội dung và hỗ trợ kỹ thuật.",
  },
  {
    question: "Website có tối ưu SEO và tốc độ không?",
    answer:
      "Tất cả website đều được tối ưu SEO cơ bản và nâng cao: meta tags, sitemap, schema markup, tốc độ tải < 3s, mobile-friendly, Core Web Vitals đạt chuẩn Google.",
  },
];

const testimonials = [
  {
    name: "Trần Hữu Nam",
    role: "CEO WebPlus",
    avatar: "TN",
    content:
      "Website cực kỳ mượt, đẹp và đúng như những gì tôi kỳ vọng. Đội ngũ hỗ trợ siêu nhanh và chuyên nghiệp!",
    rating: 5,
  },
  {
    name: "Nguyễn Minh Anh",
    role: "Founder TechStart",
    avatar: "MA",
    content:
      "Dự án hoàn thành đúng hẹn, chất lượng vượt mong đợi. SEO tốt, tốc độ tải nhanh. Rất hài lòng!",
    rating: 5,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(true);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
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
    <div>
      <Head>
        <title>Bảng giá dịch vụ thiết kế website | VinhWorks</title>
        <meta
          name="description"
          content="Các gói dịch vụ website chuyên nghiệp: giao diện đẹp, chuẩn SEO, hiệu suất cao. Nhận tư vấn và demo miễn phí."
        />
        <meta
          property="og:title"
          content="Bảng giá dịch vụ thiết kế website | VinhWorks"
        />
        <meta
          property="og:description"
          content="Thiết kế website chuẩn UX/UI, tối ưu Google Core Web Vitals, bảo trì lâu dài. Tư vấn miễn phí!"
        />
        <meta property="og:image" content="/seo-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/pricing" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading-overlay"
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
                Đang tải bảng giá...
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
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Bảng giá dịch vụ
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Chọn gói phù hợp với bạn 💎
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl">
              Lựa chọn giải pháp phù hợp – bạn có thể bắt đầu từ cơ bản hoặc
              thiết kế riêng theo yêu cầu.
              <br />
              <span className="font-medium text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                Tất cả gói đều bao gồm tư vấn miễn phí và bảo hành!
              </span>
            </p>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>50+ Khách hàng hài lòng</span>
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
          </motion.div>

          {/* Enhanced Pricing Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-8 mb-20 md:gap-6 lg:gap-8 md:grid-cols-3"
          >
            {plans.map((plan, idx) => {
              const IconComponent = plan.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`relative flex flex-col justify-between rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 border ${
                    plan.borderColor
                  } ${
                    plan.highlight
                      ? "ring-2 ring-blue-500/50 border-blue-500/50"
                      : ""
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <span
                      className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-medium ${
                        plan.highlight
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                          : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm">
                    <IconComponent className={`w-8 h-8 ${plan.textColor}`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="mb-4 text-2xl font-bold text-center text-white">
                    {plan.name}
                  </h3>

                  {/* Pricing */}
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">
                        {plan.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-400 line-through">
                        {plan.originalPrice}
                      </span>
                      <span className="text-sm font-medium text-green-400">
                        Tiết kiệm 25%
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-center text-gray-300">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="mb-8 space-y-3 text-sm text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle
                          size={16}
                          className="text-green-400 mt-0.5 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/contact">
                      <button
                        className={`w-full px-6 py-4 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r ${plan.color}`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <MessageCircle size={18} />
                          <span>Nhận tư vấn miễn phí</span>
                          <ArrowRight size={16} />
                        </div>
                        <p className="mt-2 text-xs text-gray-200 opacity-80">
                          Phản hồi trong 24h
                        </p>
                      </button>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                💬 Khách hàng nói gì về chúng tôi
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border md:p-8 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex ml-auto text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Quote className="mb-3 text-purple-400" size={24} />
                  <p className="italic leading-relaxed text-gray-300">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
              {faqs.map((faq, i) => (
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
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                🚀 Bạn chưa chắc chọn gói nào?
              </h3>
              <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                Hãy để chúng tôi tư vấn miễn phí và tìm ra giải pháp phù hợp
                nhất cho dự án của bạn
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <button className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl">
                      <MessageCircle size={20} />
                      <span>📩 Gửi yêu cầu tư vấn nhanh chóng</span>
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </motion.div>
              </div>

              {/* Social sharing */}
              <div className="flex justify-center gap-6 mt-8 text-sm text-gray-400">
                <Link
                  href="https://www.facebook.com/sharer/sharer.php?u=https://vinhworks.com/pricing"
                  target="_blank"
                  className="transition-colors hover:text-white"
                >
                  Chia sẻ Facebook
                </Link>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Đặt lịch tư vấn
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
