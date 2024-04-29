"use client";
import Image from "next/image";
import IconCloseMobileMenuLightMode from "../../public/static/images/close_mobile_menu_icon_light_mode.svg";
import IconCloseMobileMenuDarkMode from "../../public/static/images/close_mobile_menu_icon_dark_mode.svg";
import MobileMenuLinks from "@/components/MobileMenuLinks";

export default function MobileMenu({ session, darkMode, mobileMenuStatus, setMobileMenuStatus }) {
  const handleMenuStatus = () => {
    setMobileMenuStatus((prevState) => !prevState);
  };

  return (
    <div className={(darkMode ? "bg-capx-dark-box-bg text-capx-light-bg " : "bg-capx-light-box-bg text-capx-dark-bg ") + "fixed w-screen h-screen pb-10 origin-top-right z-50"}>
      <div className="flex flex-row-reverse w-10/12 mx-auto mt-6 mb-8">
        <a onClick={handleMenuStatus}>
          <Image
            src={darkMode ? IconCloseMobileMenuDarkMode : IconCloseMobileMenuLightMode}
            alt="Button to close menu."
            className="fill-current h-10 w-10 text-gray-700 cursor-pointer"
          />
        </a>
      </div>
      <MobileMenuLinks session={session} handleMenuStatus={handleMenuStatus} />
    </div>
  )
}