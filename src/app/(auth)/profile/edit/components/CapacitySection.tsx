"use client";

import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import NeurologyIconWhite from "@/public/static/images/neurology_white.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIcon from "@/public/static/images/target.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import AddIcon from "@/public/static/images/add.svg";
import AddIconDark from "@/public/static/images/add_dark.svg";
import CloseIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import { Profile } from "@/types/profile";
import { Capacity } from "@/types/capacity";
import { useCapacityDetails } from "@/hooks/useCapacityDetails";

interface CapacitySectionProps {
  formData: Partial<Profile>;
  onFieldChange: (field: keyof Profile, value: any) => void;
  skills: Capacity[];
  darkMode: boolean;
  handleAddCapacity: (type: string) => void;
  handleRemoveCapacity: (type: string, index: number) => void;
}

const capacityTypes = [
  {
    type: "known",
    title: "Known capacities",
    icon: { light: NeurologyIcon, dark: NeurologyIconWhite },
    field: "skills_known",
    description:
      "Select skills you already have from the Capacity Directory. Try to choose the most specific ones.",
  },
  {
    type: "available",
    title: "Available capacities",
    icon: { light: EmojiIcon, dark: EmojiIconWhite },
    field: "skills_available",
    description:
      "From your known capacities, choose those you are available to share.",
  },
  {
    type: "wanted",
    title: "Wanted capacities",
    icon: { light: TargetIcon, dark: TargetIconWhite },
    field: "skills_wanted",
    description:
      "Select skills you are willing to learn from the Capacity Directory. Try to choose the most specific ones.",
  },
];

export default function CapacitySection({
  formData,
  darkMode,
  handleAddCapacity,
  handleRemoveCapacity,
}: CapacitySectionProps) {
  const capacityIds = [
    ...(formData.skills_known || []),
    ...(formData.skills_available || []),
    ...(formData.skills_wanted || []),
  ];

  const { getCapacityName } = useCapacityDetails(capacityIds);
  return (
    <div className="flex flex-col gap-8">
      {capacityTypes.map((capacityType) => (
        <div key={capacityType.type} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={darkMode ? capacityType.icon.dark : capacityType.icon.light}
              alt={`${capacityType.title} icon`}
              width={20}
              height={20}
            />
            <h2
              className={`font-[Montserrat] text-[14px] font-bold ${
                darkMode ? "text-white" : "text-[#053749]"
              }`}
            >
              {capacityType.title}
            </h2>
          </div>

          <div
            className={`flex flex-wrap gap-2 rounded-[4px] ${
              darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
            } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
          >
            {(
              (formData[capacityType.field as keyof Profile] as number[]) || []
            ).map((capacity: number, index: number) => (
              <div key={index} className="flex items-center gap-1 rounded-md">
                <BaseButton
                  onClick={() => handleRemoveCapacity(capacityType.type, index)}
                  label={getCapacityName(capacity)}
                  customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                  imageUrl={CloseIcon}
                  imageAlt="Close icon"
                  imageWidth={16}
                  imageHeight={16}
                />
              </div>
            ))}
          </div>

          <BaseButton
            onClick={() => handleAddCapacity(capacityType.type)}
            label="Add capacities"
            customClass={`w-full flex ${
              darkMode
                ? "bg-capx-light-box-bg text-[#04222F]"
                : "bg-[#053749] text-white"
            } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
            imageUrl={darkMode ? AddIconDark : AddIcon}
            imageAlt="Add capacity"
            imageWidth={20}
            imageHeight={20}
          />

          <span
            className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            {capacityType.description}
          </span>
        </div>
      ))}
    </div>
  );
}
