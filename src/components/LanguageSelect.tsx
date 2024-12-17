import axios from "axios";
import { useEffect, useState } from "react";
import { setCookie } from "@/app/actions";
import BaseSelect from "./BaseSelect";

interface LanguageSelectProps {
  language: string;
  setLanguage: (language: string) => void;
  setPageContent: (pageContent: any) => void;
  isMobile: boolean;
}

export default function LanguageSelect({
  language,
  setLanguage,
  setPageContent,
  isMobile,
}: LanguageSelectProps) {
  const [options, setOptions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    async function fetchLanguages() {
      const response = await axios.get("/api/language");
      const languages = response.data;
      const languageOptions = languages.map((lang) => ({
        value: lang,
        label: lang,
      }));
      setOptions(languageOptions);
    }
    fetchLanguages();
    setIsClient(true);
  }, []);

  const handleSelection = async (selectedOption) => {
    setLanguage(selectedOption.value);
    await setCookie({
      name: "language",
      value: selectedOption.value,
      options: {
        path: "/",
      },
    });
  };

  useEffect(() => {
    async function getTranslatedContent() {
      const queryResponse = await axios.get("/api/language", {
        params: {
          lang: language,
        },
      });
      setPageContent(queryResponse.data);
    }
    getTranslatedContent();
  }, [language, setPageContent]);

  if (!isClient) {
    return null;
  }

  return (
    <BaseSelect
      name="language"
      options={options}
      defaultValue={{ value: language, label: language }}
      onChange={handleSelection}
      ariaLabel={setPageContent["aria-language-input"]}
      isMobile={isMobile}
    />
  );
}
