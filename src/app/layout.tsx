import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster"



const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admitere Bio",
  description: "Platforma ta pentru admiterea la biologie",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <Navbar/>
        {children}
        <Toaster/>
        </body>
    </html>
  );
}
