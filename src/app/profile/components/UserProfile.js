import Image from "next/image";
import EditProfileButton from "./EditProfileButton";

export default function UserProfile({ darkMode, userData }) {
  return (
    <section className={"w-10/12 mx-auto py-32 place-content-start"}>
      <div className="w-full text-center mb-8 place-content-center">
        <div>
          <Image
            src={userData.profile_image}
            width={200}
            height={200}
            alt="User Profile Photo"
            className={"mx-auto rounded-full ring-offset-2 ring-8 ring-capx-secondary-purple" + (darkMode ? " ring-offset-capx-dark-box-bg" : " ring-offset-capx-light-box-bg")}
          />
        </div>
        <EditProfileButton />
        <div className="w-full text-xl space-y-4">
          <h3>Hello, <span className="font-extrabold">{userData.display_name}</span>!</h3>
          <h3>{userData.pronoun}</h3>
          <h3>{userData.about}</h3>
          <h3>{userData.wikidata_qid}</h3>
          <h3>{userData.wiki_alt}</h3>
        </div>
      </div>
    </section>
  )
}