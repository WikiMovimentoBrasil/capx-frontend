import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TagProfileUserPreview({ darkMode, userData }) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setData(userData)
  }, [userData]);

  if (data === undefined) {
    return (
      <div className="w-full h-full rounded-full p-4 space-y-2 animate-pulse">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/White_square_50%25_transparency.svg/240px-White_square_50%25_transparency.svg.png" className="rounded-full border-2"  alt="white image"/>
        <div className="space-y-0.5">
          <div className={(darkMode ? "bg-capx-dark-bg " : "bg-capx-light-bg ") + "w-full h-4 rounded-lg animate-pulse"}></div>
          <div className={(darkMode ? "bg-capx-dark-bg " : "bg-capx-light-bg ") + "w-full h-4 rounded-lg animate-pulse"}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4 space-y-2">
      <Link href={"/profile/" + data.id}>
        <Image src={data.profile_image} className={(darkMode ? "hover:border-capx-light-bg " : "hover:border-capx-dark-bg ") + "rounded-full cursor-pointer hover:border-dotted"} alt="UserProfilePicture"/>
      </Link>
      <p className="text-xs text-center">{data.username}</p>
    </div>
  )
}