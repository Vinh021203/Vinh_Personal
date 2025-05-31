import '../styles/globals.css';
import { Poppins } from 'next/font/google';
import AppWrapper from '@/components/AppWrapper';
import { UserProvider } from '@/contexts/UserContext'; 

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'VinhWorks | Nền tảng lập trình hiện đại',
  description: 'VinhWorks giúp lập trình viên phát triển sản phẩm nhanh, đẹp, và tối ưu với công nghệ hiện đại.',
  keywords: ['VinhWorks', 'lập trình', 'developer', 'nền tảng', 'frontend', 'nextjs', 'typescript'],
  authors: [{ name: 'VinhWorks Team', url: 'https://vinhworks.vercel.app' }],
  openGraph: {
    title: 'VinhWorks',
    description: 'Nền tảng giúp lập trình viên phát triển sản phẩm đẹp và nhanh.',
    url: 'https://vinhworks.vercel.app',
    siteName: 'VinhWorks',
    images: [
      {
        url: 'https://res.cloudinary.com/your-cloud/image/upload/v1/your-thumbnail.jpg', // ảnh og:image
        width: 1200,
        height: 630,
        alt: 'VinhWorks Preview',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VinhWorks',
    description: 'Nền tảng lập trình viên phát triển nhanh.',
    images: ['https://res.cloudinary.com/your-cloud/image/upload/v1/your-thumbnail.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={poppins.className}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="keywords" content="VinhWorks, lập trình, developer, nền tảng, công nghệ" />
        <meta name="author" content="VinhWorks Team" />
      </head>
      <body className="min-h-screen font-sans text-gray-900 bg-white">
        <UserProvider>
          <AppWrapper>{children}</AppWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
