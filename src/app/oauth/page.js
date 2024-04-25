"use client"
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import CapXLogo from "../../../public/static/images/capx_logo.svg";

export default function OAuth({ searchParams }) {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState("FINISHING LOGIN");
  const oauth_verifier = searchParams.oauth_verifier;

  useEffect(() => {
    async function finishLogin() {
      try {
        const oauth_token = localStorage.getItem("oauth_token");
        const oauth_token_secret = localStorage.getItem("oauth_token_secret");
        const loginResult = await signIn("credentials", {
          oauth_token,
          oauth_token_secret,
          oauth_verifier,
          redirect: false
        });

        if (loginResult.status == 200 && loginResult.ok === true && loginResult.error === null) {
          setLoginStatus("SUCCESSFUL LOGIN");
        } else {
          alert("An error occurred when trying to log in. You need to start the process over again.");
        }
        
        localStorage.removeItem("oauth_token");
        localStorage.removeItem("oauth_token_secret");
      } catch {
        alert("An error occurred when trying to log in. You need to start the process over again.");
      }
      router.push("/");
    }
    finishLogin();
  }, []);

  return (
    <section className="flex w-screen h-screen font-montserrat">
      <div className="flex flex-wrap w-1/2 mx-auto my-auto">
        <div className="flex w-fit mx-auto mb-4">
          <Image
            priority={true}
            src={CapXLogo}
            alt="Capacity Exchange logo image."
            className="w-16"
          />
        </div>
        <div className="flex w-full text-center mb-4">
          <h1 className="w-full">{loginStatus}</h1>
        </div>
        <div className="flex w-fit mx-auto">
          <div className="mx-auto animate-spin ease-linear h-8 w-8 rounded-full border-8 border-l-gray-300 border-r-gray-300 border-b-gray-300 border-t-capx-primary-blue"></div>
        </div>
      </div>
    </section>
  )
}