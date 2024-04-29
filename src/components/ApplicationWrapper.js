"use client";
import { useState } from "react";
import BaseWrapper from "./BaseWrapper";
import Section01 from "@/components/Section01";
import Section02 from "./Section02";

export default function ApplicationWrapper(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);

  return (
    <BaseWrapper
      session={props.session}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      mobileMenuStatus={mobileMenuStatus}
      setMobileMenuStatus={setMobileMenuStatus}
    >
      <Section01></Section01>
      <Section02 darkMode={darkMode}></Section02>
    </BaseWrapper>
  )
}