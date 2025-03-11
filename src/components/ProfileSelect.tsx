import { useMemo, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import BaseSelect from "./BaseSelect";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { useOrganization } from "@/hooks/useOrganizationProfile";
import { useSession } from "next-auth/react";

interface ProfileOption {
  value: string;
  label: string;
  path: string;
}

export default function ProfileSelect() {
  const router = useRouter();
  const params = useParams();
  const organizationId = params?.id;
  const { darkMode } = useTheme();
  const { isMobile, pageContent } = useApp();
  const { data: session } = useSession();
  const pathname = usePathname();

  const { organizations } = useOrganization(session?.user?.token);

  const profileOptions: ProfileOption[] = useMemo(
    () => [
      {
        value: "user",
        label: pageContent["navbar-user-profile"] || "User Profile",
        path: "/profile",
      },
      ...(organizations.length > 0
        ? organizations.map((org) => ({
            value: `org-${org.id}`,
            label: org.display_name || "Organization",
            path: `/organization_profile/${org.id}`,
          }))
        : []),
    ],
    [organizations, pageContent]
  );

  const handleProfileChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    const selectedPath = profileOptions.find(
      (option) => option.value === selectedOption.value
    )?.path;
    if (selectedPath) {
      router.push(selectedPath);
    }
  };

  // Define the initial value based on the current route
  const currentValue = useMemo(() => {
    if (organizationId && organizations) {
      return organizations.find((org) => org.id === Number(organizationId));
    }

    if (pathname.includes("/profile")) {
      return profileOptions[0]; // User profile option
    }

    return profileOptions[0]; // Default to user profile
  }, [organizationId, pathname, profileOptions]);

  return (
    <BaseSelect
      value={currentValue}
      onChange={handleProfileChange}
      options={profileOptions}
      name={pageContent["navbar-link-profiles"]}
      className="w-[200px] text-[20px] w-max"
      darkMode={darkMode}
      isMobile={isMobile}
      placeholder={currentValue?.label}
    />
  );
}
