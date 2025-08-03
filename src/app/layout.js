import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/component/shared/Footer";
import Navbar from "@/component/shared/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dk Gadget Hub",
  description: "Welcome To Dk Gadget HuB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Global toast notifier */}
        <Toaster position="top-center" reverseOrder={false} />

        <AuthProvider>
          <div className="pb-16">
            <Navbar />
          </div>

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

