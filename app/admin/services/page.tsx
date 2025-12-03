import { Suspense } from "react";
import ServiceListClient from "./ServiceListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản lý Dịch vụ | Admin Dashboard",
  description: "Danh sách các dịch vụ bạn cung cấp.",
};

export default function ServiceListPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <ServiceListClient />
    </Suspense>
  );
}
