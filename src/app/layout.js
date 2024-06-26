import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./views/Navbar";
import Sidebar from "./views/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mit distribution",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} relative mt-24`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
