"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Activity,
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Edit3,
  Eye,
  FolderKanban,
  Image as ImageIcon,
  Images,
  Link as LinkIcon,
  Plus,
  RefreshCw,
  Save,
  Upload,
  User,
  X,
} from "lucide-react";

type Priority = "low" | "medium" | "high";

interface ProjectData {
  name: string;
  client: string;
  status: string;
  visibility?: "draft" | "published";
  description?: string;
  image?: string;
  gallery?: string[];
  tags?: string[];
  updatedAt?: string;
  budget?: number;
  progress?: number;
  priority?: Priority;
  liveUrl?: string;
  githubUrl?: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const descriptionRef = useRef<HTMLDivElement>(null);

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
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const plainDescription = useMemo(() => stripHtml(description), [description]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tìm thấy dự án");
        const data: ProjectData = await res.json();
        setName(data.name || "");
        setClient(data.client || "");
        setStatus(data.status || "Đang triển khai");
        setVisibility(data.visibility || "published");
        setDescription(data.description || "");
        setBudget(data.budget || 0);
        setProgress(data.progress || 0);
        setPriority(data.priority || "medium");
        setLiveUrl(data.liveUrl || "");
        setGithubUrl(data.githubUrl || "");
        setTags(data.tags || []);
        setCurrentImage(data.image || "");
        setExistingGallery(data.gallery || []);
        setUpdatedAt(data.updatedAt || "");
        setTimeout(() => {
          if (descriptionRef.current) descriptionRef.current.innerHTML = data.description || "";
        }, 0);
      } catch {
        toast.error("Không thể tải dự án");
        router.push("/admin/projects");
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id, router]);

  const touch = () => setIsDirty(true);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
    touch();
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setNewGalleryFiles((prev) => [...prev, ...files]);
    setNewGalleryPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    touch();
  };

  const removeNewGalleryImage = (index: number) => {
    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    touch();
  };

  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;
    setTags((prev) => [...prev, value]);
    setTagInput("");
    touch();
  };

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!name.trim() || !client.trim()) {
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
      newGalleryFiles.forEach((file) => formData.append("gallery", file));

      const res = await fetch(`/api/projects/${id}`, { method: "PUT", body: formData });
      if (!res.ok) throw new Error("Cập nhật thất bại");

      toast.success("Đã cập nhật dự án");
      setIsDirty(false);
      router.push("/admin/projects");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi khi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <div className="border border-zinc-950 bg-zinc-950 px-6 py-5 text-white shadow-[5px_5px_0_#ffb21c]">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffb21c] border-t-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Đang tải dự án</span>
          </div>
        </div>
      </div>
    );
  }

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
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#df8200]">Project Editor</p>
              <h1 className="flex items-center gap-3 text-3xl font-black leading-none text-zinc-950 sm:text-4xl">
                Chỉnh sửa dự án
                {isDirty && <span className="h-3 w-3 animate-pulse bg-[#ffb21c]" />}
              </h1>
              <p className="mt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                <span>#{id}</span>
                {updatedAt && <span className="flex items-center gap-1"><Clock size={13} /> {new Date(updatedAt).toLocaleDateString("vi-VN")}</span>}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <button type="button" onClick={() => { toast.success("Đã lưu bản nháp"); setIsDirty(false); }} disabled={!isDirty} className="inline-flex h-12 items-center justify-center gap-2 border border-zinc-950 bg-white px-5 text-[10px] font-black uppercase tracking-[0.12em] disabled:opacity-50">
              <Save size={17} />
              Lưu nháp
            </button>
            <button type="button" onClick={() => submit()} disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 border border-zinc-950 bg-[#ffb21c] px-5 text-[10px] font-black uppercase tracking-[0.12em] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 disabled:opacity-50">
              {loading ? <RefreshCw size={17} className="animate-spin" /> : <Edit3 size={17} />}
              Cập nhật
            </button>
          </div>
        </div>
      </section>

      <form onSubmit={submit} className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <FormPanel icon={FolderKanban} kicker="01 · Nội dung" title="Thông tin cơ bản">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Tên dự án" required><input value={name} onChange={(e) => { setName(e.target.value); touch(); }} className="admin-crud-input" /></Field>
              <Field label="Khách hàng" required><input value={client} onChange={(e) => { setClient(e.target.value); touch(); }} className="admin-crud-input" /></Field>
            </div>
            <Field label="Mô tả dự án">
              <Editor refEl={descriptionRef} onChange={(value) => { setDescription(value); touch(); }} />
            </Field>
          </FormPanel>

          <FormPanel icon={Images} kicker="02 · Media" title="Ảnh bìa & gallery">
            <div className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
              <UploadBox label={thumbnail || currentImage ? "Đổi ảnh bìa" : "Tải ảnh bìa"} onChange={handleThumbnailChange} />
              <UploadBox label="Thêm ảnh gallery" multiple onChange={handleGalleryChange} />
            </div>
            {!!existingGallery.length && (
              <div className="mt-5">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Ảnh hiện tại</p>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                  {existingGallery.map((src) => <div key={src} className="relative aspect-square border border-zinc-950 bg-[#fff8e9]"><Image src={src} alt="" fill className="object-cover" unoptimized /></div>)}
                </div>
              </div>
            )}
            {!!newGalleryPreviews.length && (
              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {newGalleryPreviews.map((src, index) => (
                  <div key={src} className="relative aspect-square border border-zinc-950 bg-[#fff8e9]">
                    <Image src={src} alt="" fill className="object-cover" />
                    <button type="button" onClick={() => removeNewGalleryImage(index)} className="absolute right-1 top-1 grid h-7 w-7 place-items-center border border-zinc-950 bg-white text-red-600"><X size={13} /></button>
                  </div>
                ))}
              </div>
            )}
          </FormPanel>

          <div className="grid gap-6 lg:grid-cols-2">
            <FormPanel icon={Activity} kicker="03 · Trạng thái" title="Tiến độ">
              <div className="space-y-5">
                <Field label="Tình trạng">
                  <select value={status} onChange={(e) => { setStatus(e.target.value); touch(); }} className="admin-crud-input">
                    <option value="Đang triển khai">Đang triển khai</option>
                    <option value="Đang thực hiện">Đang thực hiện</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                </Field>
                <Field label="Hiển thị ngoài website">
                  <select value={visibility} onChange={(e) => { setVisibility(e.target.value as "draft" | "published"); touch(); }} className="admin-crud-input">
                    <option value="published">Công khai</option>
                    <option value="draft">Bản nháp</option>
                  </select>
                </Field>
                <Field label="Ưu tiên">
                  <div className="grid grid-cols-3 gap-2">{(["low", "medium", "high"] as Priority[]).map((item) => <button key={item} type="button" onClick={() => { setPriority(item); touch(); }} className={`border border-zinc-950 px-3 py-3 text-[10px] font-black uppercase ${priority === item ? "bg-zinc-950 text-[#ffb21c]" : "bg-white hover:bg-[#fff8e9]"}`}>{item}</button>)}</div>
                </Field>
              </div>
            </FormPanel>

            <FormPanel icon={DollarSign} kicker="04 · Chỉ số" title="Ngân sách">
              <div className="space-y-5">
                <Field label="Ngân sách (VNĐ)"><input type="number" value={budget} onChange={(e) => { setBudget(Number(e.target.value)); touch(); }} className="admin-crud-input" /></Field>
                <Field label={`Tiến độ ${progress}%`}>
                  <input type="range" min={0} max={100} value={progress} onChange={(e) => { setProgress(Number(e.target.value)); touch(); }} className="w-full accent-[#ffb21c]" />
                  <div className="mt-3 h-2 border border-zinc-950 bg-white"><div className="h-full bg-[#ffb21c]" style={{ width: `${progress}%` }} /></div>
                </Field>
              </div>
            </FormPanel>
          </div>

          <FormPanel icon={LinkIcon} kicker="05 · SEO & Link" title="Liên kết & tags">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Live URL"><input value={liveUrl} onChange={(e) => { setLiveUrl(e.target.value); touch(); }} className="admin-crud-input" /></Field>
              <Field label="Github URL"><input value={githubUrl} onChange={(e) => { setGithubUrl(e.target.value); touch(); }} className="admin-crud-input" /></Field>
            </div>
            <div className="mt-5 flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Nhập tag..." className="admin-crud-input flex-1" />
              <button type="button" onClick={addTag} className="grid h-14 w-14 place-items-center border border-zinc-950 bg-[#ffb21c] shadow-[3px_3px_0_#111]"><Plus size={18} /></button>
            </div>
            <TagList tags={tags} onRemove={(tag) => { setTags((prev) => prev.filter((item) => item !== tag)); touch(); }} />
          </FormPanel>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <PreviewCard name={name} client={client} status={status} priority={priority} description={plainDescription} budget={budget} progress={progress} image={thumbnailPreview || currentImage} />
          <div className="border border-zinc-950 bg-zinc-950 p-5 text-white shadow-[6px_6px_0_#ffb21c]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb21c]">Trạng thái chỉnh sửa</p>
            <div className="mt-4 grid gap-3">
              <CheckRow done={!!name.trim()} label="Tên dự án" />
              <CheckRow done={!!client.trim()} label="Khách hàng" />
              <CheckRow done={!!(thumbnailPreview || currentImage)} label="Ảnh bìa" />
              <CheckRow done={isDirty} label="Có thay đổi mới" />
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
      <div className="border-b border-zinc-950 bg-zinc-950 px-5 py-4 text-white"><p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb21c]">{kicker}</p><h2 className="flex items-center gap-3 text-2xl font-black"><Icon size={24} className="text-[#ffb21c]" />{title}</h2></div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </motion.section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}{required && <span className="text-red-600"> *</span>}</span>{children}</label>;
}

function Editor({ refEl, onChange }: { refEl: React.RefObject<HTMLDivElement | null>; onChange: (value: string) => void }) {
  return (
    <div>
      <div className="flex items-center gap-1 border border-zinc-950 border-b-0 bg-[#fff8e9] p-2">
        {["bold", "italic", "underline"].map((cmd) => <button key={cmd} type="button" onMouseDown={(e) => { e.preventDefault(); document.execCommand(cmd); }} className="h-8 w-8 border border-zinc-950 bg-white text-xs font-black uppercase hover:bg-[#ffb21c]">{cmd[0]}</button>)}
        <button type="button" onMouseDown={(e) => { e.preventDefault(); document.execCommand("insertUnorderedList"); }} className="h-8 w-8 border border-zinc-950 bg-white text-xs font-black hover:bg-[#ffb21c]">≡</button>
      </div>
      <div ref={refEl} contentEditable suppressContentEditableWarning onInput={(e) => onChange(e.currentTarget.innerHTML)} className="min-h-36 border border-zinc-950 bg-white px-4 py-3 text-sm font-medium leading-7 outline-none focus:bg-[#fff8e9] [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5" />
    </div>
  );
}

function UploadBox({ label, multiple, onChange }: { label: string; multiple?: boolean; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return <label className="grid min-h-32 cursor-pointer place-items-center border border-dashed border-zinc-950 bg-[#fff8e9] p-5 text-center transition hover:bg-white hover:shadow-[4px_4px_0_#ffb21c]"><span className="grid h-12 w-12 place-items-center border border-zinc-950 bg-white"><Upload size={20} /></span><span className="mt-3 text-[10px] font-black uppercase tracking-[0.14em]">{label}</span><input type="file" multiple={multiple} accept="image/*" onChange={onChange} className="hidden" /></label>;
}

function TagList({ tags, onRemove }: { tags: string[]; onRemove: (tag: string) => void }) {
  return <div className="mt-4 flex flex-wrap gap-2">{tags.length ? tags.map((tag) => <span key={tag} className="inline-flex items-center gap-2 border border-zinc-950 bg-[#fff8e9] px-3 py-2 text-[10px] font-black uppercase">#{tag}<button type="button" onClick={() => onRemove(tag)}><X size={12} /></button></span>) : <span className="text-sm font-bold text-slate-400">Chưa có tag nào</span>}</div>;
}

function PreviewCard({ name, client, status, priority, description, budget, progress, image }: { name: string; client: string; status: string; priority: string; description: string; budget: number; progress: number; image: string }) {
  return (
    <div className="overflow-hidden border border-zinc-950 bg-white shadow-[6px_6px_0_#ffb21c]">
      <div className="relative aspect-video border-b border-zinc-950 bg-[#fff8e9]">{image ? <Image src={image} alt="Preview" fill className="object-cover" unoptimized /> : <div className="grid h-full place-items-center text-zinc-400"><ImageIcon size={44} /></div>}<div className="absolute left-3 top-3 flex gap-2"><Badge>{status}</Badge><Badge>{priority}</Badge></div></div>
      <div className="p-5"><p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500"><Eye size={13} /> Live preview</p><h3 className="line-clamp-2 text-2xl font-black leading-tight">{name || "Tên dự án"}</h3><p className="mt-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500"><User size={13} /> {client || "Khách hàng"}</p><p className="my-5 line-clamp-3 min-h-20 text-sm leading-7 text-slate-600">{description || "Mô tả dự án sẽ hiển thị tại đây."}</p><div className="border-t border-zinc-200 pt-4"><div className="mb-3 flex justify-between text-xs font-black"><span className="flex items-center gap-1"><DollarSign size={14} />{budget.toLocaleString("vi-VN")}</span><span className="flex items-center gap-1"><Calendar size={14} />{new Date().toLocaleDateString("vi-VN")}</span></div><div className="h-2 border border-zinc-950 bg-white"><div className="h-full bg-[#ffb21c]" style={{ width: `${progress}%` }} /></div></div></div>
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
