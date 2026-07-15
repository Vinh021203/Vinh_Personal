import { Suspense } from "react";
import SettingsClient from "./SettingsClient";
import { createMetadata } from "@/libs/seo";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata = createMetadata({ title: "Cài đặt tài khoản", description: "Quản lý thông tin nhận diện và bảo mật tài khoản VinhWorks.", path: "/settings", noIndex: true });
export default function SettingsPage() { return <Suspense fallback={<LoadingSpinner fullScreen size="lg" label="Đang tải cài đặt" />}><SettingsClient /></Suspense>; }
