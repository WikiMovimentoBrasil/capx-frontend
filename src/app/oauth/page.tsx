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
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const oauth_verifier = searchParams.oauth_verifier;
  const oauth_token_request = searchParams.oauth_token;

  useEffect(() => {
    let mounted = true;

    async function checkToken() {
      if (!oauth_token_request || !mounted) return;

      try {
        const response = await fetch("/api/check/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: oauth_token_request }),
        });

        if (response.ok) {
          const result = await response.json();
          let hostname = `${document.location.hostname}`;
          if (document.location.port !== "") {
            hostname += `:${document.location.port}`;
          }

          if (!result) {
            return;
          }

          if (result.extra === hostname) {
            console.log("hostname is correct");
            handleLogin();
          } else if (
            result.extra === "localhost:3000" ||
            result.extra === "127.0.0.1:3000"
          ) {
            router.push(
              `http://localhost:3000/oauth?oauth_token=${oauth_token_request}&oauth_verifier=${oauth_verifier}`
            );
            return;
          } else if (result.extra === "capx-test.toolforge.org") {
            router.push(
              `https://capx-test.toolforge.org/oauth?oauth_token=${oauth_token_request}&oauth_verifier=${oauth_verifier}`
            );
            return;
          }
        }
      } catch (error) {
        console.error("Token check error:", error);
      }
    }

    async function handleLogin() {
      if (!oauth_verifier || !mounted) return;

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
    }

    checkToken();
    return () => {
      mounted = false;
    };
  }, [oauth_verifier, oauth_token_request, router]);

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
