import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CapX - Capacity Exchange",
  description: "Exchange your capacities with other users",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

// Define props type
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionWrapper>
      <html lang="pt-br">
        <body id="root" className="min-h-screen">
          {children}{" "}
        </body>
      </html>
    </SessionWrapper>
  );
}
