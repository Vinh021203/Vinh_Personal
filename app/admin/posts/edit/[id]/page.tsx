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
  User,
  Calendar,
  Tag,
  Clock,
  Edit3,
  Trash2,
  RefreshCw,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Code,
  CheckCircle2,
  AlertCircle,
  History,
  LayoutTemplate,
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

  // --- STATE ---
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
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [splitView, setSplitView] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchPost = async () => {
      try {
        // Simulate API delay
        // await new Promise(resolve => setTimeout(resolve, 800));

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
        toast.error("Bài viết không tồn tại hoặc đã bị xóa!");
        // Mock data for preview if API fails (Optional)
        setTitle("Hướng dẫn Next.js 14 App Router (Demo)");
        setContent("Nội dung bài viết mẫu để demo giao diện...");
        setStatus("published");
        setTags(["Next.js", "React"]);
        // router.push("/admin/posts");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  // --- HANDLERS ---
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setIsDirty(true);
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setIsDirty(true);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setIsDirty(true);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailUrl("");
    setThumbnailPreview("");
    setIsDirty(true);
  };

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
    if (thumbnail) formData.append("thumbnail", thumbnail);

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

  // Auto-save simulation
  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      setIsAutoSaving(true);
      setTimeout(() => setIsAutoSaving(false), 1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isDirty, title, content]);

  // Helper for editor
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById(
      "editor-textarea"
    ) as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    setContent(`${before}${prefix}${selection}${suffix}${after}`);
    setIsDirty(true);
    textarea.focus();
  };

  if (fetchLoading) {
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

      {/* 1. HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 flex flex-col justify-between gap-6 p-4 mb-8 -mx-4 border-b md:flex-row md:items-center bg-white/80 backdrop-blur-xl md:-mx-8 md:px-8 border-orange-100/50"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 transition-colors text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-800">
              Chỉnh sửa bài viết
              {isDirty && (
                <span
                  className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"
                  title="Có thay đổi chưa lưu"
                />
              )}
            </h1>
            <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1 text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                #{id}
              </span>
              {updatedAt && (
                <span className="flex items-center gap-1">
                  <Clock size={12} /> Cập nhật:{" "}
                  {new Date(updatedAt).toLocaleDateString("vi-VN")}
                </span>
              )}
              {isAutoSaving && (
                <span className="flex items-center gap-1 text-orange-500 animate-pulse">
                  <RefreshCw size={10} className="animate-spin" /> Đang lưu
                  nháp...
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSplitView(!splitView)}
            className={`hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border rounded-xl ${
              splitView
                ? "bg-orange-50 text-orange-600 border-orange-200"
                : "text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <LayoutTemplate size={18} />
            <span>{splitView ? "Tắt chia đôi" : "Chia đôi"}</span>
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border lg:hidden text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700"
          >
            <Eye size={18} />
            <span>Xem</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className={`grid gap-8 ${
          splitView ? "lg:grid-cols-2" : "lg:grid-cols-3"
        }`}
      >
        {/* 2. EDITOR SECTION */}
        <div
          className={`${
            splitView ? "lg:col-span-1" : "lg:col-span-2"
          } space-y-6`}
        >
          {/* Title Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-slate-400">
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
              className="w-full text-2xl font-extrabold bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-300"
            />
          </motion.div>

          {/* Content Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-white border border-orange-100 rounded-[24px] shadow-sm overflow-hidden min-h-[600px]"
          >
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 overflow-x-auto border-b border-slate-100 bg-slate-50/50">
              <ToolButton
                icon={Bold}
                onClick={() => insertMarkdown("**", "**")}
              />
              <ToolButton
                icon={Italic}
                onClick={() => insertMarkdown("*", "*")}
              />
              <div className="w-[1px] h-6 bg-slate-200 mx-1" />
              <ToolButton icon={List} onClick={() => insertMarkdown("- ")} />
              <ToolButton
                icon={LinkIcon}
                onClick={() => insertMarkdown("[", "](url)")}
              />
              <ToolButton
                icon={ImageIcon}
                onClick={() => insertMarkdown("![alt](", ")")}
              />
              <ToolButton
                icon={Code}
                onClick={() => insertMarkdown("``````")}
              />
            </div>

            <textarea
              id="editor-textarea"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Nội dung bài viết..."
              className="flex-1 w-full p-6 font-serif text-lg leading-relaxed bg-transparent border-none outline-none resize-none text-slate-700 placeholder:text-slate-300"
            />
          </motion.div>
        </div>

        {/* 3. SIDEBAR / PREVIEW SECTION */}
        <div className="space-y-6">
          {splitView ? (
            // LIVE PREVIEW
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto bg-white border border-orange-100 rounded-[24px] shadow-sm p-8"
            >
              <h3 className="flex items-center gap-2 mb-6 text-xs font-bold tracking-wider uppercase text-slate-400">
                <Eye size={14} /> Live Preview
              </h3>
              <article className="prose prose-slate max-w-none">
                <h1>{title || "Tiêu đề bài viết"}</h1>
                {(thumbnailPreview || thumbnailUrl) && (
                  <img
                    src={thumbnailPreview || thumbnailUrl}
                    alt="Cover"
                    className="object-cover w-full my-4 rounded-2xl"
                  />
                )}
                <div className="whitespace-pre-wrap">
                  {content || "Nội dung hiển thị tại đây..."}
                </div>
              </article>
            </motion.div>
          ) : (
            // SIDEBAR SETTINGS
            <>
              {/* Publish Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
              >
                <h3 className="mb-4 text-lg font-bold text-slate-800">
                  Trạng thái
                </h3>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value as any);
                      setIsDirty(true);
                    }}
                    className="w-full px-4 py-3 text-sm font-medium transition-all border appearance-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                  >
                    <option value="published">Công khai (Published)</option>
                    <option value="draft">Bản nháp (Draft)</option>
                    <option value="archived">Lưu trữ (Archived)</option>
                  </select>
                  <div className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400">
                    <CheckCircle2 size={16} />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-slate-400">
                    Tác giả
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border bg-slate-50 border-slate-200 rounded-xl">
                    <User size={16} className="text-slate-400" />
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full text-sm font-medium bg-transparent outline-none text-slate-700"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Thumbnail */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
              >
                <h3 className="mb-4 text-lg font-bold text-slate-800">
                  Ảnh bìa
                </h3>
                {thumbnailPreview || thumbnailUrl ? (
                  <div className="relative group">
                    <Image
                      src={thumbnailPreview || thumbnailUrl}
                      alt="Thumbnail"
                      width={400}
                      height={200}
                      className="object-cover w-full h-48 border rounded-xl border-slate-100"
                    />
                    <button
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-lg shadow-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 transition-all border-2 border-dashed cursor-pointer border-slate-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 group">
                    <div className="p-3 mb-2 transition-all rounded-full bg-slate-50 group-hover:bg-white group-hover:shadow-sm">
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 group-hover:text-orange-600">
                      Thay đổi ảnh
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleThumbnailChange}
                      accept="image/*"
                    />
                  </label>
                )}
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
              >
                <h3 className="mb-4 text-lg font-bold text-slate-800">
                  Thẻ (Tags)
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    placeholder="Thêm tag..."
                    className="flex-1 px-3 py-2 text-sm transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-orange-400"
                  />
                  <button
                    onClick={addTag}
                    className="p-2 text-white transition-colors bg-slate-900 rounded-xl hover:bg-orange-500"
                  >
                    <Tag size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg border border-orange-100 flex items-center gap-1"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </form>

      {/* PREVIEW MODAL (Mobile Only) */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold tracking-wider uppercase text-slate-400">
                  Xem trước
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 transition-colors rounded-full bg-slate-100 hover:bg-slate-200"
                >
                  <X size={20} />
                </button>
              </div>
              <article className="prose prose-slate max-w-none">
                <h1>{title}</h1>
                {(thumbnailPreview || thumbnailUrl) && (
                  <img
                    src={thumbnailPreview || thumbnailUrl}
                    alt="Cover"
                    className="object-cover w-full rounded-2xl"
                  />
                )}
                <div className="whitespace-pre-wrap">{content}</div>
              </article>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Component
const ToolButton = ({ icon: Icon, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className="p-2 transition-colors rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50"
  >
    <Icon size={18} />
  </button>
);
