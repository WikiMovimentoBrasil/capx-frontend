import { setCookie } from "@/app/actions";
import LanguageSelect from "./LanguageSelect";

export default function NavbarConfig({
  language,
  setLanguage,
  setPageContent,
  darkMode,
  setDarkMode,
  setMobileMenuStatus,
}) {
  const changeColorMode = async (event, currentDarkModeSelection) => {
    setDarkMode(!currentDarkModeSelection);
    await setCookie({
      name: "dark_mode",
      value: (!currentDarkModeSelection).toString(),
      path: "/",
    });
  };

  const handleMenuStatus = () => {
    setMobileMenuStatus((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center flex w-fit h-8 my-auto text-xl">
      <LanguageSelect
        language={language}
        setLanguage={setLanguage}
        setPageContent={setPageContent}
      />
    </div>
  );
}
