"use client";
import Image from 'next/image';
import NextLink from "next/link";
import { Link } from "react-scroll";
import CapXLogo from "../../public/static/images/capx_logo.svg";
import MobileMenuLightMode from "../../public/static/images/mobile_menu_light_mode.svg";
import MobileMenuDarkMode from "../../public/static/images/mobile_menu_dark_mode.svg";
import LightModeIcon from "../../public/static/images/light_mode_icon.svg";
import DarkModeIcon from "../../public/static/images/dark_mode_icon.svg";
import LanguageMenuLightMode from "../../public/static/images/lang_light_mode_icon.svg";
import LanguageMenuDarkMode from "../../public/static/images/lang_dark_mode_icon.svg";

export default function Navbar({ darkMode, setDarkMode }) {
  const changeColorMode = (e) => {
    setDarkMode(prevState => !prevState);
  }

  return (
    <nav className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "fixed w-full h-16 m-auto left-0 right-0 z-50"}>
      <div className="flex w-full h-full place-content-between">
        {/* Capacity Exchange Logo */}
        <div className="relative w-24">
          <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex w-fit h-fit rounded-full p-4"}>
            <NextLink href="/">
              <Image
                priority={true}
                src={CapXLogo}
                alt="Capacity Exchange logo image."
              />
            </NextLink>
          </div>
        </div>
        <div className="flex h-full mr-6 space-x-12 sm:space-x-14">
          <div className="flex space-x-12">
            {/* 'About' button */}
            <Link
              activeClass="active"
              to="section02"
              spy={true}
              smooth={true}
              duration={500}
              delay={150}
              className="hidden sm:block flex my-auto cursor-pointer hover:border-b hover:border-current"
            >
              About
            </Link>
          </div>
          <div className="flex space-x-8">
            <button onClick={changeColorMode}>
              <Image
                priority={true}
                src={darkMode ? LightModeIcon : DarkModeIcon}
                alt="Button to change the color mode."
                className="flex my-auto cursor-pointer w-6 sm:w-7"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
