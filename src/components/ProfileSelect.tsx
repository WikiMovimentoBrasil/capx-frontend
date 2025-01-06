import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseSelect from "./BaseSelect";

interface ProfileOption {
  value: string;
  label: string;
  path: string;
}

const profileOptions: ProfileOption[] = [
  { value: "user", label: "User Profile", path: "/profile" },
  {
    value: "organization",
    label: "Organization Profile",
    path: "/organization_profile",
  },
];

export default function ProfileSelect() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string>("user");

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
      className="w-[200px] text-[20px]"
    />
  );
}
