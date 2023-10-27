import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/providers/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog Zone",
  description: "Created by Lord Priyansh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
