"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import MobileMenuLinks from "@/components/MobileMenuLinks";
import IconCloseMobileMenuLightMode from "../../public/static/images/close_mobile_menu_icon_light_mode.svg";
import IconCloseMobileMenuDarkMode from "../../public/static/images/close_mobile_menu_icon_dark_mode.svg";

export default function MobileMenu({ session, pageContent, darkMode, mobileMenuStatus, setMobileMenuStatus }) {
  const handleMenuStatus = () => {
    setMobileMenuStatus((prevState) => !prevState);
  };

  const animationVariants = {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      ease: [0.12, 0, 0.39, 0]
    },
    exit: {
      scaleX: 0,
      ease: [0.22, 1, 0.36, 1]
    }
  }


  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={(darkMode ? "bg-capx-dark-box-bg text-capx-light-bg " : "bg-capx-light-box-bg text-capx-dark-bg ") + "fixed w-screen h-screen pb-10 origin-top-right z-50"}
    >
      <div className="flex flex-row-reverse w-10/12 mx-auto mt-6 mb-8">
        <a onClick={handleMenuStatus}>
          <Image
            src={darkMode ? IconCloseMobileMenuDarkMode : IconCloseMobileMenuLightMode}
            alt="Button to close menu."
            className="fill-current h-10 w-10 text-gray-700 cursor-pointer"
          />
        </a>
      </div>
      <MobileMenuLinks session={session} pageContent={pageContent} handleMenuStatus={handleMenuStatus} />
      <div className="flex flex-wrap w-10/12 mx-auto">
        {session ? (<SignOutButton message={pageContent["sign-out-button"]}></SignOutButton>) : (<SignInButton message={pageContent["sign-in-button"]} />)}
      </div>
    </motion.div>
  )
}