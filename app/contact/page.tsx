"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Mail,
  Send,
  Loader2,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Monitor,
  Sparkles,
  User,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  ShieldCheck,
  Star,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
import emailjs from "emailjs-com";

// --- DATA ---

const contactInfo = [
  {
    icon: Phone,
    title: "Hotline tư vấn",
    value: "0971 386 588",
    link: "tel:0971386588",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Mail,
    title: "Email hỗ trợ",
    value: "luongvinh02122003@gmail.com",
    link: "mailto:luongvinh02122003@gmail.com",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: MapPin,
    title: "Văn phòng",
    value: "TP. Hạ Long, Quảng Ninh",
    link: "https://goo.gl/maps/...",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    value: "8:00 - 22:00 (T2 - CN)",
    link: "#",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
];

const features = [
  { icon: Zap, text: "Phản hồi < 30p", color: "text-yellow-500" },
  { icon: ShieldCheck, text: "Bảo mật 100%", color: "text-green-500" },
  { icon: Star, text: "Tư vấn miễn phí", color: "text-purple-500" },
  { icon: Globe, text: "Hỗ trợ Online", color: "text-blue-500" },
];

// --- COMPONENTS ---

const ContactCard = ({
  info,
  index,
}: {
  info: (typeof contactInfo)[0];
  index: number;
}) => (
  <motion.a
    href={info.link}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 + index * 0.1 }}
    whileHover={{ scale: 1.02, y: -2 }}
    className={`flex items-center gap-4 p-5 rounded-2xl border ${info.bg} ${info.border} hover:shadow-lg transition-all duration-300 group cursor-pointer`}
  >
    <div
      className={`p-3 rounded-xl bg-white shadow-sm ${info.color} group-hover:scale-110 transition-transform`}
    >
      <info.icon size={24} />
    </div>
    <div>
      <h4 className="text-sm font-bold text-slate-900 mb-0.5 group-hover:text-violet-600 transition-colors">
        {info.title}
      </h4>
      <p className="text-sm font-medium text-slate-500">{info.value}</p>
    </div>
  </motion.a>
);

// --- MAIN PAGE ---

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      toast.success("Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Lỗi gửi tin nhắn. Vui lòng thử lại hoặc gọi hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  // Schema SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Liên hệ VinhWorks",
    description:
      "Trang liên hệ tư vấn dịch vụ thiết kế website và giải pháp công nghệ.",
    url: "https://vinhworks.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "VinhWorks",
      telephone: "0971-386-588",
      email: "luongvinh02122003@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hạ Long, Quảng Ninh",
        addressCountry: "VN",
      },
    },
  };

  return (
    <>
      <Head>
        <title>Liên hệ - VinhWorks | Tư vấn Giải pháp Số Miễn phí</title>
        <meta
          name="description"
          content="Liên hệ ngay với VinhWorks để nhận tư vấn thiết kế website, SEO và giải pháp công nghệ. Hỗ trợ 24/7, phản hồi nhanh chóng."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-purple-100 selection:text-purple-900">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-20 pb-12">
          {/* Background Blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
          </div>

          <div className="container relative z-10 max-w-6xl px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold text-purple-600 border border-white rounded-full shadow-sm bg-white/80 ring-1 ring-purple-100 backdrop-blur-md">
                <MessageCircle size={16} className="fill-purple-500" />
                <span>Hỗ trợ 24/7</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Kết nối cùng <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">
                  VinhWorks Team
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-12 text-xl font-medium leading-relaxed text-slate-600">
                Bạn có ý tưởng? Chúng tôi có giải pháp.{" "}
                <br className="hidden md:block" />
                Hãy để lại lời nhắn, chúng tôi sẽ phản hồi ngay lập tức.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= CONTACT FORM & INFO ================= */}
        <section className="relative z-10 py-20">
          <div className="container max-w-6xl px-6 mx-auto">
            <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-12">
              {/* LEFT: FORM CARD (7 cols) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative lg:col-span-7"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-[2rem] blur opacity-20" />
                <div className="relative bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-100">
                  <div className="mb-8">
                    <h2 className="mb-2 text-2xl font-black text-slate-900">
                      Gửi tin nhắn cho chúng tôi
                    </h2>
                    <p className="text-slate-500">
                      Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong
                      vòng 24h.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">
                          Họ tên *
                        </label>
                        <div className="relative group">
                          <User
                            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-purple-600"
                            size={20}
                          />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nguyễn Văn A"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none font-medium text-slate-900"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">
                          Email *
                        </label>
                        <div className="relative group">
                          <Mail
                            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-purple-600"
                            size={20}
                          />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@domain.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none font-medium text-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Chủ đề
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Tôi muốn tư vấn về..."
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none font-medium text-slate-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Nội dung tin nhắn *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mô tả chi tiết yêu cầu của bạn..."
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none font-medium text-slate-900 resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-xl hover:shadow-xl disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} /> Đang
                          gửi...
                        </>
                      ) : (
                        <>
                          <Send size={20} /> Gửi ngay
                        </>
                      )}
                    </motion.button>

                    {/* Trust Badges inside form */}
                    <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-100">
                      {features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-medium text-slate-500"
                        >
                          <feature.icon size={14} className={feature.color} />
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* RIGHT: INFO & MAP (5 cols) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8 lg:col-span-5"
              >
                {/* Contact Info Grid */}
                <div className="space-y-4">
                  {contactInfo.map((info, idx) => (
                    <ContactCard key={idx} info={info} index={idx} />
                  ))}
                </div>

                {/* Map Embed */}
                <div className="relative h-64 rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.924403805594!2d107.09567831540247!3d20.95666799312065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a583e6676361b%3A0x751657366b670769!2sHa%20Long%2C%20Quang%20Ninh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647856789012!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="transition-all duration-500 grayscale hover:grayscale-0"
                  />
                  <div className="absolute px-4 py-2 text-xs font-bold bg-white rounded-lg shadow-md pointer-events-none bottom-4 left-4 text-slate-700">
                    📍 Trụ sở chính
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 pt-4">
                  <a
                    href="#"
                    className="p-3 transition-all bg-white border rounded-full border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-3 transition-all bg-white border rounded-full border-slate-200 text-slate-400 hover:text-pink-600 hover:border-pink-200 hover:shadow-md"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-3 transition-all bg-white border rounded-full border-slate-200 text-slate-400 hover:text-blue-700 hover:border-blue-200 hover:shadow-md"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
