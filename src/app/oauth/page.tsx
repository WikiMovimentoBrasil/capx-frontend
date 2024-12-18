"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CapXLogo from "../../../public/static/images/capx_logo.svg";

interface OAuthProps {
  searchParams: {
    oauth_verifier: string;
  };
}

export default function OAuth({ searchParams }: OAuthProps) {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const oauth_verifier = searchParams.oauth_verifier;

  useEffect(() => {
    let mounted = true;

    async function handleLogin() {
      if (!oauth_verifier || !mounted) return;

      try {
        const oauth_token = localStorage.getItem("oauth_token");
        const oauth_token_secret = localStorage.getItem("oauth_token_secret");

        if (!oauth_token || !oauth_token_secret) {
          throw new Error("Missing OAuth tokens");
        }

        setLoginStatus("FINISHING LOGIN");

        const result = await signIn("credentials", {
          oauth_token,
          oauth_token_secret,
          oauth_verifier,
          redirect: false,
        });

        if (mounted) {
          if (result?.ok) {
            localStorage.removeItem("oauth_token");
            localStorage.removeItem("oauth_token_secret");
            router.replace("/");
          } else {
            throw new Error(result?.error || "Authentication failed");
          }
        }
      } catch (error) {
        if (mounted) {
          console.error("Login error:", error);
          setLoginStatus("LOGIN FAILED");
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        }
      }
    }

    handleLogin();
    return () => {
      mounted = false;
    };
  }, [oauth_verifier, router]);

  if (!loginStatus) {
    return null;
  }

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
  );
}
