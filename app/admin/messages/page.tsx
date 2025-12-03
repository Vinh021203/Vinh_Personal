import { Suspense } from "react";
import AdminMessagesClient from "./AdminMessagesClient";

// Đánh dấu trang này luôn động (không prerender tĩnh) để tránh lỗi build
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tin nhắn hỗ trợ | Admin Dashboard",
  description: "Quản lý tin nhắn và hỗ trợ khách hàng.",
};

export default function AdminMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <AdminMessagesClient />
    </Suspense>
  );
}
