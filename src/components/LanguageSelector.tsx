import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { setCookie } from "@/app/actions";

interface LanguageSelectProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  setPageContent: Dispatch<SetStateAction<Record<string, string>>>;
}

interface LanguageOption {
  value: string;
  label: string;
}

export function LanguageSelect({
  language,
  setLanguage,
  setPageContent,
}: LanguageSelectProps) {
  const [options, setOptions] = useState<LanguageOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/language");
        const languages = response.data;
        const languageOptions = languages.map((lang: string) => ({
          value: lang,
          label: lang.toUpperCase(),
        }));
        setOptions(languageOptions);
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLanguages();
  }, []);

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);

    try {
      const response = await fetch(`/api/content?language=${newLanguage}`);
      const data = await response.json();
      setPageContent(data);

      await setCookie({
        name: "language",
        value: newLanguage,
        /* 
        TODO: Fix this path if necessary
        path: "/", */
      });
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  if (isLoading) {
    return (
      <select
        disabled
        className="flex my-auto cursor-not-allowed bg-transparent border-none outline-none opacity-50"
      >
        <option value={language}>{language.toUpperCase()}</option>
      </select>
    );
  }

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="flex my-auto cursor-pointer bg-transparent border-none outline-none"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-transparent"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
