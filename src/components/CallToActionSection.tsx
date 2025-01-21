import AuthButton from "@/components/AuthButton";
import BaseButton from "./BaseButton";
import Image from "next/image";
import Illustration from "@/public/static/images/capx_people_illustration.svg";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";

interface CallToActionSectionProps {
  pageContent: any;
}

export default function CallToActionSection({
  pageContent,
}: CallToActionSectionProps) {
  const { isMobile } = useApp();
  const { darkMode } = useTheme();

  if (isMobile) {
    return (
      <section
        className={`w-full ${
          darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-16 w-full">
          <h1
            className={`text-center font-[Montserrat] text-[32px] not-italic font-extrabold leading-[normal] ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {pageContent["body-home-section01-call-to-action-title"]}
          </h1>
          <p
            className={`w-[193px] h-[29px] flex-shrink-0 text-[#000] text-center font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] mt-4 ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {pageContent["body-home-section01-call-to-action-description"]}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 w-full gap-4">
          <AuthButton
            message={pageContent["body-home-section01-call-to-action-button01"]}
            customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] bg-capx-secondary-purple text-[#F6F6F6]  text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] rounded-md"
          />
          <BaseButton
            onClick={() => {}}
            label={pageContent["body-home-section01-call-to-action-button02"]}
            customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[6px] border-[1px] border-[solid] border-[var(--Backgrounds-dark-box-bg,#053749)] bg-[#FFF] text-center font-[Montserrat] text-[14px] text-capx-dark-box-bg not-italic font-extrabold leading-[normal]"
          />
          <Image
            src={Illustration}
            alt="Illustration"
            className="w-[273px] h-[273px]"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className={`w-full pb-16 ${
        darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
      }`}
    >
      <div className="flex flex-row items-center justify-around max-w-screen-xl mx-auto px-32">
        <div className="flex flex-col items-start justify-start mt-12">
          <h1
            className={`text-left font-[Montserrat] text-[48px] not-italic font-extrabold leading-[normal] ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {pageContent["body-home-section01-call-to-action-title"]}
          </h1>
          <p
            className={`flex-shrink-0 text-[#000] text-left font-[Montserrat] text-[24px] not-italic font-normal leading-[normal] mt-4 ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {pageContent["body-home-section01-call-to-action-description"]}
          </p>
          <div className="flex flex-row items-start justify-start mt-12 gap-4">
            <AuthButton
              message={
                pageContent["body-home-section01-call-to-action-button01"]
              }
              customClass="inline-flex justify-center items-center gap-[10px] bg-capx-secondary-purple text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] rounded-md py-4 px-8"
            />
            <BaseButton
              onClick={() => {}}
              label={pageContent["body-home-section01-call-to-action-button02"]}
              customClass="inline-flex justify-center items-center gap-[10px] rounded-[6px] border-[1px] border-[solid] border-[var(--Backgrounds-dark-box-bg,#053749)] bg-[#FFF] text-center font-[Montserrat] text-[24px] text-capx-dark-box-bg not-italic font-extrabold leading-[normal] py-4 px-8"
            />
          </div>
        </div>
        <Image src={Illustration} alt="Illustration" width={400} height={400} />
      </div>
    </section>
  );
}
