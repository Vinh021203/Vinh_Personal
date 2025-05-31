'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, SendHorizonal, Loader2 } from 'lucide-react';
import Head from 'next/head';
import { Toaster, toast } from 'react-hot-toast';
import emailjs from 'emailjs-com'; // ✅ import thư viện emailjs

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: email, // Bạn có thể thay bằng tên người gửi nếu muốn
      email: email,
      message: message,
      time: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success('Liên hệ đã được gửi thành công!');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Không thể gửi liên hệ. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Liên hệ | VinhWorks</title>
        <meta name="description" content="Gửi liên hệ, hợp tác hoặc phản hồi cho VinhWorks tại đây." />
        <meta property="og:title" content="Liên hệ | VinhWorks" />
        <meta property="og:description" content="Trang liên hệ chính thức của VinhWorks." />
        <meta property="og:type" content="website" />
      </Head>

      <Toaster position="top-center" />

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-teal-400 rounded-full border-t-transparent animate-spin" />
              <p className="mt-4 text-sm text-teal-300 animate-pulse">Đang tải nội dung...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className={`min-h-screen px-4 py-20 text-white bg-gradient-to-b from-black via-gray-900 to-black transition-all duration-500 ${loading ? 'blur-sm pointer-events-none select-none opacity-30' : 'opacity-100'}`}>
        <div className="max-w-xl p-8 mx-auto border border-gray-700 shadow-lg backdrop-blur-md bg-gray-800/50 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-teal-400">
              <Mail size={28} />
              <h1 className="text-3xl font-bold md:text-4xl">Liên hệ với tôi</h1>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Mọi góp ý, phản hồi hoặc hợp tác vui lòng để lại thông tin bên dưới 👇
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-teal-300">Email của bạn</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-sm transition-all bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:shadow-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-teal-300">Nội dung</label>
              <textarea
                required
                placeholder="Bạn muốn nhắn gì?"
                className="w-full h-32 px-4 py-3 text-sm transition-all bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:shadow-lg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all rounded ${
                isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Đang gửi...
                </>
              ) : (
                <>
                  <SendHorizonal size={16} />
                  Gửi liên hệ
                </>
              )}
            </motion.button>
          </motion.form>

          <p className="mt-8 text-xs text-center text-gray-500">
            ⏳ Chúng tôi sẽ phản hồi bạn trong vòng <span className="font-medium text-teal-400">24h</span>.
          </p>
        </div>
      </section>
    </>
  );
}
