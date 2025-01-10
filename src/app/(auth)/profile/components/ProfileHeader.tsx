import Image from "next/image";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/BaseButton";
import EditIcon from "@/public/static/images/edit.svg";
import EditIconWhite from "@/public/static/images/edit_white.svg";
import UserCircleIcon from "@/public/static/images/supervised_user_circle.svg";
import UserCircleIconWhite from "@/public/static/images/supervised_user_circle_white.svg";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import AvatarIcon from "@/public/static/images/avatar.svg";

interface ProfileHeaderProps {
  username?: string;
  profileImage?: string;
}

export default function ProfileHeader({
  username,
  profileImage,
}: ProfileHeaderProps) {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { isMobile } = useApp();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative w-[100px] h-[100px]">
          <Image
            src={profileImage || AvatarIcon}
            alt="User profile"
            fill
            className="object-cover"
          />
        </div>
        <h1
          className={` text-[24px] font-[Montserrat] font-normal ${
            darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
          }`}
        >
          Welcome!
        </h1>
        <div className="flex items-center gap-2">
          <Image
            src={darkMode ? UserCircleIconWhite : UserCircleIcon}
            alt="User profile"
            width={20}
            height={20}
          />
          <span
            className={`text-[20px] font-[Montserrat] font-bold ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {username || "Loading..."}
          </span>
        </div>
        <BaseButton
          onClick={() => router.push("/profile/edit")}
          label="Edit user profile"
          customClass={`w-full font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] inline-flex px-[13px] py-[6px] pb-[6px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid]  ${
            darkMode
              ? "text-capx-light-bg border-capx-light-bg"
              : "text-capx-dark-box-bg border-capx-dark-box-bg"
          }`}
          imageUrl={darkMode ? EditIconWhite : EditIcon}
          imageAlt="Edit icon"
          imageWidth={20}
          imageHeight={20}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-[96px] mb-[96px]">
      <div className="relative w-[250px] h-[250px]">
        <Image
          src={AvatarIcon}
          alt="User profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1
          className={` text-[48px] font-[Montserrat] font-normal ${
            darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
          }`}
        >
          Welcome!
        </h1>
        <div className="flex items-center gap-2">
          <Image
            src={darkMode ? UserCircleIconWhite : UserCircleIcon}
            alt="User profile"
            width={42}
            height={42}
          />
          <span
            className={`text-[24px] font-[Montserrat] font-bold ${
              darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
            }`}
          >
            {username || "Loading..."}
          </span>
        </div>
        <BaseButton
          onClick={() => router.push("/profile/edit")}
          label="Edit user profile"
          customClass={`w-full font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] inline-flex px-[13px] py-[6px] pb-[6px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid]  ${
            darkMode
              ? "text-capx-light-bg border-capx-light-bg"
              : "text-capx-dark-box-bg border-capx-dark-box-bg"
          }`}
          imageUrl={darkMode ? EditIconWhite : EditIcon}
          imageAlt="Edit icon"
          imageWidth={42}
          imageHeight={42}
        />
      </div>
    </div>
  );
}
