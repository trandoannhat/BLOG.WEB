// app/lien-he/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { settingService } from "@/services/setting.service";

// Định nghĩa kiểu dữ liệu cho form
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  // State lưu trữ thông tin cấu hình từ Admin
  const [contactInfo, setContactInfo] = useState({
    phone: "0907.011.886",
    email: "contact@nhatsoft.com",
    address: "TP. Hồ Chí Minh, Việt Nam",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.324...", // Link mặc định
  });

  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    service: "system-design",
    message: "",
  });

  // Tải cấu hình từ API khi component mount
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await settingService.getSettings();
      if (res?.data) {
        const settings = res.data;

        // Helper function để tìm value theo key
        const getValue = (keyName: string) =>
          settings.find((s: any) => s.key === keyName)?.value;

        setContactInfo((prev) => ({
          phone: getValue("ContactPhone") || prev.phone,
          email: getValue("ContactEmail") || prev.email,
          address: getValue("ContactAddress") || prev.address,
          mapUrl: getValue("ContactMapUrl") || prev.mapUrl,
        }));
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 👇 HÀM XỬ LÝ GỌI API THẬT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Chuẩn bị dữ liệu gửi lên (Map các field cho khớp với CreateContactDto bên C#)
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.service, // 👈 ĐÃ SỬA: Gửi nhãn 'subject' lên C#, lấy giá trị từ 'formData.service'
        message: formData.message,
      };

      // 2. Gọi API POST đến Backend .NET
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Lấy data trước để đọc chi tiết lỗi nếu có
      const data = await res.json();

      if (!res.ok) {
        console.error("Chi tiết lỗi từ .NET:", data);
        let errorMsg = "Lỗi kết nối đến máy chủ";
        if (data.errors) {
          const firstErrorKey = Object.keys(data.errors)[0];
          errorMsg = data.errors[firstErrorKey][0];
        } else if (data.message) {
          errorMsg = data.message;
        }
        toast.error(`Từ chối: ${errorMsg}`);
        return; // Dừng lại không làm tiếp
      }

      // 3. Xử lý kết quả trả về (Bắt class ApiResponse từ .NET)
      const isSuccess =
        data?.succeeded || data?.success || data?.isSuccess || res.ok;

      if (isSuccess) {
        toast.success(
          data?.message ||
            "Gửi yêu cầu thành công! NhatSoft sẽ liên hệ lại sớm nhất.",
        );

        // Reset form sau khi gửi thành công
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "system-design",
          message: "",
        });
      } else {
        toast.error(data?.message || "Gửi thất bại, vui lòng thử lại sau!");
      }
    } catch (error) {
      console.error("Lỗi gửi liên hệ:", error);
      toast.error("Hệ thống đang bận, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight transition-colors">
          Liên hệ với{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            NhatSoft
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
          Bạn đang có một dự án phần mềm cần triển khai? Hay cần tư vấn về thiết
          kế kiến trúc hệ thống? Hãy để lại thông tin, chúng tôi sẽ phản hồi
          trong vòng 24h.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* CỘT TRÁI: THÔNG TIN & BẢN ĐỒ */}
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
              Thông tin liên hệ
            </h3>
            <div className="space-y-6">
              {/* Phone / Zalo */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 transition-colors">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase transition-colors">
                    Hotline / Zalo
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center shrink-0 transition-colors">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase transition-colors">
                    Email
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                    {contactInfo.email}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0 transition-colors">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase transition-colors">
                    Trụ sở
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BẢN ĐỒ GOOGLE MAP (URL Động) */}
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm relative transition-colors">
            {contactInfo.mapUrl?.includes("http") ? (
              <iframe
                src={contactInfo.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ NhatSoft"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                Đang tải bản đồ...
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI: FORM LIÊN HỆ */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
            Gửi yêu cầu trực tuyến
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
              >
                Họ và Tên / Tên đơn vị *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Nhập tên của bạn..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
                >
                  Email liên hệ *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
                >
                  Số điện thoại / Zalo
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="09xx.xxx.xxx"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
              >
                Bạn quan tâm đến dịch vụ nào?
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="system-design">
                  Tư vấn Thiết kế Kiến trúc Hệ thống
                </option>
                <option value="web-app">Phát triển Web App / SaaS</option>
                <option value="mobile-app">Phát triển ứng dụng Mobile</option>
                <option value="other">Vấn đề khác...</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
              >
                Nội dung chi tiết *
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Mô tả qua về dự án hoặc yêu cầu của bạn..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu ngay"}
              {!loading && (
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
