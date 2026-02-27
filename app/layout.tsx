import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 👇 Nhúng component Navbar bạn vừa tạo vào đây
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// Cấu hình SEO mặc định cho toàn bộ trang web
export const metadata: Metadata = {
  title: "NhatDev | Software Engineer & Tech Lead",
  description:
    "Trang blog cá nhân và portfolio của NhatDev - Chia sẻ kiến thức lập trình .NET, React, Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* THÊM suppressHydrationWarning VÀO ĐÂY  */}
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-gray-50 text-gray-800 flex flex-col min-h-screen`}
      >
        {/* 👇 HEADER MỚI (Xử lý được Mobile & Menu Active) */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} NhatDev. Xây dựng và quản trị bởi
            NhatDev. Tất cả quyền được bảo lưu.
          </div>
        </footer>
      </body>
    </html>
  );
}
