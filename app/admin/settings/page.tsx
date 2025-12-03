import { Suspense } from "react";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cài đặt hệ thống | Admin Dashboard",
  description: "Tùy chỉnh cấu hình website của bạn.",
};

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <SettingsClient />
    </Suspense>
  );
}
