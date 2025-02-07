"use client";

import Image from "next/image";
import { useState } from "react";
import BaseButton from "@/components/BaseButton";
import AvatarSelectionPopup from "../../components/AvatarSelectionPopup";
import AccountBoxIconWhite from "@/public/static/images/account_box_white.svg";
import AccountBoxIcon from "@/public/static/images/account_box.svg";
import ChangeCircleIconWhite from "@/public/static/images/change_circle_white.svg";
import ChangeCircleIcon from "@/public/static/images/change_circle.svg";
import NoAvatarIcon from "@/public/static/images/no_avatar.svg";

interface AvatarSelectorProps {
  selectedAvatar: { id: number; avatar_url: string };
  setSelectedAvatar: (avatar: { id: number; avatar_url: string }) => void;
  avatars: Array<{ id: number; avatar_url: string }>;
  darkMode: boolean;
  isMobile: boolean;
  onAvatarSelect: (avatarId: number) => void;
}

export default function AvatarSelector({
  selectedAvatar,
  setSelectedAvatar,
  avatars,
  darkMode,
  isMobile,
  onAvatarSelect,
}: AvatarSelectorProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative w-[20px] h-[20px]">
          <Image
            src={darkMode ? AccountBoxIconWhite : AccountBoxIcon}
            alt="Account box icon"
            fill
            objectFit="contain"
          />
        </div>
        <h2
          className={`${
            darkMode ? "text-white" : "text-[#053749]"
          } font-[Montserrat] text-[${isMobile ? "16px" : "24px"}] font-bold`}
        >
          Image profile
        </h2>
      </div>

      <div className={`bg-gray-100 ${isMobile ? "p-4" : "p-6"} rounded-lg`}>
        <div
          className={`${
            isMobile ? "w-32 h-32" : "w-48 h-48"
          } mx-auto mb-4 relative`}
        >
          <Image
            src={selectedAvatar.avatar_url || NoAvatarIcon}
            alt="Selected avatar"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <BaseButton
        onClick={(e) => setShowPopup(true)}
        label="Choose avatar"
        customClass={`w-full flex px-[13px] py-[6px] pb-[6px] items-center rounded-[4px] ${
          darkMode
            ? "bg-capx-light-bg text-[#053749]"
            : "bg-[#053749] text-[#F6F6F6]"
        } font-[Montserrat] text-[${
          isMobile ? "12px" : "14px"
        }] not-italic font-extrabold leading-[normal] mb-0`}
        imageUrl={darkMode ? ChangeCircleIconWhite : ChangeCircleIcon}
        imageAlt="Change circle icon"
        imageWidth={isMobile ? 20 : 24}
        imageHeight={isMobile ? 20 : 24}
      />

      {showPopup && (
        <AvatarSelectionPopup
          onClose={() => setShowPopup(false)}
          onSelect={(avatarId) => {
            onAvatarSelect(avatarId);
            setShowPopup(false);
          }}
          selectedAvatarId={selectedAvatar.id}
          avatars={avatars}
        />
      )}
    </div>
  );
}
