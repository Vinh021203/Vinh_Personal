# VinhWorks — Website cá nhân và dịch vụ thiết kế website

**VinhWorks** là website của **Lương Vinh**, giới thiệu năng lực lập trình, các dự án đã thực hiện và dịch vụ xây dựng website, landing page, ứng dụng web, thiết kế UI/UX và tối ưu SEO.

Trọng tâm của website là giúp khách hàng hiểu rõ dịch vụ, xem sản phẩm thực tế và gửi yêu cầu tư vấn hoặc báo giá. Khu vực quản trị hỗ trợ Vinh quản lý dự án, dịch vụ và các yêu cầu liên hệ ngay trong cùng hệ thống.

- **Website:** [vinhwork.io.vn](https://vinhwork.io.vn)
- **Mã nguồn:** [Vinh021203/Vinh_Personal](https://github.com/Vinh021203/Vinh_Personal)

## Chức năng chính

### Dành cho khách truy cập

- Giới thiệu thông tin cá nhân, chuyên môn và quy trình làm việc của Lương Vinh.
- Trưng bày danh sách dự án và trang chi tiết từng dự án.
- Giới thiệu dịch vụ và các gói giá tham khảo.
- Tiếp nhận nhu cầu tư vấn, báo giá qua biểu mẫu liên hệ và trang bảng giá.
- Hỗ trợ trao đổi nhanh qua khung trò chuyện và các nút liên hệ.
- Đăng ký, đăng nhập, xem hồ sơ và cài đặt tài khoản.

Giao diện được thiết kế để sử dụng trên điện thoại và máy tính, có hiệu ứng chuyển trang, trạng thái tải và thông báo thao tác. Các trang công khai có cấu hình thông tin SEO, ảnh chia sẻ, sitemap và robots.

### Dành cho quản trị viên

Khu vực `/admin` dành cho tài khoản có vai trò `admin`, gồm:

- Bảng tổng quan hoạt động.
- Quản lý dự án và dịch vụ.
- Quản lý người dùng.
- Theo dõi yêu cầu tư vấn, báo giá từ khách hàng.
- Quản lý tin nhắn hỗ trợ.
- Cài đặt hệ thống, xem nhật ký hoạt động và xuất dữ liệu.

## Các trang chính

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Trang chủ, giới thiệu VinhWorks và các nội dung nổi bật |
| `/about` | Giới thiệu cá nhân |
| `/projects` | Danh sách dự án |
| `/projects/[slug]` | Chi tiết dự án |
| `/services` | Dịch vụ cung cấp |
| `/pricing` | Bảng giá và yêu cầu báo giá |
| `/contact` | Thông tin liên hệ và biểu mẫu tư vấn |
| `/login`, `/register` | Đăng nhập và đăng ký |
| `/profile`, `/settings` | Hồ sơ và cài đặt tài khoản |
| `/admin` | Khu vực quản trị |

## Công nghệ sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| Next.js 15, React 19, TypeScript | Xây dựng giao diện, định tuyến và API |
| Tailwind CSS | Định dạng giao diện và bố cục thích ứng |
| Framer Motion | Hiệu ứng và chuyển động |
| Lucide React, React Icons | Biểu tượng giao diện |
| Zustand, React Context | Quản lý trạng thái phía trình duyệt |
| React Hot Toast | Thông báo thao tác |
| MongoDB, Mongoose | Lưu trữ và thao tác dữ liệu |
| JWT, Jose, bcryptjs | Xác thực, phân quyền và băm mật khẩu |
| Cloudinary | Lưu trữ và xử lý hình ảnh |
| Resend | Gửi email thông báo yêu cầu tư vấn, báo giá |

## Cấu trúc dự án

```text
Vinh_Personal/
├── app/                  # Các trang, bố cục và API
│   ├── admin/            # Giao diện quản trị
│   ├── api/              # API xác thực, dự án, dịch vụ, liên hệ...
│   ├── projects/         # Danh sách và chi tiết dự án
│   ├── services/         # Trang dịch vụ
│   ├── pricing/          # Bảng giá và yêu cầu báo giá
│   └── contact/          # Trang liên hệ
├── components/           # Thành phần giao diện dùng chung
├── contexts/             # Trạng thái người dùng
├── hooks/                # Hook dùng chung
├── libs/                 # Kết nối dữ liệu, xác thực, email, SEO...
├── models/               # Mô hình dữ liệu MongoDB
├── public/               # Hình ảnh, nhận diện thương hiệu và CV
├── styles/               # Định dạng giao diện toàn cục
├── middleware.ts         # Điểm vào kiểm tra quyền truy cập quản trị
├── proxy.ts              # Logic kiểm tra xác thực và vai trò
├── next.config.js        # Cấu hình Next.js
├── package.json          # Thư viện và lệnh chạy
└── README.MD             # Tài liệu dự án
```

## Cài đặt và chạy dự án

Cần có Node.js tương thích với Next.js 15, npm và cơ sở dữ liệu MongoDB. Có thể dùng MongoDB trên máy hoặc MongoDB Atlas.

### 1. Cài đặt thư viện

Tại thư mục gốc của dự án, chạy:

```bash
npm ci
```

### 2. Cấu hình môi trường

Tạo file `.env.local` ở thư mục gốc. Thay các giá trị mẫu dưới đây bằng cấu hình của bạn:

```env
# Cơ sở dữ liệu và xác thực
MONGODB_URI=mongodb://127.0.0.1:27017/vinhworks
JWT_SECRET=thay_bang_chuoi_bi_mat_dai_va_ngau_nhien

# Địa chỉ website dùng cho SEO và liên kết chia sẻ
NEXT_PUBLIC_SITE_URL=https://vinhwork.io.vn

# Cloudinary: cấu hình khi sử dụng chức năng hình ảnh
CLOUDINARY_CLOUD_NAME=ten_cloud_cua_ban
CLOUDINARY_API_KEY=khoa_api_cua_ban
CLOUDINARY_API_SECRET=khoa_bi_mat_cua_ban

# Resend: cấu hình khi cần gửi email thông báo
RESEND_API_KEY=khoa_resend_cua_ban
RESEND_FROM_EMAIL="VinhWorks <no-reply@ten-mien-cua-ban.vn>"
RESEND_TO_EMAIL=email_nhan_thong_bao@example.com
```

`MONGODB_URI` và `JWT_SECRET` cần thiết cho dữ liệu và xác thực. Nếu không cấu hình `RESEND_API_KEY` hoặc địa chỉ nhận email, yêu cầu tư vấn vẫn được lưu nhưng bước gửi email sẽ được bỏ qua. `CONTACT_EMAIL` có thể dùng thay cho `RESEND_TO_EMAIL`.

Không đưa file `.env.local` hoặc thông tin bí mật lên kho mã nguồn. File này đã được loại trừ trong `.gitignore`.

### 3. Chạy trong môi trường phát triển

```bash
npm run dev
```

Mở [localhost:3000](http://localhost:3000) để xem website.

### 4. Tạo bản chạy chính thức

```bash
npm run build
npm run start
```

Khi triển khai, khai báo các biến môi trường trên máy chủ hoặc nền tảng lưu trữ và đặt `NEXT_PUBLIC_SITE_URL` theo tên miền thực tế.

| Lệnh | Mục đích |
| --- | --- |
| `npm run dev` | Chạy máy chủ phát triển |
| `npm run build` | Kiểm tra và tạo bản dựng chính thức |
| `npm run start` | Chạy bản dựng chính thức |

Next.js tạo thư mục `.next-dev` khi phát triển và `.next` khi dựng bản chính thức. Đây là dữ liệu được tạo tự động, không phải mã nguồn và không cần đưa lên Git.

## Luồng tiếp nhận yêu cầu khách hàng

Khách hàng gửi biểu mẫu tại `/contact` hoặc `/pricing`. API `/api/leads` kiểm tra dữ liệu, lưu yêu cầu vào MongoDB và gửi email thông báo qua Resend nếu đã cấu hình. Quản trị viên theo dõi và cập nhật trạng thái xử lý tại `/admin/leads`.

Tin nhắn từ khung trò chuyện được tiếp nhận qua `/api/messages` và quản lý tại `/admin/messages`.

## Tác giả và liên hệ

**Lương Vinh — VinhWorks**

- Website: [vinhwork.io.vn](https://vinhwork.io.vn)
- Điện thoại: [0971 386 588](tel:0971386588)
- Liên hệ tư vấn: [Trang liên hệ VinhWorks](https://vinhwork.io.vn/contact)

## Quyền sử dụng

Đây là dự án website cá nhân của VinhWorks. Vui lòng liên hệ tác giả trước khi sao chép, phân phối hoặc sử dụng thương mại thương hiệu, nội dung và thiết kế của website.
