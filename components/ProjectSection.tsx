"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaArrowRight,
  FaEye,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  Rocket,
  Sparkles,
  ArrowRight,
  Eye,
  Github,
  ExternalLink,
  Code,
  Palette,
  Globe,
  Star,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Tag,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  technologies: string[];
  createdAt: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProjects(sorted.slice(0, 6));
      } catch {
        toast.error("Không thể tải danh sách dự án!");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Pre-generate particle positions
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
  ];

  const stats = [
    {
      icon: Award,
      label: "Dự án hoàn thành",
      value: "50+",
      color: "text-purple-400",
    },
    {
      icon: Users,
      label: "Khách hàng hài lòng",
      value: "30+",
      color: "text-blue-400",
    },
    {
      icon: Star,
      label: "Đánh giá trung bình",
      value: "4.9/5",
      color: "text-yellow-400",
    },
  ];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-20 overflow-hidden md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 grid-animation"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute rounded-full w-96 h-96 blur-3xl float-animation pulse-glow"
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
          className="absolute rounded-full w-80 h-80 blur-3xl float-animation-reverse pulse-glow"
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

      <div className="relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:mb-20"
        >
          {/* Header Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-purple-300 border rounded-full bg-purple-500/10 border-purple-500/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">
              Dự án nổi bật
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>

          <h2
            id="projects-heading"
            className="mb-6 text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text"
          >
            Portfolio dự án thực tế
          </h2>

          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl">
            Những sản phẩm được thiết kế và phát triển với{" "}
            <span className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              công nghệ hiện đại
            </span>
            , tối ưu trải nghiệm người dùng và hiệu quả kinh doanh.
          </p>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-3 md:mb-20"
        >
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 text-center transition-all duration-300 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40"
              >
                <IconComponent
                  className={`w-8 h-8 ${stat.color} mx-auto mb-3`}
                />
                <div className="mb-1 text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div
            className="flex justify-center mt-20"
            role="status"
            aria-live="polite"
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
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3 md:mb-20">
            {projects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative overflow-hidden transition-all duration-300 border shadow-2xl group rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute z-10 flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-300 border rounded-full top-4 left-4 bg-yellow-500/20 border-yellow-500/30">
                    <Star className="w-3 h-3" />
                    Nổi bật
                  </div>
                )}

                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80" />

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
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="p-3 text-white transition-colors rounded-full bg-gray-500/80 backdrop-blur-sm hover:bg-gray-600/80">
                            <Github size={20} />
                          </button>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute px-3 py-1 text-xs font-medium text-white rounded-full top-4 right-4 bg-purple-500/80 backdrop-blur-sm">
                    {project.category || "Website"}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-white transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text line-clamp-2">
                    {project.name}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-gray-300 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400 border rounded-full bg-gray-500/20 border-gray-500/30">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(project.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/projects/${project.slug}`}>
                    <button className="flex items-center w-full gap-2 px-4 py-2 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 group/btn">
                      <Eye size={16} />
                      <span>Xem chi tiết</span>
                      <ArrowRight
                        size={14}
                        className="ml-auto transition-transform group-hover/btn:translate-x-1"
                      />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              📂 Khám phá thêm dự án
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              Xem toàn bộ portfolio với những dự án đa dạng từ website doanh
              nghiệp đến ứng dụng web phức tạp
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/projects" aria-label="Xem toàn bộ dự án VinhWorks">
                  <button className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 hover:shadow-2xl">
                    <TrendingUp size={20} />
                    <span>Xem tất cả dự án</span>
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <button className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-purple-400 transition-all duration-300 border rounded-2xl border-purple-500/30 bg-purple-500/10 hover:border-purple-400/50 hover:bg-purple-500/20 backdrop-blur-sm">
                    <Sparkles size={20} />
                    <span>Thảo luận dự án mới</span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
