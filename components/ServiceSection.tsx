'use client';

import { Code, MonitorSmartphone, Layers } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    icon: Code,
    title: 'Web App linh hoạt',
    description: 'Xây dựng hệ thống web phù hợp nhu cầu kinh doanh, tích hợp API và scalable.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Thiết kế UI/UX hiện đại',
    description: 'Giao diện responsive, tối ưu trải nghiệm trên mọi thiết bị.',
  },
  {
    icon: Layers,
    title: 'Tối ưu hiệu suất & SEO',
    description: 'Tải nhanh, chuẩn kỹ thuật, hỗ trợ hiển thị Google tốt hơn.',
  },
];

export const ServiceSection = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 overflow-hidden text-white bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Hiệu ứng blob nền */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-teal-500/20 blur-[100px] rounded-full animate-ping -z-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/20 blur-[100px] rounded-full animate-pulse -z-10" />

      <div className="px-6 mx-auto max-w-7xl">
        {/* Tiêu đề */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="text-2xl"
              aria-hidden="true"
            >
              ⚙️
            </motion.span>
            <p className="text-base font-semibold tracking-widest text-teal-400 uppercase">Dịch vụ</p>
          </div>

          <h2 id="services-heading" className="sr-only">
            Dịch vụ cung cấp
          </h2>

          <h3 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Tôi mang đến giải pháp công nghệ tối ưu
          </h3>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Kết hợp trải nghiệm, sáng tạo và kỹ thuật hiện đại để phục vụ mục tiêu kinh doanh của bạn.
          </p>
        </motion.header>

        {/* Danh sách dịch vụ */}
        <ul className="grid gap-10 md:grid-cols-3 sm:grid-cols-2" role="list">
          {services.map((service, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="list-none"
            >
              <ServiceCard {...service} />
            </motion.li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center mt-16 space-y-4 text-center md:flex-row md:space-y-0 md:space-x-6">
          <Link href="/contact" aria-label="Đi tới trang liên hệ VinhWorks">
            <button className="px-6 py-3 text-sm font-semibold text-white transition-all rounded-full bg-gradient-to-r from-teal-400 to-blue-500 hover:scale-105 hover:shadow-lg">
              📞 Liên hệ ngay
            </button>
          </Link>
          <Link href="/pricing" aria-label="Xem bảng giá dịch vụ VinhWorks">
            <button className="px-6 py-3 text-sm font-semibold text-white transition-all rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg">
              💰 Xem bảng giá
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
