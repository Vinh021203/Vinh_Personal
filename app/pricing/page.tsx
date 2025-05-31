'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Quote,
  Rocket,
  Building2,
  Settings2,
  HelpCircle,
} from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

const plans = [
  {
    name: 'Cơ bản',
    icon: Rocket,
    price: 'Liên hệ báo giá',
    badge: '🔥 Ưu đãi',
    description: 'Dành cho cá nhân hoặc startup nhỏ cần một trang giới thiệu chuyên nghiệp.',
    features: [
      'Giao diện 1 trang chuẩn UX',
      'Responsive UI mọi thiết bị',
      'SEO cơ bản tối ưu Google',
      'Hỗ trợ kỹ thuật 7 ngày đầu',
    ],
  },
  {
    name: 'Doanh nghiệp',
    icon: Building2,
    price: 'Liên hệ báo giá',
    description: 'Phù hợp cho doanh nghiệp muốn mở rộng thương hiệu và tiếp cận khách hàng hiệu quả.',
    features: [
      'Trang giới thiệu + dịch vụ',
      'Form liên hệ và CTA hấp dẫn',
      'SEO nâng cao + tốc độ tải nhanh',
      'Hỗ trợ kỹ thuật 1 tháng',
    ],
    highlight: true,
  },
  {
    name: 'Tùy chỉnh',
    icon: Settings2,
    price: 'Theo yêu cầu riêng',
    description: 'Thiết kế linh hoạt theo mục tiêu kinh doanh và tính năng đặc thù.',
    features: [
      'Tư vấn demo giao diện chi tiết',
      'Tích hợp API, CMS, nâng cao',
      'Bảo trì và mở rộng lâu dài',
    ],
  },
];

const faqs = [
  {
    question: 'Chi phí thiết kế website là bao nhiêu?',
    answer: 'Giá phụ thuộc vào mức độ tùy chỉnh và tính năng. Hãy liên hệ để được tư vấn miễn phí và nhận báo giá nhanh chóng.',
  },
  {
    question: 'Mất bao lâu để hoàn thành?',
    answer: 'Thông thường từ 5 đến 10 ngày làm việc cho các gói cơ bản. Dự án tùy chỉnh có thể cần thêm thời gian.',
  },
  {
    question: 'Có bảo hành và hỗ trợ sau khi bàn giao không?',
    answer: 'Có, mỗi gói đều có thời gian hỗ trợ kỹ thuật và bảo trì rõ ràng sau khi hoàn thiện.',
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Bảng giá dịch vụ thiết kế website | VinhWorks</title>
        <meta name="description" content="Các gói dịch vụ website chuyên nghiệp: giao diện đẹp, chuẩn SEO, hiệu suất cao. Nhận tư vấn và demo miễn phí." />
        <meta property="og:title" content="Bảng giá dịch vụ thiết kế website | VinhWorks" />
        <meta property="og:description" content="Thiết kế website chuẩn UX/UI, tối ưu Google Core Web Vitals, bảo trì lâu dài. Tư vấn miễn phí!" />
        <meta property="og:image" content="/seo-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/pricing" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <motion.section
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative min-h-screen px-6 overflow-hidden text-white py-28 bg-gradient-to-b from-[#0d1117] via-[#111827] to-[#0d1117]"
      >
        {/* Hiệu ứng mờ và spinner overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-teal-400 rounded-full border-t-transparent animate-spin" />
                <p className="mt-4 text-sm text-teal-300 animate-pulse">Đang tải nội dung...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`transition-all duration-500 ${loading ? 'blur-sm pointer-events-none select-none opacity-30' : 'opacity-100'}`}>
          <div className="absolute w-72 h-72 bg-pink-500/20 blur-[100px] rounded-full top-10 -left-20 animate-pulse -z-10" />
          <div className="absolute w-72 h-72 bg-teal-500/20 blur-[100px] rounded-full bottom-0 right-10 animate-ping -z-10" />

          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Bảng giá thiết kế website
            </motion.h1>
            <p className="max-w-2xl mx-auto mt-4 text-gray-400">
              Lựa chọn giải pháp phù hợp – bạn có thể bắt đầu từ cơ bản hoặc thiết kế riêng theo yêu cầu.
            </p>

            <div className="grid gap-8 mt-20 md:grid-cols-3">
              {plans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all shadow-lg hover:shadow-teal-400/20 hover:scale-[1.03] backdrop-blur-lg bg-gradient-to-br from-gray-800/80 to-gray-900/80 ${plan.highlight ? 'border border-teal-400 ring-2 ring-teal-400/50' : 'border border-gray-700'}`}
                >
                  {plan.highlight && (
                    <span className="absolute px-2 py-1 text-xs font-semibold text-white bg-teal-500 rounded-full top-3 right-3">Phổ biến</span>
                  )}
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-teal-300 rounded-full bg-teal-600/20">
                    <plan.icon size={22} />
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-white">{plan.name}
                    {plan.badge && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-pink-500/10 text-pink-400 rounded-full">{plan.badge}</span>
                    )}
                  </h3>
                  <p className="mb-2 text-2xl font-semibold text-teal-300">{plan.price}</p>
                  <p className="mb-4 text-sm text-gray-400">{plan.description}</p>
                  <ul className="mb-6 space-y-2 text-sm text-left text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <button className="w-full px-4 py-2 mt-auto text-sm font-medium text-white transition-all rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:scale-105 hover:shadow-xl">
                      Nhận tư vấn miễn phí
                      <p className="mt-1 text-xs text-gray-400">Chúng tôi sẽ phản hồi trong vòng 24h</p>
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-4 text-sm text-gray-400">
              <Link href="https://www.facebook.com/sharer/sharer.php?u=https://vinhworks.com/pricing" target="_blank" className="hover:text-white">Chia sẻ Facebook</Link>
              <Link href="/contact" className="hover:text-white">Đặt lịch tư vấn</Link>
            </div>

            <div className="max-w-3xl mx-auto text-center text-gray-300 mt-28">
              <Quote className="mx-auto mb-3 text-teal-400" size={36} />
              <p className="italic">“Website cực kỳ mượt, đẹp và đúng như những gì tôi kỳ vọng. Đội ngũ hỗ trợ siêu nhanh!”</p>
              <p className="mt-2 text-sm text-teal-400">— Trần Hữu Nam, Founder WebPlus</p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-20">
              <p className="text-lg text-gray-300">Bạn chưa chắc chọn gói nào?</p>
              <Link href="/contact">
                <button className="px-6 py-3 mt-4 text-sm font-semibold text-white transition-all rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 hover:shadow-xl">
                  📩 Gửi yêu cầu để được tư vấn nhanh chóng
                </button>
              </Link>
            </motion.div>

            <div className="max-w-3xl mx-auto mt-28">
              <h3 className="mb-6 text-2xl font-bold text-center text-white">❓ Câu hỏi thường gặp</h3>
              <div className="space-y-6 text-left text-gray-300">
                {faqs.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1 font-semibold text-teal-400">
                      <HelpCircle size={18} /> {item.question}
                    </div>
                    <p className="text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
