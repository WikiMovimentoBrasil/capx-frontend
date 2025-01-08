import { useState, useEffect } from "react";
import axios from "axios";
import { Profile } from "@/types/profile";

export function useProfile(token: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const profiles = Array.isArray(response.data) ? response.data : [];

        // Filter profiles with display_name
        const profilesWithDisplayName = profiles.filter(
          (p) => p.display_name && p.display_name.trim() !== ""
        );

        // If filtered profiles, use the first one
        // If not, use the first profile from the array
        setProfile(profilesWithDisplayName[0] || profiles[0] || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [token]);

  return { profile, isLoading, error };
}
