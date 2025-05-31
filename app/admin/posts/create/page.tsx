'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/admin/Form';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FilePlus2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    if (!title.trim() || !content.trim()) {
      toast.error('Vui lòng điền đầy đủ tiêu đề và nội dung!');
      setLoading(false);
      return;
    }
  
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const today = new Date().toISOString().split('T')[0];
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('slug', slug);
    formData.append('author', 'Admin');
    formData.append('date', today);
    formData.append('tags', JSON.stringify(tags));
    if (thumbnail) formData.append('thumbnail', thumbnail);
  
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) throw new Error('Tạo bài viết thất bại!');
      toast.success('✅ Đã tạo bài viết mới thành công!');
      router.push('/admin/posts');
    } catch (err) {
      toast.error('Lỗi khi tạo bài viết!');
      console.error(err);
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

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500 rounded-lg shadow-lg">
            <FilePlus2 size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Tạo <span className="text-teal-400">Bài viết mới</span>
          </h1>
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
        {thumbnail && (
          <p className="mt-1 text-xs text-gray-400">Đã chọn: {thumbnail.name}</p>
        )}
      </div>

      <Form
        fields={[
          {
            label: 'Tiêu đề',
            type: 'text',
            value: title,
            onChange: (e) => setTitle(e.target.value),
          },
          {
            label: 'Nội dung',
            type: 'textarea',
            value: content,
            onChange: (e) => setContent(e.target.value),
          },
        ]}
        submitLabel={loading ? 'Đang tạo...' : 'Tạo bài viết'}
        onSubmit={handleSubmit}
        disabled={loading}
      />

      {/* Tags */}
      <div className="mt-6">
        <label className="block mb-1 text-sm font-medium text-teal-300">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            placeholder="Nhập tag và nhấn Enter"
            className="flex-1 px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleAddTag}
            disabled={loading}
            className="px-3 text-sm text-white bg-teal-500 rounded hover:bg-teal-400"
          >
            Thêm
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm text-white bg-gray-700 rounded-full cursor-pointer hover:bg-red-500"
              onClick={() => handleRemoveTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}