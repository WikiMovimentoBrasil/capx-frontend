import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useApp } from '@/contexts/AppContext';
import { ProfileType } from '../page';

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

interface ProfileCardProps {
  username: string;
  type: ProfileType;
  capacities?: string[];
  languages?: string[];
  territory?: string;
  avatar?: string;
  pageContent?: Record<string, string>;
}

export const ProfileCard = ({
  username,
  type = ProfileType.Learner,
  capacities = [],
  languages = [],
  territory = '',
  avatar,
}: ProfileCardProps) => {
  const { darkMode } = useTheme();
  const { pageContent } = useApp();

  const noDataMessage = pageContent["no-data-available"];
  const capacitiesTitle = type === 'learner' ? pageContent["body-profile-wanted-capacities-title"] : pageContent["body-profile-available-capacities-title"];
  const wantedCapacitiesIcon = darkMode ? TargetIconWhite : TargetIcon;
  const availableCapacitiesIcon = darkMode ? EmojiIconWhite : EmojiIcon;
  const capacitiesIcon = type === 'learner' ? wantedCapacitiesIcon : availableCapacitiesIcon;
  const noAvatarIcon = darkMode ? NoAvatarIconWhite : NoAvatarIcon;

  const typeBadgeColorLightMode = type === 'learner'
  ? "text-purple-800 border-purple-800"
  : "text-[#05A300] border-[#05A300]";

  const typeBadgeColorDarkMode = type === 'learner'
    ? "text-purple-200 border-purple-200"
    : "text-[#05A300] border-[#05A300]";

  
  // TODO: Implementar "...", limite de width para os itens, decidir qual o comportamento para abrir mais itens no click ou hover

  return (
    <div 
      className={`w-full max-w-sm rounded-lg border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
        <div className="p-5">
            {/* Background */}
            <div className={`rounded-lg p-4 ${darkMode ? 'bg-capx-dark-box-bg' : 'dark:bg-[#EFEFEF]'}`}>

                {/* Type Badge */}
                <div className="flex justify-start mb-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-normal rounded-full border ${
                        darkMode ? typeBadgeColorDarkMode : typeBadgeColorLightMode
                    }`}>
                        {type}
                    </span>
                </div>

                {/* Profile Image */}
                <div className="flex flex-col items-center mb-6">
                   <div className="relative w-[100px] h-[100px]">
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
        <h5 className={`text-xl font-bold font-[Montserrat] mt-4 mb-4 ${
            darkMode ? 'text-capx-light-bg' : 'text-capx-dark-box-bg'
        }`}>
            {username}
        </h5>
                
        {/* Available or Wanted Capacities */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative h-[20px] w-[20px]">
              <Image src={capacitiesIcon} alt={capacitiesTitle} className="object-contain" />
            </div>
            <span className={`font-medium font-[Montserrat] ${
              darkMode ? 'text-capx-light-bg' : 'text-capx-dark-box-bg'
            }`}>
              {capacitiesTitle}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {capacities.length > 0 ? (
              capacities.map((capacity, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-sm rounded font-[Montserrat] ${
                    darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {capacity}
                </span>
              ))
            ) : (
              <span className={`px-2 py-1 text-sm rounded font-[Montserrat] ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {noDataMessage}
              </span>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative h-[20px] w-[20px]">
              <Image
                  src={darkMode ? LanguageIconWhite : LanguageIcon}
                  alt={pageContent['body-profile-languages-title']}
                  width={20}
                  height={20}
                />
            </div>
            <span className={`font-medium font-[Montserrat] ${
              darkMode ? 'text-capx-light-bg' : 'text-capx-dark-box-bg'
            }`}>
              {pageContent["body-profile-languages-title"]}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.length > 0 ? (
              languages.map((language, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-sm rounded font-[Montserrat] ${
                    darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {language}
                </span>
              ))
            ) : (
              <span className={`px-2 py-1 text-sm rounded font-[Montserrat] ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {noDataMessage}
              </span>
            )}
          </div>
        </div>

        {/* Territory */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative h-[20px] w-[20px]">
              <Image
                  src={darkMode ? TerritoryIconWhite : TerritoryIcon}
                  alt={pageContent['body-profile-languages-title']}
                  width={20}
                  height={20}
                />
            </div>
            <span className={`font-medium font-[Montserrat] ${
              darkMode ? 'text-capx-light-bg' : 'text-capx-dark-box-bg'
            }`}>
              {pageContent["body-profile-section-title-territory"]}
            </span>
          </div>
          <span className={`inline-block px-2 py-1 text-sm rounded font-[Montserrat] ${
            darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}>
            {territory || noDataMessage}
          </span>
        </div>

        {/* TODO: Implement action */}
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Image
                src={darkMode ? AccountCircleWhite : AccountCircle}
                alt={pageContent['body-profile-languages-title']}
                width={27}
                height={27}
              />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
