"use client";

import { useEffect, useState } from "react";
import { CardStats } from "@/components/admin/CardStats";
import {
  Activity,
  MessageCircle,
  Bell,
  UserCheck,
  LayoutGrid,
  CalendarDays,
  ClipboardList,
  TrendingUp,
  Users,
  FileText,
  FolderKanban,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Globe,
  Monitor,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Calendar,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    {
      label: "Tổng dự án",
      value: 0,
      icon: <FolderKanban size={24} className="text-purple-400" />,
      color: "from-purple-500 to-blue-500",
      change: "+12%",
      trend: "up",
    },
    {
      label: "Người dùng",
      value: 0,
      icon: <Users size={24} className="text-blue-400" />,
      color: "from-blue-500 to-indigo-500",
      change: "+8%",
      trend: "up",
    },
    {
      label: "Tin nhắn mới",
      value: 0,
      icon: <MessageCircle size={24} className="text-green-400" />,
      color: "from-green-500 to-emerald-500",
      change: "+25%",
      trend: "up",
    },
    {
      label: "Bài viết",
      value: 0,
      icon: <FileText size={24} className="text-pink-400" />,
      color: "from-pink-500 to-purple-500",
      change: "+5%",
      trend: "up",
    },
  ]);

  const [recentProjects, setRecentProjects] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 95,
  });

  useEffect(() => {
    // Fetch dashboard data
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => [
          { ...prev[0], value: data.projects || 42 },
          { ...prev[1], value: data.users || 156 },
          { ...prev[2], value: data.messages || 23 },
          { ...prev[3], value: data.posts || 89 },
        ]);
      })
      .catch(() => {
        // Mock data for demo
        setStats((prev) => [
          { ...prev[0], value: 42 },
          { ...prev[1], value: 156 },
          { ...prev[2], value: 23 },
          { ...prev[3], value: 89 },
        ]);
      });

    // Fetch recent projects
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const doneProjects = data.filter((p: any) => p.status === "Hoàn thành");
        setRecentProjects(doneProjects.slice(0, 3));
      })
      .catch(() => {
        // Mock data
        setRecentProjects([
          {
            name: "Website VinhWorks",
            status: "Hoàn thành",
            client: "VinhWorks",
          },
          {
            name: "E-commerce Platform",
            status: "Hoàn thành",
            client: "ABC Corp",
          },
          {
            name: "Portfolio Website",
            status: "Hoàn thành",
            client: "John Doe",
          },
        ] as any);
      });

    // Fetch recent users
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setRecentUsers(data.slice(0, 5)))
      .catch(() => {
        // Mock data
        setRecentUsers([
          {
            name: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            role: "User",
            createdAt: new Date().toISOString(),
          },
          {
            name: "Trần Thị B",
            email: "tranthib@email.com",
            role: "User",
            createdAt: new Date().toISOString(),
          },
          {
            name: "Lê Văn C",
            email: "levanc@email.com",
            role: "Editor",
            createdAt: new Date().toISOString(),
          },
        ] as any);
      });
  }, []);

  const quickActions = [
    {
      label: "Tạo bài viết mới",
      icon: FileText,
      href: "/admin/posts/create",
      color: "from-purple-500 to-blue-500",
    },
    {
      label: "Thêm dự án",
      icon: FolderKanban,
      href: "/admin/projects/create",
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "Quản lý người dùng",
      icon: Users,
      href: "/admin/users",
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Xem tin nhắn",
      icon: MessageCircle,
      href: "/admin/messages",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const recentActivities = [
    {
      user: "Admin",
      action: "cập nhật cài đặt hệ thống",
      time: "5 phút trước",
      type: "system",
    },
    {
      user: "Nguyễn Văn A",
      action: "đăng ký tài khoản mới",
      time: "15 phút trước",
      type: "user",
    },
    {
      user: "Admin",
      action: "xuất bản bài viết mới",
      time: "1 giờ trước",
      type: "content",
    },
    {
      user: "Trần Thị B",
      action: "gửi tin nhắn liên hệ",
      time: "2 giờ trước",
      type: "message",
    },
  ];

  const tasks = [
    {
      task: "Kiểm tra lại form phản hồi liên hệ",
      priority: "high",
      completed: false,
    },
    {
      task: "Gửi thông báo bảo trì hệ thống cho người dùng",
      priority: "medium",
      completed: false,
    },
    {
      task: "Hoàn tất thiết kế trang gói dịch vụ",
      priority: "low",
      completed: true,
    },
    { task: "Backup dữ liệu hàng tuần", priority: "high", completed: true },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-3 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl"
          >
            <LayoutGrid size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Dashboard
            </h1>
            <p className="mt-1 text-gray-400">Chào mừng trở lại, Admin! 👋</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full bg-green-500/20 border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-300">
              System Online
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative overflow-hidden transition-all duration-300 border shadow-2xl rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5`}
            />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg`}
                >
                  {item.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    item.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.trend === "up" ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  {item.change}
                </div>
              </div>
              <div>
                <p className="mb-1 text-3xl font-bold text-white">
                  {item.value}
                </p>
                <p className="text-sm text-gray-400">{item.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
      >
        <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
          <Zap className="w-6 h-6 text-yellow-400" />
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.a
                key={index}
                href={action.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`group relative overflow-hidden p-4 rounded-2xl bg-gradient-to-r ${action.color} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent size={20} className="text-white" />
                  <span className="text-sm font-medium text-white">
                    {action.label}
                  </span>
                </div>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/10 group-hover:opacity-100" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
        >
          <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
            <Activity className="w-6 h-6 text-purple-400" />
            Hoạt động gần đây
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 transition-colors rounded-2xl bg-white/5 hover:bg-white/10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "system"
                      ? "bg-purple-500/20 text-purple-400"
                      : activity.type === "user"
                      ? "bg-blue-500/20 text-blue-400"
                      : activity.type === "content"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {activity.type === "system" ? (
                    <Monitor size={16} />
                  ) : activity.type === "user" ? (
                    <Users size={16} />
                  ) : activity.type === "content" ? (
                    <FileText size={16} />
                  ) : (
                    <MessageCircle size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-white">
                      {activity.user}
                    </span>{" "}
                    {activity.action}
                  </p>
                  <p className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <Clock size={12} />
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tasks & System Health */}
        <div className="space-y-6">
          {/* Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
          >
            <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
              <Target className="w-6 h-6 text-indigo-400" />
              Nhiệm vụ hôm nay
            </h2>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    task.completed
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "border-2 border-gray-400"
                    }`}
                  >
                    {task.completed && <CheckCircle size={12} />}
                  </div>
                  <span
                    className={`text-sm flex-1 ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-300"
                    }`}
                  >
                    {task.task}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {task.priority === "high"
                      ? "Cao"
                      : task.priority === "medium"
                      ? "Trung bình"
                      : "Thấp"}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
          >
            <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
              <Monitor className="w-6 h-6 text-green-400" />
              Tình trạng hệ thống
            </h2>
            <div className="space-y-4">
              {Object.entries(systemHealth).map(([key, value], index) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 capitalize">
                      {key === "cpu"
                        ? "CPU"
                        : key === "memory"
                        ? "Bộ nhớ"
                        : key === "storage"
                        ? "Lưu trữ"
                        : "Mạng"}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        value > 80
                          ? "text-red-400"
                          : value > 60
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {value}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ delay: index * 0.1, duration: 1 }}
                      className={`h-2 rounded-full ${
                        value > 80
                          ? "bg-gradient-to-r from-red-500 to-red-400"
                          : value > 60
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                          : "bg-gradient-to-r from-green-500 to-green-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
      >
        <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
          <Users className="w-6 h-6 text-blue-400" />
          Người dùng gần đây
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="px-4 py-3 font-medium text-left text-purple-400">
                  Người dùng
                </th>
                <th className="px-4 py-3 font-medium text-left text-purple-400">
                  Email
                </th>
                <th className="px-4 py-3 font-medium text-left text-purple-400">
                  Vai trò
                </th>
                <th className="px-4 py-3 font-medium text-left text-purple-400">
                  Ngày đăng ký
                </th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user: any, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="transition-colors border-b border-purple-500/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <span className="font-medium text-white">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-red-500/20 text-red-400"
                          : user.role === "Editor"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
