"use client";
import { useEffect, useCallback } from "react";
import Image from "next/image";
import { Link } from "react-scroll";
import BackToTopIconLightMode from "../../public/static/images/back_to_top_icon_light_mode.svg";
import BackToTopIconDarkMode from "../../public/static/images/back_to_top_icon_dark_mode.svg";

interface BackToTopButtonProps {
  darkMode: boolean;
}

interface ScrollLinkProps {
  to: string;
  spy: boolean;
  smooth: boolean;
  duration: number;
  delay: number;
}

export function BackToTopButton({ darkMode }: BackToTopButtonProps) {
  const scrollLinkConfig: ScrollLinkProps = {
    to: "section01",
    spy: true,
    smooth: true,
    duration: 500,
    delay: 150,
  };

  const baseClasses = {
    button: "hidden",
    container:
      "fixed bottom-10 sm:bottom-20 left-2 sm:left-8 cursor-pointer z-50",
    imageWrapper: `w-fit mx-auto mb-1 rounded-full ${
      darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
    }`,
    image: "max-w-12 p-1",
    text: "hidden sm:block text-xs text-center",
  };

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const backToTopButton = document.getElementById("bbtbutton");
    const secondSection = document.getElementById("section02");

    if (!backToTopButton || !secondSection) return;

    const secondSectionTopPosition = secondSection.getBoundingClientRect();

    if (secondSectionTopPosition.y < 0) {
      backToTopButton.classList.remove("hidden");
    } else {
      backToTopButton.classList.add("hidden");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Chamada inicial para verificar o estado inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Link
      id="bbtbutton"
      activeClass="active"
      {...scrollLinkConfig}
      className={baseClasses.button}
    >
      <div className={baseClasses.container}>
        <div className={baseClasses.imageWrapper}>
          <Image
            priority
            src={darkMode ? BackToTopIconDarkMode : BackToTopIconLightMode}
            alt="Back to top button"
            className={baseClasses.image}
          />
        </div>
        <p className={baseClasses.text}>
          BACK
          <br />
          TO TOP
        </p>
      </div>
    </Link>
  );
}
