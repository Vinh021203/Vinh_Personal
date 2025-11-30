"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  ZoomIn,
  X,
  Code,
  Globe,
  Star,
  ArrowRight,
  Github,
  Award,
  Rocket,
  Calendar,
  Users,
} from "lucide-react";
import Head from "next/head";

// --- Interface khớp với Backend ---
interface Project {
  _id: string;
  name: string;
  slug: string;
  client: string;
  description: string; // Mô tả ngắn
  content?: string; // Nội dung chi tiết (Markdown)
  image: string; // Ảnh đại diện (Thumbnail)
  gallery?: string[]; // Mảng ảnh phụ
  category?: string;
  technologies?: string[]; // Hoặc tags
  tags?: string[];
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  budget?: number;
  progress?: number;
  // Các trường bổ sung nếu backend có, nếu không sẽ dùng fallback
  duration?: string;
  teamSize?: number;
  completedAt?: string;
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- FETCH DATA ---
  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        // Gọi API lấy danh sách (hoặc API lấy chi tiết theo slug nếu bạn đã viết)
        // Ở đây giả sử gọi /api/projects và lọc client-side (tốt nhất nên có API getBySlug)
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");

        const data: Project[] = await res.json();
        const current = data.find((p) => p.slug === slug);

        if (current) {
          setProject(current);
          // Lấy dự án liên quan (cùng category, trừ dự án hiện tại)
          const relatedProjects = data
            .filter(
              (p) =>
                p.slug !== slug &&
                // Logic gợi ý: cùng category hoặc ngẫu nhiên
                (p.category === current.category || !current.category)
            )
            .slice(0, 3);
          setRelated(relatedProjects);
        } else {
          toast.error("Không tìm thấy dự án này!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  // --- PREPARE GALLERY IMAGES ---
  // Kết hợp ảnh chính (thumbnail) và ảnh gallery thành một danh sách để hiển thị
  const galleryImages = project
    ? [project.image, ...(project.gallery || [])].filter(Boolean)
    : [];

  // Nếu không có ảnh nào thì dùng placeholder
  const displayImages =
    galleryImages.length > 0 ? galleryImages : ["/placeholder.jpg"];

  const handleShare = () => {
    if (navigator.share && project) {
      navigator.share({
        title: project.name,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép link dự án!");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-4 border-4 border-purple-200 rounded-full border-t-purple-600 animate-spin"></div>
          <p className="font-bold text-purple-600 animate-pulse">
            Loading Project...
          </p>
        </div>
      </div>
    );
  }

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );

  return (
    <>
      {/* Có thể dùng Next SEO hoặc Metadata API ở layout cha */}
      <Head>
        <title>{project.name} | VinhWorks</title>
        <meta name="description" content={project.description} />
      </Head>
      <Toaster position="top-center" />

      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-purple-200 selection:text-purple-900">
        {/* Background Decoration */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 transition-all border-b shadow-sm border-slate-200/60 bg-white/90 backdrop-blur-xl">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <Link href="/projects">
              <motion.button
                whileHover={{ x: -3 }}
                className="flex items-center gap-2 px-4 py-2 font-bold transition-all border border-transparent rounded-full text-slate-600 bg-slate-100/50 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
              >
                <div className="p-1 bg-white rounded-full shadow-sm">
                  <ArrowLeft size={16} />
                </div>
                <span className="text-sm">Quay lại</span>
              </motion.button>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-2.5 text-slate-500 bg-white border border-slate-200 rounded-full hover:text-purple-600 hover:border-purple-200 hover:shadow-md transition-all"
                title="Chia sẻ"
              >
                <Share2 size={18} />
              </motion.button>

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-200 transition-all"
                >
                  <Globe size={16} />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        </nav>

        <div className="relative z-10 px-6 pt-32 pb-24">
          <div className="mx-auto max-w-7xl">
            {/* ================= HERO SECTION ================= */}
            <div className="grid gap-12 mb-24 lg:grid-cols-12 lg:gap-20">
              {/* Left: Project Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 lg:col-span-7"
              >
                <div className="flex flex-wrap items-center gap-3">
                  {/* Category (Lấy từ tags[0] nếu không có category riêng) */}
                  <span className="px-3 py-1 text-xs font-bold tracking-wider text-purple-600 uppercase border border-purple-200 rounded-lg bg-purple-50">
                    {project.category ||
                      (project.tags && project.tags[0]) ||
                      "Project"}
                  </span>
                  {project.featured && (
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider uppercase border rounded-lg text-amber-600 bg-amber-50 border-amber-200"
                    >
                      <Star size={12} fill="currentColor" /> Featured
                    </motion.span>
                  )}
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  {project.name}
                </h1>

                <p className="text-xl font-medium leading-relaxed text-slate-600">
                  {project.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 py-8 border-slate-200 sm:grid-cols-4 border-y">
                  <StatItem label="Khách hàng" value={project.client} />
                  <StatItem
                    label="Thời gian"
                    value={project.duration || "N/A"}
                  />
                  <StatItem
                    label="Team Size"
                    value={`${project.teamSize || 1} người`}
                  />
                  <StatItem
                    label="Năm"
                    value={new Date(project.createdAt).getFullYear().toString()}
                  />
                </div>

                {/* Tech Stack (Sử dụng tags từ DB) */}
                {project.tags && project.tags.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wider uppercase text-slate-900">
                      <Code size={16} className="text-purple-500" />{" "}
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ y: -3, backgroundColor: "#F3E8FF" }}
                          className="px-4 py-2 text-sm font-bold bg-white border shadow-sm cursor-default border-slate-200 rounded-xl text-slate-600 hover:border-purple-200 hover:text-purple-600"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-8 py-4 font-bold text-white transition-all shadow-xl bg-slate-900 rounded-2xl hover:bg-purple-600 hover:shadow-purple-200 hover:-translate-y-1"
                    >
                      Xem Website <ExternalLink size={18} />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-8 py-4 font-bold transition-all bg-white border text-slate-900 rounded-2xl border-slate-200 hover:border-purple-300 hover:text-purple-600"
                    >
                      Source Code <Github size={18} />
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Right: Highlight Stats & Quote */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 lg:col-span-5"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="flex items-center gap-2 mb-6 text-xl font-black text-slate-900">
                    <Award className="text-amber-500" /> Kết quả đạt được
                  </h3>
                  <div className="space-y-4">
                    {/* Hiển thị Budget nếu có */}
                    {project.budget && (
                      <ResultRow
                        label="Ngân sách"
                        value={`$${project.budget.toLocaleString()}`}
                        color="text-green-500"
                      />
                    )}
                    {/* Hiển thị Progress nếu có */}
                    {project.progress !== undefined && (
                      <ResultRow
                        label="Tiến độ"
                        value={`${project.progress}%`}
                        color="text-blue-500"
                      />
                    )}
                    <ResultRow
                      label="User Satisfaction"
                      value="5.0/5"
                      color="text-purple-500"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-purple-200 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <QuoteContent />
                </div>
              </motion.div>
            </div>

            {/* ================= GALLERY SECTION (Ảnh thật từ DB) ================= */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              {/* Ảnh chính lớn */}
              <div
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white bg-slate-50 mb-8 group cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={displayImages[activeImageIndex]}
                  alt={project.name}
                  width={1600}
                  height={900}
                  className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  unoptimized // Fix lỗi 400 Cloudinary
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center transition-all opacity-0 bg-black/0 group-hover:bg-black/10 group-hover:opacity-100">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    className="p-4 rounded-full shadow-lg bg-white/90 backdrop-blur"
                  >
                    <ZoomIn size={32} className="text-purple-600" />
                  </motion.div>
                </div>
              </div>

              {/* Thumbnail list (chỉ hiện nếu có nhiều hơn 1 ảnh) */}
              {displayImages.length > 1 && (
                <div className="flex gap-4 pb-4 overflow-x-auto no-scrollbar">
                  {displayImages.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      whileHover={{ scale: 1.05 }}
                      className={`relative flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-purple-500 ring-2 ring-purple-200"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ================= CONTENT DETAILS (Markdown) ================= */}
            <div className="max-w-4xl mx-auto mb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-px bg-slate-200"></div>
                <h2 className="text-3xl font-black tracking-tight text-center uppercase text-slate-900">
                  Chi tiết triển khai
                </h2>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              <article className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-8 prose-a:text-purple-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-xl prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-2 prose-code:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.content ||
                    (project.description
                      ? `### Giới thiệu \n\n ${project.description} \n\n _(Nội dung chi tiết đang được cập nhật)_`
                      : "Nội dung chi tiết đang được cập nhật...")}
                </ReactMarkdown>
              </article>
            </div>

            {/* ================= RELATED PROJECTS ================= */}
            {related.length > 0 && (
              <div className="pt-24 mb-24 border-t border-slate-200">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-black text-slate-900">
                    Dự án liên quan
                  </h3>
                  <Link
                    href="/projects"
                    className="flex items-center gap-1 font-bold text-purple-600 hover:text-purple-700"
                  >
                    Xem tất cả <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item._id}
                      href={`/projects/${item.slug}`}
                      className="block h-full group"
                    >
                      <motion.div
                        whileHover={{ y: -10 }}
                        className="rounded-[2rem] overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all h-full flex flex-col"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-purple-50">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col flex-grow p-6">
                          <div className="mb-2 text-xs font-bold tracking-wider text-purple-500 uppercase">
                            {item.category || "Project"}
                          </div>
                          <h4 className="mb-2 text-xl font-bold transition-colors text-slate-900 group-hover:text-purple-600">
                            {item.name}
                          </h4>
                          <p className="flex-grow text-sm text-slate-500 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ================= CTA SECTION ================= */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 relative rounded-[3rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 p-12 text-center overflow-hidden shadow-2xl shadow-purple-200 border border-purple-500"
            >
              <div className="absolute inset-0 bg-[url('/grid-white.svg')] opacity-[0.1]" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 border shadow-xl bg-white/10 border-white/20 rounded-3xl backdrop-blur-md">
                  <Rocket size={40} className="text-white" />
                </div>
                <h2 className="mb-6 text-3xl font-black text-white md:text-5xl">
                  Bạn đã sẵn sàng <br />{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-200">
                    bứt phá doanh thu?
                  </span>
                </h2>
                <p className="max-w-2xl mx-auto mb-10 text-lg font-medium text-purple-100">
                  Đừng để ý tưởng tuyệt vời của bạn chỉ nằm trên giấy. Hãy để
                  chúng tôi biến nó thành hiện thực ngay hôm nay.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold text-purple-600 transition-all bg-white shadow-lg rounded-2xl hover:bg-purple-50 sm:w-auto"
                    >
                      Bắt đầu ngay <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                  <Link href="/pricing">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-4 font-bold text-white transition-all bg-transparent border-2 rounded-2xl border-white/30 hover:bg-white/10 hover:border-white sm:w-auto"
                    >
                      Xem bảng giá
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= LIGHTBOX ================= */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setLightboxOpen(false)}
            >
              <button className="absolute p-3 text-purple-600 transition-colors rounded-full top-6 right-6 bg-purple-50 hover:bg-purple-100">
                <X size={24} />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative w-full max-h-full overflow-hidden shadow-2xl max-w-7xl rounded-3xl shadow-purple-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={displayImages[activeImageIndex]}
                  alt="Preview"
                  width={1920}
                  height={1080}
                  className="object-contain w-full h-auto"
                  unoptimized
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

// --- Sub-components ---
function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold tracking-wider uppercase text-slate-400">
        {label}
      </p>
      <p className="text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ResultRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 transition-colors border border-slate-100 bg-slate-50 rounded-2xl hover:bg-purple-50 hover:border-purple-100">
      <span className="font-bold text-slate-500">{label}</span>
      <span className={`text-2xl font-black ${color}`}>{value}</span>
    </div>
  );
}

function QuoteContent() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="mb-6">
        <div className="flex gap-1 mb-4 text-amber-300">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={20} fill="currentColor" />
          ))}
        </div>
        <p className="text-lg italic font-medium leading-relaxed opacity-95">
          "Đội ngũ làm việc cực kỳ chuyên nghiệp và tận tâm. Sản phẩm cuối cùng
          vượt xa mong đợi của chúng tôi về cả thẩm mỹ lẫn hiệu năng."
        </p>
      </div>
      <div className="flex items-center gap-4 pt-6 border-t border-white/20">
        <div className="flex items-center justify-center w-12 h-12 text-xl font-bold rounded-full bg-white/20 backdrop-blur-sm">
          C
        </div>
        <div>
          <p className="font-bold text-white">CEO TechCorp</p>
          <p className="text-xs tracking-wider text-purple-100 uppercase">
            Client Partner
          </p>
        </div>
      </div>
    </div>
  );
}
