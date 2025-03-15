import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/user";
import { UserFilters, userService } from "@/services/userService";
import { ProfileCapacityType } from "@/app/(auth)/feed/types";
import { FilterState } from "@/app/(auth)/feed/page";

export function useUserProfile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.id && session?.user?.token) {
        try {
          const data = await userService.fetchUserProfile(
            session.user.id,
            session.user.token
          );
          setUserProfile(data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  return { userProfile, isLoading, error };
}

export function useUserByUsername(
  search?: string,
  limit?: number,
  offset?: number
) {
  const { data: session } = useSession();
  const [userByUsername, setUserByUsername] = useState<UserProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (session?.user?.id && session?.user?.token) {
        try {
          const data = await userService.fetchAllUsers(
            session.user.token,
            search,
            limit,
            offset,
            {}
          );
          // return only one user
          setUserByUsername(data.results[0]);
        } catch (error) {
          console.error("Error fetching user by user name:", error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllUsers();
  }, [session]);

  return { userByUsername, isLoading, error };
}

export function useAllUsers(limit?: number, offset?: number, activeFilters?: FilterState) {
  const { data: session } = useSession();
  const [allUsers, setAllUsers] = useState<UserProfile[] | null>(null);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!session?.user?.token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const filters: UserFilters = {
          limit,
          offset,
          ...(activeFilters?.capacities?.length && {
            available_capacities: activeFilters.profileCapacityTypes.includes(ProfileCapacityType.Sharer) 
              ? activeFilters.capacities 
              : undefined,
            wanted_capacities: activeFilters.profileCapacityTypes.includes(ProfileCapacityType.Learner) 
              ? activeFilters.capacities 
              : undefined,
          }),
          ...(activeFilters?.territories?.length && {
            territory: activeFilters.territories
          }),
          ...(activeFilters?.languages?.length && {
            language: activeFilters.languages
          }),
          has_skills_available: activeFilters?.profileCapacityTypes.includes(ProfileCapacityType.Sharer) ?? undefined,
          has_skills_wanted: activeFilters?.profileCapacityTypes.includes(ProfileCapacityType.Learner) ?? undefined,
        };

        const data = await userService.fetchAllUsers(session.user.token, "", limit, offset, filters);
        setAllUsers(data.results);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching user by user name:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, [session?.user?.token, limit, offset,
    JSON.stringify(activeFilters?.capacities),
    JSON.stringify(activeFilters?.territories),
    JSON.stringify(activeFilters?.profileCapacityTypes),
    JSON.stringify(activeFilters?.languages)
  ]);

  return { allUsers, isLoading, error, count };
}
