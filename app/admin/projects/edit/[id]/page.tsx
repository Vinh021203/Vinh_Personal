'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Wrench, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Form from '@/components/admin/Form';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('Đang triển khai');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState('');
  const [description, setDescription] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Không tìm thấy dự án');
        const data = await res.json();
        setName(data.name);
        setClient(data.client);
        setStatus(data.status);
        setTags(data.tags || []);
        setDescription(data.description || '');
        setUpdatedAt(data.updatedAt || '');
        setCurrentImage(data.image || '');
      } catch (err) {
        toast.error('Không thể tải dự án!');
        router.push('/admin/projects');
      }
    };

    if (id) fetchProject();
  }, [id]);

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

    if (!name.trim() || !client.trim()) {
      toast.error('Vui lòng nhập đầy đủ tên và khách hàng!');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('client', client);
      formData.append('status', status);
      formData.append('tags', JSON.stringify(tags));
      formData.append('description', description);
      if (thumbnail) formData.append('thumbnail', thumbnail);

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error('Lỗi cập nhật');

      toast.success(`✅ Đã cập nhật dự án #${id}`);
      router.push('/admin/projects');
    } catch (err) {
      toast.error('Lỗi khi cập nhật!');
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

      <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-start">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-500 rounded-lg shadow-lg">
            <Wrench size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white break-words">
              Cập nhật <span className="text-teal-400">Dự án #{id}</span>
            </h1>
            {updatedAt && (
              <p className="mt-1 text-sm text-gray-400">
                🕒 Lần sửa cuối: <span className="font-medium">{new Date(updatedAt).toLocaleString('vi-VN')}</span>
              </p>
            )}
            <p className="text-sm text-blue-400 underline break-all">
              <Link href={`/projects/${id}`}>Xem dự án công khai</Link>
            </p>
          </div>
        </div>

        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white border rounded border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Trở về
        </Link>
      </div>

      <Form
        fields={[
          { label: 'Tên dự án', type: 'text', value: name, onChange: (e) => setName(e.target.value) },
          { label: 'Khách hàng', type: 'text', value: client, onChange: (e) => setClient(e.target.value) },
          { label: 'Mô tả dự án', type: 'textarea', value: description, onChange: (e) => setDescription(e.target.value) },
        ]}
        submitLabel={loading ? 'Đang cập nhật...' : 'Cập nhật dự án'}
        onSubmit={handleSubmit}
        disabled={loading}
      />

      <div className="mt-6 space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-teal-300">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg"
          >
            <option value="Đang triển khai">Đang triển khai</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-teal-300">🖼 Ảnh đại diện</label>
          {currentImage && (
            <img
              src={currentImage}
              alt="Current"
              className="object-cover mb-2 border border-gray-700 rounded w-28 h-28"
            />
          )}
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

        <div>
          <label className="block mb-1 text-sm font-medium text-teal-300">Tags</label>
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:gap-2">
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
              className="px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-400"
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
      </div>
    </motion.section>
  );
}