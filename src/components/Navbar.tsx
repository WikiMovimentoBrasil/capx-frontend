"use client";
import Image from "next/image";
import NextLink from "next/link";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";
import NavbarConfig from "./NavbarConfig";
import AuthButton from "./AuthButton";
import { AnimatePresence } from "framer-motion";
import CapXLogo from "../../public/static/images/capx_logo.svg";

interface NavbarProps {
  session: any;
  language: string;
  setLanguage: (language: string) => void;
  pageContent: any;
  setPageContent: (pageContent: any) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  mobileMenuStatus: boolean;
  setMobileMenuStatus: (mobileMenuStatus: boolean) => void;
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
        className={
          (darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") +
          "fixed w-full h-16 m-auto left-0 right-0 z-40"
        }
      >
        <div className="flex w-full sm:w-10/12 h-full place-content-between mx-auto">
          {/* Capacity Exchange Logo */}
          <div className="relative w-12 my-auto ml-4 sm:ml-0">
            <div
              className={
                (darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") +
                "flex w-fit h-fit rounded-full"
              }
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
                <AuthButton
                  message={pageContent["sign-out-button"]}
                  isSignOut={true}
                />
              ) : (
                <AuthButton message={pageContent["sign-in-button"]} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
