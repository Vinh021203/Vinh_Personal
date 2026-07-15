"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, Code2, DollarSign,
  ExternalLink, Eye, Filter, ImageIcon, Layers3, Loader2,
  Search, SlidersHorizontal, Sparkles, UserRound, UsersRound, X,
} from "lucide-react";

interface Project {
  _id: string;
  name: string;
  slug: string;
  client: string;
  status?: string;
  priority?: "low" | "medium" | "high";
  budget?: number;
  progress?: number;
  liveUrl?: string;
  image?: string;
  description?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const priorityText = { low: "Cơ bản", medium: "Tiêu chuẩn", high: "Ưu tiên" };

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Tất cả");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/projects?public=1", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Không thể tải dự án");
        return response.json();
      })
      .then((data: Project[]) =>
        setProjects(Array.isArray(data) ? data : []),
      )
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const tags = useMemo(() => {
    const values = projects.flatMap((project) => project.tags || []).filter(Boolean);
    return ["Tất cả", ...Array.from(new Set(values))];
  }, [projects]);

  const filtered = useMemo(() => {
    const keyword = search.toLocaleLowerCase("vi").trim();
    return projects.filter((project) => {
      const matchesTag = activeTag === "Tất cả" || project.tags?.includes(activeTag);
      const haystack = [project.name, project.client, project.description, ...(project.tags || [])]
        .join(" ").toLocaleLowerCase("vi");
      return matchesTag && (!keyword || haystack.includes(keyword));
    });
  }, [activeTag, projects, search]);

  const completed = projects.filter((project) => (project.progress || 0) >= 100).length;
  const clientCount = new Set(projects.map((project) => project.client).filter(Boolean)).size;

  return (
    <main className="min-h-screen bg-[#fff8e9] text-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-900 bg-[#fff8e9] pt-16 md:pt-24">
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#ffb21c]/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 md:pb-24 lg:grid-cols-[1.35fr_.65fr] lg:px-8">
          <div>
            <span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]">
              <Code2 size={14} className="text-[#d98200]" /> Portfolio từ dữ liệu thực
            </span>
            <h1 className="mt-8 max-w-4xl text-[clamp(3.3rem,8vw,7.7rem)] font-black leading-[.82] tracking-[-.075em]">
              Dự án đã<br /><span className="text-[#d98200]">được làm thật.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
              Mỗi sản phẩm là một bài toán cụ thể được Lương Vinh trực tiếp thiết kế,
              phát triển và bàn giao — từ landing page đến hệ thống có backend.
            </p>
          </div>
          <div className="self-end border border-zinc-900 bg-white shadow-[8px_8px_0_#ffb21c]">
            <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-6 py-4 text-white">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#ffb21c]">Portfolio overview</p>
                <p className="mt-1 text-sm font-bold">Dữ liệu được cập nhật trực tiếp</p>
              </div>
              <span className="grid h-10 w-10 place-items-center border border-white/25 bg-white/10"><Sparkles size={18} className="text-[#ffb21c]" /></span>
            </div>
            <Stat icon={<BriefcaseBusiness size={19} />} value={loading ? "—" : String(projects.length).padStart(2, "0")} label="Dự án" note="Trên hệ thống" />
            <Stat icon={<CheckCircle2 size={19} />} value={loading ? "—" : String(completed).padStart(2, "0")} label="Hoàn thành" note="Đã bàn giao" />
            <Stat icon={<UsersRound size={19} />} value={loading ? "—" : String(clientCount).padStart(2, "0")} label="Khách hàng" note="Đã đồng hành" last />
          </div>
        </div>
        <div className="border-t border-zinc-900 bg-zinc-950 text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-3 px-3 text-center text-[7px] font-black uppercase tracking-[.08em] sm:px-5 sm:text-[9px] sm:tracking-[.12em] md:text-[10px] md:tracking-[.18em] lg:px-8">
            <span className="flex min-w-0 items-center justify-center gap-1 border-r border-white/15 px-1 py-4 sm:gap-2 sm:px-3"><CheckCircle2 size={12} className="shrink-0 text-[#ffb21c] sm:size-[14px]" /><span>Frontend chỉnh chu</span></span>
            <span className="flex min-w-0 items-center justify-center gap-1 border-r border-white/15 px-1 py-4 sm:gap-2 sm:px-3"><Layers3 size={12} className="shrink-0 text-[#ffb21c] sm:size-[14px]" /><span>Backend thực tế</span></span>
            <span className="flex min-w-0 items-center justify-center gap-1 px-1 py-4 sm:gap-2 sm:px-3"><Sparkles size={12} className="shrink-0 text-[#ffb21c] sm:size-[14px]" /><span>Responsive toàn diện</span></span>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#d98200]">Danh sách dự án</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">Khám phá sản phẩm.</h2>
            </div>
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm dự án, khách hàng, công nghệ..." className="h-14 w-full border border-zinc-900 bg-[#fff8e9] pl-12 pr-11 text-sm font-semibold outline-none focus:shadow-[4px_4px_0_#ffb21c]" />
              {search && <button onClick={() => setSearch("")} aria-label="Xóa tìm kiếm" className="absolute right-4 top-1/2 -translate-y-1/2"><X size={17} /></button>}
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between gap-3 border-y border-zinc-300 py-4 md:mb-10 md:items-start md:justify-start md:py-5">
            <button onClick={() => setFilterOpen(true)} className="flex items-center gap-3 border border-zinc-900 bg-[#ffb21c] px-4 py-2.5 text-[9px] font-black uppercase tracking-wider shadow-[3px_3px_0_#111] md:hidden">
              <Filter size={15} /> Bộ lọc
            </button>
            <span className="max-w-[52%] truncate text-right text-[9px] font-black uppercase tracking-wider text-zinc-500 md:hidden">Đang xem: <b className="text-[#d98200]">{activeTag}</b></span>
            <Filter size={17} className="mt-2 hidden shrink-0 text-[#d98200] md:block" />
            <div className="hidden flex-wrap gap-2 md:flex">
              {tags.map((tag) => <button key={tag} onClick={() => setActiveTag(tag)} className={`shrink-0 snap-start border border-zinc-900 px-4 py-2 text-[9px] font-black uppercase tracking-wider transition md:text-[10px] ${activeTag === tag ? "bg-zinc-950 text-white shadow-[3px_3px_0_#ffb21c]" : "bg-white hover:bg-[#fff8e9]"}`}>{tag}</button>)}
            </div>
          </div>

          <AnimatePresence>
            {filterOpen && <div className="fixed inset-0 z-[90] flex items-end md:hidden">
              <motion.button aria-label="Đóng bộ lọc" onClick={() => setFilterOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px]" />
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }} className="relative z-10 w-full border-t border-zinc-900 bg-[#fff8e9] p-5 shadow-[0_-8px_30px_rgba(0,0,0,.2)]">
                <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-zinc-300" />
                <div className="flex items-center justify-between border-b border-zinc-300 pb-4">
                  <div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#d98200]">Lọc dự án</p><h3 className="mt-1 text-xl font-black">Chọn một danh mục</h3></div>
                  <button onClick={() => setFilterOpen(false)} aria-label="Đóng" className="grid h-10 w-10 place-items-center border border-zinc-900 bg-white"><X size={18} /></button>
                </div>
                <div className="mt-5 grid max-h-[48vh] grid-cols-2 gap-2 overflow-y-auto pb-2">
                  {tags.map((tag) => <button key={tag} onClick={() => { setActiveTag(tag); setFilterOpen(false); }} className={`min-h-12 border border-zinc-900 px-3 py-3 text-left text-[9px] font-black uppercase leading-4 tracking-wider ${activeTag === tag ? "bg-zinc-950 text-white shadow-[3px_3px_0_#ffb21c]" : "bg-white"}`}>{tag}</button>)}
                </div>
              </motion.div>
            </div>}
          </AnimatePresence>

          {loading ? (
            <div className="grid min-h-80 place-items-center border border-dashed border-zinc-400"><div className="text-center"><Loader2 className="mx-auto animate-spin text-[#d98200]" size={34} /><p className="mt-4 text-xs font-black uppercase tracking-widest">Đang tải từ backend</p></div></div>
          ) : error ? (
            <Empty icon={<SlidersHorizontal size={30} />} title="Chưa kết nối được dữ liệu" text="Vui lòng tải lại trang hoặc thử lại sau." />
          ) : filtered.length === 0 ? (
            <Empty icon={<Search size={30} />} title="Không tìm thấy dự án" text="Thử đổi từ khóa hoặc chọn một nhóm khác." />
          ) : (
            <motion.div layout className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => <ProjectCard key={project._id} project={project} index={index} />)}
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-72 rounded-full border-[45px] border-[#ffb21c]/15" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.35fr_.65fr] lg:items-end lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">Đang nhận dự án mới</p>
            </div>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[.92] tracking-[-.06em] md:text-6xl lg:text-7xl">
              Bạn có một ý tưởng?<br />Hãy cùng biến nó thành <span className="text-[#d98200]">sản phẩm.</span>
            </h2>
          </div>
          <div className="border border-zinc-900 bg-white shadow-[7px_7px_0_#111]">
            <div className="flex items-start justify-between gap-5 border-b border-zinc-900 p-6">
              <div><p className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-400">Phản hồi dự kiến</p><p className="mt-2 text-lg font-black">Trong vòng 24 giờ</p></div>
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-zinc-900 bg-[#fff8e9]"><Sparkles size={19} className="text-[#d98200]" /></span>
            </div>
            <Link href="/contact" className="group flex items-center justify-between bg-[#ffb21c] px-6 py-5 text-xs font-black uppercase transition-colors hover:bg-zinc-950 hover:text-white">
              Trao đổi dự án
              <span className="grid h-9 w-9 place-items-center border border-zinc-900 bg-white text-zinc-950 transition-transform group-hover:translate-x-1"><ArrowRight size={17} /></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon, value, label, note, last = false }: { icon: React.ReactNode; value: string; label: string; note: string; last?: boolean }) {
  return <div className={`group grid grid-cols-[44px_1fr_auto] items-center gap-4 px-6 py-5 transition-colors hover:bg-[#fff8e9] ${last ? "" : "border-b border-zinc-900"}`}>
    <span className="grid h-11 w-11 place-items-center border border-zinc-900 bg-[#fff8e9] text-[#d98200] transition-colors group-hover:bg-[#ffb21c] group-hover:text-zinc-950">{icon}</span>
    <span><strong className="block text-xs font-black uppercase tracking-[.12em]">{label}</strong><small className="mt-1 block text-[10px] font-semibold text-zinc-400">{note}</small></span>
    <strong className="text-4xl font-black tracking-[-.06em] text-[#d98200]">{value}</strong>
  </div>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const progress = Math.max(0, Math.min(100, project.progress || 0));
  const date = project.createdAt ? new Date(project.createdAt).toLocaleDateString("vi-VN") : "Đang cập nhật";
  const priority = priorityText[project.priority || "medium"];
  return (
    <motion.article layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * .045, .3) }} className="group flex min-w-0 flex-col overflow-hidden border border-zinc-900 bg-white shadow-[6px_6px_0_#ffb21c] transition-transform duration-300 hover:-translate-y-2">
      <div className="relative aspect-video overflow-hidden border-b border-zinc-900 bg-amber-50">
        {project.image ? <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-zinc-300"><ImageIcon size={46} /></div>}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="max-w-[65%] truncate border border-zinc-900 bg-[#ffb21c] px-3 py-1.5 text-[9px] font-black uppercase tracking-wider">{project.status || "Đang cập nhật"}</span>
          <span className="border border-zinc-900 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-wider">{priority}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-zinc-950/75 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <Link href={`/projects/${project.slug}`} aria-label={`Xem ${project.name}`} className="border border-white bg-white p-3 text-zinc-950 hover:bg-[#ffb21c]"><Eye size={19} /></Link>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Mở website" className="border border-white bg-white p-3 text-zinc-950 hover:bg-[#ffb21c]"><ExternalLink size={19} /></a>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-[-.025em] group-hover:text-[#d98200]"><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
        <p className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-zinc-400"><UserRound size={12} />{project.client}</p>
        <div className="my-5 h-16 min-h-16 overflow-hidden">
          <p
            className="overflow-hidden text-sm text-zinc-600"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              lineClamp: 2,
              lineHeight: "32px",
              height: "64px",
              maxHeight: "64px",
            }}
          >{stripHtml(project.description) || "Thông tin dự án đang được cập nhật."}</p>
        </div>
        {project.tags && project.tags.length > 0 && <div className="mb-5 flex flex-wrap gap-1.5">{project.tags.slice(0, 3).map((tag) => <span key={tag} className="border border-zinc-300 bg-[#fff8e9] px-2 py-1 text-[9px] font-bold uppercase">{tag}</span>)}</div>}
        <div className="border-t border-zinc-300 pt-4">
          <div className="flex justify-between gap-3 text-[11px] font-black text-zinc-700"><span className="flex items-center gap-1"><DollarSign size={14} className="text-[#d98200]" />{(project.budget || 0).toLocaleString("vi-VN")}</span><span className="flex items-center gap-1"><CalendarDays size={14} className="text-[#d98200]" />{date}</span></div>
          <div className="mt-4 flex justify-between text-[9px] font-black uppercase tracking-wider text-zinc-400"><span>Tiến độ</span><span>{progress}%</span></div>
          <div className="mt-2 h-1.5 bg-zinc-100"><div className="h-full bg-[#ffb21c] transition-[width]" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
    </motion.article>
  );
}

function Empty({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="grid min-h-80 place-items-center border border-dashed border-zinc-400 bg-[#fff8e9]"><div className="max-w-sm px-6 text-center"><div className="mx-auto grid h-16 w-16 place-items-center border border-zinc-900 bg-white shadow-[4px_4px_0_#ffb21c]">{icon}</div><h3 className="mt-6 text-xl font-black">{title}</h3><p className="mt-2 text-sm text-zinc-600">{text}</p></div></div>;
}
