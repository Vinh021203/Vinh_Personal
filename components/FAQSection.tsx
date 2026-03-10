"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    id: "cost",
    question: "Chi phí thiết kế website là bao nhiêu?",
    answer:
      "Chi phí phụ thuộc vào tính năng và độ phức tạp. Tôi cung cấp các gói linh hoạt từ cơ bản (Landing Page ~5tr) đến nâng cao (E-commerce/Web App ~15tr+). Hãy liên hệ để nhận báo giá chi tiết!",
  },
  {
    id: "time",
    question: "Thời gian hoàn thành dự án bao lâu?",
    answer:
      "Trung bình từ 2-4 tuần cho website doanh nghiệp và 6-8 tuần cho các dự án phức tạp hơn. Tôi cam kết đúng tiến độ đã thỏa thuận trong hợp đồng.",
  },
  {
    id: "seo",
    question: "Website có chuẩn SEO và chạy tốt trên điện thoại không?",
    answer:
      "Chắc chắn rồi! 100% sản phẩm tôi làm đều Responsive (thích ứng mọi thiết bị) và tối ưu SEO On-page (tốc độ, thẻ meta, sitemap) ngay từ dòng code đầu tiên.",
  },
  {
    id: "support",
    question: "Sau khi bàn giao tôi có được hỗ trợ không?",
    answer:
      "Có! Tôi cam kết bảo hành kỹ thuật 12 tháng miễn phí và hỗ trợ hướng dẫn sử dụng trọn đời. Nếu có lỗi phát sinh từ mã nguồn, tôi sẽ fix ngay lập tức.",
  },
  {
    id: "tech",
    question: "Bạn sử dụng công nghệ gì để làm web?",
    answer:
      "Tôi chuyên sử dụng Next.js (React), TypeScript và Tailwind CSS - bộ công nghệ hiện đại nhất hiện nay, giúp web chạy siêu nhanh, bảo mật và dễ nâng cấp.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-10 overflow-hidden md:py-16 lg:py-8 bg-slate-50">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] mix-blend-multiply"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container relative z-10 max-w-4xl px-6 mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold border rounded-full md:px-4 md:py-1.5 bg-white border-blue-100 shadow-sm md:text-sm text-blue-600"
          >
            <HelpCircle size={14} className="md:size-4" />
            <span>Hỗ trợ khách hàng</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="mb-3 text-3xl font-black tracking-tight md:mb-4 text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Câu hỏi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              thường gặp
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-600"
          >
            Tất cả thông tin bạn cần biết trước khi bắt đầu dự án
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                {/* Animated Gradient Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-sm"
                  animate={{
                    opacity: isOpen ? 0.3 : isHovered ? 0.2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  animate={{
                    scale: isOpen ? 1.02 : 1,
                    y: isOpen ? -4 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                    isOpen
                      ? "shadow-xl bg-white ring-2 ring-blue-100"
                      : "bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Top Gradient Accent */}
                  {isOpen && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    />
                  )}

                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex items-center justify-between w-full p-5 text-left focus:outline-none md:p-6 group"
                  >
                    <div className="flex items-start gap-3 flex-1 pr-4">
                      {/* Question Number Badge */}
                      <motion.div
                        animate={{
                          scale: isOpen ? 1.1 : 1,
                          rotate: isOpen ? 360 : 0,
                        }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                          isOpen
                            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                        }`}
                      >
                        {idx + 1}
                      </motion.div>

                      {/* Question Text */}
                      <span
                        className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                          isOpen
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                            : "text-slate-800 group-hover:text-slate-900"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Toggle Icon */}
                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className={`flex-shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg"
                          : "bg-slate-100 group-hover:bg-slate-200"
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={20} className="text-white" />
                      ) : (
                        <Plus
                          size={20}
                          className={`transition-colors ${
                            isHovered ? "text-slate-700" : "text-slate-500"
                          }`}
                        />
                      )}
                    </motion.div>
                  </button>

                  {/* Answer Section */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6">
                          {/* Divider with gradient */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="w-full h-px mb-4 bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                          />

                          {/* Answer Text */}
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="pl-11"
                          >
                            <p className="text-sm leading-relaxed md:text-base text-slate-600">
                              {faq.answer}
                            </p>

                            {/* Sparkle Icon for active item */}
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3, type: "spring" }}
                              className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-blue-600"
                            >
                              <Sparkles size={14} className="fill-blue-200" />
                              <span>Thông tin hữu ích</span>
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Shine Effect on Hover */}
                  {isHovered && !isOpen && (
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center md:mt-12"
        >
          <div className="inline-flex flex-col items-center gap-3 p-6 bg-white border shadow-sm md:flex-row md:p-8 rounded-2xl border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <HelpCircle size={24} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold md:text-lg text-slate-900">
                  Vẫn còn thắc mắc?
                </h3>
                <p className="text-xs md:text-sm text-slate-500">
                  Liên hệ trực tiếp để được tư vấn chi tiết
                </p>
              </div>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-sm font-bold text-white transition-all rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg whitespace-nowrap"
            >
              Đặt câu hỏi ngay
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
