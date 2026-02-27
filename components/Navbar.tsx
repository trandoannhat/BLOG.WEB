"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle"; // 👇 IMPORT NÚT TOGGLE

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Dự án", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Về tôi", path: "/about" },
  ];

  return (
    // 👇 Thêm dark:bg-gray-900 và dark:border-gray-800
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-black text-blue-600 tracking-tight flex-shrink-0"
        >
          NhatDev<span className="text-gray-800 dark:text-white">.</span>
        </Link>

        {/* MENU DESKTOP */}
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
                    ? "text-blue-600 dark:text-blue-400 font-bold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* NÚT CHỨC NĂNG (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          {/* 👇 GẮN NÚT TOGGLE VÀO ĐÂY */}
          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-2"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm"
          >
            Đăng ký
          </Link>
        </div>

        {/* NÚT MOBILE MENU & TOGGLE */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile cũng cần nút Toggle */}
          <ThemeToggle />

          <button
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
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
      </div>

      {/* MENU MOBILE KHUNG XỔ XUỐNG */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-lg absolute w-full left-0 transition-colors">
          <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.path ||
                (link.path !== "/" && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive
                      ? "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3 px-3">
              <Link
                href="/login"
                className="text-center font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
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
