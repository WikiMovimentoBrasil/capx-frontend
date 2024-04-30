"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import BaseWrapper from "@/components/BaseWrapper";

export default function MainWrapper(props) {
  let pageContent;
  const { status, data } = useSession();
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);

  if (status === "loading") {
    pageContent = (<div></div>)
  }

  return (
    <BaseWrapper
      session={props.session}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      mobileMenuStatus={mobileMenuStatus}
      setMobileMenuStatus={setMobileMenuStatus}
    >
      {pageContent}
    </BaseWrapper>
  )
}