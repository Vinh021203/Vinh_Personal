"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Activity,
  ArrowLeft,
  Calendar,
  DollarSign,
  Eye,
  FolderKanban,
  Globe,
  Image as ImageIcon,
  Images,
  Link as LinkIcon,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Star,
  Upload,
  User,
  X,
} from "lucide-react";

type Priority = "low" | "medium" | "high";

export default function CreateProjectClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Đang triển khai");
  const [visibility, setVisibility] = useState<"draft" | "published">("published");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [progress, setProgress] = useState(0);
  const [priority, setPriority] = useState<Priority>("medium");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [gallery, setGallery] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = name.trim() && client.trim();
  const plainDescription = useMemo(() => stripHtml(description), [description]);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setGallery((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;
    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!canSubmit) {
      toast.error("Vui lòng nhập tên dự án và khách hàng");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("client", client.trim());
      formData.append("status", status);
      formData.append("visibility", visibility);
      formData.append("description", description.trim());
      formData.append("budget", budget.toString());
      formData.append("progress", progress.toString());
      formData.append("priority", priority);
      formData.append("liveUrl", liveUrl.trim());
      formData.append("githubUrl", githubUrl.trim());
      formData.append("tags", JSON.stringify(tags));
      if (thumbnail) formData.append("thumbnail", thumbnail);
      gallery.forEach((file) => formData.append("gallery", file));

      const res = await fetch("/api/projects", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Tạo dự án thất bại");

      toast.success("Đã tạo dự án mới");
      router.push("/admin/projects");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <AdminToast />

      <section className="sticky top-0 z-30 -mx-4 mb-7 border-b border-zinc-950 bg-[#fff8e9]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/projects" className="grid h-12 w-12 shrink-0 place-items-center border border-zinc-950 bg-white shadow-[3px_3px_0_#ffb21c] transition hover:bg-zinc-950 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#df8200]">Project Builder</p>
              <h1 className="text-3xl font-black leading-none text-zinc-950 sm:text-4xl">Tạo dự án mới</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <button onClick={() => toast.success("Đã lưu bản nháp")} disabled={!name.trim()} className="inline-flex h-12 items-center justify-center gap-2 border border-zinc-950 bg-white px-5 text-[10px] font-black uppercase tracking-[0.12em] disabled:opacity-50">
              <Save size={17} />
              Lưu nháp
            </button>
            <button onClick={() => submit()} disabled={loading || !canSubmit} className="inline-flex h-12 items-center justify-center gap-2 border border-zinc-950 bg-[#ffb21c] px-5 text-[10px] font-black uppercase tracking-[0.12em] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 disabled:opacity-50">
              {loading ? <RefreshCw size={17} className="animate-spin" /> : <Sparkles size={17} />}
              Tạo dự án
            </button>
          </div>
        </div>
      </section>

      <form onSubmit={submit} className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <FormPanel icon={FolderKanban} kicker="01 · Nội dung" title="Thông tin cơ bản">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Tên dự án" required>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Landing Page sự kiện..." className="admin-crud-input" />
              </Field>
              <Field label="Khách hàng" required>
                <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Tên khách hàng / công ty" className="admin-crud-input" />
              </Field>
            </div>
            <Field label="Mô tả dự án">
              <Editor value={description} onChange={setDescription} />
            </Field>
          </FormPanel>

          <FormPanel icon={Images} kicker="02 · Media" title="Ảnh bìa & gallery">
            <div className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
              <UploadBox label={thumbnail ? "Đổi ảnh bìa" : "Tải ảnh bìa"} onChange={handleThumbnailChange} />
              <UploadBox label="Thêm ảnh gallery" multiple onChange={handleGalleryChange} />
            </div>
            {!!galleryPreviews.length && (
              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {galleryPreviews.map((src, index) => (
                  <div key={src} className="relative aspect-square border border-zinc-950 bg-[#fff8e9]">
                    <Image src={src} alt="" fill className="object-cover" />
                    <button type="button" onClick={() => removeGalleryImage(index)} className="absolute right-1 top-1 grid h-7 w-7 place-items-center border border-zinc-950 bg-white text-red-600">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FormPanel>

          <div className="grid gap-6 lg:grid-cols-2">
            <FormPanel icon={Activity} kicker="03 · Trạng thái" title="Tiến độ">
              <div className="space-y-5">
                <Field label="Tình trạng">
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-crud-input">
                    <option value="Đang triển khai">Đang triển khai</option>
                    <option value="Đang thực hiện">Đang thực hiện</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                </Field>
                <Field label="Hiển thị ngoài website">
                  <select value={visibility} onChange={(e) => setVisibility(e.target.value as "draft" | "published")} className="admin-crud-input">
                    <option value="published">Công khai</option>
                    <option value="draft">Bản nháp</option>
                  </select>
                </Field>
                <Field label="Ưu tiên">
                  <div className="grid grid-cols-3 gap-2">
                    {(["low", "medium", "high"] as Priority[]).map((item) => (
                      <button key={item} type="button" onClick={() => setPriority(item)} className={`border border-zinc-950 px-3 py-3 text-[10px] font-black uppercase ${priority === item ? "bg-zinc-950 text-[#ffb21c]" : "bg-white hover:bg-[#fff8e9]"}`}>{item}</button>
                    ))}
                  </div>
                </Field>
              </div>
            </FormPanel>

            <FormPanel icon={DollarSign} kicker="04 · Chỉ số" title="Ngân sách">
              <div className="space-y-5">
                <Field label="Ngân sách (VNĐ)">
                  <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="admin-crud-input" />
                </Field>
                <Field label={`Tiến độ ${progress}%`}>
                  <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full accent-[#ffb21c]" />
                  <div className="mt-3 h-2 border border-zinc-950 bg-white"><div className="h-full bg-[#ffb21c]" style={{ width: `${progress}%` }} /></div>
                </Field>
              </div>
            </FormPanel>
          </div>

          <FormPanel icon={LinkIcon} kicker="05 · SEO & Link" title="Liên kết & tags">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Live URL">
                <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://website.com" className="admin-crud-input" />
              </Field>
              <Field label="Github URL">
                <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." className="admin-crud-input" />
              </Field>
            </div>
            <div className="mt-5 flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Nhập tag..." className="admin-crud-input flex-1" />
              <button type="button" onClick={addTag} className="grid h-14 w-14 place-items-center border border-zinc-950 bg-[#ffb21c] shadow-[3px_3px_0_#111]"><Plus size={18} /></button>
            </div>
            <TagList tags={tags} onRemove={(tag) => setTags((prev) => prev.filter((item) => item !== tag))} />
          </FormPanel>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <PreviewCard name={name} client={client} status={status} priority={priority} description={plainDescription} budget={budget} progress={progress} image={thumbnailPreview} />
          <div className="border border-zinc-950 bg-zinc-950 p-5 text-white shadow-[6px_6px_0_#ffb21c]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb21c]">Checklist</p>
            <div className="mt-4 grid gap-3">
              <CheckRow done={!!name.trim()} label="Tên dự án" />
              <CheckRow done={!!client.trim()} label="Khách hàng" />
              <CheckRow done={!!thumbnailPreview} label="Ảnh bìa" />
              <CheckRow done={!!description.trim()} label="Mô tả" />
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function AdminToast() {
  return <Toaster position="top-right" toastOptions={{ style: { background: "#09090b", color: "#fff", border: "1px solid #ffb21c", borderRadius: 0, fontWeight: 800 } }} />;
}

function FormPanel({ icon: Icon, kicker, title, children }: { icon: any; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border border-zinc-950 bg-white shadow-[6px_6px_0_#e4ded0]">
      <div className="border-b border-zinc-950 bg-zinc-950 px-5 py-4 text-white">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb21c]">{kicker}</p>
        <h2 className="flex items-center gap-3 text-2xl font-black"><Icon size={24} className="text-[#ffb21c]" />{title}</h2>
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </motion.section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}{required && <span className="text-red-600"> *</span>}</span>{children}</label>;
}

function Editor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <div className="flex items-center gap-1 border border-zinc-950 border-b-0 bg-[#fff8e9] p-2">
        {["bold", "italic", "underline"].map((cmd) => <button key={cmd} type="button" onMouseDown={(e) => { e.preventDefault(); document.execCommand(cmd); }} className="h-8 w-8 border border-zinc-950 bg-white text-xs font-black uppercase hover:bg-[#ffb21c]">{cmd[0]}</button>)}
        <button type="button" onMouseDown={(e) => { e.preventDefault(); document.execCommand("insertUnorderedList"); }} className="h-8 w-8 border border-zinc-950 bg-white text-xs font-black hover:bg-[#ffb21c]">≡</button>
      </div>
      <div contentEditable suppressContentEditableWarning onInput={(e) => onChange(e.currentTarget.innerHTML)} dangerouslySetInnerHTML={{ __html: value }} className="min-h-36 border border-zinc-950 bg-white px-4 py-3 text-sm font-medium leading-7 outline-none focus:bg-[#fff8e9] [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5" />
    </div>
  );
}

function UploadBox({ label, multiple, onChange }: { label: string; multiple?: boolean; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className="grid min-h-32 cursor-pointer place-items-center border border-dashed border-zinc-950 bg-[#fff8e9] p-5 text-center transition hover:bg-white hover:shadow-[4px_4px_0_#ffb21c]">
      <span className="grid h-12 w-12 place-items-center border border-zinc-950 bg-white"><Upload size={20} /></span>
      <span className="mt-3 text-[10px] font-black uppercase tracking-[0.14em]">{label}</span>
      <input type="file" multiple={multiple} accept="image/*" onChange={onChange} className="hidden" />
    </label>
  );
}

function TagList({ tags, onRemove }: { tags: string[]; onRemove: (tag: string) => void }) {
  return <div className="mt-4 flex flex-wrap gap-2">{tags.length ? tags.map((tag) => <span key={tag} className="inline-flex items-center gap-2 border border-zinc-950 bg-[#fff8e9] px-3 py-2 text-[10px] font-black uppercase">#{tag}<button type="button" onClick={() => onRemove(tag)}><X size={12} /></button></span>) : <span className="text-sm font-bold text-slate-400">Chưa có tag nào</span>}</div>;
}

function PreviewCard({ name, client, status, priority, description, budget, progress, image }: { name: string; client: string; status: string; priority: string; description: string; budget: number; progress: number; image: string }) {
  return (
    <div className="overflow-hidden border border-zinc-950 bg-white shadow-[6px_6px_0_#ffb21c]">
      <div className="relative aspect-video border-b border-zinc-950 bg-[#fff8e9]">
        {image ? <Image src={image} alt="Preview" fill className="object-cover" /> : <div className="grid h-full place-items-center text-zinc-400"><ImageIcon size={44} /></div>}
        <div className="absolute left-3 top-3 flex gap-2"><Badge>{status}</Badge><Badge>{priority}</Badge></div>
      </div>
      <div className="p-5">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500"><Eye size={13} /> Live preview</p>
        <h3 className="line-clamp-2 text-2xl font-black leading-tight">{name || "Tên dự án"}</h3>
        <p className="mt-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500"><User size={13} /> {client || "Khách hàng"}</p>
        <p className="my-5 line-clamp-3 min-h-20 text-sm leading-7 text-slate-600">{description || "Mô tả dự án sẽ hiển thị tại đây."}</p>
        <div className="border-t border-zinc-200 pt-4">
          <div className="mb-3 flex justify-between text-xs font-black"><span className="flex items-center gap-1"><DollarSign size={14} />{budget.toLocaleString("vi-VN")}</span><span className="flex items-center gap-1"><Calendar size={14} />{new Date().toLocaleDateString("vi-VN")}</span></div>
          <div className="h-2 border border-zinc-950 bg-white"><div className="h-full bg-[#ffb21c]" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="border border-zinc-950 bg-[#ffb21c] px-3 py-1 text-[9px] font-black uppercase">{children}</span>;
}

function CheckRow({ done, label }: { done: boolean; label: string }) {
  return <div className="flex items-center justify-between border border-white/15 bg-white/5 px-3 py-2 text-sm font-bold"><span>{label}</span><span className={done ? "text-[#ffb21c]" : "text-zinc-500"}>{done ? "OK" : "--"}</span></div>;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}
