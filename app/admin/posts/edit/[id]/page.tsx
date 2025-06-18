"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  Calendar,
  User,
  Tag,
  Monitor,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit3,
  Trash2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PostData {
  title: string;
  content: string;
  thumbnail?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: "published" | "draft" | "archived";
  tags?: string[];
  slug?: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "archived">(
    "draft"
  );
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [author, setAuthor] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Fetch post data
  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Không thể lấy bài viết");
        const data: PostData = await res.json();

        setTitle(data.title || "");
        setContent(data.content || "");
        setThumbnailUrl(data.thumbnail || "");
        setStatus(data.status || "draft");
        setTags(data.tags || []);
        setAuthor(data.author || "VinhWorks");
        setUpdatedAt(data.updatedAt || "");
      } catch (err) {
        toast.error("Bài viết không tồn tại!");
        router.push("/admin/posts");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  // Handle file upload preview
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setIsDirty(true);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle tag addition
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setIsDirty(true);
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setIsDirty(true);
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailUrl("");
    setThumbnailPreview("");
    setIsDirty(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("status", status);
    formData.append("author", author);
    formData.append("tags", JSON.stringify(tags));
    formData.append("updatedAt", new Date().toISOString());

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("✅ Cập nhật bài viết thành công!");
      setIsDirty(false);
      router.push("/admin/posts");
    } catch (err) {
      toast.error("❌ Cập nhật thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-save draft
  const saveDraft = async () => {
    if (!title.trim() && !content.trim()) return;

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("status", "draft");
    formData.append("author", author);
    formData.append("tags", JSON.stringify(tags));
    formData.append("updatedAt", new Date().toISOString());

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: formData,
      });
      toast.success("💾 Đã lưu bản nháp");
      setIsDirty(false);
    } catch (err) {
      toast.error("Không thể lưu bản nháp");
    }
  };

  if (fetchLoading) {
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
            Đang tải bài viết...
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
            <Edit3 size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Chỉnh sửa bài viết
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <FileText size={14} />
                <span>ID: #{id}</span>
              </div>
              {updatedAt && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>
                    Cập nhật: {new Date(updatedAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              )}
              {isDirty && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <AlertCircle size={14} />
                  <span>Có thay đổi chưa lưu</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveDraft}
            disabled={!isDirty}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 transition-all border border-gray-500/30 rounded-xl hover:bg-gray-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            <span>Lưu nháp</span>
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 text-blue-400 transition-all border border-blue-500/30 rounded-xl hover:bg-blue-500/10"
          >
            <Eye size={16} />
            <span>Xem trước</span>
          </button>

          <Link
            href="/admin/posts"
            className="flex items-center gap-2 px-4 py-2 text-purple-400 transition-all border border-purple-500/30 rounded-xl hover:bg-purple-500/10"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </Link>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Tiêu đề bài viết
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                required
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Nội dung (Markdown)
              </label>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Nhập nội dung bài viết (hỗ trợ Markdown)..."
                rows={15}
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border resize-none bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                required
              />
              <p className="mt-2 text-sm text-gray-400">
                Hỗ trợ Markdown: **bold**, *italic*, `code`, [link](url), #
                heading
              </p>
            </motion.div>

            {/* Thumbnail Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Ảnh đại diện
              </label>

              {/* Current/Preview Image */}
              {(thumbnailPreview || thumbnailUrl) && (
                <div className="relative inline-block mb-4">
                  <Image
                    src={thumbnailPreview || thumbnailUrl}
                    alt="Thumbnail"
                    width={200}
                    height={150}
                    className="object-cover w-48 border h-36 rounded-2xl border-purple-500/30"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute p-1 text-white transition-colors bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-32 transition-colors border-2 border-dashed cursor-pointer border-purple-500/30 rounded-2xl hover:border-purple-400/50 bg-purple-500/5 hover:bg-purple-500/10"
                >
                  <Upload className="w-8 h-8 mb-2 text-purple-400" />
                  <span className="text-sm text-gray-300">
                    {thumbnail
                      ? `Đã chọn: ${thumbnail.name}`
                      : "Click để chọn ảnh mới"}
                  </span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Trạng thái
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(
                    e.target.value as "published" | "draft" | "archived"
                  );
                  setIsDirty(true);
                }}
                className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Xuất bản</option>
                <option value="archived">Lưu trữ</option>
              </select>
            </motion.div>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Tác giả
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Tên tác giả..."
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
              />
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Tags
              </label>

              {/* Add Tag */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  placeholder="Thêm tag..."
                  className="flex-1 px-3 py-2 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 text-white transition-colors bg-purple-500 rounded-xl hover:bg-purple-600"
                >
                  <Tag size={16} />
                </button>
              </div>

              {/* Tags List */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 text-sm text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-purple-400 transition-colors hover:text-red-400"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-3 px-6 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    <span>Đang cập nhật...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Cập nhật bài viết</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
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
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-purple-500/20 bg-slate-900/95 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white">
                  Xem trước bài viết
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 transition-all hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {(thumbnailPreview || thumbnailUrl) && (
                  <div className="relative mb-6 overflow-hidden aspect-video rounded-2xl">
                    <Image
                      src={thumbnailPreview || thumbnailUrl}
                      alt={title}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    {title || "Tiêu đề bài viết"}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date().toLocaleDateString("vi-VN")}</span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : status === "draft"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {status === "published"
                        ? "Xuất bản"
                        : status === "draft"
                        ? "Bản nháp"
                        : "Lưu trữ"}
                    </span>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
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
                    <div className="leading-relaxed text-gray-300 whitespace-pre-wrap">
                      {content || "Nội dung bài viết sẽ hiển thị ở đây..."}
                    </div>
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
