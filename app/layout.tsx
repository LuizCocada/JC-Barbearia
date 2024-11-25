import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/auth";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-muted">
              {children}
            </div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
