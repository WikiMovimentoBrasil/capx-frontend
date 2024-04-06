"use client";
import Image from 'next/image';
import NextLink from "next/link";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "absolute w-full h-16 m-auto left-0 right-0"}>
      <div className="flex w-full h-full place-content-between">
      </div>
    </nav>
  );
}
