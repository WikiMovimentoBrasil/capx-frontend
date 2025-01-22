"use client";
import { motion } from "framer-motion";
import MobileMenuLinks from "@/components/MobileMenuLinks";
import AuthButton from "@/components/AuthButton";
import { useApp } from "@/contexts/AppContext";
import MoveOutIcon from "@/public/static/images/move_item.svg";
import { useTheme } from "@/contexts/ThemeContext";

interface MobileMenuProps {
  session: any;
  pageContent: any;
}

export default function MobileMenu({ session, pageContent }: MobileMenuProps) {
  const { darkMode, setDarkMode } = useTheme();
  const { setMobileMenuStatus } = useApp();
  const animationVariants = {
    initial: {
      scaleY: 0,
      opacity: 0,
      transformOrigin: "top",
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      data-testid="mobile-menu"
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${
        darkMode
          ? "bg-capx-dark-box-bg text-capx-light-bg border-b-capx-light-bg"
          : "bg-capx-light-bg text-capx-dark-bg border-b-capx-dark-bg"
      } fixed w-screen pb-10 z-50 mt-16`}
    >
      <MobileMenuLinks
        session={session}
        pageContent={pageContent}
        handleMenuStatus={() => setMobileMenuStatus(false)}
      />
      <div className="w-[90%] mx-auto">
        {session ? (
          <AuthButton
            message={pageContent["sign-out-button"]}
            isSignOut={true}
            imageUrl={MoveOutIcon}
            customClass="w-full h-[32px] flex items-center px-[6px] py-[8px] rounded-[4px] bg-[var(--Buttons-Default,_#851D6A)] font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white justify-start pt-4 px-[8px] py-[0]"
          />
        ) : (
          <AuthButton
            message={pageContent["sign-in-button"]}
            customClass="w-full flex h-[32px] px-[6px] py-[8px] rounded-[4px] bg-[var(--Buttons-Default,_#851D6A)] font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white justify-start"
          />
        )}
      </div>
    </motion.div>
  );
}
