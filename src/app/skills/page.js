import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function SkillPage() {
  const session = await getServerSession();

  if (session) {
    return (
      <div></div>
    )
  } else {
    redirect('/');
  }
}