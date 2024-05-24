import EditProfileButton from "./EditProfileButton";

export default function UserProfile({ darkMode, userData }) {
  return (
    <section className={"w-10/12 mx-auto py-32 place-content-start"}>
      <div className="w-full text-center mb-8 place-content-center">
        <EditProfileButton />
      </div>
    </section>
  )
}