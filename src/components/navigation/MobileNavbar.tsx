"use client";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "@/components/navigation/MobileMenu";
import CapXLogo from "@/public/static/images/capx_minimalistic_logo.svg";
import Image from "next/image";
import NextLink from "next/link";
import AuthButton from "@/components/AuthButton";
import LanguageSelect from "@/components/navigation/LanguageSelect";
import DarkModeButton from "@/components/navigation/DarkModeButton";
import BurgerMenu from "@/public/static/images/burger_menu.svg";
import BurgerMenuDarkMode from "@/public/static/images/burger_menu_light.svg";
import { useApp } from "@/providers/AppProvider";
import IconCloseMobileMenuLightMode from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import IconCloseMobileMenuDarkMode from "@/public/static/images/close_mobile_menu_icon_dark_mode.svg";
import { useTheme } from "@/providers/ThemeProvider";

interface MobileNavbarProps {
  session: any;
  pageContent: any;
  currentLanguage: string;
}

export default function MobileNavbar({
  session,
  pageContent,
  currentLanguage,
}: MobileNavbarProps) {
  const { isMobile, mobileMenuStatus, setMobileMenuStatus } = useApp();
  const { darkMode } = useTheme();
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 mb-16 ${
    darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
  } ${mobileMenuStatus ? "shadow-lg" : ""}`;

  if (session) {
    return (
      <>
        <div className={navbarClasses}>
          <div className="flex w-screen max-w-full justify-between items-center px-4 py-4">
            <div className="relative flex items-center">
              <NextLink href="/">
                <Image
                  priority
                  src={CapXLogo}
                  alt="Capacity Exchange logo"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px] mb-2"
                />
              </NextLink>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <DarkModeButton />
              <LanguageSelect
                isMobile={isMobile}
                currentLanguage={currentLanguage}
                pageContent={pageContent}
              />

              <div className="flex items-center">
                {mobileMenuStatus ? (
                  <button onClick={() => setMobileMenuStatus(false)}>
                    <Image
                      src={
                        darkMode
                          ? IconCloseMobileMenuDarkMode
                          : IconCloseMobileMenuLightMode
                      }
                      alt="Close menu"
                      width={32}
                      height={32}
                    />
                  </button>
                ) : (
                  <button onClick={() => setMobileMenuStatus(true)}>
                    <Image
                      src={darkMode ? BurgerMenuDarkMode : BurgerMenu}
                      alt="Burger Menu"
                      width={32}
                      height={32}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isMobile && mobileMenuStatus && session && (
            <MobileMenu session={session} pageContent={pageContent} />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className={navbarClasses}>
      <div className="flex w-screen max-w-full justify-between items-center px-4 py-4">
        <div className="relative flex items-center">
          <NextLink href="/">
            <Image
              priority
              src={CapXLogo}
              alt="Capacity Exchange logo"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
          </NextLink>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <DarkModeButton />
          <LanguageSelect
            isMobile={isMobile}
            currentLanguage={currentLanguage}
            pageContent={pageContent}
          />

          <AuthButton
            message={pageContent["sign-in-button"]}
            isSignOut={false}
            customClass="w-[73px] h-8 justify-center items-center gap-2 shrink-0 px-4 py-2 text-sm bg-capx-secondary-purple text-capx-light-bg rounded-[8px] text-[#F6F6F6] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
          />
        </div>
      </div>
    </div>
  );
}
