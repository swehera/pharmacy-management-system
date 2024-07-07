import { Inter } from "next/font/google";
import "../styles/globals.css";
import Layout from "@/ui/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pharmacy Management System",
  description: "Developed by Adoff Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" bg-[#1D3471] min-h-screen">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
