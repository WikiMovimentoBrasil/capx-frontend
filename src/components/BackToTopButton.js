"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Link } from "react-scroll";
import BackToTopButtonScript from "../../public/static/script.js";
import BackToTopIconLightMode from "../../public/static/images/back_to_top_icon_light_mode.svg";
import BackToTopIconDarkMode from "../../public/static/images/back_to_top_icon_dark_mode.svg";

export default function BackToTopButton({ darkMode }) {
  useEffect(() => {
    // Importing and loading script.js
    const script = document.createElement('script');
    script.src = BackToTopButtonScript;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Removing script when component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Link
      id="bbtbutton"
      activeClass="active"
      to="section01"
      spy={true}
      smooth={true}
      duration={500}
      delay={150}
      className="hidden"
    >
      <div className="fixed bottom-10 sm:bottom-20 left-2 sm:left-8 cursor-pointer z-50">
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-fit mx-auto mb-1 rounded-full"}>
          <Image
            priority={true}
            src={darkMode ? BackToTopIconDarkMode : BackToTopIconLightMode}
            alt="Back to top button."
            className="max-w-12 p-1"
          />
        </div>
        <p className="hidden sm:block text-xs text-center">BACK<br></br>TO TOP</p>
      </div>
    </Link>
  )
}