import { Suspense } from "react";
import UserListClient from "./UserListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản lý Người dùng | Admin Dashboard",
  description: "Danh sách và quản lý người dùng hệ thống.",
};

export default function UserListPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <UserListClient />
    </Suspense>
  );
}
