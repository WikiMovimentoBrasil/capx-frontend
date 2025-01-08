import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import NoAvatarIcon from "@/public/static/images/no_avatar.svg";
import Avatar1Icon from "@/public/static/images/capx_avatar_1.svg";
import Avatar3Icon from "@/public/static/images/capx_avatar_3.svg";
import Avatar4Icon from "@/public/static/images/capx_avatar_4.svg";
import CloseIcon from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import { useState } from "react";

interface AvatarSelectionPopupProps {
  onClose: () => void;
  onSelect: (avatarId: number) => void;
  selectedAvatarId: number;
}

export default function AvatarSelectionPopup({
  onClose,
  onSelect,
  selectedAvatarId,
}: AvatarSelectionPopupProps) {
  const avatars = [
    { id: 0, src: NoAvatarIcon, alt: "No avatar" },
    { id: 1, src: Avatar1Icon, alt: "Avatar 1" },
    { id: 3, src: Avatar3Icon, alt: "Avatar 3" },
    { id: 4, src: Avatar4Icon, alt: "Avatar 4" },
  ];

  const [tempSelectedId, setTempSelectedId] = useState(selectedAvatarId);

  const handleUpdate = () => {
    onSelect(tempSelectedId);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 w-[90%] max-w-[500px] rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#053749] font-[Montserrat] text-[16px] font-bold">
            Choose an option
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Image src={CloseIcon} alt="Close" width={24} height={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setTempSelectedId(avatar.id)}
              className="flex justify-center"
            >
              <div
                className={`w-[100px] h-[100px] border-2 rounded-lg transition-colors ${
                  tempSelectedId === avatar.id
                    ? "border-[#851970]"
                    : "border-transparent hover:border-[#851970]"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <BaseButton
            onClick={onClose}
            label="Close tab"
            customClass="flex-1 border border-[#053749] text-[#053749] rounded-md py-2 font-[Montserrat] text-[14px] font-bold"
          />
          <BaseButton
            onClick={handleUpdate}
            label="Update"
            customClass="flex-1 bg-[#851970] text-white rounded-md py-2 font-[Montserrat] text-[14px] font-bold"
          />
        </div>
      </div>
    </>
  );
}
