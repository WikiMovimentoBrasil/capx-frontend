import { useEffect } from "react";
import { Link } from "react-scroll";
import NextLink from "next/link";
import { motion } from "framer-motion";
import SignOutButton from "./SignOutButton";

interface MobileMenuItem {
  title: string;
  to: string;
  active: boolean;
}

interface MobileMenuProps {
  session: boolean;
  darkMode: boolean;
  mobileMenuStatus: boolean;
  setMobileMenuStatus: (value: boolean) => void;
  pageContent: Record<string, string>;
}

export function MobileMenu({
  session,
  darkMode,
  mobileMenuStatus,
  setMobileMenuStatus,
  pageContent,
}: MobileMenuProps) {
  const menuDataLoggedIn: MobileMenuItem[] = [
    { title: pageContent["navbar-link-profile"], to: "/profile", active: true },
    {
      title: pageContent["navbar-link-capacities"],
      to: "/capacity",
      active: true,
    },
    { title: pageContent["navbar-link-reports"], to: "/reports", active: true },
    { title: pageContent["navbar-link-events"], to: "/events", active: false },
  ];

  const menuDataNotLoggedIn: MobileMenuItem[] = [
    { title: pageContent["navbar-link-about"], to: "section02", active: true },
  ];

  useEffect(() => {
    if (mobileMenuStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuStatus]);

  const baseClasses = {
    container: `
      fixed top-0 left-0 w-screen h-screen z-40
      ${darkMode ? "bg-capx-dark-bg" : "bg-capx-light-bg"}
    `,
    menuList: "flex flex-col space-y-8 mt-32 mx-8",
    menuItem: "text-2xl font-bold tracking-wider cursor-pointer",
    signOutWrapper: "absolute bottom-32 w-full flex justify-center",
  };

  if (!mobileMenuStatus) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={baseClasses.container}
    >
      <div className={baseClasses.menuList}>
        {session
          ? menuDataLoggedIn
              .filter((item) => item.active)
              .map((item, index) => (
                <NextLink
                  key={`mobile-menu-link-${index}`}
                  href={item.to}
                  onClick={() => setMobileMenuStatus(false)}
                  className={baseClasses.menuItem}
                >
                  {item.title}
                </NextLink>
              ))
          : menuDataNotLoggedIn
              .filter((item) => item.active)
              .map((item, index) => (
                <Link
                  key={`mobile-menu-link-${index}`}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  delay={150}
                  onClick={() => setMobileMenuStatus(false)}
                  className={baseClasses.menuItem}
                >
                  {item.title}
                </Link>
              ))}
      </div>

      {session && (
        <div className={baseClasses.signOutWrapper}>
          <SignOutButton message={pageContent["sign-out-button"]} />
        </div>
      )}
    </motion.div>
  );
}
