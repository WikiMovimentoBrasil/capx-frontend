import Link from "next/link";
import { useEffect, useState } from "react";
import UserProfileImage from "./UserProfileImage";
import UserProfileEditButton from "./UserProfileEditButton";
import UserProfileViewSkeleton from "./UserProfileViewSkeleton";

export default function UserProfileView({ darkMode, userProfileData, showEditButton }) {
  const [wantedCapacities, setWantedCapacities] = useState(undefined);
  const [knownCapacities, setKnownCapacities] = useState(undefined);
  const [availableCapacities, setAvailableCapacities] = useState(undefined);

  const pronouns = [
    { value: "he-him", label: "He/Him" },
    { value: "she-her", label: "She/Her" },
    { value: "they-them", label: "They/Them" },
    { value: "not-specified", label: "Not Specified" },
    { value: "other", label: "Other" }
  ]

  useEffect(() => {
    if (userProfileData?.skillData !== undefined && userProfileData?.userData !== undefined) {
      setWantedCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_wanted.includes(item.code))));
      setKnownCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_known.includes(item.code))));
      setAvailableCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_available.includes(item.code))));
    }
  }, [userProfileData]);

  if (userProfileData === undefined) {
    return (
      <UserProfileViewSkeleton darkMode={darkMode} />
    )
  }

  return (
    <section className={"w-10/12 sm:w-8/12 mx-auto py-36"}></section>
  )
}