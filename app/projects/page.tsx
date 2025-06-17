"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  User,
  Tag,
  Eye,
  Monitor,
  Sparkles,
  Rocket,
  Globe,
  Code,
  Palette,
  Zap,
  Filter,
  Search,
  Grid3X3,
  List,
} from "lucide-react";
import toast from "react-hot-toast";
import Head from "next/head";

interface Project {
  _id: string;
  name: string;
  client: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  technologies: string[];
  completedAt: string;
  liveUrl?: string;
  featured?: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const categories = [
    "all",
    "website",
    "e-commerce",
    "landing-page",
    "web-app",
  ];
  const categoryLabels: Record<string, string> = {
    all: "Tất cả",
    website: "Website",
    "e-commerce": "E-commerce",
    "landing-page": "Landing Page",
    "web-app": "Web App",
  };

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { signal: controller.signal });
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          toast.error("Không thể tải danh sách dự án!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    return () => controller.abort();
  }, []);

  // Filter projects based on search and category
  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  // Pre-generate particle positions
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
    { left: 25, top: 40 },
    { left: 85, top: 75 },
  ];

  const stats = [
    {
      icon: Rocket,
      label: "Dự án hoàn thành",
      value: projects.length,
      color: "text-purple-400",
    },
    {
      icon: User,
      label: "Khách hàng hài lòng",
      value: "50+",
      color: "text-blue-400",
    },
    {
      icon: Globe,
      label: "Website đang hoạt động",
      value: "40+",
      color: "text-indigo-400",
    },
    {
      icon: Zap,
      label: "Năm kinh nghiệm",
      value: "3+",
      color: "text-pink-400",
    },
  ];

  return (
    <div>
      <Head>
        <title>Dự án đã thực hiện | VinhWorks</title>
        <meta
          name="description"
          content="Danh sách các dự án thực tế được thiết kế bởi VinhWorks. Tối ưu UI/UX, hiệu suất, chuẩn SEO."
        />
        <meta property="og:title" content="Dự án đã thực hiện | VinhWorks" />
        <meta
          property="og:description"
          content="Khám phá portfolio các dự án website chuyên nghiệp đã triển khai thành công."
        />
        <meta property="og:image" content="/seo-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/projects" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 rounded-full border-purple-500/30"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <motion.p
                className="mt-6 text-lg font-medium text-purple-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Đang tải dự án...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add CSS for grid animation */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>

      <section
        className={`relative min-h-screen px-4 py-20 pt-32 md:pt-28 lg:pt-24 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 transition-all duration-500 ${
          loading
            ? "blur-sm pointer-events-none select-none opacity-30"
            : "opacity-100"
        }`}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>

        {/* Dynamic Gradient Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute rounded-full w-96 h-96 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
              left: `${mousePosition.x * 0.02}px`,
              top: `${mousePosition.y * 0.02}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute rounded-full w-80 h-80 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              right: `${mousePosition.x * 0.015}px`,
              bottom: `${mousePosition.y * 0.015}px`,
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating Tech Elements */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden">
            {particlePositions.map((position, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-purple-400/20" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center md:mb-20"
          >
            {/* Header Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-purple-300 border rounded-full bg-purple-500/10 border-purple-500/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Portfolio dự án
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Dự án đã thực hiện 🚀
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl">
              Khám phá những dự án thực tế đã được triển khai thành công với
              thiết kế hiện đại, tối ưu hiệu suất và chuẩn SEO.
              <br />
              <span className="font-medium text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                Mỗi dự án đều mang dấu ấn riêng và giải pháp tối ưu!
              </span>
            </p>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 mb-16 md:grid-cols-4"
          >
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 text-center transition-all duration-300 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40"
                >
                  <IconComponent
                    className={`w-8 h-8 ${stat.color} mx-auto mb-3`}
                  />
                  <div className="mb-1 text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col items-center justify-between gap-6 p-6 border md:flex-row rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute text-purple-400 transform -translate-y-1/2 left-4 top-1/2"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm dự án..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="text-purple-400" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-slate-800"
                    >
                      {categoryLabels[category]}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 border bg-slate-700/50 rounded-2xl border-purple-500/30">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-purple-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-purple-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-center">
              <p className="text-gray-400">
                Hiển thị{" "}
                <span className="font-semibold text-purple-400">
                  {filteredProjects.length}
                </span>{" "}
                dự án
                {searchTerm && (
                  <span>
                    {" "}
                    cho từ khóa "
                    <span className="text-blue-400">{searchTerm}</span>"
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Enhanced Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`grid gap-8 mb-20 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            <AnimatePresence>
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`group relative overflow-hidden rounded-3xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40 transition-all duration-300 shadow-2xl ${
                    viewMode === "list" ? "flex flex-col md:flex-row" : ""
                  }`}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute z-10 px-3 py-1 text-xs font-medium text-white rounded-full top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                      ⭐ Nổi bật
                    </div>
                  )}

                  {/* Project Image */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list" ? "md:w-1/2" : "w-full aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={project.image || "/placeholder.jpg"}
                      alt={project.name}
                      className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3">
                        <Link href={`/projects/${project.slug}`}>
                          <button className="p-3 text-white transition-colors rounded-full bg-purple-500/80 backdrop-blur-sm hover:bg-purple-600/80">
                            <Eye size={20} />
                          </button>
                        </Link>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="p-3 text-white transition-colors rounded-full bg-blue-500/80 backdrop-blur-sm hover:bg-blue-600/80">
                              <ExternalLink size={20} />
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div
                    className={`p-6 md:p-8 ${
                      viewMode === "list"
                        ? "md:w-1/2 flex flex-col justify-center"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="mb-3 text-2xl font-bold text-white transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text">
                      {project.name}
                    </h2>

                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        Khách hàng: {project.client}
                      </span>
                    </div>

                    {project.description && (
                      <p className="mb-4 text-sm leading-relaxed text-gray-300 line-clamp-3">
                        {project.description}
                      </p>
                    )}

                    {/* Technologies */}
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-xs text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > 3 && (
                            <span className="px-3 py-1 text-xs text-gray-400 border rounded-full bg-gray-500/20 border-gray-500/30">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                    {/* Date */}
                    {project.completedAt && (
                      <div className="flex items-center gap-2 mb-6">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-gray-400">
                          {new Date(project.completedAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={`/projects/${project.slug}`}>
                          <button className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600">
                            <Eye size={16} />
                            <span>Xem chi tiết</span>
                          </button>
                        </Link>
                      </motion.div>

                      {project.liveUrl && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="flex items-center gap-2 px-4 py-2 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10">
                              <ExternalLink size={16} />
                              <span>Xem live</span>
                            </button>
                          </a>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <Search className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Không tìm thấy dự án
              </h3>
              <p className="mb-6 text-gray-400">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600"
              >
                Xem tất cả dự án
              </button>
            </motion.div>
          )}

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                🚀 Bạn muốn có một website như vậy?
              </h3>
              <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                Hãy để chúng tôi biến ý tưởng của bạn thành hiện thực với thiết
                kế hiện đại và công nghệ tiên tiến
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <button className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl">
                      <Rocket size={20} />
                      <span>Bắt đầu dự án của bạn</span>
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/pricing">
                    <button className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-purple-400 transition-all duration-300 border rounded-2xl border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50 hover:bg-purple-500/20 backdrop-blur-sm">
                      <Palette size={20} />
                      <span>Xem bảng giá</span>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
