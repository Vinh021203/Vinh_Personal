"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Bell,
  Paintbrush,
  Save,
  RefreshCcw,
  Moon,
  Sun,
  Monitor,
  Shield,
  Globe,
  Database,
  AlertTriangle,
  Trash2,
  Download,
  Upload,
  Check,
  Laptop,
  CloudLightning,
  RefreshCw,
  Mail,
  Lock,
} from "lucide-react";

interface SettingsData {
  darkMode: boolean;
  notificationsEnabled: boolean;
  themeColor: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  autoSave: boolean;
  backupEnabled: boolean;
  maintenanceMode: boolean;
  debugMode: boolean;
}

export default function SettingsPage() {
  // --- STATE (GIỮ NGUYÊN) ---
  const [settings, setSettings] = useState<SettingsData>({
    darkMode: false,
    notificationsEnabled: true,
    themeColor: "orange", // Default to orange to match theme
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    emailNotifications: true,
    pushNotifications: true,
    autoSave: true,
    backupEnabled: true,
    maintenanceMode: false,
    debugMode: false,
  });

  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showResetModal, setShowResetModal] = useState(false);

  // --- EFFECTS (GIỮ NGUYÊN) ---
  useEffect(() => {
    const saved = localStorage.getItem("adminSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      } catch (error) {
        console.error("Error parsing settings:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }, [settings]);

  // --- HANDLERS (GIỮ NGUYÊN) ---
  const updateSetting = (key: keyof SettingsData, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("✅ Đã lưu cài đặt thành công!");
      setIsDirty(false);
    } catch (error) {
      toast.error("❌ Lỗi khi lưu cài đặt!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const defaultSettings: SettingsData = {
      darkMode: false,
      notificationsEnabled: true,
      themeColor: "orange",
      language: "vi",
      timezone: "Asia/Ho_Chi_Minh",
      emailNotifications: true,
      pushNotifications: true,
      autoSave: true,
      backupEnabled: true,
      maintenanceMode: false,
      debugMode: false,
    };
    setSettings(defaultSettings);
    setIsDirty(true);
    setShowResetModal(false);
    toast.success("🔄 Đã đặt lại cài đặt mặc định!");
  };

  // --- CONFIG ---
  const tabs = [
    {
      id: "general",
      label: "Chung",
      icon: Globe,
      description: "Ngôn ngữ, múi giờ & hệ thống",
    },
    {
      id: "appearance",
      label: "Giao diện",
      icon: Paintbrush,
      description: "Chủ đề, màu sắc & hiển thị",
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: Bell,
      description: "Email, Push & Cảnh báo",
    },
    {
      id: "security",
      label: "Bảo mật",
      icon: Shield,
      description: "Bảo trì & Debug mode",
    },
    {
      id: "system",
      label: "Dữ liệu",
      icon: Database,
      description: "Sao lưu & Khôi phục",
    },
  ];

  const themeColors = [
    { value: "orange", label: "Cam (Mặc định)", color: "bg-orange-500" },
    { value: "purple", label: "Tím", color: "bg-purple-500" },
    { value: "blue", label: "Xanh dương", color: "bg-blue-500" },
    { value: "green", label: "Xanh lá", color: "bg-emerald-500" },
    { value: "pink", label: "Hồng", color: "bg-pink-500" },
    { value: "slate", label: "Xám", color: "bg-slate-600" },
  ];

  // --- COMPONENTS ---
  const ToggleSwitch = ({
    checked,
    onChange,
    label,
    description,
    icon: Icon,
  }: any) => (
    <div className="flex items-center justify-between p-4 transition-colors bg-white border shadow-sm border-slate-100 rounded-2xl hover:border-orange-200">
      <div className="flex gap-4">
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              checked
                ? "bg-orange-100 text-orange-600"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <Icon size={20} />
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-slate-800">{label}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-slate-500">{description}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          checked ? "bg-orange-500" : "bg-slate-200"
        }`}
      >
        <motion.div
          className="absolute w-4 h-4 bg-white rounded-full shadow-md top-1"
          animate={{ x: checked ? 28 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#334155",
            border: "1px solid #e2e8f0",
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
            <Settings size={28} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Cài đặt hệ thống
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Quản lý cấu hình và tùy chọn ứng dụng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isDirty && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-2 border bg-amber-50 border-amber-200 rounded-xl"
            >
              <AlertTriangle size={16} className="text-amber-500" />
              <span className="text-xs font-bold text-amber-700">
                Chưa lưu thay đổi
              </span>
            </motion.div>
          )}

          <button
            onClick={() => setShowResetModal(true)}
            className="p-3 transition-all bg-white border shadow-sm text-slate-400 hover:text-slate-600 border-slate-200 hover:border-slate-300 rounded-xl"
            title="Đặt lại mặc định"
          >
            <RefreshCcw size={20} />
          </button>

          <button
            onClick={handleSave}
            disabled={loading || !isDirty}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* 2. MAIN LAYOUT (Sidebar + Content) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* SIDEBAR TABS */}
        <div className="space-y-2 lg:col-span-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 group relative overflow-hidden ${
                  isActive
                    ? "bg-white text-orange-600 shadow-lg shadow-orange-500/5 ring-1 ring-orange-100"
                    : "text-slate-500 hover:bg-white hover:text-slate-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <span
                    className={`font-bold text-sm block ${
                      isActive ? "text-slate-800" : "text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {tab.description}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 bg-orange-500 rounded-r-full top-4 bottom-4"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* --- TAB: GENERAL --- */}
              {activeTab === "general" && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-8">
                  <div>
                    <h2 className="flex items-center gap-2 mb-6 text-xl font-extrabold text-slate-800">
                      <Globe className="text-blue-500" size={24} /> Cài đặt vùng
                      & Ngôn ngữ
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">
                          Ngôn ngữ hiển thị
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) =>
                            updateSetting("language", e.target.value)
                          }
                          className="w-full px-4 py-3 text-sm font-bold border cursor-pointer bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                        >
                          <option value="vi">Tiếng Việt (Vietnamese)</option>
                          <option value="en">English (US)</option>
                          <option value="ja">Japanese (日本語)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">
                          Múi giờ hệ thống
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) =>
                            updateSetting("timezone", e.target.value)
                          }
                          className="w-full px-4 py-3 text-sm font-bold border cursor-pointer bg-slate-50 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-400"
                        >
                          <option value="Asia/Ho_Chi_Minh">
                            Hanoi (UTC+07:00)
                          </option>
                          <option value="Asia/Tokyo">Tokyo (UTC+09:00)</option>
                          <option value="Europe/London">
                            London (UTC+00:00)
                          </option>
                          <option value="America/New_York">
                            New York (UTC-05:00)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div>
                    <h2 className="flex items-center gap-2 mb-6 text-xl font-extrabold text-slate-800">
                      <Laptop className="text-purple-500" size={24} /> Hành vi
                      hệ thống
                    </h2>
                    <ToggleSwitch
                      checked={settings.autoSave}
                      onChange={(c: boolean) => updateSetting("autoSave", c)}
                      label="Tự động lưu thay đổi"
                      description="Hệ thống sẽ tự động lưu bản nháp sau mỗi 30 giây khi bạn chỉnh sửa."
                      icon={CloudLightning}
                    />
                  </div>
                </div>
              )}

              {/* --- TAB: APPEARANCE --- */}
              {activeTab === "appearance" && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-8">
                  <div>
                    <h2 className="flex items-center gap-2 mb-6 text-xl font-extrabold text-slate-800">
                      <Monitor className="text-teal-500" size={24} /> Chế độ
                      hiển thị
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <button
                        onClick={() => updateSetting("darkMode", false)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                          !settings.darkMode
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-center w-12 h-12 text-orange-500 bg-white rounded-full shadow-sm">
                          <Sun size={24} />
                        </div>
                        <div>
                          <span
                            className={`font-bold block ${
                              !settings.darkMode
                                ? "text-orange-700"
                                : "text-slate-600"
                            }`}
                          >
                            Light Mode
                          </span>
                          <span className="text-xs text-slate-400">
                            Giao diện sáng mặc định
                          </span>
                        </div>
                        {!settings.darkMode && (
                          <CheckCircle2
                            size={20}
                            className="ml-auto text-orange-500"
                          />
                        )}
                      </button>

                      <button
                        onClick={() => updateSetting("darkMode", true)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                          settings.darkMode
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-center w-12 h-12 text-indigo-400 rounded-full shadow-sm bg-slate-800">
                          <Moon size={24} />
                        </div>
                        <div>
                          <span
                            className={`font-bold block ${
                              settings.darkMode
                                ? "text-indigo-700"
                                : "text-slate-600"
                            }`}
                          >
                            Dark Mode
                          </span>
                          <span className="text-xs text-slate-400">
                            Giao diện tối bảo vệ mắt
                          </span>
                        </div>
                        {settings.darkMode && (
                          <CheckCircle2
                            size={20}
                            className="ml-auto text-indigo-500"
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div>
                    <h2 className="flex items-center gap-2 mb-6 text-xl font-extrabold text-slate-800">
                      <Paintbrush className="text-pink-500" size={24} /> Màu chủ
                      đề
                    </h2>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                      {themeColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() =>
                            updateSetting("themeColor", color.value)
                          }
                          className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 group ${
                            settings.themeColor === color.value
                              ? "border-slate-800 bg-slate-50 shadow-sm"
                              : "border-slate-100 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full shadow-sm ${color.color} flex items-center justify-center`}
                          >
                            {settings.themeColor === color.value && (
                              <Check
                                size={14}
                                className="text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                          <span className="text-xs font-bold text-slate-600">
                            {color.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB: NOTIFICATIONS --- */}
              {activeTab === "notifications" && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
                  <h2 className="flex items-center gap-2 mb-2 text-xl font-extrabold text-slate-800">
                    <Bell className="text-amber-500" size={24} /> Quản lý thông
                    báo
                  </h2>

                  <ToggleSwitch
                    checked={settings.notificationsEnabled}
                    onChange={(c: boolean) =>
                      updateSetting("notificationsEnabled", c)
                    }
                    label="Thông báo hệ thống"
                    description="Nhận thông báo quan trọng về cập nhật và bảo trì."
                    icon={Bell}
                  />
                  <ToggleSwitch
                    checked={settings.emailNotifications}
                    onChange={(c: boolean) =>
                      updateSetting("emailNotifications", c)
                    }
                    label="Email Marketing"
                    description="Nhận tin tức, khuyến mãi qua email đăng ký."
                    icon={Mail}
                  />
                  <ToggleSwitch
                    checked={settings.pushNotifications}
                    onChange={(c: boolean) =>
                      updateSetting("pushNotifications", c)
                    }
                    label="Push Browser"
                    description="Cho phép thông báo đẩy trên trình duyệt web."
                    icon={Laptop}
                  />
                </div>
              )}

              {/* --- TAB: SECURITY --- */}
              {activeTab === "security" && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
                  <h2 className="flex items-center gap-2 mb-2 text-xl font-extrabold text-slate-800">
                    <Shield className="text-red-500" size={24} /> Bảo mật &
                    Debug
                  </h2>

                  <div className="flex items-start gap-4 p-4 border bg-amber-50 border-amber-100 rounded-2xl">
                    <AlertTriangle className="mt-1 text-amber-500" />
                    <div className="flex-1">
                      <h3 className="font-bold text-amber-800">
                        Chế độ bảo trì (Maintenance)
                      </h3>
                      <p className="mt-1 text-xs text-amber-600">
                        Khi kích hoạt, website sẽ hiển thị trang bảo trì với
                        người dùng thường. Chỉ Admin mới có thể truy cập.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting(
                          "maintenanceMode",
                          !settings.maintenanceMode
                        )
                      }
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        settings.maintenanceMode
                          ? "bg-amber-500"
                          : "bg-slate-300"
                      }`}
                    >
                      <motion.div
                        className="absolute w-4 h-4 bg-white rounded-full top-1"
                        animate={{ x: settings.maintenanceMode ? 28 : 4 }}
                      />
                    </button>
                  </div>

                  <ToggleSwitch
                    checked={settings.debugMode}
                    onChange={(c: boolean) => updateSetting("debugMode", c)}
                    label="Chế độ Debug (Developer)"
                    description="Hiển thị log lỗi chi tiết ở console và giao diện."
                    icon={Monitor}
                  />
                </div>
              )}

              {/* --- TAB: SYSTEM --- */}
              {activeTab === "system" && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-8">
                  <div>
                    <h2 className="flex items-center gap-2 mb-6 text-xl font-extrabold text-slate-800">
                      <Database className="text-indigo-500" size={24} /> Dữ liệu
                      hệ thống
                    </h2>
                    <ToggleSwitch
                      checked={settings.backupEnabled}
                      onChange={(c: boolean) =>
                        updateSetting("backupEnabled", c)
                      }
                      label="Sao lưu tự động"
                      description="Sao lưu database định kỳ vào 00:00 mỗi ngày."
                      icon={Save}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <button className="flex items-center gap-4 p-4 transition-all border rounded-2xl border-slate-200 hover:border-blue-300 hover:bg-blue-50 group">
                      <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-xl">
                        <Download size={20} />
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-slate-700 group-hover:text-blue-700">
                          Export Data
                        </span>
                        <span className="text-xs text-slate-400">
                          Tải xuống file .JSON
                        </span>
                      </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 transition-all border rounded-2xl border-slate-200 hover:border-green-300 hover:bg-green-50 group">
                      <div className="flex items-center justify-center w-10 h-10 text-green-600 bg-green-100 rounded-xl">
                        <Upload size={20} />
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-slate-700 group-hover:text-green-700">
                          Import Data
                        </span>
                        <span className="text-xs text-slate-400">
                          Khôi phục từ file
                        </span>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 text-red-500 bg-white shadow-sm rounded-xl">
                        <Trash2 size={20} />
                      </div>
                      <div>
                        <span className="block font-bold text-red-700">
                          Xóa toàn bộ dữ liệu
                        </span>
                        <span className="text-xs text-red-500">
                          Hành động này không thể hoàn tác!
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-xs font-bold text-white transition-all bg-red-500 rounded-lg shadow-lg hover:bg-red-600 shadow-red-500/20">
                      Xóa ngay
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
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
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-slate-100">
                <RefreshCcw className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-slate-800">
                Đặt lại cài đặt?
              </h3>
              <p className="mb-8 text-sm text-slate-500">
                Tất cả tùy chọn sẽ trở về mặc định ban đầu.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 px-4 py-3 font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-3 font-bold text-white shadow-lg bg-slate-800 rounded-xl hover:bg-black"
                >
                  Xác nhận
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// CheckCircle2 Helper if lucide version mismatch
function CheckCircle2({ size, className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      ircle cx="12" cy="12" r="10"/
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
