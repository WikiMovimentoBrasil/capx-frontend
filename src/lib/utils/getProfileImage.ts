import { Avatar } from "@/types/avatar";

export const getProfileImage = (
  profileImage: string | null | undefined,
  avatarId: number | null | undefined,
  avatars?: Avatar[]
) => {
  console.log("profileImage", profileImage);
  console.log("avatarId", avatarId);
  console.log("avatars", avatars);

  if (profileImage) {
    return profileImage;
  }

  if (avatarId && avatars) {
    const avatar = avatars.find((a) => a.id === avatarId);
    return avatar?.avatar_url || "";
  }

  return "";
};
