"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // State quản lý đăng nhập
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // 👇 THÊM STATE QUẢN LÝ TÌM KIẾM
  const [searchQuery, setSearchQuery] = useState("");

  // Kiểm tra trạng thái đăng nhập mỗi khi load lại hoặc đổi trang
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");

    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "NhatDev");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [pathname]);

  const handleLogout = () => {
    // Xóa dữ liệu trong trình duyệt
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");

    // Cập nhật lại UI
    setIsLoggedIn(false);
    setUserName("");
    setIsMobileMenuOpen(false);

    toast.success("Đã đăng xuất thành công!");
    router.push("/login");
  };

  // 👇 THÊM HÀM XỬ LÝ TÌM KIẾM
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setSearchQuery(""); // Xóa nội dung tìm kiếm sau khi enter
    }
  };

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Dự án", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Về tôi", path: "/about" },
  ];

  return (
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
          {/* 👇 THÊM FORM TÌM KIẾM DESKTOP */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-64 pl-4 pr-10 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          <ThemeToggle />

          {/* KHU VỰC ĐĂNG NHẬP / THÔNG TIN USER */}
          {isMounted &&
            (isLoggedIn ? (
              <div className="flex items-center gap-4 ml-2 pl-4 border-l border-gray-200 dark:border-gray-700">
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:opacity-70 transition-opacity"
                >
                  Chào,{" "}
                  <strong className="text-blue-600 dark:text-blue-400">
                    {userName}
                  </strong>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-2 ml-2"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm"
                >
                  Đăng ký
                </Link>
              </>
            ))}
        </div>

        {/* NÚT MOBILE MENU & TOGGLE */}
        <div className="md:hidden flex items-center gap-3">
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
            {/* 👇 THÊM FORM TÌM KIẾM MOBILE */}
            <form onSubmit={handleSearch} className="relative mb-3 mt-1">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

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
              {isMounted &&
                (isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Tài khoản:{" "}
                      <strong className="text-blue-600 dark:text-blue-400">
                        {userName}
                      </strong>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-center font-semibold text-red-500 border border-red-200 dark:border-red-900/50 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Đăng ký
                    </Link>
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
