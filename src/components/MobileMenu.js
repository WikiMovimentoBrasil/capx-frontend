"use client";
import Image from "next/image";
import IconCloseMobileMenu from "../../public/static/images/icon_close_mobile_menu.svg";

export default function MobileMenu(props) {
  const handleMenuStatus = () => {
    props.setMobileMenuStatus((prevState) => !prevState);
  };

  return (
    <div className="fixed w-screen h-screen bg-gray-100 pb-10 origin-top-right z-50">
      <div className="flex flex-row-reverse w-10/12 mx-auto mt-6 mb-8 cursor-pointer">
        <a onClick={handleMenuStatus}>
          <Image
            src={IconCloseMobileMenu}
            alt="Button to close menu."
            className="fill-current h-10 w-10 text-gray-700"
          />
        </a>
      </div>
    </div>
  )
}