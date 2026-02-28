"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Trạng thái upload ảnh

  const [formData, setFormData] = useState({
    fullName: "",
    email: "", // Email chỉ đọc, không cho sửa
    phoneNumber: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Vui lòng đăng nhập để xem trang này.");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Account/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 401) {
          localStorage.removeItem("accessToken");
          router.push("/login");
          return;
        }

        const json = await res.json();
        if (res.ok && json.data) {
          setFormData({
            fullName: json.data.fullName || "",
            email: json.data.email || "",
            phoneNumber: json.data.phoneNumber || "",
            avatarUrl: json.data.avatarUrl || "",
          });
        }
      } catch (error) {
        toast.error("Lỗi khi tải thông tin cá nhân.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // HÀM XỬ LÝ UPLOAD ẢNH
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Đang tải ảnh lên...");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file); // Tên tham số "file" phải khớp với Backend của bạn

      // Lấy token để gửi kèm (Đề phòng API Files/upload yêu cầu đăng nhập)
      const token = localStorage.getItem("accessToken");

      // 👇 ĐÃ SỬA: Đổi sang /Files/upload và thêm Authorization Header
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Files/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Gửi vé qua cửa bảo vệ
          },
          body: uploadData, // Không set Content-Type, trình duyệt tự sinh boundary cho form-data
        },
      );

      if (res.ok) {
        const json = await res.json();
        // Cấu trúc trả về thường là json.data.url hoặc tương tự. Bạn console.log(json) nếu chưa nhận được ảnh nhé.
        const uploadedUrl = json.data?.url || json.url || json.data || "";

        setFormData({ ...formData, avatarUrl: uploadedUrl });
        toast.success("Tải ảnh lên thành công!", { id: toastId });
      } else {
        toast.error("Lỗi khi tải ảnh lên server.", { id: toastId });
      }
    } catch (error) {
      toast.error("Không thể kết nối đến server upload.", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Account/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            avatarUrl: formData.avatarUrl,
          }),
        },
      );

      const json = await res.json();

      if (res.ok) {
        toast.success("Cập nhật thông tin thành công!");
        // Cập nhật lại tên trên Navbar
        localStorage.setItem("userName", formData.fullName);
        //cập nhật lại avatar trên Navbar
        localStorage.setItem("avatarUrl", formData.avatarUrl);
        window.dispatchEvent(new Event("storage"));
      } else {
        toast.error(json.message || "Cập nhật thất bại.");
      }
    } catch (error) {
      toast.error("Không thể kết nối máy chủ.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Đang tải thông tin...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
        Hồ sơ cá nhân
      </h1>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* KHU VỰC AVATAR MỚI CÓ TÍCH HỢP UPLOAD */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative group cursor-pointer flex-shrink-0">
              <img
                src={
                  formData.avatarUrl ||
                  "https://ui-avatars.com/api/?name=" +
                    (formData.fullName || "User") +
                    "&background=random"
                }
                alt="Avatar"
                className={`w-28 h-28 rounded-full object-cover border-4 border-gray-50 dark:border-gray-700 shadow-sm transition-opacity ${
                  isUploading ? "opacity-50" : "group-hover:opacity-80"
                }`}
              />

              {/* Lớp phủ (Overlay) hiện ra khi rê chuột */}
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {/* Input chọn file ẩn bên dưới */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="flex-1 w-full text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Ảnh đại diện
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Định dạng JPG, PNG hoặc GIF. Bấm vào ảnh để tải lên.
              </p>

              {/* Vẫn giữ ô nhập URL để người dùng có thể dán link trực tiếp nếu thích */}
              <input
                type="text"
                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Hoặc dán URL ảnh trực tiếp vào đây..."
                value={formData.avatarUrl}
                onChange={(e) =>
                  setFormData({ ...formData, avatarUrl: e.target.value })
                }
              />
            </div>
          </div>

          {/* CÁC THÔNG TIN KHÁC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email (Không thể thay đổi)
            </label>
            <input
              type="email"
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none"
              value={formData.email}
            />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-70"
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
