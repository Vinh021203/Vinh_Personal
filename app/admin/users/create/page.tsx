"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Plus,
  Shield,
  Sparkles,
  UserRound,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Role = "admin" | "user";
type Status = "active" | "inactive";

const initialsOf = (name?: string) =>
  (name || "VW")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function CreateUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("user");
  const [status, setStatus] = useState<Status>("active");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  const initials = useMemo(() => initialsOf(name), [name]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, status, avatar }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Create failed");

      toast.success("Đã tạo người dùng mới");
      router.push("/admin/users");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Không thể tạo người dùng");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <Toaster position="top-right" />

      <section className="mb-8 mt-5 overflow-hidden border border-zinc-950 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c] sm:mt-6">
        <div className="grid lg:grid-cols-[1fr_420px]">
          <div className="p-7 sm:p-10 lg:p-12">
            <Link href="/admin/users" className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-slate-500 hover:text-zinc-950">
              <ArrowLeft size={18} /> Quay lại
            </Link>
            <div className="mb-8 inline-flex -rotate-2 items-center gap-2 border border-zinc-950 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.28em] shadow-[4px_4px_0_#ffb21c]">
              <Sparkles size={16} className="text-[#e88900]" />
              New Member
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.08em] text-zinc-950 sm:text-7xl">
              Tạo tài khoản <span className="text-[#df8500]">CMS.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600">
              Thêm thành viên mới, gán quyền truy cập và trạng thái hoạt động ngay từ đầu.
            </p>
          </div>
          <aside className="border-t border-zinc-950 bg-zinc-950 p-8 text-white lg:border-l lg:border-t-0">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffb21c]">Live Preview</p>
            <div className="mt-8 flex flex-col items-center text-center">
              <span className="relative grid h-32 w-32 place-items-center overflow-hidden rounded-full border border-white/20 bg-white text-4xl font-black text-zinc-950 shadow-[6px_6px_0_#ffb21c]">
                <span>{initials}</span>
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatar}
                    alt={name}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(event) => event.currentTarget.remove()}
                  />
                ) : null}
              </span>
              <h2 className="mt-7 text-3xl font-black tracking-[-0.05em]">{name || "Tên người dùng"}</h2>
              <p className="mt-2 font-semibold text-zinc-400">{email || "name@example.com"}</p>
              <div className="mt-6 flex gap-2">
                <span className="border border-[#ffb21c] px-3 py-1 text-xs font-black uppercase text-[#ffb21c]">{role}</span>
                <span className="border border-white/20 px-3 py-1 text-xs font-black uppercase">{status}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="border border-zinc-950 bg-white p-6 shadow-[7px_7px_0_#e4ded0] sm:p-8">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-black tracking-[-0.04em]">
            <UserRound className="text-[#df8500]" /> Thông tin đăng nhập
          </h2>
          <div className="grid gap-5">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Họ và tên</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="admin-crud-input mt-2" placeholder="Lương Vinh" />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Email</span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="admin-crud-input pl-12" placeholder="name@example.com" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Mật khẩu</span>
              <div className="relative mt-2">
                <input value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} type={showPassword ? "text" : "password"} className="admin-crud-input pr-12" placeholder="Tối thiểu 6 ký tự" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Avatar URL nếu có</span>
              <input value={avatar} onChange={(e) => setAvatar(e.target.value)} className="admin-crud-input mt-2" placeholder="https://..." />
            </label>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="border border-zinc-950 bg-white p-6 shadow-[7px_7px_0_#ffb21c]">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-black">
              <Shield className="text-[#df8500]" /> Quyền truy cập
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

          <div className="border border-zinc-950 bg-[#fff8e9] p-5">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-1 text-[#df8500]" size={20} />
              <p className="text-sm font-bold leading-relaxed text-slate-600">
                Sau khi tạo, người dùng có thể đăng nhập bằng email và mật khẩu đã cấp.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-3 border border-zinc-950 bg-[#ffb21c] px-6 py-5 text-sm font-black uppercase tracking-[0.14em] shadow-[5px_5px_0_#111] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Plus size={20} /> {saving ? "Đang tạo..." : "Tạo người dùng"}
          </button>
        </aside>
      </form>
    </div>
  );
}
