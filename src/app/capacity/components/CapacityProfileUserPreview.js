import Link from "next/link";
import { useEffect, useState } from "react";

export default function CapacityProfileUserPreview({ darkMode, userId, fetchUserData }) {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    fetchUserData(userId, setUserData);
  }, []);

  if (userData === undefined) {
    return (
      <div className="w-full h-full rounded-full p-4 space-y-2 animate-pulse">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/White_square_50%25_transparency.svg/240px-White_square_50%25_transparency.svg.png" className="rounded-full border-2" />
        <div className="space-y-0.5">
          <div className={(darkMode ? "bg-capx-dark-bg " : "bg-capx-light-bg ") + "w-full h-4 rounded-lg animate-pulse"}></div>
          <div className={(darkMode ? "bg-capx-dark-bg " : "bg-capx-light-bg ") + "w-full h-4 rounded-lg animate-pulse"}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4 space-y-2">
      <Link href={"/profile/" + userId}>
        <img src={userData.profile_image} className={(darkMode ? "hover:border-capx-light-bg " : "hover:border-capx-dark-bg ") + "rounded-full border-2 cursor-pointer hover:border-dotted"} />
      </Link>
      <p className="text-xs text-center">{userData.display_name}</p>
    </div>
  )
}