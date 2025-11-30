"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User as UserIcon,
  Bell,
  Laptop,
  Shield,
  ChevronRight,
  Save,
  Loader2,
  Lock,
  Globe,
  Moon,
  Sun,
  Camera,
  Upload,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

// --- TYPES ---
// Định nghĩa lại interface để khớp với UserSchema từ mongoose và JWT Payload
interface UserType {
  _id?: string; // MongoDB ID
  id?: string; // JWT Payload ID
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status?: "active" | "inactive"; // Khớp với enum trong Schema
}

// --- CONFIG ---
const TABS = [
  {
    id: "account",
    label: "Tài khoản",
    icon: UserIcon,
    desc: "Thông tin cá nhân & Avatar",
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: Bell,
    desc: "Email, Push & SMS",
  },
  {
    id: "appearance",
    label: "Giao diện",
    icon: Laptop,
    desc: "Theme & Ngôn ngữ",
  },
  { id: "security", label: "Bảo mật", icon: Shield, desc: "Mật khẩu & 2FA" },
];

const THEME = {
  activeTab: "bg-orange-50 text-orange-600 border-orange-200 shadow-sm",
  inactiveTab:
    "text-slate-500 hover:bg-white hover:text-slate-700 border-transparent",
  gradientBg: "bg-gradient-to-r from-orange-500 to-amber-500",
};

export default function SettingsPage() {
  const { user, loading, refreshUser } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // State quản lý hiển thị ảnh (quan trọng để fix lag)
  const [displayAvatar, setDisplayAvatar] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mock Settings
  const [settings, setSettings] = useState({
    emailNotif: true,
    pushNotif: false,
    marketing: true,
    darkMode: false,
    language: "vi",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cast user an toàn
  const currentUser = user as unknown as UserType;

  // --- INIT DATA ---
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    } else if (currentUser) {
      setName(currentUser.name || "");

      // Nếu chưa có ảnh upload mới, hiển thị ảnh từ DB
      if (!avatarFile) {
        const currentUrl = currentUser.avatar || "";
        // Thêm timestamp để tránh cache trình duyệt nếu đã có ảnh
        if (currentUrl) {
          setDisplayAvatar(`${currentUrl}?t=${Date.now()}`);
        } else {
          setDisplayAvatar("");
        }
      }
    }
  }, [currentUser, loading, router, avatarFile]);

  // --- HANDLERS ---
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Tạo preview ngay lập tức từ file local (Instant feedback)
      const objectUrl = URL.createObjectURL(file);
      setDisplayAvatar(objectUrl);

      // Cleanup memory
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSaveAccount = async () => {
    if (!currentUser) return;

    // Lấy ID an toàn (chấp nhận cả _id từ DB và id từ JWT)
    const userId = currentUser._id || currentUser.id;

    if (!userId) {
      toast.error("Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      // Giữ nguyên các trường không đổi
      formData.append("email", currentUser.email);
      formData.append("role", currentUser.role);
      formData.append("status", currentUser.status || "active");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Lỗi khi cập nhật");
      }

      const updatedUser = await res.json();

      // 1. Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
      setAvatarFile(null);

      // 2. Cập nhật UI ngay lập tức với link ảnh mới từ server
      if (updatedUser.avatar) {
        setDisplayAvatar(`${updatedUser.avatar}?t=${Date.now()}`); // Cache busting
      }

      // 3. Đồng bộ lại Context (quan trọng để header cũng cập nhật)
      await refreshUser();

      toast.success("Đã cập nhật thông tin!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Cập nhật thất bại!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePassword = async () => {
    if (!currentUser) return;

    const userId = currentUser._id || currentUser.id;
    if (!userId) {
      toast.error("Lỗi ID người dùng");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      // Gửi lại các trường required để tránh lỗi validation backend (nếu có)
      formData.append("name", currentUser.name);
      formData.append("email", currentUser.email);
      formData.append("role", currentUser.role);
      formData.append("status", currentUser.status || "active");

      formData.append("password", newPassword);

      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi đổi mật khẩu");

      toast.success("Đổi mật khẩu thành công!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại!");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !currentUser)
    return (
      <div className="flex items-center justify-center h-screen text-slate-500">
        Loading settings...
      </div>
    );

  return (
    <div className="relative w-full h-full bg-[#fff7ed] py-12 font-sans selection:bg-orange-200">
      <Toaster position="top-right" />

      {/* Background Decor */}
      <div className="absolute inset-0 h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 h-full max-w-5xl px-6 mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-black tracking-tight text-slate-900">
            Cài đặt
          </h1>
          <p className="font-medium text-slate-500">
            Quản lý tùy chọn và cấu hình tài khoản của bạn.
          </p>
        </div>

        <div className="flex flex-col h-full gap-8 lg:flex-row">
          {/* SIDEBAR */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white/60 backdrop-blur-xl rounded-[24px] p-3 border border-white/60 shadow-lg sticky top-28">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                    activeTab === tab.id ? THEME.activeTab : THEME.inactiveTab
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl ${
                      activeTab === tab.id
                        ? "bg-white text-orange-500 shadow-sm"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <tab.icon size={20} />
                  </div>
                  <div className="text-left">
                    <span
                      className={`block text-sm font-bold ${
                        activeTab === tab.id
                          ? "text-slate-800"
                          : "text-slate-600"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {tab.desc}
                    </span>
                  </div>
                  {activeTab === tab.id && (
                    <ChevronRight
                      size={16}
                      className="ml-auto text-orange-400"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 lg:p-10 border border-white shadow-xl h-full"
              >
                {/* TAB: ACCOUNT */}
                {activeTab === "account" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="mb-1 text-xl font-extrabold text-slate-800">
                        Thông tin cơ bản
                      </h2>
                      <p className="text-sm text-slate-500">
                        Thông tin hiển thị công khai trên hồ sơ của bạn.
                      </p>
                    </div>

                    {/* Avatar Section */}
                    <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                      <div className="relative group">
                        <div className="relative w-24 h-24 overflow-hidden border-4 border-white rounded-full shadow-lg bg-slate-100">
                          {/* Dùng key là displayAvatar để ép re-render khi URL thay đổi */}
                          <Image
                            key={displayAvatar}
                            src={displayAvatar || "/placeholder.jpg"}
                            alt="Avatar"
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                            unoptimized={true} // Bắt buộc để hiển thị ảnh external
                            priority // Load ngay lập tức
                            onError={(e) => {
                              e.currentTarget.srcset = "/placeholder.jpg";
                            }}
                          />
                        </div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 p-2 text-white transition-colors rounded-full shadow-md bg-slate-800 hover:bg-orange-500"
                        >
                          <Camera size={16} />
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-700">
                          Ảnh đại diện
                        </h3>
                        <p className="mb-3 text-xs text-slate-400">
                          PNG, JPG tối đa 5MB
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:underline"
                        >
                          <Upload size={14} /> Tải ảnh mới
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="ml-1 text-xs font-bold uppercase text-slate-500">
                          Tên hiển thị
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-4 font-bold transition-all bg-white border outline-none border-slate-200 rounded-2xl text-slate-700 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="ml-1 text-xs font-bold uppercase text-slate-500">
                          Email
                        </label>
                        <input
                          type="email"
                          value={currentUser.email}
                          disabled
                          className="w-full p-4 font-medium border cursor-not-allowed bg-slate-50 border-slate-200 rounded-2xl text-slate-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="ml-1 text-xs font-bold uppercase text-slate-500">
                          Vai trò
                        </label>
                        <div className="inline-block px-4 py-3 text-sm font-bold text-orange-700 border border-orange-100 bg-orange-50 rounded-2xl">
                          {currentUser.role?.toUpperCase() || "USER"}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveAccount}
                        disabled={isSaving}
                        className={`px-8 py-3 ${THEME.gradientBg} text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-2 disabled:opacity-70`}
                      >
                        {isSaving ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Save size={18} />
                        )}
                        {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* TAB: SECURITY */}
                {activeTab === "security" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="mb-1 text-xl font-extrabold text-slate-800">
                        Bảo mật tài khoản
                      </h2>
                      <p className="text-sm text-slate-500">
                        Quản lý mật khẩu và các phiên đăng nhập.
                      </p>
                    </div>

                    <div className="p-6 border border-orange-100 rounded-2xl bg-orange-50">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-2 text-orange-500 bg-white rounded-lg shadow-sm">
                          <Lock size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">
                            Đổi mật khẩu
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            Nên đổi mật khẩu định kỳ.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 text-sm bg-white border outline-none rounded-xl border-slate-200 focus:ring-2 focus:ring-orange-500/20"
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="Xác nhận mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 text-sm bg-white border outline-none rounded-xl border-slate-200 focus:ring-2 focus:ring-orange-500/20"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={handleSavePassword}
                            disabled={isSaving || !newPassword}
                            className="px-4 py-2 text-sm font-bold text-white transition-colors bg-slate-800 rounded-xl hover:bg-orange-500 disabled:opacity-50"
                          >
                            {isSaving ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* OTHER TABS */}
                {(activeTab === "notifications" ||
                  activeTab === "appearance") && (
                  <div className="flex items-center justify-center h-64 text-slate-400">
                    Tính năng đang phát triển...
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
const ToggleItem = ({ label, desc, checked, onChange }: any) => (
  <div
    className="flex items-center justify-between p-4 transition-all border cursor-pointer rounded-2xl border-slate-100 hover:border-orange-200 hover:bg-white group"
    onClick={onChange}
  >
    <div>
      <h3 className="text-sm font-bold transition-colors text-slate-700 group-hover:text-orange-700">
        {label}
      </h3>
      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
    </div>
    <div
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
        checked ? "bg-orange-500" : "bg-slate-200"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
          checked ? "left-7" : "left-1"
        }`}
      />
    </div>
  </div>
);
