'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Avatar from './Avatar';
import { Bell, ChevronDown, LogOut, Settings, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HeaderProps = {
  onToggleSidebar?: () => void;
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUser(); // ✅ Lấy thông tin user từ context
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 border-b rounded-md shadow-md h-14 bg-black/30 border-white/10 backdrop-blur-md md:px-6">
      <motion.div
        className="flex items-center gap-2 text-base font-bold text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button
          onClick={onToggleSidebar}
          className="p-2 mr-1 text-white rounded md:hidden hover:bg-white/10"
        >
          <Menu size={20} />
        </button>

        <span className="text-teal-400 animate-pulse">⚙️</span>
        <span className="block md:hidden">Admin</span>
        <span className="hidden md:block">Trung tâm quản trị VinhWorks</span>
      </motion.div>

      <div className="relative flex items-center gap-4">
        <button className="relative p-2 text-white transition hover:text-teal-400">
          <Bell size={20} />
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1 animate-ping"></span>
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
        </button>

        <div className="relative">
          <button
            className="flex items-center gap-2 text-sm"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <Avatar size={32} />
            <span className="text-white">{user?.name || 'Admin'}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 z-50 w-48 mt-2 overflow-hidden text-sm text-white bg-gray-800 border rounded-lg shadow-lg border-white/10"
              >
                <li>
                  <a href="/admin/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700">
                    <User size={16} /> Trang cá nhân
                  </a>
                </li>
                <li>
                  <a href="/admin/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700">
                    <Settings size={16} /> Cài đặt
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-left hover:bg-red-600"
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
