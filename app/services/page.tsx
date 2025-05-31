'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Code2,
  ChevronDown,
} from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import Head from 'next/head';
import Link from 'next/link';
import { iconMap } from '@/components/admin/SelectIconField';

interface IService {
  _id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  status: 'Hiển thị' | 'Ẩn';
  category?: string;
  isNew?: boolean;
}

const benefits = [
  'Tối ưu SEO & Core Web Vitals',
  'Responsive mọọi thiết bị',
  'Kết nối backend/API linh hoạt',
  'Thiết kế chuẩn thương hiệu',
  'Giao diện đẹp, dễ dùng',
  'Dễ mở rộng, bảo trì',
];

const faqData = [
  {
    question: 'Chi phí thiết kế website là bao nhiêu?',
    answer: 'Chi phí tùy vào tính năng và độ phức tạp. Hãy liên hệ để nhận báo giá nhanh.',
  },
  {
    question: 'Thời gian hoàn thành?',
    answer: 'Thông thường từ 3–10 ngày tùy dự án, có thể linh hoạt theo yêu cầu của bạn.',
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error('Lỗi tải dịch vụ:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Dịch vụ lập trình | VinhWorks</title>
        <meta name="description" content="Thiết kế website, tối ưu SEO, lập trình Frontend/Backend chuyên nghiệp." />
        <meta property="og:title" content="Dịch vụ lập trình | VinhWorks" />
        <meta property="og:description" content="Thiết kế website, tối ưu SEO, lập trình Frontend/Backend chuyên nghiệp." />
        <meta property="og:image" content="/seo-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/services" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section className="relative min-h-screen pt-40 pb-32 text-white bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute top-0 left-0 w-48 h-48 bg-teal-500/20 blur-[100px] rounded-full animate-ping -z-10" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/20 blur-[100px] rounded-full animate-pulse -z-10" />

        <div className="max-w-6xl px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-xl text-teal-400">
              🛠️ <span className="text-sm tracking-widest uppercase">Dịch vụ</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Giải pháp lập trình hiện đại & tối ưu
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-gray-400">
              Tập trung vào hiệu suất, SEO, trải nghiệm người dùng và khả năng mở rộng để phù hợp mọi loại hình kinh doanh.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center mt-20">
              <div className="w-8 h-8 border-4 border-teal-400 rounded-full border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {services.map((svc, i) => {
                const Icon = iconMap[svc.icon] || Code2;
                return (
                  <motion.div
                    key={svc._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative group p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700 rounded-2xl transition-transform duration-300 hover:scale-[1.05] hover:shadow-teal-500/30 hover:shadow-2xl">
                      <ServiceCard icon={Icon} title={svc.name} description={svc.description} />
                      {svc.isNew && (
                        <span className="absolute top-4 right-4 text-xs px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded-full">Mới</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center mt-20">
            <ul className="grid w-full max-w-5xl grid-cols-1 text-sm text-center text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12 md:text-left">
              {benefits.map((text, i) => (
                <li
                  key={i}
                  className="flex items-center justify-center md:justify-start gap-3 transition-all duration-300 hover:scale-[1.03] hover:text-white group"
                >
                  <CheckCircle className="text-teal-400 transition duration-300 group-hover:text-teal-300" size={20} />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <Link href="/pricing">
              <button className="px-6 py-3 text-sm font-semibold text-white transition-all rounded-full bg-gradient-to-r from-blue-500 to-teal-500 hover:scale-105 hover:shadow-xl">
                📊 Xem bảng giá chi tiết
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h3 className="mb-4 text-xl font-semibold text-white">🎯 Quy trình làm việc</h3>
            <p className="max-w-2xl mx-auto text-gray-400">
              Tư vấn nhanh chóng → Thiết kế demo giao diện → Ký hợp đồng → Lập trình triển khai → Bàn giao & bảo trì miễn phí.
            </p>
          </motion.div>

          <div className="mt-20">
            <h3 className="mb-6 text-xl font-bold text-center text-white">❓ Câu hỏi thường gặp</h3>
            <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
              {faqData.map((faq, i) => (
                <div key={i} className="pb-4 border-b border-white/10">
                  <button
                    onClick={() => setFaqOpenIndex(faqOpenIndex === i ? null : i)}
                    className="flex items-center justify-between w-full gap-2 py-2 text-left text-teal-400 hover:text-teal-300"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${faqOpenIndex === i ? 'rotate-180 text-teal-300' : ''}`}
                    />
                  </button>
                  {faqOpenIndex === i && (
                    <p className="pl-1 mt-2 text-sm text-gray-300">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link href="/contact">
              <button className="px-6 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-teal-400 to-blue-500 hover:scale-105 hover:shadow-xl">
                📩 Nhận tư vấn miễn phí
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
