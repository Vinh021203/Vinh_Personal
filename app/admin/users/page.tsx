"use client";

import Link from "next/link";
import {
  Pencil,
  Eye,
  X,
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit3,
  Trash2,
  Star,
  Activity,
  LayoutGrid,
  List,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  Crown,
  Shield,
  User as UserIcon,
  Mail,
  UserCheck,
  UserX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

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
  messages?: string;
}

const PAGE_SIZE = 8;

export default function UserListPage() {
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
        const res = await fetch("/api/users");
        const data = await res.json();
        // Mock additional data for demo
        const enhancedData = data.map((user: any, index: number) => ({
          ...user,
          status: index % 3 === 0 ? "inactive" : "active",
          lastLogin: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          posts: Math.floor(Math.random() * 20),
          projects: Math.floor(Math.random() * 10),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=8b5cf6&color=fff&size=128`,
        }));
        setUsers(enhancedData);
      } catch {
        toast.error("Không thể tải danh sách người dùng!");
        // Mock data for demo
        setUsers([
          {
            _id: "1",
            name: "Nguyễn Văn Admin",
            email: "admin@vinhworks.com",
            role: "admin",
            createdAt: new Date().toISOString(),
            status: "active",
            lastLogin: new Date().toISOString(),
            posts: 15,
            projects: 8,
            avatar:
              "https://ui-avatars.com/api/?name=Admin&background=8b5cf6&color=fff&size=128",
          },
          {
            _id: "2",
            name: "Trần Thị User",
            email: "user@example.com",
            role: "user",
            createdAt: new Date().toISOString(),
            status: "active",
            lastLogin: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            posts: 5,
            projects: 2,
            avatar:
              "https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=128",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRoleColor = (role: string) => {
    return role === "admin"
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-blue-500/20 text-blue-400 border-blue-500/30";
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/users/${deleteId}`, {
        method: "DELETE",
      });
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

  if (loading) {
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
            Đang tải người dùng...
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
            <Users size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Quản lý Người dùng
            </h1>
            <p className="mt-1 text-gray-400">
              Tổng cộng {users.length} người dùng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/admin/users/create"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl"
            >
              <Plus size={20} />
              <span>Thêm người dùng</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
      >
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute text-purple-400 transform -translate-y-1/2 left-4 top-1/2"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-purple-400" size={20} />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
              >
                <option value="all">Tất cả</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 border bg-slate-700/50 rounded-xl border-purple-500/30">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Display */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {currentData.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative overflow-hidden transition-all duration-300 border shadow-2xl group rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40"
              >
                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 z-10 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                    user.status || "active"
                  )}`}
                >
                  {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  {/* Avatar */}
                  <div className="relative mx-auto mb-4">
                    <div className="w-20 h-20 mx-auto overflow-hidden transition-colors border-4 rounded-full border-purple-500/30 group-hover:border-purple-400/50">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-purple-500 to-blue-500">
                          <UserIcon size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    {user.role === "admin" && (
                      <div className="absolute flex items-center justify-center w-6 h-6 bg-yellow-500 border-2 rounded-full -bottom-1 -right-1 border-slate-800">
                        <Crown size={12} className="text-black" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <h3 className="mb-2 text-lg font-bold text-white transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text">
                    {user.name}
                  </h3>

                  <p className="mb-4 text-sm text-gray-400 break-all">
                    {user.email}
                  </p>

                  {/* Role Badge */}
                  <div className="mb-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role === "admin" ? "Administrator" : "User"}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="p-2 rounded-xl bg-white/5">
                      <div className="font-medium text-purple-400">
                        {user.posts || 0}
                      </div>
                      <div className="text-gray-400">Bài viết</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <div className="font-medium text-blue-400">
                        {user.projects || 0}
                      </div>
                      <div className="text-gray-400">Dự án</div>
                    </div>
                  </div>

                  {/* Last Login */}
                  <div className="mb-4 text-xs text-gray-400">
                    Đăng nhập:{" "}
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString("vi-VN")
                      : "Chưa rõ"}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/users/edit/${user._id}`}>
                      <button className="p-2 text-blue-400 transition-all rounded-lg hover:text-blue-300 hover:bg-blue-500/10">
                        <Edit3 size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 text-green-400 transition-all rounded-lg hover:text-green-300 hover:bg-green-500/10"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => confirmDelete(user._id)}
                      className="p-2 text-red-400 transition-all rounded-lg hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
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
            className="overflow-hidden border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-purple-500/20">
                  <tr>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Người dùng
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Email
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Vai trò
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-purple-400">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4 font-medium text-center text-purple-400">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="transition-colors border-b border-purple-500/10 hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0 w-10 h-10 overflow-hidden border-2 rounded-full border-purple-500/30">
                            {user.avatar ? (
                              <Image
                                src={user.avatar}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-purple-500 to-blue-500">
                                <UserIcon size={20} className="text-white" />
                              </div>
                            )}
                            {user.role === "admin" && (
                              <div className="absolute flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full -bottom-1 -right-1">
                                <Crown size={8} className="text-black" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {user.name}
                            </h3>
                            <div className="text-xs text-gray-400">
                              {user.posts || 0} bài viết • {user.projects || 0}{" "}
                              dự án
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300 break-all">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            user.status || "active"
                          )}`}
                        >
                          {user.status === "active"
                            ? "Hoạt động"
                            : "Không hoạt động"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/admin/users/edit/${user._id}`}>
                            <button className="p-2 text-blue-400 transition-all rounded-lg hover:text-blue-300 hover:bg-blue-500/10">
                              <Edit3 size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-2 text-green-400 transition-all rounded-lg hover:text-green-300 hover:bg-green-500/10"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => confirmDelete(user._id)}
                            className="p-2 text-red-400 transition-all rounded-lg hover:text-red-300 hover:bg-red-500/10"
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

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-3 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "border border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-3 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      )}

      {/* Enhanced Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md p-8 border rounded-3xl border-red-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95"
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  Xác nhận xóa
                </h2>
                <p className="mb-8 text-gray-300">
                  Bạn có chắc chắn muốn xóa người dùng này? Hành động này không
                  thể hoàn tác.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-3 text-gray-300 transition-all border border-gray-500/30 rounded-xl hover:bg-gray-500/10 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-white transition-all bg-red-500 rounded-xl hover:bg-red-600 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                        Đang xóa...
                      </>
                    ) : (
                      "Xóa ngay"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
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
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                  <UserIcon className="w-6 h-6 text-purple-400" />
                  Thông tin người dùng
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 text-gray-400 transition-all hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 overflow-hidden border-4 rounded-full border-purple-500/30">
                      {selectedUser.avatar ? (
                        <Image
                          src={selectedUser.avatar}
                          alt={selectedUser.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-purple-500 to-blue-500">
                          <UserIcon size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    {selectedUser.role === "admin" && (
                      <div className="absolute flex items-center justify-center w-6 h-6 bg-yellow-500 border-2 rounded-full -bottom-1 -right-1 border-slate-800">
                        <Crown size={12} className="text-black" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                      {selectedUser.name}
                    </h3>
                    <p className="mb-4 text-gray-300 break-all">
                      {selectedUser.email}
                    </p>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${getRoleColor(
                          selectedUser.role
                        )}`}
                      >
                        {selectedUser.role === "admin"
                          ? "Administrator"
                          : "User"}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                          selectedUser.status || "active"
                        )}`}
                      >
                        {selectedUser.status === "active"
                          ? "Hoạt động"
                          : "Không hoạt động"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-400">
                      Bài viết
                    </h4>
                    <div className="text-2xl font-bold text-white">
                      {selectedUser.posts || 0}
                    </div>
                  </div>

                  <div className="p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-400">
                      Dự án
                    </h4>
                    <div className="text-2xl font-bold text-white">
                      {selectedUser.projects || 0}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-400">
                      Ngày tạo tài khoản
                    </h4>
                    <div className="text-white">
                      {new Date(selectedUser.createdAt).toLocaleDateString(
                        "vi-VN",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>

                  {selectedUser.lastLogin && (
                    <div className="p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                      <h4 className="mb-2 text-sm font-medium text-purple-400">
                        Đăng nhập lần cuối
                      </h4>
                      <div className="text-white">
                        {new Date(selectedUser.lastLogin).toLocaleDateString(
                          "vi-VN",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
