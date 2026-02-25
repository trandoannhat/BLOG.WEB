import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* HEADER: Tiêu đề trang */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Về tôi
        </h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* CỘT TRÁI: Ảnh Avatar & Thông tin cơ bản */}
        <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
            {/* Bạn hãy thay link ảnh này bằng ảnh thật của bạn nhé */}
            <img
              src="https://via.placeholder.com/400x400?text=Avatar"
              alt="Trần Doãn Nhất"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Trần Doãn Nhất
          </h2>
          <p className="text-blue-600 font-medium mb-4">@nhatdev</p>
          <p className="text-sm text-gray-600 mb-6">
            Software Engineer & Tech Lead với niềm đam mê xây dựng các hệ thống
            mở rộng và tối ưu hiệu năng.
          </p>
          <a
            href="mailto:nhat@dev.com"
            className="w-full text-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-md"
          >
            Liên hệ hợp tác
          </a>
        </div>

        {/* CỘT PHẢI: Chi tiết & Kỹ năng */}
        <div className="md:col-span-2 space-y-10">
          {/* Section: Giới thiệu */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              👋 Xin chào!
            </h3>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p>
                Mình là một lập trình viên với nhiều năm kinh nghiệm làm việc
                xuyên suốt từ Front-end đến Back-end. Mình yêu thích việc giải
                quyết các bài toán phức tạp, thiết kế kiến trúc hệ thống (System
                Design) và biến những ý tưởng thành các sản phẩm công nghệ thực
                tế.
              </p>
              <p>
                Bên cạnh việc code, mình cũng thường xuyên viết blog chia sẻ
                kiến thức, hướng dẫn triển khai các dự án thực tế để giúp cộng
                đồng lập trình viên cùng phát triển.
              </p>
            </div>
          </section>

          {/* Section: Kỹ năng chuyên môn */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              💻 Kỹ năng & Công nghệ
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Backend & Database
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    ".NET",
                    "C#",
                    "Node.js",
                    "PostgreSQL",
                    "SQL Server",
                    "MongoDB",
                    "Laravel",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "Tailwind CSS",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  DevOps & Khác
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Docker",
                    "Git / Github",
                    "System Design",
                    "Machine Learning",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Kinh nghiệm / Định hướng */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              🚀 Định hướng tương lai
            </h3>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 leading-relaxed">
                Mục tiêu của mình là tiếp tục đào sâu vào{" "}
                <strong>Kiến trúc phần mềm (Software Architecture)</strong>, tối
                ưu hóa hiệu năng hệ thống chịu tải cao và tích hợp các giải pháp
                AI/Machine Learning vào các dự án thực tiễn.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/projects"
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                >
                  Xem các dự án mình đã thực hiện{" "}
                  <span className="ml-2">&rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
