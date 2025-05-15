import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { NotificationProvider } from "./components/NotificationContext";
import { NextAuthProvider } from "./providers";
import Providers from "./providers/Providers";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthSync } from "./components/AuthSync";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dandi",
  description: "Dandi Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <AuthSync />
          <Providers>
            <NotificationProvider>
              <div className="flex h-screen bg-gray-50">
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-6">
                    {children}
                  </main>
                </div>
              </div>
            </NotificationProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
