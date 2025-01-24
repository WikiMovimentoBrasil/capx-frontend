"use client";

import { createContext, useContext, useState } from "react";
import type { Organization } from "@/types/organization";

const OrganizationContext = createContext<{
  organization: Organization | null;
  setOrganization: (org: Organization | null) => void;
}>({
  organization: null,
  setOrganization: () => {},
});

export function OrganizationProvider({ children }) {
  const [organization, setOrganization] = useState<Organization | null>(null);

  return (
    <OrganizationContext.Provider value={{ organization, setOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
}
