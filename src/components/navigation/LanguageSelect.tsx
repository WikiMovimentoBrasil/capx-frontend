// components/navigation/LanguageSelect.tsx
"use client";

import { useEffect, useState } from "react";
import { setCookie } from "@/lib/actions";
import BaseSelect from "@/components/BaseSelect";
import { useTheme } from "@/providers/ThemeProvider";
import { useApp } from "@/providers/AppProvider";
import { useRouter } from "next/navigation";

interface LanguageSelectProps {
  currentLanguage: string;
  isMobile: boolean;
  pageContent: any;
  className?: string;
}

interface LanguageOption {
  value: string;
  label: string;
}

export default function LanguageSelect({
  currentLanguage,
  isMobile,
  pageContent,
  className = "w-max",
}: LanguageSelectProps) {
  const { darkMode } = useTheme();
  const { setMobileMenuStatus } = useApp();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const languageOptions: LanguageOption[] = Object.entries(pageContent)
    .filter(
      ([key]) => key.startsWith("language-") && key !== "language-select-aria"
    )
    .map(([key, value]) => ({
      value: key.replace("language-", ""),
      label: value as string,
    }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelection = async (selectedOption: LanguageOption) => {
    await setCookie({
      name: "language",
      value: selectedOption.value,
      options: { path: "/" },
    });

    router.refresh();
  };

  if (!isClient) return null;

  return (
    <BaseSelect
      name="language"
      options={languageOptions}
      defaultValue={
        languageOptions.find((opt) => opt.value === currentLanguage) ||
        languageOptions[0]
      }
      onChange={handleSelection}
      ariaLabel={pageContent["language-select-aria"] || "Select language"}
      isMobile={isMobile}
      darkMode={darkMode}
      className={`${className} flex items-center`}
      onMenuOpen={() => {
        if (isMobile) {
          setMobileMenuStatus(false);
        }
      }}
    />
  );
}
