"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import ProfileHeader from "./components/ProfileHeader";
import MiniBio from "./components/MiniBio";
import { CapacitiesList } from "@/components/CapacitiesList";
import BaseButton from "@/components/BaseButton";
// import { loadLocale } from "@/lib/utils/loadLocale";

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

import { useProfile } from "@/hooks/useProfile";
import { useLanguage } from "@/hooks/useLanguage";
import { useAffiliation } from "@/hooks/useAffiliation";
import { useTerritories } from "@/hooks/useTerritories";
import { useWikimediaProject } from "@/hooks/useWikimediaProject";

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

export default function ProfilePage() {
  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const { isMobile, pageContent } = useApp();
  const token = session?.user?.token;
  const { profile, isLoading, error } = useProfile(
    token,
    Number(session?.user?.id)
  );
  const { languages } = useLanguage(token);
  const { affiliations } = useAffiliation(token);
  const { territories } = useTerritories(token);
  const { wikimediaProjects, wikimediaProjectImages } = useWikimediaProject(
    token,
    profile?.wikimedia_project || []
  );

  /*   if (isLoading) return <div>Loading...</div>;
   */
  const getProficiencyLabel = (proficiency: string) => {
    const labels = {
      "0": pageContent["profiency-level-not-proficient"],
      "1": pageContent["profiency-level-basic"],
      "2": pageContent["profiency-level-intermediate"],
      "3": pageContent["profiency-level-advanced"],
      "4": pageContent["profiency-level-almost-native"],
      "5": pageContent["profiency-level-professional"],
      n: pageContent["profiency-level-native"],
    };
    return labels[proficiency as keyof typeof labels] || "Not specified";
  };

  if (isMobile) {
    return (
      <div
        className={`relative w-full overflow-x-hidden ${
          darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
        }`}
      >
        <section
          className={`w-full max-w-screen-xl mx-auto px-4 py-8 mt-[80px]`}
        >
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
              title={pageContent["body-profile-known-capacities-title"]}
              items={profile?.skills_known || []}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal]`}
            />
            <CapacitiesList
              icon={darkMode ? EmojiIconWhite : EmojiIcon}
              title={pageContent["body-profile-available-capacities-title"]}
              items={profile?.skills_available || []}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal] `}
            />
            <CapacitiesList
              icon={darkMode ? TargetIconWhite : TargetIcon}
              title={pageContent["body-profile-wanted-capacities-title"]}
              items={profile?.skills_wanted || []}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal] `}
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
                  {pageContent["body-profile-languages-title"]}
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
              title={pageContent["body-profile-box-title-alt-wiki-acc"]}
              value={profile?.wiki_alt || ""}
            />
            <ProfileItemsComponent
              icon={darkMode ? AffiliationIconWhite : AffiliationIcon}
              title={pageContent["body-profile-section-title-affiliation"]}
              value={
                profile?.affiliation
                  ? affiliations[profile.affiliation[0]] || ""
                  : ""
              }
            />
            <ProfileItemsComponent
              icon={darkMode ? TerritoryIconWhite : TerritoryIcon}
              title={pageContent["body-profile-section-title-territory"]}
              value={
                profile?.territory
                  ? territories[profile.territory[0]] || ""
                  : ""
              }
            />
            <ProfileItemsComponent
              icon={darkMode ? BarCodeIconWhite : BarCodeIcon}
              title={pageContent["body-profile-box-title-wikidata-item"]}
              value={profile?.wikidata_qid || ""}
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
                {pageContent["body-profile-wikimedia-projects-title"]}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              {profile?.wikimedia_project?.map((projectId) =>
                projectId ? (
                  <div key={projectId} className="relative h-[72px] w-[72px]">
                    <Image
                      src={
                        wikimediaProjectImages[projectId] ||
                        (darkMode ? WikiIconWhite : WikiIcon)
                      }
                      alt={wikimediaProjects[projectId] || "Project icon"}
                      fill
                      objectFit="contain"
                    />
                  </div>
                ) : null
              )}
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
                {pageContent["body-profile-section-title-contact"]}
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
                  label={pageContent["body-profile-section-lets-talk"]}
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
                  label={pageContent["body-profile-section-lets-talk"]}
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

  return (
    <main className="flex-grow">
      <div
        className={`relative w-full overflow-x-hidden ${
          darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
        }`}
      >
        <section className={`max-w-[1440px] mx-[24px] px-4 py-8 mt-[16px]`}>
          <div className={`flex flex-col mx-auto`}>
            <ProfileHeader
              username={profile?.user?.username || ""}
              profileImage={profile?.profile_image || ""}
            />
            <MiniBio about={profile?.about || ""} />
            <CapacitiesList
              icon={darkMode ? NeurologyIconWhite : NeurologyIcon}
              title={pageContent["body-profile-known-capacities-title"]}
              items={profile?.skills_known || []}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal]`}
            />
            <CapacitiesList
              icon={darkMode ? EmojiIconWhite : EmojiIcon}
              title={pageContent["body-profile-available-capacities-title"]}
              items={profile?.skills_available || []}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal] `}
            />
            <CapacitiesList
              icon={darkMode ? TargetIconWhite : TargetIcon}
              title={pageContent["body-profile-wanted-capacities-title"]}
              items={profile?.skills_wanted || []}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal] `}
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 items-center">
                <Image
                  src={darkMode ? LanguageIconWhite : LanguageIcon}
                  alt="Language icon"
                  width={42}
                  height={42}
                />
                <h2
                  className={`font-[Montserrat] text-[24px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  {pageContent["body-profile-languages-title"]}
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
                      className={`font-[Montserrat] text-[24px] ${
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
              title={pageContent["body-profile-box-title-alt-wiki-acc"]}
              value={""}
            />
            <ProfileItemsComponent
              icon={darkMode ? AffiliationIconWhite : AffiliationIcon}
              title={pageContent["body-profile-section-title-affiliation"]}
              value={
                profile?.affiliation
                  ? affiliations[profile.affiliation[0]] || ""
                  : ""
              }
            />
            <ProfileItemsComponent
              icon={darkMode ? TerritoryIconWhite : TerritoryIcon}
              title={pageContent["body-profile-section-title-territory"]}
              value={
                profile?.territory
                  ? territories[profile.territory[0]] || ""
                  : ""
              }
            />
            <ProfileItemsComponent
              icon={darkMode ? BarCodeIconWhite : BarCodeIcon}
              title={pageContent["body-profile-box-title-wikidata-item"]}
              value={profile?.wikidata_qid || ""}
            />
            <div className="flex flex-row gap-2 mt-[80px] items-center">
              <div className="relative h-[48px] w-[48px]">
                <Image
                  src={darkMode ? WikiIconWhite : WikiIcon}
                  alt={"Wikidata Logo"}
                  fill
                  objectFit="contain"
                />
              </div>
              <p
                className={`font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
                }`}
              >
                {pageContent["body-profile-wikimedia-projects-title"]}
              </p>
            </div>
            <div className="flex flex-row gap-2 mt-[80px] items-center">
              {profile?.wikimedia_project?.map((projectId) =>
                projectId ? (
                  <div key={projectId} className="relative h-[180px] w-[180px]">
                    <Image
                      src={
                        wikimediaProjectImages[projectId] ||
                        (darkMode ? WikiIconWhite : WikiIcon)
                      }
                      alt={wikimediaProjects[projectId] || "Project icon"}
                      fill
                      objectFit="contain"
                    />
                  </div>
                ) : null
              )}
            </div>
            <div className="flex flex-row gap-2 mt-[80px] items-center mb-[16px]">
              <div className="relative h-[48px] w-[48px]">
                <Image
                  src={darkMode ? WikiIconWhite : WikiIcon}
                  alt={"Wikidata Logo"}
                  fill
                  objectFit="contain"
                />
              </div>
              <p
                className={`font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
                }`}
              >
                {pageContent["body-profile-section-title-contact"]}
              </p>
            </div>
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
                label={pageContent["body-profile-section-lets-talk"]}
                customClass="inline-flex h-[32px] px-[19px] py-[8px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[4px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
                onClick={() => {}}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
