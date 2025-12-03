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
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">
              Đang tải trình tạo dự án...
            </p>
          </div>
        </div>
      }
    >
      <CreateProjectClient />
    </Suspense>
  );
}
