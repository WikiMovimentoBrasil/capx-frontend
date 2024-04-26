"use client";
import Image from 'next/image';
import NextLink from "next/link";
import NavbarLinks from "./NavbarLinks";
import NavbarConfig from "./NavbarConfig";
import CapXLogo from "../../public/static/images/capx_logo.svg";
import MobileMenuLightMode from "../../public/static/images/mobile_menu_light_mode.svg";
import MobileMenuDarkMode from "../../public/static/images/mobile_menu_dark_mode.svg";
import LanguageMenuLightMode from "../../public/static/images/lang_light_mode_icon.svg";
import LanguageMenuDarkMode from "../../public/static/images/lang_dark_mode_icon.svg";

export default function Navbar({ session, darkMode, setDarkMode }) {
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
          <NavbarLinks session={session} />
          <NavbarConfig darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </nav>
  );
}
