import NextLink from "next/link";
import Image from "next/image";
import AuthButton from "./AuthButton";
import LanguageSelect from "./LanguageSelect";
import DarkMode from "../../public/static/images/dark_mode.svg";
import LightMode from "../../public/static/images/light_mode.svg";
import CapXLogo from "../../public/static/images/capx_logo.svg";

export interface DesktopNavbarProps {
  pageContent: any;
  language: string;
  setLanguage: (language: string) => void;
  setPageContent: (pageContent: any) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  session: any;
}

export default function DesktopNavbar({
  pageContent,
  language,
  setLanguage,
  setPageContent,
  darkMode,
  setDarkMode,
  session,
}: DesktopNavbarProps) {
  const menuItems = [
    { title: pageContent["navbar-link-profile"], to: "/profile", active: true },
    {
      title: pageContent["navbar-link-capacities"],
      to: "/capacity",
      active: true,
    },
    { title: pageContent["navbar-link-reports"], to: "/reports", active: true },
    { title: pageContent["navbar-link-events"], to: "/events", active: false },
  ];

  return (
    <div className="flex flex-wrap w-full h-full justify-between py-6 px-24">
      <div className="relative my-auto ml-4 sm:ml-0">
        <NextLink href="/">
          <Image
            priority
            src={CapXLogo}
            alt="Capacity Exchange logo"
            width={150}
            height={150}
          />
        </NextLink>
      </div>

      <div className="flex items-center gap-6">
        {/* {session && (
          <div className="hidden sm:flex space-x-12">
            {menuItems.map(
              (item, index) =>
                item.active && (
                  <NextLink
                    key={`navbar-link-${index}`}
                    href={item.to}
                    className="flex my-auto cursor-pointer hover:border-b hover:border-current"
                  >
                    {item.title}
                  </NextLink>
                )
            )}
          </div>
        )} */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center cursor-pointer"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Image
            src={darkMode ? LightMode : DarkMode}
            width={32}
            height={32}
            alt={darkMode ? "Light Mode" : "Dark Mode"}
          />
        </button>
        <LanguageSelect
          isMobile={false}
          language={language}
          setLanguage={setLanguage}
          setPageContent={setPageContent}
        />

        {session ? (
          <AuthButton
            message={pageContent["sign-out-button"]}
            isSignOut={true}
          />
        ) : (
          <AuthButton
            message={pageContent["sign-in-button"]}
            isSignOut={false}
          />
        )}
      </div>
    </div>
  );
}
