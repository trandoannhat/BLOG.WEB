import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      {/*  THÊM suppressHydrationWarning VÀO ĐÂY  */}
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-gray-50 text-gray-800 flex flex-col min-h-screen`}
      >
        {/* HEADER */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 tracking-tight"
            >
              NhatDev<span className="text-gray-800">.</span>
            </Link>

            <nav className="hidden md:flex gap-8 font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <Link
                href="/projects"
                className="hover:text-blue-600 transition-colors"
              >
                Dự án
              </Link>
              <Link
                href="/blog"
                className="hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="hover:text-blue-600 transition-colors"
              >
                Về tôi
              </Link>
            </nav>

            <a
              href="mailto:nhat@dev.com"
              className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Liên hệ ngay
            </a>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} NhatDev. Xây dựng bằng Next.js & .NET
            8.
          </div>
        </footer>
      </body>
    </html>
  );
}
