"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import AuthProvider from "../../context/AuthProvider"; // Optional if still needed

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <body
      className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {isClient ? (
        <>
          {session && <Header />}
          <main className="flex-1">{children}</main>
          {session && <Footer />}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </body>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </SessionProvider>
    </html>
  );
}
