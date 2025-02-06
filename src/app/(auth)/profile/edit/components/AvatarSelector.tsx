"use client";

import Image from "next/image";
import { Avatar } from "@/types/avatar";

interface AvatarSelectorProps {
  selectedAvatar: Avatar;
  setSelectedAvatar: (avatar: Avatar) => void;
  avatars: Avatar[];
  darkMode: boolean;
  onAvatarSelect: (avatar: Avatar | null) => void;
}

export default function AvatarSelector({
  selectedAvatar,
  setSelectedAvatar,
  avatars,
  darkMode,
  onAvatarSelect,
}: AvatarSelectorProps) {
  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    onAvatarSelect(avatar);
  };

  return (
    <div className="space-y-4">
      <h3
        className={`text-lg font-semibold ${
          darkMode ? "text-white" : "text-[#053749]"
        }`}
      >
        Avatar
      </h3>

      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleAvatarClick(avatar)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all
              ${
                selectedAvatar.id === avatar.id
                  ? `${
                      darkMode ? "border-white" : "border-[#053749]"
                    } scale-105`
                  : "border-transparent hover:scale-105"
              }`}
          >
            <Image
              src={avatar.avatar_url}
              alt={`Avatar ${avatar.id}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {selectedAvatar.avatar_url && (
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
            <Image
              src={selectedAvatar.avatar_url}
              alt="Avatar selecionado"
              fill
              className="object-cover"
            />
          </div>
          <span
            className={`text-sm ${darkMode ? "text-white" : "text-[#053749]"}`}
          >
            Avatar selecionado
          </span>
        </div>
      )}
    </div>
  );
}
