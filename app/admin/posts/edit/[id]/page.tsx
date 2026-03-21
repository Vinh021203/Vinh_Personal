"use client";

import { useState, useEffect, useRef } from "react";
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
  Tag,
  Clock,
  RefreshCw,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Code,
  CheckCircle2,
  LayoutTemplate,
  Heading1,
  Heading2,
  Minus,
  Quote,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PostData {
  title: string;
  content: string;
  description?: string;
  thumbnail?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: "published" | "draft" | "archived";
  tags?: string[];
  slug?: string;
}

const STATUS_COLOR: Record<string, string> = {
  published: "bg-green-50 text-green-600 border-green-200",
  draft: "bg-amber-50 text-amber-600 border-amber-200",
  archived: "bg-slate-50 text-slate-500 border-slate-200",
};

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- STATE ---
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [descExpanded, setDescExpanded] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "archived">(
    "draft",
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

  // --- FETCH ---
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    (async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error();
        const data: PostData = await res.json();
        setTitle(data.title || "");
        setContent(data.content || "");
        setDescription(data.description || "");
        setThumbnailUrl(data.thumbnail || "");
        setStatus(data.status || "draft");
        setTags(data.tags || []);
        setAuthor(data.author || "VinhWorks");
        setUpdatedAt(data.updatedAt || "");
      } catch {
        toast.error("Bài viết không tồn tại hoặc đã bị xóa!");
      } finally {
        setFetchLoading(false);
      }
    })();
  }, [id]);

  // --- AUTO SAVE ---
  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      setIsAutoSaving(true);
      setTimeout(() => setIsAutoSaving(false), 1200);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isDirty, title, content, description]);

  // --- HANDLERS ---
  const mark = (d: boolean) => d && setIsDirty(true);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setIsDirty(true);
    const reader = new FileReader();
    reader.onload = (e) => setThumbnailPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    const t = newTag.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setIsDirty(true);
    }
    setNewTag("");
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((x) => x !== t));
    setIsDirty(true);
  };
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailUrl("");
    setThumbnailPreview("");
    setIsDirty(true);
  };

  const insertMarkdown = (prefix: string, suffix = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const next = `${value.slice(0, s)}${prefix}${value.slice(s, e)}${suffix}${value.slice(e)}`;
    setContent(next);
    setIsDirty(true);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(s + prefix.length, e + prefix.length);
    }, 0);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append("title", title.trim());
    fd.append("content", content.trim());
    fd.append("description", description.trim());
    fd.append("status", status);
    fd.append("author", author);
    fd.append("tags", JSON.stringify(tags));
    fd.append("updatedAt", new Date().toISOString());
    if (thumbnail) fd.append("thumbnail", thumbnail);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "PUT", body: fd });
      if (!res.ok) throw new Error();
      toast.success("✅ Cập nhật bài viết thành công!");
      setIsDirty(false);
      router.push("/admin/posts");
    } catch {
      toast.error("❌ Cập nhật thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading)
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

  const coverSrc = thumbnailPreview || thumbnailUrl;

  return (
    <div className="min-h-screen pb-12 px-4 md:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#334155",
            border: "1px solid #e2e8f0",
          },
        }}
      />

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-8 -mx-4 md:-mx-8 px-4 md:px-8 bg-white/90 backdrop-blur-xl border-b border-orange-100/60"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
          >
            <ArrowLeft size={22} />
          </Link>
          <div>
            <h1 className="flex items-center gap-2 text-xl font-extrabold text-slate-800">
              Chỉnh sửa bài viết
              {isDirty && (
                <span
                  className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"
                  title="Chưa lưu"
                />
              )}
            </h1>
            <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
              <span className="bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                #{id}
              </span>
              {updatedAt && (
                <span className="flex items-center gap-1">
                  <Clock size={11} />{" "}
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

        <div className="flex items-center gap-2">
          {/* Status badge */}
          <span
            className={`hidden sm:inline-flex px-3 py-1 text-xs font-bold rounded-full border ${STATUS_COLOR[status]}`}
          >
            {status === "published"
              ? "Công khai"
              : status === "draft"
                ? "Nháp"
                : "Lưu trữ"}
          </span>

          <button
            onClick={() => setSplitView(!splitView)}
            className={`hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl border transition-all ${
              splitView
                ? "bg-orange-50 text-orange-600 border-orange-200"
                : "text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <LayoutTemplate size={16} />
            {splitView ? "Tắt chia đôi" : "Chia đôi"}
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            <Eye size={16} /> Xem
          </button>

          <button
            onClick={() => handleSubmit()}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg hover:shadow-orange-300 transition-all disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Lưu thay đổi
          </button>
        </div>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className={`grid gap-8 ${splitView ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}
      >
        {/* ── EDITOR COL ── */}
        <div
          className={`${splitView ? "lg:col-span-1" : "lg:col-span-2"} space-y-6`}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-6 bg-white border border-orange-100 rounded-[1.5rem] shadow-sm"
          >
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Tiêu đề bài viết
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                mark(true);
              }}
              placeholder="Nhập tiêu đề bài viết..."
              className="w-full text-2xl font-extrabold bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-300"
            />
          </motion.div>

          {/* Description with xem thêm */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-orange-100 rounded-[1.5rem] shadow-sm"
          >
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Mô tả ngắn
            </label>

            <div className="relative">
              <div
                className={`text-sm leading-7 text-slate-600 transition-all
                  [&_ul]:list-disc [&_ul]:pl-5 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic
                  ${!descExpanded ? "line-clamp-3" : ""}`}
              >
                {/* Editable textarea khi expanded, div khi collapsed */}
              </div>

              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  mark(true);
                }}
                placeholder="Nhập mô tả ngắn cho bài viết (hiển thị ở trang danh sách)..."
                rows={descExpanded ? 6 : 3}
                className={`w-full text-sm leading-7 text-slate-600 bg-transparent border-none outline-none resize-none placeholder:text-slate-300 transition-all ${!descExpanded ? "line-clamp-3 overflow-hidden" : ""}`}
              />

              {/* Gradient fade khi thu gọn */}
              {!descExpanded && description.length > 120 && (
                <div className="absolute bottom-6 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>

            {description.length > 120 && (
              <button
                type="button"
                onClick={() => setDescExpanded((v) => !v)}
                className="mt-1 flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                {descExpanded ? (
                  <>
                    <ChevronUp size={13} /> Thu gọn
                  </>
                ) : (
                  <>
                    <ChevronDown size={13} /> Xem thêm
                  </>
                )}
              </button>
            )}
          </motion.div>

          {/* Content Editor */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col bg-white border border-orange-100 rounded-[1.5rem] shadow-sm overflow-hidden min-h-[560px]"
          >
            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-1 p-2.5 border-b border-slate-100 bg-slate-50/60">
              <ToolBtn
                icon={Bold}
                title="Bold"
                onClick={() => insertMarkdown("**", "**")}
              />
              <ToolBtn
                icon={Italic}
                title="Italic"
                onClick={() => insertMarkdown("*", "*")}
              />
              <Sep />
              <ToolBtn
                icon={Heading1}
                title="Heading 1"
                onClick={() => insertMarkdown("# ")}
              />
              <ToolBtn
                icon={Heading2}
                title="Heading 2"
                onClick={() => insertMarkdown("## ")}
              />
              <Sep />
              <ToolBtn
                icon={List}
                title="List"
                onClick={() => insertMarkdown("- ")}
              />
              <ToolBtn
                icon={Quote}
                title="Blockquote"
                onClick={() => insertMarkdown("> ")}
              />
              <ToolBtn
                icon={Minus}
                title="Divider"
                onClick={() => insertMarkdown("\n---\n")}
              />
              <Sep />
              <ToolBtn
                icon={LinkIcon}
                title="Link"
                onClick={() => insertMarkdown("[", "](url)")}
              />
              <ToolBtn
                icon={ImageIcon}
                title="Image"
                onClick={() => insertMarkdown("![alt](", ")")}
              />
              <ToolBtn
                icon={Code}
                title="Code block"
                onClick={() => insertMarkdown("```\n", "\n```")}
              />
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                mark(true);
              }}
              placeholder="Viết nội dung bài viết ở đây (hỗ trợ Markdown)..."
              className="flex-1 w-full p-6 font-mono text-sm leading-relaxed bg-transparent border-none outline-none resize-none text-slate-700 placeholder:text-slate-300"
            />

            {/* Footer word count */}
            <div className="flex items-center justify-between px-6 py-2 border-t border-slate-50 text-xs text-slate-400">
              <span>{content.split(/\s+/).filter(Boolean).length} từ</span>
              <span>{content.length} ký tự</span>
            </div>
          </motion.div>
        </div>

        {/* ── SIDEBAR / LIVE PREVIEW ── */}
        <div className="space-y-6">
          {splitView ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto bg-white border border-orange-100 rounded-[1.5rem] shadow-sm p-8"
            >
              <h3 className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Eye size={13} /> Live Preview
              </h3>
              {coverSrc && (
                <img
                  src={coverSrc}
                  alt="Cover"
                  className="w-full h-44 object-cover rounded-xl mb-5"
                />
              )}
              <h1 className="text-2xl font-black text-slate-800 mb-2">
                {title || "Tiêu đề bài viết"}
              </h1>
              {description && (
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  {description}
                </p>
              )}
              <hr className="border-slate-100 mb-4" />
              <article className="prose prose-sm prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-sm text-slate-600 leading-7">
                  {content || "Nội dung hiển thị tại đây..."}
                </div>
              </article>
            </motion.div>
          ) : (
            <>
              {/* Publish Status */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white border border-orange-100 rounded-[1.5rem] shadow-sm space-y-5"
              >
                <h3 className="text-base font-black text-slate-800">
                  Xuất bản
                </h3>

                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Trạng thái
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => {
                        setStatus(
                          e.target.value as "published" | "draft" | "archived",
                        );
                        mark(true);
                      }}
                      className="w-full px-4 py-3 text-sm font-semibold appearance-none border bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400 transition-all"
                    >
                      <option value="published">
                        ✅ Công khai (Published)
                      </option>
                      <option value="draft">📝 Bản nháp (Draft)</option>
                      <option value="archived">📦 Lưu trữ (Archived)</option>
                    </select>
                    <CheckCircle2
                      size={15}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tác giả
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 border bg-slate-50 border-slate-200 rounded-xl">
                    <User size={15} className="text-slate-400 flex-shrink-0" />
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                        mark(true);
                      }}
                      className="w-full text-sm font-medium bg-transparent outline-none text-slate-700"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Thumbnail */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="p-6 bg-white border border-orange-100 rounded-[1.5rem] shadow-sm"
              >
                <h3 className="mb-4 text-base font-black text-slate-800">
                  Ảnh bìa
                </h3>
                {coverSrc ? (
                  <div className="relative group">
                    <Image
                      src={coverSrc}
                      alt="Thumbnail"
                      width={400}
                      height={200}
                      unoptimized
                      className="object-cover w-full h-44 rounded-xl border border-slate-100"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-lg shadow-md hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all group">
                    <div className="p-3 mb-2 bg-slate-50 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-orange-600">
                      Tải ảnh bìa lên
                    </span>
                    <span className="text-xs text-slate-300 mt-1">
                      PNG, JPG, WEBP
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white border border-orange-100 rounded-[1.5rem] shadow-sm"
              >
                <h3 className="mb-4 text-base font-black text-slate-800">
                  Thẻ (Tags)
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Nhập tag rồi Enter..."
                    className="flex-1 px-3 py-2 text-sm border bg-slate-50 border-slate-200 rounded-xl outline-none focus:border-orange-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="p-2 text-white bg-slate-900 rounded-xl hover:bg-orange-500 transition-colors"
                  >
                    <Tag size={17} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg border border-orange-100"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-xs text-slate-300">Chưa có tag nào</p>
                  )}
                </div>
              </motion.div>

              {/* Info summary */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-6 bg-white border border-orange-100 rounded-[1.5rem] shadow-sm"
              >
                <h3 className="mb-4 text-base font-black text-slate-800">
                  Thông tin
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "ID bài viết", value: `#${id}` },
                    { label: "Tác giả", value: author || "—" },
                    {
                      label: "Cập nhật",
                      value: updatedAt
                        ? new Date(updatedAt).toLocaleDateString("vi-VN")
                        : "—",
                    },
                    {
                      label: "Số từ",
                      value: `${content.split(/\s+/).filter(Boolean).length} từ`,
                    },
                    { label: "Số tags", value: `${tags.length} tag` },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2.5 border-t border-slate-50"
                    >
                      <span className="text-xs font-bold uppercase text-slate-400">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </form>

      {/* ── PREVIEW MODAL (Mobile) ── */}
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
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Xem trước
                </span>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              {coverSrc && (
                <img
                  src={coverSrc}
                  alt="Cover"
                  className="w-full h-48 object-cover rounded-xl mb-5"
                />
              )}
              <h1 className="text-2xl font-black text-slate-800 mb-2">
                {title || "Tiêu đề"}
              </h1>
              {description && (
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  {description}
                </p>
              )}
              <hr className="border-slate-100 mb-4" />
              <div className="whitespace-pre-wrap text-sm text-slate-600 leading-7">
                {content || "Nội dung trống..."}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
const ToolBtn = ({
  icon: Icon,
  title,
  onClick,
}: {
  icon: any;
  title: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
  >
    <Icon size={16} />
  </button>
);

const Sep = () => <div className="w-px h-5 bg-slate-200 mx-0.5" />;
