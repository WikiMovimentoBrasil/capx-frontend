import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  username: string;
  profile_image?: string;
}

interface CapacityProfileUserPreviewProps {
  darkMode: boolean;
  userData: UserData;
}

export function CapacityProfileUserPreview({
  darkMode,
  userData,
}: CapacityProfileUserPreviewProps) {
  const [data, setData] = useState<UserData | undefined>(undefined);
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/c/cd/CapX-icon.svg";

  useEffect(() => {
    setData(userData);
  }, [userData]);

  if (!data) {
    return <SkeletonView darkMode={darkMode} />;
  }

  return (
    <div className="w-full h-full p-4 space-y-2">
      <Link href={`/profile/${data.id}`}>
        <Image
          src={data.profile_image || defaultImage}
          className={`${
            darkMode
              ? "hover:border-capx-light-bg"
              : "hover:border-capx-dark-bg"
          } rounded-full border-2 cursor-pointer hover:border-dotted`}
          alt={`${data.username}'s profile picture`}
          width={100}
          height={100}
        />
      </Link>
      <p className="text-xs text-center">{data.username}</p>
    </div>
  );
}

function SkeletonView({ darkMode }: { darkMode: boolean }) {
  const bgClass = darkMode ? "bg-capx-dark-bg" : "bg-capx-light-bg";

  return (
    <div className="w-full h-full rounded-full p-4 space-y-2 animate-pulse">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/c/cd/CapX-icon.svg"
        className="rounded-full"
        alt="CapX logo"
        width={100}
        height={100}
      />
      <div className="space-y-0.5">
        <div className={`${bgClass} w-full h-4 rounded-lg animate-pulse`} />
        <div className={`${bgClass} w-full h-4 rounded-lg animate-pulse`} />
      </div>
    </div>
  );
}
