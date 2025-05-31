'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (password.length === 0) setPasswordStrength('');
    else if (password.length < 6) setPasswordStrength('Yếu');
    else if (password.match(/[0-9]/) && password.match(/[a-z]/) && password.match(/[A-Z]/)) setPasswordStrength('Mạnh');
    else setPasswordStrength('Trung bình');
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Đăng ký thất bại');
      } else {
        toast.success(data.message || 'Đăng ký thành công!');
        setName('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    } catch (error) {
      toast.error('Lỗi mạng hoặc máy chủ');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    toast('🔐 Chức năng đăng ký bằng Google chưa được kích hoạt.');
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
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-black"
                >
                  <path d="M2 7h20M2 17h20M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">VinhWorks</h1>
            </div>
            <p className="text-sm text-gray-400">Nền tảng công nghệ cho nhà phát triển</p>
          </div>

          <h2 className="mb-6 text-xl font-bold text-center text-white">Tạo tài khoản mới</h2>

          <motion.form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute text-teal-300 left-3 top-3" size={18} />
              <input
                type="text"
                placeholder="Tên đầy đủ"
                required
                ref={nameInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-sm text-white transition-all bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="relative">
              <Mail className="absolute text-teal-300 left-3 top-3" size={18} />
              <input
                type="email"
                placeholder="Email"
                required
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
                className="absolute text-teal-300 right-3 top-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {password && (
                <p className={`mt-1 text-xs italic ${
                  passwordStrength === 'Yếu'
                    ? 'text-red-400'
                    : passwordStrength === 'Trung bình'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}>Mật khẩu: {passwordStrength}</p>
              )}
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
                  <ArrowRight size={16} /> Tạo tài khoản
                </>
              )}
            </motion.button>
          </motion.form>

          <div className="relative mt-8 text-center">
            <span className="absolute left-0 right-0 h-px bg-gray-700 top-2" />
            <span className="relative px-4 text-xs text-gray-400 bg-black">hoặc</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleRegister}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 mt-5 text-sm font-medium text-white transition-all border border-gray-700 rounded-lg hover:border-teal-400"
          >
            <LogIn size={18} /> Đăng ký bằng Google
          </motion.button>

          <p className="mt-6 text-sm text-center text-gray-400">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-teal-400 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>

          <p className="mt-4 text-xs italic text-center text-gray-500">
            <Sparkles className="inline w-4 h-4 mr-1 text-teal-300 animate-pulse" />
            Trở thành một phần của cộng đồng lập trình hiện đại
          </p>
        </motion.div>
      </section>
    </>
  );
}
  