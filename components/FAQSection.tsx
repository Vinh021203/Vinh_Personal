"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Mặc định mở câu đầu tiên

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="container relative z-10 max-w-4xl px-6 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white border border-blue-100 shadow-sm text-sm font-bold text-blue-600"
          >
            <HelpCircle size={16} />
            <span>Hỗ trợ khách hàng</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
          >
            Câu hỏi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              thường gặp
            </span>
          </motion.h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "shadow-lg bg-white"
                    : "hover:bg-white hover:shadow-md bg-white/60"
                }`}
              >
                {/* Gradient Border Animation */}
                <div
                  className={`absolute inset-0 p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 pointer-events-none ${
                    isOpen ? "opacity-100" : "group-hover:opacity-50"
                  }`}
                >
                  <div className="h-full w-full bg-white rounded-[14px]" />{" "}
                  {/* Masking inner */}
                </div>

                {/* Content Container (nằm đè lên border mask) */}
                <div className="relative z-10 bg-transparent rounded-2xl">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                  >
                    <span
                      className={`text-lg font-bold transition-colors duration-300 ${
                        isOpen
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Icon Button */}
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 rotate-180"
                          : "bg-slate-100 group-hover:bg-slate-200"
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={20} className="text-white" />
                      ) : (
                        <Plus
                          size={20}
                          className="text-slate-500 group-hover:text-slate-700"
                        />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pt-0 pb-6">
                          <div className="w-full h-px mb-4 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                          <p className="text-base leading-relaxed text-slate-600">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
