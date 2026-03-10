"use client";

import {
  Code,
  Palette,
  Rocket,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  LayoutTemplate,
  Database,
  Search,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    id: "web-dev",
    icon: Code,
    title: "Web Development",
    description:
      "Xây dựng website hiệu năng cao với React/Next.js. Code sạch, dễ bảo trì và mở rộng.",
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    gradient: "from-violet-500 to-purple-600",
    features: [
      "React / Next.js",
      "TypeScript",
      "API & Database",
      "CMS Integration",
    ],
    colSpan: "md:col-span-2 lg:col-span-1",
  },
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Thiết kế giao diện người dùng hiện đại, tập trung vào trải nghiệm và tỷ lệ chuyển đổi.",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Figma / Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
    ],
    colSpan: "md:col-span-2 lg:col-span-1",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Marketing",
    description:
      "Tối ưu hóa công cụ tìm kiếm, đưa website của bạn lên top Google bền vững.",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    gradient: "from-orange-500 to-amber-500",
    features: [
      "Keyword Research",
      "On-page SEO",
      "Technical Audit",
      "Content Strategy",
    ],
    colSpan: "md:col-span-2 lg:col-span-1",
  },
];

const additionalStats = [
  {
    label: "Dự án đã giao",
    value: "50+",
    icon: Rocket,
    color: "text-blue-500",
  },
  {
    label: "Khách hàng hài lòng",
    value: "98%",
    icon: Sparkles,
    color: "text-yellow-500",
  },
  { label: "Hỗ trợ", value: "24/7", icon: Zap, color: "text-green-500" },
];

export const ServiceSection = () => {
  return (
    <section
      id="services"
      className="relative py-10 overflow-hidden md:py-20 lg:py-8 bg-slate-50"
    >
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-pink-200/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* SECTION HEADER - Compact on mobile */}
        <div className="max-w-3xl mx-auto mb-10 text-center md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold border rounded-full md:px-4 md:py-1.5 md:mb-6 bg-white border-slate-200 shadow-sm md:text-sm text-slate-600"
          >
            <LayoutTemplate size={14} className="text-violet-500 md:size-4" />
            <span>Dịch vụ toàn diện</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-3 text-3xl font-black tracking-tight md:mb-6 text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Giải pháp công nghệ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Đột phá & Hiệu quả
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm leading-relaxed md:text-base lg:text-lg text-slate-600"
          >
            Không chỉ là viết code, tôi mang đến giải pháp số giúp doanh nghiệp
            của bạn tăng trưởng, tối ưu vận hành và chinh phục khách hàng.
          </motion.p>
        </div>

        {/* BENTO GRID SERVICES - Compact on mobile */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 md:mb-16 lg:mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-6 lg:p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 overflow-hidden ${service.colSpan}`}
            >
              {/* Hover Gradient Border Effect */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              />

              {/* Icon Box - Smaller on mobile */}
              <div
                className={`w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl ${service.bgColor} ${service.color} flex items-center justify-center mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon
                  size={22}
                  strokeWidth={2.5}
                  className="md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
              </div>

              <h3 className="mb-2 text-xl font-bold transition-colors md:mb-3 md:text-2xl text-slate-900 group-hover:text-violet-700">
                {service.title}
              </h3>

              <p className="mb-4 text-sm leading-relaxed md:mb-6 text-slate-600">
                {service.description}
              </p>

              {/* Feature List - Compact on mobile */}
              <ul className="mb-5 space-y-2 md:mb-6 lg:mb-8 md:space-y-3">
                {service.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-2 text-xs font-medium md:gap-3 md:text-sm text-slate-500"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-emerald-500 shrink-0 md:size-4"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link Button */}
              <div className="flex items-center justify-between pt-4 mt-auto border-t md:pt-6 border-slate-100">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-xs font-bold transition-colors md:text-sm text-slate-900 group-hover:text-violet-600"
                >
                  Tư vấn ngay
                  <ArrowRight
                    size={14}
                    className="transition-transform md:size-4 group-hover:translate-x-1"
                  />
                </Link>
                <div
                  className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl md:text-2xl font-black text-slate-100 absolute bottom-3 right-4 md:bottom-4 md:right-6 -z-10 select-none scale-150 origin-bottom-right`}
                >
                  {idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS BAR (Floating) - Compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-2xl opacity-20 rounded-2xl md:rounded-[2rem]" />
          <div className="relative bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-6 lg:p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Stats Grid - 3 columns on mobile */}
            <div className="grid grid-cols-3 gap-3 w-full md:contents">
              {additionalStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center w-full md:pt-0"
                >
                  <div className={`mb-1 md:mb-2 ${stat.color}`}>
                    <stat.icon size={18} className="md:size-6" />
                  </div>
                  <div className="mb-0.5 md:mb-1 text-xl md:text-3xl font-black text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-sm font-medium tracking-wider uppercase text-slate-500 text-center leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button in Stats Bar - Full width on mobile */}
            <div className="w-full pl-0 md:w-auto md:pt-0 md:pl-8">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-bold text-white transition-all shadow-lg md:px-6 md:py-4 whitespace-nowrap bg-slate-900 rounded-xl shadow-slate-900/20 hover:shadow-xl"
                >
                  <Zap
                    size={16}
                    className="text-yellow-400 fill-yellow-400 md:size-[18px]"
                  />
                  Bắt đầu ngay
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
