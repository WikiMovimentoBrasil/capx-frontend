import Link from "next/link";
import Image from "next/image";
import LogoMobile from "@/public/static/images/capx_detailed_logo.svg";
import LogoDesktop from "@/public/static/images/capx_minimalistic_logo.svg";
import { useApp } from "@/contexts/AppContext";

interface FooterProps {
  darkMode: boolean;
  pageContent: any;
}

export default function Footer({ darkMode, pageContent }: FooterProps) {
  const { isMobile } = useApp();

  const footerLinks = [
    {
      title: pageContent["footer-link-documentation"],
      to: "https://github.com/WikiMovimentoBrasil/capx-backend/wiki",
    },
    {
      title: pageContent["footer-link-github"],
      to: "https://github.com/WikiMovimentoBrasil/capx-backend",
    },
    {
      title: pageContent["footer-link-wikimedia"],
      to: "https://meta.wikimedia.org/wiki/Capacity_Exchange",
    },
  ];

  const linksComponent = footerLinks.map((link, index) => {
    return (
      <div
        key={"footer-link-" + index.toString()}
        className="flex w-full sm:w-fit text-center flex px-[12px] py-[24px] no-underline justify-center items-center"
      >
        <Link
          href={link.to}
          target="_blank"
          className={
            (darkMode
              ? "text-capx-dark-link border-capx-dark-link no-underline"
              : "text-capx-light-link border-capx-light-link no-underline") +
            "w-fit"
          }
        >
          {link.title}
        </Link>
      </div>
    );
  });

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center my-8">
        <div className="flex flex-row items-center justify-center">
          <Image
            src={LogoMobile}
            alt="Capx Logo"
            width={64}
            height={64}
            className="w-[64px] h-[64px]"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          {linksComponent}
        </div>
        <div className="flex w-[320px] justify-center items-center gap-[24px]">
          <p className="text-center font-[Montserrat] text-[16px] not-italic font-bold leading-[normal] flex px-[12px] py-[24px] items-start">
            {pageContent["footer-message"]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={
        (darkMode ? "bg-capx-dark-box-bg " : "capx-light-bg ") +
        "flex flex-row items-center justify-around sm:flex-nowrap w-full h-fit sm:h-16 px-6 pb-14 sm:pb-0 sm:py-0 font-medium text-sm my-16"
      }
    >
      <div className="flex items-center justify-center">
        <Image src={LogoDesktop} alt="Capx Logo" className="w-16 h-16" />
      </div>
      <div className="flex flex-row items-center justify-center">
        {linksComponent}
      </div>

      <div className="flex justify-center items-center gap-[24px]">
        <p className="text-center font-[Montserrat] text-[16px] not-italic font-bold leading-[normal] flex px-[12px] py-[24px] items-start">
          {pageContent["footer-message"]}
        </p>
      </div>
    </section>
  );
}
