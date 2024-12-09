"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BaseButton from "./BaseButton";

interface AuthButtonProps {
  message: string;
  isSignOut?: boolean;
}

export default function AuthButton({
  message,
  isSignOut = false,
}: AuthButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signInClass =
    "flex w-fit h-fit my-auto bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-wider font-extrabold text-xl sm:text-2xl px-4 sm:px-5 py-2 rounded-lg";

  const signOutClass =
    "flex w-fit h-fit my-auto bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-wider font-extrabold text-xl sm:text-2xl px-4 sm:px-5 py-2 rounded-lg";

  const buttonClass = isSignOut ? signOutClass : signInClass;

  const handleAuth = async () => {
    setIsLoading(true);

    if (isSignOut) {
      await signOut();
      return;
    }

    try {
      const startLoginResponse = await axios.post("/api/login");
      localStorage.setItem("oauth_token", startLoginResponse.data.oauth_token);
      localStorage.setItem(
        "oauth_token_secret",
        startLoginResponse.data.oauth_token_secret
      );
      router.push(startLoginResponse.data.redirect_url);
    } catch (error) {
      alert("An error occurred when trying to log in.");
      setIsLoading(false);
    }
  };

  return (
    <BaseButton
      label={message}
      onClick={handleAuth}
      disabled={isLoading}
      customClass={buttonClass}
    />
  );
}
