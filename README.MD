# 🚀 VinhWorks - Personal Dashboard & Admin Panel

Một ứng dụng Full-stack Web hiện đại được xây dựng bằng **Next.js 14+ (App Router)**, cung cấp giải pháp quản lý người dùng, bảng điều khiển cá nhân và tích hợp các tính năng bảo mật mạnh mẽ.

## ✨ Tính năng nổi bật

### 🔐 Xác thực & Bảo mật (Authentication)

- **Đăng nhập/Đăng xuất:** Sử dụng JWT (JSON Web Token) lưu trữ an toàn trong Cookies (HTTP-only).
- **Middleware:** Bảo vệ các Route (Admin/User), tự động chuyển hướng khi chưa đăng nhập.
- **Mã hóa mật khẩu:** Sử dụng `bcryptjs` để hash mật khẩu trước khi lưu vào database.

### 👤 Quản lý Người dùng (User Management)

- **CRUD:** Admin có thể Xem danh sách, Tạo mới, Chỉnh sửa và Xóa người dùng.
- **Tìm kiếm & Lọc:** Tìm kiếm theo tên/email và lọc theo vai trò (Admin/User).
- **Phân trang:** Hiển thị danh sách người dùng mượt mà.

### ⚙️ Cài đặt Tài khoản (Settings Page)

- **Cập nhật thông tin:** Thay đổi tên hiển thị.
- **Upload Avatar:** Tích hợp **Cloudinary** để upload và lưu trữ ảnh đại diện.
- **Đổi mật khẩu:** Xác thực mật khẩu cũ/mới an toàn.
- **Cache Busting:** Cơ chế tự động cập nhật ảnh đại diện ngay lập tức sau khi upload (tránh cache trình duyệt).

### 🎨 Giao diện (UI/UX)

- **Responsive:** Tương thích hoàn toàn trên Mobile và Desktop.
- **Animations:** Hiệu ứng mượt mà với `Framer Motion`.
- **Thông báo:** Hệ thống Toast notification (`react-hot-toast`) phản hồi thao tác người dùng.
- **Chatbot UI:** Giao diện hỗ trợ trực tuyến tích hợp sẵn.

---

## 🛠️ Công nghệ sử dụng

### Frontend

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Motion:** [Framer Motion](https://www.framer.com/motion/)
- **State:** React Context API (`UserContext`)

### Backend

- **Runtime:** Next.js API Routes (Route Handlers)
- **Database:** [MongoDB](https://www.mongodb.com/) (thông qua [Mongoose](https://mongoosejs.com/))
- **Auth:** `jose` (JWT handling), `bcryptjs`
- **Storage:** [Cloudinary](https://cloudinary.com/) (Image hosting)

---

## 🚀 Cài đặt và Chạy dự án

### 1. Clone dự án

git clone https://github.com/username/project-name.git
cd project-name

text

### 2. Cài đặt dependencies

npm install

hoặc
yarn install

text

### 3. Cấu hình biến môi trường (.env)

Tạo file `.env` tại thư mục gốc và điền các thông tin sau:

Kết nối MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name

JWT Secret (Chuỗi ngẫu nhiên bảo mật)
JWT_SECRET=your_super_secret_random_string

Cloudinary (Upload ảnh)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Base URL (Localhost)
NEXT_PUBLIC_API_URL=http://localhost:3000

text

### 4. Chạy dự án

npm run dev

text
Truy cập `http://localhost:3000` để xem kết quả.

---

## 📂 Cấu trúc thư mục chính

├── app/
│ ├── api/ # Backend API Routes
│ │ ├── auth/ # Login, Logout, Me
│ │ └── users/ # User CRUD
│ ├── (auth)/ # Login Page
│ ├── admin/ # Admin Dashboard Pages
│ ├── settings/ # User Settings Page
│ └── layout.tsx # Root Layout & Providers
├── components/ # Reusable UI Components
├── contexts/ # React Context (UserContext)
├── libs/ # Utility functions (MongoDB connect, Cloudinary config)
├── models/ # Mongoose Schemas (User)
└── public/ # Static assets

text

---

## ⚠️ Các lưu ý quan trọng khi phát triển

1.  **Next.js Image:** Khi hiển thị ảnh từ Cloudinary hoặc nguồn ngoài, cần thêm cấu hình `images.remotePatterns` trong `next.config.js` hoặc sử dụng thuộc tính `unoptimized={true}` trong thẻ `<Image />`.
2.  **MongoDB ObjectId:** Khi truyền ID vào URL API, hãy đảm bảo ép kiểu về String (`String(user._id)`) để tránh lỗi `[object Object]`.
3.  **Context Refresh:** Sau khi cập nhật dữ liệu user (như avatar), cần gọi hàm `refreshUser()` để đồng bộ lại UI header và sidebar.

---

## 🤝 Đóng góp

Dự án được phát triển bởi **VinhWorks Enterprise**. Mọi đóng góp vui lòng tạo Pull Request hoặc Issues.
