"use client";

import Image from "next/image";
import { useState } from "react";
import BaseButton from "@/components/BaseButton";
import AvatarSelectionPopup from "../../components/AvatarSelectionPopup";
import AccountBoxIconWhite from "@/public/static/images/account_box_white.svg";
import AccountBoxIcon from "@/public/static/images/account_box.svg";
import AccountCircleIconWhite from "@/public/static/images/account_circle_white.svg";
import AccountCircleIcon from "@/public/static/images/account_circle.svg";
import ChangeCircleIconWhite from "@/public/static/images/change_circle_white.svg";
import ChangeCircleIcon from "@/public/static/images/change_circle.svg";
import CheckBoxFilledIconWhite from "@/public/static/images/check_box_light.svg";
import CheckBoxFilledIcon from "@/public/static/images/check_box.svg";
import CheckIconWhite from "@/public/static/images/check_box_outline_blank_light.svg";
import CheckIcon from "@/public/static/images/check_box_outline_blank.svg";
import UploadIcon from "@/public/static/images/upload.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import CancelIcon from "@/public/static/images/cancel.svg";

interface ImageProfileSectionProps {
  selectedAvatar: { id: number; avatar_url: string };
  setSelectedAvatar: (avatar: { id: number; avatar_url: string }) => void;
  onSave: (e: React.FormEvent) => Promise<void>;
  avatars: Array<{ id: number; avatar_url: string }>;
  darkMode: boolean;
  isMobile: boolean;
  isWikidataSelected: boolean;
  onWikidataClick: () => void;
  isSubmitting: boolean;
  handleFieldChange: (field: string, value: any) => void;
  username: string;
  onCancel: () => void;
  refetch: () => Promise<void>;
}

export default function ImageProfileSection({
  selectedAvatar,
  setSelectedAvatar,
  avatars,
  darkMode,
  isMobile,
  isWikidataSelected,
  onWikidataClick,
  isSubmitting,
  handleFieldChange,
  username,
  onSave,
  onCancel,
  refetch,
}: ImageProfileSectionProps) {
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const handleAvatarSelect = (avatarId: number) => {
    const avatar = avatars.find((avatar) => avatar.id === avatarId);
    if (avatar) {
      setSelectedAvatar(avatar);
      handleFieldChange("avatar", avatar);
      handleFieldChange("profile_image", "");
      handleFieldChange("wikidata_qid", "");
      setShowAvatarPopup(false);
    }
  };

  if (isMobile)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1
            className={`font-[Montserrat] text-[16px] not-italic font-normal leading-[29px] ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            Welcome!
          </h1>
          <div className="flex items-center gap-[6px]">
            <div className="relative w-[24px] h-[24px]">
              <Image
                src={darkMode ? AccountCircleIconWhite : AccountCircleIcon}
                alt="User circle icon"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              className={`text-start ${
                darkMode ? "text-white" : "text-[#053749]"
              } font-[Montserrat] text-[20px] font-extrabold`}
            >
              {username}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-1 items-center">
            <div className="relative w-[20px] h-[20px]">
              <Image
                src={darkMode ? AccountBoxIconWhite : AccountBoxIcon}
                alt="Account box icon"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <h2
              className={`${
                darkMode ? "text-white" : "text-[#053749]"
              } font-[Montserrat] text-[16px] font-bold`}
            >
              Image profile
            </h2>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <Image
                src={selectedAvatar.avatar_url}
                alt="Selected avatar"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <BaseButton
            onClick={() => setShowAvatarPopup(true)}
            label="Choose avatar"
            customClass={`w-full flex px-[13px] py-[6px] pb-[6px] items-center rounded-[4px] ${
              darkMode
                ? "bg-capx-light-bg text-[#053749]"
                : "bg-[#053749] text-[#F6F6F6]"
            } font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0`}
            imageUrl={darkMode ? ChangeCircleIconWhite : ChangeCircleIcon}
            imageAlt="Change circle icon"
            imageWidth={20}
            imageHeight={20}
          />

          {showAvatarPopup && (
            <AvatarSelectionPopup
              onClose={() => setShowAvatarPopup(false)}
              onSelect={handleAvatarSelect}
              selectedAvatarId={selectedAvatar.id}
              onUpdate={refetch}
              avatars={avatars}
            />
          )}

          <div className="flex flex-col items-center gap-0">
            <BaseButton
              onClick={onWikidataClick}
              label="Use Wikidata item"
              customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-0 pb-[6px] ${
                darkMode
                  ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                  : "border-[#053749] text-[#829BA4]"
              } border`}
              imageUrl={
                isWikidataSelected
                  ? darkMode
                    ? CheckBoxFilledIconWhite
                    : CheckBoxFilledIcon
                  : darkMode
                  ? CheckIconWhite
                  : CheckIcon
              }
              imageAlt="Check icon"
              imageWidth={20}
              imageHeight={20}
            />
            <span
              className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                darkMode ? "text-white" : "text-[#053749]"
              }`}
            >
              I consent displaying my Wikidata item image on CapX profile (if
              existent).
            </span>
          </div>

          <div className="flex flex-col gap-[10px] mt-2">
            <BaseButton
              onClick={onSave}
              label="Save profile"
              customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold !mb-0"
              imageUrl={UploadIcon}
              imageAlt="Upload icon"
              imageWidth={20}
              imageHeight={20}
            />
            <BaseButton
              onClick={onCancel}
              label="Cancel edit"
              customClass={`w-full flex items-center px-[13px] py-[6px] pb-[6px] border rounded-md py-3 font-bold mb-0 ${
                darkMode
                  ? "bg-transparent text-[#F6F6F6] border-[#F6F6F6] border-[2px]"
                  : "bg-[#F6F6F6] border-[#053749] text-[#053749]"
              }`}
              imageUrl={darkMode ? CancelIconWhite : CancelIcon}
              imageAlt="Cancel icon"
              imageWidth={20}
              imageHeight={20}
            />
          </div>
        </div>
      </div>
    );

  // Desktop version
  return (
    <div className="flex flex-row gap-12">
      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex flex-row gap-1 items-center">
          <div className="relative w-[20px] h-[20px]">
            <Image
              src={darkMode ? AccountBoxIconWhite : AccountBoxIcon}
              alt="Account box icon"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <h2
            className={`${
              darkMode ? "text-white" : "text-[#053749]"
            } font-[Montserrat] text-[16px] font-bold`}
          >
            Image profile
          </h2>
        </div>

        <div className="flex bg-gray-100 p-4 rounded-lg h-full items-center justify-center">
          <div className="w-48 h-48 mx-auto mb-4 relative flex items-center justify-center">
            <Image
              src={selectedAvatar.avatar_url}
              alt="Selected avatar"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex flex-col gap-2">
          <h1
            className={`font-[Montserrat] text-[24px] not-italic font-normal leading-[29px] ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            Welcome!
          </h1>
          <div className="flex items-start gap-[6px]">
            <div className="relative w-[24px] h-[24px]">
              <Image
                src={darkMode ? AccountCircleIconWhite : AccountCircleIcon}
                alt="User circle icon"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              className={`text-start ${
                darkMode ? "text-white" : "text-[#053749]"
              } font-[Montserrat] text-[20px] font-extrabold`}
            >
              {username}
            </span>
          </div>
        </div>

        <BaseButton
          onClick={() => setShowAvatarPopup(true)}
          label="Choose avatar"
          customClass={`w-full flex px-[13px] py-[6px] pb-[6px] items-center rounded-[4px] ${
            darkMode
              ? "bg-capx-light-bg text-[#053749]"
              : "bg-[#053749] text-[#F6F6F6]"
          } font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0`}
          imageUrl={darkMode ? ChangeCircleIconWhite : ChangeCircleIcon}
          imageAlt="Change circle icon"
          imageWidth={20}
          imageHeight={20}
        />

        {showAvatarPopup && (
          <AvatarSelectionPopup
            onClose={() => setShowAvatarPopup(false)}
            onSelect={handleAvatarSelect}
            selectedAvatarId={selectedAvatar.id}
            onUpdate={refetch}
            avatars={avatars}
          />
        )}

        <div className="flex flex-col items-start gap-6">
          <BaseButton
            onClick={onWikidataClick}
            label="Use Wikidata item"
            customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-0 pb-[6px] ${
              darkMode
                ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                : "border-[#053749] text-[#829BA4]"
            } border`}
            imageUrl={
              isWikidataSelected
                ? darkMode
                  ? CheckBoxFilledIconWhite
                  : CheckBoxFilledIcon
                : darkMode
                ? CheckIconWhite
                : CheckIcon
            }
            imageAlt="Check icon"
            imageWidth={20}
            imageHeight={20}
          />
          <span
            className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            I consent displaying my Wikidata item image on CapX profile (if
            existent).
          </span>
          <div className="flex flex-col gap-6 mt-0 w-full">
            <BaseButton
              onClick={onSave}
              label="Save profile"
              customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold mb-0"
              imageUrl={UploadIcon}
              imageAlt="Upload icon"
              imageWidth={20}
              imageHeight={20}
            />
            <BaseButton
              onClick={onCancel}
              label="Cancel edit"
              customClass={`w-full flex items-center px-[13px] py-[6px] pb-[6px] border border-[#053749] text-[#053749] rounded-md py-3 font-bold mb-0 ${
                darkMode
                  ? "bg-transparent text-[#F6F6F6] border-[#F6F6F6] border-[2px]"
                  : "bg-[#F6F6F6] border-[#053749] text-[#053749]"
              }`}
              imageUrl={darkMode ? CancelIconWhite : CancelIcon}
              imageAlt="Cancel icon"
              imageWidth={20}
              imageHeight={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
