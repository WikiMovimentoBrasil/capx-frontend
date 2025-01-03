"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CapXLogo from "@/public/static/images/capx_minimalistic_logo.svg";
import axios from "axios";
import { signIn } from "next-auth/react";

interface OAuthProps {
  searchParams: {
    oauth_token?: string;
    oauth_verifier?: string;
  };
}

export default function OAuth({ searchParams }: OAuthProps) {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<string>("");

  useEffect(() => {
    const completeLogin = async () => {
      if (!searchParams.oauth_token || !searchParams.oauth_verifier) {
        setLoginStatus("Missing OAuth parameters");
        return;
      }

      try {
        const storedToken = localStorage.getItem("oauth_token");
        const storedTokenSecret = localStorage.getItem("oauth_token_secret");

        if (!storedToken || !storedTokenSecret) {
          setLoginStatus("Missing stored OAuth tokens");
          return;
        }

        setLoginStatus("FINISHING LOGIN");

        const result = await signIn("credentials", {
          oauth_token: searchParams.oauth_token,
          oauth_verifier: searchParams.oauth_verifier,
          stored_token: storedToken,
          stored_token_secret: storedTokenSecret,
          redirect: false,
        });

        if (result?.ok) {
          setLoginStatus("Login successful!");
          localStorage.removeItem("oauth_token");
          localStorage.removeItem("oauth_token_secret");
          router.push("/home");
        } else {
          setLoginStatus("Login failed: " + (result?.error || "Unknown error"));
        }
      } catch (error: any) {
        console.error("Login completion error:", error);
        setLoginStatus("An error occurred during login");
      }
    };

    completeLogin();
  }, [searchParams.oauth_token, searchParams.oauth_verifier, router]);

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
          <h1 className="w-full">{loginStatus || "Processing login..."}</h1>
        </div>
        <div className="flex w-fit mx-auto">
          <div className="mx-auto animate-spin ease-linear h-8 w-8 rounded-full border-8 border-l-gray-300 border-r-gray-300 border-b-gray-300 border-t-capx-primary-blue"></div>
        </div>
      </div>
    </section>
  );
}
