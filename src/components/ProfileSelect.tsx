import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseSelect from "./BaseSelect";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";

interface ProfileOption {
  value: string;
  label: string;
  path: string;
}


export default function ProfileSelect() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string>("user");
  const { darkMode } = useTheme();
  const { isMobile, pageContent } = useApp();

  const profileOptions: ProfileOption[] = [
    { value: "user", label: pageContent["navbar-user-profile"], path: "/profile" },
    {
      value: "organization",
      label: pageContent["navbar-org-profile"],
      path: "/organization_profile",
    },
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
        value: pageContent["body-loggedin-home-main-section-button02"],
        label: pageContent["body-loggedin-home-main-section-button02"],
      }}
      onChange={handleProfileChange}
      options={profileOptions}
      name={pageContent["navbar-link-profiles"]}
      className="w-[200px] text-[20px] w-max"
      darkMode={darkMode}
      isMobile={isMobile}
    />
  );
}
