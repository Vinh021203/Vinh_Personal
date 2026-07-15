"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell, Camera, CheckCircle2, ChevronRight, Eye, EyeOff, Laptop,
  LockKeyhole, Mail, Save, ShieldCheck, Sparkles, Upload, UserRound,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/contexts/UserContext";
import LoadingSpinner from "@/components/LoadingSpinner";

interface UserType { _id?: string; id?: string; name: string; email: string; role: string; avatar?: string; status?: "active" | "inactive"; }
const tabs = [
  { id: "account", label: "Tài khoản", short: "Hồ sơ", icon: UserRound, desc: "Tên hiển thị và ảnh đại diện" },
  { id: "security", label: "Bảo mật", short: "Bảo mật", icon: ShieldCheck, desc: "Mật khẩu và quyền truy cập" },
  { id: "notifications", label: "Thông báo", short: "Thông báo", icon: Bell, desc: "Email và thông báo hệ thống" },
  { id: "appearance", label: "Giao diện", short: "Giao diện", icon: Laptop, desc: "Ngôn ngữ và hiển thị" },
] as const;
type TabId = typeof tabs[number]["id"];

export default function SettingsClient() {
  const { user, loading, refreshUser } = useUser();
  const currentUser = user as unknown as UserType | null;
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<TabId>("account");
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) router.replace("/login");
    if (currentUser) { setName(currentUser.name || ""); if (!avatarFile) setAvatarPreview(currentUser.avatar || ""); }
  }, [avatarFile, currentUser, loading, router]);

  const selectAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Vui lòng chọn một tệp hình ảnh."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Ảnh đại diện không được vượt quá 5MB."); return; }
    if (avatarPreview.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const saveAccount = async () => {
    if (!currentUser || !name.trim()) return;
    const id = currentUser._id || currentUser.id;
    if (!id) { toast.error("Không tìm thấy mã tài khoản."); return; }
    setSaving(true);
    try {
      const body = new FormData();
      body.append("name", name.trim()); body.append("email", currentUser.email); body.append("role", currentUser.role); body.append("status", currentUser.status || "active");
      if (avatarFile) body.append("avatar", avatarFile);
      const response = await fetch(`/api/users/${id}`, { method: "PUT", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Cập nhật thất bại");
      setAvatarFile(null); if (fileRef.current) fileRef.current.value = "";
      await refreshUser(); toast.success("Đã cập nhật tài khoản.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Cập nhật thất bại."); }
    finally { setSaving(false); }
  };

  const savePassword = async () => {
    if (!currentUser) return;
    const id = currentUser._id || currentUser.id;
    if (!id) { toast.error("Không tìm thấy mã tài khoản."); return; }
    if (password.length < 6) { toast.error("Mật khẩu cần ít nhất 6 ký tự."); return; }
    if (password !== confirmPassword) { toast.error("Hai mật khẩu chưa trùng khớp."); return; }
    setSaving(true);
    try {
      const body = new FormData();
      body.append("name", currentUser.name); body.append("email", currentUser.email); body.append("role", currentUser.role); body.append("status", currentUser.status || "active"); body.append("password", password);
      const response = await fetch(`/api/users/${id}`, { method: "PUT", body });
      if (!response.ok) throw new Error();
      setPassword(""); setConfirmPassword(""); toast.success("Mật khẩu đã được cập nhật.");
    } catch { toast.error("Chưa thể đổi mật khẩu."); }
    finally { setSaving(false); }
  };

  if (loading || !currentUser) return <SettingsLoading />;
  const initials = currentUser.name.split(" ").filter(Boolean).slice(-2).map((part) => part[0]).join("").toUpperCase();
  const active = tabs.find((item) => item.id === tab)!;

  return <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#fff8e9] text-zinc-950">
    <Toaster position="top-center" toastOptions={{ style: { border: "1px solid #18181b", borderRadius: 0, boxShadow: "4px 4px 0 #ffb21c", fontWeight: 700 } }} />
    <section className="w-full max-w-full border-b border-zinc-900 bg-[#fff8e9] py-12 md:py-16">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-10 px-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:px-8"><div className="min-w-0"><span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.18em] shadow-[3px_3px_0_#ffb21c]"><Sparkles size={14} className="text-[#d98200]" /> Account preferences</span><h1 className="mt-6 text-5xl font-black leading-[.9] tracking-[-.06em] md:text-7xl">Cài đặt<br /><span className="text-[#d98200]">tài khoản.</span></h1><p className="mt-6 max-w-xl text-sm leading-7 text-zinc-600">Quản lý thông tin nhận diện, quyền truy cập và các tùy chọn bảo mật của tài khoản VinhWorks.</p></div><div className="min-w-0 border border-zinc-900 bg-white shadow-[7px_7px_0_#ffb21c]"><div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-5 py-4 text-white"><div className="min-w-0"><p className="text-[8px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Account snapshot</p><p className="mt-1 truncate text-sm font-black">Phiên tài khoản hiện tại</p></div><span className="grid h-10 w-10 shrink-0 place-items-center border border-white/25"><ShieldCheck size={18} className="text-[#ffb21c]" /></span></div><Snapshot icon={<Mail size={15} />} label="Email" value={currentUser.email} /><Snapshot icon={<UserRound size={15} />} label="Vai trò" value={currentUser.role === "admin" ? "Quản trị viên" : "Thành viên"} /><Snapshot icon={<CheckCircle2 size={15} />} label="Trạng thái" value="Đang hoạt động" last /></div></div>
    </section>

    <section className="w-full max-w-full bg-white py-12 md:py-20">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-8 px-5 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="w-full min-w-0 max-w-full overflow-hidden">
          <div className="project-settings-tabs flex w-full max-w-full gap-2 overflow-x-auto pb-3 lg:sticky lg:top-24 lg:block lg:space-y-2 lg:overflow-visible lg:border lg:border-zinc-900 lg:bg-[#fff8e9] lg:p-3 lg:shadow-[6px_6px_0_#ffb21c]">
            {tabs.map((item, index) => <button key={item.id} onClick={() => setTab(item.id)} className={`group flex min-w-[132px] shrink-0 items-center gap-3 border px-4 py-3 text-left lg:w-full lg:min-w-0 lg:p-4 ${tab === item.id ? "border-zinc-900 bg-zinc-950 text-white" : "border-zinc-300 bg-white hover:border-zinc-900"}`}><span className={`grid h-9 w-9 shrink-0 place-items-center border ${tab === item.id ? "border-[#ffb21c] text-[#ffb21c]" : "border-zinc-900 text-[#d98200]"}`}><item.icon size={16} /></span><span className="min-w-0"><strong className="block text-[10px] font-black uppercase tracking-wide lg:text-xs">{item.short}</strong><small className="mt-1 hidden text-[9px] leading-4 text-zinc-400 lg:block">{item.desc}</small></span><span className="ml-auto hidden text-[9px] font-black text-zinc-500 lg:block">0{index + 1}</span></button>)}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 flex items-center justify-between border-b border-zinc-300 pb-5"><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#d98200]">{active.label}</p><h2 className="mt-2 text-2xl font-black md:text-3xl">{active.desc}</h2></div><span className="hidden h-12 w-12 place-items-center border border-zinc-900 bg-[#ffb21c] sm:grid"><active.icon size={20} /></span></div>
          <AnimatePresence mode="wait"><motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
            {tab === "account" && <AccountPanel user={currentUser} initials={initials} name={name} setName={setName} avatar={avatarPreview} fileRef={fileRef} selectAvatar={selectAvatar} save={saveAccount} saving={saving} changed={name.trim() !== currentUser.name || Boolean(avatarFile)} />}
            {tab === "security" && <SecurityPanel password={password} setPassword={setPassword} confirm={confirmPassword} setConfirm={setConfirmPassword} show={showPassword} setShow={setShowPassword} save={savePassword} saving={saving} />}
            {(tab === "notifications" || tab === "appearance") && <Unavailable icon={tab === "notifications" ? <Bell size={27} /> : <Laptop size={27} />} title={tab === "notifications" ? "Thông báo tùy chỉnh" : "Tùy chỉnh giao diện"} text="Tùy chọn này chưa được kết nối với backend và sẽ được bổ sung trong phiên bản tiếp theo." />}
          </motion.div></AnimatePresence>
        </div>
      </div>
    </section>
    <style jsx global>{`.project-settings-tabs{-ms-overflow-style:none;scrollbar-width:none}.project-settings-tabs::-webkit-scrollbar{display:none}`}</style>
  </main>;
}

function AccountPanel({ user, initials, name, setName, avatar, fileRef, selectAvatar, save, saving, changed }: { user: UserType; initials: string; name: string; setName: (value: string) => void; avatar: string; fileRef: React.RefObject<HTMLInputElement | null>; selectAvatar: (event: React.ChangeEvent<HTMLInputElement>) => void; save: () => void; saving: boolean; changed: boolean }) {
  return <div className="border border-zinc-900 bg-[#fff8e9] shadow-[7px_7px_0_#18181b]">
    <div className="grid gap-7 border-b border-zinc-900 bg-white p-6 sm:grid-cols-[140px_1fr] sm:items-center md:p-8"><div className="relative h-32 w-32 overflow-hidden border border-zinc-900 bg-zinc-950">{avatar ? <img src={avatar} alt={user.name} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-4xl font-black text-[#ffb21c]">{initials}</div>}<button onClick={() => fileRef.current?.click()} aria-label="Đổi ảnh đại diện" className="absolute bottom-2 right-2 grid h-10 w-10 place-items-center border border-zinc-900 bg-[#ffb21c]"><Camera size={17} /></button></div><div><p className="text-[9px] font-black uppercase tracking-[.16em] text-[#d98200]">Ảnh đại diện</p><h3 className="mt-2 text-xl font-black">Hình ảnh nhận diện tài khoản</h3><p className="mt-2 text-xs leading-6 text-zinc-500">Hỗ trợ PNG, JPG hoặc WEBP, dung lượng tối đa 5MB.</p><button onClick={() => fileRef.current?.click()} className="mt-4 inline-flex items-center gap-2 border-b border-zinc-900 pb-1 text-[9px] font-black uppercase"><Upload size={14} /> Chọn ảnh mới</button><input ref={fileRef} type="file" accept="image/*" onChange={selectAvatar} className="hidden" /></div></div>
    <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8"><SettingField label="Tên hiển thị"><input value={name} onChange={(event) => setName(event.target.value)} className="h-14 w-full border border-zinc-900 bg-white px-4 text-sm font-black outline-none focus:shadow-[3px_3px_0_#ffb21c]" /></SettingField><SettingField label="Email đăng nhập"><span className="relative block"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" /><input value={user.email} disabled className="h-14 w-full cursor-not-allowed border border-zinc-300 bg-zinc-100 pl-11 pr-4 text-sm font-semibold text-zinc-500" /></span></SettingField><SettingField label="Vai trò"><div className="flex h-14 items-center border border-zinc-900 bg-white px-4 text-xs font-black uppercase tracking-wider"><ShieldCheck size={16} className="mr-3 text-[#d98200]" />{user.role}</div></SettingField><SettingField label="Trạng thái"><div className="flex h-14 items-center border border-zinc-900 bg-white px-4 text-xs font-black uppercase tracking-wider"><span className="mr-3 h-2 w-2 rounded-full bg-emerald-500" />Đang hoạt động</div></SettingField></div>
    <div className="flex flex-col justify-between gap-4 border-t border-zinc-900 bg-white p-5 sm:flex-row sm:items-center md:px-8"><p className="text-[10px] text-zinc-500">{changed ? "Bạn có thay đổi chưa được lưu." : "Thông tin hiện tại đã được đồng bộ."}</p><SaveButton onClick={save} saving={saving} disabled={!changed} label="Lưu thay đổi" /></div>
  </div>;
}

function SecurityPanel({ password, setPassword, confirm, setConfirm, show, setShow, save, saving }: { password: string; setPassword: (value: string) => void; confirm: string; setConfirm: (value: string) => void; show: boolean; setShow: (value: boolean) => void; save: () => void; saving: boolean }) {
  const match = Boolean(password) && password === confirm;
  return <div className="grid gap-7 lg:grid-cols-[1fr_.75fr]"><div className="border border-zinc-900 bg-[#fff8e9] shadow-[7px_7px_0_#ffb21c]"><div className="border-b border-zinc-900 bg-zinc-950 p-6 text-white"><LockKeyhole size={22} className="text-[#ffb21c]" /><h3 className="mt-4 text-2xl font-black">Đổi mật khẩu</h3><p className="mt-2 text-xs leading-6 text-zinc-400">Sử dụng ít nhất 6 ký tự và tránh mật khẩu dễ đoán.</p></div><div className="space-y-5 p-6"><SettingField label="Mật khẩu mới"><PasswordInput value={password} setValue={setPassword} show={show} toggle={() => setShow(!show)} /></SettingField><SettingField label="Xác nhận mật khẩu"><PasswordInput value={confirm} setValue={setConfirm} show={show} toggle={() => setShow(!show)} /><p className={`mt-2 text-[9px] font-black uppercase ${match ? "text-emerald-600" : "text-zinc-400"}`}>{match ? "Hai mật khẩu đã trùng khớp" : "Nhập lại mật khẩu mới"}</p></SettingField><SaveButton onClick={save} saving={saving} disabled={!password || !match} label="Cập nhật mật khẩu" /></div></div><div className="border border-zinc-900 bg-white"><div className="border-b border-zinc-900 p-6"><p className="text-[9px] font-black uppercase tracking-[.16em] text-[#d98200]">Security checklist</p><h3 className="mt-2 text-xl font-black">Khuyến nghị bảo mật</h3></div>{["Không chia sẻ mật khẩu với người khác","Dùng mật khẩu khác với email cá nhân","Đăng xuất trên thiết bị không còn sử dụng"].map((item)=><div key={item} className="flex gap-3 border-b border-zinc-300 p-5 last:border-0"><CheckCircle2 size={16} className="shrink-0 text-emerald-600" /><p className="text-xs leading-5 text-zinc-600">{item}</p></div>)}</div></div>;
}

function SettingField({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-[9px] font-black uppercase tracking-[.14em]">{label}</span>{children}</label>; }
function PasswordInput({ value, setValue, show, toggle }: { value: string; setValue: (value: string) => void; show: boolean; toggle: () => void }) { return <span className="relative block"><input type={show ? "text" : "password"} value={value} onChange={(event) => setValue(event.target.value)} placeholder="••••••••" className="h-14 w-full border border-zinc-900 bg-white px-4 pr-12 text-sm font-semibold outline-none focus:shadow-[3px_3px_0_#ffb21c]" /><button type="button" onClick={toggle} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></span>; }
function SaveButton({ onClick, saving, disabled, label }: { onClick: () => void; saving: boolean; disabled: boolean; label: string }) { return <button onClick={onClick} disabled={saving || disabled} className="inline-flex min-h-12 items-center justify-center gap-3 border border-zinc-900 bg-[#ffb21c] px-6 text-[10px] font-black uppercase shadow-[4px_4px_0_#18181b] disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"><span className={saving ? "h-4 w-4 animate-spin rounded-full border-2 border-zinc-900/30 border-t-zinc-900" : ""}>{!saving && <Save size={15} />}</span>{saving ? "Đang lưu" : label}</button>; }
function Unavailable({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="grid min-h-[420px] place-items-center border border-dashed border-zinc-400 bg-[#fff8e9] p-8 text-center"><div className="max-w-md"><span className="mx-auto grid h-16 w-16 place-items-center border border-zinc-900 bg-white text-[#d98200] shadow-[4px_4px_0_#ffb21c]">{icon}</span><h3 className="mt-6 text-2xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{text}</p><span className="mt-6 inline-block border border-zinc-300 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-wider">Đang được phát triển</span></div></div>; }
function Snapshot({ icon, label, value, last = false }: { icon: React.ReactNode; label: string; value: string; last?: boolean }) { return <div className={`grid grid-cols-[36px_90px_1fr] items-center gap-3 px-5 py-3.5 ${last ? "" : "border-b border-zinc-300"}`}><span className="grid h-9 w-9 place-items-center border border-zinc-900 bg-[#fff8e9] text-[#d98200]">{icon}</span><span className="text-[8px] font-black uppercase tracking-[.13em] text-zinc-400">{label}</span><strong className="min-w-0 truncate text-right text-xs">{value}</strong></div>; }
function SettingsLoading() { return <LoadingSpinner fullScreen size="lg" label="Đang tải cài đặt" />; }
