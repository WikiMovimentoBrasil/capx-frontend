import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/user";
import { userService } from "@/services/userService";

export function useUserProfile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  return { userProfile, isLoading };
}
