"use client"

import ProfilePage from "../components/ProfilePage";

import { useUserByUsername } from "@/hooks/useUserProfile";
import { useParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import LoadingState from "@/components/LoadingState";

export default function ProfileByUserName() {
  const params = useParams();
  const username = params?.username.toString();
  const formattedUsername = username.replace(/_/g, " ")

  const { userByUsername } = useUserByUsername(formattedUsername.toString());
  const { data: session } = useSession();

  const formattedUsernameToLower = formattedUsername?.toLowerCase().trim();
  const loggedUserNameToLower = session?.user?.name?.toLowerCase().trim() || "";
  const isSameUser = formattedUsernameToLower === loggedUserNameToLower;

  if (!userByUsername) {
    return(
      <LoadingState/>
    )
  }

  return(
    <ProfilePage 
      isSameUser={isSameUser} 
      profile={userByUsername}
    >
    </ProfilePage>
  )
}
