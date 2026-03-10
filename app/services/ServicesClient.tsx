"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Code2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Star,
  Zap,
  Shield,
  Rocket,
  TrendingUp,
  Smartphone,
  Search,
  LayoutTemplate,
  Palette,
  Layers,
  ShoppingCart,
  X, // ← THÊM
} from "lucide-react";
import { iconMap } from "@/components/admin/SelectIconField";

// --- TYPES ---
interface IService {
  _id: string;
  name: string;
  description: string;
  icon: string;
  status: "Hiển thị" | "Ẩn";
  isNew?: boolean;
}

// --- COLOR THEMES FOR CARDS ---
const cardThemes = [
  {
    gradient: "from-purple-500 via-violet-500 to-purple-600",
    lightBg: "bg-purple-50",
    borderColor: "border-purple-200",
    iconBg: "from-purple-500 to-violet-600",
    textColor: "text-purple-600",
    shadowColor: "shadow-purple-500/30",
    hoverShadow: "group-hover:shadow-purple-500/40",
    spotlightColor: "rgba(139, 92, 246, 0.08)",
  },
  {
    gradient: "from-cyan-500 via-blue-500 to-cyan-600",
    lightBg: "bg-cyan-50",
    borderColor: "border-cyan-200",
    iconBg: "from-cyan-500 to-blue-600",
    textColor: "text-cyan-600",
    shadowColor: "shadow-cyan-500/30",
    hoverShadow: "group-hover:shadow-cyan-500/40",
    spotlightColor: "rgba(6, 182, 212, 0.08)",
  },
  {
    gradient: "from-orange-500 via-pink-500 to-rose-600",
    lightBg: "bg-orange-50",
    borderColor: "border-orange-200",
    iconBg: "from-orange-500 to-pink-600",
    textColor: "text-orange-600",
    shadowColor: "shadow-orange-500/30",
    hoverShadow: "group-hover:shadow-orange-500/40",
    spotlightColor: "rgba(249, 115, 22, 0.08)",
  },
  {
    gradient: "from-emerald-500 via-teal-500 to-green-600",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    iconBg: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600",
    shadowColor: "shadow-emerald-500/30",
    hoverShadow: "group-hover:shadow-emerald-500/40",
    spotlightColor: "rgba(16, 185, 129, 0.08)",
  },
];

// --- DATA ---
const benefits = [
  {
    text: "Tối ưu SEO & Core Web Vitals",
    desc: "Leo top Google bền vững với cấu trúc code chuẩn SEO.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    text: "Responsive mọi thiết bị",
    desc: "Hiển thị hoàn hảo trên Mobile, Tablet và Desktop.",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    text: "Công nghệ mới nhất",
    desc: "Next.js 14, React Server Components, TypeScript.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    text: "Bảo mật đa lớp",
    desc: "Chống tấn công XSS, CSRF, SQL Injection.",
    icon: Shield,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    text: "UI/UX Đẳng cấp",
    desc: "Thiết kế hiện đại, tập trung vào trải nghiệm người dùng.",
    icon: Palette,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
  {
    text: "Hỗ trợ 24/7",
    desc: "Đội ngũ kỹ thuật luôn sẵn sàng khi bạn cần.",
    icon: MessageCircle,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Khám phá",
    desc: "Lắng nghe ý tưởng, phân tích yêu cầu và tư vấn giải pháp tối ưu ngân sách.",
    icon: Search,
    color: "from-blue-400 to-cyan-400",
  },
  {
    step: "02",
    title: "Thiết kế",
    desc: "Phác thảo Wireframe và UI chi tiết. Bạn sẽ thấy sản phẩm trước khi code.",
    icon: LayoutTemplate,
    color: "from-cyan-400 to-teal-400",
  },
  {
    step: "03",
    title: "Phát triển",
    desc: "Lập trình với mã nguồn sạch, bảo mật và hiệu năng cao nhất.",
    icon: Code2,
    color: "from-teal-400 to-emerald-400",
  },
  {
    step: "04",
    title: "Bàn giao",
    desc: "Kiểm thử, deploy lên server và hướng dẫn quản trị chi tiết.",
    icon: Rocket,
    color: "from-emerald-400 to-green-400",
  },
];

const faqData = [
  {
    question: "Chi phí thiết kế website là bao nhiêu?",
    answer:
      "Chi phí tùy thuộc vào tính năng. Gói Landing Page từ 5tr, Website doanh nghiệp từ 10tr, Web App/E-commerce từ 20tr. Liên hệ để có báo giá chính xác nhất.",
  },
  {
    question: "Thời gian hoàn thành dự án?",
    answer:
      "Landing page: 3-5 ngày. Website công ty: 2 tuần. Dự án phức tạp: 4-8 tuần. Chúng tôi cam kết đúng tiến độ hợp đồng.",
  },
  {
    question: "Website có chuẩn SEO không?",
    answer:
      "Chắc chắn! 100% website bàn giao đều đạt điểm xanh Google PageSpeed và tối ưu thẻ meta, sitemap, schema chuẩn SEO.",
  },
  {
    question: "Có bảo hành sau bàn giao không?",
    answer:
      "Có! Bảo hành kỹ thuật 12 tháng miễn phí. Hỗ trợ fix lỗi và hướng dẫn sử dụng trọn đời.",
  },
];

// --- MODAL COMPONENT ---
const ServiceModal = ({
  service,
  theme,
  isOpen,
  onClose,
}: {
  service: IService | null;
  theme: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!service) return null;

  const Icon = iconMap[service.icon] || Layers;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-3xl"
            >
              {/* Top Gradient Bar */}
              <div className={`h-2 bg-gradient-to-r ${theme.gradient}`} />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute z-10 p-2 transition-colors rounded-full top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 text-white rounded-2xl bg-gradient-to-br ${theme.iconBg} shadow-xl ${theme.shadowColor}`}
                >
                  <Icon size={32} className="sm:w-10 sm:h-10" strokeWidth={2} />
                </div>

                {/* NEW Badge */}
                {service.isNew && (
                  <span
                    className={`inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r ${theme.gradient} text-white shadow-lg ${theme.shadowColor}`}
                  >
                    New Service
                  </span>
                )}

                {/* Title */}
                <h3
                  className={`text-2xl sm:text-3xl font-black mb-4 ${theme.textColor}`}
                >
                  {service.name}
                </h3>

                {/* Full Description */}
                <p className="mb-8 text-sm leading-relaxed sm:text-base text-slate-600">
                  {service.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Link href="/contact" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-6 py-3 font-bold text-white transition-all shadow-lg bg-gradient-to-r ${theme.gradient} rounded-xl hover:shadow-xl`}
                    >
                      Tư vấn ngay
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-6 py-3 font-bold transition-all border-2 text-slate-700 border-slate-200 rounded-xl hover:border-slate-300"
                  >
                    Đóng
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- SERVICE CARD COMPONENT ---
const ServiceCard = ({
  service,
  index,
  onOpenModal,
}: {
  service: IService;
  index: number;
  onOpenModal: (service: IService, theme: any) => void;
}) => {
  const Icon = iconMap[service.icon] || Layers;
  const theme = cardThemes[index % cardThemes.length];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const getAnimationVariant = (idx: number) => {
    const variants = [
      {
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
        whileHover: { scale: 1.03, rotateY: 5 },
      },
      {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        whileHover: { x: 5, rotateZ: 2 },
      },
      {
        initial: { opacity: 0, x: 50 },
        whileInView: { opacity: 1, x: 0 },
        whileHover: { x: -5, rotateZ: -2 },
      },
      {
        initial: { opacity: 0, rotateX: -20 },
        whileInView: { opacity: 1, rotateX: 0 },
        whileHover: { rotateX: 5, y: -10 },
      },
    ];
    return variants[idx % 4];
  };

  const animation = getAnimationVariant(index);

  return (
    <motion.div
      initial={animation.initial}
      whileInView={animation.whileInView}
      whileHover={animation.whileHover}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onClick={() => onOpenModal(service, theme)}
      className="relative h-full cursor-pointer group perspective-1000"
    >
      {/* Animated Gradient Border */}
      <div
        className={`absolute -inset-[1px] lg:-inset-[2px] bg-gradient-to-br ${theme.gradient} rounded-lg sm:rounded-xl lg:rounded-[2rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}
      />

      {/* Main Card */}
      <div
        className={`relative h-full bg-white rounded-lg sm:rounded-xl lg:rounded-[2rem] p-3 sm:p-6 lg:p-8 border ${theme.borderColor} ${theme.shadowColor} shadow-sm sm:shadow-md lg:shadow-lg transition-all duration-500 ${theme.hoverShadow} hover:shadow-lg sm:hover:shadow-xl lg:hover:shadow-2xl flex flex-col overflow-hidden`}
      >
        {/* Spotlight Effect (Desktop only) */}
        <motion.div
          className="absolute hidden transition duration-300 opacity-0 pointer-events-none lg:block -inset-px group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                ${theme.spotlightColor},
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-3 sm:mb-5 lg:mb-6 text-white rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br ${theme.iconBg} shadow-md sm:shadow-lg lg:shadow-xl ${theme.shadowColor}`}
          >
            <Icon
              size={20}
              className="sm:w-7 sm:h-7 lg:w-8 lg:h-8"
              strokeWidth={2}
            />
          </motion.div>

          {/* Title */}
          <h3
            className={`mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-lg lg:text-2xl font-black transition-all duration-300 text-slate-900 group-hover:${theme.textColor} leading-tight line-clamp-2`}
          >
            {service.name}
          </h3>

          {/* Description - TRUNCATED */}
          <p className="flex-grow mb-3 sm:mb-5 lg:mb-6 text-[10px] sm:text-sm lg:text-sm font-medium leading-snug sm:leading-relaxed text-slate-600 line-clamp-2">
            {service.description}
          </p>

          {/* NEW Badge */}
          {service.isNew && (
            <div className="absolute top-3 sm:top-5 lg:top-6 right-3 sm:right-5 lg:right-6">
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: index * 0.1 + 0.3 }}
                className={`inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-[7px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-wider bg-gradient-to-r ${theme.gradient} text-white shadow-sm sm:shadow-md lg:shadow-lg ${theme.shadowColor}`}
              >
                New
              </motion.span>
            </div>
          )}

          {/* Click Hint */}
          <div
            className={`pt-3 sm:pt-5 lg:pt-6 mt-auto border-t ${theme.borderColor}`}
          >
            <div
              className={`inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm lg:text-sm font-bold transition-all ${theme.textColor}`}
            >
              <span>Xem chi tiết</span>
              <ArrowRight
                size={10}
                className="transition-transform sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 lg:group-hover:translate-x-2"
              />
            </div>
          </div>
        </div>

        {/* Decorative Corner */}
        <div
          className={`absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 lg:w-32 lg:h-32 bg-gradient-to-br ${theme.gradient} opacity-[0.03] rounded-bl-[40px] sm:rounded-bl-[70px] lg:rounded-bl-[100px] transition-opacity group-hover:opacity-10`}
        />
      </div>
    </motion.div>
  );
};

// --- MAIN CLIENT COMPONENT ---
export default function ServicesClient() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Modal State
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (service: IService, theme: any) => {
    setSelectedService(service);
    setSelectedTheme(theme);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    setMounted(true);
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => {
        console.error("Error:", err);
        setServices([
          {
            _id: "1",
            name: "Kết nối backend & API",
            description:
              "Tích hợp API, CMS, và xử lý dữ liệu hiệu quả từ backend hoặc dịch vụ bên thứ ba.",
            icon: "Code2",
            status: "Hiển thị",
            isNew: true,
          },
          {
            _id: "2",
            name: "Tối ưu SEO & Core Web Vitals",
            description:
              "Website chuẩn SEO, tốc độ cao, điểm hiệu suất vượt 90+ Lighthouse.",
            icon: "TrendingUp",
            status: "Hiển thị",
          },
          {
            _id: "3",
            name: "UI/UX Responsive hiện đại",
            description:
              "Tối ưu giao diện trên mọi thiết bị với trải nghiệm người dùng mượt mà và đẹp mắt.",
            icon: "Smartphone",
            status: "Hiển thị",
          },
          {
            _id: "4",
            name: "Thiết kế Website theo yêu cầu",
            description:
              "Xây dựng website từ A-Z theo ý tưởng của bạn với công nghệ mới nhất.",
            icon: "LayoutTemplate",
            status: "Hiển thị",
            isNew: true,
          },
        ] as any);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-violet-200 selection:text-violet-900">
        {/* ================= HERO SECTION (MOBILE OPTIMIZED) ================= */}
        <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange-300/20 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="container relative z-10 max-w-5xl px-4 mx-auto text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 text-xs sm:text-sm font-bold border border-white rounded-full shadow-sm bg-white/80 backdrop-blur-md text-orange-600 ring-1 ring-orange-100">
                <Sparkles size={14} className="fill-orange-500 sm:w-4 sm:h-4" />
                <span>Dịch vụ chất lượng cao</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 sm:mb-8 leading-[1.1]">
                Giải pháp số <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
                  Đột phá & Hiệu quả
                </span>
              </h1>

              <p className="max-w-3xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-slate-600 px-4 sm:px-0">
                Chúng tôi không chỉ tạo ra website, chúng tôi kiến tạo những{" "}
                <span className="font-bold text-slate-900">
                  cỗ máy tăng trưởng
                </span>{" "}
                doanh thu cho doanh nghiệp của bạn.
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                <Link href="#services" className="flex-1 sm:flex-none">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white transition-all shadow-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-orange-500/20 hover:shadow-orange-500/40"
                  >
                    <span className="whitespace-nowrap">Khám phá</span>
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.button>
                </Link>

                <Link href="/contact" className="flex-1 sm:flex-none">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold transition-all bg-white border-2 shadow-sm text-slate-700 border-slate-100 rounded-xl sm:rounded-2xl hover:border-purple-200 hover:text-purple-600 whitespace-nowrap"
                  >
                    Nhận báo giá
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SERVICES GRID (2x2 MOBILE) ================= */}
        <section id="services" className="relative py-8">
          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 text-3xl font-black md:text-5xl text-slate-900"
              >
                Dịch vụ cung cấp
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1.5 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 rounded-full mx-auto"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 rounded-full border-violet-500 border-t-transparent animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                {services.map((service, idx) => (
                  <ServiceCard
                    key={service._id || idx}
                    service={service}
                    index={idx}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= BENEFITS SECTION (MOBILE OPTIMIZED) ================= */}
        <section className="relative py-8 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-2/3 h-full -skew-x-12 pointer-events-none bg-slate-50/50 translate-x-1/4" />

          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <div className="flex flex-col gap-12 lg:gap-16 lg:flex-row">
              <div className="lg:w-1/2">
                <span className="block mb-2 text-sm font-bold tracking-wider uppercase text-violet-600">
                  Tại sao chọn chúng tôi?
                </span>
                <h2 className="mb-6 sm:mb-8 text-3xl sm:text-4xl font-black leading-tight text-slate-900">
                  Mang lại giá trị thực <br /> cho khoản đầu tư của bạn.
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border ${benefit.bg} ${benefit.border} hover:shadow-md transition-shadow cursor-default`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${benefit.color} bg-white flex items-center justify-center mb-2 sm:mb-3 shadow-sm`}
                      >
                        <benefit.icon size={18} className="sm:w-5 sm:h-5" />
                      </div>
                      <h4 className="mb-1 text-sm sm:text-base font-bold text-slate-900">
                        {benefit.text}
                      </h4>
                      <p className="text-[10px] sm:text-xs font-medium leading-relaxed text-slate-500">
                        {benefit.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center lg:w-1/2">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-[3rem] rotate-6 blur-lg opacity-30" />
                  <div className="relative bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 shadow-2xl border border-slate-100">
                    <div className="space-y-8 sm:space-y-10 text-center divide-y divide-slate-100">
                      <div className="pt-4">
                        <h3 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                          99%
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-400">
                          Khách hàng hài lòng
                        </p>
                      </div>
                      <div className="pt-8 sm:pt-10">
                        <h3 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                          24/7
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-400">
                          Hỗ trợ kỹ thuật
                        </p>
                      </div>
                      <div className="pt-8 sm:pt-10 pb-4">
                        <div className="flex justify-center gap-1 mb-3 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="fill-current w-5 h-5 sm:w-6 sm:h-6"
                              size={20}
                            />
                          ))}
                        </div>
                        <p className="text-sm sm:text-base italic font-medium text-slate-600">
                          "Chất lượng vượt xa mong đợi!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROCESS SECTION (MOBILE OPTIMIZED) ================= */}
        <section className="relative py-8 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />

          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 sm:mb-20 text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-black md:text-5xl text-slate-900">
                Quy trình tinh gọn
              </h2>
              <p className="mt-4 text-base sm:text-lg font-medium text-slate-500">
                4 Bước để biến ý tưởng thành hiện thực
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {processSteps.map((step, idx) => {
                const themes = [
                  {
                    gradient: "from-blue-500 to-cyan-500",
                    bgLight: "bg-blue-50",
                    borderColor: "border-blue-200",
                    textColor: "text-blue-600",
                    shadowColor: "shadow-blue-500/30",
                    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
                    numberColor: "text-blue-100",
                  },
                  {
                    gradient: "from-cyan-500 to-teal-500",
                    bgLight: "bg-cyan-50",
                    borderColor: "border-cyan-200",
                    textColor: "text-cyan-600",
                    shadowColor: "shadow-cyan-500/30",
                    iconBg: "bg-gradient-to-br from-cyan-500 to-teal-500",
                    numberColor: "text-cyan-100",
                  },
                  {
                    gradient: "from-teal-500 to-emerald-500",
                    bgLight: "bg-teal-50",
                    borderColor: "border-teal-200",
                    textColor: "text-teal-600",
                    shadowColor: "shadow-teal-500/30",
                    iconBg: "bg-gradient-to-br from-teal-500 to-emerald-500",
                    numberColor: "text-teal-100",
                  },
                  {
                    gradient: "from-emerald-500 to-green-500",
                    bgLight: "bg-emerald-50",
                    borderColor: "border-emerald-200",
                    textColor: "text-emerald-600",
                    shadowColor: "shadow-emerald-500/30",
                    iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
                    numberColor: "text-emerald-100",
                  },
                ];

                const theme = themes[idx];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    className="relative group"
                  >
                    <div
                      className={`absolute font-black select-none -top-4 sm:-top-8 -left-2 text-[80px] sm:text-[120px] leading-none ${theme.numberColor} group-hover:text-opacity-30 transition-all duration-500 opacity-20`}
                    >
                      {step.step}
                    </div>

                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`relative z-10 p-6 sm:p-8 bg-white border-2 ${theme.borderColor} rounded-2xl sm:rounded-3xl shadow-lg ${theme.shadowColor} hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden`}
                    >
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r ${theme.gradient}`}
                      />

                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-xl ${theme.shadowColor} group-hover:shadow-2xl transition-shadow duration-300`}
                      >
                        <step.icon
                          size={28}
                          className="text-white sm:w-9 sm:h-9"
                          strokeWidth={2.5}
                        />

                        <div
                          className={`absolute -inset-2 rounded-xl sm:rounded-2xl bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500`}
                        />
                      </motion.div>

                      <h3
                        className={`mb-3 sm:mb-4 text-xl sm:text-2xl font-black transition-colors duration-300 text-slate-900 group-hover:${theme.textColor}`}
                      >
                        {step.title}
                      </h3>

                      <div className="relative flex-grow">
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${theme.gradient} rounded-full transition-all duration-500 group-hover:w-1.5`}
                        />
                        <p className="pl-4 sm:pl-5 text-xs sm:text-sm font-medium leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors">
                          {step.desc}
                        </p>
                      </div>

                      <div
                        className={`absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tl ${theme.gradient} opacity-[0.03] rounded-tl-[80px] sm:rounded-tl-[100px] group-hover:opacity-[0.08] transition-opacity duration-500`}
                      />

                      {idx < processSteps.length - 1 && (
                        <div className="absolute z-0 hidden transform -translate-y-1/2 lg:block top-1/2 -right-4 w-8">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{
                              delay: idx * 0.15 + 0.3,
                              duration: 0.4,
                            }}
                            className={`h-0.5 bg-gradient-to-r ${theme.gradient} opacity-30`}
                          />
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{
                              delay: idx * 0.15 + 0.5,
                              duration: 0.4,
                            }}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
                          />
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-12 sm:mt-16 text-center"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white transition-all shadow-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-xl sm:rounded-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
                >
                  <span>Bắt đầu dự án ngay</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform sm:w-5 sm:h-5 group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="py-8">
          <div className="container max-w-3xl px-6 mx-auto">
            <h2 className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-black text-center text-slate-900">
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqData.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  className="overflow-hidden transition-colors bg-white border border-slate-200 rounded-xl sm:rounded-2xl hover:border-violet-200"
                >
                  <button
                    onClick={() =>
                      setFaqOpenIndex(faqOpenIndex === i ? null : i)
                    }
                    className="flex items-center justify-between w-full p-4 sm:p-6 text-left"
                  >
                    <span
                      className={`font-bold text-sm sm:text-lg ${
                        faqOpenIndex === i
                          ? "text-violet-600"
                          : "text-slate-700"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                        faqOpenIndex === i
                          ? "bg-violet-100 text-violet-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ArrowRight
                        size={14}
                        className={`sm:w-4 sm:h-4 transition-transform duration-300 ${
                          faqOpenIndex === i ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {faqOpenIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6 mt-2 text-xs sm:text-base leading-relaxed border-t text-slate-600 border-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative py-8 overflow-hidden">
          <div className="container relative z-10 max-w-5xl px-6 mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-slate-900">
                  Sẵn sàng{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    bứt phá
                  </span>{" "}
                  doanh thu?
                </h2>
                <p className="max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-xl font-medium text-slate-600">
                  Đừng để website lỗi thời kìm hãm sự phát triển của bạn. Hãy để
                  chúng tôi giúp bạn xây dựng đế chế số ngay hôm nay.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white transition-all shadow-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl sm:rounded-2xl shadow-violet-500/30 hover:shadow-violet-500/50"
                    >
                      Liên hệ tư vấn miễn phí
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <ServiceModal
        service={selectedService}
        theme={selectedTheme}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
