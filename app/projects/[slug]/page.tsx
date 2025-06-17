"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Tag,
  Share2,
  Eye,
  ZoomIn,
  X,
  Clock,
  Code,
  Globe,
  Sparkles,
  ChevronRight,
  Monitor,
  Rocket,
  Star,
  MessageCircle,
  ArrowRight,
  Play,
  Download,
  Github,
  Figma,
  Award,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";
import Head from "next/head";

interface Project {
  _id: string;
  name: string;
  client: string;
  description: string;
  content: string;
  image: string;
  slug: string;
  category: string;
  technologies: string[];
  createdAt: string;
  completedAt: string;
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  tags?: string[];
  featured?: boolean;
  duration?: string;
  teamSize?: number;
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        const current = data.find((p: Project) => p.slug === slug);
        setProject(current);
        setRelated(
          data
            .filter(
              (p: Project) =>
                p.slug !== slug && p.category === current?.category
            )
            .slice(0, 3)
        );
      } catch {
        toast.error("Không thể tải thông tin dự án!");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  // Pre-generate particle positions
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
  ];

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

  // Mock additional images for carousel
  const projectImages = [
    project?.image || "/placeholder.jpg",
    "/placeholder.jpg",
    "/placeholder.jpg",
    "/placeholder.jpg",
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
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
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20">
            <X className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-white">
            Dự án không tồn tại
          </h1>
          <p className="mb-6 text-gray-400">
            Dự án bạn tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/projects">
            <button className="px-6 py-3 text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600">
              Quay lại danh sách dự án
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{project.name} | VinhWorks</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.name} | VinhWorks`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://vinhworks.com/projects/${project.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

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

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
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

        {/* Fixed Navigation Bar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b bg-slate-900/95 backdrop-blur-xl border-purple-500/20"
        >
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <Link href="/projects">
              <button className="flex items-center gap-2 px-4 py-2 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10">
                <ArrowLeft size={16} />
                <span>Quay lại</span>
              </button>
            </Link>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-3 text-purple-400 transition-all duration-300 border bg-purple-500/20 border-purple-500/30 rounded-xl hover:bg-purple-500/30"
              >
                <Share2 size={20} />
              </motion.button>

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600"
                >
                  <Globe size={16} />
                  <span>Live Site</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.nav>

        <div className="px-6 pt-24">
          <div className="mx-auto max-w-7xl">
            {/* Hero Section - Split Layout */}
            <div className="grid gap-12 mb-20 lg:grid-cols-2">
              {/* Left Column - Project Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Category & Featured Badge */}
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 text-sm font-medium text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-300 border rounded-full bg-yellow-500/20 border-yellow-500/30">
                      <Star className="w-4 h-4" />
                      Nổi bật
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h1 className="text-5xl font-black leading-tight text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
                  {project.name}
                </h1>

                {/* Description */}
                <p className="text-xl leading-relaxed text-gray-300">
                  {project.description}
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 p-6 border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
                  <User className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Khách hàng</p>
                    <p className="text-xl font-bold text-white">
                      {project.client}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
                      <Code className="w-5 h-5 text-purple-400" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 text-sm text-purple-300 border bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border-purple-500/30 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-6 py-3 text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600"
                    >
                      <Globe size={20} />
                      <span>Xem Live</span>
                      <ExternalLink size={16} />
                    </motion.a>
                  )}

                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-6 py-3 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10"
                    >
                      <Github size={20} />
                      <span>Source Code</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Right Column - Project Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 text-center border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
                    <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                    <p className="mb-1 text-sm text-gray-400">Hoàn thành</p>
                    <p className="font-bold text-white">
                      {new Date(
                        project.completedAt || project.createdAt
                      ).toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div className="p-6 text-center border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
                    <Clock className="w-8 h-8 mx-auto mb-3 text-green-400" />
                    <p className="mb-1 text-sm text-gray-400">Thời gian</p>
                    <p className="font-bold text-white">
                      {project.duration || "2-4 tuần"}
                    </p>
                  </div>

                  <div className="p-6 text-center border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
                    <Target className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                    <p className="mb-1 text-sm text-gray-400">Team Size</p>
                    <p className="font-bold text-white">
                      {project.teamSize || 3} người
                    </p>
                  </div>

                  <div className="p-6 text-center border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
                    <Award className="w-8 h-8 mx-auto mb-3 text-red-400" />
                    <p className="mb-1 text-sm text-gray-400">Status</p>
                    <p className="font-bold text-green-400">Hoàn thành</p>
                  </div>
                </div>

                {/* Project Highlights */}
                <div className="p-6 border bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20 rounded-2xl backdrop-blur-sm">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Kết quả đạt được
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Performance Score</span>
                      <span className="font-bold text-green-400">95/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Load Time</span>
                      <span className="font-bold text-blue-400">2.1s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">User Satisfaction</span>
                      <span className="font-bold text-yellow-400">4.8/5</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Project Image with Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-20"
            >
              {/* Main Image */}
              <div className="relative mb-6">
                <div className="absolute opacity-75 -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl" />
                <div
                  className="relative overflow-hidden rounded-3xl cursor-zoom-in group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Image
                    src={projectImages[activeImageIndex]}
                    alt={project.name}
                    width={1200}
                    height={600}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Carousel Thumbnails */}
              <div className="flex justify-center gap-4">
                {projectImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                      activeImageIndex === index
                        ? "ring-2 ring-purple-500 scale-105"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.name} - Image ${index + 1}`}
                      width={120}
                      height={80}
                      className="object-cover w-20 h-14 md:w-24 md:h-16"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Project Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-20"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl" />
                <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30">
                  <h2 className="flex items-center gap-3 mb-8 text-3xl font-bold text-white">
                    <Monitor className="w-8 h-8 text-purple-400" />
                    Chi tiết dự án
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {project.content ||
                        "Đây là một dự án chất lượng cao với thiết kế hiện đại và tối ưu hiệu suất. Dự án được phát triển với công nghệ tiên tiến, đảm bảo trải nghiệm người dùng tốt nhất và hiệu suất cao."}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related Projects - Single Row */}
            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-20 border-t border-purple-500/20"
              >
                <div className="mb-12 text-center">
                  <h3 className="flex items-center justify-center gap-3 mb-4 text-3xl font-bold text-white md:text-4xl">
                    <Rocket className="w-8 h-8 text-purple-400" />
                    Dự án liên quan
                  </h3>
                  <p className="text-lg text-gray-300">
                    Khám phá thêm các dự án tương tự
                  </p>
                </div>

                {/* Single Row Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                  {related.map((relatedProject, i) => (
                    <motion.div
                      key={relatedProject._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="group"
                    >
                      <Link href={`/projects/${relatedProject.slug}`}>
                        <div className="relative overflow-hidden transition-all duration-500 border shadow-2xl rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40">
                          {/* Project Image */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={relatedProject.image || "/placeholder.jpg"}
                              alt={relatedProject.name}
                              width={400}
                              height={300}
                              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80" />

                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-purple-500/80">
                                {relatedProject.category}
                              </span>
                              <h4 className="mb-2 text-xl font-bold transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text">
                                {relatedProject.name}
                              </h4>
                              <p className="mb-3 text-sm text-gray-300 line-clamp-2">
                                {relatedProject.description}
                              </p>

                              {/* View Project Button */}
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-purple-300">
                                  Xem chi tiết
                                </span>
                                <ArrowRight className="w-5 h-5 text-purple-400 transition-transform duration-300 group-hover:translate-x-2" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-24 mb-16 text-center"
            >
              <div className="relative p-12 border md:p-16 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
                <h3 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                  🚀 Sẵn sàng bắt đầu dự án của bạn?
                </h3>
                <p className="max-w-3xl mx-auto mb-10 text-xl leading-relaxed text-gray-300">
                  Hãy để chúng tôi biến ý tưởng của bạn thành hiện thực với
                  thiết kế hiện đại và công nghệ tiên tiến nhất
                </p>

                <div className="flex flex-col justify-center gap-6 sm:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/contact">
                      <button className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white transition-all duration-300 shadow-2xl rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-purple-500/25">
                        <MessageCircle size={24} />
                        <span>Bắt đầu dự án ngay</span>
                        <ArrowRight size={20} />
                      </button>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/projects">
                      <button className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-purple-400 transition-all duration-300 border-2 rounded-2xl border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50 hover:bg-purple-500/20 backdrop-blur-sm">
                        <Eye size={24} />
                        <span>Xem thêm dự án</span>
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-full max-h-full"
              >
                <Image
                  src={projectImages[activeImageIndex]}
                  alt="Preview"
                  width={1600}
                  height={900}
                  className="object-contain max-w-full max-h-full rounded-2xl"
                />
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute p-3 text-white transition-colors rounded-full top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
