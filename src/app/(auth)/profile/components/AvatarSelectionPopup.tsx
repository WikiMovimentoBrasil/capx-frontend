import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import CloseIcon from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import { useState } from "react";
import { useAvatars } from "@/hooks/useAvatars";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";

interface AvatarSelectionPopupProps {
  onClose: () => void;
  onSelect: (avatarId: number) => void;
  selectedAvatarId: number;
  onUpdate?: () => void;
}

export default function AvatarSelectionPopup({
  onClose,
  onSelect,
  selectedAvatarId,
  onUpdate,
}: AvatarSelectionPopupProps) {
  const { avatars, isLoading } = useAvatars();
  const { pageContent } = useApp();
  const [tempSelectedId, setTempSelectedId] = useState(selectedAvatarId);
  const { darkMode } = useTheme();

  const handleUpdate = async () => {
    onSelect(tempSelectedId);
    if (onUpdate) {
      onUpdate();
    }
    onClose();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <p>Loading avatars...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          darkMode ? "bg-[#053749] text-white" : "bg-white text-[#053749]"
        } z-50 rounded-lg shadow-xl h-[477px] w-[273px] flex flex-col`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className={`font-[Montserrat] text-[16px] font-bold`}>
            {pageContent["edit-profile-choose-an-option"]}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Image src={CloseIcon} alt="Close" width={24} height={24} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-2 gap-4">
            {avatars?.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setTempSelectedId(avatar.id)}
                className="flex justify-center"
              >
                <div
                  className={`w-[100px] h-[100px] border rounded-lg transition-colors ${
                    tempSelectedId === avatar.id
                      ? "border-2 border-[#851970]"
                      : "border border-black hover:border-[#851970]"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={avatar.avatar_url}
                      alt={`Avatar ${avatar.id}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-4">
            <BaseButton
              onClick={onClose}
              label={pageContent["auth-dialog-button-close"]}
              customClass={`flex-1 border ${
                darkMode
                  ? "border-white text-white"
                  : "border-[#053749] text-[#053749]"
              } rounded-md py-2 font-[Montserrat] text-[14px] font-bold`}
            />
            <BaseButton
              onClick={handleUpdate}
              label={pageContent["edit-profile-update"]}
              customClass="flex-1 bg-[#851970] text-white rounded-md py-2 font-[Montserrat] text-[14px] font-bold"
            />
          </div>
        </div>
      </div>
    </>
  );
}
