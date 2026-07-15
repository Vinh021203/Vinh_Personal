import { Suspense } from "react";
import LoginClient from "./LoginClient";
import { createMetadata } from "@/libs/seo";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata = createMetadata({
  title: "Đăng nhập",
  description: "Đăng nhập vào không gian quản lý VinhWorks.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen size="lg" label="Đang tải đăng nhập" />}>
      <LoginClient />
    </Suspense>
  );
}
