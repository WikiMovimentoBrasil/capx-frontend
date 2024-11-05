import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { setCookie } from "@/app/actions";
import { LanguageSelect } from "./LanguageSelector";
import LightModeIcon from "../../public/static/images/light_mode_icon.svg";
import DarkModeIcon from "../../public/static/images/dark_mode_icon.svg";
import MobileMenuLightMode from "../../public/static/images/mobile_menu_light_mode.svg";
import MobileMenuDarkMode from "../../public/static/images/mobile_menu_dark_mode.svg";

interface NavbarConfigProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  setPageContent: Dispatch<SetStateAction<Record<string, string>>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  setMobileMenuStatus: Dispatch<SetStateAction<boolean>>;
}

export function NavbarConfig({
  language,
  setLanguage,
  setPageContent,
  darkMode,
  setDarkMode,
  setMobileMenuStatus,
}: NavbarConfigProps) {
  const changeColorMode = async (
    event: React.MouseEvent,
    currentDarkModeSelection: boolean
  ) => {
    setDarkMode(!currentDarkModeSelection);
    await setCookie({
      name: "dark_mode",
      value: (!currentDarkModeSelection).toString(),
      /* 
      TODO: Fix this path if necessary
      path: "/", */
    });
  };

  const handleMenuStatus = () => {
    setMobileMenuStatus((prevState) => !prevState);
  };

  return (
    <div className="flex space-x-8">
      <LanguageSelect
        language={language}
        setLanguage={setLanguage}
        setPageContent={setPageContent}
      />
      <button onClick={(event) => changeColorMode(event, darkMode)}>
        <Image
          priority={true}
          src={darkMode ? LightModeIcon : DarkModeIcon}
          alt="Button to change the color mode."
          className="flex my-auto cursor-pointer w-6 sm:w-7"
        />
      </button>
      <button onClick={handleMenuStatus}>
        <Image
          priority={true}
          src={darkMode ? MobileMenuDarkMode : MobileMenuLightMode}
          alt="Button to access the menu."
          className="block sm:hidden flex my-auto cursor-pointer"
        />
      </button>
    </div>
  );
}
