'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import { FaRocket, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen pt-24 overflow-hidden text-white bg-[radial-gradient(ellipse_at_top,_#1a1a2e_0%,_#16213e_100%)]"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        VinhWorks - Thiết kế website, lập trình ứng dụng UI/UX chuẩn SEO & theo yêu cầu
      </h1>

      {/* ✅ Animated Overlay Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-700/10 via-indigo-700/10 to-transparent animate-pulse"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl px-4 text-center"
      >
        <h2 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: 'backOut' }}
            className="inline-block mr-3"
          >
            <FaRocket size={36} className="inline-block text-yellow-400 animate-bounce" />
          </motion.span>
          Hello Vinh –{' '}
          <span className="text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text">
            <TypeAnimation
              sequence={[
                'Lập trình website',
                1500,
                'Thiết kế UI/UX',
                1500,
                'Chuẩn SEO',
                1500,
                'App theo yêu cầu',
                1500,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="inline-block"
            />
          </span>
        </h2>

        <p className="mb-10 text-lg text-gray-300 md:text-xl">
          Tôi giúp bạn xây dựng website / app chuẩn UI/UX, tối ưu SEO và trải nghiệm người dùng.{' '}
          <FaLaptopCode className="inline ml-1 text-white/80" />
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/projects">
            <Button className="gap-2 px-6 py-3 text-base font-semibold text-gray-900 transition duration-300 rounded-full shadow-lg md:text-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:brightness-110" aria-label="Xem các dự án của VinhWorks">
              Xem dự án <FaArrowRight />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};