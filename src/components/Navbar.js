"use client";
import Image from 'next/image';
import NextLink from "next/link";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";
import NavbarConfig from "./NavbarConfig";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { AnimatePresence } from "framer-motion";
import CapXLogo from "../../public/static/images/capx_logo.svg";

export default function Navbar({ session, darkMode, setDarkMode, mobileMenuStatus, setMobileMenuStatus }) {
  return (
    <>
      <AnimatePresence>
        {mobileMenuStatus &&
          <MobileMenu
            session={session}
            darkMode={darkMode}
            mobileMenuStatus={mobileMenuStatus}
            setMobileMenuStatus={setMobileMenuStatus} />
        }
      </AnimatePresence>
      <nav className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "fixed w-full h-16 m-auto left-0 right-0 z-40"}>
        <div className="flex w-full sm:w-10/12 h-full place-content-between mx-auto">
          {/* Capacity Exchange Logo */}
          <div className="relative w-12 my-auto ml-4 sm:ml-0">
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex w-fit h-fit rounded-full"}>
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
            <NavbarLinks session={session} />
            <NavbarConfig darkMode={darkMode} setDarkMode={setDarkMode} setMobileMenuStatus={setMobileMenuStatus} />
            <div className="hidden sm:flex">{session ? (<SignOutButton></SignOutButton>) : (<SignInButton message="Login" />)}</div>
          </div>
        </div>
      </nav>
    </>
  );
}
