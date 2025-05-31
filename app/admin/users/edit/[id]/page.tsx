'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, User } from 'lucide-react';
import Link from 'next/link';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Không tìm thấy người dùng');
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setCreatedAt(data.createdAt);
      } catch (err) {
        toast.error('Lỗi khi tải thông tin user!');
        router.push('/admin/users');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password: password || undefined,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Cập nhật thất bại');

      toast.success('✅ Đã cập nhật người dùng!');
      router.push('/admin/users');
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi cập nhật!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl px-4 mx-auto">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="p-2 bg-teal-500 shadow-lg rounded-xl"
          >
            <User size={22} className="text-white" />
          </motion.div>
          <h1 className="text-xl font-bold text-white break-words sm:text-2xl">
            Cập nhật <span className="text-teal-400 break-words">User #{id}</span>
          </h1>
        </div>
        <Link
          href="/admin/users"
          className="px-4 py-2 text-sm font-medium text-white border rounded border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={16} className="inline mr-1" />
          Trở về
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-teal-300">Tên đầy đủ</label>
          <input
            type="text"
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-teal-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-teal-300">Mật khẩu (nếu cần đổi)</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pr-10 text-white bg-gray-800 border border-gray-600 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-white right-3 top-3"
            >
              👁
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-teal-300">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-teal-300">Ngày tạo</label>
          <input
            type="text"
            disabled
            value={new Date(createdAt).toLocaleString('vi-VN')}
            className="w-full px-4 py-3 text-gray-400 bg-gray-800 border border-gray-600 rounded-lg cursor-not-allowed"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white bg-teal-500 rounded hover:bg-teal-400"
          >
            {loading ? 'Đang cập nhật...' : (
              <>
                <Save size={16} /> Lưu thay đổi
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
