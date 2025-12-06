import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/lib/queryClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "General Compute",
  description: "Manage your AI models and API keys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <QueryProvider>
            <div className="ocean-background">
              <div className="ambient-blob blob-1" />
              <div className="ambient-blob blob-2" />
              <div className="ambient-blob blob-3" />
            </div>
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
