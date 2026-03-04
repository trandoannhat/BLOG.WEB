// services/donation.service.ts

// Tối ưu: Ưu tiên lấy từ biến môi trường, nếu thiếu thì báo log để dev biết ngay
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.warn(
    "Cảnh báo: NEXT_PUBLIC_API_URL chưa được định nghĩa trong file .env",
  );
}

export interface CreateDonationDto {
  donorName: string;
  amount: number;
  message: string;
  paymentMethod: string;
}

export interface ApprovedDonation {
  id: string;
  donorName: string;
  amount: number;
  message: string;
  paymentMethod: string;
  createdAt: string;
}

export interface TopSupporter {
  donorName: string;
  totalAmount: number;
}

export interface DonationStats {
  totalRaised: number;
  targetAmount: number;
  topSupporters: TopSupporter[];
}

export const donationService = {
  // 1. POST: Gửi form xác nhận ủng hộ
  submitDonation: async (
    data: CreateDonationDto,
  ): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${API_URL}/Donations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      // Trả về lỗi từ backend (nếu có) hoặc lỗi mặc định
      throw new Error(json.message || "Lỗi khi gửi thông tin xác nhận");
    }
    return json;
  },

  // 2. GET: Lấy danh sách đã duyệt (Cho dòng chữ chạy)
  getApprovedDonations: async (
    limit: number = 20,
  ): Promise<{ data: ApprovedDonation[] }> => {
    const res = await fetch(`${API_URL}/Donations/approved?limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Không thể tải danh sách ủng hộ");
    return res.json();
  },

  // 3. GET: Lấy thống kê (Cho Progress Bar và Top Supporter)
  getStats: async (): Promise<{ data: DonationStats }> => {
    const res = await fetch(`${API_URL}/Donations/stats`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Không thể tải dữ liệu thống kê");
    return res.json();
  },
};
