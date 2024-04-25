"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Section01 from "@/components/Section01";

export default function ThemeWrapper(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");

  return (
    <main className={(darkMode ? "bg-capx-dark-bg text-capx-light-bg " : "bg-capx-light-bg text-capx-dark-bg ") + " flex flex-wrap flex-col w-full font-montserrat"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}></Navbar>
      <Section01></Section01>
      <Footer darkMode={darkMode}></Footer>
    </main>
  )
}