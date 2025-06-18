"use client";

import Link from "next/link";
import {
  Wrench,
  Pencil,
  Eye,
  X,
  Plus,
  Search,
  Filter,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit3,
  Trash2,
  Star,
  Activity,
  LayoutGrid,
  List,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  LucideIcon,
} from "lucide-react";
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

export default function ServiceListPage() {
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
        const res = await fetch("/api/services");
        const data = await res.json();
        // Mock additional data for demo
        const enhancedData = data.map((service: any, index: number) => ({
          ...service,
          featured: index < 2,
          price: Math.floor(Math.random() * 5000000) + 1000000,
          category: ["Web Development", "Design", "SEO", "Consulting"][
            index % 4
          ],
        }));
        setServices(enhancedData);
      } catch (error) {
        toast.error("Không thể tải danh sách dịch vụ!");
        // Mock data for demo
        setServices([
          {
            _id: "1",
            name: "Thiết kế Website",
            description: "Thiết kế website hiện đại, responsive và tối ưu SEO",
            icon: "Code2",
            status: "Hiển thị",
            createdAt: new Date().toISOString(),
            featured: true,
            price: 5000000,
            category: "Web Development",
          },
          {
            _id: "2",
            name: "UI/UX Design",
            description: "Thiết kế giao diện người dùng chuyên nghiệp",
            icon: "MonitorSmartphone",
            status: "Hiển thị",
            createdAt: new Date().toISOString(),
            featured: false,
            price: 3000000,
            category: "Design",
          },
        ]);
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
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 rounded-full border-purple-500/30"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <motion.p
            className="mt-6 text-lg font-medium text-purple-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Đang tải dịch vụ...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            color: "#fff",
            border: "1px solid rgba(147, 51, 234, 0.3)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
          },
        }}
      />

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-3 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl"
          >
            <Wrench size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Quản lý Dịch vụ
            </h1>
            <p className="mt-1 text-gray-400">
              Tổng cộng {services.length} dịch vụ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/admin/services/create"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl"
            >
              <Plus size={20} />
              <span>Thêm dịch vụ</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
      >
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute text-purple-400 transform -translate-y-1/2 left-4 top-1/2"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-purple-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
              >
                <option value="all">Tất cả</option>
                <option value="Hiển thị">Hiển thị</option>
                <option value="Ẩn">Ẩn</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 border bg-slate-700/50 rounded-xl border-purple-500/30">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Display */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentData.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative overflow-hidden transition-all duration-300 border shadow-2xl group rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40"
                >
                  {/* Featured Badge */}
                  {service.featured && (
                    <div className="absolute z-10 flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-300 border rounded-full top-4 left-4 bg-yellow-500/20 border-yellow-500/30">
                      <Star className="w-3 h-3" />
                      Nổi bật
                    </div>
                  )}

                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 right-4 z-10 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      service.status
                    )}`}
                  >
                    {service.status}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform duration-300 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm group-hover:scale-110">
                      {Icon && <Icon size={32} className="text-purple-400" />}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-bold text-white transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-gray-300 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>
                          {new Date(service.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                      {service.price && (
                        <div className="flex items-center gap-1">
                          <span>
                            Từ {service.price.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    {service.category && (
                      <div className="mb-4">
                        <span className="px-2 py-1 text-xs text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30">
                          {service.category}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/services/edit/${service._id}`}>
                          <button className="p-2 text-blue-400 transition-all rounded-lg hover:text-blue-300 hover:bg-blue-500/10">
                            <Edit3 size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => setSelected(service)}
                          className="p-2 text-green-400 transition-all rounded-lg hover:text-green-300 hover:bg-green-500/10"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => confirmDelete(service._id)}
                          className="p-2 text-red-400 transition-all rounded-lg hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <button className="p-2 text-gray-400 transition-all rounded-lg hover:text-white hover:bg-white/10">
                        <MoreHorizontal size={16} />
                      </button>
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
            className="overflow-hidden border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-purple-500/20">
                  <tr>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Dịch vụ
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Mô tả
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4 font-medium text-center text-purple-400">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((service, index) => {
                    const Icon = iconMap[service.icon];
                    return (
                      <motion.tr
                        key={service._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="transition-colors border-b border-purple-500/10 hover:bg-white/5"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                              {Icon && (
                                <Icon size={20} className="text-purple-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-white">
                                {service.name}
                              </h3>
                              {service.category && (
                                <span className="text-xs text-purple-400">
                                  {service.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="max-w-xs px-6 py-4 text-gray-300">
                          <p className="line-clamp-2">{service.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              service.status
                            )}`}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(service.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/services/edit/${service._id}`}>
                              <button className="p-2 text-blue-400 transition-all rounded-lg hover:text-blue-300 hover:bg-blue-500/10">
                                <Edit3 size={16} />
                              </button>
                            </Link>
                            <button
                              onClick={() => setSelected(service)}
                              className="p-2 text-green-400 transition-all rounded-lg hover:text-green-300 hover:bg-green-500/10"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => confirmDelete(service._id)}
                              className="p-2 text-red-400 transition-all rounded-lg hover:text-red-300 hover:bg-red-500/10"
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

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-3 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "border border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-3 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      )}

      {/* Enhanced Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md p-8 border rounded-3xl border-red-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95"
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  Xác nhận xóa
                </h2>
                <p className="mb-8 text-gray-300">
                  Bạn có chắc chắn muốn xóa dịch vụ này? Hành động này không thể
                  hoàn tác.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-3 text-gray-300 transition-all border border-gray-500/30 rounded-xl hover:bg-gray-500/10 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-white transition-all bg-red-500 rounded-xl hover:bg-red-600 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                        Đang xóa...
                      </>
                    ) : (
                      "Xóa ngay"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Preview Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl overflow-hidden border rounded-3xl border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95"
            >
              <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                  <Eye className="w-6 h-6 text-purple-400" />
                  Chi tiết dịch vụ
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 text-gray-400 transition-all hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                    {(() => {
                      const SelectedIcon = iconMap[selected.icon];
                      return SelectedIcon ? (
                        <SelectedIcon size={32} className="text-purple-400" />
                      ) : null;
                    })()}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                      {selected.name}
                    </h3>
                    <p className="mb-4 leading-relaxed text-gray-300">
                      {selected.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {new Date(selected.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                      {selected.price && (
                        <div className="flex items-center gap-1">
                          <span>
                            Giá từ: {selected.price.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-400">
                      Trạng thái
                    </h4>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                        selected.status
                      )}`}
                    >
                      {selected.status}
                    </span>
                  </div>

                  <div className="p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-400">
                      Danh mục
                    </h4>
                    <span className="text-white">
                      {selected.category || "Chưa phân loại"}
                    </span>
                  </div>
                </div>

                <div className="p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                  <h4 className="mb-2 text-sm font-medium text-purple-400">
                    Icon Component
                  </h4>
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 text-sm text-purple-300 rounded bg-slate-700">
                      {selected.icon}
                    </code>
                    {(() => {
                      const SelectedIcon = iconMap[selected.icon];
                      return SelectedIcon ? (
                        <SelectedIcon size={20} className="text-purple-400" />
                      ) : (
                        <span className="text-sm text-red-400">
                          Icon không tìm thấy
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
