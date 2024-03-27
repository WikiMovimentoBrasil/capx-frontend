"use client";
import Image from 'next/image';
import NextLink from "next/link";
import capXLogo from "../../public/static/images/capx_logo.png";

// Navbar component has two parts:
// 1. Capacity Exchange Logo on the left.
// 2. Menu on the right.
export default function Navbar() {
  return (
    <nav className="absolute w-10/12 h-fit m-auto left-0 right-0 mt-10">
      <div className="flex w-full place-content-between place-items-end sm:items-center">
        {/* Capacity Exchange Logo */}
        <NextLink href="/" className="w-8/12 sm:w-1/2">
          <Image
            priority={true}
            src={capXLogo}
            alt="Logo do projeto Capacity Exchange"
            className="w-full sm:w-48"
          />
        </NextLink>
        <div className="flex sm:items-center space-x-12">
          {/* Login button */}
          <NextLink href="/" className="flex w-fit h-fit bg-capx-secondary-green hover:bg-capx-primary-green text-white px-2 sm:px-8 py-2 rounded-full select-none items-center">
            Login
          </NextLink>
        </div>
      </div>
    </nav>
  );
}
