// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { CardStats } from '@/components/admin/CardStats';
import {
  Activity,
  MessageCircle,
  Bell,
  UserCheck,
  LayoutGrid,
  CalendarDays,
  ClipboardList,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { label: 'Tổng dự án', value: 0, icon: <Activity size={24} className="text-teal-400" />, color: 'from-teal-700 to-teal-500' },
    { label: 'Người dùng', value: 0, icon: <UserCheck size={24} className="text-indigo-400" />, color: 'from-indigo-700 to-indigo-500' },
    { label: 'Tin nhắn mới', value: 0, icon: <MessageCircle size={24} className="text-pink-400" />, color: 'from-pink-700 to-pink-500' },
    { label: 'Bài viết', value: 0, icon: <Bell size={24} className="text-yellow-400" />, color: 'from-yellow-700 to-yellow-500' },
  ]);

  const [recentProjects, setRecentProjects] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => [
          { ...prev[0], value: data.projects },
          { ...prev[1], value: data.users },
          { ...prev[2], value: data.messages },
          { ...prev[3], value: data.posts },
        ]);
      })
      .catch(() => toast.error('Không thể tải dữ liệu dashboard!'));

    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        const doneProjects = data.filter((p: any) => p.status === 'Hoàn thành');
        setRecentProjects(doneProjects.slice(0, 3));
      });

    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setRecentUsers(data.slice(0, 5)))
      .catch(() => toast.error('Không thể tải danh sách người dùng!'));
  }, []);

  return (
    <section className="px-4 mx-auto max-w-7xl">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="p-2 text-white bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl"
        >
          <LayoutGrid size={22} />
        </motion.div>
        <h1 className="text-2xl font-bold text-white">
          Bảng điều khiển <span className="text-teal-400">Admin</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((item, index) => (
          <CardStats key={index} {...item} />
        ))}
      </motion.div>

      <div className="grid gap-6 mt-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 border rounded-lg shadow-xl bg-white/10 border-white/10"
        >
          <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-teal-300">
            <ClipboardList size={18} /> Hoạt động gần đây
          </h2>
          <div className="relative pl-4 space-y-6 border-l border-teal-500/30">
            <div className="relative">
              <span className="absolute w-3 h-3 bg-teal-400 rounded-full -left-1.5 top-1.5 animate-ping"></span>
              <div className="text-sm text-gray-300">
                <span className="font-semibold text-white">Admin</span> đã cập nhật <span className="text-teal-400">cài đặt hệ thống</span>
                <div className="mt-1 text-xs text-gray-500">⏱️ 5 phút trước</div>
              </div>
            </div>
            {recentProjects.map((project: any, idx) => (
              <div key={idx} className="relative">
                <span className="absolute w-3 h-3 bg-green-400 rounded-full -left-1.5 top-1.5 animate-ping"></span>
                <div className="text-sm text-gray-300">
                  Dự án <span className="font-medium text-green-300">{project.name}</span> đã được đánh dấu <span className="text-green-300">Hoàn thành ✅</span>
                  <div className="mt-1 text-xs text-gray-500">⏱️ Gần đây</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 border rounded-lg shadow-xl bg-white/10 border-white/10"
        >
          <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-teal-300">
            <CalendarDays size={18} /> Lịch trình & nhiệm vụ
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              'Kiểm tra lại form phản hồi liên hệ.',
              'Gửi thông báo bảo trì hệ thống cho người dùng.',
              'Hoàn tất thiết kế trang gói dịch vụ.',
            ].map((task, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-start gap-2"
              >
                <span className="text-teal-400">•</span>
                {task}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 mt-10 border rounded-lg shadow-xl bg-white/10 border-white/10"
      >
        <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-teal-300">
          <UserCheck size={18} /> Người dùng gần đây
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-teal-400 uppercase border-b border-white/10">
              <tr>
                <th className="px-4 py-2">Người dùng</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Ngày đăng ký</th>
                <th className="px-4 py-2">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user: any, idx) => (
                <tr key={idx} className="transition hover:bg-white/5">
                  <td className="flex items-center gap-3 px-4 py-2">
                    <div className="flex items-center justify-center w-8 h-8 font-semibold text-white bg-teal-600 rounded-full">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {user.name}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
