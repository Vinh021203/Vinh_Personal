"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Save,
  Shield,
  Upload,
  UserRound,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Role = "admin" | "user";
type Status = "active" | "inactive";

interface UserData {
  name: string;
  email: string;
  role: Role;
  status?: Status;
  avatar?: string;
  phone?: string;
  bio?: string;
  permissions?: string[];
  createdAt?: string;
  lastLogin?: string;
  posts?: number;
  projects?: number;
}

const initialsOf = (name?: string) =>
  (name || "VW")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function AvatarPreview({ name, src }: { name: string; src?: string }) {
  return (
    <span className="relative grid h-32 w-32 place-items-center overflow-hidden rounded-full border border-zinc-950 bg-zinc-950 text-4xl font-black text-[#ffb21c] shadow-[6px_6px_0_#ffb21c]">
      <span>{initialsOf(name)}</span>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => event.currentTarget.remove()}
        />
      ) : null}
    </span>
  );
}

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("user");
  const [status, setStatus] = useState<Status>("active");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [permissions, setPermissions] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tìm thấy người dùng");
        const data: UserData = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setRole(data.role || "user");
        setStatus(data.status || "active");
        setCurrentAvatar(data.avatar || "");
        setPhone(data.phone || "");
        setBio(data.bio || "");
        setPermissions((data.permissions || []).join("\n"));
        setCreatedAt(data.createdAt || "");
        setLastLogin(data.lastLogin || "");
      } catch {
        toast.error("Không tải được thông tin người dùng");
        router.push("/admin/users");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id, router]);

  const avatarSrc = useMemo(() => avatarPreview || currentAvatar || "", [avatarPreview, currentAvatar]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = (readerEvent) => setAvatarPreview(String(readerEvent.target?.result || ""));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("status", status);
      formData.append("avatarUrl", currentAvatar);
      formData.append("phone", phone);
      formData.append("bio", bio);
      formData.append("permissions", splitList(permissions).join(","));
      if (password.trim()) formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Đã cập nhật người dùng");
      router.push("/admin/users");
      router.refresh();
    } catch {
      toast.error("Không thể cập nhật người dùng");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="border border-zinc-950 bg-zinc-950 px-7 py-5 text-sm font-black uppercase tracking-[0.22em] text-white shadow-[6px_6px_0_#ffb21c]">
          Đang tải hồ sơ
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <Toaster position="top-right" />

      <section className="mb-8 mt-5 overflow-hidden border border-zinc-950 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c] sm:mt-6">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-5 sm:p-8 lg:p-9">
            <Link href="/admin/users" className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500 hover:text-zinc-950">
              <ArrowLeft size={18} /> Quay lại
            </Link>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#df8500]">
              Edit member
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.88] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
              Cập nhật <span className="text-[#df8500]">người dùng.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
              Chỉnh sửa thông tin hiển thị, quyền truy cập và trạng thái tài khoản.
            </p>
          </div>
          <div className="border-t border-zinc-950 bg-zinc-950 p-5 text-white lg:border-l lg:border-t-0 lg:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffb21c]">Account Preview</p>
            <div className="mt-6 flex flex-col items-center text-center">
              <AvatarPreview name={name} src={avatarSrc} />
              <h2 className="mt-6 text-2xl font-black tracking-[-0.05em]">{name || "Người dùng"}</h2>
              <p className="mt-2 font-semibold text-zinc-400">{email || "email@example.com"}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="border border-[#ffb21c] px-3 py-1 text-xs font-black uppercase text-[#ffb21c]">{role}</span>
                <span className="border border-white/20 px-3 py-1 text-xs font-black uppercase text-white">{status}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="border border-white/15 p-3">
                <Calendar size={18} className="text-[#ffb21c]" />
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Ngày tạo</p>
                <p className="mt-1 font-black">{createdAt ? new Date(createdAt).toLocaleDateString("vi-VN") : "—"}</p>
              </div>
              <div className="border border-white/15 p-3">
                <CheckCircle2 size={18} className="text-[#ffb21c]" />
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Đăng nhập</p>
                <p className="mt-1 font-black">{lastLogin ? new Date(lastLogin).toLocaleDateString("vi-VN") : "Chưa có"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="border border-zinc-950 bg-white p-6 shadow-[7px_7px_0_#e4ded0] sm:p-8">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-black tracking-[-0.04em]">
            <UserRound className="text-[#df8500]" /> Thông tin cơ bản
          </h2>
          <div className="grid gap-5">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Tên hiển thị</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="admin-crud-input mt-2" />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Email</span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="admin-crud-input pl-12" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Mật khẩu mới</span>
              <div className="relative mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Để trống nếu không đổi"
                  className="admin-crud-input pr-12"
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Số điện thoại</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="admin-crud-input mt-2" placeholder="0971 386 588" />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Bio ngắn</span>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="admin-crud-textarea mt-2" rows={4} maxLength={500} />
            </label>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="border border-zinc-950 bg-white p-6 shadow-[7px_7px_0_#ffb21c]">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-black">
              <Upload className="text-[#df8500]" /> Ảnh đại diện
            </h2>
            <div className="flex flex-col items-center">
              <AvatarPreview name={name} src={avatarSrc} />
              <label className="mt-6 cursor-pointer border border-zinc-950 bg-[#fff8e9] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] hover:bg-[#ffb21c]">
                Chọn ảnh mới
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Permissions</span>
              <textarea value={permissions} onChange={(e) => setPermissions(e.target.value)} className="admin-crud-textarea mt-2" rows={4} placeholder={"projects:write\nservices:write\nusers:read"} />
            </label>
          </section>

          <section className="border border-zinc-950 bg-white p-6 shadow-[7px_7px_0_#e4ded0]">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-black">
              <Shield className="text-[#df8500]" /> Phân quyền
            </h2>
            <div className="grid gap-4">
              <label>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Vai trò</span>
                <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="admin-select mt-2">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Trạng thái</span>
                <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="admin-select mt-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-3 border border-zinc-950 bg-[#ffb21c] px-6 py-5 text-sm font-black uppercase tracking-[0.14em] shadow-[5px_5px_0_#111] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Save size={20} /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function splitList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}
