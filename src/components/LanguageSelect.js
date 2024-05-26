import axios from "axios";
import { useEffect } from "react";

export default function LanguageSelect({ language, setLanguage, setPageContent }) {
  const options = process.env.NEXT_PUBLIC_LANGUAGES.split(",").map((lang) => ({ value: lang, label: lang }));

  useEffect(() => {
    async function getTranslatedContent() {
      const queryResponse = await axios.get("/api/language", {
        params: {
          lang: language,
        }
      });
      setPageContent(queryResponse.data);
    }
    getTranslatedContent();
  }, [language]);

  return (
    <div className="my-auto"></div>
  )
}