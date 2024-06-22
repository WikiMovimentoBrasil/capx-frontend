import Link from "next/link";
import { useEffect, useState } from "react";

export default function CapacityUserPreview({ userId, fetchUserData }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData(userId, setUserData);
  }, []);

  return (
    <div className="w-full h-full rounded-full p-4">
      <Link href={"/profile/" + userId}>
        <img src={userData.profile_image} className="rounded-full cursor-pointer" />
      </Link>
    </div>
  )
}