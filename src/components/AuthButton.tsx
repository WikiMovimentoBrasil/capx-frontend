"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BaseButton from "./BaseButton";
import RedirectPopup from "./RedirectionPopup";

interface AuthButtonProps {
  message: string;
  isSignOut?: boolean;
  customClass?: string;
}

export default function AuthButton({
  message,
  isSignOut = false,
  customClass,
}: AuthButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const defaultButtonClass =
    "flex justify-center items-center gap-2 px-8 py-4 rounded-lg bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg font-extrabold text-3.5 sm:text-3.5 rounded-lg text-center text-2xl not-italic leading-[normal]";

  const buttonClass =
    defaultButtonClass + (customClass ? ` ${customClass}` : "");

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
      localStorage.setItem("oauth_token", startLoginResponse.data.oauth_token);
      localStorage.setItem(
        "oauth_token_secret",
        startLoginResponse.data.oauth_token_secret
      );
      setShowPopup(false);
      setIsLoading(false);
      router.push(startLoginResponse.data.redirect_url);
    } catch (error) {
      alert("An error occurred when trying to log in.");
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
      />
      {showPopup && (
        <RedirectPopup
          onContinue={handleAuth}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
