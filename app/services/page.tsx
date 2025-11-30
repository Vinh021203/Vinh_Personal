"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Code2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Star,
  Zap,
  Shield,
  Rocket,
  Award,
  TrendingUp,
  Smartphone,
  Search,
  LayoutTemplate,
  Palette,
  CheckCircle2,
  Layers,
  Globe,
  Server,
  Database,
  ShoppingCart,
} from "lucide-react";
import { iconMap } from "@/components/admin/SelectIconField";

// --- TYPES ---
interface IService {
  _id: string;
  name: string;
  description: string;
  icon: string;
  status: "Hiển thị" | "Ẩn";
  isNew?: boolean;
}

// --- DATA ---
const benefits = [
  {
    text: "Tối ưu SEO & Core Web Vitals",
    desc: "Leo top Google bền vững với cấu trúc code chuẩn SEO.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    text: "Responsive mọi thiết bị",
    desc: "Hiển thị hoàn hảo trên Mobile, Tablet và Desktop.",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    text: "Công nghệ mới nhất",
    desc: "Next.js 14, React Server Components, TypeScript.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    text: "Bảo mật đa lớp",
    desc: "Chống tấn công XSS, CSRF, SQL Injection.",
    icon: Shield,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    text: "UI/UX Đẳng cấp",
    desc: "Thiết kế hiện đại, tập trung vào trải nghiệm người dùng.",
    icon: Palette,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
  {
    text: "Hỗ trợ 24/7",
    desc: "Đội ngũ kỹ thuật luôn sẵn sàng khi bạn cần.",
    icon: MessageCircle,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Khám phá",
    desc: "Lắng nghe ý tưởng, phân tích yêu cầu và tư vấn giải pháp tối ưu ngân sách.",
    icon: Search,
    color: "from-blue-400 to-cyan-400",
  },
  {
    step: "02",
    title: "Thiết kế",
    desc: "Phác thảo Wireframe và UI chi tiết. Bạn sẽ thấy sản phẩm trước khi code.",
    icon: LayoutTemplate,
    color: "from-cyan-400 to-teal-400",
  },
  {
    step: "03",
    title: "Phát triển",
    desc: "Lập trình với mã nguồn sạch, bảo mật và hiệu năng cao nhất.",
    icon: Code2,
    color: "from-teal-400 to-emerald-400",
  },
  {
    step: "04",
    title: "Bàn giao",
    desc: "Kiểm thử, deploy lên server và hướng dẫn quản trị chi tiết.",
    icon: Rocket,
    color: "from-emerald-400 to-green-400",
  },
];

const faqData = [
  {
    question: "Chi phí thiết kế website là bao nhiêu?",
    answer:
      "Chi phí tùy thuộc vào tính năng. Gói Landing Page từ 5tr, Website doanh nghiệp từ 10tr, Web App/E-commerce từ 20tr. Liên hệ để có báo giá chính xác nhất.",
  },
  {
    question: "Thời gian hoàn thành dự án?",
    answer:
      "Landing page: 3-5 ngày. Website công ty: 2 tuần. Dự án phức tạp: 4-8 tuần. Chúng tôi cam kết đúng tiến độ hợp đồng.",
  },
  {
    question: "Website có chuẩn SEO không?",
    answer:
      "Chắc chắn! 100% website bàn giao đều đạt điểm xanh Google PageSpeed và tối ưu thẻ meta, sitemap, schema chuẩn SEO.",
  },
  {
    question: "Có bảo hành sau bàn giao không?",
    answer:
      "Có! Bảo hành kỹ thuật 12 tháng miễn phí. Hỗ trợ fix lỗi và hướng dẫn sử dụng trọn đời.",
  },
];

// --- COMPONENTS ---

const ServiceCard = ({
  service,
  index,
}: {
  service: IService;
  index: number;
}) => {
  const Icon = iconMap[service.icon] || Layers;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="relative h-full group"
    >
      {/* Animated Gradient Border Background */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-sm transition duration-500 group-hover:duration-200" />

      {/* Main Card Content */}
      <div className="relative h-full bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col overflow-hidden">
        {/* Spotlight Effect inside card */}
        <motion.div
          className="absolute transition duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(139, 92, 246, 0.05),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon Box */}
          <div className="inline-flex p-4 mb-6 transition-all duration-300 rounded-2xl bg-slate-50 text-slate-600 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-violet-500/30">
            <Icon size={32} strokeWidth={1.5} />
          </div>

          <h3 className="mb-3 text-2xl font-bold transition-all duration-300 text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-600">
            {service.name}
          </h3>

          <p className="flex-grow mb-8 text-sm font-medium leading-relaxed text-slate-500">
            {service.description}
          </p>

          {service.isNew && (
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md shadow-rose-500/20">
                New
              </span>
            </div>
          )}

          <div className="pt-6 mt-auto border-t border-slate-100 group-hover:border-slate-200/50">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors text-slate-600 group-hover:text-violet-600"
            >
              Tư vấn ngay
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => {
        console.error("Error:", err);
        // Mock data fallback
        setServices([
          {
            _id: "1",
            name: "Web Design",
            description:
              "Thiết kế giao diện độc quyền, sáng tạo, tập trung vào nhận diện thương hiệu.",
            icon: "LayoutTemplate",
            status: "Hiển thị",
            isNew: true,
          },
          {
            _id: "2",
            name: "Web Development",
            description:
              "Lập trình website trọn gói với công nghệ Next.js, React, Node.js.",
            icon: "Code2",
            status: "Hiển thị",
          },
          {
            _id: "3",
            name: "E-commerce",
            description:
              "Hệ thống bán hàng online đa kênh, tích hợp thanh toán, vận chuyển.",
            icon: "ShoppingCart",
            status: "Hiển thị",
          },
          {
            _id: "4",
            name: "SEO & Marketing",
            description:
              "Tối ưu hóa công cụ tìm kiếm, đưa website lên Top Google bền vững.",
            icon: "TrendingUp",
            status: "Hiển thị",
          },
        ] as any);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  // Schema.org for Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web Development",
    provider: {
      "@type": "Organization",
      name: "VinhWorks",
      url: "https://vinhworks.com",
    },
    areaServed: "Vietnam",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
        },
      })),
    },
  };

  return (
    <>
      <Head>
        <title>
          Dịch vụ Thiết kế Website & App - VinhWorks | Giải pháp Công nghệ
        </title>
        <meta
          name="description"
          content="Dịch vụ thiết kế website, lập trình ứng dụng web (Web App), tối ưu SEO và Marketing Online chuyên nghiệp tại VinhWorks. Cam kết chất lượng và tiến độ."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Dịch vụ Thiết kế Website & App - VinhWorks"
        />
        <meta
          property="og:description"
          content="Giải pháp công nghệ toàn diện: Web Design, E-commerce, SEO. Tư vấn miễn phí."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/services" />
        <meta property="og:image" content="/seo-services-og.jpg" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-violet-200 selection:text-violet-900">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-32 pb-20 overflow-hidden lg:pt-48 lg:pb-32">
          {/* Bright Gradient Blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="container relative z-10 max-w-5xl px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold border border-white rounded-full shadow-sm bg-white/80 backdrop-blur-md text-violet-600 ring-1 ring-violet-100">
                <Sparkles size={16} className="fill-violet-500" />
                <span>Dịch vụ chất lượng cao</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Giải pháp số <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500">
                  Đột phá & Hiệu quả
                </span>
              </h1>

              <p className="max-w-3xl mx-auto mb-12 text-xl font-medium leading-relaxed text-slate-600">
                Chúng tôi không chỉ tạo ra website, chúng tôi kiến tạo những{" "}
                <span className="font-bold text-slate-900">
                  cỗ máy tăng trưởng
                </span>{" "}
                doanh thu cho doanh nghiệp của bạn.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="#services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 font-bold text-white transition-all shadow-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl shadow-violet-500/20 hover:shadow-violet-500/40"
                  >
                    Khám phá dịch vụ
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-bold transition-all bg-white border-2 shadow-sm text-slate-700 border-slate-100 rounded-2xl hover:border-violet-200 hover:text-violet-600"
                  >
                    Nhận báo giá
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SERVICES GRID ================= */}
        <section id="services" className="relative py-24">
          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="mb-4 text-3xl font-black md:text-5xl text-slate-900">
                Dịch vụ cung cấp
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full mx-auto" />
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 rounded-full border-violet-500 border-t-transparent animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, idx) => (
                  <ServiceCard
                    key={service._id || idx}
                    service={service}
                    index={idx}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= BENEFITS SECTION ================= */}
        <section className="relative py-24 overflow-hidden bg-white">
          {/* Diagonal background shape */}
          <div className="absolute top-0 right-0 w-2/3 h-full -skew-x-12 pointer-events-none bg-slate-50/50 translate-x-1/4" />

          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <div className="flex flex-col gap-16 lg:flex-row">
              {/* Text Side */}
              <div className="lg:w-1/2">
                <span className="block mb-2 text-sm font-bold tracking-wider uppercase text-violet-600">
                  Tại sao chọn chúng tôi?
                </span>
                <h2 className="mb-8 text-4xl font-black leading-tight text-slate-900">
                  Mang lại giá trị thực <br /> cho khoản đầu tư của bạn.
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`p-5 rounded-2xl border ${benefit.bg} ${benefit.border} hover:shadow-md transition-shadow cursor-default`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl ${benefit.color} bg-white flex items-center justify-center mb-3 shadow-sm`}
                      >
                        <benefit.icon size={20} />
                      </div>
                      <h4 className="mb-1 font-bold text-slate-900">
                        {benefit.text}
                      </h4>
                      <p className="text-xs font-medium leading-relaxed text-slate-500">
                        {benefit.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats Side (Right) */}
              <div className="flex items-center justify-center lg:w-1/2">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-[3rem] rotate-6 blur-lg opacity-30" />
                  <div className="relative bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
                    <div className="space-y-10 text-center divide-y divide-slate-100">
                      <div className="pt-4">
                        <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                          99%
                        </h3>
                        <p className="mt-2 text-sm font-bold tracking-widest uppercase text-slate-400">
                          Khách hàng hài lòng
                        </p>
                      </div>
                      <div className="pt-10">
                        <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                          24/7
                        </h3>
                        <p className="mt-2 text-sm font-bold tracking-widest uppercase text-slate-400">
                          Hỗ trợ kỹ thuật
                        </p>
                      </div>
                      <div className="pt-10 pb-4">
                        <div className="flex justify-center gap-1 mb-3 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="fill-current" size={24} />
                          ))}
                        </div>
                        <p className="italic font-medium text-slate-600">
                          "Chất lượng vượt xa mong đợi!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROCESS SECTION (Light Mode) ================= */}
        <section className="relative py-24 overflow-hidden bg-slate-50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-black md:text-5xl text-slate-900">
                Quy trình tinh gọn
              </h2>
              <p className="mt-4 font-medium text-slate-500">
                4 Bước để biến ý tưởng thành hiện thực
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Step Number Big - Light Mode Style */}
                  <div className="absolute font-black transition-colors select-none opacity-10 text-8xl text-slate-900 -top-10 -left-4 group-hover:text-violet-600 group-hover:opacity-20">
                    {step.step}
                  </div>

                  <div className="relative z-10 pt-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl`}
                    >
                      <step.icon size={32} className="text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold transition-colors text-slate-900 group-hover:text-violet-600">
                      {step.title}
                    </h3>
                    <p className="pl-4 text-sm leading-relaxed transition-colors border-l-2 text-slate-500 border-slate-200 group-hover:border-violet-500 group-hover:text-slate-700">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="py-24">
          <div className="container max-w-3xl px-6 mx-auto">
            <h2 className="mb-12 text-3xl font-black text-center text-slate-900">
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  className="overflow-hidden transition-colors bg-white border border-slate-200 rounded-2xl hover:border-violet-200"
                >
                  <button
                    onClick={() =>
                      setFaqOpenIndex(faqOpenIndex === i ? null : i)
                    }
                    className="flex items-center justify-between w-full p-6 text-left"
                  >
                    <span
                      className={`font-bold text-lg ${
                        faqOpenIndex === i
                          ? "text-violet-600"
                          : "text-slate-700"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`p-2 rounded-full transition-colors ${
                        faqOpenIndex === i
                          ? "bg-violet-100 text-violet-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ArrowRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          faqOpenIndex === i ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {faqOpenIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pt-4 pb-6 mt-2 leading-relaxed border-t text-slate-600 border-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative py-24 overflow-hidden">
          <div className="container relative z-10 max-w-5xl px-6 mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-[3rem] p-12 md:p-20 text-center shadow-xl border border-slate-100 relative overflow-hidden">
              {/* Abstract Glows */}
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="mb-8 text-4xl font-black leading-tight md:text-6xl text-slate-900">
                  Sẵn sàng{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    bứt phá
                  </span>{" "}
                  doanh thu?
                </h2>
                <p className="max-w-2xl mx-auto mb-12 text-xl font-medium text-slate-600">
                  Đừng để website lỗi thời kìm hãm sự phát triển của bạn. Hãy để
                  chúng tôi giúp bạn xây dựng đế chế số ngay hôm nay.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 text-lg font-bold text-white transition-all shadow-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl shadow-violet-500/30 hover:shadow-violet-500/50"
                    >
                      Liên hệ tư vấn miễn phí
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
