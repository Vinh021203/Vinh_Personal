"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Loader2,
  Rocket,
  Zap,
  LayoutTemplate,
  ExternalLink,
  Calendar,
  Eye,
  Activity,
  DollarSign,
  ImageIcon,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  _id: string;
  name: string;
  client: string;
  status: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  technologies: string[];
  createdAt: string;
  featured: boolean;
  budget?: number;
  progress?: number;
  priority?: "low" | "medium" | "high";
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const stripHtml = (html?: string) =>
    (html ?? "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

  const getStatusColor = (status: string | undefined | null) => {
    if (!status) return "bg-slate-50 text-slate-500 border-slate-200";
    switch (status.toLowerCase()) {
      case "hoàn thành":
        return "bg-green-50 text-green-600 border-green-200";
      case "đang thực hiện":
      case "đang triển khai":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "tạm dừng":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "hủy bỏ":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string | undefined | null) => {
    if (!priority) return "text-slate-600 bg-slate-50 border-slate-100";
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-100";
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-100";
      default:
        return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const enhancedData = data.map((project: Project, index: number) => ({
          ...project,
          status: project.status ?? "Hoàn thành",
          budget: project.budget ?? 0,
          progress: project.progress ?? 0,
          priority:
            project.priority ??
            (["low", "medium", "high"][index % 3] as "low" | "medium" | "high"),
          featured: project.featured ?? index < 2,
        }));
        const sorted = enhancedData.sort(
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[2rem] border border-orange-100/60 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Area */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 transform group-hover:scale-110"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <ImageIcon size={48} strokeWidth={1} />
                    </div>
                  )}

                  <div className="absolute z-10 flex items-start justify-between top-4 left-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                    {project.priority && (
                      <span
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border shadow-sm backdrop-blur-md flex items-center gap-1 ${getPriorityColor(project.priority)}`}
                      >
                        <Activity size={12} /> {project.priority}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="p-3 text-white transition-all border bg-white/20 rounded-xl backdrop-blur-md hover:bg-white hover:text-orange-600 border-white/30"
                    >
                      <Eye size={20} />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 text-white transition-all border bg-white/20 rounded-xl backdrop-blur-md hover:bg-white hover:text-blue-600 border-white/30"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="mb-1 text-lg font-bold transition-colors text-slate-800 line-clamp-1 group-hover:text-orange-600">
                        {project.name}
                      </h3>
                      <p className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <User size={12} /> {project.client}
                      </p>
                    </div>
                    {project.featured && (
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    )}
                  </div>

                  {/* ── Description: strip HTML ── */}
                  <p className="flex-1 mb-4 text-sm text-slate-500 line-clamp-2">
                    {stripHtml(project.description) || "Chưa có mô tả dự án..."}
                  </p>

                  <div className="pt-4 space-y-3 border-t border-slate-50">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} className="text-green-500" />{" "}
                        {project.budget?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-blue-500" />{" "}
                        {new Date(project.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                        <span>Tiến độ</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${project.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-orange-400 to-amber-400"}`}
                        />
                      </div>
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
