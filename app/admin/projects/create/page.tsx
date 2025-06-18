"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FilePlus2,
  ArrowLeft,
  Upload,
  X,
  Tag,
  Save,
  Eye,
  Image as ImageIcon,
  FolderKanban,
  User,
  Calendar,
  Sparkles,
  Plus,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Monitor,
  DollarSign,
  Activity,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CreateProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Đang triển khai");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Handle thumbnail upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
  };

  // Handle tag addition
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Save as draft
  const saveDraft = async () => {
    if (!name.trim() || !client.trim()) {
      toast.error("Vui lòng nhập tên dự án và khách hàng!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("client", client.trim());
    formData.append("status", "Đang triển khai");
    formData.append("description", description.trim());
    formData.append("budget", budget.toString());
    formData.append("progress", progress.toString());
    formData.append("priority", priority);
    formData.append("liveUrl", liveUrl.trim());
    formData.append("githubUrl", githubUrl.trim());
    formData.append("tags", JSON.stringify(tags));
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Lưu nháp thất bại!");
      toast.success("💾 Đã lưu bản nháp!");
    } catch (err) {
      toast.error("Không thể lưu bản nháp!");
    }
  };

  // Handle form submission
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
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Tạo dự án thất bại");

      toast.success("✅ Đã tạo dự án mới thành công!");
      router.push("/admin/projects");
    } catch (err: any) {
      toast.error(err.message || "❌ Có lỗi xảy ra!");
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
              Tạo dự án mới
            </h1>
            <p className="mt-1 text-gray-400">
              Thêm dự án mới vào portfolio của bạn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveDraft}
            disabled={!name.trim() || !client.trim()}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 transition-all border border-gray-500/30 rounded-xl hover:bg-gray-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            <span>Lưu nháp</span>
          </button>

          <button
            onClick={() => setShowPreview(true)}
            disabled={!name.trim() && !client.trim()}
            className="flex items-center gap-2 px-4 py-2 text-blue-400 transition-all border border-blue-500/30 rounded-xl hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye size={16} />
            <span>Xem trước</span>
          </button>

          <Link
            href="/admin/projects"
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
            {/* Project Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Tên dự án
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên dự án..."
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                required
              />
            </motion.div>

            {/* Client */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Khách hàng
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Nhập tên khách hàng..."
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                required
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Mô tả dự án
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết về dự án..."
                rows={6}
                className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border resize-none bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
              />
            </motion.div>

            {/* URLs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Liên kết dự án
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Website trực tiếp
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    GitHub Repository
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Ảnh dự án
              </label>

              {/* Preview Image */}
              {thumbnailPreview && (
                <div className="relative inline-block mb-4">
                  <Image
                    src={thumbnailPreview}
                    alt="Preview"
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
                      : "Click để chọn ảnh"}
                  </span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Trạng thái & Ưu tiên
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
                    <option value="Đang triển khai">Đang triển khai</option>
                    <option value="Đang thực hiện">Đang thực hiện</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Mức độ ưu tiên
                  </label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as "low" | "medium" | "high")
                    }
                    className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Budget & Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Ngân sách & Tiến độ
              </label>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Ngân sách (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Tiến độ ban đầu (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700 slider"
                  />
                  <div className="flex justify-between mt-1 text-sm text-gray-400">
                    <span>0%</span>
                    <span className="font-medium text-purple-400">
                      {progress}%
                    </span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Tags công nghệ
              </label>

              {/* Add Tag */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  placeholder="Thêm tag..."
                  className="flex-1 px-3 py-2 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={loading}
                  className="px-4 py-2 text-white transition-colors bg-purple-500 rounded-xl hover:bg-purple-600 disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Tags List */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 text-sm text-purple-300 transition-all border rounded-full cursor-pointer bg-purple-500/20 border-purple-500/30 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    #{tag}
                    <X size={12} />
                  </motion.span>
                ))}
              </div>

              {tags.length === 0 && (
                <p className="text-sm italic text-gray-500">
                  Chưa có tag nào. Thêm tag để phân loại dự án.
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <button
                type="submit"
                disabled={loading || !name.trim() || !client.trim()}
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
                    <span>Tạo dự án</span>
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
                  Xem trước dự án
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 transition-all hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {thumbnailPreview && (
                  <div className="relative mb-6 overflow-hidden aspect-video rounded-2xl">
                    <Image
                      src={thumbnailPreview}
                      alt={name}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                    {name || "Tên dự án"}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{client || "Khách hàng"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date().toLocaleDateString("vi-VN")}</span>
                    </div>
                    {budget > 0 && (
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} />
                        <span>{budget.toLocaleString("vi-VN")}đ</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        status === "Hoàn thành"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : status === "Đang thực hiện"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {status}
                    </span>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        priority === "high"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : priority === "medium"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      Ưu tiên:{" "}
                      {priority === "high"
                        ? "Cao"
                        : priority === "medium"
                        ? "Trung bình"
                        : "Thấp"}
                    </span>
                  </div>

                  {progress > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm text-gray-300">
                        <span>Tiến độ dự kiến</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-700 rounded-full">
                        <div
                          className="h-3 transition-all duration-1000 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

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
                      {description || "Mô tả dự án sẽ hiển thị ở đây..."}
                    </div>
                  </div>

                  {(liveUrl || githubUrl) && (
                    <div className="flex gap-4 pt-4">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-green-400 transition-all border bg-green-500/20 rounded-xl border-green-500/30 hover:bg-green-500/30"
                        >
                          <Globe size={16} />
                          <span>Xem trực tiếp</span>
                        </a>
                      )}
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-gray-400 transition-all border bg-gray-500/20 rounded-xl border-gray-500/30 hover:bg-gray-500/30"
                        >
                          <Monitor size={16} />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #8b5cf6, #3b82f6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #8b5cf6, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
