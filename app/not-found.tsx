import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Thêm hiệu ứng gradient cho số 404 đồng bộ với style trang chủ */}
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4 tracking-tighter drop-shadow-sm">
        404
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Oops! Request trả về NotFound...
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Trang bạn đang tìm kiếm không tồn tại, đã bị di dời hoặc URL không chính
        xác. Hãy để hệ thống điều hướng bạn về nơi an toàn nhé!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Về Trang chủ
        </Link>
        <Link
          href="/bai-viet"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-bold py-3 px-8 rounded-full transition-all hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-1"
        >
          Xem bài viết mới
        </Link>
      </div>
    </div>
  );
}
