import "@/app/globals.css";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${geistSans.variable} antialiased`}>
        <div className="min-h-screen bg-zinc-50">{children}</div>
      </body>
    </html>
  );
}

