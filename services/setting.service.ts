// services/setting.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const settingService = {
  // Hàm lấy danh sách cấu hình hệ thống
  getSettings: async () => {
    try {
      // Bỏ cache để luôn cập nhật cấu hình mới nhất từ Admin
      const res = await fetch(`${API_URL}/SystemSettings`, {
        cache: "no-store",
      });
      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      console.error("Lỗi tải cấu hình:", error);
      return null;
    }
  },
};
