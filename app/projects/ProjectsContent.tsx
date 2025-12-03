"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  Github,
  Code2,
  Layers,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// --- MOCK DATA (Bạn có thể thay bằng API call) ---
const PROJECTS = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    desc: "Nền tảng thương mại điện tử đa niki tích hợp thanh toán Stripe và quản lý kho hàng.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Finance Dashboard",
    category: "Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    desc: "Hệ thống quản lý tài chính cá nhân với biểu đồ trực quan và phân tích dòng tiền AI.",
    tech: ["React", "Recharts", "Firebase", "Tailwind"],
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Travel Booking App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    desc: "Ứng dụng đặt vé máy bay và khách sạn với trải nghiệm người dùng tối ưu.",
    tech: ["React Native", "Redux", "Node.js"],
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    desc: "Công cụ tạo nội dung marketing tự động sử dụng OpenAI GPT-4 API.",
    tech: ["Next.js", "OpenAI API", "MongoDB"],
    demo: "#",
    github: "#",
  },
];

const CATEGORIES = [
  "All",
  "Web App",
  "Mobile App",
  "Dashboard",
  "Landing Page",
];

export default function ProjectsContent() {
  const searchParams = useSearchParams(); // Nguyên nhân gây lỗi build nếu không tách file
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(PROJECTS);
    } else {
      setFilteredProjects(
        PROJECTS.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen py-20 font-sans bg-slate-50">
      <div className="container max-w-6xl px-6 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-black md:text-5xl text-slate-900"
          >
            Dự án tiêu biểu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg font-medium text-slate-500"
          >
            Tuyển tập những sản phẩm công nghệ chất lượng cao được thực hiện bởi
            VinhWorks.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-105"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <Link
                      href={project.demo}
                      className="p-3 transition-colors bg-white rounded-full shadow-lg text-slate-900 hover:bg-orange-500 hover:text-white"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <Link
                      href={project.github}
                      className="p-3 transition-colors bg-white rounded-full shadow-lg text-slate-900 hover:bg-slate-900 hover:text-white"
                      title="Source Code"
                    >
                      <Github size={20} />
                    </Link>
                  </div>
                  <div className="absolute px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-lg top-4 left-4 bg-white/90 backdrop-blur text-slate-800">
                    {project.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="mb-3 text-2xl font-bold transition-colors text-slate-900 group-hover:text-orange-600">
                    {project.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-slate-500 line-clamp-2">
                    {project.desc}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 text-xs font-semibold border rounded-md bg-slate-50 text-slate-600 border-slate-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold transition-colors text-slate-900 hover:text-orange-600 group/link"
                    >
                      Xem chi tiết
                      <ArrowRight
                        size={16}
                        className="transition-transform transform group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <Layers size={48} className="mx-auto mb-4 opacity-50" />
            <p>Chưa có dự án nào thuộc danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
}
