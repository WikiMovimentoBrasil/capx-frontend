"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import CloseIcon from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import CloseIconWhite from "@/public/static/images/close_mobile_menu_icon_dark_mode.svg";

interface EditProfileHeaderProps {
  darkMode: boolean;
  isMobile: boolean;
}

export default function EditProfileHeader({
  darkMode,
  isMobile,
}: EditProfileHeaderProps) {
  const router = useRouter();

  return (
    <div
      className={`flex justify-between items-center w-full p-4 ${
        isMobile ? "mb-4" : "mb-8"
      }`}
    >
      <h1
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-[#053749]"
        }`}
      >
        Editar Perfil
      </h1>
      <button
        onClick={() => router.push("/profile")}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Fechar edição de perfil"
      >
        <Image
          src={darkMode ? CloseIconWhite : CloseIcon}
          alt="Fechar"
          width={24}
          height={24}
          className="transition-opacity hover:opacity-80"
        />
      </button>
    </div>
  );
}
