"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Eye,
  X,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Star,
  LayoutGrid,
  List,
  AlertTriangle,
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  LucideIcon,
  Tag,
  DollarSign,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

interface IService {
  _id: string;
  name: string;
  description: string;
  icon: string;
  status: "Hiển thị" | "Ẩn";
  createdAt: string;
  featured?: boolean;
  price?: number;
  category?: string;
  image?: string;
}

// Map string icon name → actual LucideIcon component
const iconMap: Record<string, LucideIcon> = {
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  Wrench,
  Settings,
};

const PAGE_SIZE = 6;

export default function ServiceListClient() {
  const [services, setServices] = useState<IService[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Map data đảm bảo không bị lỗi null/undefined
        const formattedData = data.map((service: any) => ({
          ...service,
          featured: service.featured || false,
          price: service.price || 0,
          category: service.category || "General",
          image: service.image || "", // Đảm bảo có trường image
        }));

        setServices(formattedData);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách dịch vụ!");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || service.status === filterStatus)
  );

  const totalPages = Math.ceil(filteredServices.length / PAGE_SIZE);
  const currentData = filteredServices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getStatusColor = (status: string) => {
    return status === "Hiển thị"
      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
      : "bg-slate-50 text-slate-500 border-slate-200";
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/services/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete service");
      toast.success("Xoá dịch vụ thành công!");
      setServices(services.filter((service) => service._id !== deleteId));
    } catch (err) {
      toast.error("Xoá dịch vụ thất bại!");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-200 rounded-full border-t-orange-500 animate-spin" />
          <p className="text-sm font-bold text-slate-400 animate-pulse">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#334155",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
        }}
      />

      {/* 1. HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-6 mb-8 md:flex-row md:items-center"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white border border-orange-100 shadow-sm rounded-2xl">
            <Wrench size={28} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Quản lý Dịch vụ
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Tổng cộng{" "}
              <span className="font-bold text-orange-600">
                {services.length}
              </span>{" "}
              dịch vụ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/services/create">
            <button className="relative flex items-center gap-2 px-6 py-3 overflow-hidden text-sm font-bold text-white transition-all shadow-lg group bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-orange-500/20 hover:shadow-orange-500/30">
              <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-white/20 group-hover:translate-y-0" />
              <Plus size={20} strokeWidth={2.5} />
              <span>Thêm dịch vụ</span>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* 2. TOOLBAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-3 p-2 mb-8 bg-white border shadow-sm border-orange-100 rounded-[20px] md:flex-row z-30"
      >
        {/* Search */}
        <div className="relative flex-1 group">
          <Search
            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-orange-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all border border-transparent outline-none bg-slate-50 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-1 overflow-x-auto bg-slate-50 rounded-2xl no-scrollbar">
          <div className="relative px-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-2 pl-8 pr-8 text-sm font-bold transition-colors bg-transparent appearance-none cursor-pointer text-slate-600 focus:outline-none hover:text-orange-600"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Hiển thị">Hiển thị</option>
              <option value="Ẩn">Ẩn</option>
            </select>
            <Filter
              className="absolute -translate-y-1/2 pointer-events-none left-2 top-1/2 text-slate-400"
              size={16}
            />
          </div>

          <div className="w-[1px] h-6 bg-slate-200 mx-1" />

          <div className="flex gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "list"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3. SERVICE LIST */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentData.map((service, index) => {
              const Icon = iconMap[service.icon] || Wrench;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] border border-slate-100 hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  {/* --- Header Card (Image or Icon) --- */}
                  <div className="relative h-48 overflow-hidden border-b bg-slate-50 border-slate-100">
                    {/* Actions (Top Right) */}
                    <div className="absolute z-20 flex gap-2 top-4 right-4">
                      <button
                        onClick={() => setSelected(service)}
                        className="p-2 transition-colors border rounded-lg shadow-sm bg-white/90 text-slate-500 hover:text-orange-600 border-slate-200 hover:border-orange-200 backdrop-blur-sm"
                      >
                        <Eye size={16} />
                      </button>
                      <Link href={`/admin/services/edit/${service._id}`}>
                        <button className="p-2 transition-colors border rounded-lg shadow-sm bg-white/90 text-slate-500 hover:text-blue-600 border-slate-200 hover:border-blue-200 backdrop-blur-sm">
                          <Edit3 size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => confirmDelete(service._id)}
                        className="p-2 transition-colors border rounded-lg shadow-sm bg-white/90 text-slate-500 hover:text-red-600 border-slate-200 hover:border-red-200 backdrop-blur-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Featured Badge */}
                    {service.featured && (
                      <div className="absolute z-20 top-4 left-4">
                        <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wide rounded-lg border border-yellow-200 shadow-sm">
                          <Star size={10} fill="currentColor" /> Featured
                        </span>
                      </div>
                    )}

                    {/* Image or Fallback Icon */}
                    {service.image ? (
                      <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/10 to-transparent group-hover:opacity-100" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full transition-colors bg-gradient-to-br from-orange-50 to-amber-50 group-hover:from-orange-100 group-hover:to-amber-100">
                        <div className="flex items-center justify-center w-16 h-16 text-white transition-transform duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-orange-500/30 group-hover:scale-110 ring-4 ring-white">
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- Body Card --- */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-lg font-extrabold transition-colors cursor-pointer text-slate-800 line-clamp-1 group-hover:text-orange-600"
                        title={service.name}
                      >
                        {service.name}
                      </h3>
                      {!service.image && (
                        <Icon size={18} className="text-slate-300" />
                      )}
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex flex-col gap-3 pt-4 mt-auto border-t border-slate-50">
                      {/* Info Row */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(
                            service.status
                          )}`}
                        >
                          {service.status}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg text-slate-400 bg-slate-50">
                          <Tag size={12} /> {service.category || "General"}
                        </span>
                      </div>

                      {/* Price Row */}
                      <div className="flex items-end justify-between">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          Giá khởi điểm
                        </div>
                        <div className="flex items-baseline gap-1 text-lg font-extrabold text-slate-800">
                          {service.price?.toLocaleString()}{" "}
                          <span className="text-xs font-medium text-slate-400">
                            VNĐ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[24px] border border-orange-100 shadow-sm overflow-hidden"
          >
            {/* List view table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-slate-50/50 border-slate-100">
                  <tr className="text-xs font-bold tracking-wider text-left uppercase text-slate-400">
                    <th className="px-6 py-4 pl-8">Dịch vụ</th>
                    <th className="px-6 py-4">Danh mục</th>
                    <th className="px-6 py-4">Giá (VNĐ)</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 pr-8 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentData.map((service, index) => {
                    const Icon = iconMap[service.icon] || Wrench;
                    return (
                      <motion.tr
                        key={service._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="transition-colors group hover:bg-orange-50/30"
                      >
                        <td className="px-6 py-4 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden border rounded-xl border-slate-200 bg-slate-50">
                              {service.image ? (
                                <Image
                                  src={service.image}
                                  alt={service.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full text-orange-500">
                                  <Icon size={20} />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold transition-colors text-slate-800 group-hover:text-orange-600 line-clamp-1">
                                {service.name}
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-bold border rounded-lg bg-slate-100 text-slate-600 border-slate-200">
                            {service.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-700">
                          {service.price?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(
                              service.status
                            )}`}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 pr-8 text-right">
                          <div className="flex justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => setSelected(service)}
                              className="p-2 transition-colors border border-transparent rounded-lg shadow-sm hover:bg-white hover:text-orange-600 hover:border-orange-100"
                            >
                              <Eye size={16} />
                            </button>
                            <Link href={`/admin/services/edit/${service._id}`}>
                              <button className="p-2 transition-colors border border-transparent rounded-lg shadow-sm hover:bg-white hover:text-blue-600 hover:border-blue-100">
                                <Edit3 size={16} />
                              </button>
                            </Link>
                            <button
                              onClick={() => confirmDelete(service._id)}
                              className="p-2 transition-colors border border-transparent rounded-lg shadow-sm hover:bg-white hover:text-red-600 hover:border-red-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PAGINATION */}
      {!loading && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white text-slate-500 border border-orange-100 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* 5. MODALS */}
      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-8 bg-white rounded-[2rem] shadow-2xl border border-slate-100 text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 ring-8 ring-red-50/50">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-slate-800">
                Xóa dịch vụ?
              </h3>
              <p className="mb-8 text-sm text-slate-500">
                Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 font-bold text-white bg-red-500 shadow-lg rounded-xl hover:bg-red-600 shadow-red-500/30"
                >
                  {isDeleting ? "Đang xóa..." : "Xóa ngay"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const Icon = iconMap[selected.icon] || Wrench;
                return (
                  <div className="relative h-64 border-b bg-slate-50 border-slate-100">
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute z-20 p-2 transition-colors border rounded-full shadow-sm bg-white/80 top-4 right-4 hover:bg-white text-slate-600 border-slate-200"
                    >
                      <X size={20} />
                    </button>

                    {selected.image ? (
                      <Image
                        src={selected.image}
                        alt={selected.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-orange-50 to-amber-50">
                        <div className="flex items-center justify-center w-24 h-24 text-white shadow-xl bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl shadow-orange-500/30 ring-8 ring-white">
                          <Icon size={48} strokeWidth={1.5} />
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full p-6 pt-12 bg-gradient-to-t from-white via-white/90 to-transparent">
                      <h2 className="text-2xl font-extrabold text-slate-800 line-clamp-1">
                        {selected.name}
                      </h2>
                      <span className="inline-block px-3 py-1 mt-2 text-xs font-bold tracking-wide uppercase bg-white border rounded-full shadow-sm text-slate-500 border-slate-200">
                        {selected.category || "General"}
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="p-8">
                <div className="flex items-center justify-between p-4 mb-6 border bg-slate-50 rounded-2xl border-slate-100">
                  <span className="text-sm font-medium tracking-wide uppercase text-slate-500">
                    Giá dịch vụ
                  </span>
                  <span className="flex items-center gap-1 text-xl font-extrabold text-slate-800">
                    <DollarSign size={18} className="text-green-500" />{" "}
                    {selected.price?.toLocaleString()}
                    <span className="text-xs font-medium text-slate-400">
                      VNĐ
                    </span>
                  </span>
                </div>

                <h3 className="mb-2 text-sm font-bold tracking-wide uppercase text-slate-800">
                  Mô tả chi tiết
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-slate-600">
                  {selected.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(
                      selected.status
                    )}`}
                  >
                    {selected.status}
                  </span>
                  <Link href={`/admin/services/edit/${selected._id}`}>
                    <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white transition-colors shadow-lg bg-slate-900 rounded-xl hover:bg-orange-500">
                      <Edit3 size={16} /> Chỉnh sửa
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
