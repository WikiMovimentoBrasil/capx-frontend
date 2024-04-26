"use client";
import { useState } from "react";
import BaseWrapper from "./BaseWrapper";
import { useRouter } from 'next/navigation';
import Section01 from "@/components/Section01";

export default function ApplicationWrapper(props) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");

  // Redirecting user to /profile if logged in
  if (props.session) {
    router.push("/profile");
  }
  // Rendering initial landing page
  else {
    return (
      <BaseWrapper session={props.session} darkMode={darkMode} setDarkMode={setDarkMode}>
        <Section01></Section01>
      </BaseWrapper>
    )
  }
}