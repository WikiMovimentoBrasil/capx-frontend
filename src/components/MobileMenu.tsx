"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import MobileMenuLinks from "@/components/MobileMenuLinks";
import IconCloseMobileMenuLightMode from "../../public/static/images/close_mobile_menu_icon_light_mode.svg";
import IconCloseMobileMenuDarkMode from "../../public/static/images/close_mobile_menu_icon_dark_mode.svg";
import AuthButton from "@/components/AuthButton";

interface MobileMenuProps {
  session: any;
  pageContent: any;
  darkMode: boolean;
  setMobileMenuStatus: (mobileMenuStatus: boolean) => void;
}

export default function MobileMenu({
  session,
  pageContent,
  darkMode,
  setMobileMenuStatus,
}: MobileMenuProps) {
  const handleMenuStatus = () => {
    setMobileMenuStatus(false);
  };

  const animationVariants = {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.2,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleX: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${
        darkMode
          ? "bg-capx-dark-box-bg text-capx-light-bg"
          : "bg-capx-light-box-bg text-capx-dark-bg"
      } fixed w-screen h-screen pb-10 origin-top-right z-50`}
    >
      <div className="flex flex-row-reverse w-10/12 mx-auto mt-6 mb-8">
        <button onClick={handleMenuStatus}>
          <Image
            priority={true}
            src={
              darkMode
                ? IconCloseMobileMenuDarkMode
                : IconCloseMobileMenuLightMode
            }
            alt="Button to close menu."
            className="h-10 w-10 cursor-pointer"
          />
        </button>
      </div>
      <MobileMenuLinks
        session={session}
        pageContent={pageContent}
        handleMenuStatus={handleMenuStatus}
      />
      <div className="flex flex-wrap w-10/12 mx-auto">
        {session ? (
          <AuthButton
            message={pageContent["sign-out-button"]}
            isSignOut={true}
          />
        ) : (
          <AuthButton message={pageContent["sign-in-button"]} />
        )}
      </div>
    </motion.div>
  );
}
