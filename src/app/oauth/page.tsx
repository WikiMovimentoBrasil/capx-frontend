"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CapXLogo from "@/public/static/images/capx_logo.svg";

interface SearchParams {
  oauth_verifier?: string;
}

export default function OAuth({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState("FINISHING LOGIN");
  const oauth_verifier = searchParams.oauth_verifier;

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const oauth_token = localStorage.getItem("oauth_token");
        const oauth_token_secret = localStorage.getItem("oauth_token_secret");

        if (!oauth_token || !oauth_token_secret || !oauth_verifier) {
          throw new Error("Missing OAuth credentials");
        }

        const loginResult = await signIn("credentials", {
          oauth_token,
          oauth_token_secret,
          oauth_verifier,
          redirect: false,
        });

        if (loginResult?.ok && !loginResult.error) {
          setLoginStatus("SUCCESSFUL LOGIN");
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        setLoginStatus("LOGIN FAILED");
        alert(
          "An error occurred when trying to log in. You need to start the process over again."
        );
      } finally {
        localStorage.removeItem("oauth_token");
        localStorage.removeItem("oauth_token_secret");
        router.push("/");
      }
    };

    finishLogin();
  }, [oauth_verifier, router]);

  return (
    <section className="flex w-screen h-screen font-montserrat">
      <div className="flex flex-wrap w-1/2 mx-auto my-auto">
        <div className="flex w-fit mx-auto mb-4">
          <Image
            priority
            src={CapXLogo}
            alt="Capacity Exchange logo image"
            className="w-16"
          />
        </div>
        <div className="flex w-full text-center mb-4">
          <h1 className="w-full">{loginStatus}</h1>
        </div>
        <div className="flex w-fit mx-auto">
          <div className="mx-auto animate-spin ease-linear h-8 w-8 rounded-full border-8 border-l-gray-300 border-r-gray-300 border-b-gray-300 border-t-capx-primary-blue" />
        </div>
      </div>
    </section>
  );
}
