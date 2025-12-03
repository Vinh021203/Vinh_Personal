import { Suspense } from "react";
import CreatePostClient from "./CreatePostClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Viết bài mới | Admin Dashboard",
  description: "Trang tạo bài viết mới",
};

export default function CreatePostPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Đang tải trình soạn thảo...
        </div>
      }
    >
      <CreatePostClient />
    </Suspense>
  );
}
