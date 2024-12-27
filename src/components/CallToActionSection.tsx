import AuthButton from "@/components/AuthButton";
import BaseButton from "./BaseButton";
import Image from "next/image";
import Illustration from "@/public/static/images/capx_people_illustration.svg";
import { useApp } from "@/contexts/AppContext";

interface CallToActionSectionProps {
  pageContent: any;
}

export default function CallToActionSection({
  pageContent,
}: CallToActionSectionProps) {
  const { isMobile, darkMode } = useApp();

  if (isMobile) {
    return (
      <div
        className={
          (darkMode ? "bg-capx-dark-box-bg " : "capx-light-bg ") +
          "flex flex-col items-center justify-center"
        }
      >
        <div className="flex flex-col items-center justify-center mt-12 w-[273px]">
          <h1 className="text-[#053749] text-center font-[Montserrat] text-[32px] not-italic font-extrabold leading-[normal]">
            {pageContent["body-home-section01-call-to-action-title"]}
          </h1>
          <p className="w-[193px] h-[29px] flex-shrink-0 text-[#000] text-center font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] mt-4">
            {pageContent["body-home-section01-call-to-action-description"]}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 w-[273px] gap-4">
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
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-around mb-16 mx-[128px]">
      <div className="flex flex-col items-start justify-start mt-12">
        <h1 className="text-[#053749] text-left font-[Montserrat] text-[48px] not-italic font-extrabold leading-[normal]">
          {pageContent["body-home-section01-call-to-action-title"]}
        </h1>
        <p className="flex-shrink-0 text-[#000] text-left font-[Montserrat] text-[24px] not-italic font-normal leading-[normal] mt-4">
          {pageContent["body-home-section01-call-to-action-description"]}
        </p>
        <div className="flex flex-row items-start justify-start mt-12 gap-4">
          <AuthButton
            message={pageContent["body-home-section01-call-to-action-button01"]}
            customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] bg-capx-secondary-purple text-[#F6F6F6] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] rounded-md"
          />
          <BaseButton
            onClick={() => {}}
            label={pageContent["body-home-section01-call-to-action-button02"]}
            customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[6px] border-[1px] border-[solid] border-[var(--Backgrounds-dark-box-bg,#053749)] bg-[#FFF] text-center font-[Montserrat] text-[14px] text-capx-dark-box-bg not-italic font-extrabold leading-[normal]"
          />
        </div>
      </div>
      <Image src={Illustration} alt="Illustration" width={400} height={400} />
    </div>
  );
}
