"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  Code2,
  DollarSign,
  Eye,
  Image as ImageIcon,
  Layers,
  MonitorSmartphone,
  RefreshCw,
  Save,
  ServerCog,
  Settings,
  Sparkles,
  Star,
  Tag,
  Upload,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import SelectIconField from "@/components/admin/SelectIconField";

const iconMap: Record<string, LucideIcon> = { Code2, MonitorSmartphone, Layers, ServerCog, Wrench, Settings };

export default function CreateServiceClient() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState("Hiển thị");
  const [visibility, setVisibility] = useState<"draft" | "published">("published");
  const [icon, setIcon] = useState("Code2");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = title.trim() && description.trim();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!canSubmit) {
      toast.error("Vui lòng nhập tên và mô tả dịch vụ");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", title.trim());
      form.append("description", description.trim());
      form.append("status", status);
      form.append("visibility", visibility);
      form.append("icon", icon);
      form.append("price", price.toString());
      form.append("category", category.trim());
      form.append("featured", featured.toString());
      if (image) form.append("thumbnail", image);

      const res = await fetch("/api/services", { method: "POST", body: form });
      if (!res.ok) throw new Error("Thêm dịch vụ thất bại");

      toast.success("Đã thêm dịch vụ");
      router.push("/admin/services");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <AdminToast />
      <CrudHeader title="Tạo dịch vụ mới" kicker="Service Builder" backHref="/admin/services" primaryLabel="Tạo dịch vụ" loading={loading} disabled={!canSubmit} onPrimary={() => submit()} onDraft={() => toast.success("Đã lưu bản nháp")} />

      <form onSubmit={submit} className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <FormPanel icon={Wrench} kicker="01 · Nội dung" title="Thông tin dịch vụ">
            <Field label="Tên dịch vụ" required><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VD: Thiết kế website..." className="admin-crud-input" /></Field>
            <Field label="Mô tả dịch vụ" required><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Mô tả giá trị dịch vụ..." className="admin-crud-textarea" /></Field>
          </FormPanel>

          <FormPanel icon={Sparkles} kicker="02 · Nhận diện" title="Icon & ảnh minh họa">
            <Field label="Icon hiển thị"><div className="border border-zinc-950 bg-[#fff8e9] p-4"><SelectIconField icon={icon} setIcon={setIcon} /></div></Field>
            <Field label="Ảnh minh họa">
              {imagePreview ? <ImagePreview src={imagePreview} onRemove={() => { setImage(null); setImagePreview(""); }} /> : <UploadBox label="Tải ảnh dịch vụ" onChange={handleImageChange} />}
            </Field>
          </FormPanel>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <FormPanel icon={Settings} kicker="03 · Cấu hình" title="Thiết lập">
            <Field label="Trạng thái"><select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-crud-input"><option value="Hiển thị">Hiển thị</option><option value="Ẩn">Ẩn</option></select></Field>
            <Field label="Hiển thị ngoài website"><select value={visibility} onChange={(e) => setVisibility(e.target.value as "draft" | "published")} className="admin-crud-input"><option value="published">Công khai</option><option value="draft">Bản nháp</option></select></Field>
            <Field label="Danh mục"><input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Web Development" className="admin-crud-input" /></Field>
            <Field label="Giá khởi điểm (VNĐ)"><input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="admin-crud-input" /></Field>
            <FeaturedSwitch checked={featured} onChange={setFeatured} />
          </FormPanel>
          <PreviewCard title={title} description={description} icon={icon} status={status} category={category} price={price} featured={featured} image={imagePreview} />
        </aside>
      </form>
    </div>
  );
}

function AdminToast() { return <Toaster position="top-right" toastOptions={{ style: { background: "#09090b", color: "#fff", border: "1px solid #ffb21c", borderRadius: 0, fontWeight: 800 } }} />; }

function CrudHeader({ title, kicker, backHref, primaryLabel, loading, disabled, onPrimary, onDraft }: { title: string; kicker: string; backHref: string; primaryLabel: string; loading: boolean; disabled: boolean; onPrimary: () => void; onDraft: () => void }) {
  return <section className="sticky top-0 z-30 -mx-4 mb-7 border-b border-zinc-950 bg-[#fff8e9]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-4"><Link href={backHref} className="grid h-12 w-12 shrink-0 place-items-center border border-zinc-950 bg-white shadow-[3px_3px_0_#ffb21c] transition hover:bg-zinc-950 hover:text-white"><ArrowLeft size={20} /></Link><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#df8200]">{kicker}</p><h1 className="text-3xl font-black leading-none text-zinc-950 sm:text-4xl">{title}</h1></div></div><div className="grid grid-cols-2 gap-3 sm:flex"><button type="button" onClick={onDraft} className="inline-flex h-12 items-center justify-center gap-2 border border-zinc-950 bg-white px-5 text-[10px] font-black uppercase tracking-[0.12em]"><Save size={17} />Lưu nháp</button><button type="button" onClick={onPrimary} disabled={loading || disabled} className="inline-flex h-12 items-center justify-center gap-2 border border-zinc-950 bg-[#ffb21c] px-5 text-[10px] font-black uppercase tracking-[0.12em] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 disabled:opacity-50">{loading ? <RefreshCw size={17} className="animate-spin" /> : <Sparkles size={17} />}{primaryLabel}</button></div></div></section>;
}

function FormPanel({ icon: Icon, kicker, title, children }: { icon: LucideIcon; kicker: string; title: string; children: React.ReactNode }) {
  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border border-zinc-950 bg-white shadow-[6px_6px_0_#e4ded0]"><div className="border-b border-zinc-950 bg-zinc-950 px-5 py-4 text-white"><p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb21c]">{kicker}</p><h2 className="flex items-center gap-3 text-2xl font-black"><Icon size={24} className="text-[#ffb21c]" />{title}</h2></div><div className="space-y-5 p-5 sm:p-6">{children}</div></motion.section>;
}
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}{required && <span className="text-red-600"> *</span>}</span>{children}</label>; }
function UploadBox({ label, onChange }: { label: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) { return <label className="grid min-h-36 cursor-pointer place-items-center border border-dashed border-zinc-950 bg-[#fff8e9] p-5 text-center transition hover:bg-white hover:shadow-[4px_4px_0_#ffb21c]"><span className="grid h-12 w-12 place-items-center border border-zinc-950 bg-white"><Upload size={20} /></span><span className="mt-3 text-[10px] font-black uppercase tracking-[0.14em]">{label}</span><input type="file" accept="image/*" onChange={onChange} className="hidden" /></label>; }
function ImagePreview({ src, onRemove }: { src: string; onRemove: () => void }) { return <div className="relative aspect-video max-w-md border border-zinc-950 bg-[#fff8e9]"><Image src={src} alt="Preview" fill className="object-cover" /><button type="button" onClick={onRemove} className="absolute right-2 top-2 grid h-9 w-9 place-items-center border border-zinc-950 bg-white text-red-600"><X size={16} /></button></div>; }
function FeaturedSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) { return <button type="button" onClick={() => onChange(!checked)} className={`flex w-full items-center justify-between border border-zinc-950 p-4 text-left ${checked ? "bg-[#ffb21c]" : "bg-[#fff8e9]"}`}><span className="flex items-center gap-3 text-sm font-black"><Star size={18} className={checked ? "fill-zinc-950" : ""} />Dịch vụ nổi bật</span><span className="text-[10px] font-black uppercase">{checked ? "Bật" : "Tắt"}</span></button>; }
function PreviewCard({ title, description, icon, status, category, price, featured, image }: { title: string; description: string; icon: string; status: string; category: string; price: number; featured: boolean; image: string }) { const Icon = iconMap[icon] || Wrench; return <div className="overflow-hidden border border-zinc-950 bg-white shadow-[6px_6px_0_#ffb21c]"><div className="relative aspect-video border-b border-zinc-950 bg-[#fff8e9]">{image ? <Image src={image} alt="Preview" fill className="object-cover" /> : <div className="grid h-full place-items-center"><span className="grid h-20 w-20 place-items-center border border-zinc-950 bg-[#ffb21c] shadow-[4px_4px_0_#111]"><Icon size={34} /></span></div>}{featured && <span className="absolute left-3 top-3 border border-zinc-950 bg-[#ffb21c] px-2 py-1 text-[9px] font-black uppercase">Nổi bật</span>}</div><div className="p-5"><p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500"><Eye size={13} /> Live preview</p><h3 className="line-clamp-2 text-2xl font-black leading-tight">{title || "Tên dịch vụ"}</h3><p className="my-5 line-clamp-3 min-h-20 text-sm leading-7 text-slate-600">{description || "Mô tả dịch vụ sẽ hiển thị tại đây."}</p><div className="flex items-center justify-between border-t border-zinc-200 pt-4"><span className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-500"><Tag size={13} />{category || "General"}</span><span className="text-lg font-black"><DollarSign className="inline" size={15} /> {price.toLocaleString("vi-VN")}</span></div><div className="mt-3 text-[10px] font-black uppercase text-[#df8200]">{status}</div></div></div>; }
