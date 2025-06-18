"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  X,
  Pencil,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit3,
  ExternalLink,
  Clock,
  Tag,
  Image as ImageIcon,
  Sparkles,
  TrendingUp,
  Archive,
  Star,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Globe,
  Monitor,
  Award,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const PAGE_SIZE = 6;

interface Project {
  _id: string;
  name: string;
  client: string;
  status: string;
  description?: string;
  image?: string;
  tags?: string[];
  createdAt: string;
  budget?: number;
  progress?: number;
  priority?: "low" | "medium" | "high";
  featured?: boolean;
}

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || project.status === filterStatus)
  );
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        // Mock additional data for demo
        const enhancedData = data.map((project: any, index: number) => ({
          ...project,
          budget: Math.floor(Math.random() * 50000) + 10000,
          progress: Math.floor(Math.random() * 100),
          priority: ["low", "medium", "high"][index % 3] as
            | "low"
            | "medium"
            | "high",
          featured: index < 2,
        }));
        setProjects(enhancedData);
      } catch {
        toast.error("Không thể tải danh sách dự án!");
        // Mock data for demo
        setProjects([
          {
            _id: "1",
            name: "Website VinhWorks",
            client: "VinhWorks",
            status: "Hoàn thành",
            description:
              "Thiết kế và phát triển website portfolio cá nhân với Next.js và Tailwind CSS",
            image: "/placeholder.jpg",
            tags: ["React", "Next.js", "Tailwind"],
            createdAt: new Date().toISOString(),
            budget: 25000,
            progress: 100,
            priority: "high",
            featured: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "hoàn thành":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "đang thực hiện":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "tạm dừng":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hủy bỏ":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/projects/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Xoá dự án thành công!");
      setProjects(projects.filter((project) => project._id !== deleteId));
    } catch (err) {
      toast.error("Xoá dự án thất bại!");
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
            Đang tải dự án...
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
            <FolderKanban size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Quản lý Dự án
            </h1>
            <p className="mt-1 text-gray-400">
              Tổng cộng {projects.length} dự án
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/admin/projects/create"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl"
            >
              <Plus size={20} />
              <span>Thêm dự án</span>
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
              placeholder="Tìm kiếm dự án..."
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
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Tạm dừng">Tạm dừng</option>
                <option value="Hủy bỏ">Hủy bỏ</option>
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
                <FolderKanban size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Display */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative overflow-hidden transition-all duration-300 border shadow-2xl group rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute z-10 flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-300 border rounded-full top-4 left-4 bg-yellow-500/20 border-yellow-500/30">
                    <Star className="w-3 h-3" />
                    Nổi bật
                  </div>
                )}

                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 z-10 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </div>

                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Progress Bar */}
                  {project.progress !== undefined && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-2 text-sm text-white">
                        <span>Tiến độ</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/30">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-white transition-all line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>
                        {new Date(project.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    {project.budget && (
                      <div className="flex items-center gap-1">
                        <DollarSign size={12} />
                        <span>{project.budget.toLocaleString("vi-VN")}đ</span>
                      </div>
                    )}
                  </div>

                  <p className="mb-4 text-sm text-gray-300 line-clamp-2">
                    {project.description || "Không có mô tả"}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30"
                        >
                          #{tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400 border rounded-full bg-gray-500/20 border-gray-500/30">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Priority */}
                  {project.priority && (
                    <div className="mb-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                          project.priority
                        )}`}
                      >
                        {project.priority === "high"
                          ? "Cao"
                          : project.priority === "medium"
                          ? "Trung bình"
                          : "Thấp"}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/projects/edit/${project._id}`}>
                        <button className="p-2 text-blue-400 transition-all rounded-lg hover:text-blue-300 hover:bg-blue-500/10">
                          <Edit3 size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => setPreview(project)}
                        className="p-2 text-green-400 transition-all rounded-lg hover:text-green-300 hover:bg-green-500/10"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(project._id)}
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
            ))}
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
                      Dự án
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Khách hàng
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Tiến độ
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
                  {currentProjects.map((project, index) => (
                    <motion.tr
                      key={project._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="transition-colors border-b border-purple-500/10 hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-xl">
                            <Image
                              src={project.image || "/placeholder.jpg"}
                              alt={project.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-white line-clamp-1">
                              {project.name}
                            </h3>
                            {project.tags && project.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {project.tags.slice(0, 2).map((tag, i) => (
                                  <span
                                    key={i}
                                    className="text-xs text-purple-400"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {project.client}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-700 rounded-full">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                              style={{ width: `${project.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">
                            {project.progress || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(project.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/admin/projects/edit/${project._id}`}>
                            <button className="p-2 text-blue-400 transition-all rounded-lg hover:text-blue-300 hover:bg-blue-500/10">
                              <Edit3 size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => setPreview(project)}
                            className="p-2 text-green-400 transition-all rounded-lg hover:text-green-300 hover:bg-green-500/10"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => confirmDelete(project._id)}
                            className="p-2 text-red-400 transition-all rounded-lg hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
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
                  Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể
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
        {preview && (
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
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-purple-500/20 bg-slate-900/95 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white">Chi tiết dự án</h2>
                <button
                  onClick={() => setPreview(null)}
                  className="p-2 text-gray-400 transition-all hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {preview.image && (
                  <div className="relative mb-6 overflow-hidden aspect-video rounded-2xl">
                    <Image
                      src={preview.image}
                      alt={preview.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    {preview.name}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{preview.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(preview.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    {preview.budget && (
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} />
                        <span>{preview.budget.toLocaleString("vi-VN")}đ</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                        preview.status
                      )}`}
                    >
                      {preview.status}
                    </span>
                    {preview.priority && (
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(
                          preview.priority
                        )}`}
                      >
                        Ưu tiên:{" "}
                        {preview.priority === "high"
                          ? "Cao"
                          : preview.priority === "medium"
                          ? "Trung bình"
                          : "Thấp"}
                      </span>
                    )}
                  </div>

                  {preview.progress !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm text-gray-300">
                        <span>Tiến độ hoàn thành</span>
                        <span>{preview.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-700 rounded-full">
                        <div
                          className="h-3 transition-all duration-1000 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                          style={{ width: `${preview.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {preview.tags && preview.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {preview.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    <p className="leading-relaxed text-gray-300">
                      {preview.description || "Không có mô tả chi tiết."}
                    </p>
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
