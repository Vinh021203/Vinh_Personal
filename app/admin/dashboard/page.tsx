// app/admin/dashboard/page.tsx
import { Suspense } from "react";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | VinhWorks",
  description: "Bảng điều khiển thống kê hệ thống cho admin.",
};

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-orange-50">
          <p className="text-sm font-semibold text-orange-600">
            Đang tải dashboard...
          </p>
        </div>
      }
    >
      <AdminDashboardClient />
    </Suspense>
  );
}
