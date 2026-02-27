import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👇 THÊM DÒNG NÀY ĐỂ BẬT DARK MODE BẰNG CLASS
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ... các cấu hình cũ của bạn
    },
  },
  plugins: [],
};
export default config;
