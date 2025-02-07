"use client";

import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import AccountCircleIcon from "@/public/static/images/account_circle.svg";
import AccountCircleIconWhite from "@/public/static/images/account_circle_white.svg";
import CheckIcon from "@/public/static/images/check_box_outline_blank.svg";
import CheckIconWhite from "@/public/static/images/check_box_outline_blank_light.svg";
import UploadIcon from "@/public/static/images/upload.svg";
import CancelIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import ChangeCircleIconWhite from "@/public/static/images/change_circle_white.svg";

interface WikidataSectionProps {
  isWikidataSelected: boolean;
  onWikidataClick: () => void;
  darkMode: boolean;
  username: string;
  isSubmitting: boolean;
  onChooseAvatar: () => void;
  onSave: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

export default function WikidataSection({
  isWikidataSelected,
  onWikidataClick,
  darkMode,
  username,
  isSubmitting,
  onChooseAvatar,
  onSave,
  onCancel,
}: WikidataSectionProps) {
  return (
    <div className="flex flex-col gap-4 w-1/2">
      <div className="flex flex-col gap-2">
        <h1 className="font-[Montserrat] text-[24px] not-italic font-normal leading-[29px] text-white">
          Welcome!
        </h1>
        <div className="flex items-start gap-[6px]">
          <div className="relative w-[24px] h-[24px]">
            <Image
              src={darkMode ? AccountCircleIconWhite : AccountCircleIcon}
              alt="User circle icon"
              fill
              objectFit="contain"
            />
          </div>
          <span className="text-start text-white font-[Montserrat] text-[20px] font-extrabold">
            {username}
          </span>
        </div>
      </div>

      <BaseButton
        onClick={onChooseAvatar}
        label="Choose avatar"
        customClass="w-full flex px-[13px] py-[6px] pb-[6px] items-center rounded-[4px] bg-capx-light-bg text-[#053749] font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-4 pb-4 justify-between"
        imageUrl={ChangeCircleIconWhite}
        imageAlt="Change circle icon"
        imageWidth={20}
        imageHeight={20}
      />

      <div className="flex flex-col items-start gap-6">
        <BaseButton
          onClick={onWikidataClick}
          label="Use Wikidata item"
          customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-4 pb-4 ${
            darkMode
              ? "bg-transparent border-white text-white opacity-50"
              : "border-[#053749] text-[#053749]"
          } border`}
          imageUrl={darkMode ? CheckIconWhite : CheckIcon}
          imageAlt="Check icon"
          imageWidth={20}
          imageHeight={20}
        />

        <span className="text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] text-white">
          I consent displaying my Wikidata item image on CapX profile (if
          existent).
        </span>

        <div className="flex flex-col gap-6 mt-0 w-full">
          <BaseButton
            onClick={(e) => onSave(e)}
            disabled={isSubmitting}
            label="Save profile"
            customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold mb-4 pb-4 justify-between"
            imageUrl={UploadIcon}
            imageAlt="Upload icon"
            imageWidth={20}
            imageHeight={20}
          />

          <BaseButton
            onClick={onCancel}
            label="Cancel edit"
            customClass={`w-full flex items-center px-[13px] py-[6px] pb-[6px] border rounded-md py-3 font-bold mb-4 pb-4 justify-between bg-transparent ${
              darkMode
                ? "text-[#F6F6F6] border-[#F6F6F6] border-[2px]"
                : "border-[#053749] text-[#053749]"
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
}
