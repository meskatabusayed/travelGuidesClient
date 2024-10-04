import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import ProviderContainer from "@/provider/ProviderContainer";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Globe Tales",
  description: "Travel Tips & Destination Guides platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <ProviderContainer>{children}</ProviderContainer>
      </body>
    </html>
  );
}
