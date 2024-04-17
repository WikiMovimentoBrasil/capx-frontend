import Navbar from "@/components/Navbar";
import ProfileForm from "../components/ProfileForm";

export default function ProfileEdit() {
  return (
    <main className="flex flex-wrap flex-col w-full h-screen bg-zinc-50 font-montserrat text-capx-secondary-gray">
      <Navbar></Navbar>
      <ProfileForm></ProfileForm>
    </main>
  )
}