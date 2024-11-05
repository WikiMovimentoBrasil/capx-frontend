import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import MainImage from "../../public/static/images/main_image.svg";
import SignInButton from "./SignInButton";

interface Section01Props {
  pageContent: Record<string, string>;
}

export default function Section01({ pageContent }: Section01Props) {
  const baseClasses = {
    section:
      "flex flex-wrap sm:flex-nowrap w-10/12 h-fit sm:h-screen mx-auto place-content-start py-32 font-montserrat",
    contentWrapper: "sm:w-2/3 sm:grid sm:place-content-center sm:pr-20",
    title:
      "w-full h-fit font-extrabold text-3xl sm:text-7xl text-center sm:text-left mb-8",
    mobileImage:
      "block sm:hidden w-full sm:w-1/3 sm:h-fit aspect-square sm:my-auto mb-8 sm:mb-auto",
    description:
      "w-full h-fit text-2xl sm:text-3xl font-regular text-center sm:text-left mb-8 sm:mb-14",
    buttonWrapper: "grid place-content-center sm:place-content-start w-full",
    desktopImage:
      "hidden sm:block w-full sm:w-1/3 sm:h-fit aspect-square sm:my-auto mb-8 sm:mb-auto",
  };

  const typewriterWords = pageContent["body-home-section01-title-carousel"]
    .replace(" ", "")
    .split(",");

  const typewriterConfig = {
    words: typewriterWords,
    loop: 0,
    cursor: true,
    cursorStyle: "_",
    typeSpeed: 120,
    deleteSpeed: 50,
    delaySpeed: 3000,
  };

  return (
    <section id="section01" className={baseClasses.section}>
      <div className={baseClasses.contentWrapper}>
        {/* Title */}
        <h1 className={baseClasses.title}>
          {pageContent["body-home-section01-title-text"]}
          <br />
          <Typewriter {...typewriterConfig} />
        </h1>

        {/* Main Image Mobile */}
        <div className={baseClasses.mobileImage}>
          <Image priority src={MainImage} alt="Main image" className="px-10" />
        </div>

        {/* Description */}
        <h3 className={baseClasses.description}>
          {pageContent["body-home-section01-description"]}
        </h3>

        {/* Sign In Button */}
        <div className={baseClasses.buttonWrapper}>
          <SignInButton
            message={pageContent["body-home-section01-button"]}
            bigSizeButton={true}
          />
        </div>
      </div>

      {/* Main Image Desktop */}
      <div className={baseClasses.desktopImage}>
        <Image priority src={MainImage} alt="Main image" />
      </div>
    </section>
  );
}
