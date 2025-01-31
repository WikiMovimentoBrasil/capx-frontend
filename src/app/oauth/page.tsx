"use client";
import Image from "next/image";
import { signIn, useSession, SessionProvider, getSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CapXLogo from "@/public/static/images/capx_minimalistic_logo.svg";

function OAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loginStatus, setLoginStatus] = useState<string | null>("Iniciando...");
  const isCheckingTokenRef = useRef(false);  // Ref para controlar a execução do checkToken

  const oauth_verifier = searchParams.get("oauth_verifier");
  const oauth_token_request = searchParams.get("oauth_token");

  useEffect(() => {
    if (status === "authenticated" && session) {
      localStorage.removeItem("oauth_token");
      localStorage.removeItem("oauth_token_secret");
    }
  }, [status, session]);

  useEffect(() => {
    if (!oauth_token_request || !oauth_verifier || isCheckingTokenRef.current) {
      // Evita chamar checkToken se já foi feito, ou se os parâmetros não estão presentes.
      // Dessa forma evitamos chamar o login mais de uma vez, e evitamos erro 401 do next-auth.
      return;
    }

    // Início do processo de verificação
    isCheckingTokenRef.current = true;

    async function checkToken() {
      try {
        if (!oauth_token_request || !oauth_verifier) {
          console.log("Missing required parameters:", {
            token: oauth_token_request,
            verifier: oauth_verifier,
          });
          return;
        }

        console.log("Checking token");
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
            console.log("Token mismatch, updating stored token");
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
            console.log("Hostname matches or equivalent");

            if (!stored_secret) {
              console.log("No secret found, redirecting to start");
              router.push("/");
              return;
            }

            console.log("All tokens present, proceeding with login");
            await handleLogin();
          } else {
            console.log("Hostname mismatch, redirecting");
            router.push(`http://localhost:3000/oauth?oauth_token=${oauth_token_request}&oauth_verifier=${oauth_verifier}`);
          }
        }
      } catch (error) {
        console.error("Token check error:", error);
        router.push("/");
      } finally {
        // Fim do processo de verificação
        isCheckingTokenRef.current = false;
      }
    }

    checkToken();
  }, [oauth_token_request, oauth_verifier, router]);

  async function handleLogin() {
    try {
      const oauth_token = localStorage.getItem("oauth_token");
      const oauth_token_secret = localStorage.getItem("oauth_token_secret");

      if (!oauth_token || !oauth_token_secret) {
        throw new Error("Missing OAuth tokens");
      }

      setLoginStatus("Finalizando Login...");
      const result = await signIn("credentials", {
        oauth_token,
        oauth_token_secret,
        oauth_verifier,
        stored_token: oauth_token,
        stored_token_secret: oauth_token_secret,
        redirect: true,
        callbackUrl: "/home", 
      });
      if (result?.error) {
        console.error("Login error:", result.error);
        setLoginStatus("Erro: " + result.error);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.message };
    }
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

export default function OAuth() {
  return (
    <SessionProvider>
      <OAuthContent />
    </SessionProvider>
  );
}
