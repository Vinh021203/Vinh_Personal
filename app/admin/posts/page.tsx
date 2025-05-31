'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutGrid, Pencil, Trash2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const PAGE_SIZE = 5;

export default function PostListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewPost, setPreviewPost] = useState<any | null>(null);

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const currentData = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        toast.error('Không thể tải bài viết!');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/posts/${deleteId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete post');
      toast.success('Xoá bài viết thành công!');
      setPosts(posts.filter((post) => post._id !== deleteId));
    } catch (err) {
      toast.error('Xoá bài viết thất bại!');
    } finally {
      setIsDeleting(false);
    }
    setIsDeleting(false);
    setShowModal(false);
  };

  return (
    <section className="px-4 mx-auto max-w-7xl">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="p-2 bg-teal-500 shadow-lg rounded-xl"
          >
            <LayoutGrid size={22} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">
            Quản lý <span className="text-teal-400">Bài viết</span>
          </h1>
        </div>
        <Link
          href="/admin/posts/create"
          className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded hover:bg-teal-400"
        >
          + Thêm bài viết
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden border rounded-xl border-white/10 bg-white/5">
        <table className="w-full text-sm text-left text-gray-200">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-6 py-3 font-semibold w-[40%]">Tiêu đề & ảnh</th>
              <th className="px-4 py-3 font-semibold w-[20%]">Tác giả</th>
              <th className="px-4 py-3 font-semibold w-[20%]">Ngày đăng</th>
              <th className="px-4 py-3 font-semibold w-[20%] text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((post) => (
              <tr key={post._id} className="transition border-t border-white/10 hover:bg-white/5">
                <td className="flex items-center gap-4 px-6 py-4">
                <img
                  src={post.thumbnail || '/placeholder.jpg'}
                  alt="thumbnail"
                  className="object-cover w-12 h-12 border rounded border-white/20"
                />
                <span>{post.title}</span>
                </td>
                <td className="px-4 py-4">{post.author}</td>
                <td className="px-4 py-4">{post.date}</td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/admin/posts/edit/${post._id}`}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                    >
                      <Pencil size={16} /> <span className="hidden sm:inline">Sửa</span>
                    </Link>

                    <button
                      onClick={() => confirmDelete(post._id)}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} /> <span className="hidden sm:inline">Xoá</span>
                    </button>

                    <button
                      onClick={() => setPreviewPost(post)}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                    >
                      <Eye size={16} /> <span className="hidden sm:inline">Xem</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 text-sm font-medium text-white border rounded border-white/10 hover:bg-white/10 disabled:opacity-30"
        >
          ◀ Trước
        </button>
        <span className="text-sm text-gray-300">
          Trang <strong>{currentPage}</strong> / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 text-sm font-medium text-white border rounded border-white/10 hover:bg-white/10 disabled:opacity-30"
        >
          Tiếp ▶
        </button>
      </div>

      {/* Modal xác nhận xoá */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="w-full max-w-md p-6 text-black bg-white rounded-xl"
            >
              <h2 className="mb-4 text-xl font-bold">Xác nhận xoá</h2>
              <p className="mb-6">
                Bạn có chắc muốn xoá bài viết <strong>#{deleteId}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 ${
                    isDeleting && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isDeleting ? 'Đang xoá...' : 'Xoá ngay'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal xem nhanh bài viết */}
      <AnimatePresence>
        {previewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-lg p-6 text-white bg-gray-900 rounded-xl"
            >
              <h2 className="mb-2 text-xl font-bold text-teal-400">{previewPost.title}</h2>
              <p className="mb-4 text-sm text-gray-400">Tác giả: {previewPost.author} • Ngày: {previewPost.date}</p>
              <img
                src={previewPost.thumbnail || '/placeholder.jpg'}
                alt="preview"
                className="object-cover w-full mb-4 rounded"
              />
              <p className="text-sm leading-relaxed text-gray-300">
                {previewPost.content || 'Không có nội dung chi tiết.'}
              </p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setPreviewPost(null)}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded hover:bg-teal-500"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
