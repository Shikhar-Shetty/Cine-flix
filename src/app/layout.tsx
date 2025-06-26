"use client";

import "./globals.css";
import {  SessionProvider } from "next-auth/react";
import AuthProvider from "../../context/AuthProvider"; // Optional if still needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
