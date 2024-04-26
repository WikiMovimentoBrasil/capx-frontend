"use client";
import { useState } from "react";
import BaseWrapper from "./BaseWrapper";
import Section01 from "@/components/Section01";

export default function ApplicationWrapper(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");

  return (
    <BaseWrapper session={props.session} darkMode={darkMode} setDarkMode={setDarkMode}>
      <Section01></Section01>
    </BaseWrapper>
  )
}