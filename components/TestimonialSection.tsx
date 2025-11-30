"use client";

import { motion } from "framer-motion";
import {
  Quote,
  Star,
  Building2,
  Hexagon,
  Triangle,
  Circle,
} from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "CEO @ TechStart",
    content:
      "VinhWorks không chỉ code giỏi mà tư duy sản phẩm cực tốt. Website mới đã giúp chúng tôi tăng 200% doanh số chỉ sau 1 tháng vận hành.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    companyLogo: Hexagon,
  },
  {
    id: 2,
    name: "Sarah Tran",
    role: "Marketing Lead",
    content:
      "Giao diện UI/UX rất hiện đại, đúng gu thẩm mỹ quốc tế. Quy trình làm việc chuyên nghiệp, minh bạch và hỗ trợ rất nhiệt tình.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    companyLogo: Triangle,
  },
  {
    id: 3,
    name: "Minh Hoàng",
    role: "Founder @ CoffeeHouse",
    content:
      "Tốc độ tải trang cực nhanh, điểm SEO Google xanh lè. Rất hài lòng với kết quả nhận được. Chắc chắn sẽ hợp tác trong các dự án tới.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    companyLogo: Circle,
  },
];

const companies = [
  { name: "TechStart", icon: Hexagon },
  { name: "NextGen", icon: Building2 },
  { name: "EduMinds", icon: Triangle },
  { name: "GlobalSoft", icon: Circle },
  { name: "VinaCorp", icon: Hexagon },
];

export const TestimonialSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* LOGO STRIP (Social Proof) */}
        <div className="mb-20 text-center">
          <p className="mb-8 text-sm font-bold tracking-widest uppercase text-slate-400">
            Được tin tưởng bởi các doanh nghiệp hàng đầu
          </p>
          <div className="flex flex-wrap justify-center gap-8 transition-all duration-500 md:gap-16 opacity-60 grayscale hover:grayscale-0">
            {companies.map((Comp, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Comp.icon size={24} className="text-slate-800" />
                <span className="text-lg font-bold text-slate-700">
                  {Comp.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
          >
            Niềm tin từ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Khách hàng thực tế
            </span>
          </motion.h2>
        </div>

        {/* TESTIMONIAL GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Large Quote Icon Background */}
              <Quote className="absolute w-12 h-12 transition-colors duration-300 rotate-180 top-6 right-8 text-slate-100 group-hover:text-blue-50" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400 drop-shadow-sm"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="relative z-10 mb-8 italic leading-relaxed text-slate-600">
                "{item.content}"
              </p>

              {/* User Info (Bottom) */}
              <div className="flex items-center gap-4 pt-6 mt-auto border-t border-slate-100">
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500">
                  <div className="relative w-12 h-12 overflow-hidden border-2 border-white rounded-full">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <item.companyLogo size={12} className="text-blue-500" />
                    {item.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
