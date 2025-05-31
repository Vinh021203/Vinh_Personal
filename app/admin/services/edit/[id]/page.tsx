'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SelectIconField from '@/components/admin/SelectIconField';

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Code2');
  const [status, setStatus] = useState<'Hiển thị' | 'Ẩn'>('Hiển thị');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setIcon(data.icon);
        setStatus(data.status);
        setCreatedAt(data.createdAt?.split('T')[0] || '');
      } catch (err) {
        toast.error('Không thể tải dữ liệu dịch vụ');
        router.push('/admin/services');
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('status', status);
    form.append('icon', icon);
    form.append('createdAt', createdAt);
    if (thumbnail) form.append('thumbnail', thumbnail);

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        body: form,
      });

      if (!res.ok) throw new Error();
      toast.success('✅ Cập nhật dịch vụ thành công!');
      router.push('/admin/services');
    } catch (err) {
      toast.error('❌ Cập nhật thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl px-4 py-6 mx-auto"
    >
      <Toaster />

      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white break-words">
          Cập nhật <span className="text-teal-400 break-all">Dịch vụ #{id}</span>
        </h1>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-white border rounded border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Trở về
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <input
            type="text"
            placeholder="Tiêu đề dịch vụ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
          />
        </div>

        <div className="sm:col-span-2">
          <textarea
            placeholder="Mô tả"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg"
          />
        </div>

        <div className="sm:col-span-2">
          <SelectIconField icon={icon} setIcon={setIcon} />
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-1 text-sm font-medium text-teal-300">
            🖼 Cập nhật ảnh minh hoạ (tuỳ chọn)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-300 bg-gray-800 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-400"
          />
          {thumbnail && (
            <p className="mt-1 text-xs text-gray-400">Đã chọn: {thumbnail.name}</p>
          )}
        </div>

        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Hiển thị' | 'Ẩn')}
            className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg"
          >
            <option value="Hiển thị">Hiển thị</option>
            <option value="Ẩn">Ẩn</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white bg-teal-500 rounded hover:bg-teal-400"
          >
            <Save size={16} />
            {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
