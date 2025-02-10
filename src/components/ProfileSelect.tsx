import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseSelect from "./BaseSelect";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { useOrganization } from "@/hooks/useOrganizationProfile";
import { useSession } from "next-auth/react";
import { constants } from "node:buffer";

interface ProfileOption {
  value: string;
  label: string;
  path: string;
}

export default function ProfileSelect() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string>("user");
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const { data: session } = useSession();

  const { organization, isOrgManager } = useOrganization(session?.user?.token);

  console.log("isOrgManager", isOrgManager);
  console.log(" session?.user?.id", session?.user?.id);
  console.log(" organization?.managers", organization?.managers);
  console.log("organization", organization);

  const profileOptions: ProfileOption[] = [
    { value: "user", label: "User Profile", path: "/profile" },
    ...(isOrgManager
      ? [
          {
            value: "organization",
            label: "Org. Profile",
            path: "/organization_profile",
          },
        ]
      : []),
  ];

  const handleProfileChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedProfile(selectedOption.value);
    const selectedPath = profileOptions.find(
      (option) => option.value === selectedOption.value
    )?.path;
    if (selectedPath) {
      router.push(selectedPath);
    }
  };

  return (
    <BaseSelect
      defaultValue={{
        value: "My Profile",
        label: "My Profile",
      }}
      onChange={handleProfileChange}
      options={profileOptions}
      name="My profiles"
      className="w-[200px] text-[20px] w-max"
      darkMode={darkMode}
      isMobile={isMobile}
    />
  );
}
