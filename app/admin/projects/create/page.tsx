import { Suspense } from "react";
import CreateProjectClient from "./CreateProjectClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tạo dự án mới | Admin Dashboard",
  description: "Thêm dự án mới vào portfolio của bạn.",
};

export default function CreateProjectPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[70vh] place-items-center">
          <div className="border border-zinc-950 bg-zinc-950 px-6 py-5 text-white shadow-[5px_5px_0_#ffb21c]">
            <div className="flex items-center gap-3">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffb21c] border-t-transparent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Đang tải trình tạo dự án</span>
            </div>
          </div>
        </div>
      }
    >
      <CreateProjectClient />
    </Suspense>
  );
}
