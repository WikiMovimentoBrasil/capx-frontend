"use client";
import Image from "next/image";
import { signIn, useSession, SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CapXLogo from "@/public/static/images/capx_minimalistic_logo.svg";

function OAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loginStatus, setLoginStatus] = useState<string | null>("Iniciando...");

  const oauth_verifier = searchParams.get("oauth_verifier");
  const oauth_token_request = searchParams.get("oauth_token");

  useEffect(() => {
    async function checkToken() {
      if (!oauth_token_request || !oauth_verifier) {
        return;
      }

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
          if (document.location.port) {
            hostname += `:${document.location.port}`;
          }

          if (localStorage.getItem("oauth_token") !== oauth_token_request) {
            localStorage.setItem("oauth_token", oauth_token_request);
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          const stored_secret = localStorage.getItem("oauth_token_secret");

          // Verifica o hostname e os tokens antes de prosseguir
          const isValidHost =
            result.extra === hostname ||
            (hostname === "localhost:3000" &&
              result.extra === "127.0.0.1:3000") ||
            (hostname === "127.0.0.1:3000" &&
              result.extra === "localhost:3000");

          if (isValidHost) {
            if (!stored_secret) {
              router.push("/");
              return;
            }

            try {
              const loginResult = await handleLogin();
              if (loginResult?.error) {
                throw new Error(loginResult.error);
              }
            } catch (error) {
              console.error("Login failed:", error);
              router.push("/");
            }
            return;
          }

          if (
            result.extra === "localhost:3000" ||
            result.extra === "127.0.0.1:3000"
          ) {
            router.push(
              `http://localhost:3000/oauth?oauth_token=${oauth_token_request}&oauth_verifier=${oauth_verifier}`
            );
          } else if (result.extra === "capx-test.toolforge.org") {
            router.push(
              `https://capx-test.toolforge.org/oauth?oauth_token=${oauth_token_request}&oauth_verifier=${oauth_verifier}`
            );
          }
        }
      } catch (error) {
        console.error("Token check error:", error);
        router.push("/");
      }
    }

    async function handleLogin() {
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
          stored_token: oauth_token,
          stored_token_secret: oauth_token_secret,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        if (result?.ok) {
          setLoginStatus("Login realizado, atualizando sessão...");

          for (let i = 0; i < 10; i++) {
            if (status === "authenticated" && session) {
              localStorage.removeItem("oauth_token");
              localStorage.removeItem("oauth_token_secret");
              router.replace("/home");
              return result;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          throw new Error("Timeout waiting for session update");
        }

        return result;
      } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
      }
    }

    checkToken();
  }, [oauth_verifier, oauth_token_request, router, status, session]);

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

export default function OAuth() {
  return (
    <SessionProvider>
      <OAuthContent />
    </SessionProvider>
  );
}
