"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Loader2,
  Rocket,
  Sparkles,
  Zap,
  LayoutTemplate,
  ExternalLink,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setProjects(sorted.slice(0, 6));
      } catch (error) {
        console.error(error);
        // ── Không có mock data, để rỗng ──
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="projects"
      className="relative py-10 overflow-hidden md:py-16 lg:py-8 bg-white"
      suppressHydrationWarning
    >
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600"
          >
            <Code2 size={16} className="text-blue-500" />
            <span>Dự án tiêu biểu</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
          >
            Selected{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Works.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-600"
          >
            Các dự án tiêu biểu được tuyển chọn từ portfolio của chúng tôi
          </motion.p>
        </div>

        {/* PROJECT GRID */}
        {loading ? (
          <div className="flex items-center justify-center h-64 text-blue-500">
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3">
            <Code2 size={40} className="opacity-30" />
            <p className="text-sm font-medium">Chưa có dự án nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(project._id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-[1.5rem]">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

                  {/* Quick Actions on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link href={`/projects/${project.slug}`}>
                      <button className="p-3 transition-transform bg-white rounded-full shadow-lg text-slate-900 hover:scale-110">
                        <Eye size={20} />
                      </button>
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 text-white transition-transform bg-blue-500 rounded-full shadow-lg hover:scale-110"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase border rounded-full shadow-sm bg-white/90 backdrop-blur-md text-slate-700 border-white/50">
                      {project.category ?? "Project"}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-col flex-grow p-6 pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold transition-colors text-slate-900 group-hover:text-blue-600 line-clamp-1">
                      {project.name}
                    </h3>
                    {project.featured && (
                      <Sparkles
                        size={16}
                        className="mt-1 text-yellow-500 fill-yellow-500 shrink-0"
                      />
                    )}
                  </div>

                  {/* ── Description: strip HTML ── */}
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-2">
                    {(project.description ?? "")
                      .replace(/<[^>]*>/g, "")
                      .replace(/&nbsp;/g, " ")
                      .trim()}
                  </p>

                  {/* Tech Stack & Footer */}
                  <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-100">
                    <div className="flex -space-x-2">
                      {(project.technologies || [])
                        .slice(0, 3)
                        .map((tech, tIdx) => (
                          <div
                            key={tIdx}
                            className="px-2 py-1 bg-slate-50 border border-white rounded-lg shadow-sm text-[10px] font-bold text-slate-600 relative z-0 hover:z-10 hover:scale-105 transition-transform"
                          >
                            {tech}
                          </div>
                        ))}
                      {(project.technologies?.length || 0) > 3 && (
                        <div className="px-2 py-1 bg-slate-100 border border-white rounded-lg text-[10px] font-bold text-slate-400">
                          +{project.technologies.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <Calendar size={12} />
                      {new Date(project.createdAt).getFullYear()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA BOX */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-20 rounded-[2rem]" />

          <div className="relative bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center w-full gap-6 md:w-auto">
              <div className="p-4 text-blue-600 bg-blue-50 rounded-2xl">
                <LayoutTemplate size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Dự án của bạn tiếp theo?
                </h3>
                <p className="text-sm text-slate-500">
                  Chúng tôi sẵn sàng biến ý tưởng thành hiện thực.
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
              <Link href="/projects" className="flex-1 md:flex-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-bold transition-all bg-white border shadow-sm text-slate-700 rounded-xl border-slate-200 hover:border-slate-300 hover:shadow-md whitespace-nowrap"
                >
                  <Rocket size={18} />
                  Xem Portfolio
                </motion.button>
              </Link>

              <Link href="/contact" className="flex-1 md:flex-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-bold text-white transition-all shadow-lg bg-slate-900 rounded-xl hover:shadow-xl whitespace-nowrap"
                >
                  <Zap size={18} className="text-yellow-400 fill-yellow-400" />
                  Bắt đầu ngay
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
