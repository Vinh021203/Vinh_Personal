'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Settings, Bell, Paintbrush, Save, RefreshCcw, Moon, Sun
} from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [themeColor, setThemeColor] = useState('teal');

  useEffect(() => {
    const saved = localStorage.getItem('settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setDarkMode(parsed.darkMode);
      setNotificationsEnabled(parsed.notificationsEnabled);
      setThemeColor(parsed.themeColor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'settings',
      JSON.stringify({ darkMode, notificationsEnabled, themeColor })
    );
  }, [darkMode, notificationsEnabled, themeColor]);

  const handleSave = () => {
    toast.success('✅ Đã lưu cài đặt thành công!');
  };

  const handleReset = () => {
    setDarkMode(false);
    setNotificationsEnabled(true);
    setThemeColor('teal');
    toast('🔄 Đã đặt lại mặc định!');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl px-4 mx-auto"
    >
      <Toaster position="top-right" />

      {/* Tiêu đề */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="p-2 bg-teal-500 rounded-lg shadow-lg"
        >
          <Settings size={22} className="text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-white">
          Trang <span className="text-teal-400">Cài đặt hệ thống</span>
        </h1>
      </div>

      {/* Form Settings */}
      <div className="grid grid-cols-1 gap-6 p-6 border md:grid-cols-2 bg-white/5 rounded-xl border-white/10">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-3 text-white">
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            Chế độ {darkMode ? 'Tối' : 'Sáng'}
          </label>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-600"
          >
            Chuyển
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-3 text-white">
            <Bell size={20} />
            Thông báo
          </label>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-600"
          >
            {notificationsEnabled ? 'Tắt' : 'Bật'}
          </button>
        </div>

        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="flex items-center gap-2 mb-1 text-sm font-medium text-white">
            <Paintbrush size={18} />
            Màu chủ đề
          </label>
          <select
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg"
          >
            <option value="teal">Teal</option>
            <option value="indigo">Indigo</option>
            <option value="rose">Rose</option>
            <option value="emerald">Emerald</option>
          </select>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col-reverse justify-end gap-3 mt-6 sm:flex-row sm:justify-end">
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-500"
        >
          <RefreshCcw size={16} /> Đặt lại
        </button>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-400"
        >
          <Save size={16} /> Lưu thay đổi
        </button>
      </div>
    </motion.section>
  );
}
