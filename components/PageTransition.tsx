"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import CSS mặc định của nprogress
import { motion, AnimatePresence } from "framer-motion";

// Cấu hình NProgress (tùy chọn)
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Reset scroll khi đổi route
  useEffect(() => {
    window.scrollTo(0, 0);
    NProgress.done(); // Kết thúc loading khi route thay đổi xong
  }, [pathname]);

  // Giả lập loading start khi click link (Next.js App Router không có event routeChangeStart chuẩn)
  useEffect(() => {
    // Bạn có thể trigger NProgress.start() ở các component Link nếu muốn chính xác hơn,
    // nhưng useEffect này sẽ dọn dẹp thanh loading khi render xong.
    // Hack nhẹ: Mỗi khi pathname đổi, component này re-render, nghĩa là trang mới đã load xong.
    // Để có hiệu ứng loading thực sự khi click, bạn nên dùng một custom Link component hoặc context.
    // Tuy nhiên, ScrollToTop sẽ hoạt động tốt nhờ `window.scrollTo(0, 0)`.
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
