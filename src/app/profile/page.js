import { getServerSession } from "next-auth/next";

export default async function ProfilePage() {
  const session = await getServerSession();

  return (
    <div></div>
  )
}