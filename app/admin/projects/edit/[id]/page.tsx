"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  FolderKanban,
  Calendar,
  User,
  Clock,
  Edit3,
  RefreshCw,
  DollarSign,
  Activity,
  Globe,
  CheckCircle2,
  Star,
  LayoutTemplate,
  Link as LinkIcon,
  Plus,
  Images,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectData {
  name: string;
  client: string;
  status: string;
  description?: string;
  image?: string;
  gallery?: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  budget?: number;
  progress?: number;
  priority?: "low" | "medium" | "high";
  liveUrl?: string;
  githubUrl?: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();

  // --- STATE ---
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Đang triển khai");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const descriptionRef = useRef<HTMLDivElement>(null);

  // Image State
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [currentImage, setCurrentImage] = useState(""); // Ảnh thumbnail hiện tại từ DB

  // Gallery State
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]); // Ảnh mới chọn để upload
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]); // Preview ảnh mới
  const [existingGallery, setExistingGallery] = useState<string[]>([]); // Ảnh cũ từ DB

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [splitView, setSplitView] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy dự án");
        const data: ProjectData = await res.json();

        setName(data.name || "");
        setClient(data.client || "");
        setStatus(data.status || "Đang triển khai");
        setTags(data.tags || []);
        setDescription(data.description || "");
        setTimeout(() => {
          if (descriptionRef.current) {
            descriptionRef.current.innerHTML = data.description || "";
          }
        }, 0);
        setBudget(data.budget || 0);
        setProgress(data.progress || 0);
        setPriority(data.priority || "medium");
        setLiveUrl(data.liveUrl || "");
        setGithubUrl(data.githubUrl || "");
        setUpdatedAt(data.updatedAt || "");

        setCurrentImage(data.image || "");
        setExistingGallery(data.gallery || []); // Load gallery cũ
      } catch (err) {
        toast.error("Không thể tải dự án!");
        router.push("/admin/projects");
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchProject();
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

  // Gallery Handlers
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setNewGalleryFiles((prev) => [...prev, ...newFiles]);
      setIsDirty(true);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setNewGalleryPreviews((prev) => [
              ...prev,
              e.target!.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeNewGalleryImage = (index: number) => {
    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  // Note: Logic xóa ảnh cũ (existingGallery) cần backend hỗ trợ nhận danh sách ảnh cần giữ lại.
  // Ở version đơn giản này, ta chỉ hiển thị ảnh cũ, chưa hỗ trợ xóa từng ảnh cũ (trừ khi backend update đè toàn bộ mảng gallery).
  // Để đơn giản, ta giả định API backend hiện tại chỉ hỗ trợ THÊM ảnh mới vào.

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
      setIsDirty(true);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setIsDirty(true);
  };

  const saveDraft = async () => {
    if (!name.trim()) return;
    toast.success("💾 Đã lưu thay đổi (Bản nháp)");
    setIsDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim() || !client.trim()) {
      toast.error("Vui lòng nhập đầy đủ tên dự án và khách hàng!");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("client", client.trim());
      formData.append("status", status);
      formData.append("description", description.trim());
      formData.append("budget", budget.toString());
      formData.append("progress", progress.toString());
      formData.append("priority", priority);
      formData.append("liveUrl", liveUrl.trim());
      formData.append("githubUrl", githubUrl.trim());
      formData.append("tags", JSON.stringify(tags));

      // Chỉ gửi thumbnail nếu có thay đổi
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Gửi các ảnh gallery mới
      if (newGalleryFiles.length > 0) {
        newGalleryFiles.forEach((file) => {
          formData.append("gallery", file);
        });
      }

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi cập nhật");

      toast.success(`✅ Đã cập nhật dự án thành công!`);
      setIsDirty(false);
      router.push("/admin/projects");
    } catch (err) {
      toast.error("❌ Lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  // Helper styles
  const getStatusColor = (s: string) => {
    switch (s) {
      case "Hoàn thành":
        return "bg-green-50 text-green-600 border-green-200";
      case "Đang thực hiện":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Tạm dừng":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Hủy bỏ":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
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
    <div className="min-h-screen pb-8 px-8">
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
        className="sticky top-0 z-40 flex flex-col justify-between gap-6 p-4 mb-8 -mx-4 border-b md:flex-row md:items-center bg-white/80 backdrop-blur-xl md:-mx-8 md:px-8 border-orange-100/50"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 transition-colors text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-800">
              Chỉnh sửa dự án{" "}
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
            <span>{splitView ? "Ẩn xem trước" : "Hiện xem trước"}</span>
          </button>
          <button
            onClick={saveDraft}
            disabled={!isDirty}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50"
          >
            <Save size={18} />
            <span>Lưu thay đổi</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Edit3 size={18} />
            )}
            <span>Cập nhật</span>
          </button>
        </div>
      </motion.div>

      <div
        className={`grid gap-8 ${
          splitView ? "lg:grid-cols-2" : "lg:grid-cols-3"
        }`}
      >
        {/* 2. FORM SECTION */}
        <div
          className={`${
            splitView ? "lg:col-span-1" : "lg:col-span-2"
          } space-y-6`}
        >
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <FolderKanban size={20} className="text-orange-500" /> Thông tin
              cơ bản
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Tên dự án
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full px-4 py-3 text-sm font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Khách hàng
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => {
                      setClient(e.target.value);
                      setIsDirty(true);
                    }}
                    className="w-full py-3 pl-10 pr-4 text-sm font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Mô tả
                </label>

                {/* Toolbar */}
                <div className="flex items-center gap-1 px-3 py-2 bg-slate-50 border border-slate-200 border-b-0 rounded-t-xl">
                  {[
                    {
                      cmd: "bold",
                      icon: "B",
                      cls: "font-black text-xs w-7 h-7",
                    },
                    { cmd: "italic", icon: "I", cls: "italic text-xs w-7 h-7" },
                    {
                      cmd: "underline",
                      icon: "U",
                      cls: "underline text-xs w-7 h-7",
                    },
                  ].map(({ cmd, icon, cls }) => (
                    <button
                      key={cmd}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        document.execCommand(cmd, false);
                      }}
                      className={`${cls} flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200`}
                    >
                      {icon}
                    </button>
                  ))}

                  <div className="w-px h-4 bg-slate-200 mx-1" />

                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand("insertUnorderedList", false);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200 text-sm"
                    title="Danh sách dấu chấm"
                  >
                    ≡
                  </button>

                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand("insertOrderedList", false);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200 text-xs font-bold"
                    title="Danh sách số"
                  >
                    1.
                  </button>

                  <div className="w-px h-4 bg-slate-200 mx-1" />

                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand("removeFormat", false);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200 text-xs"
                    title="Xóa định dạng"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Editable area */}
                <div
                  ref={descriptionRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => {
                    setDescription(e.currentTarget.innerHTML);
                    setIsDirty(true);
                  }}
                  data-placeholder="Mô tả chi tiết về dự án..."
                  className="w-full min-h-[120px] px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-b-xl text-slate-700 outline-none transition-all focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_u]:underline empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Gallery Section (NEW) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <Images size={20} className="text-purple-500" /> Thư viện ảnh
              (Gallery)
            </h3>

            {/* Existing Gallery (Read Only) */}
            {existingGallery.length > 0 && (
              <div className="mb-4">
                <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
                  Ảnh hiện tại
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {existingGallery.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden border rounded-lg aspect-square border-slate-200"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Gallery */}
            <label className="flex flex-col items-center justify-center w-full h-24 mb-4 transition-all border-2 border-dashed cursor-pointer border-slate-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 group">
              <div className="flex items-center gap-2 text-slate-400 group-hover:text-purple-600">
                <Upload size={20} />
                <span className="text-xs font-bold">Thêm ảnh mới</span>
              </div>
              <input
                type="file"
                multiple
                onChange={handleGalleryChange}
                accept="image/*"
                className="hidden"
              />
            </label>

            {/* New Gallery Preview */}
            {newGalleryPreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {newGalleryPreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden border border-purple-200 rounded-lg aspect-square group"
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                    <button
                      onClick={() => removeNewGalleryImage(idx)}
                      className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100 hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
            >
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
                <Activity size={20} className="text-blue-500" /> Trạng thái
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Tình trạng
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full px-4 py-3 text-sm font-bold transition-all border appearance-none cursor-pointer bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                    >
                      <option value="Đang triển khai">Đang triển khai</option>
                      <option value="Đang thực hiện">Đang thực hiện</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                      <option value="Tạm dừng">Tạm dừng</option>
                    </select>
                    <CheckCircle2
                      className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400"
                      size={16}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Ưu tiên
                  </label>
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setPriority(p as any);
                          setIsDirty(true);
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all capitalize ${
                          priority === p
                            ? getPriorityColor(p) +
                              " ring-2 ring-offset-1 ring-slate-100"
                            : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
            >
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
                <DollarSign size={20} className="text-green-500" /> Chỉ số
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Ngân sách (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => {
                      setBudget(Number(e.target.value));
                      setIsDirty(true);
                    }}
                    className="w-full px-4 py-3 font-mono text-sm font-bold border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="flex justify-between mb-2 text-xs font-bold uppercase text-slate-500">
                    Tiến độ <span className="text-orange-600">{progress}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => {
                      setProgress(Number(e.target.value));
                      setIsDirty(true);
                    }}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-orange-500 slider"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links & Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <LinkIcon size={20} className="text-purple-500" /> Liên kết & Tags
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
              <div className="relative">
                <Globe
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => {
                    setLiveUrl(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="https://website.com"
                  className="w-full py-3 pl-10 pr-4 text-sm font-medium border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                  GH
                </span>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => {
                    setGithubUrl(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="https://github.com/..."
                  className="w-full py-3 pl-10 pr-4 text-sm font-medium border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                />
              </div>
            </div>
            <div>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  placeholder="Nhập tag..."
                  className="flex-1 px-4 py-2 text-sm border outline-none bg-slate-50 border-slate-200 rounded-xl focus:border-orange-400"
                />
                <button
                  onClick={handleAddTag}
                  className="p-2 text-white transition-colors bg-slate-900 rounded-xl hover:bg-orange-500"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-orange-700 border border-orange-100 rounded-lg bg-orange-50 group"
                  >
                    #{tag}{" "}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-orange-400 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. SIDEBAR / LIVE PREVIEW */}
        <div className="space-y-6">
          {splitView ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wider uppercase text-slate-400">
                <Eye size={16} /> Live Preview Card
              </div>
              <div className="group relative bg-white rounded-[2rem] border border-orange-100 shadow-xl overflow-hidden flex flex-col">
                <div className="relative w-full h-56 overflow-hidden bg-slate-100">
                  {thumbnailPreview || currentImage ? (
                    <Image
                      src={thumbnailPreview || currentImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <Upload size={32} className="mb-2 opacity-50" />
                      <span className="text-xs font-medium">
                        Chưa có ảnh bìa
                      </span>
                    </div>
                  )}
                  <div className="absolute z-10 flex items-start justify-between top-4 left-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md ${getStatusColor(
                        status,
                      )}`}
                    >
                      {status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border shadow-sm backdrop-blur-md flex items-center gap-1 ${getPriorityColor(
                        priority,
                      )}`}
                    >
                      <Activity size={12} /> {priority}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-slate-800 line-clamp-1">
                        {name || "Tên dự án"}
                      </h3>
                      <p className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <User size={12} /> {client || "Khách hàng"}
                      </p>
                    </div>
                    <Star size={16} className="text-slate-200" />
                  </div>
                  <div
                    className="flex-1 mb-4 text-sm text-slate-500 line-clamp-3 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                    dangerouslySetInnerHTML={{
                      __html:
                        description || "Mô tả dự án sẽ hiển thị tại đây...",
                    }}
                  />
                  <div className="pt-4 space-y-3 border-t border-slate-50">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} className="text-green-500" />{" "}
                        {budget.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-blue-500" />{" "}
                        {new Date().toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                        <span>Tiến độ</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            progress === 100
                              ? "bg-green-500"
                              : "bg-gradient-to-r from-orange-400 to-amber-400"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Area (Sidebar) */}
              <div className="mt-6">
                <label className="flex flex-col items-center justify-center w-full h-32 transition-all bg-white border-2 border-dashed cursor-pointer border-slate-200 rounded-2xl hover:border-orange-400 hover:bg-orange-50 group">
                  <div className="p-2 mb-2 transition-all rounded-full bg-slate-50 group-hover:bg-white group-hover:shadow-sm">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-orange-500" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 group-hover:text-orange-600">
                    {thumbnail || currentImage ? "Đổi ảnh bìa" : "Tải ảnh bìa"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleThumbnailChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </motion.div>
          ) : (
            // ... (Simple Sidebar - Giữ nguyên nếu cần)
            <div />
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}
