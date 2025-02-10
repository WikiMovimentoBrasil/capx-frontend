import Image from "next/image";
import WikimediaIcon from "@/public/static/images/wikimedia_logo_black.svg";
import WikimediaIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import ContactMetaIcon from "@/public/static/images/contact_meta.svg";
import ContactMetaIconWhite from "@/public/static/images/contact_meta_white.svg";
import ContactEmailIcon from "@/public/static/images/contact_alternate_email.svg";
import ContactEmailIconWhite from "@/public/static/images/contact_alternate_email_white.svg";
import ContactPortalIcon from "@/public/static/images/contact_captive_portal.svg";
import ContactPortalIconWhite from "@/public/static/images/contact_captive_portal_white.svg";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";

interface ContactsSectionProps {
  email: string;
  meta_page: string;
  website: string;
}

export const ContactsSection = ({
  email,
  meta_page,
  website,
}: ContactsSectionProps) => {
  const { isMobile, pageContent } = useApp();
  const { darkMode } = useTheme();

  const contacts = [
    {
      name: meta_page,
      icon: darkMode ? ContactMetaIconWhite : ContactMetaIcon,
    },
    {
      name: email,
      icon: darkMode ? ContactEmailIconWhite : ContactEmailIcon,
    },
    {
      name: website,
      icon: darkMode ? ContactPortalIconWhite : ContactPortalIcon,
    },
  ];

  const mobileContacts = [
    {
      name: meta_page,
      icon: darkMode ? ContactMetaIconWhite : ContactMetaIcon,
    },
    {
      name: email,
      icon: darkMode ? ContactEmailIconWhite : ContactEmailIcon,
    },
    {
      name: website,
      icon: darkMode ? ContactPortalIconWhite : ContactPortalIcon,
    },
  ];

  if (isMobile) {
    return (
      <section className="w-full mx-auto">
        <div className="flex flex-row flex pl-0 pr-[13px] py-[6px] items-center gap-[4px] rounded-[8px] mb-[14px]">
          <div className="relative w-[20px] h-[20px]">
            <Image
              src={darkMode ? WikimediaIconWhite : WikimediaIcon}
              alt="Wikimedia"
              style={{ objectFit: "contain" }}
            />
          </div>
          <h2
            className={`font-[Montserrat] not-italic font-extrabold leading-[normal] ${
              darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
            }`}
          >
            {pageContent["body-profile-section-title-contacts"]}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`flex w-full px-[6px] py-[10px] items-center gap-[4px] rounded-[4px] ${
                darkMode
                  ? "bg-transparent border-[1px] border-[solid] border-white"
                  : "bg-[#EFEFEF]"
              }`}
            >
              <div className="relative w-[16px] h-[16px]">
                <Image
                  src={contact.icon}
                  alt={contact.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p
                className={` font-[Montserrat] text-[13px] not-italic font-normal leading-[normal] ${
                  darkMode ? "text-[#829BA4]" : "text-[#003649]"
                }`}
              >
                {contact.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-screen-xl py-8">
      <div className="flex flex-row flex pl-0 pr-[13px] py-[6px] items-center gap-[4px] rounded-[8px] mb-6">
        <div className="relative w-[48px] h-[48px]">
          <Image
            src={darkMode ? WikimediaIconWhite : WikimediaIcon}
            alt="Wikimedia"
            fill
            className="object-contain"
          />
        </div>
        <h2
          className={`font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
            darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
          }`}
        >
          {pageContent["body-profile-section-title-contacts"]}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`flex flex-row flex w-[1179px] px-[12px] py-[24px] items-center gap-[12px] rounded-[16px] ${
              darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
            }`}
          >
            <div className="relative w-[48px] h-[48px]">
              <Image
                src={contact.icon}
                alt={contact.name}
                fill
                className="object-contain"
              />
            </div>
            <p
              className={`text-center font-[Montserrat] text-[24px] not-italic font-normal leading-[normal] ${
                darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
              }`}
            >
              {contact.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
