'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Head from 'next/head';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController(); // ✅ tạo controller để kiểm soát fetch
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', { signal: controller.signal });
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          toast.error('Không thể tải danh sách dự án!');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      controller.abort(); // ✅ hủy nếu component bị unmount
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dự án đã thực hiện | VinhWorks</title>
        <meta name="description" content="Danh sách các dự án thực tế được thiết kế bởi VinhWorks. Tối ưu UI/UX, hiệu suất, chuẩn SEO." />
      </Head>

      <section className="min-h-screen text-white py-28 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-extrabold md:text-5xl">Dự án đã thực hiện</h1>
            <p className="mt-4 text-gray-400">Các sản phẩm thực tế đã triển khai với thiết kế tối ưu, hiện đại.</p>
            <p className="mt-2 text-sm text-gray-500">Hiển thị {projects.length} dự án nổi bật</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center mt-20 min-h-[400px]">
              <div className="w-8 h-8 border-4 border-teal-400 rounded-full border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2">
              {projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="overflow-hidden border border-gray-700 shadow-lg rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-xl group"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image || '/placeholder.jpg'}
                      alt={project.name}
                      className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-black/40 group-hover:opacity-100" />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-2xl font-bold">{project.name}</h2>
                    <p className="mb-1 text-gray-400">Khách hàng: {project.client}</p>
                    {project.description && (
                      <p className="mb-4 text-sm text-gray-300 line-clamp-3">{project.description}</p>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-full hover:bg-pink-700"
                    >
                      Xem chi tiết <FaArrowRight />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link href="/contact">
              <button className="px-6 py-3 text-white transition rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:scale-105 hover:shadow-lg">
                🚀 Bạn muốn có một website như vậy?
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
