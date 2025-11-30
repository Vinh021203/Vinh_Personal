"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  List,
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
  Image as ImageIcon,
  Edit3,
  Trash2,
  Clock,
  Archive,
  Star,
  AlertTriangle,
  CheckCircle,
  X,
  DollarSign,
  Activity,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

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
  // --- LOGIC BACKEND GIỮ NGUYÊN ---
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
        setProjects([
          {
            _id: "1",
            name: "Website VinhWorks",
            client: "VinhWorks",
            status: "Hoàn thành",
            description:
              "Thiết kế và phát triển website portfolio cá nhân với Next.js và Tailwind CSS",
            image:
              "https://api.dicebear.com/7.x/shapes/svg?seed=project1&backgroundColor=f97316",
            tags: ["React", "Next.js", "Tailwind"],
            createdAt: new Date().toISOString(),
            budget: 25000,
            progress: 100,
            priority: "high",
            featured: true,
          },
          {
            _id: "2",
            name: "E-commerce App",
            client: "TechStore",
            status: "Đang thực hiện",
            description: "Ứng dụng bán hàng trực tuyến đa nền tảng",
            image:
              "https://api.dicebear.com/7.x/shapes/svg?seed=project2&backgroundColor=fbbf24",
            tags: ["Node.js", "MongoDB", "Flutter"],
            createdAt: new Date().toISOString(),
            budget: 45000,
            progress: 65,
            priority: "medium",
            featured: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getStatusColor = (status: string | undefined | null) => {
    if (!status) return "bg-slate-50 text-slate-500 border-slate-200";

    switch (status.toLowerCase()) {
      case "hoàn thành":
        return "bg-green-50 text-green-600 border-green-200";
      case "đang thực hiện":
      case "đang triển khai": // Thêm case này nếu cần đồng bộ
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "tạm dừng":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "hủy bỏ":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string | undefined | null) => {
    if (!priority) return "text-slate-600 bg-slate-50 border-slate-100";

    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-100";
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-100";
      default:
        return "text-slate-600 bg-slate-50 border-slate-100";
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

  // --- RENDER ---
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
            <Briefcase size={28} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Quản lý Dự án
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Tổng cộng{" "}
              <span className="font-bold text-orange-600">
                {projects.length}
              </span>{" "}
              dự án đang hoạt động
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/projects/create">
            <button className="relative flex items-center gap-2 px-6 py-3 overflow-hidden text-sm font-bold text-white transition-all shadow-lg group bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-orange-500/20 hover:shadow-orange-500/30">
              <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-white/20 group-hover:translate-y-0" />
              <Plus size={20} strokeWidth={2.5} />
              <span>Thêm dự án</span>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* 2. TOOLBAR - Đã xóa Sticky */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-2 bg-white border border-orange-100 rounded-[20px] shadow-sm flex flex-col md:flex-row gap-3 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1 group">
          <Search
            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-orange-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm dự án, khách hàng..."
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
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Tạm dừng">Tạm dừng</option>
              <option value="Hủy bỏ">Hủy bỏ</option>
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

      {/* 3. PROJECT LIST */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-[2rem] border border-orange-100/60 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Area */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 transform group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg"; // Fallback nếu ảnh lỗi
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <ImageIcon size={48} strokeWidth={1} />
                    </div>
                  )}

                  {/* Status & Priority Badges */}
                  <div className="absolute z-10 flex items-start justify-between top-4 left-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                    {project.priority && (
                      <span
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border shadow-sm backdrop-blur-md flex items-center gap-1 ${getPriorityColor(
                          project.priority
                        )}`}
                      >
                        <Activity size={12} /> {project.priority}
                      </span>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => setPreview(project)}
                      className="p-3 text-white transition-all border bg-white/20 rounded-xl backdrop-blur-md hover:bg-white hover:text-orange-600 border-white/30"
                    >
                      <Eye size={20} />
                    </button>
                    <Link href={`/admin/projects/edit/${project._id}`}>
                      <button className="p-3 text-white transition-all border bg-white/20 rounded-xl backdrop-blur-md hover:bg-white hover:text-blue-600 border-white/30">
                        <Edit3 size={20} />
                      </button>
                    </Link>
                    <button
                      onClick={() => confirmDelete(project._id)}
                      className="p-3 text-white transition-all border bg-white/20 rounded-xl backdrop-blur-md hover:bg-white hover:text-red-600 border-white/30"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="mb-1 text-lg font-bold transition-colors text-slate-800 line-clamp-1 group-hover:text-orange-600">
                        {project.name}
                      </h3>
                      <p className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <User size={12} /> {project.client}
                      </p>
                    </div>
                    {project.featured && (
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    )}
                  </div>

                  <p className="flex-1 mb-4 text-sm text-slate-500 line-clamp-2">
                    {project.description || "Chưa có mô tả dự án..."}
                  </p>

                  {/* Budget & Progress */}
                  <div className="pt-4 space-y-3 border-t border-slate-50">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} className="text-green-500" />{" "}
                        {project.budget?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-blue-500" />{" "}
                        {new Date(project.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                        <span>Tiến độ</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${
                            project.progress === 100
                              ? "bg-green-500"
                              : "bg-gradient-to-r from-orange-400 to-amber-400"
                          }`}
                        />
                      </div>
                    </div>
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
            className="bg-white rounded-[24px] border border-orange-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-slate-50/50 border-slate-100">
                  <tr className="text-xs font-bold tracking-wider text-left uppercase text-slate-400">
                    <th className="px-6 py-4 pl-8">Dự án</th>
                    <th className="px-6 py-4">Khách hàng</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4">Tiến độ</th>
                    <th className="px-6 py-4 pr-8 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentProjects.map((project, index) => (
                    <motion.tr
                      key={project._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="transition-colors group hover:bg-orange-50/30"
                    >
                      <td className="px-6 py-4 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden border rounded-xl border-slate-100">
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt=""
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-slate-50 text-slate-300">
                                <ImageIcon size={20} strokeWidth={1.5} />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold transition-colors text-slate-800 group-hover:text-orange-600">
                              {project.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {project._id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {project.client}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="w-48 px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="w-8 text-xs font-bold text-slate-500">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 pr-8 text-right">
                        <div className="flex justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => setPreview(project)}
                            className="p-2 transition-colors border border-transparent rounded-lg hover:bg-white hover:text-orange-600 hover:border-orange-100"
                          >
                            <Eye size={16} />
                          </button>
                          <Link href={`/admin/projects/edit/${project._id}`}>
                            <button className="p-2 transition-colors border border-transparent rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-100">
                              <Edit3 size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => confirmDelete(project._id)}
                            className="p-2 transition-colors border border-transparent rounded-lg hover:bg-white hover:text-red-600 hover:border-red-100"
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

      {/* 5. DELETE MODAL */}
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
              className="w-full max-w-md p-8 bg-white rounded-[2rem] shadow-2xl border border-slate-100"
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 ring-8 ring-red-50/50">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="mb-2 text-2xl font-extrabold text-slate-800">
                  Xác nhận xóa?
                </h2>
                <p className="mb-8 text-sm font-medium text-slate-500">
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 font-bold transition-colors text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center flex-1 gap-2 px-4 py-3 font-bold text-white transition-colors bg-red-500 shadow-lg rounded-xl hover:bg-red-600 shadow-red-500/30"
                  >
                    {isDeleting ? "Đang xóa..." : "Xóa ngay"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. PREVIEW MODAL */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative w-full h-64 bg-slate-100">
                {preview.image ? (
                  <Image
                    src={preview.image}
                    alt={preview.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <ImageIcon size={64} strokeWidth={1} />
                  </div>
                )}
                <button
                  onClick={() => setPreview(null)}
                  className="absolute p-2 text-white transition-colors rounded-full top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="mb-1 text-3xl font-extrabold text-white">
                    {preview.name}
                  </h2>
                  <p className="flex items-center gap-2 text-sm text-white/80">
                    <User size={14} /> {preview.client}
                  </p>
                </div>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 border bg-slate-50 rounded-2xl border-slate-100">
                    <span className="block mb-1 text-xs font-bold uppercase text-slate-400">
                      Ngân sách
                    </span>
                    <span className="flex items-center gap-1 text-lg font-bold text-slate-800">
                      <DollarSign size={16} className="text-green-500" />{" "}
                      {preview.budget?.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-4 border bg-slate-50 rounded-2xl border-slate-100">
                    <span className="block mb-1 text-xs font-bold uppercase text-slate-400">
                      Tiến độ
                    </span>
                    <span className="flex items-center gap-1 text-lg font-bold text-slate-800">
                      <Activity size={16} className="text-blue-500" />{" "}
                      {preview.progress}%
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 font-bold text-slate-800">Mô tả dự án</h3>
                <p className="mb-6 leading-relaxed text-slate-600">
                  {preview.description ||
                    "Chưa có mô tả chi tiết cho dự án này."}
                </p>

                {preview.tags && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                    {preview.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-bold bg-white border rounded-full shadow-sm border-slate-200 text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
