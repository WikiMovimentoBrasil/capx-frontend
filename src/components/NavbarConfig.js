import Image from 'next/image';
import { setCookie } from "@/app/actions";
import LightModeIcon from "../../public/static/images/light_mode_icon.svg";
import DarkModeIcon from "../../public/static/images/dark_mode_icon.svg";

export default function NavbarConfig({ darkMode, setDarkMode }) {
  const changeColorMode = async (event, currentDarkModeSelection) => {
    setDarkMode(!currentDarkModeSelection);
    await setCookie({
      name: "dark_mode",
      value: (!currentDarkModeSelection).toString(),
      path: '/',
    });
  }

  return (
    <div className="flex space-x-8">
      <button onClick={(event) => changeColorMode(event, darkMode)}>
        <Image
          priority={true}
          src={darkMode ? LightModeIcon : DarkModeIcon}
          alt="Button to change the color mode."
          className="flex my-auto cursor-pointer w-6 sm:w-7"
        />
      </button>
    </div>
  )
}