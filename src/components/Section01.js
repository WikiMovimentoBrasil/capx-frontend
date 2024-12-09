import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import MainImage from "@/public/static/images/main_image.svg";
import AuthButton from "./AuthButton";

export default function Section01({ pageContent }) {
  return (
    <section
      id="section01"
      className={
        "flex flex-wrap sm:flex-nowrap w-10/12 h-fit sm:h-screen mx-auto place-content-start py-32 font-montserrat"
      }
    >
      <div className="sm:w-2/3 sm:grid sm:place-content-center sm:pr-20">
        {/* Title */}
        <h1 className="w-full h-fit font-extrabold text-3xl sm:text-7xl text-center sm:text-left mb-8">
          {pageContent["body-home-section01-title-text"]}
          <br></br>
          <Typewriter
            words={pageContent["body-home-section01-title-carousel"]
              .replace(" ", "")
              .split(",")}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={120}
            deleteSpeed={50}
            delaySpeed={3000}
          />
        </h1>
        {/* Main Image Mobile */}
        <div className="block sm:hidden w-full sm:w-1/3 sm:h-fit aspect-square sm:my-auto mb-8 sm:mb-auto">
          <Image
            priority={true}
            src={MainImage}
            alt="Main image."
            className="px-10"
          />
        </div>
        {/* Description */}
        <h3 className="w-full h-fit text-2xl sm:text-3xl font-regular text-center sm:text-left mb-8 sm:mb-14">
          {pageContent["body-home-section01-description"]}
        </h3>
        {/* Coming Soon */}
        <div className="grid place-content-center sm:place-content-start w-full">
          <AuthButton
            message={pageContent["body-home-section01-button"]}
            customClass="w-fit"
            isSignOut={false}
          />
        </div>
      </div>
      {/* Main Image Desktop */}
      <div className="hidden sm:block w-full sm:w-1/3 sm:h-fit aspect-square sm:my-auto mb-8 sm:mb-auto">
        <Image priority={true} src={MainImage} alt="Main image." />
      </div>
    </section>
  );
}
