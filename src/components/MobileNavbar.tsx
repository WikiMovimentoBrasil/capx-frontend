import { AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import CapXLogo from "../../public/static/images/capx_minimalistic_logo.svg";
import Image from "next/image";
import NextLink from "next/link";
import AuthButton from "./AuthButton";
import LanguageSelect from "./LanguageSelect";

interface MobileNavbarProps {
  isMobile: boolean;
  mobileMenuStatus: boolean;
  session: any;
  pageContent: any;
  darkMode: boolean;
  setMobileMenuStatus: (status: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
  setPageContent: (pageContent: any) => void;
}

export default function MobileNavbar({
  isMobile,
  mobileMenuStatus,
  session,
  pageContent,
  darkMode,
  setMobileMenuStatus,
  language,
  setLanguage,
  setPageContent,
}: MobileNavbarProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        {isMobile && mobileMenuStatus && session && (
          <MobileMenu
            session={session}
            pageContent={pageContent}
            darkMode={darkMode}
            setMobileMenuStatus={setMobileMenuStatus}
          />
        )}
      </AnimatePresence>
      <div className="flex w-full h-full justify-between items-center px-4 py-4 sm:px-6">
        <div className="relative flex items-center">
          <NextLink href="/">
            <Image
              priority
              src={CapXLogo}
              alt="Capacity Exchange logo"
              width={48}
              height={48}
            />
          </NextLink>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageSelect
            isMobile={isMobile}
            language={language}
            setLanguage={setLanguage}
            setPageContent={setPageContent}
          />

          {session ? (
            <AuthButton
              message={pageContent["sign-out-button"]}
              isSignOut={true}
              customClass="h-8 w-[73px] text-sm sm:text-base"
            />
          ) : (
            <AuthButton
              message={pageContent["sign-in-button"]}
              isSignOut={false}
              customClass="h-8 w-[73px] text-sm sm:text-base"
            />
          )}
        </div>
      </div>
    </>
  );
}
