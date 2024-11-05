"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignInButtonProps {
  message: string;
  bigSizeButton: boolean;
}

interface LoginResponse {
  oauth_token: string;
  oauth_token_secret: string;
  redirect_url: string;
}

export default function SignInButton({
  message,
  bigSizeButton,
}: SignInButtonProps) {
  const router = useRouter();
  const [loginStarted, setLoginStarted] = useState(false);

  const startLogin = async () => {
    setLoginStarted(true);

    try {
      const { data } = await axios.post<LoginResponse>("/api/login");

      localStorage.setItem("oauth_token", data.oauth_token);
      localStorage.setItem("oauth_token_secret", data.oauth_token_secret);

      router.push(data.redirect_url);
    } catch (error) {
      alert("An error occurred when trying to log in.");
      setLoginStarted(false);
    }
  };

  const spinnerClasses = `
  ${bigSizeButton ? "w-8 h-8 border-8" : "h-6 w-6 border-4"}
  animate-spin ease-linear rounded-full 
  border-l-white border-r-white border-b-white border-t-capx-primary-green
`.trim();

  const messageClasses = bigSizeButton
    ? "text-xl sm:text-2xl px-5 sm:px-6"
    : "";

  return (
    <button
      onClick={startLogin}
      className="
        flex w-fit h-fit my-auto
        bg-capx-secondary-purple hover:bg-capx-primary-green
        text-[#F6F6F6] hover:text-capx-dark-bg
        tracking-wider font-extrabold
        px-4 sm:px-5 py-2 rounded-full
      "
      disabled={loginStarted}
    >
      {loginStarted ? (
        <div className={spinnerClasses} />
      ) : (
        <div className={messageClasses}>{message}</div>
      )}
    </button>
  );
}
