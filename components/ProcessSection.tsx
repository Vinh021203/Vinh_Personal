"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Code2,
  Rocket,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Users,
  Layout,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Tư vấn & Khảo sát",
    subtitle: "Consulting & Research",
    desc: "Lắng nghe ý tưởng, phân tích yêu cầu nghiệp vụ và đề xuất giải pháp công nghệ phù hợp nhất.",
    color: "text-blue-600",
    bg: "bg-blue-100",
    gradient: "from-blue-500 to-cyan-500",
    tasks: [
      "Phân tích yêu cầu (BA)",
      "Nghiên cứu đối thủ",
      "Lên sitemap & user flow",
      "Báo giá & Hợp đồng",
    ],
  },
  {
    id: 2,
    icon: Layout,
    title: "Thiết kế UI/UX",
    subtitle: "Interface & Experience",
    desc: "Phác thảo giao diện trực quan (Wireframe) và thiết kế chi tiết (UI) đảm bảo trải nghiệm người dùng tối ưu.",
    color: "text-purple-600",
    bg: "bg-purple-100",
    gradient: "from-purple-500 to-pink-500",
    tasks: [
      "Wireframe Low-fidelity",
      "UI High-fidelity (Figma)",
      "Tối ưu UX Mobile/Desktop",
      "Feedback & Chỉnh sửa",
    ],
  },
  {
    id: 3,
    icon: Code2,
    title: "Lập trình & Kiểm thử",
    subtitle: "Development & Testing",
    desc: "Chuyển đổi thiết kế thành sản phẩm thực tế với mã nguồn sạch, bảo mật và hiệu năng cao.",
    color: "text-pink-600",
    bg: "bg-pink-100",
    gradient: "from-pink-500 to-rose-500",
    tasks: [
      "Frontend (React/Next.js)",
      "Backend & API (Node/Go)",
      "Tích hợp CSDL",
      "Kiểm thử lỗi (QA/QC)",
    ],
  },
  {
    id: 4,
    icon: Rocket,
    title: "Bàn giao & Hỗ trợ",
    subtitle: "Delivery & Support",
    desc: "Triển khai website lên server, hướng dẫn quản trị và bảo hành kỹ thuật dài hạn.",
    color: "text-orange-600",
    bg: "bg-orange-100",
    gradient: "from-orange-500 to-amber-500",
    tasks: [
      "Deploy lên Hosting/VPS",
      "Đào tạo quản trị viên",
      "Bàn giao Source Code",
      "Bảo hành 12 tháng",
    ],
  },
];

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  return (
    <section className="relative py-10 overflow-hidden md:py-16 lg:py-8 bg-slate-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[40%] left-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[80px] mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div
        className="container relative z-10 px-6 mx-auto max-w-7xl"
        ref={containerRef}
      >
        {/* Header - Reduced margins */}
        <div className="max-w-3xl mx-auto mb-10 text-center md:mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold border rounded-full md:px-4 md:py-1.5 bg-white border-blue-100 shadow-sm md:text-sm text-blue-600"
          >
            <Zap size={14} className="fill-blue-600 md:size-4" />
            <span>Quy trình tinh gọn</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 text-3xl font-black tracking-tight md:mb-4 text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Từ ý tưởng đến <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Hiện thực hóa sản phẩm
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm leading-relaxed md:text-base lg:text-lg text-slate-600"
          >
            Tôi áp dụng quy trình làm việc Agile linh hoạt, minh bạch trong từng
            giai đoạn để đảm bảo sản phẩm cuối cùng hoàn hảo nhất.
          </motion.p>
        </div>

        {/* ========== MOBILE VERSION ========== */}
        <div className="relative lg:hidden">
          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 pb-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "1.5rem",
            }}
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="flex-shrink-0 w-[85vw] max-w-sm snap-center"
              >
                {/* Card with Enhanced Motion */}
                <motion.div
                  animate={{
                    scale: currentSlide === idx ? 1 : 0.92,
                    y: currentSlide === idx ? 0 : 10,
                    opacity: currentSlide === idx ? 1 : 0.6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="relative h-full"
                >
                  <div className="relative flex flex-col items-center h-full p-5 text-center transition-all duration-500 bg-white border shadow-lg rounded-3xl border-slate-100">
                    {/* Icon Circle with PREMIUM Animation */}
                    <div className="relative mb-6">
                      {/* Outer Glow Ring */}
                      <motion.div
                        className={`absolute -inset-3 rounded-full ${step.bg} opacity-20 blur-md`}
                        animate={{
                          scale: currentSlide === idx ? [1, 1.2, 1] : 1,
                          opacity: currentSlide === idx ? [0.2, 0.4, 0.2] : 0.2,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Ripple Effect */}
                      <AnimatePresence>
                        {currentSlide === idx && (
                          <>
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 2, opacity: 0 }}
                              exit={{ scale: 2.5, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className={`absolute inset-0 rounded-full border-2 ${step.bg}`}
                            />
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 2, opacity: 0 }}
                              exit={{ scale: 2.5, opacity: 0 }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: 0.5,
                              }}
                              className={`absolute inset-0 rounded-full border-2 ${step.bg}`}
                            />
                          </>
                        )}
                      </AnimatePresence>

                      {/* Main Icon Circle */}
                      <motion.div
                        animate={{
                          scale: currentSlide === idx ? [1, 1.1, 1] : 1,
                          rotate: currentSlide === idx ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          rotate: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        className="relative flex items-center justify-center bg-white border-4 border-white rounded-full shadow-2xl w-28 h-28 z-10"
                      >
                        <div
                          className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${step.bg}`}
                        >
                          <motion.div
                            animate={{
                              y: currentSlide === idx ? [0, -5, 0] : 0,
                              rotate:
                                currentSlide === idx ? [0, 10, -10, 0] : 0,
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <step.icon
                              size={40}
                              className={step.color}
                              strokeWidth={2}
                            />
                          </motion.div>
                        </div>

                        {/* Number Badge */}
                        <motion.div
                          animate={{
                            scale: currentSlide === idx ? [1, 1.2, 1] : 1,
                            rotate: currentSlide === idx ? [0, 360] : 0,
                          }}
                          transition={{
                            scale: {
                              duration: 0.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                            },
                            rotate: {
                              duration: 1,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            },
                          }}
                          className={`absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-r ${step.gradient} text-white font-bold flex items-center justify-center text-base shadow-xl border-3 border-white`}
                        >
                          {step.id}
                          {currentSlide === idx && (
                            <motion.div
                              className="absolute inset-0 bg-white rounded-full"
                              initial={{ scale: 0, opacity: 1 }}
                              animate={{ scale: 2, opacity: 0 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                            />
                          )}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div
                      animate={{
                        y: currentSlide === idx ? 0 : 10,
                        opacity: currentSlide === idx ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col flex-grow w-full"
                    >
                      <div className="mb-3">
                        <h3
                          className={`text-xl font-bold text-slate-900 mb-1 bg-gradient-to-r ${step.gradient} ${
                            currentSlide === idx
                              ? "text-transparent bg-clip-text"
                              : ""
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
                          {step.subtitle}
                        </p>
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-slate-600">
                        {step.desc}
                      </p>

                      <div className="w-full pt-3 mt-auto space-y-2 text-left border-t border-slate-100">
                        {step.tasks.map((task, tIdx) => (
                          <motion.div
                            key={tIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                              opacity: currentSlide === idx ? 1 : 0.5,
                              x: currentSlide === idx ? 0 : -10,
                            }}
                            transition={{
                              delay: currentSlide === idx ? tIdx * 0.1 : 0,
                              duration: 0.3,
                            }}
                            className="flex items-center gap-2 text-xs text-slate-500"
                          >
                            <motion.div
                              animate={{
                                scale: currentSlide === idx ? [1, 1.3, 1] : 1,
                              }}
                              transition={{
                                delay: tIdx * 0.1,
                                duration: 0.5,
                              }}
                            >
                              <CheckCircle2
                                size={12}
                                className={`shrink-0 ${
                                  currentSlide === idx
                                    ? step.color
                                    : "text-slate-300"
                                }`}
                              />
                            </motion.div>
                            <span
                              className={
                                currentSlide === idx ? "font-medium" : ""
                              }
                            >
                              {task}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Corner Decoration */}
                    <div
                      className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${step.gradient} ${
                        currentSlide === idx ? "opacity-10" : "opacity-5"
                      } rounded-bl-[3rem] rounded-tr-3xl pointer-events-none transition-opacity duration-300`}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots - Moved up closer to cards */}
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: currentSlide === idx ? 1 : 0.8,
                    width: currentSlide === idx ? 32 : 8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`h-2 rounded-full ${
                    currentSlide === idx
                      ? `bg-gradient-to-r ${steps[idx].gradient}`
                      : "bg-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Trust Badges - Moved up, smaller on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-wrap justify-center gap-3 pt-6 mt-6 border-t border-slate-200"
          >
            <div className="flex items-center gap-2 text-xs font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-blue-600">
              <ShieldCheck size={16} />
              <span>Bảo mật thông tin</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-purple-600">
              <Users size={16} />
              <span>Hỗ trợ 1:1</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-pink-600">
              <Rocket size={16} />
              <span>Bàn giao đúng hạn</span>
            </div>
          </motion.div>
        </div>

        {/* ========== DESKTOP VERSION ========== */}
        <div className="relative hidden lg:block">
          {/* Background Line */}
          <motion.div
            className="absolute top-[48px] left-[14%] right-[14%] h-2 bg-gradient-to-r from-blue-200 via-purple-200 via-pink-200 to-orange-200 rounded-full z-0 blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Gradient Line */}
          <motion.div
            className="absolute top-[48px] left-[14%] right-[14%] h-2 rounded-full z-0 shadow-2xl overflow-hidden"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.3,
            }}
            style={{ transformOrigin: "left" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500" />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-400 via-rose-400 to-amber-400"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
              animate={{ x: ["-200%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1.8,
              }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-50"
              animate={{ x: ["-100%", "300%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 2.5,
              }}
            />
          </motion.div>

          {/* Glow Under Line */}
          <motion.div
            className="absolute top-[45px] left-[14%] right-[14%] h-4 bg-gradient-to-r from-blue-400/40 via-purple-400/40 via-pink-400/40 to-orange-400/40 blur-xl rounded-full z-0"
            initial={{ opacity: 0 }}
            animate={
              isInView ? { opacity: [0, 0.8, 0.5], scaleY: [1, 1.2, 1] } : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Connection Dots */}
          {[14, 39, 64, 89].map((leftPercent, idx) => (
            <motion.div
              key={idx}
              className="absolute top-[42px] z-20"
              style={{ left: `${leftPercent}%` }}
              initial={{ scale: 0, opacity: 0, y: -20 }}
              animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5 + idx * 0.4,
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            >
              <motion.div
                className="absolute -inset-2 border-2 border-white/50 rounded-full"
                animate={{ scale: [1, 2, 2.5], opacity: [0.8, 0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              />

              <motion.div
                className="absolute -inset-1 border rounded-full border-white/60"
                animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3 + 0.3,
                }}
              />

              <motion.div
                className={`absolute -inset-1 rounded-full bg-gradient-to-r ${
                  idx === 0
                    ? "from-blue-400 to-cyan-400"
                    : idx === 1
                      ? "from-purple-400 to-fuchsia-400"
                      : idx === 2
                        ? "from-pink-400 to-rose-400"
                        : "from-orange-400 to-amber-400"
                } blur-md opacity-60`}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              <motion.div
                className={`relative w-5 h-5 rounded-full border-2 border-white shadow-xl ${
                  idx === 0
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                    : idx === 1
                      ? "bg-gradient-to-br from-purple-500 to-fuchsia-500"
                      : idx === 2
                        ? "bg-gradient-to-br from-pink-500 to-rose-500"
                        : "bg-gradient-to-br from-orange-500 to-amber-500"
                }`}
                animate={{ y: [0, -3, 0], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.2,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white rounded-full"
                  animate={{ scale: [0, 0.6, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: idx * 0.4,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Desktop Grid - Compact spacing */}
          <div className="relative grid grid-cols-4 gap-4 z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + idx * 0.2, duration: 0.5 }}
                className="relative group"
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="relative flex flex-col items-center h-full text-center">
                  {/* Icon Circle - Reduced margin */}
                  <div className="relative mb-6">
                    <div
                      className={`absolute inset-0 rounded-full ${step.bg} animate-ping opacity-20 duration-1000`}
                    />
                    <div
                      className={`absolute inset-[-8px] rounded-full ${step.bg} opacity-40`}
                    />

                    <div className="relative flex items-center justify-center bg-white border-4 border-white rounded-full shadow-xl w-24 h-24 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <div
                        className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${step.bg}`}
                      >
                        <step.icon
                          size={32}
                          className={step.color}
                          strokeWidth={1.5}
                        />
                      </div>

                      <div
                        className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r ${step.gradient} text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white`}
                      >
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Content Box - Compact padding */}
                  <div className="relative flex flex-col w-full h-full p-5 transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-100 group-hover:shadow-xl group-hover:-translate-y-2">
                    <div className="mb-3">
                      <h3
                        className={`text-lg font-bold text-slate-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${step.gradient} transition-all`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="mb-4 text-xs leading-relaxed text-slate-600">
                      {step.desc}
                    </p>

                    <div className="w-full pt-3 mt-auto space-y-1.5 text-left border-t border-slate-100">
                      {step.tasks.map((task, tIdx) => (
                        <motion.div
                          key={tIdx}
                          className="flex items-center gap-2 text-[11px] text-slate-500"
                          initial={{ opacity: 0.7, x: 0 }}
                          whileHover={{ opacity: 1, x: 2 }}
                        >
                          <CheckCircle2
                            size={11}
                            className={`shrink-0 ${activeStep === step.id ? step.color : "text-slate-300"}`}
                          />
                          <span
                            className={
                              activeStep === step.id
                                ? "text-slate-700 font-medium"
                                : ""
                            }
                          >
                            {task}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div
                      className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${step.gradient} opacity-5 rounded-bl-[3rem] rounded-tr-2xl pointer-events-none`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Trust Badges - Much closer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-wrap justify-center gap-8 pt-8 mt-10 border-t border-slate-200"
          >
            <div className="flex items-center gap-3 text-sm font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-blue-600">
              <ShieldCheck size={20} />
              <span>Bảo mật thông tin</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-purple-600">
              <Users size={20} />
              <span>Hỗ trợ 1:1</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-pink-600">
              <Rocket size={20} />
              <span>Bàn giao đúng hạn</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
