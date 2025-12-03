import { Suspense } from "react";
import ProjectListClient from "./ProjectListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản lý Dự án | Admin Dashboard",
  description: "Danh sách và quản lý các dự án đã thực hiện.",
};

export default function ProjectListPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <ProjectListClient />
    </Suspense>
  );
}
