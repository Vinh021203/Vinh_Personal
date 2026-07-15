import { Suspense } from "react";
import UserListClient from "./UserListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản lý người dùng | VinhWorks CMS",
  description: "Quản lý thành viên, vai trò và trạng thái tài khoản trong CMS VinhWorks.",
};

export default function UserListPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center">
          <div className="border border-zinc-950 bg-zinc-950 px-7 py-5 text-sm font-black uppercase tracking-[0.22em] text-white shadow-[6px_6px_0_#ffb21c]">
            Đang tải người dùng
          </div>
        </div>
      }
    >
      <UserListClient />
    </Suspense>
  );
}
