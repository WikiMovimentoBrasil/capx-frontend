import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import MainImage from "@/public/static/images/main_image.svg";
import AuthButton from "./AuthButton";
import BaseButton from "./BaseButton";
import WikimediaLogo from "@/public/static/images/wikimedia_logo.svg";
import WikipediaLogo from "@/public/static/images/wikipedia_logo.svg";
import WikibooksLogo from "@/public/static/images/wikibooks_logo.svg";
import MediaWikiLogo from "@/public/static/images/mediawiki_logo.svg";
import WikidataLogo from "@/public/static/images/wikidata_logo.svg";
import WikifunctionsLogo from "@/public/static/images/wikifunctions_logo.svg";
import CommonsLogo from "@/public/static/images/commons_logo.svg";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";

interface MainSectionProps {
  pageContent: any;
}

export default function MainSection({ pageContent }: MainSectionProps) {
  const { isMobile } = useApp();
  const { darkMode } = useTheme();

  const scrollToVideo = () => {
    const element = document.getElementById("video-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isMobile) {
    return (
      <section
        id="main-section"
        className={`flex flex-col items-center justify-center w-full ${
          darkMode ? "bg-capx-dark-bg" : "bg-capx-light-bg"
        }`}
      >
        <div className="flex flex-col items-center justify-center w-full px-4 py-8 mt-24">
          <div className="mx-16">
            <h1
              className={`text-${
                darkMode ? "capx-dark-text" : "capx-light-text"
              } text-center font-[Montserrat] text-[32px] not-italic font-extrabold leading-[normal] mb-4`}
            >
              {pageContent["body-home-section01-title-text"] + " "}
              <Typewriter
                words={pageContent["body-home-section01-title-carousel"].split(
                  ","
                )}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={3000}
              />
            </h1>
            <p
              className={`text-[12px] text-center mx-4 font-[Montserrat] ${
                darkMode ? "text-capx-dark-text" : "text-capx-light-text"
              }`}
            >
              {pageContent["body-home-section01-description"]}
            </p>
          </div>

          <div className="w-full aspect-square">
            <Image
              priority={true}
              src={MainImage}
              alt="Main image."
              className="mx-auto px-10 w-full h-full"
            />
          </div>
          <div className="flex flex-col items-center gap-4 w-full my-8">
            <AuthButton
              message={pageContent["body-home-section01-button"]}
              customClass="h-8 w-full max-w-[280px] text-sm inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[6px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] not-italic font-extrabold leading-[normal]"
            />
            <BaseButton
              onClick={scrollToVideo}
              label={pageContent["body-home-section01-about-button"]}
              customClass="h-8 w-fit text-sm rounded-[6px] border-[1px] border-[solid] border-[var(--Backgrounds-dark-box-bg,#053749)] bg-[#FFF] inline-flex px-[16px] py-[8px] justify-center items-center gap-[8px] text-center font-[Montserrat] not-italic font-extrabold leading-[normal]"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="main-section"
      className={`flex flex-col items-center justify-start w-full ${
        darkMode ? "bg-capx-dark-bg" : "bg-capx-light-bg"
      }`}
    >
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-row items-start justify-start w-full py-24">
          <div className="flex flex-col w-2/3 pr-20">
            <div className="h-[176px] mb-24">
              <h1
                className={`text-${
                  darkMode ? "capx-dark-text" : "capx-light-text"
                } font-[Montserrat] text-[72px] not-italic font-extrabold leading-[88px]`}
              >
                {pageContent["body-home-section01-title-text"] + " "}
                <br />
                <Typewriter
                  words={pageContent[
                    "body-home-section01-title-carousel"
                  ].split(",")}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={3000}
                />
              </h1>
            </div>
            <p
              className={`text-${
                darkMode ? "capx-dark-text" : "capx-light-text"
              } font-[Montserrat] text-[30px] not-italic font-normal leading-[normal] mb-6 mt-4`}
            >
              {pageContent["body-home-section01-description"]}
            </p>
            <div className="flex flex-row items-center justify-start gap-4 w-full">
              <AuthButton
                message={pageContent["body-home-section01-button"]}
                customClass={`h-16 inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[6px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-capx-light-text bg-capx-light-bg"
                    : "text-capx-dark-text bg-capx-secondary-purple"
                }`}
              />
              <BaseButton
                onClick={scrollToVideo}
                label={pageContent["body-home-section01-about-button"]}
                customClass="h-16 rounded-[6px] border-[1px] border-[solid] border-[var(--Backgrounds-dark-box-bg,#053749)] bg-[#FFF] inline-flex px-[16px] py-[8px] justify-center items-center gap-[8px] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal]"
              />
            </div>
          </div>
          <div className="w-1/3 aspect-square">
            <Image
              priority={true}
              src={MainImage}
              alt="Main image."
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between mb-12">
          <div className="w-1/4 h-[100px]">
            <p
              className={`flex w-[311px] h-[100px] flex-col justify-center text-[24px] not-italic font-extrabold leading-[37px] md:text-[18px] md:max-w-[100%] md:leading-[27px] xl:text-[24px] xl:max-w-[100%] xl:leading-[37px] ${
                darkMode ? "text-capx-dark-text" : "text-capx-light-text"
              }`}
            >
              {pageContent["body-home-main-section-carrousel-description"]}
            </p>
          </div>
          <div className="w-3/4 h-[100px] flex flex-row items-center justify-center gap-2 md:gap-2 lg:gap-6 xl:gap-12">
            <Image
              src={WikimediaLogo}
              alt="Wikimedia logo"
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px]"
            />
            <Image
              src={WikipediaLogo}
              alt="Wikipedia logo"
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px]"
            />
            <Image
              src={WikibooksLogo}
              alt="Wikibooks logo"
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px]"
            />
            <Image
              src={MediaWikiLogo}
              alt="MediaWiki logo"
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px]"
            />
            <Image
              src={WikidataLogo}
              alt="Wikidata logo"
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px]"
            />
            <Image
              src={WikifunctionsLogo}
              alt="Wikifunctions logo"
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px]"
            />
            <Image
              src={CommonsLogo}
              alt="Commons logo"
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[80px] xl:h-[80px]"
            />
            <p
              className={`text-${
                darkMode ? "capx-dark-text" : "capx-light-text"
              } font-[Montserrat] text-[14px] not-italic font-extrabold leading-[29px]`}
            >
              {
                pageContent[
                  "body-home-main-section-carrousel-description-more-projects"
                ]
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
