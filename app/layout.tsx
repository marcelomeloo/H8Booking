// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import Byline from "@/components/byline";
import { getServerSession } from "next-auth";
import { GlobalNav } from "@/components/global-nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "H8 Booking";
const description = "Welcome to H8 Booking, a place to book your favorite room!";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      {session ?
        <body className={inter.variable}>
          <GlobalNav />
          <Toaster />
          <Suspense fallback="Loading...">
            <AuthStatus />
          </Suspense>
          <div className="bg-gray-50 max-w-full h-full lg:pl-72">
            <div className="mx-auto space-y-8">
              <div className="bg-vc-border-gradient p-px shadow-lg shadow-black/20">
                <div className="bg-gray-50 p-3.5 lg:p-6">{children}</div>
              </div>
              <Byline className="fixed sm:hidden" />
            </div>
          </div>
        </body> :
        <body className={inter.variable}>
          <Toaster />
          <Suspense fallback="Loading...">
            <AuthStatus />
          </Suspense>
          {children}
        </body>

      }
    </html>
  );
}
