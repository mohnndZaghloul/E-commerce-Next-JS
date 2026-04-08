import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/header/NavBar";
import { cn } from "@/lib/utils";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Crow Store",
  description: "E-commerce Next Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "font-mono",
        geistMono.variable,
      )}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <NavBar />
          {children}
          footer
        </ThemeProvider>
      </body>
    </html>
  );
}
