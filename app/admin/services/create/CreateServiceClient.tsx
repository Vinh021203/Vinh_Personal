"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  Eye,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Wrench,
  Tag,
  DollarSign,
  CheckCircle2,
  LayoutTemplate,
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  Settings,
  LucideIcon,
  Star,
} from "lucide-react";
import Link from "next/link";
import SelectIconField from "@/components/admin/SelectIconField";
import Image from "next/image";

// Map string icon name → actual LucideIcon component (cho Preview)
const iconMap: Record<string, LucideIcon> = {
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  Wrench,
  Settings,
};

export default function CreateServiceClient() {
  const router = useRouter();

  // --- STATE ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState("Hiển thị");
  const [icon, setIcon] = useState("Code2");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false); // Thêm trường Featured

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // --- HANDLERS ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const saveDraft = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Vui lòng nhập tiêu đề và mô tả!");
      return;
    }
    // Logic lưu nháp (có thể lưu vào localStorage hoặc API draft)
    toast.success("💾 Đã lưu bản nháp!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !description.trim()) {
      toast.error("Vui lòng nhập đầy đủ tiêu đề và mô tả!");
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append("name", title.trim());
    form.append("description", description.trim());
    form.append("status", status);
    form.append("icon", icon);
    form.append("price", price.toString());
    form.append("category", category.trim());
    form.append("featured", featured.toString()); // Gửi featured

    if (image) {
      form.append("thumbnail", image); // Key phải khớp với backend (thumbnail)
    }

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Lỗi khi gửi dữ liệu");
      }

      toast.success("✅ Dịch vụ đã được thêm thành công!");
      router.push("/admin/services");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "❌ Thêm dịch vụ thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // Helper styles
  const getStatusColor = (s: string) =>
    s === "Hiển thị"
      ? "bg-green-50 text-green-600 border-green-200"
      : "bg-slate-50 text-slate-500 border-slate-200";

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
            href="/admin/services"
            className="p-2 transition-colors text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              Tạo dịch vụ mới
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Thêm dịch vụ mới vào danh mục của bạn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveDraft}
            disabled={!title.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50"
          >
            <Save size={18} />
            <span>Lưu nháp</span>
          </button>

          <button
            onClick={() => setShowPreview(true)}
            disabled={!title.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50"
          >
            <Eye size={18} />
            <span>Xem trước</span>
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
            <span>Tạo dịch vụ</span>
          </button>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        {/* 2. MAIN CONTENT */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <Wrench size={20} className="text-orange-500" /> Thông tin cơ bản
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Tên dịch vụ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Thiết kế Website..."
                  className="w-full px-4 py-3 text-sm font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Mô tả dịch vụ <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả chi tiết về dịch vụ..."
                  rows={6}
                  className="w-full px-4 py-3 text-sm font-medium transition-all border outline-none resize-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>
          </motion.div>

          {/* Icon Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <LayoutTemplate size={20} className="text-blue-500" /> Icon hiển
              thị
            </h3>
            <div className="p-4 border bg-slate-50 rounded-xl border-slate-200">
              <SelectIconField icon={icon} setIcon={setIcon} />
            </div>
          </motion.div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <ImageIcon size={20} className="text-purple-500" /> Ảnh minh họa
            </h3>

            {imagePreview ? (
              <div className="relative group w-fit">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={300}
                  height={200}
                  className="object-cover border rounded-xl border-slate-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-40 transition-all border-2 border-dashed cursor-pointer border-slate-200 rounded-2xl hover:border-orange-400 hover:bg-orange-50 group bg-slate-50/50"
                >
                  <div className="p-3 mb-2 transition-transform bg-white rounded-full shadow-sm group-hover:scale-110">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 group-hover:text-orange-600">
                    Tải ảnh lên
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    PNG, JPG up to 5MB
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </div>

        {/* 3. SIDEBAR */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <Settings size={20} className="text-slate-500" /> Cấu hình
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Trạng thái
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-bold border appearance-none cursor-pointer bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                  >
                    <option value="Hiển thị">Hiển thị</option>
                    <option value="Ẩn">Ẩn</option>
                  </select>
                  <CheckCircle2
                    className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400"
                    size={16}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Danh mục
                </label>
                <div className="relative">
                  <Tag
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="VD: Web Development"
                    className="w-full py-3 pl-10 pr-4 text-sm font-medium border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Giá khởi điểm (VNĐ)
                </label>
                <div className="relative">
                  <DollarSign
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="0"
                    className="w-full py-3 pl-10 pr-4 font-mono text-sm font-bold border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Featured Switch */}
              <div className="flex items-center justify-between p-3 border rounded-xl border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-100 rounded-lg text-yellow-600">
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Nổi bật
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </form>

      {/* 4. PREVIEW MODAL */}
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
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mock Service Card Look */}
              <div className="relative flex items-center justify-center w-full h-40 bg-gradient-to-br from-orange-50 to-amber-50">
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute p-2 transition-colors rounded-full top-4 right-4 bg-white/50 hover:bg-white text-slate-500"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center justify-center w-20 h-20 text-orange-500 bg-white shadow-lg rounded-2xl">
                  {(() => {
                    const PreviewIcon = iconMap[icon] || Code2;
                    return <PreviewIcon size={40} strokeWidth={1.5} />;
                  })()}
                </div>

                {/* Featured Badge Mock */}
                {featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                    <Star size={12} fill="currentColor" />
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="mb-2 text-xl font-extrabold text-center text-slate-800">
                  {title || "Tên dịch vụ"}
                </h3>
                <div className="flex justify-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(
                      status,
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-center text-slate-500">
                  {description || "Mô tả dịch vụ sẽ hiển thị ở đây..."}
                </p>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100">
                  <span className="flex items-center gap-1 text-xs font-bold uppercase text-slate-400">
                    <Tag size={12} /> {category || "General"}
                  </span>
                  <span className="text-lg font-extrabold text-slate-800">
                    {price.toLocaleString()}{" "}
                    <span className="text-xs font-medium text-slate-400">
                      VNĐ
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
