import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JC Barbearia",
  description: "Marque seu horário com a melhor barbearia da região",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {/* authprovider */}
        <div className="h-full flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        {/* authprovider */}
        {/* Toaster */}
      </body>
    </html>
  );
}
