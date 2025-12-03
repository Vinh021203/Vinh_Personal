import { Suspense } from "react";
import PostListClient from "./PostListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản lý bài viết | Admin",
  description: "Danh sách và quản lý bài viết blog.",
};

export default function PostListPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <PostListClient />
    </Suspense>
  );
}
