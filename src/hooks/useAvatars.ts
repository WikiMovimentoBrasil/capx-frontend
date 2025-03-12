import { useQuery } from "@tanstack/react-query";
import { avatarService } from "@/services/avatarService";
import { useSession } from "next-auth/react";

export function useAvatars(limit?: number, offset?: number) {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const {
    data: avatars,
    isLoading: avatarsLoading,
    error: avatarsError,
  } = useQuery({
    queryKey: ["avatars", token, limit, offset],
    queryFn: () =>
      avatarService.fetchAvatars({
        headers: {
          Authorization: `Token ${token}`,
        },
        params: { limit, offset },
      }),
    enabled: !!token,
  });

  const getAvatarById = async (id: number) => {
    if (!token) return null;
    try {
      const avatar = await avatarService.fetchAvatarById(id, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return avatar;
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return null;
    }
  };

  return {
    avatars,
    isLoading: avatarsLoading,
    error: avatarsError,
    getAvatarById,
  };
}
