"use client";
import Image from 'next/image';
import NextLink from "next/link";
import { Link } from "react-scroll";
import capXLogo from "../../public/static/images/capx_logo.svg";
import profilePicture from "../../public/static/images/profile_picture.svg";

// Navbar component has two parts:
// 1. Capacity Exchange Logo on the left.
// 2. Menu on the right.
export default function Navbar({ loggedInUser }) {
  return (
    <nav className="absolute w-10/12 h-fit m-auto left-0 right-0 mt-10">
      <div className="flex w-full place-content-between place-items-end sm:items-center">
        {/* Capacity Exchange Logo */}
        <NextLink href="/" className="w-8/12 sm:w-1/2">
          <Image
            priority={true}
            src={capXLogo}
            alt="Logo do projeto Capacity Exchange"
            className="w-full sm:w-16"
          />
        </NextLink>
        {loggedInUser ? (
          <div className="flex sm:items-center space-x-12">
            <NextLink href="/events" className="cursor-pointer hover:underline">
              Events
            </NextLink>
            <NextLink href="/capacities" className="cursor-pointer hover:underline">
              Capacities
            </NextLink>
            <NextLink href={"/profile"} className="flex w-fit h-fit bg-capx-secondary-green text-white px-2 sm:px-6 py-2 rounded-full cursor-pointer select-none items-center">
              <div className="w-8 h-8 bg-capx-primary-blue rounded-full border-2  border-white sm:mr-3">
                <Image
                  src={profilePicture}
                  alt="Sua imagem de perfil"
                  className="w-full h-full p-2"
                />
              </div>
              <p className="hidden sm:block">Olá, Pessoa</p>
            </NextLink>
          </div>
        ) : (
          <div className="flex sm:items-center space-x-12">
            {/* About button */}
            <Link
              activeClass="active"
              to="section02"
              spy={true}
              smooth={true}
              duration={500}
              delay={150}
              className="cursor-pointer hover:underline"
            >
              About
            </Link>
            {/* How it works button */}
            <Link
              activeClass="active"
              to="section03"
              spy={true}
              smooth={true}
              duration={500}
              delay={150}
              className="cursor-pointer hover:underline"
            >
              How it works
            </Link>
            {/* Login button */}
            <NextLink href="/terms" className="flex w-fit h-fit bg-capx-secondary-green hover:bg-capx-primary-green text-white px-2 sm:px-8 py-2 rounded-full select-none items-center">
              Login
            </NextLink>
          </div>
        )}
      </div>
    </nav>
  );
}
