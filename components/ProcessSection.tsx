"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  PenTool,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
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

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[40%] left-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[80px] mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div
        className="container relative z-10 px-6 mx-auto max-w-7xl"
        ref={containerRef}
      >
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white border border-blue-100 shadow-sm text-sm font-bold text-blue-600"
          >
            <Zap size={16} className="fill-blue-600" />
            <span>Quy trình tinh gọn</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
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
            className="text-lg leading-relaxed text-slate-600"
          >
            Tôi áp dụng quy trình làm việc Agile linh hoạt, minh bạch trong từng
            giai đoạn để đảm bảo sản phẩm cuối cùng hoàn hảo nhất.
          </motion.p>
        </div>

        {/* Desktop Process Line (Animated SVG) */}
        <div className="relative hidden mb-12 lg:block">
          <svg
            className="absolute top-[60px] left-0 w-full h-[100px] z-0"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 100 50 L 350 50 L 400 50 L 650 50 L 700 50 L 950 50"
              fill="none"
              stroke="#E2E8F0" // slate-200
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            <motion.path
              d="M 100 50 L 350 50 L 400 50 L 650 50 L 700 50 L 950 50"
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-4">
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
              {/* Step Card */}
              <div className="relative flex flex-col items-center h-full text-center">
                {/* Icon Circle with Ripple Effect */}
                <div className="relative mb-8">
                  {/* Ripple Rings */}
                  <div
                    className={`absolute inset-0 rounded-full ${step.bg} animate-ping opacity-20 duration-1000`}
                  />
                  <div
                    className={`absolute inset-[-8px] rounded-full ${step.bg} opacity-40`}
                  />

                  {/* Main Circle */}
                  <div
                    className={`relative w-28 h-28 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${step.bg}`}
                    >
                      <step.icon
                        size={36}
                        className={step.color}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Step Number Badge */}
                    <div
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${step.gradient} text-white font-bold flex items-center justify-center text-sm shadow-md border-2 border-white`}
                    >
                      {step.id}
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="relative flex flex-col w-full h-full p-6 transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-100 group-hover:shadow-xl group-hover:-translate-y-2">
                  {/* Title Area */}
                  <div className="mb-4">
                    <h3
                      className={`text-xl font-bold text-slate-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${step.gradient} transition-all`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs font-medium tracking-wider uppercase text-slate-400">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {step.desc}
                  </p>

                  {/* Checklist Details (Always visible but highlighted on hover) */}
                  <div className="w-full pt-4 mt-auto space-y-2 text-left border-t border-slate-100">
                    {step.tasks.map((task, tIdx) => (
                      <motion.div
                        key={tIdx}
                        className="flex items-center gap-2 text-xs text-slate-500"
                        initial={{ opacity: 0.7, x: 0 }}
                        whileHover={{ opacity: 1, x: 2 }}
                      >
                        <CheckCircle2
                          size={12}
                          className={`shrink-0 ${
                            activeStep === step.id
                              ? step.color
                              : "text-slate-300"
                          }`}
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

                  {/* Decoration Corner */}
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${step.gradient} opacity-5 rounded-bl-[3rem] rounded-tr-2xl pointer-events-none`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges (Bottom) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-wrap justify-center gap-8 pt-10 mt-20 border-t md:gap-16 border-slate-200"
        >
          <div className="flex items-center gap-3 font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-blue-600">
            <ShieldCheck size={24} />
            <span>Bảo mật thông tin</span>
          </div>
          <div className="flex items-center gap-3 font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-purple-600">
            <Users size={24} />
            <span>Hỗ trợ 1:1</span>
          </div>
          <div className="flex items-center gap-3 font-medium transition-all duration-300 cursor-default text-slate-400 grayscale hover:grayscale-0 hover:text-pink-600">
            <Rocket size={24} />
            <span>Bàn giao đúng hạn</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
