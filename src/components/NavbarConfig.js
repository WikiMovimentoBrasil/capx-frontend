import Image from 'next/image';
import { setCookie } from "@/app/actions";
import LanguageSelect from "./LanguageSelect";
import LightModeIcon from "../../public/static/images/light_mode_icon.svg";
import DarkModeIcon from "../../public/static/images/dark_mode_icon.svg";
import MobileMenuLightMode from "../../public/static/images/mobile_menu_light_mode.svg";
import MobileMenuDarkMode from "../../public/static/images/mobile_menu_dark_mode.svg";

export default function NavbarConfig({ language, setLanguage, setPageContent, darkMode, setDarkMode, setMobileMenuStatus }) {
  const changeColorMode = async (event, currentDarkModeSelection) => {
    setDarkMode(!currentDarkModeSelection);
    await setCookie({
      name: "dark_mode",
      value: (!currentDarkModeSelection).toString(),
      path: '/',
    });
  }

  const handleMenuStatus = () => {
    setMobileMenuStatus((prevState) => !prevState);
  };

  return (
    <div className="flex space-x-8">
      {/* Language menu */}
      <LanguageSelect language={language} setLanguage={setLanguage} setPageContent={setPageContent} />
      {/* Light/Dark mode icon */}
      <button onClick={(event) => changeColorMode(event, darkMode)}>
        <Image
          priority={true}
          src={darkMode ? LightModeIcon : DarkModeIcon}
          alt="Button to change the color mode."
          className="flex my-auto cursor-pointer w-6 sm:w-7"
        />
      </button>
      {/* Mobile menu icon */}
      <button onClick={handleMenuStatus}>
        <Image
          priority={true}
          src={darkMode ? MobileMenuDarkMode : MobileMenuLightMode}
          alt="Button to access the menu."
          className="block sm:hidden flex my-auto cursor-pointer"
        />
      </button>
    </div>
  )
}