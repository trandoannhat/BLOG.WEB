import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";

// Bổ sung subset vietnamese để font hiển thị dấu chuẩn xác nhất
const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  // BẮT BUỘC: Khai báo base URL để Next.js xử lý hình ảnh và link SEO
  metadataBase: new URL("https://nhatdev.top"),

  // TỐI ƯU TITLE: Trang chủ sẽ dùng default, các trang con sẽ tự động ghép với template
  title: {
    default: "NhatDev | Tech Lead & Solution Architect",
    template: "%s | NhatDev",
  },

  description:
    "Góc kỹ thuật của NhatDev. Nơi chia sẻ kinh nghiệm thực chiến về thiết kế kiến trúc hệ thống (System Design), quản lý dự án (Tech Lead), và phát triển phần mềm hiệu suất cao với .NET, Next.js & Cloud.",

  keywords: [
    "TDN Dev",
    "NhatDev",
    "NhatSoft",
    "Tech Lead",
    "Solution Architect",
    "System Design",
    "Kiến trúc hệ thống",
    ".NET",
    "Next.js",
    "Tech Blog",
  ],

  // BỔ SUNG OPEN GRAPH: Giúp link hiển thị đẹp khi share Zalo/Facebook/LinkedIn
  openGraph: {
    title: "NhatDev | Tech Lead & Solution Architect",
    description:
      "Khám phá các bài viết chuyên sâu về System Design, .NET và Next.js",
    url: "https://nhatdev.top",
    siteName: "NhatDev Blog",
    locale: "vi_VN",
    type: "website",
  },

  verification: {
    google: "GBMNwm1BLNsPhjR3cJE4iNw3AsXEYSKPfMoItU65Bm0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 flex flex-col min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Đưa Toaster vào trong ThemeProvider và thêm class để hỗ trợ Dark Mode */}
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700",
            }}
          />

          <Navbar />

          <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
            {children}
          </main>

          <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-8 mt-auto transition-colors duration-300 text-center">
            <div className="max-w-6xl mx-auto px-6 text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} NhatDev. Phát triển và quản trị bởi
              NhatSoft. Tất cả quyền được bảo lưu.
            </div>
          </footer>
        </ThemeProvider>

        <GoogleAnalytics gaId="G-M420J9CRMP" />
      </body>
    </html>
  );
}
