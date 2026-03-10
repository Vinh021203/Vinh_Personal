"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Rocket,
  Building2,
  Star,
  Zap,
  ShieldCheck,
  Crown,
  ArrowRight,
  MessageCircle,
  Users,
  Clock,
  HelpCircle,
  X,
  Phone,
  Send,
} from "lucide-react";

// --- DATA ---
const plans = [
  {
    id: "basic",
    name: "Cơ bản",
    icon: Rocket,
    price: "5.000.000",
    unit: "đ / dự án",
    desc: "Khởi đầu hoàn hảo cho cá nhân hoặc startup nhỏ.",
    features: [
      "Giao diện Landing Page chuẩn UX/UI",
      "Responsive 100% Mobile/Desktop",
      "Tối ưu SEO cơ bản (On-page)",
      "Tốc độ tải trang < 3s",
      "Miễn phí SSL & Hosting 1 năm",
      "Hỗ trợ kỹ thuật 7 ngày sau bàn giao",
    ],
    notIncluded: [
      "CMS quản trị nội dung",
      "Đa ngôn ngữ",
      "Tích hợp thanh toán",
    ],
    color: "text-blue-600",
    bg: "bg-blue-50",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    popular: false,
  },
  {
    id: "business",
    name: "Doanh nghiệp",
    icon: Building2,
    price: "15.000.000",
    unit: "đ / dự án",
    desc: "Giải pháp toàn diện để mở rộng quy mô kinh doanh.",
    features: [
      "Tất cả tính năng gói Cơ bản",
      "Website đa trang (Giới thiệu, Dịch vụ...)",
      "CMS quản trị nội dung dễ dùng",
      "Tối ưu SEO nâng cao & Analytics",
      "Tích hợp Chat & Social Media",
      "Bảo hành kỹ thuật 12 tháng",
    ],
    notIncluded: ["Tích hợp thanh toán online"],
    color: "text-purple-600",
    bg: "bg-purple-50",
    buttonColor: "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg",
    popular: true,
  },
  {
    id: "custom",
    name: "Cao cấp",
    icon: Crown,
    price: "Liên hệ",
    unit: "",
    desc: "Hệ thống phức tạp, tính năng riêng biệt theo yêu cầu.",
    features: [
      "Thiết kế độc quyền (Figma)",
      "E-commerce / Web App phức tạp",
      "Tích hợp API & Thanh toán",
      "Đa ngôn ngữ & Localization",
      "Hiệu ứng Animation cao cấp",
      "Hỗ trợ ưu tiên 24/7 trọn đời",
    ],
    notIncluded: [],
    color: "text-orange-500",
    bg: "bg-orange-50",
    buttonColor:
      "bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-orange-200 hover:shadow-lg",
    popular: false,
  },
];

const faqs = [
  {
    question: "Chi phí trên website có phải là trọn gói không?",
    answer:
      "Đúng vậy! Báo giá trên là trọn gói cho việc thiết kế và lập trình. Tuy nhiên, chưa bao gồm chi phí mua tên miền (Domain) và thuê máy chủ (Hosting/VPS) hàng năm (trừ khi có khuyến mãi đi kèm).",
  },
  {
    question: "Tôi có được xem demo trước khi thanh toán không?",
    answer:
      "Quy trình của chúng tôi bao gồm bước thiết kế giao diện (UI Design) trước. Bạn sẽ được duyệt bản thiết kế hình ảnh chi tiết. Sau khi chốt thiết kế, chúng tôi mới tiến hành lập trình và thanh toán theo tiến độ.",
  },
  {
    question: "Thời gian bảo hành là bao lâu?",
    answer:
      "Chúng tôi cam kết bảo hành kỹ thuật trọn đời cho các lỗi phát sinh từ mã nguồn do chúng tôi viết. Ngoài ra, hỗ trợ hướng dẫn sử dụng và update nội dung nhỏ miễn phí trong 12 tháng đầu.",
  },
  {
    question: "Nếu tôi muốn nâng cấp tính năng sau này thì sao?",
    answer:
      "Hoàn toàn được! Mã nguồn chúng tôi viết theo chuẩn Modular, rất dễ dàng mở rộng. Bạn chỉ cần liên hệ, chúng tôi sẽ báo giá phần nâng cấp mà không ảnh hưởng đến hệ thống hiện tại.",
  },
];

// --- COMPONENTS ---
const PricingCard = ({ plan }: { plan: (typeof plans)[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`relative flex flex-col h-full p-6 sm:p-8 bg-white border rounded-[2rem] transition-all duration-300 ${
        plan.popular
          ? "border-purple-200 shadow-2xl shadow-purple-500/10 z-10"
          : "border-slate-100 shadow-lg hover:shadow-xl"
      }`}
    >
      {/* Badge Phổ biến nhất */}
      {plan.popular && (
        <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2">
          <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg whitespace-nowrap">
            <Star size={12} className="fill-white" /> Phổ biến nhất
          </span>
        </div>
      )}

      <div className="mb-5">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-4 sm:mb-6 ${plan.bg} ${plan.color}`}
        >
          <plan.icon size={24} />
        </div>
        <h3 className="mb-1.5 text-xl sm:text-2xl font-black text-slate-900">
          {plan.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed min-h-[36px]">
          {plan.desc}
        </p>
      </div>

      <div className="pb-5 mb-5 border-b border-slate-100">
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className={`text-3xl sm:text-4xl font-black ${plan.color}`}>
            {plan.price}
          </span>
          <span className="text-sm font-medium text-slate-400">
            {plan.unit}
          </span>
        </div>
      </div>

      <ul className="flex-grow mb-6 space-y-3">
        {plan.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2.5 text-sm text-slate-600"
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.color}`} />
            <span>{feature}</span>
          </li>
        ))}
        {plan.notIncluded?.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2.5 text-sm text-slate-400 opacity-60"
          >
            <X className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="line-through">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href="/contact" className="mt-auto">
        <button
          className={`w-full py-3.5 rounded-xl text-white text-sm font-bold shadow-md transition-all hover:shadow-xl active:scale-95 ${plan.buttonColor}`}
        >
          Chọn gói này
        </button>
      </Link>
    </motion.div>
  );
};

const FAQItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-slate-200 rounded-2xl hover:border-purple-200">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-5 sm:p-6 text-left focus:outline-none gap-3"
      >
        <span
          className={`font-bold text-base sm:text-lg transition-colors ${
            isOpen ? "text-purple-600" : "text-slate-700"
          }`}
        >
          {item.question}
        </span>
        <div
          className={`p-1.5 rounded-full shrink-0 transition-all duration-300 ${
            isOpen ? "bg-purple-100" : "bg-slate-100"
          }`}
        >
          <ArrowRight
            size={16}
            className={`transition-transform duration-300 ${
              isOpen ? "text-purple-600 rotate-90" : "text-slate-500 rotate-0"
            }`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 sm:px-6 pt-0 pb-5 sm:pb-6">
              <div className="w-full h-px mb-4 bg-slate-100" />
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN CLIENT COMPONENT ---
export default function PricingClient() {
  const [mounted, setMounted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Card width = 82vw + gap 16px
  const CARD_WIDTH =
    typeof window !== "undefined" ? 0.82 * window.innerWidth + 16 : 300;
  const maxIndex = plans.length - 1;

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-purple-100 selection:text-purple-900">
        {/* ================= HEADER ================= */}
        <section className="relative pt-10 pb-10 overflow-hidden lg:pt-8 lg:pb-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold text-purple-600 bg-white border border-purple-100 rounded-full shadow-sm">
                <Zap size={14} className="fill-purple-500" />
                <span>Đầu tư thông minh</span>
              </div>

              <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-4 sm:mb-6 leading-[1.1]">
                Bảng giá <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">
                  Minh bạch & Linh hoạt
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-xl font-medium leading-relaxed text-slate-600">
                Chọn gói dịch vụ phù hợp với nhu cầu của bạn.{" "}
                <span className="block mt-1 sm:inline">
                  Không chi phí ẩn, cam kết chất lượng đầu ra.
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= PRICING CARDS ================= */}
        <section className="py-8 pb-8">
          <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
            {/* ── MOBILE: snap slider ── */}
            <div className="md:hidden">
              {/* overflow-visible để badge "Phổ biến nhất" không bị clip */}
              <div className="relative overflow-visible">
                <motion.div
                  className="flex gap-4 pl-4 cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{
                    left: -(maxIndex * CARD_WIDTH),
                    right: 0,
                  }}
                  dragElastic={0.08}
                  dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                  animate={{ x: -(activeIndex * CARD_WIDTH) }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onDragEnd={(_, info) => {
                    const threshold = CARD_WIDTH * 0.3;
                    if (info.offset.x < -threshold) {
                      setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
                    } else if (info.offset.x > threshold) {
                      setActiveIndex((prev) => Math.max(prev - 1, 0));
                    }
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  {plans.map((plan, idx) => (
                    <div
                      key={plan.id}
                      className="min-w-[82vw] max-w-[82vw] pt-5"
                      // pt-5 để badge "Phổ biến nhất" có chỗ hiển thị
                    >
                      <PricingCard plan={plan} />
                    </div>
                  ))}
                </motion.div>

                {/* Dot indicator — tap để nhảy card */}
                <div className="flex justify-center gap-2 mt-5">
                  {plans.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-6 bg-orange-500"
                          : "w-1.5 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <motion.p
                  className="mt-2 text-xs font-medium text-center text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ← Vuốt để xem thêm →
                </motion.p>
              </div>
            </div>

            {/* ── DESKTOP: grid 3 cols ── */}
            <div className="hidden md:grid items-start grid-cols-3 gap-8 lg:gap-12 pt-6">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={plan.popular ? "mt-[-1.5rem]" : ""}
                >
                  <PricingCard plan={plan} />
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 pt-8 border-t border-slate-200"
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-8 md:gap-16 transition-all duration-500 grayscale opacity-70 hover:grayscale-0 hover:opacity-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                  <div className="p-2 rounded-xl bg-green-50 shrink-0">
                    <ShieldCheck size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Bảo hành trọn đời
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Cho lỗi kỹ thuật
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                  <div className="p-2 rounded-xl bg-blue-50 shrink-0">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Đúng tiến độ
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Cam kết trong hợp đồng
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                  <div className="p-2 rounded-xl bg-purple-50 shrink-0">
                    <Users size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Hỗ trợ 1:1
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Qua Zalo/Telegram
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative py-8 overflow-hidden bg-white">
          <div className="absolute top-0 left-0 w-full h-full origin-top-left transform skew-y-3 bg-slate-50 -z-10" />

          <div className="container relative z-10 max-w-3xl px-4 sm:px-6 mx-auto">
            <div className="mb-10 sm:mb-16 text-center">
              <div className="inline-flex p-3 mb-6 text-purple-600 bg-purple-100 rounded-2xl">
                <HelpCircle size={28} />
              </div>
              <h2 className="mb-3 text-3xl sm:text-4xl font-black text-slate-900">
                Câu hỏi thường gặp
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Giải đáp những thắc mắc phổ biến nhất của khách hàng
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  item={faq}
                  isOpen={openFaqIndex === idx}
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA BOTTOM ================= */}
        <section className="relative py-8 overflow-hidden text-center">
          <div className="container relative z-10 px-4 sm:px-6 mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 relative overflow-hidden shadow-xl border border-slate-100">
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
                  Chưa tìm thấy{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">
                    gói phù hợp?
                  </span>
                </h2>

                <p className="mb-8 sm:mb-10 text-base sm:text-lg font-medium leading-relaxed text-slate-600">
                  Đừng lo lắng! Chúng tôi sẵn sàng thiết kế một giải pháp riêng
                  biệt, "may đo" chính xác theo nhu cầu và ngân sách của bạn.
                </p>

                {/* ✅ flex-row luôn — 2 nút ngang cả mobile lẫn desktop */}
                <div className="flex flex-row justify-center gap-3 sm:gap-4">
                  <Link href="/contact" className="flex-1 sm:flex-none">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 px-5 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-orange-500/20 hover:shadow-orange-500/40 active:scale-95"
                    >
                      <MessageCircle size={16} />
                      <span className="truncate">Tư vấn ngay</span>
                    </motion.button>
                  </Link>

                  <Link href="tel:0971386588" className="flex-1 sm:flex-none">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 px-5 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold transition-all bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-purple-200 hover:text-purple-600 active:scale-95"
                    >
                      <span className="relative flex w-3 h-3 shrink-0">
                        <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
                        <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
                      </span>
                      <span className="truncate">Gọi hotline</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
