"use client";
import { useState } from "react";
import BaseWrapper from "./BaseWrapper";
import Section01 from "@/components/Section01";
import BlankSection from "./BlankSection";

export default function ApplicationWrapper(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");

  return (
    <BaseWrapper session={props.session} darkMode={darkMode} setDarkMode={setDarkMode}>
      <Section01></Section01>
    </BaseWrapper>
  )
  // Using a 'blank section' to maintain bg color
  // and avoid 'blink effect' in case of redirect
  return (
    <BlankSection darkMode={darkMode} />
  )
}