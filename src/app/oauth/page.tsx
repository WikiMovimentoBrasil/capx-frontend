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
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [hasCheckedToken, setHasCheckedToken] = useState(false);
  const isCheckingTokenRef = useRef(false);  // Ref para controlar a execução do checkToken
  const [hasReloaded, setHasReloaded] = useState(false);

  const oauth_verifier = searchParams.get("oauth_verifier");
  const oauth_token_request = searchParams.get("oauth_token");

  console.log("OAuth page loaded", {
    oauth_verifier,
    oauth_token_request,
    stored_token: localStorage.getItem("oauth_token"),
    stored_secret: localStorage.getItem("oauth_token_secret"),
  });

  // useEffect(() => {
  //   console.log("USEEFFECT - session:", session, "status:", status);

  //   if (status === "authenticated" && session) {
  //     localStorage.removeItem("oauth_token");
  //     localStorage.removeItem("oauth_token_secret");
  //     router.replace("/home");
  //   }
  // }, [status, session]);

  // useEffect(() => {
  //   console.log("hasReloaded", hasReloaded);
  //   if (status === "authenticated" && session && !hasReloaded) {
  //     setHasReloaded(true); // Marca que a página foi recarregada
  //     console.log("hasReloaded TRUE AQUI", hasReloaded);
  //     console.log("hasReloaded TRUE AQUI session", session);
  //     localStorage.removeItem("oauth_token");
  //     localStorage.removeItem("oauth_token_secret");
  
  //     router.replace("/home");
  //     // Força o recarregamento da página
  //     // window.location.reload();
  //   }
  // }, [status, session, hasReloaded]);

  useEffect(() => {
    if (status === "authenticated" && session && !hasReloaded) {
      setHasReloaded(true);
      localStorage.removeItem("oauth_token");
      localStorage.removeItem("oauth_token_secret");
      // router.push("/home");
  
      // Forneça um pequeno atraso para garantir que o estado da sessão foi atualizado
      // setTimeout(() => {
      //   router.replace("/home");
      // }, 1000); // 1 segundo de atraso
    }
  }, [status, session, hasReloaded]);

  useEffect(() => {
    if (hasCheckedToken || !oauth_token_request || !oauth_verifier || isCheckingTokenRef.current) {
      // Evita chamar checkToken se já foi feito, ou se os parâmetros não estão presentes
      return;
    }

    isCheckingTokenRef.current = true; // Marca o início do processo de verificação

    console.log("oauth_verifier", oauth_verifier);
    console.log("oauth_token_request", oauth_token_request);
    console.log("router", router);

    async function checkToken() {
      console.log("chamando check token");

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
            await new Promise((resolve) => setTimeout(resolve, 100));  // Aguarda o localStorage ser atualizado
          }

          const stored_secret = localStorage.getItem("oauth_token_secret");
          console.log("Current stored tokens:", {
            token: localStorage.getItem("oauth_token"),
            secret: stored_secret,
            verifier: oauth_verifier,
          });

          const isValidHost =
            result.extra === hostname ||
            (hostname === "localhost:3000" && result.extra === "127.0.0.1:3000") ||
            (hostname === "127.0.0.1:3000" && result.extra === "localhost:3000");

          if (isValidHost) {
            console.log("Hostname matches or equivalent");

            if (!stored_secret) {
              console.log("No secret found, redirecting to start");
              router.push("/");
              return;
            }

            console.log("All tokens present, proceeding with login");
            await handleLogin();  // Chama o login apenas uma vez
          } else {
            console.log("Hostname mismatch, redirecting");
            router.push(`http://localhost:3000/oauth?oauth_token=${oauth_token_request}&oauth_verifier=${oauth_verifier}`);
          }
        }
      } catch (error) {
        console.error("Token check error:", error);
        router.push("/");
      } finally {
        isCheckingTokenRef.current = false; // Marca o fim do processo de verificação
        setHasCheckedToken(true);  // Marca como checado
      }
    }

    checkToken();
  }, [oauth_token_request, oauth_verifier, hasCheckedToken, router]);

  async function handleLogin() {
    if (isLoggingIn) return;  // Evita login múltiplos
    try {
      setIsLoggingIn(true);

      const oauth_token = localStorage.getItem("oauth_token");
      const oauth_token_secret = localStorage.getItem("oauth_token_secret");

      if (!oauth_token || !oauth_token_secret) {
        throw new Error("Missing OAuth tokens");
      }

      setLoginStatus("Finalizando Login...");
      console.log("Starting login with credentials:", {
        oauth_token,
        oauth_verifier,
        stored_token: oauth_token,
        stored_token_secret: oauth_token_secret,
      });

      const result = await signIn("credentials", {
        oauth_token,
        oauth_token_secret,
        oauth_verifier,
        stored_token: oauth_token,
        stored_token_secret: oauth_token_secret,
        redirect: true,
        callbackUrl: "/home", 
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        setLoginStatus("Login realizado, atualizando sessão...");

        const session = await getSession(); // Garanta que a sessão está atualizada
        console.log("Sessão atualizada:", session);
      }

      return result;
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.message };
    } finally {
      setIsLoggingIn(false);  // Libera o estado após tentar
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
