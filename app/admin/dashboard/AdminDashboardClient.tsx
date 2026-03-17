"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingCart,
  Search,
  Zap,
  Target,
  Server,
  Cpu,
  HardDrive,
  Smartphone,
  Bell,
  PieChart as PieChartIcon,
  DollarSign,
  Briefcase,
  FileText,
  MessageSquare,
  Download,
  CreditCard,
  Calendar,
  Filter,
  MoreHorizontal,
  RefreshCw,
  TrendingUp,
  Globe,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// ============================================================================
// 1. THEME CONFIGURATION & TYPES
// ============================================================================

const THEME = {
  colors: {
    primary: "#f97316", // Orange 500
    primaryLight: "#ffedd5", // Orange 100
    secondary: "#8b5cf6", // Violet 500
    secondaryLight: "#ede9fe", // Violet 100
    success: "#10b981", // Emerald 500
    successLight: "#d1fae5", // Emerald 100
    danger: "#ef4444", // Red 500
    dangerLight: "#fee2e2", // Red 100
    dark: "#1e293b", // Slate 800
    text: "#334155", // Slate 700
    muted: "#94a3b8", // Slate 400
    border: "#e2e8f0", // Slate 200
    bg: "#fff7ed", // Page background
  },
  gradients: {
    primary: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)",
    secondary: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    glass:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)",
  },
  shadows: {
    card: "0 10px 40px -10px rgba(249, 115, 22, 0.1)",
    float: "0 20px 50px -12px rgba(0, 0, 0, 0.1)",
    glow: "0 0 20px rgba(249, 115, 22, 0.3)",
  },
};

interface Transaction {
  id: string;
  user: {
    name: string;
    email: string;
    img: string;
  };
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
  method: string;
}

interface DashboardStats {
  projects: number;
  posts: number;
  messages: number;
  users: number;
}

// ============================================================================
// 2. ADVANCED MOCK DATA GENERATORS
// ============================================================================

const generateChartData = (points: number, multiplier: number) => {
  let data = [];
  let prev1 = 5000;
  let prev2 = 4000;

  for (let i = 0; i < points; i++) {
    const change1 = (Math.random() - 0.45) * multiplier;
    const change2 = (Math.random() - 0.45) * (multiplier * 0.8);

    let val1 = Math.max(1000, prev1 + change1);
    let val2 = Math.max(1000, prev2 + change2);

    data.push({
      name: i + 1,
      revenue: Math.round(val1),
      profit: Math.round(val2),
      orders: Math.round(val1 / 100),
    });

    prev1 = val1;
    prev2 = val2;
  }
  return data;
};

const generateTransactions = (count: number): Transaction[] => {
  const names = [
    "Alice Nguyen",
    "Bob Tran",
    "Charlie Le",
    "David Pham",
    "Eve Vu",
    "Frank Do",
    "Grace Hoang",
  ];
  const methods = [
    "Visa Card",
    "Mastercard",
    "PayPal Wallet",
    "Momo E-Wallet",
    "Bank Transfer",
  ];

  return Array.from({ length: count }).map((_, i) => ({
    id: `TRX-${Math.floor(Math.random() * 10000) + 10000}`,
    user: {
      name: names[i % names.length],
      email: `client.${i + 1}@business.com`,
      img: `https://api.dicebear.com/7.x/avataaars/svg?seed=client_${i}`,
    },
    amount: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
    status:
      Math.random() > 0.8
        ? "Failed"
        : Math.random() > 0.6
          ? "Pending"
          : "Completed",
    date: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    method: methods[i % methods.length],
  }));
};

const deviceData = [
  { name: "Mobile", value: 58, color: "#f97316" },
  { name: "Desktop", value: 32, color: "#8b5cf6" },
  { name: "Tablet", value: 10, color: "#94a3b8" },
];

// ============================================================================
// 3. UI COMPONENTS
// ============================================================================

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 border shadow-xl bg-white/90 backdrop-blur-md rounded-2xl border-white/20 ring-1 ring-slate-900/5">
        <p className="mb-2 text-xs font-bold tracking-wider uppercase text-slate-400">
          Ngày {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
            <div
              className="w-2 h-2 rounded-full ring-2 ring-white"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-slate-600 min-w-[80px]">
              {entry.name === "revenue" ? "Doanh thu" : "Lợi nhuận"}:
            </span>
            <span
              className="text-sm font-extrabold"
              style={{ color: entry.color }}
            >
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const GlassCard = ({
  children,
  className = "",
  title,
  subtitle,
  action,
  glow = false,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`relative bg-white rounded-[32px] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.08)] transition-all duration-500 overflow-hidden ${className}`}
  >
    {glow && (
      <div className="absolute w-64 h-64 rounded-full pointer-events-none -top-24 -right-24 bg-orange-500/10 blur-3xl" />
    )}

    {(title || action) && (
      <div className="relative z-10 flex flex-col justify-between p-8 pb-2 sm:flex-row sm:items-center">
        <div className="mb-4 sm:mb-0">
          {title && (
            <h3 className="text-xl font-extrabold tracking-tight text-slate-800">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm font-medium text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="relative z-10 p-8">{children}</div>
  </motion.div>
);

const KpiCard = ({ title, value, trend, icon: Icon, color, index }: any) => {
  const isPositive = trend > 0;
  const delay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      whileHover={{ y: -5, boxShadow: THEME.shadows.card }}
      className="bg-white rounded-[28px] p-6 border border-slate-50 relative overflow-hidden group"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 rounded-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150`}
      />

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${color}-50 text-${color}-500 group-hover:bg-${color}-500 group-hover:text-white transition-all duration-300 shadow-sm`}
        >
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {Math.abs(trend)}%
        </div>
      </div>

      <div className="relative z-10">
        <h4 className="mb-1 text-3xl font-black tracking-tight transition-all text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600">
          {value}
        </h4>
        <p className="text-sm font-semibold tracking-wide uppercase text-slate-400">
          {title}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================================================
// 4. MAIN PAGE COMPONENT (CLIENT)
// ============================================================================

export default function AdminDashboardClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState<"week" | "month">("week");
  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    posts: 0,
    messages: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setStats({ projects: 12, posts: 45, messages: 8, users: 1240 });
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const points = chartPeriod === "week" ? 7 : 30;
    setChartData(
      generateChartData(points, chartPeriod === "week" ? 2000 : 500),
    );
  }, [chartPeriod]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-orange-50/50 backdrop-blur-sm">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-orange-200 rounded-full shadow-2xl border-t-orange-500"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="mt-6 text-sm font-extrabold tracking-[0.2em] text-orange-600 uppercase"
        >
          Loading Dashboard...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#fff7ed] via-[#fff1f2] to-[#fefce8]">
      {/* HEADER SECTION */}
      <header className="flex flex-col justify-between gap-6 mb-12 lg:flex-row lg:items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-5"
        >
          <div className="flex items-center justify-center text-orange-500 bg-white shadow-lg w-14 h-14 rounded-2xl shadow-orange-500/20 ring-4 ring-orange-50">
            <Activity size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-800">
              Dashboard <span className="text-orange-500">Pro</span>
            </h1>
            <p className="flex items-center gap-2 font-medium text-slate-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Hệ thống hoạt động bình thường
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <Search className="ml-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm nhanh..."
              className="w-64 px-3 py-2 text-sm font-medium bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400"
            />
            <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-200">
              ⌘K
            </span>
          </div>
          <button className="relative flex items-center justify-center w-12 h-12 transition-all bg-white border shadow-sm rounded-2xl border-slate-200 text-slate-500 hover:text-orange-500 hover:border-orange-200">
            <Bell size={22} />
            <span className="absolute top-3 right-3.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          <button className="flex items-center h-12 gap-2 px-6 text-sm font-bold text-white transition-colors shadow-lg bg-slate-900 rounded-2xl hover:bg-orange-600">
            <Download size={18} /> Export
          </button>
        </motion.div>
      </header>

      {/* STATS GRID (KPIs) */}
      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          index={0}
          title="Tổng Doanh Thu"
          value="$128,430"
          trend={12.5}
          icon={DollarSign}
          color="orange" // Tail classes will be `bg-orange-50`, `text-orange-500` etc.
        />
        <KpiCard
          index={1}
          title="Người Dùng"
          value={stats.users.toLocaleString()}
          trend={-2.4}
          icon={Users}
          color="blue"
        />
        <KpiCard
          index={2}
          title="Dự Án"
          value={stats.projects}
          trend={8.2}
          icon={Briefcase}
          color="violet"
        />
        <KpiCard
          index={3}
          title="Tin Nhắn"
          value={stats.messages}
          trend={15.3}
          icon={MessageSquare}
          color="emerald"
        />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 gap-8 mb-10 xl:grid-cols-3">
        {/* 1. REVENUE CHART (Interactive) */}
        <GlassCard
          className="xl:col-span-2 min-h-[500px]"
          title="Phân Tích Doanh Thu"
          subtitle="Dữ liệu biến động theo thời gian thực"
          glow={true}
          action={
            <div className="flex p-1 bg-slate-100 rounded-xl">
              {["week", "month"].map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p as any)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                    chartPeriod === p
                      ? "bg-white text-orange-600 shadow-md"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {p === "week" ? "Tuần này" : "Tháng này"}
                </button>
              ))}
            </div>
          }
        >
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <RechartsTooltip
                  content={<ChartTooltip />}
                  cursor={{
                    stroke: "#cbd5e1",
                    strokeWidth: 1,
                    strokeDasharray: "5 5",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="ml-1 text-sm font-bold text-slate-600">
                      {value}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Doanh thu"
                  stroke="#f97316"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Lợi nhuận"
                  stroke="#8b5cf6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* 2. SIDEBAR WIDGETS */}
        <div className="flex flex-col gap-8">
          {/* Server Health */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20"
          >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <Server className="text-orange-500" size={20} /> Hệ Thống
                </h3>
                <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
                  Running
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    name: "CPU Load",
                    val: 42,
                    color: "bg-blue-500",
                    icon: Cpu,
                  },
                  {
                    name: "Memory",
                    val: 68,
                    color: "bg-purple-500",
                    icon: Zap,
                  },
                  {
                    name: "Storage",
                    val: 24,
                    color: "bg-orange-500",
                    icon: HardDrive,
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-2">
                        <item.icon size={14} /> {item.name}
                      </span>
                      <span className="font-mono text-white">{item.val}%</span>
                    </div>
                    <div className="w-full h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.val}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${item.color} shadow-[0_0_10px_currentColor]`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Device Stats */}
          <GlassCard title="Truy Cập Thiết Bị" className="flex-1 min-h-[300px]">
            <div className="h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <Smartphone size={32} className="mb-1 text-slate-300" />
                <span className="text-2xl font-black text-slate-800">58%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Mobile First
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {deviceData.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs font-bold text-slate-500">
                    {d.name}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* BOTTOM SECTION: TRANSACTIONS & MARKETING */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Transactions Table */}
        <GlassCard
          className="xl:col-span-2"
          title="Giao Dịch Mới Nhất"
          subtitle="Lịch sử thanh toán từ khách hàng"
          action={
            <div className="relative">
              <Search
                size={16}
                className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Tìm mã GD..."
                className="w-64 py-2 pr-4 text-sm font-medium border-none outline-none pl-9 bg-slate-50 rounded-xl focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-xs font-bold tracking-wider uppercase border-b text-slate-400 border-slate-100">
                  <th className="pb-4 pl-4 text-left">Mã GD</th>
                  <th className="pb-4 text-left">Khách hàng</th>
                  <th className="pb-4 text-left">Ngày tạo</th>
                  <th className="pb-4 text-left">Số tiền</th>
                  <th className="pb-4 pr-4 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {generateTransactions(5).map((trx, i) => (
                  <motion.tr
                    key={trx.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="transition-colors border-b group hover:bg-orange-50/30 border-slate-50 last:border-0"
                  >
                    <td className="py-4 pl-4 font-mono font-medium transition-colors text-slate-500 group-hover:text-orange-600">
                      {trx.id}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={trx.user.img}
                          alt=""
                          className="object-cover w-10 h-10 rounded-full shadow-sm bg-slate-100"
                        />
                        <div>
                          <p className="font-bold text-slate-700">
                            {trx.user.name}
                          </p>
                          <p className="text-xs text-slate-400">{trx.method}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-medium text-slate-500">
                      {new Date(trx.date).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-4 font-extrabold text-slate-800">
                      ${trx.amount}
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          trx.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : trx.status === "Pending"
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : "bg-red-50 text-red-600 border-red-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            trx.status === "Completed"
                              ? "bg-emerald-500"
                              : trx.status === "Pending"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                        {trx.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Marketing / Promo Card */}
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-orange-500/20 h-full min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 -mt-16 -mr-16 rounded-full pointer-events-none bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 -mb-16 -ml-16 rounded-full pointer-events-none bg-black/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center w-12 h-12 mb-6 shadow-inner bg-white/20 backdrop-blur-md rounded-2xl">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="mb-2 text-3xl font-black leading-tight">
              Black Friday <br />
              Super Sale
            </h3>
            <p className="text-sm font-medium leading-relaxed text-orange-100 opacity-90">
              Chương trình khuyến mãi lớn nhất năm đang diễn ra. Theo dõi chỉ số
              để tối ưu hóa chiến dịch.
            </p>
          </div>

          <div className="relative z-10 p-6 mt-8 border bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="mb-1 text-xs font-bold text-orange-100 uppercase">
                  Doanh thu chiến dịch
                </p>
                <p className="text-3xl font-black">$42,590</p>
              </div>
              <div className="text-right">
                <p className="mb-1 text-xs font-bold text-orange-100 uppercase">
                  Mục tiêu
                </p>
                <p className="text-lg font-bold opacity-80">$60,000</p>
              </div>
            </div>
            <div className="w-full h-2 overflow-hidden rounded-full bg-black/20">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "71%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-2 mt-6 text-center border-t border-slate-200/60">
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
          © 2025 VinhWorks Enterprise System
        </p>
      </footer>
    </div>
  );
}
