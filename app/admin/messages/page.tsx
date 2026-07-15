import { Suspense } from "react";
import AdminMessagesClient from "./AdminMessagesClient";

// Trang tin nhắn luôn dùng dữ liệu động để tránh cache sai hội thoại.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tin nhắn hỗ trợ | Admin Dashboard",
  description: "Quản lý tin nhắn và hỗ trợ khách hàng trong CMS VinhWorks.",
};

export default function AdminMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="border border-zinc-950 bg-zinc-950 px-6 py-4 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[6px_6px_0_#ffb21c]">
            Đang tải tin nhắn
          </div>
        </div>
      }
    >
      <AdminMessagesClient />
    </Suspense>
  );
}
