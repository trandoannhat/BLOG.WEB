import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

// THÊM IMPORT THƯ VIỆN GOOGLE ANALYTICS
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 👇 ĐÃ CẬP NHẬT: Tiêu đề mang đậm chất cá nhân chuyên gia
  title: "NhatDev | Tech Lead & Solution Architect",

  // 👇 ĐÃ CẬP NHẬT: Mô tả nhấn mạnh vào kinh nghiệm cá nhân, tư duy hệ thống
  description:
    "Blog cá nhân của NhatDev (Trần Doãn Nhất). Nơi chia sẻ kinh nghiệm thực chiến về thiết kế kiến trúc hệ thống (System Design), quản lý dự án (Tech Lead), và phát triển phần mềm hiệu suất cao với .NET, Next.js & Cloud.",

  // 👇 ĐÃ CẬP NHẬT: Từ khóa kết hợp giữa thương hiệu cá nhân và chức danh chuyên gia
  keywords: [
    "Trần Doãn Nhất",
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

  // NƠI ĐIỀN MÃ XÁC MINH GOOGLE SEARCH CONSOLE
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
        {/* ĐẶT TOASTER Ở ĐÂY (Nó sẽ hiển thị thông báo ở góc trên bên phải) */}
        <Toaster position="top-right" reverseOrder={false} />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-8 mt-auto transition-colors duration-300 text-center">
            <div className="max-w-6xl mx-auto px-6 text-gray-500 dark:text-gray-400 text-sm">
              {/* 👇 ĐÃ CẬP NHẬT: Footer thể hiện tính cá nhân nhưng vẫn giữ lại NhatSoft làm tiền đề */}
              © {new Date().getFullYear()} NhatDev. Phát triển và quản trị bởi
              NhatSoft. Tất cả quyền được bảo lưu.
            </div>
          </footer>
        </ThemeProvider>

        {/* NƠI ĐIỀN MÃ GOOGLE ANALYTICS */}
        <GoogleAnalytics gaId="G-M420J9CRMP" />
      </body>
    </html>
  );
}
