"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertTriangle,
  ArrowRight,
  Code2,
  DollarSign,
  Edit3,
  Eye,
  Filter,
  Layers,
  LayoutGrid,
  List,
  MonitorSmartphone,
  Plus,
  Search,
  ServerCog,
  Settings,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

interface IService {
  _id: string;
  name: string;
  description: string;
  icon: string;
  status: string;
  createdAt: string;
  featured?: boolean;
  price?: number;
  category?: string;
  image?: string;
}

const PAGE_SIZE = 6;
const iconMap: Record<string, LucideIcon> = { Code2, MonitorSmartphone, Layers, ServerCog, Wrench, Settings };

export default function ServiceListClient() {
  const [services, setServices] = useState<IService[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setServices(data.map((service: any) => ({
          ...service,
          status: normalizeStatus(service.status),
          featured: Boolean(service.featured),
          price: service.price || 0,
          category: service.category || "General",
          image: service.image || "",
        })));
      } catch {
        toast.error("Không thể tải danh sách dịch vụ");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return services.filter((service) => {
      const matchesKeyword =
        service.name.toLowerCase().includes(keyword) ||
        service.description.toLowerCase().includes(keyword) ||
        (service.category || "").toLowerCase().includes(keyword);
      const matchesStatus = filterStatus === "all" || normalizeStatus(service.status) === filterStatus;
      return matchesKeyword && matchesStatus;
    });
  }, [services, searchTerm, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / PAGE_SIZE));
  const currentData = filteredServices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const visibleCount = services.filter((service) => normalizeStatus(service.status) === "Hiển thị").length;
  const featuredCount = services.filter((service) => service.featured).length;
  const totalValue = services.reduce((sum, service) => sum + (service.price || 0), 0);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/services/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      toast.success("Đã xóa dịch vụ");
      setServices((items) => items.filter((service) => service._id !== deleteId));
    } catch {
      toast.error("Xóa dịch vụ thất bại");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="min-h-screen px-4 pb-12 sm:px-6 xl:px-8">
      <Toaster position="top-right" toastOptions={{ style: { background: "#09090b", color: "#fff", border: "1px solid #ffb21c", borderRadius: 0, fontWeight: 800 } }} />

      <section className="mb-8 mt-5 border border-zinc-950 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c] sm:mt-6">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-5 sm:p-8 lg:p-9">
            <div className="mb-6 inline-flex rotate-[-2deg] items-center gap-2 border border-zinc-950 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] shadow-[3px_3px_0_#ffb21c]">
              <Sparkles size={14} className="text-[#df8200]" />
              Service Control
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.88] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
              Quản lý <span className="text-[#df8200]">dịch vụ.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
              Điều phối danh mục dịch vụ, giá khởi điểm, trạng thái hiển thị và các gói nổi bật trên website.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/admin/services/create" className="inline-flex h-12 items-center justify-center gap-3 border border-zinc-950 bg-[#ffb21c] px-6 text-[11px] font-black uppercase tracking-[0.12em] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5">
                <Plus size={18} />
                Thêm dịch vụ
              </Link>
              <Link href="/services" className="inline-flex h-12 items-center justify-center gap-3 border border-zinc-950 bg-white px-6 text-[11px] font-black uppercase tracking-[0.12em] transition hover:bg-zinc-950 hover:text-white">
                Xem ngoài site
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="border-t border-zinc-950 bg-zinc-950 p-5 text-white lg:border-l lg:border-t-0 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffb21c]">Service Snapshot</p>
              <span className="border border-[#ffb21c] px-3 py-1 text-[10px] font-black uppercase text-[#ffb21c]">CMS</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Tổng dịch vụ" value={services.length.toString().padStart(2, "0")} />
              <Metric label="Đang hiển thị" value={visibleCount.toString().padStart(2, "0")} />
              <Metric label="Nổi bật" value={featuredCount.toString().padStart(2, "0")} />
              <Metric label="Tổng giá trị" value={formatCompactMoney(totalValue)} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-7 border border-zinc-950 bg-white p-3 shadow-[5px_5px_0_#e4ded0] sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} placeholder="Tìm dịch vụ, mô tả, danh mục..." className="h-12 w-full border border-zinc-200 bg-[#fff8e9] pl-12 pr-4 text-sm font-bold outline-none transition focus:border-zinc-950 focus:bg-white focus:shadow-[3px_3px_0_#ffb21c]" />
          </label>
          <label className="relative block">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#df8200]" size={17} />
            <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="h-12 w-full border border-zinc-200 bg-white pl-11 pr-10 text-[11px] font-black uppercase outline-none transition focus:border-zinc-950 lg:w-56">
              <option value="all">Tất cả trạng thái</option>
              <option value="Hiển thị">Hiển thị</option>
              <option value="Ẩn">Ẩn</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setViewMode("grid")} className={viewButtonClass(viewMode === "grid")} aria-label="Grid view"><LayoutGrid size={18} /></button>
            <button onClick={() => setViewMode("list")} className={viewButtonClass(viewMode === "list")} aria-label="List view"><List size={18} /></button>
          </div>
        </div>
      </section>

      {currentData.length === 0 ? (
        <EmptyState />
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7">
              {currentData.map((service, index) => <ServiceCard key={service._id} service={service} index={index} onPreview={setSelected} onDelete={confirmDelete} />)}
            </motion.div>
          ) : (
            <ServiceTable services={currentData} onPreview={setSelected} onDelete={confirmDelete} />
          )}
        </AnimatePresence>
      )}

      {filteredServices.length > PAGE_SIZE && (
        <div className="mt-9 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`h-11 w-11 border border-zinc-950 text-sm font-black transition ${currentPage === index + 1 ? "bg-zinc-950 text-[#ffb21c] shadow-[3px_3px_0_#ffb21c]" : "bg-white hover:bg-[#fff8e9]"}`}>{index + 1}</button>
          ))}
        </div>
      )}

      <DeleteModal open={showDeleteModal} loading={isDeleting} onCancel={() => setShowDeleteModal(false)} onConfirm={handleDelete} />
      <PreviewModal service={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function ServiceCard({ service, index, onPreview, onDelete }: { service: IService; index: number; onPreview: (service: IService) => void; onDelete: (id: string) => void }) {
  const Icon = iconMap[service.icon] || Wrench;
  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="group overflow-hidden border border-zinc-950 bg-white shadow-[6px_6px_0_#ffb21c] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]">
      <div className="relative aspect-video border-b border-zinc-950 bg-[#fff8e9]">
        {service.image ? <Image src={service.image} alt={service.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width:1280px) 33vw, 100vw" unoptimized /> : <div className="grid h-full place-items-center"><span className="grid h-20 w-20 place-items-center border border-zinc-950 bg-[#ffb21c] shadow-[4px_4px_0_#111]"><Icon size={34} /></span></div>}
        <div className="absolute left-3 top-3 flex gap-2"><StatusBadge status={service.status} />{service.featured && <span className="inline-flex items-center gap-1 border border-zinc-950 bg-[#ffb21c] px-2 py-1 text-[9px] font-black uppercase"><Star size={12} className="fill-zinc-950" /> Nổi bật</span>}</div>
        <div className="absolute right-3 top-3 flex gap-2"><IconButton onClick={() => onPreview(service)} icon={Eye} label="Xem" /><Link href={`/admin/services/edit/${service._id}`}><IconButton icon={Edit3} label="Sửa" /></Link><IconButton onClick={() => onDelete(service._id)} icon={Trash2} label="Xóa" danger /></div>
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 text-xl font-black leading-tight">{service.name}</h3>
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-zinc-950 bg-white text-[#df8200]"><Icon size={18} /></span>
        </div>
        <p className="mb-5 line-clamp-2 min-h-[3.5rem] text-sm leading-7 text-slate-600">{service.description}</p>
        <div className="border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1 border border-zinc-200 bg-[#fff8e9] px-2 py-1 text-[10px] font-black uppercase text-slate-600"><Tag size={12} /> {service.category || "General"}</span>
            <span className="text-lg font-black">{formatMoney(service.price || 0)} <span className="text-[10px] text-slate-500">VNĐ</span></span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ServiceTable({ services, onPreview, onDelete }: { services: IService[]; onPreview: (service: IService) => void; onDelete: (id: string) => void }) {
  return (
    <motion.div key="list" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="overflow-hidden border border-zinc-950 bg-white shadow-[6px_6px_0_#ffb21c]">
      <div className="scrollbar-hide overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead className="border-b border-zinc-950 bg-zinc-950 text-white"><tr className="text-left text-[10px] font-black uppercase tracking-[0.18em]"><th className="px-5 py-4">Dịch vụ</th><th className="px-5 py-4">Danh mục</th><th className="px-5 py-4">Giá</th><th className="px-5 py-4">Trạng thái</th><th className="px-5 py-4 text-right">Hành động</th></tr></thead>
          <tbody>{services.map((service) => {
            const Icon = iconMap[service.icon] || Wrench;
            return <tr key={service._id} className="border-b border-zinc-200 last:border-b-0 hover:bg-[#fff8e9]"><td className="px-5 py-4"><div className="flex items-center gap-4"><div className="relative grid h-14 w-20 shrink-0 place-items-center border border-zinc-950 bg-[#fff8e9]">{service.image ? <Image src={service.image} alt="" fill className="object-cover" unoptimized /> : <Icon size={22} className="text-[#df8200]" />}</div><div><h4 className="max-w-xs truncate font-black">{service.name}</h4><p className="mt-1 max-w-xs truncate text-xs text-slate-500">{service.description}</p></div></div></td><td className="px-5 py-4 text-sm font-bold text-slate-600">{service.category}</td><td className="px-5 py-4 font-black">{formatMoney(service.price || 0)}</td><td className="px-5 py-4"><StatusBadge status={service.status} /></td><td className="px-5 py-4"><div className="flex justify-end gap-2"><IconButton onClick={() => onPreview(service)} icon={Eye} label="Xem" /><Link href={`/admin/services/edit/${service._id}`}><IconButton icon={Edit3} label="Sửa" /></Link><IconButton onClick={() => onDelete(service._id)} icon={Trash2} label="Xóa" danger /></div></td></tr>;
          })}</tbody>
        </table>
      </div>
    </motion.div>
  );
}

function PreviewModal({ service, onClose }: { service: IService | null; onClose: () => void }) {
  if (!service) return null;
  const Icon = iconMap[service.icon] || Wrench;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/55 p-4 backdrop-blur-sm" onClick={onClose}><div className="w-full max-w-xl overflow-hidden border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c]" onClick={(e) => e.stopPropagation()}><div className="relative aspect-video border-b border-zinc-950 bg-[#fff8e9]">{service.image ? <Image src={service.image} alt={service.name} fill className="object-cover" unoptimized /> : <div className="grid h-full place-items-center"><span className="grid h-24 w-24 place-items-center border border-zinc-950 bg-[#ffb21c] shadow-[4px_4px_0_#111]"><Icon size={42} /></span></div>}<button onClick={onClose} className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-zinc-950 bg-white shadow-[3px_3px_0_#ffb21c]"><X size={20} /></button></div><div className="p-6"><p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#df8200]">{service.category || "General"}</p><h2 className="text-3xl font-black leading-tight">{service.name}</h2><p className="mt-4 text-sm leading-8 text-slate-600">{service.description}</p><div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5"><StatusBadge status={service.status} /><Link href={`/admin/services/edit/${service._id}`} className="border border-zinc-950 bg-[#ffb21c] px-5 py-3 text-[10px] font-black uppercase shadow-[3px_3px_0_#111]">Chỉnh sửa</Link></div></div></div></div>;
}

function DeleteModal({ open, loading, onCancel, onConfirm }: { open: boolean; loading: boolean; onCancel: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/55 p-4 backdrop-blur-sm"><div className="w-full max-w-md border border-zinc-950 bg-white p-6 shadow-[8px_8px_0_#ffb21c]"><div className="mb-5 grid h-14 w-14 place-items-center border border-zinc-950 bg-red-50 text-red-600"><AlertTriangle size={25} /></div><h2 className="text-3xl font-black leading-none">Xóa dịch vụ?</h2><p className="mt-4 text-sm leading-7 text-slate-600">Hành động này không thể hoàn tác.</p><div className="mt-7 grid grid-cols-2 gap-3"><button onClick={onCancel} className="border border-zinc-950 bg-white px-4 py-3 text-[10px] font-black uppercase">Hủy bỏ</button><button onClick={onConfirm} className="border border-zinc-950 bg-red-600 px-4 py-3 text-[10px] font-black uppercase text-white shadow-[3px_3px_0_#111]">{loading ? "Đang xóa" : "Xóa ngay"}</button></div></div></div>;
}

function LoadingState() { return <div className="grid min-h-[60vh] place-items-center"><div className="border border-zinc-950 bg-zinc-950 px-6 py-5 text-white shadow-[5px_5px_0_#ffb21c]"><div className="flex items-center gap-3"><span className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffb21c] border-t-transparent" /><span className="text-[10px] font-black uppercase tracking-[0.2em]">Đang tải dịch vụ</span></div></div></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="border border-white/15 bg-white/5 p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">{label}</p><p className="mt-2 text-3xl font-black text-white">{value}</p></div>; }
function EmptyState() { return <div className="grid min-h-[260px] place-items-center border border-zinc-950 bg-white p-8 text-center shadow-[6px_6px_0_#ffb21c]"><Wrench size={40} className="mx-auto mb-4 text-[#df8200]" /><h3 className="text-2xl font-black">Không có dịch vụ phù hợp</h3><p className="mt-2 text-sm text-slate-600">Thử đổi bộ lọc hoặc thêm dịch vụ mới.</p></div>; }
function StatusBadge({ status }: { status?: string }) { const visible = normalizeStatus(status) === "Hiển thị"; return <span className={`inline-flex border border-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${visible ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>{visible ? "Hiển thị" : "Ẩn"}</span>; }
function IconButton({ icon: Icon, label, danger, onClick }: { icon: LucideIcon; label: string; danger?: boolean; onClick?: () => void }) { return <button onClick={onClick} className={`grid h-10 w-10 place-items-center border border-zinc-950 bg-white transition hover:-translate-y-0.5 ${danger ? "hover:bg-red-600 hover:text-white" : "hover:bg-[#ffb21c]"}`} title={label} type="button"><Icon size={17} /></button>; }
function viewButtonClass(active: boolean) { return `grid h-12 min-w-12 place-items-center border border-zinc-950 transition ${active ? "bg-zinc-950 text-[#ffb21c] shadow-[3px_3px_0_#ffb21c]" : "bg-white hover:bg-[#fff8e9]"}`; }
function normalizeStatus(status?: string) { return status === "Ẩn" ? "Ẩn" : "Hiển thị"; }
function formatMoney(value: number) { return new Intl.NumberFormat("vi-VN").format(value); }
function formatCompactMoney(value: number) { return value ? new Intl.NumberFormat("vi-VN", { notation: "compact", maximumFractionDigits: 1 }).format(value) : "0"; }
