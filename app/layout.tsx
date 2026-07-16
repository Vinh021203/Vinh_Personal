import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import AppWrapper from "@/components/AppWrapper";
import { UserProvider } from "@/contexts/UserContext";
import ThemeProvider from "@/components/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import PageTransition from "@/components/PageTransition";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/libs/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VinhWorks | Thiết kế Website & Giải pháp số",
    template: "%s | VinhWorks",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "thiết kế website",
    "lập trình website",
    "Next.js",
    "React",
    "landing page",
    "web application",
    "UI UX",
    "SEO website",
    "Lương Vinh",
    "VinhWorks",
  ],
  authors: [{ name: "Lương Vinh", url: SITE_URL }],
  creator: "Lương Vinh",
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/vinhworks-favicon-512.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/vinhworks-favicon-512.png",
    apple: [{ url: "/vinhworks-favicon-512.png", type: "image/png", sizes: "512x512" }],
  },
  verification: { google: "-elT34SlFd-jN8jKj04dMDqIwcUy-DV2eEIc3k90uLQ" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "VinhWorks | Thiết kế Website & Giải pháp số",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "vi_VN",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Lương Vinh - VinhWorks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VinhWorks | Thiết kế Website & Giải pháp số",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffb21c",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased" suppressHydrationWarning>
        <NextTopLoader
          color="#ffb21c"
          initialPosition={0.12}
          crawlSpeed={160}
          height={4}
          crawl
          showSpinner={false}
          easing="ease-out"
          speed={260}
          shadow="0 1px 0 #18181b,0 0 12px rgba(255,178,28,.55)"
        />
        <UserProvider>
          <ThemeProvider>
            <AppWrapper>
              <PageTransition>{children}</PageTransition>
            </AppWrapper>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
