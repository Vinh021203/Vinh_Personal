'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { FilePlus2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SelectIconField from '@/components/admin/SelectIconField';

export default function CreateServicePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState('Hiển thị');
  const [icon, setIcon] = useState('Code2'); // 👈 icon được chọn
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !description.trim()) {
      toast.error('Vui lòng nhập đầy đủ tiêu đề và mô tả!');
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append('name', title);
    form.append('description', description);
    form.append('status', status);
    form.append('icon', icon); // 👈 icon người dùng chọn
    if (image) {
      form.append('thumbnail', image);
    }

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error('Lỗi khi gửi dữ liệu');

      toast.success('✅ Dịch vụ đã được thêm thành công!');
      router.push('/admin/services');
    } catch (err) {
      console.error(err);
      toast.error('Thêm dịch vụ thất bại!');
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
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500 rounded-lg shadow-lg">
            <FilePlus2 size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Thêm <span className="text-teal-400">Dịch vụ</span>
          </h1>
        </div>
        <Link
          href="/admin/services"
          className="flex items-center gap-1 px-3 py-2 text-sm text-white border rounded border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Trở về
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Tiêu đề dịch vụ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
        />

        <textarea
          placeholder="Mô tả dịch vụ"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
        />

        {/* 👇 Chọn Icon */}
        <SelectIconField icon={icon} setIcon={setIcon} />

        {/* Ảnh minh hoạ (tuỳ chọn) */}
        <div>
          <label className="block mb-1 text-sm font-medium text-teal-300">
            Ảnh minh hoạ (tuỳ chọn)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full text-white bg-gray-800 border border-gray-600 rounded-lg file:px-4 file:py-2 file:bg-teal-500 file:text-white file:border-0 hover:file:bg-teal-400"
          />
          {image && (
            <p className="mt-1 text-sm text-gray-400">Đã chọn: {image.name}</p>
          )}
        </div>

        {/* Trạng thái */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
        >
          <option value="Hiển thị">Hiển thị</option>
          <option value="Ẩn">Ẩn</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-400"
        >
          {loading ? 'Đang thêm...' : 'Thêm dịch vụ'}
        </button>
      </form>
    </motion.section>
  );
}
