"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function SignInButton({ message, bigSizeButton }) {
  const router = useRouter();
  const [loginStarted, setLoginStarted] = useState(false);

  const startLogin = async () => {
    setLoginStarted(true);
    try {
      const startLoginResponse = await axios.post("/api/login");
      localStorage.setItem("oauth_token", startLoginResponse.data.oauth_token);
      localStorage.setItem("oauth_token_secret", startLoginResponse.data.oauth_token_secret);
      router.push(startLoginResponse.data.redirect_url);
    } catch (error) {
      alert("An error occurred when trying to log in.");
      setLoginStarted(false);
    }
  }

  return (
    <button onClick={startLogin} className="flex w-fit h-fit my-auto bg-capx-secondary-purple text-[#F6F6F6] tracking-wider font-extrabold px-4 sm:px-5 py-2 rounded-full">
      {loginStarted ?
        <div className={(bigSizeButton ? "w-8 h-8 border-8 " : "h-6 w-6 border-4 ") + "animate-spin ease-linear rounded-full border-l-white border-r-white border-b-white border-t-capx-primary-green"}></div>
        :
        <div className={bigSizeButton ? ("text-xl sm:text-2xl px-5 sm:px-6") : (null)}>{message}</div>
      }
    </button>
  )
}