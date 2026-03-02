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
  // 👇 ĐÃ SỬA: Đổi tên và tối ưu tiêu đề chuẩn SEO
  title: "NhatSoft | Software Engineer & Tech Lead",

  // 👇 ĐÃ SỬA: Mở rộng mô tả (Description) để Google dễ lập chỉ mục trang web của bạn hơn
  description:
    "Trang blog và portfolio của NhatSoft. Nơi chia sẻ kiến thức chuyên sâu về phát triển phần mềm, System Design, .NET, Next.js, và kinh nghiệm thực chiến trong các dự án công nghệ.",

  // 👇 THÊM TỪ KHÓA: Giúp các công cụ tìm kiếm hiểu rõ trang web của bạn nói về chủ đề gì
  keywords: [
    "NhatSoft",
    "Blog lập trình",
    "Software Engineer",
    ".NET",
    "Next.js",
    "System Design",
    "Tech Lead",
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

          {/* 👇 ĐÃ SỬA FOOTER: Thay NhatDev thành NhatSoft */}
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
