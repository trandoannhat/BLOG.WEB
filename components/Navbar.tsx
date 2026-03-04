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

  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const updateAuthData = () => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");
    const avatar = localStorage.getItem("avatarUrl");

    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "NhatSoft");
      setAvatarUrl(avatar || "");
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setAvatarUrl("");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    updateAuthData();

    window.addEventListener("storage", updateAuthData);
    return () => window.removeEventListener("storage", updateAuthData);
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("avatarUrl");

    updateAuthData();
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);

    toast.success("Đã đăng xuất thành công!");
    // 👇 VIỆT HÓA URL
    router.push("/dang-nhap");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 👇 VIỆT HÓA URL (search -> tim-kiem)
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  // 👇 VIỆT HÓA TOÀN BỘ URL NAV LINKS
  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Blog", path: "/bai-viet" },
    { name: "Tin tức", path: "/tin-tuc" }, // news -> tin-tuc
    { name: "Dự án", path: "/du-an" }, // projects -> du-an
    { name: "Về NhatSoft", path: "/gioi-thieu" }, // about -> gioi-thieu
    { name: "Ủng hộ", path: "/ung-ho" }, // donate -> ung-ho
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-black text-blue-600 tracking-tight flex-shrink-0"
        >
          NhatSoft<span className="text-gray-800 dark:text-white">.</span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== "/" &&
                pathname.startsWith(link.path.split("?")[0]) &&
                link.path.includes("categoryId") === false);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium text-sm lg:text-base transition-colors ${
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
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 lg:w-56 xl:w-64 pl-4 pr-10 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200 transition-all"
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

          {/* KHU VỰC ĐĂNG NHẬP / THÔNG TIN USER (DESKTOP) */}
          {isMounted &&
            (isLoggedIn ? (
              <div className="relative flex items-center ml-2 pl-4 border-l border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  <img
                    src={
                      avatarUrl ||
                      `https://ui-avatars.com/api/?name=${userName || "User"}&background=random`
                    }
                    alt="Ảnh đại diện"
                    className="w-9 h-9 rounded-full object-cover border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm"
                  />
                </button>

                {isProfileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50 py-2 transform origin-top-right transition-all">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1 bg-gray-50 dark:bg-gray-900/50">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                          Đang đăng nhập:
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {userName}
                        </p>
                      </div>

                      <Link
                        // 👇 VIỆT HÓA URL (profile -> ho-so)
                        href="/ho-so"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Hồ sơ cá nhân
                      </Link>

                      <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  // 👇 VIỆT HÓA URL (login -> dang-nhap)
                  href="/dang-nhap"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-2 ml-2"
                >
                  Đăng nhập
                </Link>
                <Link
                  // 👇 VIỆT HÓA URL (register -> dang-ky)
                  href="/dang-ky"
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
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-lg absolute w-full left-0 transition-colors z-50">
          <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
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
                (link.path !== "/" &&
                  pathname.startsWith(link.path.split("?")[0]) &&
                  link.path.includes("categoryId") === false);
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
                      // 👇 VIỆT HÓA URL
                      href="/ho-so"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <img
                        src={
                          avatarUrl ||
                          `https://ui-avatars.com/api/?name=${userName || "User"}&background=random`
                        }
                        alt="Ảnh đại diện"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        <strong className="text-blue-600 dark:text-blue-400">
                          {userName}
                        </strong>
                      </span>
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
                      // 👇 VIỆT HÓA URL
                      href="/dang-nhap"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      // 👇 VIỆT HÓA URL
                      href="/dang-ky"
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
