import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import "./globals.css";

import { AppWrapper } from './components/AppContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const REM = localFont({
  src: "./fonts/REM.ttf",
  variable: "--font-REM",
  weight: "100 900"
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Beavs.Social",
  description: "Connect and share with your community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased`}
      >
        <Toaster />
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}

