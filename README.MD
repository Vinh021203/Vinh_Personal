# 🚀 VinhWorks - Personal Dashboard & Admin Panel

Hệ thống Full-stack Web hiện đại quản lý người dùng và nội dung cá nhân, xây dựng trên nền tảng **Next.js 14+ (App Router)** và **MongoDB**.

🔗 **Live Demo:** [https://vinhwork.vercel.app](https://vinhwork.vercel.app)

## ✨ Tính năng cốt lõi

*   **🔐 Authentication:** Đăng nhập/Đăng xuất an toàn với JWT (HTTP-only Cookies) & Mã hóa mật khẩu (`bcryptjs`).
*   **🛡️ Middleware:** Bảo vệ routes Admin/User, điều hướng thông minh theo phân quyền.
*   **👤 User Management (CRUD):** Admin quản lý toàn bộ người dùng (Xem, Thêm, Sửa, Xóa, Tìm kiếm, Phân trang).
*   **⚙️ Settings & Profile:** Người dùng tự cập nhật thông tin, đổi mật khẩu và **Upload Avatar** (tích hợp Cloudinary).
*   **🎨 Modern UI/UX:** Giao diện Responsive, hiệu ứng mượt mà (`Framer Motion`), thông báo Toast và chế độ Dark/Light mode.

---

## 🛠️ Tech Stack

*   **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
*   **Backend:** Next.js API Routes (Serverless Functions).
*   **Database:** MongoDB (Mongoose ODM).
*   **Storage:** Cloudinary (Image Upload).
*   **Auth:** `jose` (JWT), `bcryptjs`.

---

## 🚀 Cài đặt & Chạy dự án

### 1. Khởi tạo
git clone https://github.com/Vinh021203/Vinh_Personal.git
cd Vinh_Personal
npm install

text

### 2. Cấu hình môi trường (`.env.local`)
Tạo file `.env.local` tại thư mục gốc:

Database
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/vinhworks_db

Auth Secret
JWT_SECRET=chuoi_bao_mat_ngau_nhien_cua_ban

Cloudinary (Upload ảnh)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

App Config
NEXT_PUBLIC_API_URL=http://localhost:3000

text

### 3. Chạy Dev Server
npm run dev

text
Truy cập: `http://localhost:3000`

---

## 📂 Cấu trúc thư mục (App Router)

├── app/
│ ├── api/ # Backend Routes (REST API)
│ ├── (public)/ # Các trang công khai (Home, Blog, Pricing...)
│ ├── (auth)/ # Trang đăng nhập/đăng ký
│ ├── admin/ # Dashboard quản trị (Protected)
│ └── settings/ # Cài đặt tài khoản cá nhân
├── components/ # UI Components tái sử dụng
├── contexts/ # Global State (UserContext)
├── libs/ # Database connect, Auth helpers
└── models/ # Mongoose Schemas

text

---

## ⚠️ Lưu ý phát triển

1.  **Middleware (Proxy):** File `proxy.ts` (cũ là `middleware.ts`) xử lý logic chặn truy cập Admin.
2.  **SEO:** File `robots.ts` và `sitemap.ts` được cấu hình tự động chặn bot vào trang Admin/API.
3.  **Deploy:** Đã cấu hình chuẩn cho Vercel (`force-dynamic` ở các trang cần thiết).

---

© 2025 **VinhWorks**. Developed by Luong Vinh.
