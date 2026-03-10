"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  Building2,
  Hexagon,
  Triangle,
  Circle,
  ChevronLeft,
  ChevronRight,
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
    role: "Marketing Lead @ NextGen",
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
  {
    id: 4,
    name: "Jennifer Lee",
    role: "Product Manager @ EduMinds",
    content:
      "Team VinhWorks đã giúp chúng tôi xây dựng nền tảng học tập hiện đại với trải nghiệm người dùng xuất sắc. Học viên rất hài lòng!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    companyLogo: Building2,
  },
  {
    id: 5,
    name: "Trần Đức Anh",
    role: "CTO @ VinaCorp",
    content:
      "Code chất lượng cao, architecture rõ ràng, dễ maintain. Performance tối ưu tuyệt vời. Đây là partner đáng tin cậy cho các dự án lớn.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    companyLogo: Hexagon,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      } else {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
    });
  };

  const getPrevIndex = () =>
    currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
  const getNextIndex = () => (currentIndex + 1) % testimonials.length;

  return (
    <section className="relative py-10 overflow-hidden md:py-16 lg:py-8 bg-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* INFINITE SCROLLING LOGO STRIP - Same on Mobile & Desktop */}
        <div className="mb-10 overflow-hidden md:mb-14">
          <p className="mb-5 text-xs font-bold tracking-widest text-center uppercase md:text-sm text-slate-400 md:mb-8">
            Được tin tưởng bởi các doanh nghiệp hàng đầu
          </p>

          {/* Unified Horizontal Scroll for All Devices */}
          <div className="relative">
            <motion.div
              className="flex gap-8 md:gap-16"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Triple the array for seamless loop */}
              {[...companies, ...companies, ...companies].map((comp, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 transition-all duration-300 cursor-pointer md:gap-3 shrink-0 grayscale hover:grayscale-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <comp.icon
                    size={20}
                    className="md:w-7 md:h-7 text-slate-700"
                  />
                  <span className="text-sm font-bold md:text-xl text-slate-800">
                    {comp.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-8 text-center md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black tracking-tight md:text-4xl lg:text-5xl text-slate-900"
          >
            Niềm tin từ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Khách hàng thực tế
            </span>
          </motion.h2>
        </div>

        {/* TESTIMONIAL SLIDER WITH ANIMATED BACKGROUNDS */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop: 3-card view with animated backgrounds */}
          <div className="hidden md:block">
            <div className="relative h-[250px] flex items-center justify-center">
              {/* Previous Card (Left Background) */}
              <motion.div
                key={`prev-${getPrevIndex()}`}
                initial={{ x: -400, opacity: 0, scale: 0.85 }}
                animate={{ x: -350, opacity: 0.3, scale: 0.85 }}
                exit={{ x: -400, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <TestimonialCard item={testimonials[getPrevIndex()]} />
              </motion.div>

              {/* Next Card (Right Background) */}
              <motion.div
                key={`next-${getNextIndex()}`}
                initial={{ x: 400, opacity: 0, scale: 0.85 }}
                animate={{ x: 350, opacity: 0.3, scale: 0.85 }}
                exit={{ x: 400, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <TestimonialCard item={testimonials[getNextIndex()]} />
              </motion.div>

              {/* Current Card (Center) */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? 400 : -400,
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{
                    x: direction > 0 ? -400 : 400,
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="absolute w-full max-w-2xl"
                  style={{ zIndex: 10 }}
                >
                  <TestimonialCard item={testimonials[currentIndex]} featured />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: Single card slider */}
          <div className="relative md:hidden h-[250px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{
                  x: direction > 0 ? 300 : -300,
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{
                  x: direction > 0 ? -300 : 300,
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    paginate(1);
                  } else if (swipe > 10000) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full px-2"
              >
                <TestimonialCard item={testimonials[currentIndex]} featured />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 z-20 p-2 transition-all transform -translate-y-1/2 bg-white border shadow-lg md:p-3 top-1/2 rounded-xl border-slate-200 hover:bg-slate-50 md:-left-20"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6 text-slate-700" />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 z-20 p-2 transition-all transform -translate-y-1/2 bg-white border shadow-lg md:p-3 top-1/2 rounded-xl border-slate-200 hover:bg-slate-50 md:-right-20"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6 text-slate-700" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className="relative group"
              >
                <motion.div
                  animate={{
                    width: idx === currentIndex ? 28 : 8,
                    backgroundColor:
                      idx === currentIndex ? "#3b82f6" : "#cbd5e1",
                  }}
                  className="h-1.5 md:h-2 transition-all rounded-full"
                />
                {idx === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-blue-400 rounded-full blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({
  item,
  featured = false,
}: {
  item: any;
  featured?: boolean;
}) => {
  return (
    <motion.div
      whileHover={featured ? { y: -10 } : {}}
      className={`group relative p-5 md:p-8 bg-white rounded-2xl md:rounded-[2rem] shadow-lg border ${
        featured ? "border-blue-200 shadow-2xl" : "border-slate-100"
      } transition-all duration-300 flex flex-col`}
    >
      {/* Large Quote Icon Background */}
      <Quote
        className={`absolute w-10 h-10 md:w-12 md:h-12 transition-colors duration-300 rotate-180 top-4 right-5 md:top-6 md:right-8 ${
          featured ? "text-blue-50 group-hover:text-blue-100" : "text-slate-100"
        }`}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-4 md:mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-yellow-400 fill-yellow-400 drop-shadow-sm md:w-[18px] md:h-[18px]"
          />
        ))}
      </div>

      {/* Content */}
      <p className="relative z-10 mb-5 text-sm italic leading-relaxed md:text-base md:mb-8 text-slate-600">
        "{item.content}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3 pt-4 mt-auto border-t md:gap-4 md:pt-6 border-slate-100">
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500">
          <div className="relative w-10 h-10 overflow-hidden border-2 border-white rounded-full md:w-12 md:h-12">
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
          <h4 className="text-sm font-bold md:text-base text-slate-900">
            {item.name}
          </h4>
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-slate-500">
            <item.companyLogo
              size={11}
              className="text-blue-500 md:w-3 md:h-3"
            />
            {item.role}
          </div>
        </div>
      </div>

      {/* Highlight border for featured */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl md:rounded-[2rem] pointer-events-none" />
      )}
    </motion.div>
  );
};
