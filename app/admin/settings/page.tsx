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
  Palette,
  Shield,
  Globe,
  Database,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Info,
  Sparkles,
  Activity,
  Zap,
  Clock,
  Download,
  Upload,
  Trash2,
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
  const [settings, setSettings] = useState<SettingsData>({
    darkMode: false,
    notificationsEnabled: true,
    themeColor: "purple",
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

  const updateSetting = (key: keyof SettingsData, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
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
      themeColor: "purple",
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

  const tabs = [
    { id: "general", label: "Chung", icon: Settings },
    { id: "appearance", label: "Giao diện", icon: Paintbrush },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "security", label: "Bảo mật", icon: Shield },
    { id: "system", label: "Hệ thống", icon: Monitor },
  ];

  const themeColors = [
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "indigo", label: "Indigo", color: "bg-indigo-500" },
    { value: "teal", label: "Teal", color: "bg-teal-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "pink", label: "Pink", color: "bg-pink-500" },
  ];

  const ToggleSwitch = ({
    checked,
    onChange,
    label,
    description,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
  }) => (
    <div className="flex items-center justify-between p-4 border rounded-2xl bg-white/5 border-purple-500/20">
      <div className="flex-1">
        <h3 className="font-medium text-white">{label}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          checked
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-600"
        }`}
      >
        <motion.div
          className="absolute w-4 h-4 bg-white rounded-full shadow-lg top-1"
          animate={{ x: checked ? 28 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );

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
            <Settings size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Cài đặt hệ thống
            </h1>
            <p className="mt-1 text-gray-400">Quản lý cấu hình và tùy chọn</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isDirty && (
            <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-yellow-500/20 border-yellow-500/30">
              <AlertTriangle size={14} className="text-yellow-400" />
              <span className="text-sm text-yellow-300">
                Có thay đổi chưa lưu
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 px-4 py-2 border rounded-full bg-green-500/20 border-green-500/30">
            <Activity size={16} className="text-green-400" />
            <span className="text-sm font-medium text-green-300">
              System Online
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-2 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
      >
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <IconComponent size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Settings Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === "general" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
              >
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
                  <Globe className="w-6 h-6 text-purple-400" />
                  Cài đặt chung
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Ngôn ngữ
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSetting("language", e.target.value)
                      }
                      className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Múi giờ
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) =>
                        updateSetting("timezone", e.target.value)
                      }
                      className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                    >
                      <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option>
                      <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                      <option value="America/New_York">New York (UTC-5)</option>
                      <option value="Europe/London">London (UTC+0)</option>
                    </select>
                  </div>

                  <ToggleSwitch
                    checked={settings.autoSave}
                    onChange={(checked) => updateSetting("autoSave", checked)}
                    label="Tự động lưu"
                    description="Tự động lưu thay đổi sau mỗi 30 giây"
                  />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
              >
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
                  <Palette className="w-6 h-6 text-purple-400" />
                  Giao diện
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-2xl bg-white/5 border-purple-500/20">
                    <div className="flex items-center gap-3">
                      {settings.darkMode ? (
                        <Moon className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-yellow-400" />
                      )}
                      <div>
                        <h3 className="font-medium text-white">
                          Chế độ {settings.darkMode ? "Tối" : "Sáng"}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Thay đổi giao diện sáng/tối
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("darkMode", !settings.darkMode)
                      }
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        settings.darkMode
                          ? "bg-gradient-to-r from-purple-500 to-blue-500"
                          : "bg-gray-600"
                      }`}
                    >
                      <motion.div
                        className="absolute w-4 h-4 bg-white rounded-full shadow-lg top-1"
                        animate={{ x: settings.darkMode ? 28 : 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block mb-4 text-sm font-medium text-gray-300">
                      Màu chủ đề
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {themeColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() =>
                            updateSetting("themeColor", color.value)
                          }
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            settings.themeColor === color.value
                              ? "border-white shadow-lg scale-105"
                              : "border-purple-500/20 hover:border-purple-400/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full ${color.color}`}
                            />
                            <span className="font-medium text-white">
                              {color.label}
                            </span>
                          </div>
                          {settings.themeColor === color.value && (
                            <Check className="w-5 h-5 mt-2 text-green-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
              >
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
                  <Bell className="w-6 h-6 text-purple-400" />
                  Thông báo
                </h2>

                <div className="space-y-4">
                  <ToggleSwitch
                    checked={settings.notificationsEnabled}
                    onChange={(checked) =>
                      updateSetting("notificationsEnabled", checked)
                    }
                    label="Thông báo chung"
                    description="Bật/tắt tất cả thông báo hệ thống"
                  />

                  <ToggleSwitch
                    checked={settings.emailNotifications}
                    onChange={(checked) =>
                      updateSetting("emailNotifications", checked)
                    }
                    label="Thông báo email"
                    description="Nhận thông báo qua email"
                  />

                  <ToggleSwitch
                    checked={settings.pushNotifications}
                    onChange={(checked) =>
                      updateSetting("pushNotifications", checked)
                    }
                    label="Thông báo đẩy"
                    description="Nhận thông báo đẩy trên trình duyệt"
                  />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
              >
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
                  <Shield className="w-6 h-6 text-purple-400" />
                  Bảo mật
                </h2>

                <div className="space-y-4">
                  <div className="p-4 border rounded-2xl bg-yellow-500/10 border-yellow-500/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-300">
                          Chế độ bảo trì
                        </h3>
                        <p className="mt-1 text-sm text-yellow-200/80">
                          Kích hoạt chế độ bảo trì sẽ tạm khóa website
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          updateSetting(
                            "maintenanceMode",
                            !settings.maintenanceMode
                          )
                        }
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ml-auto ${
                          settings.maintenanceMode
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "bg-gray-600"
                        }`}
                      >
                        <motion.div
                          className="absolute w-4 h-4 bg-white rounded-full shadow-lg top-1"
                          animate={{ x: settings.maintenanceMode ? 28 : 4 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  <ToggleSwitch
                    checked={settings.debugMode}
                    onChange={(checked) => updateSetting("debugMode", checked)}
                    label="Chế độ debug"
                    description="Hiển thị thông tin debug chi tiết"
                  />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30"
              >
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
                  <Database className="w-6 h-6 text-purple-400" />
                  Hệ thống
                </h2>

                <div className="space-y-4">
                  <ToggleSwitch
                    checked={settings.backupEnabled}
                    onChange={(checked) =>
                      updateSetting("backupEnabled", checked)
                    }
                    label="Sao lưu tự động"
                    description="Tự động sao lưu dữ liệu hàng ngày"
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <button className="flex items-center gap-3 p-4 transition-all border rounded-2xl bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                      <Download className="w-5 h-5 text-blue-400" />
                      <div className="text-left">
                        <h3 className="font-medium text-white">Xuất dữ liệu</h3>
                        <p className="text-sm text-gray-400">
                          Tải xuống bản sao lưu
                        </p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-4 transition-all border rounded-2xl bg-green-500/10 border-green-500/30 hover:bg-green-500/20">
                      <Upload className="w-5 h-5 text-green-400" />
                      <div className="text-left">
                        <h3 className="font-medium text-white">Nhập dữ liệu</h3>
                        <p className="text-sm text-gray-400">
                          Khôi phục từ backup
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="p-4 border rounded-2xl bg-red-500/10 border-red-500/30">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-red-400" />
                      <div>
                        <h3 className="font-medium text-red-300">
                          Xóa dữ liệu
                        </h3>
                        <p className="text-sm text-red-200/80">
                          Xóa toàn bộ dữ liệu hệ thống (không thể hoàn tác)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col justify-end gap-4 sm:flex-row"
      >
        <button
          onClick={() => setShowResetModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 text-gray-300 transition-all duration-300 border border-gray-500/30 rounded-2xl hover:bg-gray-500/10"
        >
          <RefreshCcw size={18} />
          <span>Đặt lại mặc định</span>
        </button>

        <motion.button
          onClick={handleSave}
          disabled={loading || !isDirty}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
              <span>Đang lưu...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Lưu thay đổi</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
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
                  Đặt lại cài đặt
                </h2>
                <p className="mb-8 text-gray-300">
                  Bạn có chắc chắn muốn đặt lại tất cả cài đặt về mặc định? Hành
                  động này không thể hoàn tác.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 px-4 py-3 text-gray-300 transition-all border border-gray-500/30 rounded-xl hover:bg-gray-500/10"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-3 text-white transition-all bg-red-500 rounded-xl hover:bg-red-600"
                  >
                    Đặt lại
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
