"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  User,
  Eye,
  Sparkles,
  Rocket,
  Globe,
  Zap,
  Search,
  Grid3X3,
  List,
  Briefcase,
  Code2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

// --- TYPES ---
interface Project {
  _id: string;
  name: string;
  client: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  technologies: string[];
  completedAt?: string;
  createdAt: string;
  liveUrl?: string;
  featured?: boolean;
}

// --- CARD COMPONENT VỚI HIỆU ỨNG SPOTLIGHT ---
function ProjectCard({
  project,
  viewMode,
}: {
  project: Project;
  viewMode: "grid" | "list";
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const displayYear = new Date(
    project.completedAt || project.createdAt
  ).getFullYear();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseMove={handleMouseMove}
      className={`group relative h-full bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-500 ${
        viewMode === "list" ? "md:flex" : ""
      }`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute z-10 transition duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute z-20 top-4 left-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase rounded-full shadow-lg bg-amber-400"
          >
            <Sparkles size={12} /> Nổi bật
          </motion.div>
        </div>
      )}

      {/* Image Section */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          viewMode === "list" ? "md:w-2/5 h-64 md:h-auto" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={project.image || "/placeholder.jpg"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          unoptimized
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center gap-4 z-20">
          <Link href={`/projects/${project.slug}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-2 text-white"
            >
              <div className="p-4 bg-white rounded-full shadow-lg text-violet-600">
                <Eye size={24} />
              </div>
              <span className="text-xs font-bold tracking-wider uppercase drop-shadow-md">
                Chi tiết
              </span>
            </motion.button>
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-2 text-white"
              >
                <div className="p-4 bg-white rounded-full shadow-lg text-cyan-600">
                  <ExternalLink size={24} />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase drop-shadow-md">
                  Xem Live
                </span>
              </motion.button>
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`p-8 flex flex-col relative z-20 ${
          viewMode === "list" ? "md:w-3/5 justify-center" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase border rounded-lg bg-violet-50 text-violet-600 border-violet-100">
            {project.category || "Project"}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
            <Calendar size={12} /> {displayYear}
          </span>
        </div>

        <h3 className="mb-3 text-2xl font-black transition-colors text-slate-900 group-hover:text-violet-600 line-clamp-1">
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>

        <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-500">
          <User size={14} className="text-cyan-500" />
          <span className="truncate">
            Client: <span className="text-slate-700">{project.client}</span>
          </span>
        </div>

        <p className="flex-grow mb-6 text-sm font-medium leading-relaxed text-slate-500 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 mt-auto border-t border-slate-100">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-md border border-slate-200 group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-400 text-[11px] font-bold rounded-md border border-slate-200">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- MAIN CLIENT COMPONENT ---
export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "Website", label: "Website" },
    { id: "E-commerce", label: "E-commerce" },
    { id: "Landing Page", label: "Landing Page" },
    { id: "Mobile App", label: "Mobile App" },
  ];

  useEffect(() => {
    setMounted(true);
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setProjects(data);
        setFilteredProjects(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          toast.error("Không thể tải danh sách dự án!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) =>
          project.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(term) ||
          project.client.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term)
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  const stats = [
    {
      icon: Rocket,
      label: "Dự án hoàn thành",
      value: projects.length,
      color: "text-violet-500",
      bg: "bg-violet-100",
    },
    {
      icon: User,
      label: "Khách hàng",
      value: projects.length > 5 ? `${projects.length}+` : projects.length,
      color: "text-pink-500",
      bg: "bg-pink-100",
    },
    {
      icon: Globe,
      label: "Online",
      value: projects.filter((p) => p.liveUrl).length,
      color: "text-cyan-500",
      bg: "bg-cyan-100",
    },
    {
      icon: Zap,
      label: "Kinh nghiệm",
      value: "3+ Năm",
      color: "text-amber-500",
      bg: "bg-amber-100",
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <Toaster position="top-center" />
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-violet-200 selection:text-violet-900">
        {/* ================= BACKGROUND DECORATIONS ================= */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-fuchsia-200/40 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>

        <div className="container relative z-10 px-6 pt-32 pb-24 mx-auto max-w-7xl">
          {/* ================= HERO SECTION ================= */}
          <div className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold bg-white border rounded-full shadow-sm border-violet-100 text-violet-600 ring-1 ring-violet-50">
                <Briefcase size={14} /> <span>PORTFOLIO</span>
              </div>

              <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl text-slate-900">
                Dự án{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600">
                  Tiêu biểu
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed text-slate-600">
                Khám phá những giải pháp số sáng tạo mà chúng tôi đã thực hiện
                cho khách hàng.
              </p>
            </motion.div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 gap-4 mt-12 md:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 transition-all bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-md group hover:-translate-y-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="mb-1 text-2xl font-black text-slate-900">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-bold text-slate-500">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= TOOLBAR ================= */}
          <div className="sticky z-30 mb-12 top-24">
            <div className="flex flex-col items-center justify-between gap-4 p-4 transition-all border shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border-white/50 shadow-slate-200/50 lg:flex-row hover:shadow-xl">
              {/* Search */}
              <div className="relative w-full lg:w-96 group">
                <Search
                  className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-violet-600"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm dự án..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* Filter & View */}
              <div className="flex items-center w-full gap-4 pb-2 overflow-x-auto lg:w-auto lg:pb-0 no-scrollbar">
                <div className="flex p-1 border bg-slate-100/50 rounded-xl border-slate-200">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap relative z-10 ${
                        selectedCategory === cat.id
                          ? "text-violet-600 bg-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {cat.label}
                      {selectedCategory === cat.id && (
                        <motion.div
                          layoutId="activeFilter"
                          className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex p-1 border bg-slate-100/50 rounded-xl border-slate-200 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-violet-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Grid3X3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-white text-violet-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PROJECTS GRID ================= */}
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[2rem] h-[450px] animate-pulse border border-slate-100 shadow-sm"
                />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-white rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-slate-50">
                <Code2 className="text-slate-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Không tìm thấy dự án nào
              </h3>
              <p className="mt-2 text-slate-500">
                Thử tìm kiếm với từ khóa khác xem sao.
              </p>
            </motion.div>
          ) : (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    viewMode={viewMode}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* ================= CTA SECTION ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 relative rounded-[3rem] bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-12 text-center overflow-hidden shadow-2xl shadow-violet-100 border border-violet-100"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

            <div className="relative z-10">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-white border border-white shadow-xl rounded-3xl shadow-violet-200/50">
                <Rocket size={40} className="text-violet-600" />
              </div>

              <h2 className="mb-6 text-3xl font-black md:text-5xl text-zinc-900">
                Bạn đã sẵn sàng <br />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  bứt phá doanh thu?
                </span>
              </h2>

              <p className="max-w-2xl mx-auto mb-10 text-lg font-medium text-zinc-500">
                Đừng để ý tưởng tuyệt vời của bạn chỉ nằm trên giấy. Hãy để
                chúng tôi biến nó thành hiện thực ngay hôm nay.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold text-white transition-all shadow-lg bg-violet-600 shadow-violet-200 rounded-xl hover:bg-violet-700 sm:w-auto"
                  >
                    Bắt đầu ngay <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 font-bold transition-all bg-white border-2 text-zinc-600 rounded-xl border-zinc-200 hover:border-violet-200 hover:text-violet-600 hover:shadow-md sm:w-auto"
                  >
                    Xem bảng giá
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
