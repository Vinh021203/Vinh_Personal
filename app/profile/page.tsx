import { Suspense } from "react";
import ProfileClient from "./ProfileClient";
import { createMetadata } from "@/libs/seo";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata = createMetadata({ title: "Hồ sơ cá nhân", description: "Quản lý thông tin hồ sơ và quyền truy cập tài khoản VinhWorks.", path: "/profile", noIndex: true });
export default function ProfilePage() { return <Suspense fallback={<LoadingSpinner fullScreen size="lg" label="Đang tải hồ sơ" />}><ProfileClient /></Suspense>; }
