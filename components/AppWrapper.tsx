"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";
import { Toaster } from "react-hot-toast";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Danh sách các route KHÔNG hiển thị Header/Footer
  const hiddenLayoutRoutes = ["/login", "/register"];

  // Kiểm tra xem route hiện tại có nằm trong danh sách ẩn, HOẶC là trang admin không
  const isHiddenLayout =
    hiddenLayoutRoutes.includes(pathname) || pathname.startsWith("/admin");

  return (
    <>
      {/* Nếu là trang login/register/admin thì chỉ hiện children, ngược lại bọc trong MainLayout */}
      {isHiddenLayout ? children : <MainLayout>{children}</MainLayout>}

      <Toaster position="top-center" />
    </>
  );
}
