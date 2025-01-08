import Image from "next/image";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/BaseButton";
import EditIcon from "@/public/static/images/edit.svg";
import UserCircleIcon from "@/public/static/images/supervised_user_circle.svg";

interface ProfileHeaderProps {
  username?: string;
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[#003649] text-[24px] font-[Montserrat] font-normal">
        Welcome!
      </h1>
      <div className="flex items-center gap-2">
        <Image src={UserCircleIcon} alt="User profile" width={32} height={32} />
        <span className="text-[#003649] text-[20px] font-[Montserrat] font-bold">
          {username || "Loading..."}
        </span>
      </div>
      <BaseButton
        onClick={() => router.push("/profile/edit")}
        label="Edit user profile"
        customClass={`w-full font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] inline-flex px-[13px] py-[6px] pb-[6px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid] border-capx-dark-box-bg text-capx-light-text`}
        imageUrl={EditIcon}
        imageAlt="Edit icon"
        imageWidth={20}
        imageHeight={20}
      />
    </div>
  );
}
