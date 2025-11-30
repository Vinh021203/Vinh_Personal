"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  User,
  Eye,
  EyeOff,
  Upload,
  X,
  Calendar,
  Mail,
  Shield,
  Crown,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit3,
  Activity,
  LayoutTemplate,
  Lock,
  FileText,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface UserData {
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  avatar?: string;
  status?: "active" | "inactive";
  lastLogin?: string;
  posts?: number;
  projects?: number;
}

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  // --- STATE ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState(""); // Avatar URL từ DB

  const [createdAt, setCreatedAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [posts, setPosts] = useState(0);
  const [projects, setProjects] = useState(0);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [splitView, setSplitView] = useState(true);

  // --- EFFECTS & HANDLERS ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy người dùng");
        const data: UserData = await res.json();

        setName(data.name || "");
        setEmail(data.email || "");
        setRole(data.role || "user");
        setStatus(data.status || "active");
        setCreatedAt(data.createdAt || "");
        setLastLogin(data.lastLogin || "");
        setPosts(data.posts || 0);
        setProjects(data.projects || 0);

        // Set current avatar from DB
        setCurrentAvatar(data.avatar || "");
      } catch (err: any) {
        toast.error("Lỗi khi tải thông tin user!");
        router.push("/admin/users");
      } finally {
        setFetchLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setIsDirty(true);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const saveDraft = async () => {
    if (!name.trim() || !email.trim()) return;
    toast.success("💾 Đã lưu thay đổi (Bản nháp)");
    setIsDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim() || !email.trim()) {
      toast.error("Vui lòng nhập đầy đủ tên và email!");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("role", role);
      formData.append("status", status);

      // Chỉ gửi password nếu có nhập mới
      if (password) {
        formData.append("password", password);
      }

      // Chỉ gửi avatar nếu có file mới
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");

      toast.success("✅ Đã cập nhật người dùng thành công!");
      setIsDirty(false);
      router.push("/admin/users");
    } catch (error: any) {
      toast.error(error.message || "❌ Lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  // Helper UI
  const getRoleColor = (r: string) =>
    r === "admin"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-blue-50 text-blue-600 border-blue-100";
  const getStatusColor = (s: string) =>
    s === "active"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-slate-100 text-slate-500 border-slate-200";

  // Display Image Logic: Preview > Current > Placeholder
  const displayAvatar =
    avatarPreview || currentAvatar || "/placeholder-user.jpg";

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

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 flex flex-col justify-between gap-6 p-4 mb-8 -mx-4 border-b md:flex-row md:items-center bg-white/80 backdrop-blur-xl md:-mx-8 md:px-8 border-orange-100/50"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/admin/users"
            className="p-2 transition-colors text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-800">
              Chỉnh sửa người dùng{" "}
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
              {createdAt && (
                <span className="flex items-center gap-1">
                  <Clock size={12} /> Tham gia:{" "}
                  {new Date(createdAt).toLocaleDateString("vi-VN")}
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
            <LayoutTemplate size={18} />{" "}
            <span>{splitView ? "Ẩn xem trước" : "Hiện xem trước"}</span>
          </button>
          <button
            onClick={saveDraft}
            disabled={!isDirty}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50"
          >
            <Save size={18} /> <span>Lưu nháp</span>
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
            )}{" "}
            <span>Cập nhật</span>
          </button>
        </div>
      </motion.div>

      <div
        className={`grid gap-8 ${
          splitView ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {/* FORM SECTION */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
          >
            <h3 className="flex items-center gap-2 mb-6 text-lg font-bold text-slate-800">
              <User size={20} className="text-orange-500" /> Thông tin cơ bản
            </h3>
            <div className="flex flex-col gap-8 md:flex-row">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-32 h-32">
                  <div className="w-32 h-32 overflow-hidden border-4 border-orange-100 rounded-full shadow-inner">
                    <Image
                      src={displayAvatar}
                      alt="Avatar"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 p-2 text-white transition-colors rounded-full shadow-lg cursor-pointer bg-slate-800 hover:bg-orange-500"
                  >
                    <Edit3 size={14} />
                    <input
                      type="file"
                      id="avatar"
                      className="hidden"
                      onChange={handleAvatarChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                <p className="text-xs font-medium text-slate-400">
                  Allowed *.jpeg, *.jpg, *.png
                </p>
              </div>

              {/* Inputs */}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full py-3 pl-10 pr-4 text-sm font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full py-3 pl-10 pr-4 text-sm font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
            >
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
                <Shield size={20} className="text-blue-500" /> Phân quyền
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Vai trò
                  </label>
                  <select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value as any);
                      setIsDirty(true);
                    }}
                    className="w-full px-4 py-3 text-sm font-bold border cursor-pointer bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                  >
                    <option value="user">Thành viên (User)</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Trạng thái
                  </label>
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value as any);
                      setIsDirty(true);
                    }}
                    className="w-full px-4 py-3 text-sm font-bold border cursor-pointer bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Vô hiệu hóa</option>
                  </select>
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
                <Lock size={20} className="text-red-500" /> Bảo mật
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Đổi mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="Để trống nếu không đổi"
                    className="w-full py-3 pl-4 pr-12 text-sm font-medium border outline-none bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:border-orange-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  Mật khẩu cần ít nhất 8 ký tự.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SIDEBAR PREVIEW */}
        <div className="space-y-6">
          {splitView ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wider uppercase text-slate-400">
                <Eye size={16} /> Live Card Preview
              </div>
              <div className="group relative bg-white rounded-[2rem] border border-orange-100 shadow-xl overflow-hidden flex flex-col items-center p-8 text-center">
                <div className="relative mb-4">
                  <div className="p-1 border-2 border-orange-200 border-dashed rounded-full w-28 h-28">
                    <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-50">
                      <Image
                        src={displayAvatar}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  {role === "admin" && (
                    <div className="absolute bottom-0 right-0 p-2 text-white border-4 border-white rounded-full shadow-sm bg-amber-400">
                      <Crown size={14} fill="currentColor" />
                    </div>
                  )}
                </div>
                <h3 className="mb-1 text-xl font-extrabold text-slate-800">
                  {name || "Tên hiển thị"}
                </h3>
                <p className="mb-6 text-sm font-medium text-slate-400">
                  {email || "email@domain.com"}
                </p>
                <div className="flex gap-2 mb-8">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider flex items-center gap-1 ${getRoleColor(
                      role
                    )}`}
                  >
                    {role === "admin" ? (
                      <Crown size={12} />
                    ) : (
                      <Shield size={12} />
                    )}{" "}
                    {role}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider flex items-center gap-1 ${getStatusColor(
                      status
                    )}`}
                  >
                    <CheckCircle2 size={12} /> {status}
                  </span>
                </div>

                {/* Mini Stats */}
                <div className="grid w-full grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                  <div className="p-3 border bg-slate-50 rounded-xl border-slate-100">
                    <div className="flex items-center justify-center gap-1 mb-1 text-xs font-bold uppercase text-slate-400">
                      <FileText size={12} /> Bài viết
                    </div>
                    <p className="text-2xl font-extrabold text-slate-700">
                      {posts}
                    </p>
                  </div>
                  <div className="p-3 border bg-slate-50 rounded-xl border-slate-100">
                    <div className="flex items-center justify-center gap-1 mb-1 text-xs font-bold uppercase text-slate-400">
                      <FolderKanban size={12} /> Dự án
                    </div>
                    <p className="text-2xl font-extrabold text-slate-700">
                      {projects}
                    </p>
                  </div>
                </div>
                {lastLogin && (
                  <div className="flex items-center gap-1 mt-4 text-xs text-slate-400">
                    <Activity size={12} className="text-green-500" /> Online:{" "}
                    {new Date(lastLogin).toLocaleDateString("vi-VN")}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-white border border-orange-100 rounded-[24px] shadow-sm"
            >
              <h3 className="mb-4 text-lg font-bold text-slate-800">
                Thống kê hoạt động
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-500">
                    Bài viết
                  </span>
                  <span className="text-lg font-bold text-slate-800">
                    {posts}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-500">
                    Dự án
                  </span>
                  <span className="text-lg font-bold text-slate-800">
                    {projects}
                  </span>
                </div>
                {lastLogin && (
                  <div className="pt-2 text-xs text-center text-slate-400">
                    Đăng nhập cuối:{" "}
                    {new Date(lastLogin).toLocaleString("vi-VN")}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
