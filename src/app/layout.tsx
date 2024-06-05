import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/app/thirdweb";
import { Header } from "../../components/Header";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOS | SOS-Vaults",
  description: "Stake you sosTokens here to a share of the protocol revenue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <Header />
        <ThirdwebProvider>
        {children}
        </ThirdwebProvider>
        </body>
    </html>
  );
}
