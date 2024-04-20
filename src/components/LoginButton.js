"use client";
import { useState } from "react";

export default function LoginButton() {
  const [loginStarted, setLoginStarted] = useState(false);

  return (
    <button className="flex w-fit h-fit my-auto bg-capx-secondary-purple text-[#F6F6F6] px-4 sm:px-5 py-2 rounded-full">
      {loginStarted ?
        <div className="animate-spin ease-linear h-6 w-6 rounded-full border-4 border-l-white border-r-white border-b-white border-t-capx-primary-green"></div>
        :
        "Login"
      }
    </button>
  )
}