"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  Eye,
  Image as ImageIcon,
  User,
  Sparkles,
  Plus,
  RefreshCw,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  Code,
  Hash,
  Globe,
  LayoutTemplate,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sub-component: Tool Button (đặt ở trên hoặc dưới đều được)
const ToolButton = ({ icon: Icon, onClick, tooltip }: any) => (
  <button
    type="button"
    onClick={onClick}
    title={tooltip}
    className="p-2 transition-colors rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50"
  >
    <Icon size={18} />
  </button>
);

export default function CreatePostClient() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [author, setAuthor] = useState("VinhWorks");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [loading, setLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [splitView, setSplitView] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  useEffect(() => {
    setSlug(generateSlug(title));
  }, [title]);

  const saveDraft = async () => {
    if (!title.trim()) {
      toast.error("Vui lòng điền tiêu đề!");
      return;
    }
    toast.success("💾 Đã lưu bản nháp!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error("Vui lòng điền đầy đủ tiêu đề và nội dung!");
      setLoading(false);
      return;
    }

    const finalSlug = slug || generateSlug(title);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("slug", finalSlug);
    formData.append("author", author);
    formData.append("date", new Date().toISOString());
    formData.append("status", status);
    formData.append("tags", JSON.stringify(tags));
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Tạo bài viết thất bại!");
      toast.success("✅ Đã tạo bài viết mới thành công!");
      router.push("/admin/posts");
    } catch (err) {
      toast.error("❌ Lỗi khi tạo bài viết!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    setContent(`${before}${prefix}${selection}${suffix}${after}`);
    textarea.focus();
  };

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

      {/* 1. HEADER & ACTIONS */}
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
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              Viết bài mới
            </h1>
            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-slate-500">
              <span
                className={
                  status === "published" ? "text-green-600" : "text-amber-600"
                }
              >
                {status === "published"
                  ? "• Sẽ được xuất bản"
                  : "• Sẽ lưu nháp"}
              </span>
              <span className="text-slate-300">|</span>
              <span>{author}</span>
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
            <span>{splitView ? "Tắt chia đôi" : "Chia đôi màn hình"}</span>
          </button>

          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border lg:hidden text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700"
          >
            <Eye size={18} />
            <span>Xem trước</span>
          </button>

          <button
            onClick={saveDraft}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700"
          >
            <Save size={18} />
            <span>Lưu nháp</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !title.trim()}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Sparkles size={18} />
            )}
            <span>Đăng bài</span>
          </button>
        </div>
      </motion.div>

      <div
        className={`grid gap-8 ${
          splitView ? "lg:grid-cols-2" : "lg:grid-cols-3"
        }`}
      >
        {/* 2. MAIN EDITOR COLUMN */}
        <div
          className={`${
            splitView ? "lg:col-span-1" : "lg:col-span-2"
          } space-y-6`}
        >
          {/* Title & Slug */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài viết..."
              className="w-full mb-4 text-3xl font-extrabold bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-300"
              autoFocus
            />
            <div className="flex items-center gap-2 p-2 text-sm border text-slate-400 bg-slate-50 rounded-xl border-slate-100">
              <Globe size={14} />
              <span className="font-mono text-slate-500">
                your-site.com/blog/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 font-mono font-medium text-orange-600 bg-transparent outline-none"
              />
            </div>
          </motion.div>

          {/* Content Editor with Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-white border border-orange-100 rounded-[24px] shadow-sm overflow-hidden min-h-[500px]"
          >
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 overflow-x-auto border-b border-slate-100 bg-slate-50/50">
              <ToolButton
                icon={Bold}
                onClick={() => insertMarkdown("**", "**")}
                tooltip="In đậm"
              />
              <ToolButton
                icon={Italic}
                onClick={() => insertMarkdown("*", "*")}
                tooltip="In nghiêng"
              />
              <ToolButton
                icon={Hash}
                onClick={() => insertMarkdown("## ")}
                tooltip="Tiêu đề 2"
              />
              <div className="w-[1px] h-6 bg-slate-200 mx-1" />
              <ToolButton
                icon={List}
                onClick={() => insertMarkdown("- ")}
                tooltip="Danh sách"
              />
              <ToolButton
                icon={LinkIcon}
                onClick={() => insertMarkdown("[", "](url)")}
                tooltip="Link"
              />
              <ToolButton
                icon={ImageIcon}
                onClick={() => insertMarkdown("![alt](", ")")}
                tooltip="Ảnh"
              />
              <ToolButton
                icon={Code}
                onClick={() => insertMarkdown("``````")}
                tooltip="Code Block"
              />
            </div>

            <textarea
              id="content-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Bắt đầu viết câu chuyện của bạn..."
              className="flex-1 w-full p-6 font-serif text-lg leading-relaxed bg-transparent border-none outline-none resize-none text-slate-700 placeholder:text-slate-300"
            />
          </motion.div>
        </div>

        {/* 3. SIDEBAR SETTINGS (Or Live Preview in Split View) */}
        <div className="space-y-6">
          {splitView ? (
            // LIVE PREVIEW PANEL
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
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
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
            // SETTINGS PANEL
            <>
              {/* Publish Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
              >
                <h3 className="mb-4 text-lg font-bold text-slate-800">
                  Xuất bản
                </h3>
                <div className="flex flex-col gap-3">
                  <label
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                      status === "published"
                        ? "border-green-500 bg-green-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={status === "published"}
                      onChange={() => setStatus("published")}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span
                      className={`ml-3 font-medium ${
                        status === "published"
                          ? "text-green-700"
                          : "text-slate-600"
                      }`}
                    >
                      Công khai ngay
                    </span>
                  </label>
                  <label
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                      status === "draft"
                        ? "border-amber-500 bg-amber-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={status === "draft"}
                      onChange={() => setStatus("draft")}
                      className="w-4 h-4 border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span
                      className={`ml-3 font-medium ${
                        status === "draft" ? "text-amber-700" : "text-slate-600"
                      }`}
                    >
                      Lưu bản nháp
                    </span>
                  </label>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <label className="block mb-2 text-sm font-bold text-slate-700">
                    Tác giả
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border bg-slate-50 border-slate-200 rounded-xl">
                    <User size={16} className="text-slate-400" />
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
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
                {thumbnailPreview ? (
                  <div className="relative group">
                    <Image
                      src={thumbnailPreview}
                      alt="Cover"
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
                      Tải ảnh lên
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
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="Thêm tag..."
                    className="flex-1 px-3 py-2 text-sm transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-orange-400"
                  />
                  <button
                    onClick={handleAddTag}
                    className="p-2 text-white transition-colors bg-slate-900 rounded-xl hover:bg-orange-500"
                  >
                    <Plus size={18} />
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
                        onClick={() => handleRemoveTag(tag)}
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
      </div>

      {/* PREVIEW MODAL (Mobile Only) */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md"
            onClick={() => setShowPreviewModal(false)}
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
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 transition-colors rounded-full bg-slate-100 hover:bg-slate-200"
                >
                  <X size={20} />
                </button>
              </div>
              <article className="prose prose-slate max-w-none">
                <h1>{title}</h1>
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
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
