import { useEffect, useState } from "react";
import UserProfileImage from "./UserProfileImage";
import ProfileEditButton from "./UserProfileEditButton";
import ProfileViewSkeleton from "./UserProfileViewSkeleton";
import NoProfileView from "./NoUserProfileView";
import { UserProfileData } from "@/features/profile/types";

interface ProfileViewProps {
  darkMode: boolean;
  // TODO: Define userProfileData type
  userProfileData: UserProfileData | null | undefined;
  showEditButton: boolean;
  pageContent: Record<string, string>;
}

export default function UserProfileView({
  darkMode,
  userProfileData,
  showEditButton,
  pageContent,
}: ProfileViewProps) {
  const [wantedCapacities, setWantedCapacities] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [knownCapacities, setKnownCapacities] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [availableCapacities, setAvailableCapacities] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [socialMediaCount, setSocialMediaCount] = useState<string[]>([]);
  const [contactCount, setContactCount] = useState<string[]>([]);

  useEffect(() => {
    if (userProfileData) {
      // Process capacities
      setWantedCapacities(
        userProfileData.userData.skills_wanted.map(
          (code) =>
            userProfileData.skillData.find((skill) => skill.code === code) || {
              code,
              name: code,
            }
        )
      );
      setKnownCapacities(
        userProfileData.userData.skills_known.map(
          (code) =>
            userProfileData.skillData.find((skill) => skill.code === code) || {
              code,
              name: code,
            }
        )
      );
      setAvailableCapacities(
        userProfileData.userData.skills_available.map(
          (code) =>
            userProfileData.skillData.find((skill) => skill.code === code) || {
              code,
              name: code,
            }
        )
      );

      // Process contact info
      const contacts = userProfileData.userData.contact || [];
      setSocialMediaCount(
        contacts
          .filter((c) => c.display_name.includes("social_"))
          .map((c) => c.display_name)
      );
      setContactCount(
        contacts
          .filter((c) => !c.display_name.includes("social_"))
          .map((c) => c.display_name)
      );
    }
  }, [userProfileData]);

  if (!userProfileData) {
    return <ProfileViewSkeleton darkMode={darkMode} />;
  }

  if (!userProfileData.userData) {
    return <NoProfileView darkMode={darkMode} pageContent={pageContent} />;
  }

  return (
    <div className="w-full space-y-20 pt-10">
      {/* Header section */}
      <header className="space-y-8">
        <div className="flex items-center justify-between">
          <UserProfileImage
            darkMode={darkMode}
            imageUrl={userProfileData.userData.profile_image}
            name={userProfileData.userData.username}
          />
          {showEditButton && (
            <ProfileEditButton
              darkMode={darkMode}
              pageContent={pageContent}
              to="/profile/edit"
            >
              {pageContent["profile-edit-button"]}
            </ProfileEditButton>
          )}
        </div>
      </header>

      {/* TODO: Check old code to see what is missing */}
    </div>
  );
}
