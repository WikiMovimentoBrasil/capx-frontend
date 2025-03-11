"use client"

import ProfilePage from "./components/ProfilePage";

import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileByUserName() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { profile } = useProfile(
    token,
    Number(session?.user?.id)
  );

  return(
    <ProfilePage 
      isSameUser={true} 
      profile={profile}
    >
    </ProfilePage>
  )
}
