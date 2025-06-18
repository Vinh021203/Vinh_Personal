"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import {
  FilePlus2,
  ArrowLeft,
  Upload,
  X,
  Save,
  Eye,
  Settings,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Plus,
  Monitor,
  Activity,
} from "lucide-react";
import Link from "next/link";
import SelectIconField from "@/components/admin/SelectIconField";
import Image from "next/image";

export default function CreateServicePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState("Hiển thị");
  const [icon, setIcon] = useState("Code2");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  // Save as draft
  const saveDraft = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Vui lòng nhập tiêu đề và mô tả!");
      return;
    }

    const form = new FormData();
    form.append("name", title.trim());
    form.append("description", description.trim());
    form.append("status", "Ẩn"); // Draft always hidden
    form.append("icon", icon);
    form.append("price", price.toString());
    form.append("category", category.trim());
    if (image) {
      form.append("thumbnail", image);
    }

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Lưu nháp thất bại");
      toast.success("💾 Đã lưu bản nháp!");
    } catch (err) {
      toast.error("Không thể lưu bản nháp!");
    }
  };

  // Handle form submission
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
    if (image) {
      form.append("thumbnail", image);
    }

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");

      toast.success("✅ Dịch vụ đã được thêm thành công!");
      router.push("/admin/services");
    } catch (err) {
      console.error(err);
      toast.error("❌ Thêm dịch vụ thất bại!");
    } finally {
      setLoading(false);
    }
  };

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
            <FilePlus2 size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Tạo dịch vụ mới
            </h1>
            <p className="mt-1 text-gray-400">
              Thêm dịch vụ mới vào danh sách của bạn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveDraft}
            disabled={!title.trim() || !description.trim()}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 transition-all border border-gray-500/30 rounded-xl hover:bg-gray-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            <span>Lưu nháp</span>
          </button>

          <button
            onClick={() => setShowPreview(true)}
            disabled={!title.trim() && !description.trim()}
            className="flex items-center gap-2 px-4 py-2 text-blue-400 transition-all border border-blue-500/30 rounded-xl hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye size={16} />
            <span>Xem trước</span>
          </button>

          <Link
            href="/admin/services"
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
            {/* Service Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Tên dịch vụ
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tên dịch vụ..."
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                required
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Mô tả dịch vụ
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết về dịch vụ..."
                rows={6}
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border resize-none bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                required
              />
            </motion.div>

            {/* Icon Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Icon dịch vụ
              </label>
              <SelectIconField icon={icon} setIcon={setIcon} />
            </motion.div>

            {/* Image Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Ảnh minh họa
              </label>

              {/* Preview Image */}
              {imagePreview && (
                <div className="relative inline-block mb-4">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={150}
                    className="object-cover w-48 border h-36 rounded-2xl border-purple-500/30"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
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
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 transition-colors border-2 border-dashed cursor-pointer border-purple-500/30 rounded-2xl hover:border-purple-400/50 bg-purple-500/5 hover:bg-purple-500/10"
                >
                  <Upload className="w-8 h-8 mb-2 text-purple-400" />
                  <span className="text-sm text-gray-300">
                    {image ? `Đã chọn: ${image.name}` : "Click để chọn ảnh"}
                  </span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Trạng thái & Danh mục
              </label>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Trạng thái
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  >
                    <option value="Hiển thị">Hiển thị</option>
                    <option value="Ẩn">Ẩn</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Danh mục
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ví dụ: Web Development"
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Giá dịch vụ
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="0"
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
              />
              <p className="mt-2 text-sm text-gray-400">Giá tính bằng VNĐ</p>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                type="submit"
                disabled={loading || !title.trim() || !description.trim()}
                className="flex items-center justify-center w-full gap-3 px-6 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    <span>Đang tạo...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Tạo dịch vụ</span>
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
              className="w-full max-w-2xl overflow-hidden border rounded-3xl border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95"
            >
              <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                <h2 className="text-xl font-bold text-white">
                  Xem trước dịch vụ
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 transition-all hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {imagePreview && (
                  <div className="relative mb-6 overflow-hidden aspect-video rounded-2xl">
                    <Image
                      src={imagePreview}
                      alt={title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    {title || "Tên dịch vụ"}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date().toLocaleDateString("vi-VN")}</span>
                    </div>
                    {price > 0 && (
                      <div className="flex items-center gap-1">
                        <span>Giá từ: {price.toLocaleString("vi-VN")}đ</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${
                        status === "Hiển thị"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {status}
                    </span>
                    {category && (
                      <span className="px-3 py-1 text-sm text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30">
                        {category}
                      </span>
                    )}
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="leading-relaxed text-gray-300">
                      {description || "Mô tả dịch vụ sẽ hiển thị ở đây..."}
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
