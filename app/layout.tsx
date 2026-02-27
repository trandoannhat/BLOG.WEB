import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
// 👇 1. IMPORT THEME PROVIDER VỪA TẠO
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NhatDev | Software Engineer & Tech Lead",
  description: "Trang blog cá nhân và portfolio của NhatDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* 👇 2. Đổi bg-gray-50 thành dark:bg-gray-900 để màn hình đổi màu */}
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 flex flex-col min-h-screen transition-colors duration-300`}
      >
        {/* 👇 3. BỌC TOÀN BỘ APP BẰNG THEMEPROVIDER */}
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

          <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-8 mt-auto transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} NhatDev. Xây dựng và quản trị bởi
              NhatDev. Tất cả quyền được bảo lưu.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
