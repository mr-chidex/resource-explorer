import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import ProgressBar from "./components/shared/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resource Explorer",
  description: "Resource Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          This script runs synchronously to prevent a flash of unstyled content (FOUC).
          It checks localStorage or system preferences and sets the 'dark' class
          before the page content is rendered.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const getInitialTheme = () => {
                  if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
                    return localStorage.getItem('theme');
                  }
                  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    return 'dark';
                  }
                  return 'light';
                };
                const theme = getInitialTheme();
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-800">
          <ProgressBar />
          <Header />
          <main className="px-2 sm:px-4 md:px-8 min-h-screen pt-24">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
