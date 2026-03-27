import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Golf3DBackground from "@/components/layout/Golf3DBackground";
import InteractiveCursor from "@/components/layout/InteractiveCursor";
import { NotificationProvider } from "@/components/layout/NotificationProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Golf Charity Subscription Platform | Your Game. Their Future.",
  description: "A subscription-driven app combining golf performance tracking, charity fundraising, and a monthly draw-based prize engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.variable,
          "antialiased bg-navy-dark text-white selection:bg-primary/30 selection:text-white min-h-screen"
        )}
      >
        <NotificationProvider>
          <InteractiveCursor />
          <Golf3DBackground />
        {/* Enhanced dimming overlay for better text contrast */}
        <div className="pointer-events-none fixed inset-0 -z-5 bg-[radial-gradient(circle_at_center,#00000000_0%,#00000080_70%,#000000de_100%)] backdrop-blur-sm" />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        </NotificationProvider>

        {/* Enhanced 3D Background Orbs */}
        <div className="fixed top-[-15%] left-[-15%] w-[600px] h-[600px] bg-[#ff2d70]/8 blur-[150px] rounded-full pointer-events-none animate-pulse" />
        <div className="fixed bottom-[-15%] right-[-15%] w-[500px] h-[500px] bg-[#f59e0b]/6 blur-[130px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="fixed top-[30%] right-[5%] w-[400px] h-[400px] bg-[#ff487f]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="fixed bottom-[20%] left-[10%] w-[350px] h-[350px] bg-[#ff2d70]/4 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      </body>
    </html>
  );
}
