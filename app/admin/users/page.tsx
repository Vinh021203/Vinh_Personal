'use client';

import Link from 'next/link';
import { Pencil, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

const PAGE_SIZE = 5;

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const currentData = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch {
        toast.error('Không thể tải danh sách người dùng!');
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className="max-w-6xl px-4 mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
        <h1 className="text-2xl font-bold text-white">
          Danh sách <span className="text-teal-400">Users</span>
        </h1>
      </div>

      <div className="overflow-x-auto border rounded-xl border-white/10 bg-white/5">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-6 py-3 font-semibold">Họ tên</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Vai trò</th>
              <th className="px-4 py-3 font-semibold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user) => (
              <tr key={user._id} className="transition border-t border-white/10 hover:bg-white/5">
                <td className="px-6 py-4 break-words max-w-[160px] md:max-w-none">{user.name}</td>
                <td className="px-4 py-4 break-words max-w-[160px] md:max-w-none">{user.email}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin'
                        ? 'bg-yellow-700 text-yellow-300'
                        : 'bg-green-700 text-green-300'
                    }`}
                  >
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/admin/users/edit/${user._id}`}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                    >
                      <Pencil size={16} /> <span className="hidden sm:inline">Sửa</span>
                    </Link>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                    >
                      <Eye size={16} /> <span className="hidden sm:inline">Xem</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 text-sm font-medium text-white border rounded border-white/10 hover:bg-white/10 disabled:opacity-30"
        >
          ◀ Trước
        </button>
        <span className="text-sm text-gray-300">
          Trang <strong>{currentPage}</strong> / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 text-sm font-medium text-white border rounded border-white/10 hover:bg-white/10 disabled:opacity-30"
        >
          Tiếp ▶
        </button>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="w-full max-w-md p-6 text-white bg-gray-900 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Thông tin người dùng</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <p><span className="font-medium text-teal-400">Tên:</span> {selectedUser.name}</p>
                <p><span className="font-medium text-teal-400">Email:</span> {selectedUser.email}</p>
                <p><span className="font-medium text-teal-400">Vai trò:</span> {selectedUser.role}</p>
                <p>
                  <span className="font-medium text-teal-400">Ngày tạo:</span>{' '}
                  {new Date(selectedUser.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
