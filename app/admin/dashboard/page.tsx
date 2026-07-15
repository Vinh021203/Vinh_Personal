// app/admin/dashboard/page.tsx
import { Suspense } from "react";
import AdminDashboardClient from "./AdminDashboardClient";
import LoadingSpinner from "@/components/LoadingSpinner";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | VinhWorks",
  description: "Bảng điều khiển thống kê hệ thống cho admin.",
};

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-[#fff8e9]"><LoadingSpinner size="lg" label="Đang tải dashboard" /></div>
      }
    >
      <AdminDashboardClient />
    </Suspense>
  );
}
