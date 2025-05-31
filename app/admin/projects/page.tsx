'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, X, Pencil, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ProjectListPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState<any | null>(null);

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const currentProjects = projects.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch {
        toast.error('Không thể tải danh sách dự án!');
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="px-4 py-6 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="p-2 bg-blue-500 shadow-lg rounded-xl"
          >
            <LayoutGrid size={22} className="text-white" />
          </motion.div>
          <h1 className="text-xl font-bold text-white sm:text-2xl">
            Quản lý <span className="text-blue-400">Dự án</span>
          </h1>
        </div>
        <Link
          href="/admin/projects/create"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-400"
        >
          + Thêm dự án
        </Link>
      </div>

      {/* Table (Desktop) / Cards (Mobile) */}
      <div className="hidden overflow-hidden border md:block rounded-xl border-white/10 bg-white/5">
        <table className="w-full text-sm text-left text-gray-200">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-6 py-3 w-[25%] font-semibold">Tên dự án & Ảnh</th>
              <th className="px-4 py-3 w-[15%] font-semibold">Khách hàng</th>
              <th className="px-4 py-3 w-[15%] font-semibold">Trạng thái</th>
              <th className="px-4 py-3 w-[30%] font-semibold">Mô tả & Tags</th>
              <th className="px-4 py-3 w-[15%] font-semibold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((p) => (
              <tr key={p._id} className="border-t border-white/10 hover:bg-white/5">
                <td className="flex items-center gap-3 px-6 py-4">
                  <img
                    src={
                      p.image
                        ? p.image.replace('/upload/', '/upload/w_80,h_80,c_fill/')
                        : '/placeholder.jpg'
                    }
                    className="object-cover w-10 h-10 border rounded border-white/10"
                    alt={p.name}
                  />
                  <span className="font-medium text-white line-clamp-2">{p.name}</span>
                </td>
                <td className="px-4 py-4">{p.client}</td>
                <td className="px-4 py-4">
                  <span
                    className={`text-sm font-medium ${
                      p.status === 'Hoàn thành' ? 'text-green-400' : 'text-yellow-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-gray-300 line-clamp-3">{p.description || '—'}</p>
                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs text-pink-400 bg-pink-500/10 border border-pink-400/20 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-5 text-[13px] font-medium">
                    <Link
                      href={`/admin/projects/edit/${p._id}`}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                    >
                      <Pencil size={16} />
                      <span>Sửa</span>
                    </Link>
                    <button
                      onClick={() => setPreview(p)}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                    >
                      <Eye size={16} />
                      <span>Xem</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="space-y-4 md:hidden">
        {currentProjects.map((p) => (
          <div
            key={p._id}
            className="p-4 border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={
                  p.image
                    ? p.image.replace('/upload/', '/upload/w_80,h_80,c_fill/')
                    : '/placeholder.jpg'
                }
                className="object-cover w-12 h-12 border rounded border-white/10"
                alt={p.name}
              />
              <div>
                <h3 className="font-medium text-white line-clamp-2">{p.name}</h3>
                <p className="text-xs text-gray-400">{p.client}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-300">Trạng thái: </span>
                <span
                  className={`font-medium ${
                    p.status === 'Hoàn thành' ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {p.status}
                </span>
              </p>
              <p className="text-gray-300 line-clamp-3">{p.description || '—'}</p>
              {Array.isArray(p.tags) && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs text-pink-400 bg-pink-500/10 border border-pink-400/20 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-4 mt-3">
                <Link
                  href={`/admin/projects/edit/${p._id}`}
                  className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
                >
                  <Pencil size={16} />
                  Sửa
                </Link>
                <button
                  onClick={() => setPreview(p)}
                  className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
                >
                  <Eye size={16} />
                  Xem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 text-sm text-white border rounded border-white/10 hover:bg-white/10 disabled:opacity-30"
        >
          ◀ Trước
        </button>
        <span className="text-sm text-gray-300">
          Trang <strong>{currentPage}</strong> / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 text-sm text-white border rounded border-white/10 hover:bg-white/10 disabled:opacity-30"
        >
          Tiếp ▶
        </button>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md p-6 text-black bg-white sm:max-w-lg rounded-xl"
            >
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold sm:text-xl">Chi tiết dự án</h2>
                <button
                  onClick={() => setPreview(null)}
                  className="text-gray-500 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>
              <img
                src={preview.image || '/placeholder.jpg'}
                className="object-cover w-full h-48 mb-4 border border-gray-300 rounded-lg"
                alt="Project preview"
              />
              <div className="space-y-2 text-sm">
                <p className="text-base font-semibold sm:text-lg">{preview.name}</p>
                <p className="text-gray-600">Khách hàng: {preview.client}</p>
                <p className="text-gray-500">
                  Ngày tạo: {new Date(preview.createdAt).toLocaleDateString('vi-VN')}
                </p>
                <p className="text-gray-500">
                  Trạng thái: <span className="font-medium">{preview.status}</span>
                </p>
                <p className="text-gray-700 whitespace-pre-line">{preview.description || 'Không có mô tả'}</p>
                {Array.isArray(preview.tags) && preview.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {preview.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-medium text-pink-700 bg-pink-100 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}