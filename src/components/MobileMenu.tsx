"use client";
import { motion } from "framer-motion";
import MobileMenuLinks from "@/components/MobileMenuLinks";
import AuthButton from "@/components/AuthButton";
import { useApp } from "@/contexts/AppContext";
import MoveOutIcon from "@/public/static/images/move_item.svg";

interface MobileMenuProps {
  session: any;
  pageContent: any;
  language: string;
  setLanguage: (language: string) => void;
  setPageContent: (pageContent: any) => void;
}

export default function MobileMenu({
  session,
  pageContent,
  language,
  setLanguage,
  setPageContent,
}: MobileMenuProps) {
  const { darkMode, setMobileMenuStatus } = useApp();

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
          : "bg-capx-light-bg text-capx-dark-bg"
      } fixed w-screen pb-10 origin-top-right z-50 mt-16`}
    >
      <MobileMenuLinks
        session={session}
        pageContent={pageContent}
        handleMenuStatus={() => setMobileMenuStatus(false)}
      />
      <div className="w-[85%] mx-auto">
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
