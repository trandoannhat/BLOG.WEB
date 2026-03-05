"use client";
import { useState, useEffect } from "react";

interface Ad {
  id: string;
  title: string;
  imageUrl?: string;
  targetUrl: string;
}

interface PartnerAdsProps {
  position: number; // 1: Sidebar, 2: Footer bài viết, 3: Home, 4: Tools
}

export default function PartnerAds({ position }: PartnerAdsProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/PartnerAds/public/${position}`,
        );
        if (!res.ok) return;
        const data = await res.json();

        // Vì Controller C# trả về thẳng mảng dữ liệu qua Ok(data)
        setAds(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi tải quảng cáo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [position]);

  // Nếu đang tải hoặc không có quảng cáo nào bật ở vị trí này -> Ẩn hoàn toàn component
  if (loading || ads.length === 0) return null;

  return (
    <div className="space-y-4">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          {ad.imageUrl ? (
            // Hiển thị nếu CÓ Ảnh (Banner)
            <div className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <span className="absolute top-0 right-0 bg-gray-900/70 text-white text-[10px] px-2 py-1 z-10 rounded-bl-lg font-medium">
                Tài trợ
              </span>
              {/* Dùng thẻ img thường thay vì next/image để tránh lỗi chưa cấu hình domain ảnh trong next.config.js */}
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          ) : (
            // Hiển thị dạng Text/Card nếu KHÔNG CÓ Ảnh
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-gray-700 transition relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-[9px] px-2 py-0.5 rounded-bl-lg uppercase font-bold tracking-wider">
                Tài trợ
              </span>
              <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mt-2">
                {ad.title}
              </h3>
              <p className="text-sm text-blue-500 mt-1 flex items-center gap-1 font-medium">
                Khám phá ngay &rarr;
              </p>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
