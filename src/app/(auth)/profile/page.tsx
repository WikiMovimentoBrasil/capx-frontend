"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "./components/ProfileHeader";
import MiniBio from "./components/MiniBio";
import { CapacitiesList } from "@/components/CapacitiesList";
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

import BaseButton from "@/components/BaseButton";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { useAffiliation } from "@/hooks/useAffiliation";

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
  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="relative h-[20px] w-[20px]">
          <Image src={icon} alt={title} fill objectFit="contain" />
        </div>
        <p
          className={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
            darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
          }`}
        >
          {title}
        </p>
      </div>
      <div
        className={`rounded-[4px] inline-flex px-[4px] py-[6px] items-center gap-[8px] ${
          darkMode ? "bg-capx-dark-bg" : "bg-[#EFEFEF]"
        }`}
      >
        <p
          className={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
            darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
          }`}
        >
          {value}
        </p>
      </div>
    </>
  );
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const token = session?.user?.token;
  const { profile, isLoading, error } = useProfile(
    token,
    Number(session?.user?.id)
  );
  const { languages } = useLanguage(token);
  const { affiliations } = useAffiliation(token);

  if (isLoading) return <div>Loading...</div>;

  const getProficiencyLabel = (proficiency: string) => {
    const labels = {
      "1": "Basic",
      "2": "Intermediate",
      "3": "Advanced",
      "4": "Native",
      n: "Not specified",
    };
    return labels[proficiency as keyof typeof labels] || "Not specified";
  };

  return (
    <div
      className={`relative w-full overflow-x-hidden ${
        darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
      }`}
    >
      <section className={`w-full max-w-screen-xl mx-auto px-4 py-8 mt-[80px]`}>
        <div
          className={`flex flex-col max-w-[600px] mx-auto ${
            isMobile ? "gap-6" : "gap-[80px]"
          }`}
        >
          <ProfileHeader
            username={profile?.user?.username || ""}
            profileImage={profile?.profile_image || ""}
          />
          <MiniBio about={profile?.about || ""} />
          <CapacitiesList
            icon={darkMode ? NeurologyIconWhite : NeurologyIcon}
            title="Known capacities"
            items={profile?.skills_known || []}
            customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          />
          <CapacitiesList
            icon={darkMode ? EmojiIconWhite : EmojiIcon}
            title="Available capacities"
            items={profile?.skills_available || []}
            customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          />
          <CapacitiesList
            icon={darkMode ? TargetIconWhite : TargetIcon}
            title="Wanted capacities"
            items={profile?.skills_wanted || []}
            customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image
                src={darkMode ? LanguageIconWhite : LanguageIcon}
                alt="Language icon"
                width={20}
                height={20}
              />
              <h2
                className={`font-[Montserrat] text-[14px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Languages
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile?.language?.map((lang, index) => (
                <div
                  key={index}
                  className={`rounded-[4px] px-[4px] py-[6px] ${
                    darkMode ? "bg-capx-dark-bg" : "bg-[#EFEFEF]"
                  }`}
                >
                  <span
                    className={`font-[Montserrat] text-[14px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    {languages[lang.id]} -{" "}
                    {getProficiencyLabel(lang.proficiency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ProfileItemsComponent
            icon={darkMode ? WikiIconWhite : WikiIcon}
            title="Alternative Wikimedia Account"
            value={""}
          />
          <ProfileItemsComponent
            icon={darkMode ? AffiliationIconWhite : AffiliationIcon}
            title="Affiliation"
            value={
              profile?.affiliation
                ? affiliations[profile.affiliation[0]] || ""
                : ""
            }
          />
          <ProfileItemsComponent
            icon={darkMode ? TerritoryIconWhite : TerritoryIcon}
            title="Territory"
            value={profile?.territory || ""}
          />
          <ProfileItemsComponent
            icon={darkMode ? BarCodeIconWhite : BarCodeIcon}
            title="Wikidata Item"
            value={profile?.wikidata_qid || ""} // TODO: change to profile?.wikidata_item
          />
          <div className="flex flex-row gap-2">
            <div className="relative h-[20px] w-[20px]">
              <Image
                src={darkMode ? WikiIconWhite : WikiIcon}
                alt={"Wikidata Logo"}
                fill
                objectFit="contain"
              />
            </div>
            <p
              className={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
              }`}
            >
              Wikimedia Projects
            </p>
            <div className="flex flex-row gap-2">
              {profile?.wikimedia_project?.map((project) => (
                <div className="relative h-[20px] w-[20px]">
                  <Image
                    src={darkMode ? WikiIconWhite : WikiIcon}
                    alt={"Wikidata Logo"}
                    fill
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="relative h-[20px] w-[20px]">
              <Image
                src={darkMode ? WikiIconWhite : WikiIcon}
                alt={"Wikidata Logo"}
                fill
                objectFit="contain"
              />
            </div>
            <p
              className={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
              }`}
            >
              Contact
            </p>
          </div>

          {isMobile && (
            <div className="flex w-[273px] m-auto px-[34px] py-[24px] flex-col items-center gap-[31px] rounded-[4px] bg-[#0070B9]">
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src={ContactImage}
                  alt={"Contact Image"}
                  fill
                  objectFit="contain"
                />
              </div>
              <BaseButton
                label="Let's talk"
                customClass="inline-flex h-[32px] px-[19px] py-[8px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[4px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
                onClick={() => {}}
              />
            </div>
          )}

          {!isMobile && (
            <div className="flex w-full justify-center m-auto px-[34px] flex-row items-center gap-[31px] rounded-[4px] bg-[#0070B9]">
              <div className="relative h-[248px] w-[248px]">
                <Image
                  src={ContactImageDesktop}
                  alt={"Contact Image"}
                  fill
                  objectFit="contain"
                />
              </div>
              <BaseButton
                label="Let's talk"
                customClass="inline-flex h-[32px] px-[19px] py-[8px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[4px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
                onClick={() => {}}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
