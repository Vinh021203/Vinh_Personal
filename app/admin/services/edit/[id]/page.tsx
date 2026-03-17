"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Eye,
  Settings,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Clock,
  Edit3,
  LayoutTemplate,
  Wrench,
  DollarSign,
  Tag,
  CheckCircle2,
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  LucideIcon,
  Star,
} from "lucide-react";
import Link from "next/link";
import SelectIconField from "@/components/admin/SelectIconField";
import Image from "next/image";

interface ServiceData {
  name: string;
  description: string;
  icon: string;
  status: "Hiển thị" | "Ẩn";
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  price?: number;
  category?: string;
  featured?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  Wrench,
  Settings,
};

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();

  // --- STATE ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Code2");
  const [status, setStatus] = useState<"Hiển thị" | "Ẩn">("Hiển thị");

  // New Fields
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);

  // Image State
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [splitView, setSplitView] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) throw new Error("Không thể tải dịch vụ");
        const data: ServiceData = await res.json();

        setName(data.name || "");
        setDescription(data.description || "");
        setIcon(data.icon || "Code2");
        setStatus(data.status || "Hiển thị");
        setPrice(data.price || 0);
        setCategory(data.category || "");
        setFeatured(data.featured || false);
        setCurrentImage(data.image || "");
        setUpdatedAt(data.updatedAt || "");
      } catch (err) {
        toast.error("Lỗi tải dữ liệu");
        router.push("/admin/services");
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchData();
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

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim() || !description.trim()) {
      toast.error("Vui lòng nhập đầy đủ tên và mô tả!");
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("name", name.trim());
      form.append("description", description.trim());
      form.append("status", status);
      form.append("icon", icon);
      form.append("price", price.toString());
      form.append("category", category.trim());
      form.append("featured", featured.toString()); // Quan trọng: gửi boolean dưới dạng string

      if (thumbnail) {
        form.append("thumbnail", thumbnail);
      }

      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");

      toast.success("✅ Cập nhật thành công!");
      setIsDirty(false);
      router.push("/admin/services");
    } catch (err) {
      toast.error("❌ Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (s: string) =>
    s === "Hiển thị"
      ? "bg-green-50 text-green-600 border-green-200"
      : "bg-slate-50 text-slate-500 border-slate-200";

  if (fetchLoading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen pb-8 px-8">
      <Toaster position="top-right" />

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
            <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-800">
              Chỉnh sửa dịch vụ
              {isDirty && (
                <span
                  className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"
                  title="Unsaved changes"
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
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 disabled:opacity-50"
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

      <form
        onSubmit={handleSubmit}
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
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <Wrench size={20} className="text-orange-500" /> Thông tin dịch vụ
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Tên dịch vụ
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
                  Mô tả
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setIsDirty(true);
                  }}
                  rows={5}
                  className="w-full px-4 py-3 text-sm font-medium transition-all border outline-none resize-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Icon & Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
              <Sparkles size={20} className="text-blue-500" /> Icon & Hình ảnh
            </h3>
            <div className="mb-6">
              <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
                Icon
              </label>
              <div className="p-4 border bg-slate-50 rounded-xl border-slate-200">
                <SelectIconField
                  icon={icon}
                  setIcon={(v) => {
                    setIcon(v);
                    setIsDirty(true);
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
                Ảnh minh họa
              </label>
              {thumbnailPreview || currentImage ? (
                <div className="relative group w-fit">
                  <Image
                    src={thumbnailPreview || currentImage}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="object-cover border rounded-xl border-slate-200"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 transition-all border-2 border-dashed cursor-pointer border-slate-200 rounded-2xl hover:border-orange-400 hover:bg-orange-50 bg-slate-50/50">
                  <Upload className="w-5 h-5 mb-2 text-slate-400" />
                  <span className="text-xs font-medium text-slate-500">
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
            </div>
          </motion.div>
        </div>

        {/* 3. SIDEBAR / PREVIEW */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky space-y-6 top-24"
          >
            {/* Configuration */}
            <div className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm">
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
                      onChange={(e) => {
                        setStatus(e.target.value as any);
                        setIsDirty(true);
                      }}
                      className="w-full px-4 py-3 text-sm font-bold border appearance-none cursor-pointer bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                    >
                      <option value="Hiển thị">Hiển thị</option>
                      <option value="Ẩn">Ẩn</option>
                    </select>
                    <CheckCircle2
                      className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400"
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
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setIsDirty(true);
                      }}
                      placeholder="VD: Web"
                      className="w-full py-3 pl-10 pr-4 text-sm font-medium border outline-none bg-slate-50 border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Giá (VNĐ)
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => {
                        setPrice(Number(e.target.value));
                        setIsDirty(true);
                      }}
                      className="w-full py-3 pl-10 pr-4 font-mono text-sm font-bold border outline-none bg-slate-50 border-slate-200 rounded-xl"
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
                      onChange={(e) => {
                        setFeatured(e.target.checked);
                        setIsDirty(true);
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            {splitView && (
              <div className="group relative bg-white rounded-[2rem] shadow-xl border border-orange-100 overflow-hidden flex flex-col">
                <div className="relative flex items-center justify-center w-full h-40 bg-gradient-to-br from-orange-50 to-amber-50">
                  <div className="flex items-center justify-center w-20 h-20 text-orange-500 bg-white shadow-lg rounded-2xl">
                    {(() => {
                      const Icon = iconMap[icon] || Code2;
                      return <Icon size={40} strokeWidth={1.5} />;
                    })()}
                  </div>
                  {featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-white p-1.5 rounded-full shadow-sm">
                      <Star size={12} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-xl font-extrabold text-slate-800">
                    {name || "Tên dịch vụ"}
                  </h3>
                  <span
                    className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold border uppercase ${getStatusColor(
                      status,
                    )}`}
                  >
                    {status}
                  </span>
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
              </div>
            )}
          </motion.div>
        </div>
      </form>
    </div>
  );
}
