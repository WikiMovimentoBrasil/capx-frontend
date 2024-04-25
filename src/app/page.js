import { cookies } from "next/headers";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function Home() {
  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode");

  return (
    <ThemeWrapper darkMode={darkMode}></ThemeWrapper>
  );
}
