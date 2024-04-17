"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Section01 from "@/components/Section01";
import Section02 from "@/components/Section02";
import Section03 from "@/components/Section03";
import BackToTopButton from "@/components/BackToTopButton";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={(darkMode ? "bg-capx-dark-bg text-capx-light-bg " : "bg-capx-light-bg text-capx-dark-bg ") + " flex flex-wrap flex-col w-full font-montserrat"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}></Navbar>
      <Section01></Section01>
      <Section02 darkMode={darkMode}></Section02>
      <Footer darkMode={darkMode}></Footer>
      <BackToTopButton darkMode={darkMode} />
    </main>
  );
}
