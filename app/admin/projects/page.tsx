import { Suspense } from "react";
import ProjectListClient from "./ProjectListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản lý dự án | Admin Dashboard",
  description: "Danh sách và quản lý các dự án đã thực hiện.",
};

export default function ProjectListPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center">
          <div className="border border-zinc-950 bg-zinc-950 px-6 py-5 text-white shadow-[5px_5px_0_#ffb21c]">
            <div className="flex items-center gap-3">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffb21c] border-t-transparent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Đang tải dự án</span>
            </div>
          </div>
        </div>
      }
    >
      <ProjectListClient />
    </Suspense>
  );
}
