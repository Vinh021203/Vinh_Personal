"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Code2, DollarSign, ExternalLink, Eye, ImageIcon, Loader2, Rocket, Star, User, Zap } from "lucide-react";

interface Project {
  _id: string; name: string; client: string; status: string; description: string;
  image: string; slug: string; category: string; technologies: string[];
  createdAt: string; featured: boolean; budget?: number; progress?: number;
  priority?: "low" | "medium" | "high"; liveUrl?: string;
}

const stripHtml = (html?: string) => (html ?? "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

export const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects?public=1");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data: Project[] = await response.json();
        setProjects(data
          .map((project, index) => ({
            ...project,
            status: project.status || "Hoàn thành",
            budget: project.budget ?? 0,
            progress: project.progress ?? 0,
            priority: project.priority ?? (["low", "medium", "high"][index % 3] as Project["priority"]),
            featured: project.featured ?? index < 2,
          }))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6));
      } catch (error) {
        console.error(error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-100/50 blur-[110px]"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <header className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <span className="inline-flex rotate-[-3deg] items-center gap-2 border border-zinc-900 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-zinc-800 shadow-[3px_3px_0_#ffb21c]"><Code2 size={14} className="text-[#d98200]"/>Dự án tiêu biểu</span>
          <h2 className="mt-7 text-5xl font-black leading-[.9] tracking-[-.06em] text-zinc-950 sm:text-7xl">Selected <span className="relative inline-block text-[#d98200]">Works.<span className="absolute -bottom-3 left-0 h-1.5 w-full bg-[#ffb21c]"/></span></h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-zinc-600">Các sản phẩm nổi bật được tuyển chọn từ portfolio của VinhWorks.</p>
        </header>

        {loading ? (
          <div className="grid h-56 place-items-center"><Loader2 size={36} className="animate-spin text-[#d98200]"/></div>
        ) : projects.length === 0 ? (
          <div className="grid h-56 place-items-center border border-dashed border-zinc-400 text-sm font-bold text-zinc-500">Chưa có dự án nào</div>
        ) : (
          <div className="mb-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => <ProjectEditorialCard key={project._id || index} project={project} index={index}/>) }
          </div>
        )}

        <div className="project-cta mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 border border-zinc-900 bg-[#fff8e9] p-7 md:flex-row md:p-9">
          <div className="flex items-center gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center border border-zinc-900 bg-[#ffb21c]"><Rocket size={25}/></div>
            <div><h3 className="text-xl font-black text-zinc-950">Dự án tiếp theo là của bạn?</h3><p className="mt-1 text-sm text-zinc-600">Cùng biến ý tưởng thành một sản phẩm thực tế.</p></div>
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <Link href="/projects" className="flex-1 border border-zinc-900 bg-white px-5 py-3 text-center text-xs font-black md:flex-none">Xem portfolio</Link>
            <Link href="/contact" className="flex flex-1 items-center justify-center gap-2 border border-zinc-900 bg-zinc-950 px-5 py-3 text-xs font-black text-white md:flex-none"><Zap size={15} className="fill-[#ffb21c] text-[#ffb21c]"/>Bắt đầu ngay</Link>
          </div>
        </div>
      </div>
      <style jsx global>{`.boston-home .project-editorial-card,.boston-home .project-cta{box-shadow:6px 6px 0 #ffb21c!important}`}</style>
    </section>
  );
};

const ProjectEditorialCard = ({ project, index }: { project: Project; index: number }) => {
  const priorityLabel = { low: "Low", medium: "Medium", high: "High" }[project.priority || "low"];
  return (
    <motion.article initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.05}} className="project-editorial-card group flex flex-col overflow-hidden border border-zinc-900 bg-white transition-transform duration-300 hover:-translate-y-2">
      <div className="relative aspect-video overflow-hidden border-b border-zinc-900 bg-amber-50">
        {project.image ? <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105"/> : <div className="grid h-full place-items-center text-zinc-300"><ImageIcon size={46}/></div>}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="border border-zinc-900 bg-[#ffb21c] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em]">{project.status}</span>
          <span className="border border-zinc-900 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em]">{priorityLabel}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-zinc-950/70 opacity-0 transition-opacity group-hover:opacity-100">
          <Link href={`/projects/${project.slug}`} aria-label="Xem dự án" className="border border-white bg-white p-3 text-zinc-950 hover:bg-[#ffb21c]"><Eye size={19}/></Link>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Mở website" className="border border-white bg-white p-3 text-zinc-950 hover:bg-[#ffb21c]"><ExternalLink size={19}/></a>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="line-clamp-2 text-xl font-black leading-tight tracking-[-.025em] text-zinc-950 group-hover:text-[#d98200]">{project.name}</h3><p className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-zinc-400"><User size={12}/>{project.client}</p></div>
          {project.featured && <Star size={17} className="shrink-0 fill-[#ffb21c] text-[#ffb21c]"/>}
        </div>
        <p className="my-5 flex-1 text-sm leading-6 text-zinc-600 line-clamp-2">{stripHtml(project.description) || "Chưa có mô tả dự án."}</p>
        <div className="border-t border-zinc-300 pt-4">
          <div className="flex justify-between gap-4 text-xs font-black text-zinc-700"><span className="flex items-center gap-1"><DollarSign size={14} className="text-[#d98200]"/>{project.budget?.toLocaleString("vi-VN")}</span><span className="flex items-center gap-1"><Calendar size={14} className="text-[#d98200]"/>{new Date(project.createdAt).toLocaleDateString("vi-VN")}</span></div>
          <div className="mt-4 flex justify-between text-[9px] font-black uppercase tracking-wider text-zinc-400"><span>Tiến độ</span><span>{project.progress}%</span></div>
          <div className="mt-2 h-1.5 bg-zinc-100"><div className="h-full bg-[#ffb21c]" style={{width:`${project.progress}%`}}/></div>
        </div>
      </div>
    </motion.article>
  );
};
