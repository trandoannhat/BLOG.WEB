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

  if (donations.length === 0) return null;

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="w-full bg-blue-50/80 dark:bg-blue-900/20 border-y border-blue-100 dark:border-blue-800/50 py-3 overflow-hidden flex items-center shadow-sm backdrop-blur-sm transition-colors duration-300">
      {/* Nhãn "GẦN ĐÂY" */}
      <div className="bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-r-full whitespace-nowrap z-10 shadow-md flex items-center gap-2">
        <span className="animate-bounce">🎉</span> GẦN ĐÂY
      </div>

      {/* Vùng chứa chữ chạy */}
      <div className="flex-1 overflow-hidden relative group">
        {/* LƯU Ý: Để chỉnh tốc độ, bạn vào tailwind.config.js phần animation.
            Hoặc dùng style inline dưới đây để ghi đè tốc độ (ví dụ 15s cho nhanh hơn)
        */}
        <div
          className="animate-marquee whitespace-nowrap flex gap-10 px-6 items-center cursor-default group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "20s" }} // Chỉnh con số này nhỏ đi (vd: 15s) để chạy nhanh hơn
        >
          {donations.concat(donations).map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="text-sm text-gray-700 dark:text-gray-300 inline-block flex-shrink-0"
            >
              <span className="font-bold text-blue-700 dark:text-blue-400">
                {item.donorName || "Ẩn danh"}
              </span>{" "}
              vừa ủng hộ{" "}
              <span className="font-bold text-green-600 dark:text-green-400">
                {formatMoney(item.amount)}
              </span>{" "}
              qua <span className="font-semibold">{item.paymentMethod}</span>
              {item.message && (
                <span className="italic text-gray-500 dark:text-gray-400">
                  {" "}
                  - "{item.message}"
                </span>
              )}
              <span className="ml-10 text-blue-200 dark:text-blue-800">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
