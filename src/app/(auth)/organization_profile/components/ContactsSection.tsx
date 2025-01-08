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

export const ContactsSection = () => {
  const { isMobile } = useApp();
  const { darkMode } = useTheme();

  const contacts = [
    {
      name: "Meta-wiki (Wiki Movimento Brasil)",
      icon: darkMode ? ContactMetaIconWhite : ContactMetaIcon,
    },
    {
      name: "wmnobrasil@wmnobrasil.org",
      icon: darkMode ? ContactEmailIconWhite : ContactEmailIcon,
    },
    {
      name: "wmnobrasil.org",
      icon: darkMode ? ContactPortalIconWhite : ContactPortalIcon,
    },
  ];

  const mobileContacts = [
    {
      name: "Meta-wiki",
      icon: darkMode ? ContactMetaIconWhite : ContactMetaIcon,
    },
    {
      name: "Email",
      icon: darkMode ? ContactEmailIconWhite : ContactEmailIcon,
    },
    {
      name: "Website",
      icon: darkMode ? ContactPortalIconWhite : ContactPortalIcon,
    },
  ];

  if (isMobile) {
    return (
      <section className="w-full mx-auto">
        <div className="flex flex-row flex pl-0 pr-[13px] py-[6px] items-center gap-[4px] rounded-[8px] mb-[14px]">
          <Image
            src={WikimediaIcon}
            alt="Wikimedia"
            width={20}
            height={20}
            style={{ width: "auto", height: "auto" }}
          />
          <h2
            className={`font-[Montserrat] not-italic font-extrabold leading-[normal] text-[#003649] pl-2 ${
              isMobile ? "text-[14px]" : " text-[24px]"
            }`}
          >
            Contacts
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex w-full pl-[6px] pr-[13px] py-[6px] items-center gap-[4px] rounded-[4px] bg-[#EFEFEF]"
            >
              <div className="relative w-[16px] h-[16px]">
                <Image
                  src={contact.icon}
                  alt={contact.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-[#053749] font-[Montserrat] text-[13px] not-italic font-normal leading-[normal]">
                {contact.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-screen-xl mx-auto py-8">
      <div className="flex flex-row flex pl-0 pr-[13px] py-[6px] items-center gap-[4px] rounded-[8px] mb-6">
        <Image
          src={darkMode ? WikimediaIconWhite : WikimediaIcon}
          alt="Wikimedia"
          width={36}
          height={36}
          style={{ width: "auto", height: "auto" }}
        />
        <h2
          className={`font-[Montserrat] not-italic font-extrabold leading-[normal] ${
            darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
          } pl-2 ${isMobile ? "text-[14px]" : " text-[24px]"}`}
        >
          Contacts
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {contacts.map((contact) => (
          <div
            className={`flex flex-row flex w-[1179px] px-[12px] py-[24px] items-center gap-[12px] rounded-[16px] ${
              darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
            }`}
          >
            <Image
              src={contact.icon}
              alt={contact.name}
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
            />
            <p
              className={`text-center font-[Montserrat] not-italic font-normal leading-[normal] ${
                darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
              } ${isMobile ? "text-[13px]" : "text-[24px]"}`}
            >
              {contact.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
