"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function DonatePage() {
  const [donorName, setDonorName] = useState("");

  // Tự động tạo cú pháp chuyển khoản
  const transferMessage = `DONATE ${
    donorName ? donorName.trim().toUpperCase() : "AN DANH"
  }`;

  const handleCopy = () => {
    navigator.clipboard.writeText(transferMessage);
    toast.success("Đã copy cú pháp chuyển khoản!");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
        Ủng hộ NhatSoft ☕
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        Nếu bạn thấy những bài viết và dự án chia sẻ của mình hữu ích, bạn có
        thể "tiếp lửa" mời mình một ly cà phê nhé. Sự ủng hộ của bạn là động lực
        rất lớn đối với mình! ❤️
      </p>

      {/* 👇 KHU VỰC TẠO CÚ PHÁP CHUYỂN KHOẢN (MỚI) */}
      <div className="bg-blue-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 max-w-2xl mx-auto mb-10">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Lời nhắn đính kèm (Để mình biết bạn là ai nhé)
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Nhập tên hoặc nickname của bạn..."
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            maxLength={30}
          />
          <div className="flex items-center w-full sm:w-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600">
              Nội dung:
            </div>
            <div className="px-4 py-2.5 text-sm font-mono text-blue-600 dark:text-blue-400 truncate flex-1 text-left min-w-[150px]">
              {transferMessage}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
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

      {/* KHU VỰC HIỂN THỊ MÃ QR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {/* Khung MoMo */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-pink-100 dark:border-pink-900/30 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-pink-500"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            MoMo
          </h2>
          <p className="text-pink-600 dark:text-pink-400 font-bold mb-1">
            TRẦN DOÃN NHẤT
          </p>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">
            0907.011.886
          </p>
          <div className="bg-white p-2 rounded-2xl w-56 h-auto mx-auto border border-gray-100 dark:border-gray-600 shadow-sm transition-transform group-hover:scale-105">
            <img
              src="/images/momo.jpg"
              alt="QR MoMo Trần Doãn Nhất"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Khung ZaloPay / VietQR */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-blue-100 dark:border-blue-900/30 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            ZaloPay / VietQR
          </h2>
          <p className="text-blue-600 dark:text-blue-400 font-bold mb-1">
            TRAN DOAN NHAT
          </p>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">
            Quét từ mọi ứng dụng ngân hàng
          </p>
          <div className="bg-white p-2 rounded-2xl w-56 h-auto mx-auto border border-gray-100 dark:border-gray-600 shadow-sm transition-transform group-hover:scale-105">
            <img
              src="/images/zalo.jpg"
              alt="QR ZaloPay Tran Doan Nhat"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
