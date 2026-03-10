"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Mail,
  Send,
  Loader2,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  User,
  Zap,
  Github,
  ShieldCheck,
  Star,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import emailjs from "emailjs-com";

// --- DATA ---
const contactInfo = [
  {
    icon: Phone,
    title: "Hotline tư vấn",
    value: "0971 386 588",
    link: "tel:0971386588",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
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
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    value: "8:00 - 22:00 (T2 - CN)",
    link: "#",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

const features = [
  { icon: Zap, text: "Phản hồi < 30p", color: "text-orange-500" },
  { icon: ShieldCheck, text: "Bảo mật 100%", color: "text-pink-500" },
  { icon: Star, text: "Tư vấn miễn phí", color: "text-purple-500" },
  { icon: Globe, text: "Hỗ trợ Online", color: "text-violet-500" },
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
      <h4 className="text-sm font-bold text-slate-900 mb-0.5 group-hover:text-orange-600 transition-colors">
        {info.title}
      </h4>
      <p className="text-sm font-medium text-slate-500">{info.value}</p>
    </div>
  </motion.a>
);

// --- MAIN CLIENT COMPONENT ---
export default function ContactClient() {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
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

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-10 pb-8 md:pt-8">
          {/* Background Blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-orange-300/20 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-300/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="container relative z-10 max-w-6xl px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {/* Badge — gọn như About page */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold text-orange-600 border border-orange-100 rounded-full shadow-sm bg-white/80 ring-1 ring-orange-100 backdrop-blur-md">
                <MessageCircle size={14} className="fill-orange-500" />
                <span>Hỗ trợ 24/7</span>
              </div>

              {/* Tiêu đề — nhỏ hơn trên mobile, giữ nguyên trên desktop */}
              <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-4 leading-[1.1]">
                Kết nối cùng <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
                  VinhWorks Team
                </span>
              </h1>

              {/* Mô tả — gọn 2 dòng trên mobile */}
              <p className="max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed text-slate-500 mb-6">
                Bạn có ý tưởng?{" "}
                <span className="text-slate-700 font-semibold">
                  Chúng tôi có giải pháp.
                </span>
                <br className="hidden md:block" />
                <span className="block mt-1 md:mt-0">
                  Hãy để lại lời nhắn — phản hồi ngay lập tức.
                </span>
              </p>

              {/* ✨ THÊM MỚI: 2 nút CTA ngang — kiểu About page */}
              <div className="flex items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
                <a
                  href="#contact-form"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-md hover:shadow-orange-200 hover:shadow-lg hover:opacity-95 transition-all active:scale-95"
                >
                  <MessageCircle size={15} />
                  Liên hệ ngay
                </a>
                <a
                  href="tel:+84xxxxxxxxx"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white/80 text-slate-700 text-sm font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-95 backdrop-blur-sm"
                >
                  <Phone size={15} className="text-orange-500" />
                  Gọi ngay
                </a>
              </div>

              {/* ✨ THÊM MỚI: Social icons nhỏ bên dưới — như About page */}
              <div className="flex items-center gap-4 mt-5 text-slate-400">
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <span className="w-px h-4 bg-slate-200" />
                <a
                  href="#"
                  className="hover:text-violet-500 transition-colors"
                  aria-label="Github"
                >
                  <Github size={18} />
                </a>
                <span className="w-px h-4 bg-slate-200" />
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <span className="w-px h-4 bg-slate-200" />
                <a
                  href="#"
                  className="hover:text-orange-500 transition-colors"
                  aria-label="Website"
                >
                  <Globe size={18} />
                </a>
                <span className="w-px h-4 bg-slate-200" />
                {/* Zalo — dùng SVG vì lucide không có icon Zalo */}
                <a
                  href="https://zalo.me/0xxxxxxxxx"
                  className="hover:text-blue-500 transition-colors"
                  aria-label="Zalo"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                  >
                    <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4.5 28.5H16v-13h3.5v13zm-1.75-14.75a2 2 0 110-4 2 2 0 010 4zM34 32.5h-3.3l-4.2-6v6H23v-13h3.3l4.2 6.1v-6.1H34v13z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= CONTACT FORM & INFO ================= */}
        <section className="relative z-10 py-8">
          <div className="container max-w-6xl px-4 sm:px-6 mx-auto">
            <div className="grid items-start grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12">
              {/* LEFT: FORM CARD (7 cols) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative lg:col-span-7"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 rounded-[2rem] blur opacity-20" />
                <div className="relative bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-100">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="mb-1.5 text-xl sm:text-2xl font-black text-slate-900">
                      Gửi tin nhắn cho chúng tôi
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500">
                      Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong
                      vòng 24h.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">
                          Họ tên *
                        </label>
                        <div className="relative group">
                          <User
                            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-orange-500"
                            size={18}
                          />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nguyễn Văn A"
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all outline-none text-sm font-medium text-slate-900"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">
                          Email *
                        </label>
                        <div className="relative group">
                          <Mail
                            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-orange-500"
                            size={18}
                          />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@domain.com"
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all outline-none text-sm font-medium text-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700">
                        Chủ đề
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Tôi muốn tư vấn về..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all outline-none text-sm font-medium text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700">
                        Nội dung tin nhắn *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mô tả chi tiết yêu cầu của bạn..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all outline-none text-sm font-medium text-slate-900 resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="flex items-center justify-center w-full gap-2 py-3.5 text-sm font-bold text-white transition-all shadow-md bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl hover:shadow-orange-200 hover:shadow-lg disabled:opacity-70 active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} /> Đang
                          gửi...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Gửi ngay
                        </>
                      )}
                    </motion.button>

                    <div className="grid grid-cols-2 gap-3 pt-5 mt-1 border-t border-slate-100">
                      {features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-medium text-slate-500"
                        >
                          <feature.icon size={13} className={feature.color} />
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
                className="space-y-6 lg:space-y-8 lg:col-span-5"
              >
                <div className="space-y-3 sm:space-y-4">
                  {contactInfo.map((info, idx) => (
                    <ContactCard key={idx} info={info} index={idx} />
                  ))}
                </div>

                {/* Map */}
                <div className="relative h-48 sm:h-64 rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.924403805594!2d107.09567831540247!3d20.95666799312065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a583e6676361b%3A0x751657366b670769!2sHa%20Long%2C%20Quang%20Ninh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647856789012!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="transition-all duration-500 grayscale hover:grayscale-0"
                  />
                  <div className="absolute px-3 py-1.5 text-xs font-bold bg-white rounded-lg shadow-md pointer-events-none bottom-3 left-3 text-slate-700">
                    📍 Trụ sở chính
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
