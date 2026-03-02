import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
        Ủng hộ NhatSoft ☕
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        Nếu bạn thấy những bài viết và dự án chia sẻ của mình hữu ích, bạn có
        thể "tiếp lửa" mời mình một ly cà phê nhé. Sự ủng hộ của bạn là động lực
        rất lớn đối với mình. Cảm ơn bạn rất nhiều! ❤️
      </p>

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
