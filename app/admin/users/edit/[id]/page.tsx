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
  Settings,
  Calendar,
  Mail,
  Shield,
  Crown,
  UserCheck,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit3,
  Monitor,
  Activity,
  Sparkles,
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [posts, setPosts] = useState(0);
  const [projects, setProjects] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data: UserData = await res.json();
        if (!res.ok) {
          const errorData = data as any;
          throw new Error(errorData.message || "Không tìm thấy người dùng");
        }

        setName(data.name || "");
        setEmail(data.email || "");
        setRole(data.role || "user");
        setStatus(data.status || "active");
        setCreatedAt(data.createdAt || "");
        setLastLogin(data.lastLogin || "");
        setPosts(data.posts || 0);
        setProjects(data.projects || 0);
        setCurrentAvatar(
          data.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.name
            )}&background=8b5cf6&color=fff&size=128`
        );
      } catch (err: any) {
        toast.error("Lỗi khi tải thông tin user!");
        router.push("/admin/users");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchUser();
  }, [id, router]);

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setIsDirty(true);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove avatar
  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview("");
    setIsDirty(true);
  };

  // Save draft
  const saveDraft = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Vui lòng nhập tên và email!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("role", role);
    formData.append("status", status);
    if (password) formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
      });
      toast.success("💾 Đã lưu thay đổi");
      setIsDirty(false);
    } catch (err) {
      toast.error("Không thể lưu thay đổi");
    }
  };

  // Handle form submission
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
      if (password) formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

      toast.success("✅ Đã cập nhật người dùng thành công!");
      setIsDirty(false);
      router.push("/admin/users");
    } catch (error: any) {
      toast.error(error.message || "❌ Lỗi khi cập nhật!");
    } finally {
      setLoading(false);
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
            Đang tải thông tin người dùng...
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
              Chỉnh sửa người dùng
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>ID: #{id}</span>
              </div>
              {createdAt && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>
                    Tạo: {new Date(createdAt).toLocaleDateString("vi-VN")}
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
            <span>Lưu thay đổi</span>
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 text-blue-400 transition-all border border-blue-500/30 rounded-xl hover:bg-blue-500/10"
          >
            <Eye size={16} />
            <span>Xem trước</span>
          </button>

          <Link
            href="/admin/users"
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
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-6 text-lg font-semibold text-white">
                Thông tin cơ bản
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Tên đầy đủ
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="Nhập tên đầy đủ..."
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="Nhập email..."
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Đổi mật khẩu (tùy chọn)
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="Nhập mật khẩu mới..."
                  className="w-full px-4 py-3 pr-12 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-4 top-1/2 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Để trống nếu không muốn đổi mật khẩu
              </p>
            </motion.div>

            {/* Avatar Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Avatar
              </label>

              {/* Current/Preview Avatar */}
              <div className="flex items-center gap-6 mb-4">
                <div className="relative">
                  <div className="w-20 h-20 overflow-hidden border-4 rounded-full border-purple-500/30">
                    <Image
                      src={avatarPreview || currentAvatar}
                      alt="Avatar"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {role === "admin" && (
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-yellow-500 border-2 rounded-full -bottom-1 -right-1 border-slate-800">
                      <Crown size={12} className="text-black" />
                    </div>
                  )}
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute p-1 text-white transition-colors bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Upload Area */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="file"
                      id="avatar"
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label
                      htmlFor="avatar"
                      className="flex items-center justify-center w-full h-20 transition-colors border-2 border-dashed cursor-pointer border-purple-500/30 rounded-2xl hover:border-purple-400/50 bg-purple-500/5 hover:bg-purple-500/10"
                    >
                      <div className="text-center">
                        <Upload className="w-6 h-6 mx-auto mb-1 text-purple-400" />
                        <span className="text-sm text-gray-300">
                          {avatar
                            ? `Đã chọn: ${avatar.name}`
                            : "Click để chọn avatar mới"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Vai trò & Trạng thái
              </label>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Vai trò
                  </label>
                  <select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value as "user" | "admin");
                      setIsDirty(true);
                    }}
                    className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  >
                    <option value="user">User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Trạng thái
                  </label>
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value as "active" | "inactive");
                      setIsDirty(true);
                    }}
                    className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Thống kê
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 text-center rounded-xl bg-white/5">
                  <div className="text-xl font-bold text-purple-400">
                    {posts}
                  </div>
                  <div className="text-xs text-gray-400">Bài viết</div>
                </div>
                <div className="p-3 text-center rounded-xl bg-white/5">
                  <div className="text-xl font-bold text-blue-400">
                    {projects}
                  </div>
                  <div className="text-xs text-gray-400">Dự án</div>
                </div>
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
            >
              <label className="block mb-4 text-lg font-semibold text-white">
                Thông tin tài khoản
              </label>

              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="mb-1 text-gray-400">Ngày tạo</div>
                  <div className="text-white">
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString("vi-VN")
                      : "Chưa rõ"}
                  </div>
                </div>

                {lastLogin && (
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="mb-1 text-gray-400">Đăng nhập cuối</div>
                    <div className="text-white">
                      {new Date(lastLogin).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                )}
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
                    <span>Cập nhật người dùng</span>
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
                  Xem trước thông tin
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 transition-all hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 overflow-hidden border-4 rounded-full border-purple-500/30">
                      <Image
                        src={avatarPreview || currentAvatar}
                        alt={name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {role === "admin" && (
                      <div className="absolute flex items-center justify-center w-6 h-6 bg-yellow-500 border-2 rounded-full -bottom-1 -right-1 border-slate-800">
                        <Crown size={12} className="text-black" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                      {name || "Tên người dùng"}
                    </h3>
                    <p className="mb-4 text-gray-300 break-all">
                      {email || "email@example.com"}
                    </p>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          role === "admin"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {role === "admin" ? "Administrator" : "User"}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          status === "active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        }`}
                      >
                        {status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 text-center border rounded-2xl bg-white/5 border-purple-500/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-400">
                      Bài viết
                    </h4>
                    <div className="text-2xl font-bold text-white">{posts}</div>
                  </div>

                  <div className="p-4 text-center border rounded-2xl bg-white/5 border-purple-500/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-400">
                      Dự án
                    </h4>
                    <div className="text-2xl font-bold text-white">
                      {projects}
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
