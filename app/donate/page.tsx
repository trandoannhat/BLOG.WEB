"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { donationService, DonationStats } from "@/services/donation.service";
import DonationMarquee from "@/components/DonationMarquee";

const QUICK_AMOUNTS = [
  { label: "☕ Cà phê", value: 20000 },
  { label: "🍜 Bát phở", value: 50000 },
  { label: "🍕 Pizza", value: 100000 },
];

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stats, setStats] = useState<DonationStats | null>(null);

  const BANK_ID = "ICB";
  const ACCOUNT_NO = "0907011886";
  const ACCOUNT_NAME = "TRAN DOAN NHAT";
  const MOMO_PHONE = "0907011886";
  const ZALOPAY_PHONE = "0907011886";

  const [formData, setFormData] = useState({
    donorName: "",
    amount: 50000,
    message: "Ung ho NhatSoft",
    paymentMethod: "Bank",
  });

  // HÀM LẤY DATA (Polling mỗi 30s để tự động cập nhật TargetAmount và Data mới)
  useEffect(() => {
    const fetchLatestStats = () => {
      donationService
        .getStats()
        .then((res) => setStats(res.data))
        .catch(console.error);
    };

    fetchLatestStats();
    const timer = setInterval(fetchLatestStats, 30000); // 30 giây lấy 1 lần
    return () => clearInterval(timer);
  }, []);

  // Tự động sinh Link ảnh VietQR
  const qrUrlBank = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${formData.amount}&addInfo=${encodeURIComponent(formData.message)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  // DEEPLINKS (Link mở nhanh App)
  const bankDeeplink = `https://dl.vietqr.io/pay?app=${BANK_ID}&ba=${ACCOUNT_NO}&am=${formData.amount}&tn=${encodeURIComponent(formData.message)}`;
  const momoDeeplink = `momo://app`; // Mở app mặc định
  const zalopayDeeplink = `zalopay://`;

  const handleCopy = (text: string | number, label: string) => {
    navigator.clipboard.writeText(text.toString());
    toast.success(`Đã sao chép ${label}!`);
  };

  const updateForm = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;
    if (formData.amount < 1000)
      return toast.error("Số tiền tối thiểu 1.000đ nhé!");

    setLoading(true);
    try {
      await donationService.submitDonation({
        donorName: formData.donorName || "Ẩn danh",
        amount: formData.amount,
        message: formData.message,
        paymentMethod: formData.paymentMethod,
      });

      toast.success(
        "Đã gửi xác nhận! Mình sẽ duyệt lên bảng vinh danh sớm nhé.",
      );
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Lỗi kết nối. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("vi-VN").format(amount) + "đ";

  // TÍNH TOÁN % ĐỘNG TỪ DATABASE
  const targetAmount = stats?.targetAmount || 1000000; // Lấy từ stats, nếu rỗng thì mốc 1 củ
  const totalRaised = stats?.totalRaised || 0;
  const progressPercent = Math.min((totalRaised / targetAmount) * 100, 100);

  return (
    <main className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* HEADER & PROGRESS BAR TỐI ƯU UI */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Support NhatSoft Server 🚀
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto mb-8">
            Nếu những bài viết của mình giúp ích được cho bạn, hãy mời mình một
            ly cà phê nhé!
          </p>

          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between text-sm font-bold mb-3">
              <div className="flex flex-col items-start">
                <span className="text-slate-400 uppercase text-[10px] tracking-wider">
                  Đã đạt được
                </span>
                <span className="text-blue-600 text-lg">
                  {formatMoney(totalRaised)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-slate-400 uppercase text-[10px] tracking-wider">
                  Mục tiêu
                </span>
                <span className="text-slate-700 text-lg">
                  {formatMoney(targetAmount)}
                </span>
              </div>
            </div>

            {/* Thanh tiến trình với hiệu ứng nảy số và Shine */}
            <div className="w-full bg-slate-100 rounded-full h-5 overflow-hidden p-1 border border-slate-50 relative">
              <div
                className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 h-full rounded-full transition-all duration-[1500ms] ease-out relative overflow-hidden"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Yêu cầu thêm đoạn CSS Keyframe shine vào globals.css để thấy ánh sáng */}
                <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 animate-[shine_3s_infinite]"></div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                {progressPercent >= 100
                  ? "🎉 Chúc mừng! Đã cán mốc mục tiêu"
                  : `Cần thêm ${formatMoney(targetAmount - totalRaised)} nữa`}
              </p>
              <span className="bg-blue-50 text-blue-700 text-[11px] font-extrabold px-2 py-1 rounded-md border border-blue-100">
                {progressPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* CỘT TRÁI: ĐIỀN THÔNG TIN */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-slate-800 mb-3">
                    1. Chọn mức ủng hộ
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {QUICK_AMOUNTS.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => updateForm({ amount: item.value })}
                        className={`py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all ${
                          formData.amount === item.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-100 text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="mb-1">{item.label}</div>
                        <div>{formatMoney(item.value)}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        updateForm({ amount: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-900 placeholder-slate-400 outline-none transition-all"
                      placeholder="Hoặc nhập số tiền khác..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 mb-2">
                    2. Lời nhắn đính kèm
                  </h3>
                  <input
                    type="text"
                    value={formData.donorName}
                    onChange={(e) => updateForm({ donorName: e.target.value })}
                    placeholder="Tên của bạn (Tùy chọn)"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateForm({ message: e.target.value })}
                    rows={3}
                    placeholder="Lời nhắn..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* CỘT PHẢI: CHỌN VÀ HIỂN THỊ MÃ QR + NÚT MỞ APP */}
              <div className="flex flex-col bg-slate-50 rounded-3xl p-6 border border-slate-100 h-full">
                <h3 className="font-bold text-slate-800 mb-4 text-center">
                  3. Quét mã thanh toán
                </h3>

                <div className="flex bg-slate-200 p-1 rounded-lg mb-6">
                  {["Bank", "MoMo", "ZaloPay"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => updateForm({ paymentMethod: method })}
                      className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        formData.paymentMethod === method
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-center flex-1 w-full">
                  {/* TAB: NGÂN HÀNG */}
                  {formData.paymentMethod === "Bank" && (
                    <>
                      <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 border border-blue-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrUrlBank}
                          alt="VietQR"
                          className="w-56 h-auto rounded-lg"
                        />
                      </div>

                      {/* NÚT MỞ APP NGÂN HÀNG */}
                      <a
                        href={bankDeeplink}
                        className="mb-4 w-full bg-blue-600 text-white text-center py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        Mở App Ngân Hàng
                      </a>

                      <div className="text-center space-y-1 text-sm text-slate-600">
                        <p className="text-xs text-green-600 font-semibold mb-2">
                          ✅ Quét là tự động điền số tiền & lời nhắn
                        </p>
                        <p>
                          Ngân hàng:{" "}
                          <span className="font-bold text-slate-900">
                            {BANK_ID}
                          </span>
                        </p>
                        <p>
                          STK:{" "}
                          <span className="font-bold text-slate-900">
                            {ACCOUNT_NO}
                          </span>
                        </p>
                        <p>
                          Tên:{" "}
                          <span className="font-bold text-slate-900">
                            {ACCOUNT_NAME}
                          </span>
                        </p>
                      </div>
                    </>
                  )}

                  {/* TAB: MOMO */}
                  {formData.paymentMethod === "MoMo" && (
                    <div className="w-full flex flex-col items-center">
                      <div className="bg-pink-50 p-3 rounded-2xl shadow-sm mb-4 border border-pink-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/qr-momo.jpg"
                          alt="MoMo QR"
                          className="w-56 h-56 object-cover rounded-lg fallback-img"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://placehold.co/224x224/ffe4e6/be185d?text=MoMo+QR")
                          }
                        />
                      </div>

                      {/* NÚT MỞ APP MOMO */}
                      <a
                        href={momoDeeplink}
                        className="mb-4 w-full bg-[#A50064] text-white text-center py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-[#8A0053] transition-all flex items-center justify-center gap-2"
                      >
                        Mở App MoMo
                      </a>

                      <div className="w-full max-w-xs bg-white border border-pink-100 rounded-xl p-4 text-sm text-slate-600 shadow-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-1">
                            <span>Người nhận:</span>
                            <span className="font-bold text-slate-900 text-right">
                              {ACCOUNT_NAME}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>SĐT:</span>
                            <span className="font-bold text-slate-900 text-right">
                              {MOMO_PHONE}
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-pink-50/50 p-1.5 rounded">
                            <span>Số tiền:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-green-600 text-base">
                                {formatMoney(formData.amount)}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(formData.amount, "số tiền")
                                }
                                className="text-slate-400 hover:text-pink-600 transition-colors"
                                title="Copy số tiền"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded overflow-hidden">
                            <span className="whitespace-nowrap mr-2">
                              Lời nhắn:
                            </span>
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span
                                className="font-bold text-blue-600 truncate max-w-[90px]"
                                title={formData.message}
                              >
                                {formData.message}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(formData.message, "lời nhắn")
                                }
                                className="text-slate-400 hover:text-pink-600 transition-colors flex-shrink-0"
                                title="Copy lời nhắn"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: ZALOPAY */}
                  {formData.paymentMethod === "ZaloPay" && (
                    <div className="w-full flex flex-col items-center">
                      <div className="bg-blue-50 p-3 rounded-2xl shadow-sm mb-4 border border-blue-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/qr-zalopay.jpg"
                          alt="ZaloPay QR"
                          className="w-56 h-56 object-cover rounded-lg"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://placehold.co/224x224/dbeafe/1d4ed8?text=ZaloPay+QR")
                          }
                        />
                      </div>

                      {/* NÚT MỞ APP ZALOPAY */}
                      <a
                        href={zalopayDeeplink}
                        className="mb-4 w-full bg-[#0052CC] text-white text-center py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-[#0043A6] transition-all flex items-center justify-center gap-2"
                      >
                        Mở App ZaloPay
                      </a>

                      <div className="w-full max-w-xs bg-white border border-blue-100 rounded-xl p-4 text-sm text-slate-600 shadow-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-1">
                            <span>Người nhận:</span>
                            <span className="font-bold text-slate-900 text-right">
                              {ACCOUNT_NAME}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>SĐT:</span>
                            <span className="font-bold text-slate-900 text-right">
                              {ZALOPAY_PHONE}
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-blue-50/50 p-1.5 rounded">
                            <span>Số tiền:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-green-600 text-base">
                                {formatMoney(formData.amount)}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(formData.amount, "số tiền")
                                }
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                                title="Copy số tiền"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded overflow-hidden">
                            <span className="whitespace-nowrap mr-2">
                              Lời nhắn:
                            </span>
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span
                                className="font-bold text-blue-600 truncate max-w-[90px]"
                                title={formData.message}
                              >
                                {formData.message}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(formData.message, "lời nhắn")
                                }
                                className="text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0"
                                title="Copy lời nhắn"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 w-full">
                  <button
                    type="submit"
                    disabled={loading || isSubmitted}
                    className={`w-full font-bold py-4 px-4 rounded-xl transition-all shadow-md ${
                      isSubmitted
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-70"
                    }`}
                  >
                    {isSubmitted
                      ? "✅ Đã gửi xác nhận thành công"
                      : loading
                        ? "Đang xử lý..."
                        : `Tôi đã chuyển khoản qua ${formData.paymentMethod} xong`}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3 font-medium">
                    Hãy bấm nút này sau khi thanh toán thành công nhé!
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* CỘT PHẢI: TOP SUPPORTER */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl shadow-sm border border-amber-100 p-6 md:p-8">
              <h2 className="text-xl font-extrabold text-amber-600 flex items-center gap-2 mb-6">
                <span>🏆</span> Top Người Ủng Hộ
              </h2>
              <div className="space-y-4">
                {stats?.topSupporters && stats.topSupporters.length > 0 ? (
                  stats.topSupporters.map((top, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-50 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0
                              ? "bg-yellow-400 text-yellow-900"
                              : index === 1
                                ? "bg-slate-300 text-slate-800"
                                : index === 2
                                  ? "bg-amber-600 text-white"
                                  : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-bold text-slate-700">
                          {top.donorName}
                        </span>
                      </div>
                      <span className="font-bold text-green-600">
                        {formatMoney(top.totalAmount)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm text-center py-4">
                    Chưa có dữ liệu vinh danh.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonationMarquee />
    </main>
  );
}
