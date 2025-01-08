"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "./components/ProfileHeader";
import MiniBio from "./components/MiniBio";
import { CapacitiesList } from "@/components/CapacitiesList";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import TargetIcon from "@/public/static/images/target.svg";
import LanguageIcon from "@/public/static/images/language.svg";
import TerritoryIcon from "@/public/static/images/territory.svg";
import AffiliationIcon from "@/public/static/images/affiliation.svg";
import BarCodeIcon from "@/public/static/images/barcode.svg";
import WikiIcon from "@/public/static/images/wikimedia_logo_black.svg";
import ContactImage from "@/public/static/images/capx_contact_person.svg";
import BaseButton from "@/components/BaseButton";
import Image from "next/image";

const ProfileItemsComponent = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string | string[];
}) => {
  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="relative h-[20px] w-[20px]">
          <Image src={icon} alt={title} fill objectFit="contain" />
        </div>
        <p className="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg">
          {title}
        </p>
      </div>
      <div className="rounded-[4px] bg-[#EFEFEF] inline-flex px-[4px] py-[6px] items-center gap-[8px]">
        <p className="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg">
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
  const { profile, isLoading, error } = useProfile(token);

  console.log("profile", profile);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative w-full overflow-x-hidden">
      <section
        className={`w-full max-w-screen-xl mx-auto px-4 py-8 ${
          isMobile ? "mt-[80px]" : "mt-[64px]"
        }`}
      >
        <div className="flex flex-col gap-6 max-w-[600px] mx-auto">
          <ProfileHeader username={profile?.display_name || ""} />
          <MiniBio about={profile?.about || ""} />
          <CapacitiesList
            icon={NeurologyIcon}
            title="Known capacities"
            items={profile?.skills_known || []}
            customClass="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg"
          />
          <CapacitiesList
            icon={EmojiIcon}
            title="Available capacities"
            items={profile?.skills_available || []}
            customClass="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg"
          />
          <CapacitiesList
            icon={TargetIcon}
            title="Wanted capacities"
            items={profile?.skills_wanted || []}
            customClass="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg"
          />
          <ProfileItemsComponent
            icon={LanguageIcon}
            title="Languages"
            value={profile?.language || ""}
          />
          <ProfileItemsComponent
            icon={WikiIcon}
            title="Alternative Wikimedia Account"
            value={profile?.language || ""} // TODO: change to profile?.alternative_wikimedia_account
          />
          <ProfileItemsComponent
            icon={AffiliationIcon}
            title="Affiliation"
            value={profile?.affiliation || ""}
          />
          <ProfileItemsComponent
            icon={TerritoryIcon}
            title="Territory"
            value={profile?.territory || ""}
          />
          <ProfileItemsComponent
            icon={BarCodeIcon}
            title="Wikidata Item"
            value={profile?.wikidata_qid || ""} // TODO: change to profile?.wikidata_item
          />
          <div className="flex flex-row gap-2">
            <div className="relative h-[20px] w-[20px]">
              <Image
                src={WikiIcon}
                alt={"Wikidata Logo"}
                fill
                objectFit="contain"
              />
            </div>
            <p className="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg">
              Wikimedia Projects
            </p>
            <div className="flex flex-row gap-2">
              {profile?.wikimedia_project?.map((project) => (
                <div className="relative h-[20px] w-[20px]">
                  <Image
                    src={WikiIcon}
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
                src={WikiIcon}
                alt={"Wikidata Logo"}
                fill
                objectFit="contain"
              />
            </div>
            <p className="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg">
              Contact
            </p>
          </div>

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
        </div>
      </section>
    </div>
  );
}
