import { Dispatch, SetStateAction } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import CapXLogo from "@/assets/images/capx-logo.png";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarConfig } from "./NavbarConfig";
import SignInButton from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  session: boolean;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  pageContent: Record<string, string>;
  setPageContent: Dispatch<SetStateAction<Record<string, string>>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  mobileMenuStatus: boolean;
  setMobileMenuStatus: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({
  session,
  language,
  setLanguage,
  pageContent,
  setPageContent,
  darkMode,
  setDarkMode,
  mobileMenuStatus,
  setMobileMenuStatus,
}: NavbarProps) {
  return (
    <>
      <AnimatePresence>
        {mobileMenuStatus && (
          <MobileMenu
            session={session}
            pageContent={pageContent}
            darkMode={darkMode}
            mobileMenuStatus={mobileMenuStatus}
            setMobileMenuStatus={setMobileMenuStatus}
          />
        )}
      </AnimatePresence>
      <nav
        className={`${
          darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
        } fixed w-full h-16 m-auto left-0 right-0 z-40`}
      >
        <div className="flex w-full sm:w-10/12 h-full place-content-between mx-auto">
          <div className="relative w-12 my-auto ml-4 sm:ml-0">
            <div
              className={`${
                darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
              } flex w-fit h-fit rounded-full`}
            >
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
            <NavbarLinks session={session} pageContent={pageContent} />
            <NavbarConfig
              language={language}
              setLanguage={setLanguage}
              setPageContent={setPageContent}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setMobileMenuStatus={setMobileMenuStatus}
            />
            <div className="hidden sm:flex">
              {session ? (
                <SignOutButton message={pageContent["sign-out-button"]} />
              ) : (
                <SignInButton message={pageContent["sign-in-button"]} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
