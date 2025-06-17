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
  Globe,
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { user, setUser } = useUser();
  const { lang, setLang } = useLanguage();
  const t = text[lang];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user when mount
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

  // Close dropdown & menu on outside click
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/98 backdrop-blur-2xl shadow-2xl border-b border-purple-500/30"
          : "bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20"
      }`}
    >
      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 animate-pulse" />
      </div>

      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Enhanced Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold tracking-wide group"
          >
            <div className="relative">
              <div className="absolute inset-0 transition-opacity opacity-50 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg group-hover:opacity-75 animate-pulse" />
              <div className="absolute inset-0 transition-opacity opacity-75 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-sm group-hover:opacity-100" />
              <span className="relative flex items-center justify-center w-12 h-12 text-white shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl">
                <Monitor size={24} />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text">
                VinhWorks
              </span>
              <span className="-mt-1 text-xs font-normal text-gray-400">
                Tech Solutions
              </span>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Enhanced Desktop Navigation */}
        <nav className="items-center hidden gap-2 md:flex">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 rounded-xl group hover:text-white"
                >
                  <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-xl group-hover:opacity-100" />
                  <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-xl blur-sm group-hover:opacity-100" />

                  <span className="relative flex items-center gap-2">
                    <IconComponent
                      size={16}
                      className="transition-transform group-hover:scale-110"
                    />
                    {item.label}
                  </span>

                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
                </Link>
              </motion.div>
            );
          })}

          {/* Enhanced User Section */}
          {user ? (
            <motion.div
              className="relative ml-6"
              ref={dropdownRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 border rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border-purple-400/30 hover:border-purple-400/50 backdrop-blur-sm shadow-lg"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full opacity-75 bg-gradient-to-r from-purple-400 to-pink-400 blur-sm" />
                  <div className="relative flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <span className="truncate max-w-28">{user.name}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 z-50 mt-3 overflow-hidden border shadow-2xl w-52 rounded-2xl bg-slate-800/95 backdrop-blur-2xl border-purple-400/20"
                  >
                    <div className="p-2">
                      <div className="px-4 py-3 border-b border-purple-400/20">
                        <p className="text-sm font-medium text-white">
                          {user.name}
                        </p>
                        {/* Fixed: Sử dụng optional chaining */}
                        {user?.email && (
                          <p className="text-xs text-gray-400">{user.email}</p>
                        )}
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition-all duration-200 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20"
                        >
                          <User size={16} />
                          Thông tin cá nhân
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition-all duration-200 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20"
                        >
                          <Settings size={16} />
                          Cài đặt
                        </Link>
                      </div>
                      <div className="pt-2 border-t border-purple-400/20">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-red-400 transition-all duration-200 rounded-xl hover:text-red-300 hover:bg-red-500/10"
                        >
                          <LogOut size={16} />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-4 ml-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10"
              >
                {t.login}
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
                >
                  {t.register}
                </Link>
              </motion.div>

              <div className="relative">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as "vi" | "en")}
                  className="px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 border rounded-xl appearance-none cursor-pointer bg-slate-700/50 border-purple-400/30 hover:border-purple-400/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                >
                  <option value="vi" className="bg-slate-800">
                    🇻🇳 VN
                  </option>
                  <option value="en" className="bg-slate-800">
                    🇺🇸 EN
                  </option>
                </select>
                <Globe className="absolute w-4 h-4 text-purple-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
            </motion.div>
          )}
        </nav>

        {/* Enhanced Mobile Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="relative p-3 text-white transition-all duration-300 border shadow-lg rounded-xl md:hidden bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 hover:border-purple-400/50"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="z-50 px-6 pt-4 pb-6 border-t md:hidden bg-slate-900/98 backdrop-blur-2xl border-purple-500/20"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-300 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20"
                    >
                      <IconComponent size={18} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-4 mt-4 border-t border-purple-500/20">
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-4 px-4 py-3 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        {/* Fixed: Sử dụng optional chaining */}
                        {user?.email && (
                          <p className="text-xs text-gray-400">{user.email}</p>
                        )}
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 text-sm text-gray-300 transition-all duration-300 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20"
                    >
                      <User size={18} />
                      Thông tin cá nhân
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full gap-4 px-4 py-3 text-sm text-red-400 transition-all duration-300 rounded-xl hover:text-red-300 hover:bg-red-500/10"
                    >
                      <LogOut size={18} />
                      Đăng xuất
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-3"
                  >
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-300 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20"
                    >
                      {t.login}
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-center text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {t.register}
                    </Link>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4"
                >
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as "vi" | "en")}
                    className="w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 border appearance-none rounded-xl bg-slate-700/50 border-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    <option value="vi" className="bg-slate-800">
                      🇻🇳 Tiếng Việt
                    </option>
                    <option value="en" className="bg-slate-800">
                      🇺🇸 English
                    </option>
                  </select>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
