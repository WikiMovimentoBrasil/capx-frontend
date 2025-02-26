import { useState, useMemo } from "react";
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

  const { organizations, isOrgManager } = useOrganization(session?.user?.token);

  // Encontra a organização atual se estivermos em uma página de organização
  const currentOrganization = useMemo(() => {
    if (organizationId && organizations) {
      return organizations.find(org => org.id === Number(organizationId));
    }
    return null;
  }, [organizationId, organizations]);

  const profileOptions: ProfileOption[] = [
    { 
      value: "user", 
      label: pageContent["navbar-user-profile"] || "User Profile", 
      path: "/profile" 
    },
    ...(isOrgManager
      ? organizations.map(org => ({
          value: `org-${org.id}`,
          label: org.display_name || "Organization",
          path: `/organization_profile/${org.id}`
        }))
      : []),
  ];

  const handleProfileChange = (selectedOption: { value: string; label: string }) => {
    const selectedPath = profileOptions.find(
      (option) => option.value === selectedOption.value
    )?.path;
    if (selectedPath) {
      router.push(selectedPath);
    }
  };

  // Define o valor inicial baseado na rota atual
  const currentValue = useMemo(() => {
    if (currentOrganization) {
      return {
        value: `org-${currentOrganization.id}`,
        label: currentOrganization.display_name || "Organization",
      };
    }
    
    if (pathname.includes('/profile')) {
      return profileOptions[0]; // User profile option
    }
    
    return profileOptions[0]; // Default to user profile
  }, [currentOrganization, pathname, profileOptions]);

  return (
    <BaseSelect
      value={currentValue}
      onChange={handleProfileChange}
      options={profileOptions}
      name={pageContent["navbar-link-profiles"]}
      className="w-[200px] text-[20px] w-max"
      darkMode={darkMode}
      isMobile={isMobile}
      placeholder={currentValue.label}
    />
  );
}
