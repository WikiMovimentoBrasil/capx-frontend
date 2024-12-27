"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BaseButton from "./BaseButton";
import Popup from "./Popup";
import capxPersonIcon from "../../public/static/images/capx_person_icon.svg";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const defaultButtonClass =
    "flex items-center gap-2 px-8 py-4 rounded-lg bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg font-extrabold text-3.5 sm:text-3.5 rounded-lg text-center text-2xl not-italic leading-[normal]";

  const buttonClass = customClass || defaultButtonClass;

  const handleAuth = async () => {
    setIsLoading(true);

    if (isSignOut) {
      await signOut();
      setShowPopup(false);
      router.push("/");
      return;
    }

    try {
      const startLoginResponse = await axios.post("/api/login");
      if (startLoginResponse.data.redirect_url) {
        localStorage.setItem(
          "oauth_token",
          startLoginResponse.data.oauth_token
        );
        localStorage.setItem(
          "oauth_token_secret",
          startLoginResponse.data.oauth_token_secret
        );
        setShowPopup(false);
        window.location.href = startLoginResponse.data.redirect_url;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred when trying to log in.");
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
        customClass={buttonClass}
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
        />
      )}
    </div>
  );
}
