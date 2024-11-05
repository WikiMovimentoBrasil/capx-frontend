import { ReactNode } from "react";
import { useAppSettings } from "@/hooks/useAppSettings";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";
import { parseDarkMode } from "@/lib/utils/darkMode";

interface BaseLayoutProps {
  children: ReactNode;
  initialSettings: {
    darkMode: string;
    language: string;
    pageContent: Record<string, string>;
    session: boolean;
  };
  isLoading?: boolean;
  loadingMessage?: string;
}

export function BaseLayout({
  children,
  initialSettings,
  isLoading,
  loadingMessage,
}: BaseLayoutProps) {
  const darkMode = parseDarkMode(initialSettings.darkMode);
  const settings = useAppSettings({ ...initialSettings, darkMode });

  if (isLoading) {
    return (
      <LoadingSection darkMode={settings.darkMode} message={loadingMessage} />
    );
  }

  return (
    <BaseWrapper {...settings} session={initialSettings.session}>
      {children}
    </BaseWrapper>
  );
}
