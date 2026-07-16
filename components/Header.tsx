"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, Settings, User, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useLanguage } from "@/hooks/useLanguage";
import { useUser } from "@/contexts/UserContext";
import { text } from "@/libs/text";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useUser();
  const { lang } = useLanguage();
  const t = text[lang];

  const navigation = [
    { label: t.home, href: "/" },
    { label: t.about, href: "/about" },
    { label: t.services, href: "/services" },
    { label: t.projects, href: "/projects" },
    { label: lang === "vi" ? "Bảng giá" : "Pricing", href: "/pricing" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const contactActive = pathname === "/contact";
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const closeAccount = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) setAccountOpen(false);
    };
    document.addEventListener("mousedown", closeAccount);
    return () => document.removeEventListener("mousedown", closeAccount);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[74px] border-b border-zinc-900 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-[0_8px_30px_rgba(24,24,27,.08)] backdrop-blur-xl" : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="VinhWorks - Trang chủ" className="group flex min-h-11 shrink-0 items-center">
          <BrandLogo priority className="h-8 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-9" />
        </Link>

        <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex h-full items-center px-3 text-[11px] font-extrabold uppercase tracking-[.12em] transition-colors ${
                  active ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={`absolute inset-x-3 bottom-0 h-[3px] origin-left bg-[#ffb21c] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
                {active && <span className="absolute right-1 top-[22px] h-1.5 w-1.5 rounded-full bg-[#ffb21c]" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            aria-current={contactActive ? "page" : undefined}
            className={`hidden min-h-11 items-center border border-zinc-900 px-5 py-2.5 text-xs font-black transition-all hover:-translate-y-0.5 sm:flex ${
              contactActive
                ? "bg-zinc-950 text-white shadow-[3px_3px_0_#ffb21c]"
                : "bg-[#ffb21c] text-zinc-950 shadow-[3px_3px_0_#18181b]"
            }`}
          >
            {t.contact}
          </Link>

          {user ? (
            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex min-h-11 items-center gap-2 border border-zinc-900 bg-white px-3 py-2 text-xs font-bold transition-colors hover:bg-amber-50"
                aria-label="Mở menu tài khoản"
                aria-expanded={accountOpen}
              >
                <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-zinc-900 bg-[#ffb21c] text-[10px] font-black">
                  {user.avatar ? (
                    <Image src={user.avatar} alt={`Ảnh đại diện ${user.name}`} fill sizes="28px" className="object-cover" unoptimized />
                  ) : (
                    userInitial
                  )}
                </span>
                <span className="hidden max-w-24 truncate sm:inline">{user.name}</span>
                <ChevronDown size={14} className={accountOpen ? "rotate-180" : ""} />
              </button>
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-48 border border-zinc-900 bg-white p-2 shadow-[5px_5px_0_#ffb21c]"
                  >
                    <Link href="/profile" className="flex min-h-11 items-center gap-2 px-3 text-sm hover:bg-amber-50">
                      <User size={15} /> Hồ sơ
                    </Link>
                    <Link href="/settings" className="flex min-h-11 items-center gap-2 px-3 text-sm hover:bg-amber-50">
                      <Settings size={15} /> Cài đặt
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex min-h-11 w-full items-center gap-2 px-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={15} /> Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className={`hidden min-h-11 items-center text-xs font-bold transition-colors hover:text-[#9a4f00] sm:flex ${
                pathname === "/login" ? "text-[#9a4f00]" : ""
              }`}
            >
              {t.login}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-11 w-11 place-items-center border border-zinc-900 bg-white transition-colors hover:bg-[#ffb21c] lg:hidden"
            aria-label="Mở menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-[73px] grid border-b border-zinc-900 bg-[#fff9ed] p-5 shadow-xl lg:hidden"
            aria-label="Điều hướng mobile"
          >
            {navigation.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center border-b border-zinc-300 px-3 text-sm font-black ${
                    active ? "bg-[#ffb21c] text-zinc-950" : ""
                  }`}
                >
                  <span className={`mr-4 ${active ? "text-zinc-950" : "text-[#9a4f00]"}`}>0{index + 1}</span>
                  {item.label}
                  {active && <span className="ml-auto h-2 w-2 rounded-full bg-zinc-950" />}
                </Link>
              );
            })}
            <Link
              href="/contact"
              aria-current={contactActive ? "page" : undefined}
              className={`mt-4 flex min-h-11 items-center justify-center border border-zinc-900 p-3 text-sm font-black ${
                contactActive
                  ? "bg-zinc-950 text-white shadow-[3px_3px_0_#ffb21c]"
                  : "bg-[#ffb21c] text-zinc-950 shadow-[3px_3px_0_#18181b]"
              }`}
            >
              {t.contact}
            </Link>
            {!user && (
              <div className="mt-4 flex gap-3">
                <Link href="/login" className="flex min-h-11 flex-1 items-center justify-center border border-zinc-900 bg-white p-3 text-center text-sm font-bold">
                  {t.login}
                </Link>
                <Link href="/register" className="flex min-h-11 flex-1 items-center justify-center border border-zinc-900 bg-[#ffb21c] p-3 text-center text-sm font-bold">
                  {t.register}
                </Link>
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
