"use client"; // Bắt buộc để dùng useState và usePathname

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Lấy URL hiện tại để xử lý Active Menu

  // Danh sách menu
  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Dự án", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Về tôi", path: "/about" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 1. LOGO */}
        <Link
          href="/"
          className="text-2xl font-black text-blue-600 tracking-tight flex-shrink-0"
        >
          NhatDev<span className="text-gray-800">.</span>
        </Link>

        {/* 2. MENU DESKTOP */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 font-bold" // Màu khi Active
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. NÚT ĐĂNG NHẬP / ĐĂNG KÝ (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            Đăng ký
          </Link>
        </div>

        {/* 4. NÚT MỞ MENU MOBILE (HAMBURGER ICON) */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 5. MENU MOBILE (Sẽ xổ xuống khi bấm nút) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.path ||
                (link.path !== "/" && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)} // Bấm xong tự đóng
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
              <Link
                href="/login"
                className="text-center font-semibold text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="text-center font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
