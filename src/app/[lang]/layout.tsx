import "@/styles/globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Metadata } from "next";
import Providers from "@/providers";
import { AppProvider } from "@/providers/AppProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getDictionary } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "CapX - Capacity Exchange",
  description: "Exchange your capacities with other users",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body id="root" className="min-h-screen">
        <ThemeProvider>
          <SessionWrapper>
            <AppProvider initialPageContent={dict}>
              <Providers>{children}</Providers>
            </AppProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
