"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";
import BaseButton from "./BaseButton";
import Popup from "./Popup";
import capxPersonIcon from "../../public/static/images/capx_person_icon.svg";
import { useTheme } from "@/contexts/ThemeContext";

interface AuthButtonProps {
  message: string;
  isSignOut?: boolean;
  customClass?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function AuthButton({
  message,
  isSignOut = false,
  customClass,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
}: AuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { darkMode } = useTheme();
  const handleAuth = async () => {
    setIsLoading(true);

    if (isSignOut) {
      await signOut({ redirect: true, callbackUrl: "/" });
      setShowPopup(false);
      return;
    }

    try {
      const response = await axios.post("/api/login", null, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data?.redirect_url) {
        localStorage.setItem("oauth_token", response.data.oauth_token);
        localStorage.setItem(
          "oauth_token_secret",
          response.data.oauth_token_secret
        );
        window.location.href = response.data.redirect_url;
      } else {
        throw new Error("URL de redirecionamento não recebida");
      }
    } catch (error: any) {
      console.error("Erro completo:", error);
      console.error("Dados da resposta:", error.response?.data);
      console.error("Status da resposta:", error.response?.status);
      setShowPopup(false);
      alert(`Erro no login: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    if (isSignOut) {
      handleAuth();
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className="flex items-center h-full">
      <BaseButton
        label={message}
        onClick={handleRedirect}
        disabled={isLoading}
        customClass={customClass}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
      />
      {showPopup && (
        <Popup
          onContinue={handleAuth}
          onClose={() => setShowPopup(false)}
          image={capxPersonIcon}
          title="You are being redirected to the unified login on Meta-Wiki"
          closeButtonLabel="Close Tab"
          continueButtonLabel="Continue"
          customClass={`${darkMode ? "bg-[#005B3F]" : "bg-white"}`}
        />
      )}
    </div>
  );
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}
