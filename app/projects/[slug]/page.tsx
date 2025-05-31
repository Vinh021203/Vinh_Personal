'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const current = data.find((p: any) => p.slug === slug);
        setProject(current);
        setRelated(data.filter((p: any) => p.slug !== slug).slice(0, 6));
      } catch {
        toast.error('Không thể tải thông tin dự án!');
      }
    };
    fetchProject();
  }, [slug]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 bg-black">
        Dự án không tồn tại.
      </div>
    );
  }

  return (
    <section className="w-full py-16 pt-40 text-white bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl px-4 mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400">
          <Link href="/" className="text-teal-400 hover:underline">Trang chủ</Link> /{' '}
          <Link href="/projects" className="text-teal-400 hover:underline">Dự án</Link> /{' '}
          <span className="text-white">{project.name}</span>
        </nav>

        {/* Tiêu đề và thông tin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-teal-400 sm:text-5xl">{project.name}</h1>

          <div className="mt-2 text-sm leading-relaxed text-gray-400">
            <p>👤 Khách hàng: <span className="font-medium text-white">{project.client}</span></p>
            <p>🗓 Ngày tạo: <span className="text-white">{new Date(project.createdAt).toLocaleDateString('vi-VN')}</span></p>
          </div>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-sm text-white bg-gray-700 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Mô tả ngắn */}
        <div className="p-4 mt-4 leading-relaxed text-gray-100 whitespace-pre-line bg-gray-800 rounded-lg shadow-md">
          {project.description || 'Dự án chất lượng cao, giao diện đẹp.'}
        </div>

        {/* Ảnh + Lightbox */}
        <div className="overflow-hidden rounded-xl max-h-[600px] cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
          <Image
            src={project.image || '/placeholder.jpg'}
            alt={`Hình ảnh dự án: ${project.name}`}
            width={1200}
            height={600}
            className="object-contain w-full h-auto transition duration-300 rounded-xl hover:scale-105"
          />
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out"
          >
            <Image
              src={project.image || '/placeholder.jpg'}
              alt="Preview"
              width={1600}
              height={900}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        )}

        {/* Nội dung markdown chi tiết */}
        <div className="p-6 prose bg-gray-800 rounded-lg shadow-lg prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content || 'Không có nội dung mô tả chi tiết.'}
          </ReactMarkdown>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="inline-block px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Chia sẻ Facebook
          </Link>

          <Link
            href="/projects"
            className="inline-block px-6 py-3 text-sm font-semibold text-white transition bg-pink-600 rounded-full hover:bg-pink-700"
          >
            ← Quay lại danh sách dự án
          </Link>
        </div>

        {/* Dự án khác (carousel ngang) */}
        {related.length > 0 && (
          <div className="pt-10 mt-10 border-t border-white/10">
            <h4 className="mb-4 text-xl font-bold text-white">Dự án khác</h4>
            <div className="flex gap-4 pb-2 overflow-x-auto scroll-smooth">
              {related.map((p) => (
                <Link
                  key={p._id}
                  href={`/projects/${p.slug}`}
                  className="min-w-[260px] max-w-[280px] bg-gray-800 rounded-lg hover:scale-105 transition p-4 shrink-0"
                >
                  <h5 className="font-semibold text-teal-300">{p.name}</h5>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {p.description || 'Không có mô tả'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
