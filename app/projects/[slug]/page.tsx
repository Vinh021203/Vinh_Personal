"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  ZoomIn,
  X,
  Github,
  Globe,
  Star,
  ArrowRight,
  Award,
  Rocket,
  Calendar,
  DollarSign,
  Activity,
  Tag,
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Project {
  _id: string;
  name: string;
  slug: string;
  client: string;
  description: string;
  content?: string;
  image: string;
  gallery?: string[];
  category?: string;
  technologies?: string[];
  tags?: string[];
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  budget?: number;
  progress?: number;
  priority?: "low" | "medium" | "high";
  status?: string;
  duration?: string;
  teamSize?: number;
}

const STATUS_COLOR: Record<string, string> = {
  "Hoàn thành": "bg-green-50 text-green-600 border-green-200",
  "Đang triển khai": "bg-blue-50 text-blue-600 border-blue-200",
  "Đang thực hiện": "bg-blue-50 text-blue-600 border-blue-200",
  "Tạm dừng": "bg-amber-50 text-amber-600 border-amber-200",
  "Hủy bỏ": "bg-red-50 text-red-600 border-red-200",
};

const PRIORITY_COLOR: Record<string, string> = {
  high: "bg-red-50 text-red-600 border-red-200",
  medium: "bg-amber-50 text-amber-600 border-amber-200",
  low: "bg-blue-50 text-blue-600 border-blue-200",
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false); // ← NEW

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data: Project[] = await res.json();
        const current = data.find((p) => p.slug === slug);
        if (current) {
          setProject(current);
          setRelated(data.filter((p) => p.slug !== slug).slice(0, 3));
        } else toast.error("Không tìm thấy dự án!");
      } catch {
        toast.error("Lỗi khi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const allImages = project
    ? [project.image, ...(project.gallery ?? [])].filter(Boolean)
    : [];
  const images = allImages.length > 0 ? allImages : ["/placeholder.jpg"];

  const prev = () =>
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  const handleShare = () => {
    if (navigator.share && project) {
      navigator.share({ title: project.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép link!");
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-400 animate-pulse">
            Đang tải...
          </p>
        </div>
      </div>
    );

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-500">
        Không tìm thấy dự án
      </div>
    );

  const tags = project.tags ?? project.technologies ?? [];
  const statusLabel = project.status ?? "Đang triển khai";

  const hasUniqueContent =
    project.content &&
    project.content.trim() !== "" &&
    project.content.trim() !== project.description.trim();

  return (
    <>
      <Toaster position="top-center" />

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 origin-left z-[100]"
      />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        {/* ── NAV ── */}
        <nav className="sticky top-0 z-50 px-6 py-4 bg-white/90 backdrop-blur-xl border-b border-slate-100">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link href="/projects">
              <motion.button
                whileHover={{ x: -3 }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
              >
                <ArrowLeft size={16} /> Quay lại
              </motion.button>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 text-slate-500 bg-white border border-slate-200 rounded-full hover:text-orange-600 hover:border-orange-300 transition-all"
              >
                <Share2 size={17} />
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-all"
                >
                  <Globe size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
          {/* ── HERO ── */}
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 lg:col-span-3"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full border ${STATUS_COLOR[statusLabel] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                >
                  {statusLabel}
                </span>
                {project.priority && (
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border capitalize ${PRIORITY_COLOR[project.priority] ?? ""}`}
                  >
                    {project.priority}
                  </span>
                )}
                {project.featured && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full">
                    <Star size={11} fill="currentColor" /> Featured
                  </span>
                )}
                {(project.category ?? tags[0]) && (
                  <span className="px-3 py-1 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-full">
                    {project.category ?? tags[0]}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {project.name}
              </h1>

              {/* ── DESCRIPTION + XEM THÊM ── */}
              <div className="relative">
                {/* Nội dung: clamp khi thu gọn, full khi mở */}
                <AnimatePresence initial={false}>
                  <motion.div
                    key={descExpanded ? "expanded" : "collapsed"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`text-base leading-7 text-slate-600
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
                      [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
                      [&_b]:font-bold [&_strong]:font-bold [&_i]:italic
                      ${!descExpanded ? "line-clamp-3" : ""}`}
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </AnimatePresence>

                {/* Gradient fade khi thu gọn */}
                {!descExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
                )}

                {/* Nút toggle */}
                <button
                  onClick={() => setDescExpanded((v) => !v)}
                  className="mt-2 flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors group"
                >
                  {descExpanded ? (
                    <>
                      <ChevronUp
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5"
                      />
                      Thu gọn
                    </>
                  ) : (
                    <>
                      <ChevronDown
                        size={14}
                        className="transition-transform group-hover:translate-y-0.5"
                      />
                      Xem thêm
                    </>
                  )}
                </button>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-orange-400" />
                  <strong className="text-slate-700">{project.client}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-blue-400" />
                  {new Date(project.createdAt).toLocaleDateString("vi-VN")}
                </span>
                {project.budget ? (
                  <span className="flex items-center gap-1.5">
                    <DollarSign size={14} className="text-green-500" />
                    {project.budget.toLocaleString()} VNĐ
                  </span>
                ) : null}
              </div>

              {/* Progress bar */}
              {project.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                    <span className="flex items-center gap-1">
                      <Activity size={12} /> Tiến độ
                    </span>
                    <span className="text-orange-600">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-full rounded-full ${project.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-orange-400 to-amber-400"}`}
                    />
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Tag size={12} /> Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-orange-300 hover:text-orange-600 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-orange-600 hover:-translate-y-0.5 transition-all shadow-md"
                  >
                    <ExternalLink size={16} /> Xem website
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-orange-400 hover:text-orange-600 transition-all"
                  >
                    <Github size={16} /> Source Code
                  </a>
                )}
              </div>
            </motion.div>

            {/* Right: Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="bg-white border border-orange-100 rounded-[1.5rem] p-6 shadow-sm space-y-1">
                <h3 className="flex items-center gap-2 text-base font-black text-slate-800 mb-2">
                  <Award size={18} className="text-amber-500" /> Thông tin dự án
                </h3>
                {[
                  {
                    label: "Khách hàng",
                    value: project.client,
                    icon: <User size={14} className="text-orange-400" />,
                  },
                  {
                    label: "Ngày tạo",
                    value: new Date(project.createdAt).toLocaleDateString(
                      "vi-VN",
                    ),
                    icon: <Calendar size={14} className="text-blue-400" />,
                  },
                  {
                    label: "Trạng thái",
                    value: statusLabel,
                    icon: <CheckCircle2 size={14} className="text-green-500" />,
                  },
                  ...(project.budget
                    ? [
                        {
                          label: "Ngân sách",
                          value: `${project.budget.toLocaleString()} VNĐ`,
                          icon: (
                            <DollarSign size={14} className="text-green-500" />
                          ),
                        },
                      ]
                    : []),
                  ...(project.progress !== undefined
                    ? [
                        {
                          label: "Tiến độ",
                          value: `${project.progress}%`,
                          icon: (
                            <Activity size={14} className="text-purple-500" />
                          ),
                        },
                      ]
                    : []),
                ].map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-3 border-t border-slate-50"
                  >
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                      {icon}
                      {label}
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-[1.5rem] p-6 text-white shadow-lg shadow-orange-200">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="white"
                      className="text-white"
                    />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed opacity-95 mb-4">
                  "Đội ngũ làm việc cực kỳ chuyên nghiệp. Sản phẩm vượt xa mong
                  đợi về cả thẩm mỹ lẫn hiệu năng."
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-black">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-bold">CEO TechCorp</p>
                    <p className="text-[10px] text-orange-100 uppercase tracking-wider">
                      Client Partner
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── GALLERY ── */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-xl font-black text-slate-800">
              Hình ảnh dự án
            </h2>

            <div
              className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={images[activeIdx]}
                alt={project.name}
                width={1600}
                height={900}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                unoptimized
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-all">
                <div className="p-3 bg-white/90 rounded-full shadow-lg">
                  <ZoomIn size={24} className="text-orange-600" />
                </div>
              </div>
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-all"
                  >
                    <ChevronLeft size={20} className="text-slate-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-all"
                  >
                    <ChevronRight size={20} className="text-slate-700" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIdx(i);
                        }}
                        className={`h-2 rounded-full transition-all ${i === activeIdx ? "bg-white w-5" : "bg-white/50 w-2"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${idx === activeIdx ? "border-orange-400 ring-2 ring-orange-200" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.section>

          {/* ── CHI TIẾT TRIỂN KHAI ── */}
          {hasUniqueContent && (
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-orange-100 rounded-[1.5rem] p-8 shadow-sm"
            >
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <Rocket size={20} className="text-orange-500" /> Chi tiết triển
                khai
              </h2>
              <div
                className="text-sm leading-7 text-slate-600 space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_b]:font-bold [&_strong]:font-bold [&_h3]:font-black [&_h3]:text-slate-800 [&_h3]:text-base [&_h3]:mt-4 [&_i]:italic [&_u]:underline"
                dangerouslySetInnerHTML={{ __html: project.content! }}
              />
            </motion.section>
          )}

          {/* ── RELATED PROJECTS ── */}
          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-800">
                  Dự án liên quan
                </h2>
                <Link
                  href="/projects"
                  className="flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700"
                >
                  Xem tất cả <ArrowRight size={15} />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {related.map((item) => (
                  <Link key={item._id} href={`/projects/${item.slug}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
                    >
                      <div className="relative aspect-video bg-slate-100">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-bold text-orange-500 uppercase mb-1">
                          {item.category ?? "Project"}
                        </p>
                        <h4 className="font-bold text-slate-800 line-clamp-1 mb-1">
                          {item.name}
                        </h4>
                        <p
                          className="text-xs text-slate-500 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-10 text-center text-white shadow-xl"
          >
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/30">
              <Rocket size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-black mb-3">Bạn có dự án tương tự?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Hãy để chúng tôi biến ý tưởng của bạn thành sản phẩm thực tế. Liên
              hệ ngay để được tư vấn miễn phí.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30"
                >
                  Bắt đầu ngay <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all"
                >
                  Xem portfolio
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              <X size={22} className="text-white" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIdx]}
                alt="Preview"
                width={1920}
                height={1080}
                className="object-contain w-full h-auto"
                unoptimized
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-white/60 bg-black/40 px-3 py-1 rounded-full">
                {activeIdx + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
