"use client";

import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Laptop2,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative px-6 pt-16 pb-10 text-gray-400 bg-gradient-to-b from-gray-950 via-black to-gray-950">
      {/* Logo chính giữa */}
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <div className="flex items-center gap-3 mb-2">
          <div className="px-2 py-1 text-xl font-bold text-black bg-white rounded shadow">
            <Laptop2 size={20} />
          </div>
          <h2 className="text-2xl font-extrabold text-white">VinhWorks</h2>
        </div>
        <p className="max-w-md text-sm text-gray-400">
          Thiết kế & phát triển website chuẩn SEO – hiện đại, tối ưu, dễ mở rộng 🚀
        </p>
      </div>

      {/* Grid 4 cột trung tâm */}
      <div className="grid grid-cols-1 gap-10 mx-auto text-center max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {/* Cột 1: Liên hệ */}
        <div className="flex flex-col items-center">
          <h3 className="mb-3 text-sm font-semibold text-white uppercase">Liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start justify-center gap-2">
              <Phone size={16} className="mt-0.5 text-teal-400" />
              <a href="tel:0971386588" className="hover:text-white hover:underline">
                0971 386 588
              </a>
            </li>
            <li className="flex items-start justify-center gap-2">
              <Mail size={16} className="mt-0.5 text-teal-400" />
              <a href="mailto:luongvinh02122003@gmail.com" className="hover:text-white hover:underline">
                luongvinh02122003@gmail.com
              </a>
            </li>
            <li className="flex items-start justify-center gap-2">
              <MapPin size={16} className="mt-0.5 text-teal-400" />
              TP. Hạ Long, Quảng Ninh
            </li>
          </ul>
        </div>

        {/* Cột 2: Dịch vụ */}
        <div className="flex flex-col items-center">
          <h3 className="mb-3 text-sm font-semibold text-white uppercase">Dịch vụ</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/services" className="hover:text-white hover:underline">Thiết kế website</a></li>
            <li><a href="/services" className="hover:text-white hover:underline">Chuẩn SEO & hiệu suất</a></li>
            <li><a href="/services" className="hover:text-white hover:underline">Bảo trì & nâng cấp</a></li>
          </ul>
        </div>

        {/* Cột 3: Liên kết */}
        <div className="flex flex-col items-center">
          <h3 className="mb-3 text-sm font-semibold text-white uppercase">Liên kết</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/blog" className="hover:text-white hover:underline">Tin tức & Blog</a></li>
            <li><a href="/contact" className="hover:text-white hover:underline">Liên hệ</a></li>
            <li><a href="/login" className="hover:text-white hover:underline">Đăng nhập</a></li>
            <li><a href="/register" className="hover:text-white hover:underline">Đăng ký</a></li>
          </ul>
        </div>

        {/* Cột 4: Social & Subscribe */}
        <div className="flex flex-col items-center">
          <h3 className="mb-3 text-sm font-semibold text-white uppercase">Kết nối</h3>
          <div className="flex items-center gap-4 mb-4">
            <a href="#" className="hover:text-blue-500"><Facebook size={18} /></a>
            <a href="#" className="hover:text-pink-500"><Instagram size={18} /></a>
            <a href="#" className="hover:text-sky-500"><Linkedin size={18} /></a>
          </div>

          <h4 className="mb-2 text-sm font-medium text-white">Nhận thông tin mới</h4>
          <form className="flex flex-col items-center w-full gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Nhập email..."
              className="w-full px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white transition-all rounded bg-gradient-to-r from-teal-500 to-blue-500 hover:scale-105 hover:shadow"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="pt-6 mt-12 text-sm text-center text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} VinhWorks. Tất cả quyền được bảo lưu.
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-2 text-white bg-teal-500 rounded-full shadow bottom-5 right-5 hover:bg-teal-400"
          aria-label="Lên đầu trang"
        >
          ↑
        </button>
      )}
    </footer>
  );
};
