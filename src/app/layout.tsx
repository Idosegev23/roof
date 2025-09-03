import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
});

export const metadata: Metadata = {
  title: "Roof - פלטפורמת נדל״ן מקצועית",
  description: "הפלטפורמה המקצועית לנדל״ן - נתונים, אנליטיקות והזדמנויות השקעה",
  keywords: ["נדל״ן", "השקעות", "דירות", "משרדים", "Roof", "פלטפורמה"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} font-assistant antialiased`}>
        {children}
        <Toaster 
          position="top-center"
          richColors
          closeButton
          dir="rtl"
        />
      </body>
    </html>
  );
}
