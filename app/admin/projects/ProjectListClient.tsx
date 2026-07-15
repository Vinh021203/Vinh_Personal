"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Calendar,
  DollarSign,
  Edit3,
  Eye,
  Filter,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";

const PAGE_SIZE = 6;

interface Project {
  _id: string;
  name: string;
  client: string;
  status: string;
  description?: string;
  image?: string;
  tags?: string[];
  createdAt: string;
  budget?: number;
  progress?: number;
  priority?: "low" | "medium" | "high";
  featured?: boolean;
}

export default function ProjectListClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Cannot load projects");
        const data = await res.json();
        setProjects(
          data.map((project: any, index: number) => ({
            ...project,
            budget: project.budget ?? 0,
            progress: project.progress ?? 0,
            priority: project.priority ?? (["low", "medium", "high"][index % 3] as Project["priority"]),
            featured: project.featured ?? index < 2,
          })),
        );
      } catch {
        toast.error("Không thể tải danh sách dự án");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesKeyword =
        project.name.toLowerCase().includes(keyword) ||
        project.client.toLowerCase().includes(keyword) ||
        (project.tags || []).some((tag) => tag.toLowerCase().includes(keyword));
      const matchesStatus = filterStatus === "all" || project.status === filterStatus;
      return matchesKeyword && matchesStatus;
    });
  }, [projects, searchTerm, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const currentProjects = filteredProjects.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const completedProjects = projects.filter((project) => normalizeStatus(project.status) === "completed").length;
  const averageProgress = projects.length
    ? Math.round(projects.reduce((total, project) => total + (project.progress || 0), 0) / projects.length)
    : 0;
  const totalBudget = projects.reduce((total, project) => total + (project.budget || 0), 0);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Đã xóa dự án");
      setProjects((items) => items.filter((project) => project._id !== deleteId));
    } catch {
      toast.error("Xóa dự án thất bại");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="border border-zinc-950 bg-zinc-950 px-6 py-5 text-white shadow-[5px_5px_0_#ffb21c]">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffb21c] border-t-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Đang tải dự án</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#09090b",
            color: "#fff",
            border: "1px solid #ffb21c",
            borderRadius: 0,
            fontWeight: 800,
          },
        }}
      />

      <section className="mb-8 mt-5 border border-zinc-950 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c] sm:mt-6">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-5 sm:p-8 lg:p-9">
            <div className="mb-6 inline-flex rotate-[-2deg] items-center gap-2 border border-zinc-950 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] shadow-[3px_3px_0_#ffb21c]">
              <Sparkles size={14} className="text-[#df8200]" />
              Project Control
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.88] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
              Quản lý <span className="text-[#df8200]">dự án.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
              Theo dõi portfolio, tiến độ, ngân sách và trạng thái triển khai của các sản phẩm đang vận hành trên VinhWorks.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/admin/projects/create" className="inline-flex h-12 items-center justify-center gap-3 border border-zinc-950 bg-[#ffb21c] px-6 text-[11px] font-black uppercase tracking-[0.12em] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]">
                <Plus size={18} />
                Thêm dự án
              </Link>
              <Link href="/projects" className="inline-flex h-12 items-center justify-center gap-3 border border-zinc-950 bg-white px-6 text-[11px] font-black uppercase tracking-[0.12em] transition hover:bg-zinc-950 hover:text-white">
                Xem ngoài site
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="border-t border-zinc-950 bg-zinc-950 p-5 text-white lg:border-l lg:border-t-0 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffb21c]">Portfolio Snapshot</p>
              <span className="border border-[#ffb21c] px-3 py-1 text-[10px] font-black uppercase text-[#ffb21c]">Live data</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Tổng dự án" value={projects.length.toString().padStart(2, "0")} />
              <Metric label="Hoàn thành" value={completedProjects.toString().padStart(2, "0")} />
              <Metric label="Tiến độ TB" value={`${averageProgress}%`} />
              <Metric label="Ngân sách" value={formatCompactMoney(totalBudget)} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-7 border border-zinc-950 bg-white p-3 shadow-[5px_5px_0_#e4ded0] sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm dự án, khách hàng, tag..."
              className="h-12 w-full border border-zinc-200 bg-[#fff8e9] pl-12 pr-4 text-sm font-bold outline-none transition focus:border-zinc-950 focus:bg-white focus:shadow-[3px_3px_0_#ffb21c]"
            />
          </label>

          <label className="relative block">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#df8200]" size={17} />
            <select
              value={filterStatus}
              onChange={(event) => {
                setFilterStatus(event.target.value);
                setCurrentPage(1);
              }}
              className="h-12 w-full border border-zinc-200 bg-white pl-11 pr-10 text-[11px] font-black uppercase outline-none transition focus:border-zinc-950 lg:w-60"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Đang triển khai">Đang triển khai</option>
              <option value="Tạm dừng">Tạm dừng</option>
              <option value="Hủy bỏ">Hủy bỏ</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setViewMode("grid")} className={viewButtonClass(viewMode === "grid")} aria-label="Grid view">
              <LayoutGrid size={18} />
            </button>
            <button onClick={() => setViewMode("list")} className={viewButtonClass(viewMode === "list")} aria-label="List view">
              <List size={18} />
            </button>
          </div>
        </div>
      </section>

      {currentProjects.length === 0 ? (
        <EmptyState />
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7">
              {currentProjects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} onPreview={setPreview} onDelete={confirmDelete} />
              ))}
            </motion.div>
          ) : (
            <ProjectTable projects={currentProjects} onPreview={setPreview} onDelete={confirmDelete} />
          )}
        </AnimatePresence>
      )}

      {filteredProjects.length > PAGE_SIZE && (
        <div className="mt-9 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`h-11 w-11 border border-zinc-950 text-sm font-black transition ${
                currentPage === index + 1 ? "bg-zinc-950 text-[#ffb21c] shadow-[3px_3px_0_#ffb21c]" : "bg-white hover:bg-[#fff8e9]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      <DeleteModal open={showDeleteModal} loading={isDeleting} onCancel={() => setShowDeleteModal(false)} onConfirm={handleDelete} />
      <PreviewModal project={preview} onClose={() => setPreview(null)} />
    </div>
  );
}

function ProjectCard({ project, index, onPreview, onDelete }: { project: Project; index: number; onPreview: (project: Project) => void; onDelete: (id: string) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group overflow-hidden border border-zinc-950 bg-white shadow-[6px_6px_0_#ffb21c] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]"
    >
      <div className="relative aspect-video border-b border-zinc-950 bg-[#fff8e9]">
        {project.image ? (
          <Image src={project.image} alt={project.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" />
        ) : (
          <div className="grid h-full place-items-center text-zinc-400">
            <ImageIcon size={44} />
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <StatusBadge status={project.status} />
          {project.featured && <span className="inline-flex items-center gap-1 border border-zinc-950 bg-[#ffb21c] px-2 py-1 text-[9px] font-black uppercase"><Star size={12} className="fill-zinc-950" /> Nổi bật</span>}
        </div>
        <div className="absolute inset-0 grid place-items-center bg-zinc-950/70 opacity-0 transition group-hover:opacity-100">
          <div className="flex gap-2">
            <IconButton onClick={() => onPreview(project)} icon={Eye} label="Xem" />
            <Link href={`/admin/projects/edit/${project._id}`}><IconButton icon={Edit3} label="Sửa" /></Link>
            <IconButton onClick={() => onDelete(project._id)} icon={Trash2} label="Xóa" danger />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-xl font-black leading-tight text-zinc-950">{project.name}</h3>
            <p className="mt-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500"><User size={13} /> {project.client}</p>
          </div>
          <PriorityBadge priority={project.priority} />
        </div>
        <p className="mb-5 line-clamp-2 min-h-[3.5rem] text-sm leading-7 text-slate-600">{stripHtml(project.description) || "Chưa có mô tả dự án."}</p>
        <div className="border-t border-zinc-200 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs font-black">
            <span className="flex items-center gap-1 text-slate-700"><DollarSign size={14} className="text-[#df8200]" /> {formatMoney(project.budget || 0)}</span>
            <span className="flex items-center gap-1 text-slate-700"><Calendar size={14} className="text-[#df8200]" /> {formatDate(project.createdAt)}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 border border-zinc-950 bg-white">
              <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress || 0}%` }} className="h-full bg-[#ffb21c]" />
            </div>
            <span className="w-10 text-right text-xs font-black">{project.progress || 0}%</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectTable({ projects, onPreview, onDelete }: { projects: Project[]; onPreview: (project: Project) => void; onDelete: (id: string) => void }) {
  return (
    <motion.div key="list" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="overflow-hidden border border-zinc-950 bg-white shadow-[6px_6px_0_#ffb21c]">
      <div className="scrollbar-hide overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-zinc-950 bg-zinc-950 text-white">
            <tr className="text-left text-[10px] font-black uppercase tracking-[0.18em]">
              <th className="px-5 py-4">Dự án</th>
              <th className="px-5 py-4">Khách hàng</th>
              <th className="px-5 py-4">Trạng thái</th>
              <th className="px-5 py-4">Tiến độ</th>
              <th className="px-5 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b border-zinc-200 last:border-b-0 hover:bg-[#fff8e9]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-20 shrink-0 border border-zinc-950 bg-[#fff8e9]">
                      {project.image ? <Image src={project.image} alt="" fill className="object-cover" sizes="80px" /> : <ImageIcon className="m-auto mt-4 text-zinc-400" size={22} />}
                    </div>
                    <div>
                      <h4 className="max-w-xs truncate font-black">{project.name}</h4>
                      <p className="mt-1 max-w-xs truncate text-xs text-slate-500">{stripHtml(project.description)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-bold text-slate-600">{project.client}</td>
                <td className="px-5 py-4"><StatusBadge status={project.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-36 border border-zinc-950 bg-white"><div className="h-full bg-[#ffb21c]" style={{ width: `${project.progress || 0}%` }} /></div>
                    <span className="text-xs font-black">{project.progress || 0}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <IconButton onClick={() => onPreview(project)} icon={Eye} label="Xem" />
                    <Link href={`/admin/projects/edit/${project._id}`}><IconButton icon={Edit3} label="Sửa" /></Link>
                    <IconButton onClick={() => onDelete(project._id)} icon={Trash2} label="Xóa" danger />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function PreviewModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/55 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }} onClick={(event) => event.stopPropagation()} className="max-h-[90vh] w-full max-w-4xl overflow-hidden border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c]">
            <div className="relative aspect-[16/7] border-b border-zinc-950 bg-[#fff8e9]">
              {project.image ? <Image src={project.image} alt={project.name} fill className="object-cover" sizes="900px" /> : <div className="grid h-full place-items-center"><ImageIcon size={56} /></div>}
              <button onClick={onClose} className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-zinc-950 bg-white shadow-[3px_3px_0_#ffb21c]"><X size={20} /></button>
            </div>
            <div className="max-h-[52vh] overflow-y-auto p-5 sm:p-7">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#df8200]">{project.client}</p>
                  <h2 className="text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">{project.name}</h2>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <Info label="Ngân sách" value={formatMoney(project.budget || 0)} />
                <Info label="Tiến độ" value={`${project.progress || 0}%`} />
                <Info label="Ngày tạo" value={formatDate(project.createdAt)} />
              </div>
              <h3 className="mb-2 text-lg font-black">Mô tả dự án</h3>
              <p className="text-sm leading-8 text-slate-600">{stripHtml(project.description) || "Chưa có mô tả chi tiết cho dự án này."}</p>
              {!!project.tags?.length && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-zinc-200 pt-5">
                  {project.tags.map((tag) => <span key={tag} className="border border-zinc-950 bg-[#fff8e9] px-3 py-1 text-[10px] font-black uppercase">#{tag}</span>)}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DeleteModal({ open, loading, onCancel, onConfirm }: { open: boolean; loading: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/55 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} className="w-full max-w-md border border-zinc-950 bg-white p-6 shadow-[8px_8px_0_#ffb21c]">
            <div className="mb-5 grid h-14 w-14 place-items-center border border-zinc-950 bg-red-50 text-red-600"><AlertTriangle size={25} /></div>
            <h2 className="text-3xl font-black leading-none">Xóa dự án?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Hành động này không thể hoàn tác. Dữ liệu dự án sẽ bị xóa khỏi hệ thống.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button onClick={onCancel} className="border border-zinc-950 bg-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] hover:bg-zinc-100">Hủy bỏ</button>
              <button onClick={onConfirm} className="border border-zinc-950 bg-red-600 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[3px_3px_0_#111]">{loading ? "Đang xóa" : "Xóa ngay"}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/15 bg-white/5 p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-zinc-200 bg-[#fff8e9] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 font-black">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid min-h-[260px] place-items-center border border-zinc-950 bg-white p-8 text-center shadow-[6px_6px_0_#ffb21c]">
      <Briefcase size={40} className="mx-auto mb-4 text-[#df8200]" />
      <h3 className="text-2xl font-black">Không có dự án phù hợp</h3>
      <p className="mt-2 text-sm text-slate-600">Thử đổi bộ lọc hoặc thêm một dự án mới.</p>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const normalized = normalizeStatus(status);
  const className =
    normalized === "completed"
      ? "bg-emerald-50 text-emerald-700"
      : normalized === "active"
        ? "bg-blue-50 text-blue-700"
        : normalized === "paused"
          ? "bg-amber-50 text-amber-700"
          : normalized === "cancelled"
            ? "bg-red-50 text-red-700"
            : "bg-zinc-50 text-zinc-600";
  return <span className={`inline-flex border border-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${className}`}>{status || "Chưa rõ"}</span>;
}

function PriorityBadge({ priority }: { priority?: Project["priority"] }) {
  if (!priority) return null;
  const label = priority === "high" ? "High" : priority === "medium" ? "Medium" : "Low";
  return <span className="shrink-0 border border-zinc-950 bg-[#fff8e9] px-2 py-1 text-[9px] font-black uppercase">{label}</span>;
}

function IconButton({ icon: Icon, label, danger, onClick }: { icon: any; label: string; danger?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`grid h-10 w-10 place-items-center border border-zinc-950 bg-white transition hover:-translate-y-0.5 ${danger ? "hover:bg-red-600 hover:text-white" : "hover:bg-[#ffb21c]"}`} title={label} type="button">
      <Icon size={17} />
    </button>
  );
}

function viewButtonClass(active: boolean) {
  return `grid h-12 min-w-12 place-items-center border border-zinc-950 transition ${active ? "bg-zinc-950 text-[#ffb21c] shadow-[3px_3px_0_#ffb21c]" : "bg-white hover:bg-[#fff8e9]"}`;
}

function normalizeStatus(status?: string) {
  const value = (status || "").toLowerCase();
  if (value.includes("hoàn")) return "completed";
  if (value.includes("đang")) return "active";
  if (value.includes("tạm")) return "paused";
  if (value.includes("hủy")) return "cancelled";
  return "unknown";
}

function stripHtml(html?: string) {
  return (html || "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--/--/----";
  return date.toLocaleDateString("vi-VN");
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function formatCompactMoney(value: number) {
  if (!value) return "0";
  return new Intl.NumberFormat("vi-VN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}
