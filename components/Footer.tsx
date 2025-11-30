"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Monitor,
  ArrowUp,
  Send,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  Globe,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Data cấu trúc theo cột chuyên nghiệp
  const solutions = [
    { name: "Thiết kế Website UI/UX", href: "#" },
    { name: "Phát triển Web App", href: "#" },
    { name: "Giải pháp E-commerce", href: "#" },
    { name: "Mobile Application", href: "#" },
    { name: "SEO & Digital Marketing", href: "#" },
    { name: "Cloud & DevOps", href: "#", isNew: true },
  ];

  const company = [
    { name: "Về VinhWorks", href: "/about" },
    { name: "Hồ sơ năng lực", href: "/portfolio" },
    { name: "Khách hàng & Đối tác", href: "/partners" },
    { name: "Tuyển dụng nhân tài", href: "/careers", badge: "Hiring" },
    { name: "Tin tức công nghệ", href: "/blog" },
    { name: "Liên hệ hỗ trợ", href: "/contact" },
  ];

  const legal = [
    { name: "Điều khoản sử dụng", href: "/terms" },
    { name: "Chính sách bảo mật", href: "/privacy" },
    { name: "Chính sách thanh toán", href: "/payment-policy" },
    { name: "Khiếu nại & Hoàn tiền", href: "/refund" },
  ];

  return (
    <footer className="relative pt-20 font-sans border-t bg-gradient-to-b from-white via-orange-50/40 to-rose-50/60 text-slate-600 border-orange-100/50">
      {/* Decorative Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 opacity-80" />

      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* COLUMN 1: BRAND & SOCIALS (Col-span-3) */}
          <div className="space-y-6 lg:col-span-3">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative flex items-center justify-center w-12 h-12 text-white transition-transform duration-300 shadow-lg bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl group-hover:rotate-6">
                <Monitor size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">
                  VinhWorks
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                  Tech Solutions
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-500">
              Đối tác tin cậy trong chuyển đổi số. Chúng tôi cung cấp giải pháp
              công nghệ toàn diện, từ ý tưởng đến vận hành thực tế.
            </p>

            <div className="flex gap-3">
              {[Facebook, Linkedin, Twitter, Youtube].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-orange-500 hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: SOLUTIONS (Col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="pb-1 mb-6 text-sm font-bold tracking-wider uppercase border-b-2 border-orange-200 text-slate-900 w-fit">
              Giải pháp & Dịch vụ
            </h3>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center text-sm font-medium transition-colors group hover:text-orange-600"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-2 text-orange-300 transition-colors group-hover:text-orange-500"
                    />
                    {item.name}
                    {item.isNew && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                        NEW
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: COMPANY (Col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="pb-1 mb-6 text-sm font-bold tracking-wider uppercase border-b-2 text-slate-900 border-rose-200 w-fit">
              Về công ty
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center text-sm font-medium transition-colors group hover:text-rose-600"
                  >
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold text-orange-600 bg-orange-100 border border-orange-200 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mini Certification Badge Area */}
            <div className="pt-6 mt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: CONTACT & NEWSLETTER (Col-span-3) */}
          <div className="space-y-6 lg:col-span-3">
            {/* Contact Info Block */}
            <div>
              <h3 className="pb-1 mb-6 text-sm font-bold tracking-wider uppercase border-b-2 text-slate-900 border-amber-200 w-fit">
                Trụ sở chính
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-orange-500 shrink-0 mt-0.5"
                  />
                  <span className="text-slate-600">
                    Tầng 5, Tòa nhà TechHub, TP. Hạ Long, Quảng Ninh, Việt Nam
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-orange-500 shrink-0" />
                  <a
                    href="tel:0971386588"
                    className="font-bold text-slate-700 hover:text-orange-600"
                  >
                    0971 386 588
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-orange-500 shrink-0" />
                  <a
                    href="mailto:contact@vinhworks.com"
                    className="text-slate-600 hover:text-orange-600"
                  >
                    contact@vinhworks.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={18} className="text-orange-500 shrink-0" />
                  <span className="text-xs text-slate-500">
                    Thứ 2 - Thứ 6: 8:00 - 17:30
                  </span>
                </li>
              </ul>
            </div>

            {/* Compact Newsletter */}
            <div className="p-4 bg-white border shadow-sm border-slate-200 rounded-2xl">
              <p className="mb-2 text-xs font-bold text-slate-700">
                Đăng ký nhận báo giá & tài liệu
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email doanh nghiệp..."
                  className="w-full px-3 py-2 text-xs transition-all border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:border-orange-400"
                />
                <button className="p-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: COPYRIGHT & LEGAL & PAYMENTS */}
        <div className="py-8 mt-16 border-t border-slate-200">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Left: Copyright */}
            <div className="text-center md:text-left">
              <p className="text-xs font-medium text-slate-500">
                © {new Date().getFullYear()}{" "}
                <span className="font-bold text-slate-700">
                  VinhWorks Technology JSC
                </span>
                . All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs md:justify-start text-slate-400">
                {legal.map((l) => (
                  <Link
                    key={l.name}
                    href={l.href}
                    className="transition-all hover:text-orange-500 hover:underline"
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Payment & Global */}
            <div className="flex flex-col items-center gap-3 md:items-end">
              <div className="flex items-center gap-2">
                {/* Fake Payment Icons */}
                <div className="flex gap-2 transition-all duration-300 opacity-70 grayscale hover:grayscale-0">
                  <div className="h-6 w-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">
                    VISA
                  </div>
                  <div className="h-6 w-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">
                    MC
                  </div>
                  <div className="h-6 w-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">
                    MOMO
                  </div>
                  <div className="h-6 w-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">
                    ATM
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full text-slate-400 bg-slate-50">
                <Globe size={12} />
                <span>Vietnam (Tiếng Việt)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed z-40 p-3 text-white transition-colors duration-300 shadow-xl bottom-6 right-6 rounded-xl bg-slate-800 hover:bg-orange-500"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
