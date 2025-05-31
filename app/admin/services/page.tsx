'use client';

import Link from 'next/link';
import { Wrench, Pencil, Eye, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  CheckCircle,
  LucideIcon,
} from 'lucide-react';

interface IService {
  _id: string;
  name: string;
  description: string;
  icon: string;
  status: 'Hiển thị' | 'Ẩn';
  createdAt: string;
}

// Map string icon name → actual LucideIcon component
const iconMap: Record<string, LucideIcon> = {
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  CheckCircle,
};

const PAGE_SIZE = 4;

export default function ServiceListPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<IService | null>(null);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => console.error('Không thể tải danh sách dịch vụ.'));
  }, []);

  const totalPages = Math.ceil(services.length / PAGE_SIZE);
  const currentData = services.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="max-w-6xl px-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="p-2 bg-teal-500 shadow-lg rounded-xl"
          >
            <Wrench size={22} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">
            Quản lý <span className="text-teal-400">Dịch vụ</span>
          </h1>
        </div>
        <Link
          href="/admin/services/create"
          className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded hover:bg-teal-400"
        >
          + Thêm dịch vụ
        </Link>
      </div>

      {/* Danh sách dịch vụ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentData.map((svc) => {
          const Icon = iconMap[svc.icon];
          return (
            <div
              key={svc._id}
              className="flex flex-col justify-between p-4 border rounded-lg bg-white/5 border-white/10 hover:bg-white/10"
            >
              <div>
                {Icon && <Icon size={28} className="mb-3 text-teal-300" />}
                <h2 className="mb-2 text-lg font-bold text-white">{svc.name}</h2>
                <p className="mb-3 text-sm text-gray-300">{svc.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href={`/admin/services/edit/${svc._id}`}
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                >
                  <Pencil size={14} /> Sửa
                </Link>
                <button
                  onClick={() => setSelected(svc)}
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                >
                  <Eye size={14} /> Xem
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center gap-4 mt-6">
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

      {/* Modal xem nhanh */}
      {/* Modal xem nhanh */}
<AnimatePresence>
  {selected && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md p-6 bg-gray-900 border shadow-xl rounded-xl border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">👁️ Xem dịch vụ</h2>
          <button
            onClick={() => setSelected(null)}
            className="text-white hover:text-red-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <strong className="text-white">Icon:</strong>
            {(() => {
              const SelectedIcon = iconMap[selected.icon];
              return SelectedIcon ? (
                <SelectedIcon size={20} className="text-teal-400" />
              ) : null;
            })()}
            <span>{selected.icon}</span>
          </div>
          <div>
            <strong className="text-white">Tiêu đề:</strong> {selected.name}
          </div>
          <div>
            <strong className="text-white">Mô tả:</strong> {selected.description}
          </div>
          <div>
            <strong className="text-white">Trạng thái:</strong> {selected.status}
          </div>
          <div>
            <strong className="text-white">Ngày tạo:</strong>{' '}
            {new Date(selected.createdAt).toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
