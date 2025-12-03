"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Edit3,
  Clock,
  Archive,
  Star,
  AlertTriangle,
  FileText,
  CheckCircle,
  X,
  Layers,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// --- CONFIG ---
const PAGE_SIZE = 8;

// --- TYPES ---
interface Post {
  _id: string;
  title: string;
  author: string;
  date: string; // Hoặc createdAt từ DB
  thumbnail?: string;
  content?: string;
  status: "published" | "draft" | "archived";
  tags?: string[];
  views: number;
  featured?: boolean;
  category?: string;
  slug?: string;
  createdAt?: string; // Thêm trường này để fallback cho date
}

// --- UTILS ---
const getStatusStyles = (status: string) => {
  switch (status) {
    case "published":
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "draft":
      return "bg-amber-50 text-amber-600 border-amber-200";
    case "archived":
      return "bg-slate-50 text-slate-500 border-slate-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "published":
      return "Đã đăng";
    case "draft":
      return "Nháp";
    case "archived":
      return "Lưu trữ";
    default:
      return "Khác";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "published":
      return <CheckCircle size={12} strokeWidth={2.5} />;
    case "draft":
      return <Clock size={12} strokeWidth={2.5} />;
    case "archived":
      return <Archive size={12} strokeWidth={2.5} />;
    default:
      return <FileText size={12} strokeWidth={2.5} />;
  }
};

// --- COMPONENTS ---

// 1. Skeleton Loader
const SkeletonCard = () => (
  <div className="bg-white rounded-[2rem] border border-slate-100 p-4 shadow-sm animate-pulse">
    <div className="w-full h-48 mb-4 bg-slate-100 rounded-2xl" />
    <div className="w-3/4 h-4 mb-2 rounded bg-slate-100" />
    <div className="w-1/2 h-3 mb-4 rounded bg-slate-100" />
    <div className="flex justify-between mt-4">
      <div className="w-20 h-8 rounded-full bg-slate-100" />
      <div className="w-8 h-8 rounded-full bg-slate-100" />
    </div>
  </div>
);

// 2. Filter Button
const FilterButton = ({ active, label, icon: Icon, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
      active
        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
        : "bg-white text-slate-500 border border-slate-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
    }`}
  >
    {Icon && <Icon size={16} />}
    {label}
  </button>
);

export default function PostListClient() {
  // --- STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // --- DATA FILTERING ---
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || post.status === filterStatus)
  );

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const currentData = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // --- API EFFECT ---
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();

        const formattedData = data.map((post: any) => ({
          ...post,
          status: post.status || "draft",
          views: post.views || 0,
          tags: post.tags || [],
          category: post.category || "Uncategorized",
          author: post.author || "Admin",
          date: post.date || post.createdAt || new Date().toISOString(),
        }));

        setPosts(formattedData);
      } catch (err) {
        console.error("Error fetching posts:", err);
        toast.error("Không thể tải bài viết!");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // --- HANDLERS ---
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Xoá bài viết thành công!");
      setPosts(posts.filter((post) => post._id !== deleteId));
    } catch (err) {
      toast.error("Xoá bài viết thất bại!");
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setDeleteId(null);
    }
  };

  // --- RENDER ---
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#fff", color: "#334155" },
        }}
      />

      {/* 1. HEADER */}
      <div className="flex flex-col justify-between gap-6 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Quản lý Bài viết <span className="text-orange-500">.</span>
          </h1>
          <p className="flex items-center gap-2 mt-1 font-medium text-slate-500">
            <Layers size={16} className="text-orange-400" />
            Tổng số <strong className="text-slate-800">
              {posts.length}
            </strong>{" "}
            bài viết
          </p>
        </div>
        <Link href="/admin/posts/create">
          <button className="group relative px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 overflow-hidden">
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              <Plus size={18} /> Viết bài mới
            </span>
          </button>
        </Link>
      </div>

      {/* 2. TOOLBAR */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center"
      >
        {/* Search */}
        <div className="relative w-full lg:w-96 group">
          <Search
            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-orange-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm tiêu đề, tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all border border-transparent outline-none bg-slate-50 rounded-2xl focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 placeholder:text-slate-400 text-slate-700"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center w-full gap-2 pb-2 overflow-x-auto lg:w-auto lg:pb-0 no-scrollbar">
          <FilterButton
            active={filterStatus === "all"}
            label="Tất cả"
            icon={Filter}
            onClick={() => setFilterStatus("all")}
          />
          <FilterButton
            active={filterStatus === "published"}
            label="Đã đăng"
            icon={CheckCircle}
            onClick={() => setFilterStatus("published")}
          />
          <FilterButton
            active={filterStatus === "draft"}
            label="Nháp"
            icon={Pencil}
            onClick={() => setFilterStatus("draft")}
          />
          <div className="w-[1px] h-8 bg-slate-200 mx-2 hidden lg:block" />
          <div className="flex p-1 bg-slate-100 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
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

      {/* 3. CONTENT */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {currentData.length > 0 ? (
              currentData.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-slate-50">
                    <div className="absolute z-10 flex items-start justify-between w-full px-4 top-4">
                      <div
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md flex items-center gap-1.5 ${getStatusStyles(
                          post.status
                        )}`}
                      >
                        {getStatusIcon(post.status)}
                        {getStatusLabel(post.status)}
                      </div>
                      {post.featured && (
                        <span className="p-1.5 text-white bg-yellow-400 border border-yellow-300 rounded-full shadow-sm">
                          <Star size={12} fill="currentColor" />
                        </span>
                      )}
                    </div>
                    <Image
                      src={post.thumbnail || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 transform group-hover:scale-110"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg";
                      }}
                    />
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <button
                        onClick={() => setPreviewPost(post)}
                        className="p-2.5 bg-white/90 rounded-xl hover:bg-white hover:text-orange-600 transition-colors shadow-lg"
                      >
                        <Eye size={18} />
                      </button>
                      <Link href={`/admin/posts/edit/${post._id}`}>
                        <button className="p-2.5 bg-white/90 rounded-xl hover:bg-white hover:text-blue-600 transition-colors shadow-lg">
                          <Edit3 size={18} />
                        </button>
                      </Link>
                      <button
                        onClick={() => confirmDelete(post._id)}
                        className="p-2.5 bg-white/90 rounded-xl hover:bg-white hover:text-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-wide">
                      <span className="px-2 py-1 text-blue-600 uppercase border border-blue-100 rounded-lg bg-blue-50">
                        {post.category || "General"}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-medium text-slate-400">
                        {new Date(post.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold leading-snug transition-colors text-slate-800 line-clamp-2 group-hover:text-orange-600">
                      {post.title}
                    </h3>

                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white">
                          {post.author
                            ? post.author.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[80px]">
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg text-slate-400 bg-slate-50">
                        <Eye size={12} /> {post.views?.toLocaleString() || 0}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 col-span-full text-slate-400">
                <FileText size={48} className="mb-4 text-slate-200" />
                <p>Chưa có bài viết nào.</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-slate-50/50 border-slate-100">
                  <tr className="text-xs font-bold tracking-wider text-left uppercase text-slate-400">
                    <th className="px-6 py-4 pl-8">Bài viết</th>
                    <th className="px-6 py-4">Danh mục & Tags</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Lượt xem</th>
                    <th className="px-6 py-4 pr-8 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentData.map((post, index) => (
                    <motion.tr
                      key={post._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="transition-colors group hover:bg-orange-50/30"
                    >
                      <td className="px-6 py-4 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-12 overflow-hidden border rounded-lg border-slate-100 shrink-0">
                            <Image
                              src={post.thumbnail || "/placeholder.jpg"}
                              alt=""
                              fill
                              className="object-cover"
                              unoptimized
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.jpg";
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold transition-colors text-slate-800 group-hover:text-orange-600 line-clamp-1">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>
                                {new Date(post.date).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-bold text-blue-600 w-fit">
                            {post.category || "General"}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {post.tags?.slice(0, 2).map((t, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200"
                              >
                                #{t}
                              </span>
                            ))}
                            {post.tags && post.tags.length > 2 && (
                              <span className="text-[10px] text-slate-400">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(
                            post.status
                          )}`}
                        >
                          {getStatusIcon(post.status)}
                          {getStatusLabel(post.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-right text-slate-600">
                        {post.views?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4 pr-8 text-right">
                        <div className="flex justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => setPreviewPost(post)}
                            className="p-2 transition-colors rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50"
                          >
                            <Eye size={16} />
                          </button>
                          <Link href={`/admin/posts/edit/${post._id}`}>
                            <button className="p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                              <Edit3 size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => confirmDelete(post._id)}
                            className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
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
      {!loading && totalPages > 0 && (
        <div className="flex justify-center gap-2 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-orange-500 hover:text-orange-600"
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
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-50">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-slate-800">
                Xác nhận xóa?
              </h3>
              <p className="mb-8 text-sm text-slate-500">
                Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 font-bold text-white bg-red-500 shadow-lg rounded-xl hover:bg-red-600 shadow-red-500/30"
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
        {previewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setPreviewPost(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar"
            >
              <div className="relative w-full h-72">
                <Image
                  src={previewPost.thumbnail || "/placeholder.jpg"}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpg";
                  }}
                />
                <button
                  onClick={() => setPreviewPost(null)}
                  className="absolute p-2 text-white transition-colors rounded-full top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/20 text-white backdrop-blur-sm border border-white/10`}
                    >
                      {previewPost.category || "General"}
                    </span>
                    {previewPost.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-yellow-500 text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-black leading-tight text-white">
                    {previewPost.title}
                  </h2>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 pb-6 mb-6 text-sm border-b border-slate-100 text-slate-500">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-orange-500" />{" "}
                    <span className="font-bold text-slate-700">
                      {previewPost.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />{" "}
                    {new Date(previewPost.date).toLocaleDateString("vi-VN")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} /> {previewPost.views?.toLocaleString() || 0}{" "}
                    lượt xem
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {previewPost.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded-full bg-slate-50 text-slate-600 border-slate-100"
                    >
                      <Hash size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="leading-relaxed whitespace-pre-wrap text-slate-600">
                    {previewPost.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
