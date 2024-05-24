import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import MainWrapper from "./components/MainWrapper";
import EditProfileForm from "./components/EditProfileForm";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode") === undefined ? "false" : cookieStore.get("dark_mode");

  if (session) {
    return (
      <MainWrapper session={session !== null} darkMode={darkMode}>
        <EditProfileForm session={session !== null}></EditProfileForm>
      </MainWrapper>
    )
  }
}