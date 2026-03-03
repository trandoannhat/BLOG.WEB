"use client";

import { useEffect, useState } from "react";
import { donationService, ApprovedDonation } from "@/services/donation.service";

export default function DonationMarquee() {
  const [donations, setDonations] = useState<ApprovedDonation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await donationService.getApprovedDonations();
        if (res?.data) {
          setDonations(res.data);
        }
      } catch (error) {
        console.error("Lỗi tải danh sách chữ chạy:", error);
      }
    };
    fetchData();
  }, []);

  // Nếu chưa có ai donate (hoặc chưa duyệt ai), ẩn luôn thanh này đi cho gọn
  if (donations.length === 0) return null;

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="w-full bg-blue-50/80 border-y border-blue-100 py-3 overflow-hidden flex items-center shadow-sm backdrop-blur-sm">
      {/* Nhãn "GẦN ĐÂY" cố định bên trái */}
      <div className="bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-r-full whitespace-nowrap z-10 shadow-md flex items-center gap-2">
        <span>🎉</span> GẦN ĐÂY
      </div>

      {/* Vùng chứa chữ chạy */}
      <div className="flex-1 overflow-hidden relative group">
        <div className="animate-marquee whitespace-nowrap flex gap-10 px-6 items-center cursor-default">
          {donations.map((item) => (
            <div key={item.id} className="text-sm text-gray-700 inline-block">
              <span className="font-bold text-blue-700">
                {item.donorName || "Ẩn danh"}
              </span>{" "}
              vừa ủng hộ{" "}
              <span className="font-bold text-green-600">
                {formatMoney(item.amount)}
              </span>{" "}
              qua <span className="font-semibold">{item.paymentMethod}</span>
              {item.message && (
                <span className="italic text-gray-500">
                  {" "}
                  - "{item.message}"
                </span>
              )}
              <span className="mx-6 text-blue-200">|</span>
            </div>
          ))}

          {/* Lặp lại danh sách một lần nữa để tạo hiệu ứng chạy nối đuôi mượt mà */}
          {donations.map((item) => (
            <div
              key={`copy-${item.id}`}
              className="text-sm text-gray-700 inline-block"
            >
              <span className="font-bold text-blue-700">
                {item.donorName || "Ẩn danh"}
              </span>{" "}
              vừa ủng hộ{" "}
              <span className="font-bold text-green-600">
                {formatMoney(item.amount)}
              </span>{" "}
              qua <span className="font-semibold">{item.paymentMethod}</span>
              {item.message && (
                <span className="italic text-gray-500">
                  {" "}
                  - "{item.message}"
                </span>
              )}
              <span className="mx-6 text-blue-200">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
