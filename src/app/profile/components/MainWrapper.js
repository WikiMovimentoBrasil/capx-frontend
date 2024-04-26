"use client";
import { useState } from "react";
import BaseWrapper from "@/components/BaseWrapper";

export default function MainWrapper(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");

  return (
    <BaseWrapper session={props.session} darkMode={darkMode} setDarkMode={setDarkMode}></BaseWrapper>
  )
}