'use client';

import { motion } from 'framer-motion';
import {
  Laptop2,
  Sparkles,
  Code,
  Rocket,
  Smile,
  Lightbulb,
  HeartHandshake,
  Server,
  Paintbrush2,
  BadgeCheck,
  FolderGit2,
} from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Giới thiệu về tôi | VinhWorks</title>
        <meta name="description" content="Vinh là lập trình viên chuyên phát triển website hiện đại, dùng React, Next.js, Tailwind, MongoDB..." />
        <meta property="og:title" content="Giới thiệu về tôi | VinhWorks" />
        <meta property="og:description" content="Giới thiệu về Vinh - nhà phát triển web yêu UI/UX, tối ưu hiệu suất, mang lại trải nghiệm tuyệt vời cho khách hàng." />
        <meta property="og:image" content="/seo-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section className="relative min-h-screen px-6 pt-40 pb-24 text-white bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-ping" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-2 mb-4 text-2xl text-teal-400">
              <Laptop2 /> <span className="text-sm tracking-widest uppercase">Về tôi</span>
            </div>
            <Image
              src="/me.jpg"
              alt="Ảnh lập trình viên Vinh"
              width={120}
              height={120}
              className="mx-auto mb-6 transition rounded-full shadow-lg hover:scale-105"
            />
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight md:text-5xl">👋 Xin chào, mình là Vinh</h1>
            <div className="mb-4 text-sm text-teal-300 animate-pulse">
              "Biến ý tưởng thành website sống động | từng dòng code là tâm huyết."
            </div>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-300">
              Một <strong className="text-white">lập trình viên web</strong> với đam mê xây dựng giao diện đẹp, mượt mà và chuẩn SEO.
              Mình sử dụng <strong className="text-teal-400">React, Next.js, Tailwind CSS, Node.js, MongoDB</strong> và <strong className="text-teal-400">shadcn/ui</strong> để hiện thực hóa ý tưởng thành sản phẩm thực tế.
            </p>
          </motion.div>

          {/* Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-10"
          >
            <h2 className="mb-4 text-lg font-bold text-teal-400">🛠 Tôi đang dùng công cụ gì?</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 sm:grid-cols-3">
              <span className="flex items-center gap-2"><BadgeCheck className="text-blue-400" size={18} /> React</span>
              <span className="flex items-center gap-2"><FolderGit2 className="text-teal-400" size={18} /> Next.js</span>
              <span className="flex items-center gap-2"><Paintbrush2 className="text-pink-400" size={18} /> Tailwind CSS</span>
              <span className="flex items-center gap-2"><Server className="text-yellow-400" size={18} /> Node.js</span>
              <span className="flex items-center gap-2"><Server className="text-green-400" size={18} /> MongoDB</span>
              <span className="flex items-center gap-2"><Sparkles className="text-purple-400" size={18} /> shadcn/ui</span>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid gap-6 text-left mt-14 sm:grid-cols-2 md:grid-cols-3"
          >
            <div className="p-6 bg-gradient-to-br from-gray-800/70 to-gray-900/80 border border-gray-700 rounded-2xl shadow hover:shadow-xl transition-all hover:scale-[1.02]">
              <Sparkles className="mb-2 text-teal-400" />
              <h3 className="mb-1 font-semibold text-white">Đẹp & Tối ưu</h3>
              <p className="text-sm text-gray-400">Chú trọng UI/UX, tốc độ tải nhanh, chuẩn SEO, điểm Lighthouse cao.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-800/70 to-gray-900/80 border border-gray-700 rounded-2xl shadow hover:shadow-xl transition-all hover:scale-[1.02]">
              <Code className="mb-2 text-indigo-400" />
              <h3 className="mb-1 font-semibold text-white">Công nghệ hiện đại</h3>
              <p className="text-sm text-gray-400">Stack: React, Next.js, Tailwind, MongoDB, Node.js, shadcn/ui</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-800/70 to-gray-900/80 border border-gray-700 rounded-2xl shadow hover:shadow-xl transition-all hover:scale-[1.02]">
              <Rocket className="mb-2 text-pink-400" />
              <h3 className="mb-1 font-semibold text-white">Triển khai nhanh chóng</h3>
              <p className="text-sm text-gray-400">Đảm bảo đúng deadline, dễ nâng cấp và hỗ trợ tận tình sau bàn giao.</p>
            </div>
          </motion.div>

          {/* Giá trị */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-16 space-y-3 text-sm text-left text-gray-400"
          >
            <p><Smile className="inline mr-2 text-teal-400" /> Luôn lắng nghe và tư vấn đúng nhu cầu</p>
            <p><Lightbulb className="inline mr-2 text-yellow-400" /> Đề xuất giải pháp rõ ràng, minh bạch</p>
            <p><HeartHandshake className="inline mr-2 text-pink-400" /> Hỗ trợ bảo trì và nâng cấp miễn phí ban đầu</p>
          </motion.div>

          {/* Testimonial */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-2xl pl-4 mx-auto mt-16 text-sm italic text-gray-400 border-l-4 border-teal-500"
          >
            “Website do Vinh làm cực nhanh, đẹp và tối ưu SEO tốt. Rất nhiệt tình và chuyên nghiệp.” – Anh Nam, CEO VN Tech
          </motion.blockquote>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-20 text-left"
          >
            <h3 className="mb-4 text-xl font-semibold text-white">❓ Câu hỏi thường gặp</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-teal-400">Chi phí thiết kế website là bao nhiêu?</p>
                <p>Chi phí tùy độ phức tạp & yêu cầu. Hãy <Link href="/contact" className="text-teal-300 underline">liên hệ</Link> để được tư vấn chi tiết.</p>
              </div>
              <div>
                <p className="font-semibold text-teal-400">Thời gian hoàn thành?</p>
                <p>Thông thường từ 3–10 ngày tùy dự án. Đảm bảo đúng tiến độ.</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <a
              href="/contact"
              className="inline-block px-6 py-3 text-sm font-semibold text-white transition-all rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:scale-105 hover:shadow-xl"
            >
              📩 Liên hệ để bắt đầu dự án
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
