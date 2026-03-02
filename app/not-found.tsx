import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-black text-blue-600 dark:text-blue-500 mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Oops! Lạc đường rồi...
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc bạn gõ sai đường
        dẫn. Hãy kiểm tra lại URL nhé!
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        &larr; Về lại Trang chủ
      </Link>
    </div>
  );
}
