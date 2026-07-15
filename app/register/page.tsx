import { Suspense } from "react";
import RegisterClient from "./RegisterClient";
import { createMetadata } from "@/libs/seo";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata = createMetadata({ title: "Đăng ký tài khoản", description: "Tạo tài khoản VinhWorks để truy cập các tính năng dành cho thành viên.", path: "/register", noIndex: true });
export default function RegisterPage() { return <Suspense fallback={<LoadingSpinner fullScreen size="lg" label="Đang tải đăng ký" />}><RegisterClient /></Suspense>; }
