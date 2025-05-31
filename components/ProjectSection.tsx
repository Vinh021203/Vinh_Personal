'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';

export const ProjectSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const sorted = data.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProjects(sorted.slice(0, 6));
      } catch {
        toast.error('Không thể tải danh sách dự án!');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 overflow-hidden text-white bg-gradient-to-b from-gray-900 via-gray-950 to-black"
    >
      {/* 🔆 SEO: Thêm mô tả semantically đúng */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="px-6 mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror' }}
              aria-hidden="true"
              className="text-xl text-pink-400"
            >
              <FaRocket />
            </motion.span>
            <p className="text-base font-semibold tracking-widest text-pink-400 uppercase">
              Dự án nổi bật
            </p>
          </div>
          <h2 id="projects-heading" className="text-4xl font-extrabold md:text-5xl">
            Một số sản phẩm tôi đã phát triển
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Sản phẩm được thiết kế thực tế, tối ưu cho trải nghiệm người dùng và hiệu quả kinh doanh.
          </p>
        </motion.header>

        {loading ? (
          <div className="flex justify-center mt-12" role="status" aria-live="polite">
            <div className="w-8 h-8 border-4 border-pink-400 rounded-full border-t-transparent animate-spin" />
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.li
                key={project._id || idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex"
              >
                <ProjectCard
                  title={project.name}
                  description={project.description}
                  image={project.image || '/placeholder.jpg'}
                  link={`/projects/${project.slug}`}
                />
              </motion.li>
            ))}
          </ul>
        )}

        <div className="mt-12 text-center">
          <Link href="/projects" aria-label="Xem toàn bộ dự án VinhWorks">
            <button className="px-6 py-3 text-sm font-semibold text-white transition-all rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 hover:shadow-lg">
              📂 Xem tất cả dự án
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
