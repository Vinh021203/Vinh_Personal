import { Suspense } from "react";
import CreateServiceClient from "./CreateServiceClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tạo dịch vụ mới | Admin Dashboard",
  description: "Thêm dịch vụ mới vào danh mục của bạn.",
};

export default function CreateServicePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">
              Đang tải form tạo dịch vụ...
            </p>
          </div>
        </div>
      }
    >
      <CreateServiceClient />
    </Suspense>
  );
}
