import Link from "next/link";
import { useEffect, useState } from "react";

export default function CapacityUserPreview({ darkMode, userId, fetchUserData }) {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    fetchUserData(userId, setUserData);
  }, []);

  return (
    <div className="w-full h-full p-4 space-y-2">
      <Link href={"/profile/" + userId}>
        <img src={userData.profile_image} className="rounded-full border-2 cursor-pointer" />
      </Link>
      <p className="text-xs text-center">{userData.display_name}</p>
    </div>
  )
}