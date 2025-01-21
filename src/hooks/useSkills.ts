import { skillService } from "@/services/skillService";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Skill {
  id: number;
  name: string;
  skill_type: string[];
  skill_wikidata_item: string;
}

export function useSkills() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const fetchSkills = async () => {
    const response = await skillService.fetchSkills({
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response;
  };

  return { fetchSkills };
}
