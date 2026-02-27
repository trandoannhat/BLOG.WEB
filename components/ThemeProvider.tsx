"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Dùng React.ComponentProps để tự động suy luận kiểu dữ liệu,
// không cần import đường dẫn sâu dễ gây lỗi nữa.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
