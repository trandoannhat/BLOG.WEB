"use client";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Guard kiểm tra đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/"); // Nếu có token (đã đăng nhập) thì đá văng về trang chủ
    }
  }, [router]);

  // ĐÃ SỬA: Dùng email thay cho userName để khớp với LoginRequest bên .NET
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Gọi đúng đường dẫn /Account/authenticate của backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Account/authenticate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const json = await res.json();

      // Bắt lỗi dựa trên thuộc tính Success của class ApiResponse
      if (!res.ok || json.success === false || json.Success === false) {
        setError(
          json.message ||
            json.Message ||
            "Thông tin đăng nhập không chính xác.",
        );
        setIsLoading(false);
        return;
      }

      const responseData = json.data || json.Data;

      // Lấy JWToken từ AuthenticationResponse
      const token = responseData.jwToken || responseData.JWToken;
      const userName = responseData.userName || responseData.UserName;

      if (token) {
        // Lưu token và tên user vào trình duyệt
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userName", userName);
        localStorage.setItem("avatarUrl", responseData.avatarUrl || "");

        // BẮN THÔNG BÁO THÀNH CÔNG
        toast.success("Đăng nhập thành công!");

        // TRƯỚC KHI CHUYỂN TRANG - để reload lại menu
        window.dispatchEvent(new Event("storage"));

        // Chuyển hướng về trang chủ
        router.push("/");
        router.refresh();
      } else {
        toast.error("Lỗi xử lý Token từ hệ thống.");
      }
    } catch (err) {
      toast.error("Không thể kết nối đến máy chủ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Đăng nhập
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Chào mừng trở lại với NhatDev Blog
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center font-medium border border-red-100 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email đăng nhập
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="nhat@dev.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Chưa có tài khoản?{" "}
          <Link
            // 👇 VIỆT HÓA URL (register -> dang-ky)
            href="/dang-ky"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
