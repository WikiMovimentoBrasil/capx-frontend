import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { setCookie } from "@/app/actions";

export default function LanguageSelect({ language, setLanguage, setPageContent }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchLanguages() {
      const response = await axios.get("/api/language");
      const languages = response.data;
      const languageOptions = languages.map((lang) => ({ value: lang, label: lang }));
      setOptions(languageOptions);
    }
    fetchLanguages();
  }, []);

  const handleSelection = async (selectedOption) => {
    setLanguage(selectedOption.value);
    await setCookie({
      name: "language",
      value: selectedOption.value,
      path: '/',
    });
  };

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
    <div className="my-auto">
      <Select
        isSearchable={false}
        options={options}
        defaultValue={[{ value: language, label: language }]}
        onChange={handleSelection}
        className="text-capx-dark-bg"
      />
    </div>
  );
}