"use client";
import Image from 'next/image';
import NextLink from "next/link";
import CapXLogo from "../../public/static/images/capx_logo.svg";
import MobileMenuLightMode from "../../public/static/images/mobile_menu_light_mode.svg";
import MobileMenuDarkMode from "../../public/static/images/mobile_menu_dark_mode.svg";
import LightModeIcon from "../../public/static/images/light_mode_icon.svg";
import DarkModeIcon from "../../public/static/images/dark_mode_icon.svg";
import LanguageMenuLightMode from "../../public/static/images/lang_light_mode_icon.svg";
import LanguageMenuDarkMode from "../../public/static/images/lang_dark_mode_icon.svg";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "absolute w-full h-16 m-auto left-0 right-0"}>
      <div className="flex w-full h-full place-content-between">
      </div>
    </nav>
  );
}
