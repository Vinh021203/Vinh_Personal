'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, Monitor } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Đăng nhập thất bại');
      } else {
        toast.success(data.message || 'Đăng nhập thành công!');
        setEmail('');
        setPassword('');

        setTimeout(async () => {
          const resUser = await fetch('/api/auth/me', {
            credentials: 'include',
            cache: 'no-store',
          });

          const userData = await resUser.json();
          if (userData?.user) {
            setUser(userData.user);
            router.push(userData.user.role === 'admin' ? '/admin/dashboard' : '/');
          } else {
            router.push('/');
          }
        }, 300);
      }
    } catch (error) {
      toast.error('Lỗi mạng hoặc máy chủ');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="flex items-center justify-center min-h-screen px-4 py-20 pt-40 bg-gradient-to-br from-black via-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-8 py-10 border shadow-xl rounded-2xl border-white/20 bg-white/5 backdrop-blur-lg"
        >
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 text-black bg-white rounded-lg">
                <Monitor size={20} />
              </span>
              <span className="text-xl font-bold text-white">VinhWorks</span>
            </div>
            <p className="text-sm text-gray-400">Nền tảng công nghệ cho nhà phát triển</p>
          </div>

          <h2 className="mb-6 text-xl font-bold text-center text-white">Đăng nhập tài khoản</h2>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <div className="relative">
              <Mail className="absolute text-teal-300 left-3 top-3" size={18} />
              <input
                type="email"
                placeholder="Email"
                required
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-sm text-white transition-all bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute text-teal-300 left-3 top-3" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-10 text-sm text-white transition-all bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-teal-300 right-3 top-3 hover:text-teal-100"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className={`w-full flex justify-center items-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg transition-all ${
                loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'
              }`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
              ) : (
                <>
                  <LogIn size={16} /> Đăng nhập
                </>
              )}
            </motion.button>
          </motion.form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-teal-400 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </motion.div>
      </section>
    </>
  );
}