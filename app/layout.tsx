import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids Meal Plan",
  description: "Weekly South Indian meal plan for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

