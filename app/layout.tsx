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
  // 👇 ĐÃ CẬP NHẬT: Tiêu đề chuẩn hướng Giải pháp / Doanh nghiệp
  title: "NhatSoft | Giải pháp Phần mềm & Kiến trúc Hệ thống",

  // 👇 ĐÃ CẬP NHẬT: Mô tả nhấn mạnh vào năng lực xây dựng hệ thống và chuyên môn
  description:
    "NhatSoft chuyên thiết kế kiến trúc hệ thống (System Design), phát triển phần mềm hiệu suất cao và cung cấp các giải pháp chuyển đổi số. Nơi chia sẻ kinh nghiệm thực chiến chuyên sâu với .NET, Next.js và Cloud Computing.",

  // 👇 ĐÃ CẬP NHẬT: Bộ từ khóa thu hút các đối tác/khách hàng doanh nghiệp
  keywords: [
    "NhatSoft",
    "Giải pháp phần mềm",
    "Kiến trúc hệ thống",
    "System Design",
    "Chuyển đổi số",
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
              © {new Date().getFullYear()} NhatSoft. Phát triển và quản trị bởi
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
