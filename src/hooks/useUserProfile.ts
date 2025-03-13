import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/user";
import { userService } from "@/services/userService";

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

export function useUserByUsername(search?: string, limit?: number, offset?: number) {
  const { data: session } = useSession();
  const [userByUsername, setUserByUsername] = useState<UserProfile | null>(null);
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
            offset
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

export function useAllUsers(limit?: number, offset?: number) {
  const { data: session } = useSession();
  const [allUsers, setAllUsers] = useState<UserProfile[] | null>(null);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (session?.user?.id && session?.user?.token) {
        try {
          const data = await userService.fetchAllUsers(
            session.user.token,
            "", // no search param for now
            limit,
            offset
          );
          setAllUsers(data.results);
          setCount(data.count)
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

  return { allUsers, count, isLoading, error };
}
