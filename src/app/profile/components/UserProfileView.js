import Link from "next/link";
import { useEffect, useState } from "react";
import UserProfileImage from "./UserProfileImage";
import UserProfileEditButton from "./UserProfileEditButton";
import UserProfileViewSkeleton from "./UserProfileViewSkeleton";
import UserProfileViewBox from "./UserProfileViewBox";

export default function UserProfileView({ darkMode, userProfileData, showEditButton }) {
  const [wantedCapacities, setWantedCapacities] = useState(undefined);
  const [knownCapacities, setKnownCapacities] = useState(undefined);
  const [availableCapacities, setAvailableCapacities] = useState(undefined);
  const [socialMediaCount, setSocialMediaCount] = useState(undefined);
  const [contactCount, setContactCount] = useState(undefined);

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
      setSocialMediaCount(userProfileData.userData.social.filter((item) => (item.display_name !== "" || item.value !== "")));
      setContactCount(userProfileData.userData.contact.filter((item) => (item.display_name !== "" || item.value !== "")));
    }
  }, [userProfileData]);

  if (userProfileData === undefined) {
    return (
      <UserProfileViewSkeleton darkMode={darkMode} />
    )
  }

  return (
    <section className={"grid grid-cols-1 sm:grid-cols-1 w-10/12 sm:w-8/12 h-fit text-xl mx-auto text-center py-36 space-y-20"}>
      <div className="w-full sm:w-8/12 mx-auto space-y-14">
        {/* Profile Image & Edit Profile Button */}
        <div className="relative w-fit mx-auto">
          <UserProfileImage darkMode={darkMode} imageUrl={userProfileData.userData.profile_image} />
        </div>
      </div>
    </section>
  )
}