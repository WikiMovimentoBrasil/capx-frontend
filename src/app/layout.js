import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="pt-br">
        <body id="root">{children}</body>
      </html>
    </SessionWrapper>
  );
}
