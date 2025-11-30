"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Monitor,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Sparkles,
  Home,
  Zap,
  Wrench,
  Rocket,
  Diamond,
  FileText,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { text } from "@/libs/text";
import { useUser } from "@/contexts/UserContext";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { user, setUser } = useUser();
  const { lang } = useLanguage(); // Đã bỏ setLang vì không dùng nút đổi ngôn ngữ nữa
  const t = text[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (data.user) setUser(data.user);
        else setUser(null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.reload();
  };

  const navItems = [
    { label: t.home, href: "/", icon: Home },
    { label: t.about, href: "/about", icon: Zap },
    { label: t.services, href: "/services", icon: Wrench },
    { label: t.projects, href: "/projects", icon: Rocket },
    {
      label: lang === "vi" ? "Bảng giá" : "Pricing",
      href: "/pricing",
      icon: Diamond,
    },
    { label: t.blog, href: "/blog", icon: FileText },
    { label: t.contact, href: "/contact", icon: Phone },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          marginTop: scrolled ? "1rem" : "0rem",
          maxWidth: scrolled ? "95%" : "100%", // Để rộng hơn chút cho thoáng
          borderRadius: scrolled ? "9999px" : "0px",
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
            : "bg-white/70 backdrop-blur-lg border-b border-white/30"
        }`}
      >
        {/* Background Mesh Gradient: Vàng - Cam - Hồng Phấn */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
          <div className="absolute -top-[50%] -left-[10%] w-[60%] h-[200%] bg-gradient-to-r from-orange-100/40 to-amber-100/40 blur-3xl rotate-12" />
          <div className="absolute -bottom-[50%] -right-[10%] w-[60%] h-[200%] bg-gradient-to-l from-rose-100/40 to-pink-100/40 blur-3xl -rotate-12" />
        </div>

        <div
          className={`flex items-center justify-between mx-auto max-w-7xl ${
            scrolled ? "px-8 py-2.5" : "px-6 py-4"
          }`}
        >
          {/* Logo Section: Tone Cam Vàng */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative z-10 flex-shrink-0"
          >
            <Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold tracking-wide group"
            >
              <div className="relative">
                <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-xl blur-lg group-hover:opacity-40" />
                <span className="relative flex items-center justify-center w-10 h-10 text-white transition-transform duration-300 shadow-lg bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 rounded-xl group-hover:rotate-3">
                  <Monitor size={20} />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-transparent bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text">
                  VinhWorks
                </span>
                {!scrolled && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="-mt-0.5 text-[10px] font-bold text-orange-300/80 uppercase tracking-widest"
                  >
                    Tech Solutions
                  </motion.span>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-white/50 p-1.5 rounded-full border border-white shadow-sm relative z-10 mx-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = hoveredPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className="relative px-3.5 py-2 text-sm font-medium transition-colors rounded-full group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                      className="absolute inset-0 border rounded-full shadow-sm bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100/50"
                      style={{ borderRadius: 9999 }}
                    />
                  )}

                  <span
                    className={`relative flex items-center gap-1.5 transition-colors duration-200 z-10 ${
                      isActive
                        ? "text-orange-600 font-bold"
                        : "text-slate-500 group-hover:text-orange-500"
                    }`}
                  >
                    <IconComponent
                      size={15}
                      className={`transition-transform duration-200 ${
                        isActive
                          ? "scale-110 stroke-orange-500"
                          : "scale-100 opacity-70 group-hover:opacity-100"
                      }`}
                    />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User & Actions Section */}
          <div className="relative z-10 flex items-center flex-shrink-0 gap-3">
            {/* Đã xóa phần chuyển đổi ngôn ngữ */}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center gap-2 py-1 pl-1 pr-3 transition-all bg-white border border-orange-100 rounded-full shadow-sm hover:shadow-md hover:border-orange-200"
                >
                  <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden border-2 border-white rounded-full shadow-inner bg-gradient-to-br from-orange-100 to-rose-100">
                    <span className="text-sm font-bold text-orange-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-orange-300 transition-transform duration-300 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-60 overflow-hidden bg-white/95 backdrop-blur-2xl border border-orange-100 rounded-3xl shadow-[0_20px_50px_-12px_rgba(249,115,22,0.15)]"
                    >
                      <div className="p-4 border-b border-orange-100 bg-gradient-to-br from-orange-50 to-rose-50">
                        <p className="text-sm font-bold text-slate-800">
                          {user.name}
                        </p>
                        {user?.email && (
                          <p className="text-xs text-slate-500">{user.email}</p>
                        )}
                      </div>
                      <div className="p-2 space-y-1">
                        {[
                          { label: "Hồ sơ", icon: User, href: "/profile" },
                          {
                            label: "Cài đặt",
                            icon: Settings,
                            href: "/settings",
                          },
                        ].map((menuItem) => (
                          <Link
                            key={menuItem.href}
                            href={menuItem.href}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            <menuItem.icon size={16} />
                            {menuItem.label}
                          </Link>
                        ))}
                        <div className="h-px my-1 bg-slate-100" />
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
                        >
                          <LogOut size={16} />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden px-5 py-2 text-sm font-bold transition-colors md:block text-slate-500 hover:text-orange-500"
                >
                  {t.login}
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/register"
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-full shadow-lg shadow-orange-400/30 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:brightness-105 transition-all"
                  >
                    <Sparkles size={14} className="text-yellow-100" />
                    {t.register}
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(!open)}
              className="p-2 transition-colors bg-white border rounded-full text-slate-500 border-slate-100 md:hidden hover:bg-orange-50 hover:text-orange-500 hover:border-orange-100"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 p-6 bg-white/95 backdrop-blur-3xl rounded-3xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] md:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-3 font-medium rounded-2xl hover:bg-orange-50 text-slate-600 group"
                  >
                    <div className="p-2 transition-all bg-slate-50 rounded-xl text-slate-400 group-hover:text-orange-500 group-hover:bg-white group-hover:shadow-sm">
                      <item.icon size={20} />
                    </div>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile User Actions */}
            <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-slate-100">
              {!user && (
                <>
                  <Link
                    href="/login"
                    className="w-full py-3 font-bold text-center text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100"
                  >
                    {t.login}
                  </Link>
                  <Link
                    href="/register"
                    className="w-full py-3 font-bold text-center text-white shadow-lg bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-orange-500/20"
                  >
                    {t.register}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
