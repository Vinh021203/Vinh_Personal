"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  List,
  Pencil,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  User as UserIcon,
  Trash2,
  Shield,
  Crown,
  CheckCircle,
  XCircle,
  Activity,
  FileText,
  FolderKanban,
  X,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const PAGE_SIZE = 8;

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  avatar?: string;
  status?: "active" | "inactive";
  lastLogin?: string;
  posts?: number;
  projects?: number;
}

export default function UserListClient() {
  // --- LOGIC ---
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRole === "all" || user.role === filterRole)
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const currentData = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const formattedData = data.map((user: any) => ({
          ...user,
          posts: user.posts || 0,
          projects: user.projects || 0,
          lastLogin:
            user.lastLogin || user.updatedAt || new Date().toISOString(),
        }));

        setUsers(formattedData);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải danh sách người dùng!");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/users/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("Xoá người dùng thành công!");
      setUsers(users.filter((user) => user._id !== deleteId));
    } catch (err) {
      toast.error("Xoá người dùng thất bại!");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // --- HELPER STYLES ---
  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wider">
          <CheckCircle size={12} /> Active
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wider">
        <XCircle size={12} /> Inactive
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase tracking-wider">
          <Crown size={12} /> Admin
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
        <Shield size={12} /> User
      </span>
    );
  };

  if (loading) {
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

      {/* 1. HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-6 mb-8 md:flex-row md:items-center"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white border border-orange-100 shadow-sm rounded-2xl">
            <UserIcon size={28} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Quản lý Người dùng
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Tổng cộng{" "}
              <span className="font-bold text-orange-600">{users.length}</span>{" "}
              thành viên
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/users/create">
            <button className="relative flex items-center gap-2 px-6 py-3 overflow-hidden text-sm font-bold text-white transition-all shadow-lg group bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-orange-500/20 hover:shadow-orange-500/30">
              <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-white/20 group-hover:translate-y-0" />
              <Plus size={20} strokeWidth={2.5} />
              <span>Thêm người dùng</span>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* 2. TOOLBAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-3 p-2 mb-8 bg-white border shadow-sm border-orange-100 rounded-[20px] md:flex-row z-30"
      >
        {/* Search */}
        <div className="relative flex-1 group">
          <Search
            className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-orange-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm tên, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all border border-transparent outline-none bg-slate-50 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-1 overflow-x-auto bg-slate-50 rounded-2xl no-scrollbar">
          <div className="relative px-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="py-2 pl-8 pr-8 text-sm font-bold transition-colors bg-transparent appearance-none cursor-pointer text-slate-600 focus:outline-none hover:text-orange-600"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <Filter
              className="absolute -translate-y-1/2 pointer-events-none left-2 top-1/2 text-slate-400"
              size={16}
            />
          </div>

          <div className="w-[1px] h-6 bg-slate-200 mx-1" />

          <div className="flex gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "list"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3. CONTENT AREA */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {currentData.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-[2rem] border border-orange-100/60 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col items-center p-6 text-center"
              >
                {/* Top Actions */}
                <div className="absolute flex gap-2 transition-opacity opacity-0 top-4 right-4 group-hover:opacity-100">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="p-2 transition-colors rounded-full bg-slate-100 hover:bg-orange-50 text-slate-500 hover:text-orange-600"
                  >
                    <Eye size={14} />
                  </button>
                  <Link href={`/admin/users/edit/${user._id}`}>
                    <button className="p-2 transition-colors rounded-full bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600">
                      <Pencil size={14} />
                    </button>
                  </Link>
                  <button
                    onClick={() => confirmDelete(user._id)}
                    className="p-2 transition-colors rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 p-1 transition-colors border-2 border-orange-200 border-dashed rounded-full group-hover:border-orange-400">
                    <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-50">
                      <Image
                        src={user.avatar || "/placeholder-user.jpg"}
                        alt={user.name}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg";
                        }}
                      />
                    </div>
                  </div>
                  {user.role === "admin" && (
                    <div
                      className="absolute bottom-0 right-0 bg-amber-400 text-white p-1.5 rounded-full border-2 border-white shadow-sm"
                      title="Admin"
                    >
                      <Crown size={12} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="mb-1 text-lg font-bold transition-colors text-slate-800 group-hover:text-orange-600">
                  {user.name}
                </h3>
                <p className="mb-4 text-xs font-medium text-slate-400">
                  {user.email}
                </p>

                <div className="flex gap-2 mb-6">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status || "active")}
                </div>

                {/* Stats */}
                <div className="grid w-full grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Bài viết
                    </p>
                    <p className="text-lg font-bold text-slate-700">
                      {user.posts}
                    </p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Dự án
                    </p>
                    <p className="text-lg font-bold text-slate-700">
                      {user.projects}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[24px] border border-orange-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-slate-50/50 border-slate-100">
                  <tr className="text-xs font-bold tracking-wider text-left uppercase text-slate-400">
                    <th className="px-6 py-4 pl-8">Người dùng</th>
                    <th className="px-6 py-4">Vai trò</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4">Hoạt động</th>
                    <th className="px-6 py-4 pr-8 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentData.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="transition-colors group hover:bg-orange-50/30"
                    >
                      <td className="px-6 py-4 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="relative w-10 h-10 overflow-hidden border rounded-full border-slate-200 bg-slate-50">
                            <Image
                              src={user.avatar || "/placeholder-user.jpg"}
                              alt=""
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">
                              {user.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4">
                        {getStatusBadge(user.status || "active")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-500">
                          <p className="flex items-center gap-1">
                            <Calendar size={12} /> Created:{" "}
                            {new Date(user.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                          <p className="flex items-center gap-1 mt-0.5">
                            <Activity size={12} className="text-orange-400" />{" "}
                            Last login:{" "}
                            {new Date(user.lastLogin!).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 pr-8 text-right">
                        <div className="flex justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-2 transition-colors border border-transparent rounded-lg shadow-sm hover:bg-white hover:text-orange-600 hover:border-orange-100"
                          >
                            <Eye size={16} />
                          </button>
                          <Link href={`/admin/users/edit/${user._id}`}>
                            <button className="p-2 transition-colors border border-transparent rounded-lg shadow-sm hover:bg-white hover:text-blue-600 hover:border-blue-100">
                              <Pencil size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => confirmDelete(user._id)}
                            className="p-2 transition-colors border border-transparent rounded-lg shadow-sm hover:bg-white hover:text-red-600 hover:border-red-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PAGINATION */}
      {!loading && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white text-slate-500 border border-orange-100 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* 5. MODALS */}

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md p-8 bg-white rounded-[2rem] shadow-2xl border border-slate-100 text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-slate-800">
                Xóa người dùng?
              </h3>
              <p className="mb-8 text-sm text-slate-500">
                Hành động này không thể hoàn tác. Dữ liệu người dùng sẽ bị xóa
                vĩnh viễn.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 font-bold text-white bg-red-500 shadow-lg rounded-xl hover:bg-red-600 shadow-red-500/30"
                >
                  {isDeleting ? "Đang xóa..." : "Xóa ngay"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover */}
              <div className="relative h-32 bg-gradient-to-r from-orange-400 to-amber-300">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="absolute p-2 text-white transition-colors rounded-full top-4 right-4 bg-black/20 hover:bg-black/30 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative px-8 pb-8">
                {/* Avatar */}
                <div className="relative inline-block mb-4 -mt-16">
                  <div className="w-32 h-32 overflow-hidden bg-white border-4 border-white rounded-full shadow-md">
                    <Image
                      src={selectedUser.avatar || "/placeholder.jpg"}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  {selectedUser.role === "admin" && (
                    <div className="absolute bottom-2 right-2 bg-amber-400 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                      <Crown size={16} fill="currentColor" />
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-extrabold text-slate-800">
                  {selectedUser.name}
                </h2>
                <p className="mb-6 font-medium text-slate-500">
                  {selectedUser.email}
                </p>

                <div className="flex gap-3 mb-8">
                  {getRoleBadge(selectedUser.role)}
                  {getStatusBadge(selectedUser.status || "active")}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border bg-slate-50 rounded-2xl border-slate-100">
                    <div className="p-2 text-orange-600 bg-orange-100 rounded-lg">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-800">
                        {selectedUser.posts}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Bài viết
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border bg-slate-50 rounded-2xl border-slate-100">
                    <div className="p-2 text-blue-600 bg-blue-100 rounded-lg">
                      <FolderKanban size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-800">
                        {selectedUser.projects}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Dự án
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-8 border-t border-slate-100">
                  <div className="flex items-center flex-1 gap-1 text-xs text-slate-400">
                    <Activity size={14} /> Last login:{" "}
                    {new Date(selectedUser.lastLogin!).toLocaleDateString(
                      "vi-VN"
                    )}
                  </div>
                  <Link href={`/admin/users/edit/${selectedUser._id}`}>
                    <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white transition-colors bg-slate-900 rounded-xl hover:bg-orange-500">
                      <Pencil size={16} /> Chỉnh sửa
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
