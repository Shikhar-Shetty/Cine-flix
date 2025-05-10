"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {  SessionProvider } from "next-auth/react";
import AuthProvider from "../../context/AuthProvider"; // Optional if still needed
import { Loader2 } from "lucide-react";

import { useSession } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();


  return (
    <body className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}>
      {status === "loading" ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-10 w-10 animate-spin text-red-500" />
        </div>
      ) : (
        <>
          {session && <Header />}
          <main className="flex-1">{children}</main>
          {session && <Footer />}
        </>
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
