import { cookies } from "next/headers";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export default function Home() {
  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode");

  return (
    <ApplicationWrapper darkMode={darkMode}></ApplicationWrapper>
  );
}
