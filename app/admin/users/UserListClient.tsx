"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Eye,
  Filter,
  LayoutGrid,
  List,
  Mail,
  Pencil,
  Plus,
  Search,
  Shield,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

type Role = "admin" | "user";
type Status = "active" | "inactive";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: Role;
  status?: Status;
  avatar?: string;
  createdAt: string;
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

function AvatarBadge({
  name,
  avatar,
  className = "h-24 w-24",
}: {
  name: string;
  avatar?: string;
  className?: string;
}) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-zinc-950 bg-zinc-950 font-black text-[#ffb21c] shadow-[5px_5px_0_#ffb21c] ${className}`}
    >
      <span>{initialsOf(name)}</span>
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
  );
}

function RoleBadge({ role }: { role: Role }) {
  const isAdmin = role === "admin";
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
        isAdmin
          ? "border-zinc-950 bg-[#ffb21c] text-zinc-950"
          : "border-blue-200 bg-blue-50 text-blue-700"
      }`}
    >
      <Shield size={13} />
      {isAdmin ? "Admin" : "User"}
    </span>
  );
}

function StatusBadge({ status = "active" }: { status?: Status }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {active ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function IconButton({
  children,
  onClick,
  href,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  label: string;
}) {
  const className =
    "grid h-10 w-10 place-items-center border border-zinc-950 bg-white text-zinc-950 transition hover:-translate-y-0.5 hover:bg-[#ffb21c] hover:shadow-[3px_3px_0_#111]";

  if (href) {
    return (
      <Link aria-label={label} href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button aria-label={label} type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default function UserListClient() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<"all" | Role>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      if (!res.ok) throw new Error("Không thể tải người dùng");
      const data = await res.json();
      setUsers(
        data.map((user: UserItem) => ({
          ...user,
          role: user.role || "user",
          status: user.status || "active",
          posts: user.posts || 0,
          projects: user.projects || 0,
        })),
      );
    } catch {
      toast.error("Không tải được danh sách người dùng");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return users.filter((user) => {
      const matchText =
        !keyword ||
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword);
      const matchRole = role === "all" || user.role === role;
      return matchText && matchRole;
    });
  }, [query, role, users]);

  const stats = useMemo(() => {
    const admins = users.filter((user) => user.role === "admin").length;
    const active = users.filter((user) => (user.status || "active") === "active").length;
    return {
      total: users.length,
      admins,
      active,
      inactive: users.length - active,
    };
  }, [users]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/users/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setUsers((items) => items.filter((user) => user._id !== deleteId));
      toast.success("Đã xoá người dùng");
      setDeleteId(null);
    } catch {
      toast.error("Không thể xoá người dùng");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <Toaster position="top-right" />

      <section className="mb-8 mt-5 overflow-hidden border border-zinc-950 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c] sm:mt-6">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-5 sm:p-8 lg:p-9">
            <div className="mb-6 inline-flex -rotate-2 items-center gap-2 border border-zinc-950 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] shadow-[3px_3px_0_#ffb21c]">
              <Sparkles size={14} className="text-[#e88900]" />
              User Control
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.88] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
              Quản lý <span className="text-[#df8500]">người dùng.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
              Theo dõi thành viên, phân quyền admin/user và kiểm soát trạng thái
              truy cập trong hệ thống CMS VinhWorks.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admin/users/create"
                className="inline-flex h-12 items-center justify-center gap-3 border border-zinc-950 bg-[#ffb21c] px-6 text-[11px] font-black uppercase tracking-[0.12em] text-zinc-950 shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5"
              >
                <Plus size={18} /> Thêm người dùng
              </Link>
              <button
                type="button"
                onClick={fetchUsers}
                className="inline-flex h-12 items-center justify-center gap-3 border border-zinc-950 bg-white px-6 text-[11px] font-black uppercase tracking-[0.12em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
              >
                <Activity size={18} /> Làm mới
              </button>
            </div>
          </div>

          <div className="border-t border-zinc-950 bg-zinc-950 p-5 text-white lg:border-l lg:border-t-0 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffb21c]">
                Member Snapshot
              </p>
              <span className="border border-[#ffb21c] px-3 py-1 text-[10px] font-black uppercase text-[#ffb21c]">
                CMS
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Tổng thành viên", stats.total.toString().padStart(2, "0")],
                ["Quản trị viên", stats.admins.toString().padStart(2, "0")],
                ["Đang hoạt động", stats.active.toString().padStart(2, "0")],
                ["Tạm khoá", stats.inactive.toString().padStart(2, "0")],
              ].map(([label, value]) => (
                <div key={label} className="border border-white/20 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-7 border border-zinc-950 bg-white p-3 shadow-[5px_5px_0_#e4ded0] sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_280px_auto]">
          <label className="flex min-h-14 items-center gap-3 border border-zinc-200 bg-[#fff8e9] px-4">
            <Search size={22} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm tên, email..."
              className="h-full w-full bg-transparent text-base font-bold text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
          <label className="flex min-h-14 items-center gap-3 border border-zinc-200 bg-[#fff8e9] px-4">
            <Filter size={20} className="text-[#df8500]" />
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as "all" | Role)}
              className="h-full w-full bg-transparent text-sm font-black uppercase tracking-[0.1em] outline-none"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`grid h-14 w-14 place-items-center border border-zinc-950 ${
                viewMode === "grid" ? "bg-zinc-950 text-[#ffb21c]" : "bg-white"
              }`}
            >
              <LayoutGrid size={21} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`grid h-14 w-14 place-items-center border border-zinc-950 ${
                viewMode === "list" ? "bg-zinc-950 text-[#ffb21c]" : "bg-white"
              }`}
            >
              <List size={21} />
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="border border-zinc-950 bg-white p-10 text-center font-black uppercase tracking-[0.2em] text-slate-500">
          Đang tải dữ liệu...
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredUsers.map((user, index) => (
            <motion.article
              key={user._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="group overflow-hidden border border-zinc-950 bg-white shadow-[7px_7px_0_#ffb21c] transition hover:-translate-y-1"
            >
              <div className="relative bg-[#fff8e9] p-6">
                <div className="absolute right-4 top-4 flex gap-2">
                  <IconButton label="Xem" onClick={() => setSelectedUser(user)}>
                    <Eye size={17} />
                  </IconButton>
                  <IconButton label="Sửa" href={`/admin/users/edit/${user._id}`}>
                    <Pencil size={17} />
                  </IconButton>
                  <IconButton label="Xoá" onClick={() => setDeleteId(user._id)}>
                    <Trash2 size={17} />
                  </IconButton>
                </div>
                <AvatarBadge name={user.name} avatar={user.avatar} />
              </div>
              <div className="p-6">
                <h2 className="line-clamp-1 text-2xl font-black tracking-[-0.04em] text-zinc-950">
                  {user.name}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-500">
                  <Mail size={15} /> {user.email}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <RoleBadge role={user.role} />
                  <StatusBadge status={user.status} />
                </div>
                <div className="mt-6 grid grid-cols-2 border border-zinc-200">
                  <div className="p-4 text-center">
                    <p className="text-2xl font-black">{user.posts || 0}</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Bài viết
                    </p>
                  </div>
                  <div className="border-l border-zinc-200 p-4 text-center">
                    <p className="text-2xl font-black">{user.projects || 0}</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Dự án
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="scrollbar-hide overflow-x-auto border border-zinc-950 bg-white shadow-[7px_7px_0_#ffb21c]">
          <table className="min-w-[980px] w-full">
            <thead className="bg-zinc-950 text-white">
              <tr className="text-left text-xs font-black uppercase tracking-[0.18em]">
                <th className="px-6 py-5">Người dùng</th>
                <th className="px-6 py-5">Vai trò</th>
                <th className="px-6 py-5">Trạng thái</th>
                <th className="px-6 py-5">Ngày tạo</th>
                <th className="px-6 py-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-zinc-200">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <AvatarBadge name={user.name} avatar={user.avatar} className="h-14 w-14 text-sm" />
                      <div>
                        <p className="font-black text-zinc-950">{user.name}</p>
                        <p className="text-sm font-semibold text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <IconButton label="Xem" onClick={() => setSelectedUser(user)}>
                        <Eye size={17} />
                      </IconButton>
                      <IconButton label="Sửa" href={`/admin/users/edit/${user._id}`}>
                        <Pencil size={17} />
                      </IconButton>
                      <IconButton label="Xoá" onClick={() => setDeleteId(user._id)}>
                        <Trash2 size={17} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredUsers.length === 0 ? (
        <div className="mt-6 border border-zinc-950 bg-white p-10 text-center">
          <Users className="mx-auto mb-4 text-[#df8500]" size={38} />
          <p className="text-xl font-black">Không có người dùng phù hợp</p>
          <p className="mt-2 font-semibold text-slate-500">Thử đổi từ khoá hoặc bộ lọc vai trò.</p>
        </div>
      ) : null}

      <AnimatePresence>
        {selectedUser ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-xl border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c]"
            >
              <div className="flex items-center justify-between border-b border-zinc-950 bg-zinc-950 p-5 text-white">
                <p className="font-black uppercase tracking-[0.18em] text-[#ffb21c]">Hồ sơ nhanh</p>
                <button type="button" onClick={() => setSelectedUser(null)}>
                  <X />
                </button>
              </div>
              <div className="p-7">
                <div className="flex flex-col items-center text-center">
                  <AvatarBadge name={selectedUser.name} avatar={selectedUser.avatar} className="h-28 w-28 text-3xl" />
                  <h3 className="mt-6 text-3xl font-black tracking-[-0.05em]">{selectedUser.name}</h3>
                  <p className="mt-2 font-semibold text-slate-500">{selectedUser.email}</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <RoleBadge role={selectedUser.role} />
                    <StatusBadge status={selectedUser.status} />
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="border border-zinc-200 bg-[#fff8e9] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Ngày tạo</p>
                    <p className="mt-2 font-black">{new Date(selectedUser.createdAt).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div className="border border-zinc-200 bg-[#fff8e9] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Đăng nhập cuối</p>
                    <p className="mt-2 font-black">
                      {selectedUser.lastLogin
                        ? new Date(selectedUser.lastLogin).toLocaleDateString("vi-VN")
                        : "Chưa có"}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/users/edit/${selectedUser._id}`}
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 border border-zinc-950 bg-[#ffb21c] px-5 py-4 text-sm font-black uppercase tracking-[0.14em] shadow-[4px_4px_0_#111]"
                >
                  Chỉnh sửa hồ sơ <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}

        {deleteId ? (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} className="max-w-md border border-zinc-950 bg-white p-7 shadow-[8px_8px_0_#ef4444]">
              <h3 className="text-2xl font-black">Xoá người dùng?</h3>
              <p className="mt-3 font-semibold leading-relaxed text-slate-600">
                Hành động này sẽ xoá tài khoản khỏi CMS. Bạn chắc chắn muốn tiếp tục chứ?
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setDeleteId(null)} className="border border-zinc-950 bg-white px-5 py-3 font-black uppercase">
                  Huỷ
                </button>
                <button type="button" onClick={handleDelete} disabled={isDeleting} className="border border-zinc-950 bg-red-500 px-5 py-3 font-black uppercase text-white disabled:opacity-60">
                  {isDeleting ? "Đang xoá..." : "Xoá"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
