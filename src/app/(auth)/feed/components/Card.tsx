import React from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { ProfileCapacityType } from "../types";
import LanguageIcon from "@/public/static/images/language.svg";
import LanguageIconWhite from "@/public/static/images/language_white.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIcon from "@/public/static/images/target.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import NoAvatarIcon from "@/public/static/images/no_avatar.svg";
import NoAvatarIconWhite from "@/public/static/images/no_avatar_white.svg";
import TerritoryIcon from "@/public/static/images/territory.svg";
import TerritoryIconWhite from "@/public/static/images/territory_white.svg";
import AccountCircle from "@/public/static/images/account_circle.svg";
import AccountCircleWhite from "@/public/static/images/account_circle_white.svg";
import { ProfileItem } from '@/components/ProfileItem';
import { useRouter } from "next/navigation";
import { useCapacityDetails } from "@/hooks/useCapacityDetails";
import { useTerritories } from "@/hooks/useTerritories";
import { useLanguage } from "@/hooks/useLanguage";
import { useSession } from "next-auth/react";

interface ProfileCardProps {
  id: string;
  username: string;
  type: ProfileCapacityType;
  capacities: (number | string)[];
  languages?: string[];
  territory?: string;
  avatar?: string;
  pageContent?: Record<string, string>;
  isOrganization?: boolean;
}

export const ProfileCard = ({
  id,
  username,
  type = ProfileCapacityType.Learner,
  capacities = [],
  languages = [],
  territory,
  avatar,
  isOrganization = false
}: ProfileCardProps) => {
  const { darkMode } = useTheme();
  const { pageContent } = useApp();
  const router = useRouter();
  const { getCapacityName } = useCapacityDetails(capacities);
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { languages: availableLanguages } = useLanguage(token);
  const { territories: availableTerritories } = useTerritories(token);

  const capacitiesTitle =
    type === "learner"
      ? pageContent["body-profile-wanted-capacities-title"]
      : pageContent["body-profile-available-capacities-title"];
  const wantedCapacitiesIcon = darkMode ? TargetIconWhite : TargetIcon;
  const availableCapacitiesIcon = darkMode ? EmojiIconWhite : EmojiIcon;
  const capacitiesIcon =
    type === "learner" ? wantedCapacitiesIcon : availableCapacitiesIcon;
  const noAvatarIcon = darkMode ? NoAvatarIconWhite : NoAvatarIcon;

  const typeBadgeColorLightMode =
    type === "learner"
      ? "text-purple-800 border-purple-800"
      : "text-[#05A300] border-[#05A300]";

  const typeBadgeColorDarkMode =
    type === "learner"
      ? "text-purple-200 border-purple-200"
      : "text-[#05A300] border-[#05A300]";

  const formattedUsername = username.replace(' ', '_');

  return (
    <div
      className={`w-full rounded-lg border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-5">
        {/* Desktop Grid  - 2 Columns*/}
        <div
          role="article"
          className="md:grid md:grid-cols-[350px_1fr] md:gap-8"
        >
          {/*  Right Column - Profile Info */}
          <div>
            <div
              className={`rounded-lg p-4 ${
                darkMode ? "bg-capx-dark-box-bg" : "bg-[#EFEFEF]"
              }`}
            >
              {/* Type Badge */}
              <div className="flex justify-start mb-4">
                <span
                  className={`md:text-[18px] inline-flex px-2 py-1 text-xs font-normal rounded-full border ${
                    darkMode ? typeBadgeColorDarkMode : typeBadgeColorLightMode
                  }`}
                >
                  {type}
                </span>
              </div>

              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-[100px] h-[100px] md:w-[200px] md:h-[200px]">
                  <Image
                    priority
                    src={avatar || noAvatarIcon}
                    alt={pageContent["navbar-user-profile"]}
                    fill
                    className="object-cover rounded-[4px]"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="mt-4 mb-6 flex items-center justify-between">
              <h5
                className={`md:text-[32px] text-xl font-bold font-[Montserrat] ${
                  darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
                }`}
              >
                {username}
              </h5>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="mt-4 md:mt-0 flex flex-col gap-4">
            {/* Available or Wanted Capacities */}
            <ProfileItem
              icon={capacitiesIcon}
              title={capacitiesTitle}
              items={capacities}
              showEmptyDataText={false}
              getItemName={(id) => getCapacityName(id)}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal]`}
            />

            {/* Languages */}
            <ProfileItem
              icon={darkMode ? LanguageIconWhite : LanguageIcon}
              title={pageContent["body-profile-languages-title"]}
              items={languages}
              showEmptyDataText={false}
              getItemName={(id) => availableLanguages[id]}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal]`}
            />

            {/* Territory */}
            <ProfileItem
              icon={darkMode ? TerritoryIconWhite : TerritoryIcon}
              title={pageContent["body-profile-section-title-territory"]}
              items={territory ? [territory] : []}
              getItemName={(id) => availableTerritories[id]}
              customClass={`font-[Montserrat] text-[14px] not-italic leading-[normal]`}
              showEmptyDataText={false}
            />

            <button
              className={`inline-flex p-2 rounded-full mr-auto ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={() => {
                const routePath = isOrganization ? `/organization_profile/${id}` : `/profile/${formattedUsername}`;
                router.push(routePath);
              }}
            >
              <Image
                src={darkMode ? AccountCircleWhite : AccountCircle}
                alt={pageContent["body-profile-languages-title"]}
                width={27}
                height={27}
                className="w-[27px] h-[27px] md:w-[42px] md:h-[42px]"
                sizes="(min-width: 768px) 42px, 27px"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
