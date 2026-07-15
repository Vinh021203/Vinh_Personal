"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  CloudLightning,
  Database,
  Download,
  Globe2,
  Laptop,
  Mail,
  Monitor,
  Moon,
  Paintbrush,
  RefreshCcw,
  RefreshCw,
  Save,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Trash2,
  Upload,
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

type TabId = "general" | "appearance" | "notifications" | "security" | "system";

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

const tabs = [
  { id: "general", label: "Chung", icon: Globe2, description: "Ngôn ngữ, múi giờ & hệ thống" },
  { id: "appearance", label: "Giao diện", icon: Paintbrush, description: "Màu sắc, theme & hiển thị" },
  { id: "notifications", label: "Thông báo", icon: Bell, description: "Email, push & cảnh báo" },
  { id: "security", label: "Bảo mật", icon: Shield, description: "Bảo trì & debug mode" },
  { id: "system", label: "Dữ liệu", icon: Database, description: "Sao lưu & khôi phục" },
] satisfies Array<{ id: TabId; label: string; icon: any; description: string }>;

const themeColors = [
  { value: "orange", label: "VinhWorks", className: "bg-[#ffb21c]" },
  { value: "black", label: "Mono", className: "bg-zinc-950" },
  { value: "blue", label: "Blue", className: "bg-blue-500" },
  { value: "green", label: "Green", className: "bg-emerald-500" },
  { value: "rose", label: "Rose", className: "bg-rose-500" },
  { value: "slate", label: "Slate", className: "bg-slate-500" },
];

export default function SettingsClient() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [showResetModal, setShowResetModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("adminSettings");
    if (!saved) return;

    try {
      setSettings({ ...defaultSettings, ...JSON.parse(saved) });
    } catch {
      localStorage.removeItem("adminSettings");
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("adminSettings", JSON.stringify(settings));
  }, [settings, mounted]);

  const updateSetting = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    toast.success("Đã lưu cài đặt thành công");
    setIsDirty(false);
    setLoading(false);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setIsDirty(true);
    setShowResetModal(false);
    toast.success("Đã đặt lại cài đặt mặc định");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#09090b",
            color: "#fff",
            border: "1px solid #ffb21c",
            borderRadius: 0,
            fontWeight: 800,
          },
        }}
      />

      <section className="mb-8 mt-5 border border-zinc-950 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c] sm:mt-6">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="mb-6 inline-flex rotate-[-2deg] items-center gap-2 border border-zinc-950 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-950 shadow-[3px_3px_0_#ffb21c]">
              <Sparkles size={14} className="text-[#df8200]" />
              CMS Preferences
            </div>
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center border border-zinc-950 bg-[#ffb21c] shadow-[4px_4px_0_#111]">
                <Settings size={28} />
              </div>
              <div>
                <h1 className="max-w-3xl text-4xl font-black leading-[0.88] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
                  Cài đặt <span className="text-[#df8200]">hệ thống.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
                  Quản lý cấu hình CMS, giao diện quản trị, thông báo và trạng thái vận hành của VinhWorks.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-950 bg-zinc-950 p-5 text-white lg:border-l lg:border-t-0 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffb21c]">System Snapshot</p>
              <span className="border border-[#ffb21c] px-3 py-1 text-[10px] font-black uppercase text-[#ffb21c]">Stable</span>
            </div>
            <div className="grid gap-3">
              <Snapshot label="Ngôn ngữ" value={settings.language === "vi" ? "Tiếng Việt" : settings.language.toUpperCase()} />
              <Snapshot label="Tự động lưu" value={settings.autoSave ? "Đang bật" : "Đang tắt"} />
              <Snapshot label="Sao lưu" value={settings.backupEnabled ? "Hoạt động" : "Tạm dừng"} />
            </div>
          </div>
        </div>
      </section>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {isDirty && (
            <div className="inline-flex items-center gap-2 border border-zinc-950 bg-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-950 shadow-[3px_3px_0_#ffb21c]">
              <AlertTriangle size={15} className="text-[#df8200]" />
              Chưa lưu thay đổi
            </div>
          )}
        </div>
        <div className="grid grid-cols-[52px_1fr] gap-3 sm:flex">
          <button
            onClick={() => setShowResetModal(true)}
            className="grid h-12 w-full place-items-center border border-zinc-950 bg-white shadow-[3px_3px_0_#d7d1c2] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#d7d1c2] sm:w-12"
            title="Đặt lại mặc định"
          >
            <RefreshCcw size={19} />
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !isDirty}
            className="inline-flex h-12 items-center justify-center gap-3 border border-zinc-950 bg-[#ffb21c] px-6 text-[11px] font-black uppercase tracking-[0.12em] text-zinc-950 shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            {loading ? "Đang lưu" : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[330px_1fr] 2xl:gap-7">
        <aside className="border border-zinc-950 bg-white p-3 shadow-[6px_6px_0_#e4ded0] sm:p-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex min-h-[82px] items-center gap-4 border px-4 text-left transition ${
                    isActive
                      ? "border-zinc-950 bg-zinc-950 text-white shadow-[4px_4px_0_#ffb21c]"
                      : "border-zinc-200 bg-[#fff8e9] hover:border-zinc-950 hover:bg-white"
                  }`}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center border ${isActive ? "border-[#ffb21c] bg-[#ffb21c] text-zinc-950" : "border-zinc-950 bg-white text-[#df8200]"}`}>
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black">{tab.label}</span>
                    <span className={`mt-1 block text-[11px] font-bold leading-5 ${isActive ? "text-zinc-300" : "text-slate-500"}`}>{tab.description}</span>
                  </span>
                  <ChevronRight size={18} className={isActive ? "text-[#ffb21c]" : "text-slate-400"} />
                </button>
              );
            })}
          </div>
        </aside>

        <main className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c]"
            >
              {activeTab === "general" && (
                <Panel icon={Globe2} title="Cài đặt vùng & ngôn ngữ" kicker="General">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Ngôn ngữ hiển thị">
                      <select value={settings.language} onChange={(e) => updateSetting("language", e.target.value)} className="admin-select">
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </Field>
                    <Field label="Múi giờ hệ thống">
                      <select value={settings.timezone} onChange={(e) => updateSetting("timezone", e.target.value)} className="admin-select">
                        <option value="Asia/Ho_Chi_Minh">Hà Nội (UTC+07:00)</option>
                        <option value="Asia/Tokyo">Tokyo (UTC+09:00)</option>
                        <option value="Europe/London">London (UTC+00:00)</option>
                        <option value="America/New_York">New York (UTC-05:00)</option>
                      </select>
                    </Field>
                  </div>
                  <Divider />
                  <ToggleCard checked={settings.autoSave} onChange={(checked) => updateSetting("autoSave", checked)} icon={CloudLightning} label="Tự động lưu thay đổi" description="Tự lưu bản nháp sau mỗi 30 giây khi bạn chỉnh sửa nội dung." />
                </Panel>
              )}

              {activeTab === "appearance" && (
                <Panel icon={Paintbrush} title="Giao diện CMS" kicker="Appearance">
                  <div className="grid gap-4 md:grid-cols-2">
                    <ModeCard active={!settings.darkMode} icon={Sun} title="Light Mode" text="Giao diện sáng, rõ ràng và dễ thao tác." onClick={() => updateSetting("darkMode", false)} />
                    <ModeCard active={settings.darkMode} icon={Moon} title="Dark Mode" text="Tối ưu cho phiên làm việc buổi tối." onClick={() => updateSetting("darkMode", true)} />
                  </div>
                  <Divider />
                  <div>
                    <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Màu chủ đề</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                      {themeColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => updateSetting("themeColor", color.value)}
                          className={`border p-4 text-left transition ${settings.themeColor === color.value ? "border-zinc-950 bg-[#fff8e9] shadow-[4px_4px_0_#ffb21c]" : "border-zinc-200 hover:border-zinc-950"}`}
                        >
                          <span className={`mb-3 grid h-9 w-9 place-items-center border border-zinc-950 ${color.className}`}>
                            {settings.themeColor === color.value && <Check size={17} className="text-white mix-blend-difference" />}
                          </span>
                          <span className="text-xs font-black uppercase">{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Panel>
              )}

              {activeTab === "notifications" && (
                <Panel icon={Bell} title="Email & thông báo hệ thống" kicker="Notifications">
                  <div className="grid gap-4">
                    <ToggleCard checked={settings.notificationsEnabled} onChange={(checked) => updateSetting("notificationsEnabled", checked)} icon={Bell} label="Thông báo hệ thống" description="Nhận cảnh báo quan trọng về bảo trì, trạng thái và cập nhật." />
                    <ToggleCard checked={settings.emailNotifications} onChange={(checked) => updateSetting("emailNotifications", checked)} icon={Mail} label="Thông báo qua email" description="Gửi email khi có liên hệ mới hoặc thay đổi quan trọng." />
                    <ToggleCard checked={settings.pushNotifications} onChange={(checked) => updateSetting("pushNotifications", checked)} icon={Laptop} label="Push browser" description="Hiển thị thông báo nhanh ngay trong trình duyệt." />
                  </div>
                </Panel>
              )}

              {activeTab === "security" && (
                <Panel icon={Shield} title="Bảo mật & vận hành" kicker="Security">
                  <div className="grid gap-4">
                    <div className="border border-zinc-950 bg-[#fff8e9] p-5">
                      <div className="mb-4 flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center border border-zinc-950 bg-[#ffb21c]"><AlertTriangle size={19} /></span>
                        <div>
                          <h3 className="text-lg font-black">Chế độ bảo trì</h3>
                          <p className="mt-1 text-sm leading-7 text-slate-600">Khi bật, website hiển thị trạng thái bảo trì cho người dùng thường. Admin vẫn truy cập được.</p>
                        </div>
                      </div>
                      <Toggle checked={settings.maintenanceMode} onChange={(checked) => updateSetting("maintenanceMode", checked)} />
                    </div>
                    <ToggleCard checked={settings.debugMode} onChange={(checked) => updateSetting("debugMode", checked)} icon={Monitor} label="Debug mode" description="Hiển thị log chi tiết để kiểm tra lỗi trong quá trình phát triển." />
                  </div>
                </Panel>
              )}

              {activeTab === "system" && (
                <Panel icon={Database} title="Dữ liệu hệ thống" kicker="System Data">
                  <ToggleCard checked={settings.backupEnabled} onChange={(checked) => updateSetting("backupEnabled", checked)} icon={Save} label="Sao lưu tự động" description="Tự sao lưu dữ liệu định kỳ để hạn chế rủi ro khi vận hành." />
                  <Divider />
                  <div className="grid gap-4 md:grid-cols-2">
                    <ActionCard icon={Download} title="Export Data" text="Tải xuống bản dữ liệu JSON." />
                    <ActionCard icon={Upload} title="Import Data" text="Khôi phục dữ liệu từ file." />
                  </div>
                  <div className="mt-5 flex flex-col gap-4 border border-zinc-950 bg-zinc-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center border border-[#ffb21c] text-[#ffb21c]"><Trash2 size={19} /></span>
                      <div>
                        <h3 className="font-black">Xóa toàn bộ dữ liệu</h3>
                        <p className="mt-1 text-sm text-zinc-400">Hành động này không thể hoàn tác.</p>
                      </div>
                    </div>
                    <button className="border border-[#ffb21c] px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#ffb21c] hover:bg-[#ffb21c] hover:text-zinc-950">Xóa ngay</button>
                  </div>
                </Panel>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {showResetModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/50 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 8 }} className="w-full max-w-md border border-zinc-950 bg-white p-6 shadow-[8px_8px_0_#ffb21c]">
              <div className="mb-5 grid h-14 w-14 place-items-center border border-zinc-950 bg-[#fff8e9]">
                <RefreshCcw size={24} />
              </div>
              <h3 className="text-3xl font-black leading-none">Đặt lại cài đặt?</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">Tất cả tùy chọn sẽ trở về trạng thái mặc định ban đầu.</p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button onClick={() => setShowResetModal(false)} className="border border-zinc-950 bg-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] hover:bg-zinc-100">Hủy bỏ</button>
                <button onClick={handleReset} className="border border-zinc-950 bg-zinc-950 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[3px_3px_0_#ffb21c]">Xác nhận</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border border-white/15 bg-white/5 px-4 py-3">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

function Panel({ icon: Icon, title, kicker, children }: { icon: any; title: string; kicker: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-zinc-950 bg-zinc-950 px-5 py-5 text-white sm:px-7">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffb21c]">{kicker}</p>
        <h2 className="flex items-center gap-3 text-2xl font-black leading-tight sm:text-3xl">
          <Icon size={27} className="text-[#ffb21c]" />
          {title}
        </h2>
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function Divider() {
  return <div className="my-7 h-px bg-zinc-200" />;
}

function ToggleCard({ checked, onChange, label, description, icon: Icon }: { checked: boolean; onChange: (checked: boolean) => void; label: string; description: string; icon: any }) {
  return (
    <div className="flex flex-col gap-4 border border-zinc-200 bg-white p-5 transition hover:border-zinc-950 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center border border-zinc-950 ${checked ? "bg-[#ffb21c]" : "bg-[#fff8e9]"}`}>
          <Icon size={20} />
        </span>
        <div>
          <h3 className="text-lg font-black text-zinc-950">{label}</h3>
          <p className="mt-1 text-sm leading-7 text-slate-600">{description}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-16 shrink-0 border border-zinc-950 transition ${checked ? "bg-[#ffb21c]" : "bg-white"}`}
      aria-pressed={checked}
    >
      <motion.span
        className="absolute top-1 grid h-6 w-6 place-items-center border border-zinc-950 bg-zinc-950"
        animate={{ x: checked ? 34 : 4 }}
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      >
        {checked && <Check size={13} className="text-[#ffb21c]" />}
      </motion.span>
    </button>
  );
}

function ModeCard({ active, icon: Icon, title, text, onClick }: { active: boolean; icon: any; title: string; text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 border p-5 text-left transition ${active ? "border-zinc-950 bg-[#fff8e9] shadow-[4px_4px_0_#ffb21c]" : "border-zinc-200 bg-white hover:border-zinc-950"}`}>
      <span className={`grid h-12 w-12 shrink-0 place-items-center border border-zinc-950 ${active ? "bg-[#ffb21c]" : "bg-white"}`}>
        <Icon size={21} />
      </span>
      <span>
        <span className="block text-lg font-black">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-slate-600">{text}</span>
      </span>
    </button>
  );
}

function ActionCard({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <button className="group flex items-center gap-4 border border-zinc-950 bg-[#fff8e9] p-5 text-left shadow-[4px_4px_0_#d7d1c2] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[6px_6px_0_#ffb21c]">
      <span className="grid h-12 w-12 shrink-0 place-items-center border border-zinc-950 bg-white text-[#df8200]">
        <Icon size={21} />
      </span>
      <span>
        <span className="block text-lg font-black">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-slate-600">{text}</span>
      </span>
    </button>
  );
}
