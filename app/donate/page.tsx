"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

// Cấu hình các phương thức thanh toán (Dễ dàng thêm Ngân hàng, PayPal sau này)
const paymentMethods = [
  {
    id: "momo",
    name: "MoMo",
    owner: "TRẦN DOÃN NHẤT",
    info: "0907.011.886",
    type: "qr", // Loại hiển thị là mã QR
    image: "/images/momo.jpg",
    themeClass: "from-pink-500 to-pink-600",
    textClass: "text-pink-600 dark:text-pink-400",
    bgClass:
      "bg-pink-50 dark:bg-pink-900/10 border-pink-100 dark:border-pink-900/30",
  },
  {
    id: "zalopay",
    name: "ZaloPay / VietQR",
    owner: "TRAN DOAN NHAT",
    info: "Quét từ mọi ứng dụng ngân hàng",
    type: "qr",
    image: "/images/zalo.jpg",
    themeClass: "from-blue-500 to-blue-600",
    textClass: "text-blue-600 dark:text-blue-400",
    bgClass:
      "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30",
  },
  // Hướng dẫn thêm PayPal (Mở comment khi nào bạn có link):
  /*
  {
    id: "paypal",
    name: "PayPal",
    owner: "NhatSoft",
    info: "Thanh toán quốc tế an toàn",
    type: "link", // Loại hiển thị là Link/Nút bấm
    url: "https://paypal.me/nhatsoft",
    themeClass: "from-indigo-500 to-indigo-700",
    textClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30",
  }
  */
];

export default function DonatePage() {
  const [donorName, setDonorName] = useState("");
  const [activeTab, setActiveTab] = useState(paymentMethods[0].id);

  // Tự động tạo cú pháp chuyển khoản
  const transferMessage = `DONATE ${
    donorName ? donorName.trim().toUpperCase() : "AN DANH"
  }`;

  const handleCopy = () => {
    navigator.clipboard.writeText(transferMessage);
    toast.success("Đã copy cú pháp chuyển khoản!");
  };

  // Lấy ra phương thức đang được chọn
  const activeMethod =
    paymentMethods.find((m) => m.id === activeTab) || paymentMethods[0];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
        Ủng hộ NhatSoft ☕
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        Nếu bạn thấy những bài viết và dự án chia sẻ của mình hữu ích, bạn có
        thể "tiếp lửa" mời mình một ly cà phê nhé. Sự ủng hộ của bạn là động lực
        rất lớn đối với mình! ❤️
      </p>

      {/* KHU VỰC TẠO CÚ PHÁP CHUYỂN KHOẢN */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto mb-12 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Lời nhắn đính kèm (Để mình biết bạn là ai nhé)
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Nhập tên hoặc nickname của bạn..."
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            maxLength={30}
          />
          <div className="flex items-center w-full sm:w-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600">
              Nội dung:
            </div>
            <div className="px-4 py-2.5 text-sm font-mono text-blue-600 dark:text-blue-400 truncate flex-1 text-left min-w-[150px]">
              {transferMessage}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium text-sm transition-colors"
              title="Copy nội dung"
            >
              Copy
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          * Vui lòng copy nội dung trên và dán vào phần lời nhắn khi chuyển
          khoản nhé!
        </p>
      </div>

      {/* KHU VỰC CHỌN PHƯƠNG THỨC THANH TOÁN */}
      <div className="max-w-md mx-auto">
        {/* Nút Tab (Chuyển đổi phương thức) */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setActiveTab(method.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === method.id
                  ? `bg-gradient-to-r ${method.themeClass} text-white shadow-md scale-105`
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {method.name}
            </button>
          ))}
        </div>

        {/* Khung hiển thị nội dung của phương thức được chọn */}
        <div className="relative">
          <div
            className={`p-8 rounded-3xl shadow-sm border transition-colors duration-500 relative overflow-hidden group ${activeMethod.bgClass}`}
          >
            {/* Thanh màu trang trí ở trên cùng */}
            <div
              className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${activeMethod.themeClass}`}
            ></div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {activeMethod.name}
            </h2>
            <p
              className={`${activeMethod.textClass} font-extrabold text-lg mb-1 uppercase tracking-wide`}
            >
              {activeMethod.owner}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-6">
              {activeMethod.info}
            </p>

            {/* Nếu là dạng quét mã QR */}
            {activeMethod.type === "qr" && activeMethod.image && (
              <div className="bg-white p-2.5 rounded-2xl w-56 h-auto mx-auto border border-gray-200 dark:border-gray-700 shadow-sm transition-transform duration-500 hover:scale-105">
                <img
                  src={activeMethod.image}
                  alt={`QR ${activeMethod.name}`}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            )}

            {/* Nếu là dạng Link (Ví dụ: PayPal, BuyMeACoffee) */}
            {activeMethod.type === "link" && activeMethod.url && (
              <a
                href={activeMethod.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block mt-4 px-8 py-3.5 rounded-xl text-white font-bold transition-transform hover:-translate-y-1 shadow-lg bg-gradient-to-r ${activeMethod.themeClass}`}
              >
                Chuyển đến {activeMethod.name} &rarr;
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
