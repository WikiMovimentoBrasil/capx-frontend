import { useEffect, useState } from "react";
import { setCookie } from "@/app/actions";
import BaseSelect from "./BaseSelect";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/hooks/useLanguage";

interface LanguageSelectProps {
  language: string;
  setLanguage: (language: string) => void;
  setPageContent: (pageContent: any) => void;
  isMobile: boolean;
  className?: string;
}

interface LanguageOption {
  value: string;
  label: string;
}

export default function LanguageSelect({
  language,
  setLanguage,
  setPageContent,
  isMobile,
  className = "",
}: LanguageSelectProps) {
  const { darkMode } = useTheme();
  const { fetchLanguages, fetchTranslations } = useLanguage();
  const [options, setOptions] = useState<LanguageOption[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    async function loadLanguages() {
      const languageOptions = await fetchLanguages();
      setOptions(languageOptions);
    }
    loadLanguages();
    setIsClient(true);
  }, [fetchLanguages]);

  useEffect(() => {
    async function loadTranslations() {
      const translations = await fetchTranslations(language);
      setPageContent(translations);
    }
    loadTranslations();
  }, [language, setPageContent, fetchTranslations]);

  const handleSelection = async (selectedOption) => {
    setLanguage(selectedOption.value);
    await setCookie({
      name: "language",
      value: selectedOption.value,
      options: { path: "/" },
    });
  };

  if (!isClient) return null;

  return (
    <BaseSelect
      name="language"
      options={options}
      defaultValue={{ value: language, label: language }}
      onChange={handleSelection}
      ariaLabel={setPageContent["aria-language-input"]}
      isMobile={isMobile}
      darkMode={darkMode}
      className={className}
    />
  );
}
