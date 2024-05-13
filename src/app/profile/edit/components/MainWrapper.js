"use client";
import { useState } from "react";

export default function MainWrapper(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);

  return (<></>)
}