"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { sanitizeHtml } from "@/libs/sanitize";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Code2,
  DollarSign,
  ExternalLink,
  Github,
  ImageIcon,
  Layers3,
  Maximize2,
  Rocket,
  Share2,
  Sparkles,
  Target,
  UserRound,
  X,
} from "lucide-react";

interface Project {
  _id: string;
  name: string;
  slug: string;
  client: string;
  description?: string;
  content?: string;
  image?: string;
  gallery?: string[];
  category?: string;
  technologies?: string[];
  tags?: string[];
  createdAt?: string;
  liveUrl?: string;
  githubUrl?: string;
  budget?: number;
  progress?: number;
  priority?: "low" | "medium" | "high";
  status?: string;
}

const stripHtml = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const priorityLabel = { low: "Cơ bản", medium: "Tiêu chuẩn", high: "Ưu tiên" };

export default function ProjectDetailClient({ initialProject }: { initialProject: Project | null }) {
  const [project] = useState<Project | null>(initialProject);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading] = useState(false);
  const [failed] = useState(!initialProject);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [detailExpanded, setDetailExpanded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    setRelated([]);
  }, []);

  const images = useMemo(
    () => (project ? [project.image, ...(project.gallery || [])].filter((image): image is string => Boolean(image)) : []),
    [project],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((index) => (index === null ? null : (index + 1) % images.length));
      if (event.key === "ArrowLeft") setLightbox((index) => (index === null ? null : (index - 1 + images.length) % images.length));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", keydown);
    };
  }, [images.length, lightbox]);

  const share = async () => {
    if (!project) return;
    try {
      if (navigator.share) await navigator.share({ title: project.name, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Đã sao chép liên kết");
      }
    } catch {
      /* Người dùng đóng hộp chia sẻ */
    }
  };

  const scrollGallery = (direction: 1 | -1) => {
    galleryRef.current?.scrollBy({ left: galleryRef.current.clientWidth * 0.82 * direction, behavior: "smooth" });
  };

  if (loading) return <ProjectLoading />;
  if (failed || !project) return <NotFound />;

  const tags = project.tags || project.technologies || [];
  const progress = Math.max(0, Math.min(100, project.progress || 0));
  const date = project.createdAt ? new Date(project.createdAt).toLocaleDateString("vi-VN") : "Đang cập nhật";
  const description = stripHtml(project.description) || "Thông tin chi tiết của dự án đang được cập nhật.";

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <Toaster
        position="top-center"
        toastOptions={{ style: { border: "1px solid #18181b", borderRadius: 0, boxShadow: "4px 4px 0 #ffb21c", fontWeight: 700 } }}
      />
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[100] h-1 origin-left bg-[#ffb21c]" />

      <div className="sticky top-0 z-40 border-b border-zinc-900 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/projects" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] hover:text-[#d98200]">
            <ArrowLeft size={16} /> Tất cả dự án
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={share} aria-label="Chia sẻ" className="grid h-10 w-10 place-items-center border border-zinc-900 bg-white hover:bg-[#fff8e9]">
              <Share2 size={16} />
            </button>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center border border-zinc-900 bg-white hover:bg-[#fff8e9]">
                <Github size={17} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-2 border border-zinc-900 bg-[#ffb21c] px-4 text-[9px] font-black uppercase tracking-wider">
                Xem website <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      <section className="border-b border-zinc-900 bg-[#fff8e9] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.18em] shadow-[3px_3px_0_#ffb21c]">
                  <Code2 size={13} className="text-[#d98200]" /> Project case study
                </span>
                <span className="border border-zinc-900 bg-zinc-950 px-3 py-2 text-[8px] font-black uppercase tracking-wider text-white">
                  {project.status || "Đang cập nhật"}
                </span>
              </div>
              <h1 className="mt-8 max-w-5xl text-[clamp(2.8rem,5.3vw,5.25rem)] font-black leading-[1.02] tracking-[-.055em]">{project.name}</h1>
              <p className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-zinc-500">
                <UserRound size={15} className="text-[#d98200]" /> {project.client}
              </p>
            </div>
            <div className="border border-zinc-900 bg-white p-6 shadow-[7px_7px_0_#ffb21c]">
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#d98200]">Tổng quan nhanh</p>
              <div className="relative mt-4">
                <p className={`text-sm leading-7 text-zinc-600 ${summaryExpanded ? "" : "max-h-36 overflow-hidden"}`}>{description}</p>
                {!summaryExpanded && description.length > 260 && <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />}
              </div>
              {description.length > 260 && (
                <button onClick={() => setSummaryExpanded((value) => !value)} className="mt-4 inline-flex items-center gap-2 border-b border-zinc-900 pb-1 text-[9px] font-black uppercase tracking-[.14em] text-[#b85f00]">
                  {summaryExpanded ? "Thu gọn" : "Xem thêm"} <ArrowRight size={13} className={`transition-transform ${summaryExpanded ? "-rotate-90" : "rotate-90"}`} />
                </button>
              )}
              {tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="border border-zinc-300 bg-[#fff8e9] px-2.5 py-1.5 text-[8px] font-black uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative aspect-video overflow-hidden border border-zinc-900 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c]">
            {project.image ? <Image src={project.image} alt={project.name} fill priority sizes="100vw" className="object-cover" /> : <div className="grid h-full place-items-center text-zinc-300"><ImageIcon size={64} /></div>}
            {project.image && (
              <button onClick={() => setLightbox(0)} aria-label="Phóng to ảnh" className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center border border-zinc-900 bg-white shadow-[3px_3px_0_#ffb21c]">
                <Maximize2 size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <article>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">01 · Bài toán & giải pháp</p>
            <h2 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-.045em] md:text-6xl md:leading-[.98] md:tracking-[-.05em]">
              Không chỉ đẹp.<br />
              <span className="text-[#d98200]">Phải hoạt động tốt.</span>
            </h2>
            <div className="relative mt-8">
              <div className={`space-y-6 overflow-hidden text-sm leading-8 text-zinc-600 transition-[max-height] duration-500 md:text-base ${detailExpanded ? "max-h-[3000px]" : "max-h-64"}`}>
                <p>{description}</p>
                {project.content && stripHtml(project.content) !== description && <div className="project-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.content) }} />}
              </div>
              {!detailExpanded && <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fff8e9] to-transparent" />}
            </div>
            {(description.length > 420 || project.content) && (
              <button onClick={() => setDetailExpanded((value) => !value)} className="mt-5 inline-flex items-center gap-3 border border-zinc-900 bg-white px-5 py-3 text-[9px] font-black uppercase tracking-[.14em] shadow-[3px_3px_0_#ffb21c]">
                {detailExpanded ? "Thu gọn nội dung" : "Xem đầy đủ nội dung"} <ArrowRight size={14} className={`transition-transform ${detailExpanded ? "-rotate-90" : "rotate-90"}`} />
              </button>
            )}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Value icon={<Target size={19} />} title="Mục tiêu rõ ràng" text="Giải quyết đúng nhu cầu sử dụng và mục tiêu kinh doanh." />
              <Value icon={<Layers3 size={19} />} title="Có thể mở rộng" text="Cấu trúc sẵn sàng cho những giai đoạn phát triển tiếp theo." />
            </div>
          </article>
          <aside className="self-start border border-zinc-900 bg-zinc-950 text-white shadow-[7px_7px_0_#ffb21c] lg:sticky lg:top-24">
            <div className="border-b border-white/20 p-6">
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffb21c]">Thông tin dự án</p>
              <h3 className="mt-2 text-2xl font-black">Project facts</h3>
            </div>
            <Fact icon={<CalendarDays size={17} />} label="Ngày cập nhật" value={date} />
            <Fact icon={<DollarSign size={17} />} label="Ngân sách" value={`${(project.budget || 0).toLocaleString("vi-VN")} VNĐ`} />
            <Fact icon={<Sparkles size={17} />} label="Mức ưu tiên" value={priorityLabel[project.priority || "medium"]} />
            <div className="p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Tiến độ</p>
                  <p className="mt-2 text-sm font-bold">Mức độ hoàn thiện</p>
                </div>
                <strong className="text-4xl font-black text-[#ffb21c]">{progress}%</strong>
              </div>
              <div className="mt-5 h-2 border border-white/30 bg-white/10">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full bg-[#ffb21c]" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {images.length > 1 && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">02 · Giao diện thực tế</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">Bên trong sản phẩm.</h2>
              </div>
              <div className="flex items-end gap-5">
                <p className="hidden max-w-sm text-sm leading-7 text-zinc-500 lg:block">Một số màn hình và chi tiết tiêu biểu trong quá trình hoàn thiện dự án.</p>
                <div className="flex gap-2">
                  <button onClick={() => scrollGallery(-1)} aria-label="Ảnh trước" className="grid h-11 w-11 place-items-center border border-zinc-900 bg-white hover:bg-[#ffb21c]"><ChevronLeft size={19} /></button>
                  <button onClick={() => scrollGallery(1)} aria-label="Ảnh tiếp theo" className="grid h-11 w-11 place-items-center border border-zinc-900 bg-[#ffb21c] hover:bg-zinc-950 hover:text-white"><ChevronRight size={19} /></button>
                </div>
              </div>
            </div>
            <div ref={galleryRef} className="project-gallery-scroll mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
              {images.slice(1).map((image, index) => (
                <button key={`${image}-${index}`} onClick={() => setLightbox(index + 1)} className="group relative aspect-video w-[88%] shrink-0 snap-start overflow-hidden border border-zinc-900 bg-[#fff8e9] text-left sm:w-[72%] lg:w-[calc(50%_-_10px)]">
                  <Image src={image} alt={`${project.name} - ${index + 2}`} fill sizes="(max-width: 768px) 88vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 border border-zinc-900 bg-white px-3 py-1.5 text-[8px] font-black tracking-wider shadow-[2px_2px_0_#ffb21c]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center border border-zinc-900 bg-white shadow-[3px_3px_0_#ffb21c] transition-transform group-hover:-translate-y-1"><Maximize2 size={17} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-y border-zinc-900 bg-[#fff8e9] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98200]">Khám phá thêm</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">Dự án liên quan.</h2>
              </div>
              <Link href="/projects" className="hidden items-center gap-2 text-[10px] font-black uppercase tracking-wider md:flex">Xem tất cả <ArrowRight size={15} /></Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">{related.map((item) => <RelatedCard key={item._id} project={item} />)}</div>
          </div>
        </section>
      )}

      <section className="bg-zinc-950 py-16 text-white md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-9 px-5 md:flex-row md:items-end lg:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#ffb21c]">Dự án tiếp theo</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[.95] tracking-[-.055em] md:text-6xl">
              Bạn muốn một sản phẩm<br />được làm kỹ như thế này?
            </h2>
          </div>
          <Link href="/contact" className="flex items-center gap-7 border border-white bg-[#ffb21c] px-7 py-5 text-xs font-black uppercase text-zinc-950 shadow-[5px_5px_0_#fff]">
            Trao đổi ngay <Rocket size={18} />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && images[lightbox] && (
          <Lightbox
            images={images}
            index={lightbox}
            close={() => setLightbox(null)}
            previous={() => setLightbox((lightbox - 1 + images.length) % images.length)}
            next={() => setLightbox((lightbox + 1) % images.length)}
          />
        )}
      </AnimatePresence>
      <style jsx global>{`.project-rich-content p{margin-top:1rem}.project-rich-content ul,.project-rich-content ol{margin:1rem 0;padding-left:1.25rem}.project-rich-content ul{list-style:disc}.project-rich-content ol{list-style:decimal}.project-rich-content a{color:#b85f00;text-decoration:underline}.project-gallery-scroll{-ms-overflow-style:none;scrollbar-width:none}.project-gallery-scroll::-webkit-scrollbar{display:none}`}</style>
    </main>
  );
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="border border-zinc-900 bg-white p-5">
      <span className="grid h-11 w-11 place-items-center border border-zinc-900 bg-[#ffb21c]">{icon}</span>
      <h3 className="mt-5 text-lg font-black">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-zinc-500">{text}</p>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[42px_1fr] gap-4 border-b border-white/20 p-6">
      <span className="grid h-10 w-10 place-items-center border border-[#ffb21c] text-[#ffb21c]">{icon}</span>
      <div>
        <p className="text-[8px] font-black uppercase tracking-[.16em] text-zinc-500">{label}</p>
        <p className="mt-1.5 text-sm font-black">{value}</p>
      </div>
    </div>
  );
}

function RelatedCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group overflow-hidden border border-zinc-900 bg-white shadow-[5px_5px_0_#ffb21c]">
      <div className="relative aspect-video overflow-hidden border-b border-zinc-900 bg-amber-50">
        {project.image ? <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center"><ImageIcon className="text-zinc-300" /></div>}
      </div>
      <div className="p-5">
        <p className="text-[8px] font-black uppercase tracking-[.15em] text-[#d98200]">{project.status || "Dự án"}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight group-hover:text-[#d98200]">{project.name}</h3>
        <p className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase text-zinc-400"><UserRound size={12} />{project.client}</p>
      </div>
    </Link>
  );
}

function Lightbox({ images, index, close, previous, next }: { images: string[]; index: number; close: () => void; previous: () => void; next: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] grid place-items-center bg-zinc-950/95 p-4 md:p-10">
      <button onClick={close} aria-label="Đóng" className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center border border-white bg-zinc-950 text-white"><X size={20} /></button>
      <div className="relative h-full max-h-[82vh] w-full max-w-6xl">
        <Image src={images[index]} alt={`Ảnh dự án ${index + 1}`} fill sizes="100vw" className="object-contain" />
      </div>
      {images.length > 1 && (
        <>
          <button onClick={previous} aria-label="Ảnh trước" className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white bg-zinc-950 text-white md:left-8"><ChevronLeft /></button>
          <button onClick={next} aria-label="Ảnh tiếp theo" className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white bg-zinc-950 text-white md:right-8"><ChevronRight /></button>
        </>
      )}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 border border-white/30 bg-zinc-950 px-4 py-2 text-[9px] font-black tracking-wider text-white">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

function ProjectLoading() {
  return <LoadingSpinner fullScreen size="lg" label="Đang tải dự án" />;
}

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#fff8e9] px-5 text-center">
      <div>
        <span className="text-8xl font-black text-[#d98200]">404</span>
        <h1 className="mt-4 text-3xl font-black">Không tìm thấy dự án</h1>
        <p className="mt-3 text-sm text-zinc-500">Dự án có thể đã được đổi đường dẫn hoặc chưa được xuất bản.</p>
        <Link href="/projects" className="mt-7 inline-flex items-center gap-3 border border-zinc-900 bg-[#ffb21c] px-6 py-4 text-xs font-black uppercase shadow-[4px_4px_0_#111]">
          <ArrowLeft size={16} /> Trở lại portfolio
        </Link>
      </div>
    </div>
  );
}
