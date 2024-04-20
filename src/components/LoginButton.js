"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  const [loginStarted, setLoginStarted] = useState(false);

  const startLogin = async () => {
    setLoginStarted(true);
    try {
      const startLoginResponse = await axios.post("/api/login");
      router.push(startLoginResponse.data.redirect_url);
    } catch (error) {
      alert("An error occurred when trying to log in.");
      setLoginStarted(false);
    }
  }

  return (
    <button onClick={startLogin} className="flex w-fit h-fit my-auto bg-capx-secondary-purple text-[#F6F6F6] px-4 sm:px-5 py-2 rounded-full">
      {loginStarted ?
        <div className="animate-spin ease-linear h-6 w-6 rounded-full border-4 border-l-white border-r-white border-b-white border-t-capx-primary-green"></div>
        :
        "Login"
      }
    </button>
  )
}