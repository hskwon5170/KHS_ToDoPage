import type { Metadata } from "next"

import { Geist, Geist_Mono } from "next/font/google"

import { cn } from "@/lib/utils"

import { Toaster } from "@/shared/ui/sonner"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Kanban Todo",
  description: "회사 업무를 쉽게 관리할 수 있는 심플한 칸반 보드입니다.",
  keywords: "칸반, 투두, 업무관리",
  icons: {
    icon: "/kanban.svg"
  },
  openGraph: {
    title: "Kanban Todo",
    description: "회사 업무 관리를 위한 심플한 칸반 보드",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}
          antialiased flex flex-1 h-full flex-col items-center justify-center bg-gray-100
          `)}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
