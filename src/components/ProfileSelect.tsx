import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseSelect from "./BaseSelect";
import { useTheme } from "@/providers/ThemeProvider";
import { useApp } from "@/providers/AppProvider";

interface ProfileOption {
  value: string;
  label: string;
  path: string;
}

const profileOptions: ProfileOption[] = [
  { value: "user", label: "User Profile", path: "/profile" },
  {
    value: "organization",
    label: "Org. Profile",
    path: "/organization_profile",
  },
];

export default function ProfileSelect() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string>("user");
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
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
