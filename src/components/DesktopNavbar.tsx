import NextLink from "next/link";
import Image from "next/image";
import AuthButton from "./AuthButton";
import LanguageSelect from "./LanguageSelect";
import CapXLogo from "../../public/static/images/capx_most_detailed_logo.svg";
import DarkModeButton from "./DarkModeButton";
import { useApp } from "@/contexts/AppContext";
import BurgerMenu from "../../public/static/images/burger_menu.svg";

export interface DesktopNavbarProps {
  pageContent: any;
  language: string;
  setLanguage: (language: string) => void;
  setPageContent: (pageContent: any) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function DesktopNavbar({
  pageContent,
  language,
  setLanguage,
  setPageContent,
  darkMode,
  setDarkMode,
}: DesktopNavbarProps) {
  const { session } = useApp();

  const menuItems = [
    { title: pageContent["navbar-link-home"], to: "/home", active: true },
    {
      title: pageContent["navbar-link-profile"],
      to: "/profile",
      active: false,
    },
    {
      title: pageContent["navbar-link-capacities"],
      to: "/capacity",
      active: true,
    },
    { title: pageContent["navbar-link-reports"], to: "/reports", active: true },
  ];

  return (
    <div className="flex w-full h-full justify-between py-6 px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
      <div className="flex-none relative my-auto ml-4 sm:ml-0">
        <NextLink href="/">
          <Image
            priority
            src={CapXLogo}
            alt="Capacity Exchange logo"
            width={150}
            height={150}
            className="w-[150px] h-[150px]"
          />
        </NextLink>
      </div>
      {session ? (
        <div className="hidden xl:flex flex-1 items-center justify-end gap-[43px]">
          {menuItems.map((item, index) => (
            <NextLink
              key={"navbar-link-" + index.toString()}
              href={item.to}
              className="flex text-center font-[Montserrat] text-[24px] not-italic font-normal leading-[normal] my-auto cursor-pointer hover:border-b hover:border-current"
            >
              {item.title}
            </NextLink>
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 items-center justify-end gap-[24px]">
        <DarkModeButton />
        <LanguageSelect
          isMobile={false}
          language={language}
          setLanguage={setLanguage}
          setPageContent={setPageContent}
          darkMode={darkMode}
        />

        {session ? (
          <AuthButton
            message={pageContent["sign-out-button"]}
            isSignOut={true}
            customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px]"
          />
        ) : (
          <AuthButton
            message={pageContent["sign-in-button"]}
            isSignOut={false}
            customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px]"
          />
        )}
      </div>
    </div>
  );
}
