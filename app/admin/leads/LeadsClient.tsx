"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Inbox, Mail, Phone, RefreshCw, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type LeadStatus = "new" | "contacted" | "qualified" | "archived";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  subject?: string;
  message: string;
  source: string;
  status: LeadStatus;
  createdAt: string;
}

const statuses: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "Mới" },
  { value: "contacted", label: "Đã liên hệ" },
  { value: "qualified", label: "Tiềm năng" },
  { value: "archived", label: "Lưu trữ" },
];

export default function LeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      setLeads(await res.json());
    } catch {
      toast.error("Không thể tải leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? leads : leads.filter((lead) => lead.status === filter)),
    [filter, leads],
  );

  const updateStatus = async (id: string, status: LeadStatus) => {
    const previous = leads;
    setLeads((items) => items.map((lead) => (lead._id === id ? { ...lead, status } : lead)));
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setLeads(previous);
      toast.error("Không thể cập nhật lead");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Xóa lead này?")) return;
    const previous = leads;
    setLeads((items) => items.filter((lead) => lead._id !== id));
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setLeads(previous);
      toast.error("Không thể xóa lead");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8e9] px-4 py-7 text-zinc-950 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <section className="grid overflow-hidden border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c] lg:grid-cols-[1fr_0.75fr]">
        <div className="p-6 lg:p-9">
          <span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-950 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[.22em] shadow-[3px_3px_0_#ffb21c]">
            <Inbox size={14} className="text-[#df8200]" /> Lead control
          </span>
          <h1 className="mt-7 text-[clamp(3rem,8vw,6.5rem)] font-black leading-[.85] tracking-[-.07em]">
            Quản lý <span className="text-[#df8200]">leads.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
            Lưu lại yêu cầu từ form liên hệ, phân loại trạng thái và theo dõi khách hàng tiềm năng trong CMS.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={fetchLeads} className="inline-flex items-center gap-3 border border-zinc-950 bg-white px-5 py-3 text-xs font-black uppercase shadow-[3px_3px_0_#ffb21c]">
              <RefreshCw size={15} /> Làm mới
            </button>
            <a href="/api/admin/export?type=leads&format=csv" className="inline-flex items-center gap-3 border border-zinc-950 bg-[#ffb21c] px-5 py-3 text-xs font-black uppercase shadow-[3px_3px_0_#18181b]">
              <Download size={15} /> Export CSV
            </a>
          </div>
        </div>
        <div className="border-t border-zinc-950 bg-zinc-950 p-6 text-white lg:border-l lg:border-t-0 lg:p-9">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#ffb21c]">Lead snapshot</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {statuses.map((status) => (
              <button key={status.value} onClick={() => setFilter(status.value)} className="border border-white/20 p-4 text-left hover:border-[#ffb21c]">
                <p className="text-[9px] font-black uppercase tracking-[.18em] text-white/50">{status.label}</p>
                <p className="mt-3 text-3xl font-black">{leads.filter((lead) => lead.status === status.value).length.toString().padStart(2, "0")}</p>
              </button>
            ))}
          </div>
          <button onClick={() => setFilter("all")} className="mt-4 w-full border border-[#ffb21c] px-4 py-3 text-xs font-black uppercase text-[#ffb21c]">Xem tất cả</button>
        </div>
      </section>

      <section className="mt-8 border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c]">
        {loading ? (
          <div className="grid min-h-56 place-items-center text-xs font-black uppercase tracking-[.2em]">Đang tải leads</div>
        ) : filtered.length === 0 ? (
          <div className="grid min-h-56 place-items-center p-8 text-center">
            <p className="text-2xl font-black">Chưa có lead phù hợp.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">
            {filtered.map((lead) => (
              <article key={lead._id} className="grid gap-5 p-5 lg:grid-cols-[1fr_190px_120px] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-black">{lead.name}</h2>
                    <span className="border border-zinc-950 bg-[#fff8e9] px-2 py-1 text-[9px] font-black uppercase">{lead.source}</span>
                    <span className="text-xs font-bold text-slate-400">{new Date(lead.createdAt).toLocaleString("vi-VN")}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm font-bold text-slate-600">
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2"><Mail size={15} />{lead.email}</a>
                    {lead.phone && <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2"><Phone size={15} />{lead.phone}</a>}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{lead.message}</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-[.12em] text-[#df8200]">{lead.service || "Chưa chọn dịch vụ"} · {lead.budget || "Chưa rõ ngân sách"}</p>
                </div>
                <select value={lead.status} onChange={(e) => updateStatus(lead._id, e.target.value as LeadStatus)} className="admin-select">
                  {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                </select>
                <button onClick={() => deleteLead(lead._id)} className="inline-flex h-12 items-center justify-center gap-2 border border-zinc-950 bg-white text-xs font-black uppercase hover:bg-red-600 hover:text-white">
                  <Trash2 size={15} /> Xóa
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
