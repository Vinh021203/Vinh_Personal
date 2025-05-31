'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Laptop2, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { text } from '@/libs/text';
import { useUser } from '@/contexts/UserContext';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { user, setUser } = useUser();
  const { lang, setLang } = useLanguage();
  const t = text[lang];

  // Load user when mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' });
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.reload();
  };

  const navItems = [
    { label: t.home, href: '/' },
    { label: t.about, href: '/about' },
    { label: t.services, href: '/services' },
    { label: t.projects, href: '/projects' },
    { label: lang === 'vi' ? 'Bảng giá' : 'Pricing', href: '/pricing' },
    { label: t.blog, href: '/blog' },
    { label: t.contact, href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white shadow bg-black/80 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <span className="flex items-center justify-center p-2 text-black bg-white rounded shadow">
            <Laptop2 size={20} />
          </span>
          VinhWorks
        </Link>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition hover:text-teal-300"
            >
              {item.label}
            </Link>
          ))}

          {/* Desktop User Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white transition rounded hover:bg-white/10"
              >
                {user.name}
                <ChevronDown size={16} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 z-50 mt-2 overflow-hidden text-black bg-white rounded shadow-lg w-44 animate-fade-in">
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-6">
              <Link href="/login" className="text-sm hover:text-teal-300">{t.login}</Link>
              <Link href="/register" className="px-4 py-1 text-sm font-semibold text-black transition bg-white rounded-full hover:bg-gray-100">{t.register}</Link>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as 'vi' | 'en')}
                className="px-3 py-1 text-sm font-medium text-black bg-white border border-gray-300 rounded"
              >
                <option value="vi">🇻🇳 VN</option>
                <option value="en">🇺🇸 EN</option>
              </select>
            </div>
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <button onClick={() => setOpen(!open)} className="text-white md:hidden">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          className="z-50 px-6 pt-2 pb-4 border-t md:hidden bg-black/90 backdrop-blur border-white/10 animate-slide-down"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium transition hover:text-teal-300"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setOpen(false)} className="text-sm">
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-left text-red-300 hover:underline"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm hover:text-teal-300">
                    {t.login}
                  </Link>
                  <Link href="/register" className="text-sm hover:text-teal-300">
                    {t.register}
                  </Link>
                </>
              )}
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as 'vi' | 'en')}
                className="w-full px-3 py-1 text-sm font-medium text-black bg-white border border-gray-300 rounded"
              >
                <option value="vi">🇻🇳 VN</option>
                <option value="en">🇺🇸 EN</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
