// services/donation.service.ts

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.nhatdev.top/api";

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
  submitDonation: async (data: CreateDonationDto) => {
    const res = await fetch(`${API_URL}/Donations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Lỗi khi gửi thông tin");
    return res.json();
  },

  // 2. GET: Lấy danh sách đã duyệt (Cho dòng chữ chạy)
  getApprovedDonations: async (
    limit: number = 20,
  ): Promise<{ data: ApprovedDonation[] }> => {
    const res = await fetch(`${API_URL}/Donations/approved?limit=${limit}`, {
      cache: "no-store", // ĐÃ SỬA: Yêu cầu Next.js luôn lấy dữ liệu mới nhất (Không dùng Cache)
    });

    if (!res.ok) throw new Error("Lỗi tải danh sách ủng hộ");
    return res.json();
  },

  // 3. GET: Lấy thống kê (Cho Progress Bar và Top Supporter)
  getStats: async (): Promise<{ data: DonationStats }> => {
    const res = await fetch(`${API_URL}/Donations/stats`, {
      cache: "no-store", // ĐÃ SỬA: Yêu cầu Next.js luôn lấy dữ liệu mới nhất (Không dùng Cache)
    });

    if (!res.ok) throw new Error("Lỗi tải thống kê");
    return res.json();
  },
};
