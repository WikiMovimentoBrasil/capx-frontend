"use client";
import Image from "next/image";
import IconCloseMobileMenu from "../../public/static/images/icon_close_mobile_menu.svg";
import MobileMenuLinks from "@/components/MobileMenuLinks";

export default function MobileMenu({session, setMobileMenuStatus}) {
  const handleMenuStatus = () => {
    setMobileMenuStatus((prevState) => !prevState);
  };

  return (
    <div className="fixed w-screen h-screen bg-gray-100 pb-10 origin-top-right z-50">
      <div className="flex flex-row-reverse w-10/12 mx-auto mt-6 mb-8">
        <a onClick={handleMenuStatus}>
          <Image
            src={IconCloseMobileMenu}
            alt="Button to close menu."
            className="fill-current h-10 w-10 text-gray-700 cursor-pointer"
          />
        </a>
      </div>
      <MobileMenuLinks session={session} />
    </div>
  )
}