'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Form from '@/components/admin/Form';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Wrench, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu bài viết
  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Không thể lấy bài viết');
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setUpdatedAt(data.updatedAt || '');
        setThumbnailUrl(data.thumbnail || '');
      } catch (err) {
        toast.error('Bài viết không tồn tại!');
        router.push('/admin/posts');
      }
    };

    fetchPost();
  }, [id]);

  // Xử lý cập nhật bài viết
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('updatedAt', new Date().toISOString());
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error();
      toast.success('✅ Cập nhật thành công!');
      router.push('/admin/posts');
    } catch (err) {
      toast.error('Cập nhật thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl px-4 mx-auto"
    >
      <Toaster />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500 rounded-lg shadow-lg">
            <Wrench size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Cập nhật <span className="text-teal-400">Bài viết #{id}</span>
            </h1>
            {updatedAt && (
              <p className="mt-1 text-sm text-gray-400">
                🕒 Lần sửa cuối: <span className="font-medium">{new Date(updatedAt).toLocaleString('vi-VN')}</span>
              </p>
            )}
          </div>
        </div>

        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white border rounded border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Trở về
        </Link>
      </div>

      {/* Ảnh đại diện */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-teal-300">🖼 Ảnh đại diện (tuỳ chọn)</label>
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          accept="image/*"
          className="block w-full text-sm text-gray-300 bg-gray-800 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-400"
        />
        {thumbnail ? (
          <p className="mt-1 text-xs text-gray-400">Đã chọn: {thumbnail.name}</p>
        ) : thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Thumbnail hiện tại"
            className="object-cover w-40 h-40 mt-2 border border-gray-500 rounded"
          />
        ) : null}
      </div>

      {/* Form nội dung */}
      <Form
        fields={[
          {
            label: 'Tiêu đề',
            type: 'text',
            value: title,
            onChange: (e) => setTitle(e.target.value),
          },
          {
            label: 'Nội dung (Markdown hỗ trợ)',
            type: 'textarea',
            value: content,
            onChange: (e) => setContent(e.target.value),
          },
        ]}
        submitLabel={loading ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
        onSubmit={handleSubmit}
        disabled={loading}
      />
    </motion.section>
  );
}
