"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadingSection from "./LoadingSection";
import BaseWrapper from "@/components/BaseWrapper";

export default function MainWrapper(props) {
  let pageContent;
  const { status, data } = useSession();
  const [userData, setUserData] = useState({});
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);

  useEffect(() => {
    if (status == "authenticated") {
      async function getUserData() {
        const queryResponse = await axios.get("/api/profile", {
          params: {
            userId: data.user.id,
          },
          headers: {
            'Authorization': `Token ${data.user.token}`,
          }
        });
        setUserData(queryResponse.data);
      }
      getUserData();
    }
  }, [status]);

  if (status === "loading") {
    pageContent = (<LoadingSection darkMode={darkMode} />)
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