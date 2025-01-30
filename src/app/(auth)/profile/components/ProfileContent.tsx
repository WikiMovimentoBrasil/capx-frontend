"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import ProfileHeader from "./ProfileHeader";
import MiniBio from "./MiniBio";
import { CapacitiesList } from "@/components/CapacitiesList";
import BaseButton from "@/components/BaseButton";
import Image from "next/image";
import { useProfile } from "@/hooks/useProfile";
import { useLanguage } from "@/hooks/useLanguage";
import { useAffiliation } from "@/hooks/useAffiliation";
import { useTerritories } from "@/hooks/useTerritories";
import { useWikimediaProject } from "@/hooks/useWikimediaProject";

import NeurologyIcon from "@/public/static/images/neurology.svg";
import NeurologyIconWhite from "@/public/static/images/neurology_white.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIcon from "@/public/static/images/target.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import LanguageIcon from "@/public/static/images/language.svg";
import LanguageIconWhite from "@/public/static/images/language_white.svg";
import TerritoryIcon from "@/public/static/images/territory.svg";
import TerritoryIconWhite from "@/public/static/images/territory_white.svg";
import AffiliationIcon from "@/public/static/images/affiliation.svg";
import AffiliationIconWhite from "@/public/static/images/affiliation_white.svg";
import BarCodeIcon from "@/public/static/images/barcode.svg";
import BarCodeIconWhite from "@/public/static/images/barcode_white.svg";
import WikiIcon from "@/public/static/images/wikimedia_logo_black.svg";
import WikiIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import ContactImage from "@/public/static/images/capx_contact_person.svg";
import ContactImageDesktop from "@/public/static/images/capx_contact_person_desktop.svg";

const ProfileItemsComponent = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string | string[];
}) => {
  const { darkMode } = useTheme();
  const { isMobile } = useApp();

  if (isMobile) {
    return (
      <>
        <div className="flex flex-row gap-2">
          <div className="relative h-[20px] w-[20px]">
            <Image src={icon} alt={title} fill objectFit="contain" />
          </div>
          <h2
            className={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {title}
          </h2>
        </div>
        <div
          className={`rounded-[4px] inline-flex px-[4px] py-[6px] items-center gap-[8px] ${
            darkMode ? "bg-capx-dark-bg" : "bg-[#EFEFEF]"
          }`}
        >
          <p
            className={`font-[Montserrat] text-[14px] not-italic font-normal leading-[normal] ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {value}
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-row gap-[80px] mt-[80px]">
        <div className="relative h-[48px] w-[48px]">
          <Image src={icon} alt={title} fill objectFit="contain" />
        </div>
        <h2
          className={`font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
            darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
          }`}
        >
          {title}
        </h2>
      </div>
      <div
        className={`rounded-[4px] inline-flex px-[4px] py-[6px] items-center gap-[8px] mt-[16px] ${
          darkMode ? "bg-capx-dark-bg" : "bg-[#EFEFEF]"
        }`}
      >
        <p
          className={`font-[Montserrat] text-[24px] not-italic font-normal leading-[normal] ${
            darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
          }`}
        >
          {value}
        </p>
      </div>
    </>
  );
};

export default function ProfileContent({ pageContent }) {
  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const token = session?.user?.token;
  const { profile, isLoading, error } = useProfile(
    token,
    Number(session?.user?.id)
  );

  console.log(" ProfileContent session", session);

  const { languages } = useLanguage(token);
  const { affiliations } = useAffiliation(token);
  const { territories } = useTerritories(token);
  const { wikimediaProjects, wikimediaProjectImages } = useWikimediaProject(
    token,
    profile?.wikimedia_project || []
  );

  if (isLoading) return <div>Loading...</div>;

  const getProficiencyLabel = (proficiency: string) => {
    const labels = {
      "0": "Not proficient",
      "1": "Basic",
      "2": "Intermediate",
      "3": "Advanced",
      "4": "Almost native",
      "5": "Professional proficiency",
      n: "Native",
    };
    return labels[proficiency as keyof typeof labels] || "Not specified";
  };

  // Resto do código de renderização do ProfilePage
  // Copiar todo o JSX do return do ProfilePage para aqui
  return (
    <div
      className={`relative w-full overflow-x-hidden ${
        darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
      }`}
    >
      {/* Copiar todo o conteúdo do return do ProfilePage */}
    </div>
  );
}
