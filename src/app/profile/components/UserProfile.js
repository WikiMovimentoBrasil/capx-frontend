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
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.territory_rep?.map((item) => <h3 className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item.display_name}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.language_rep?.map((item) => <h3 className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item.display_name}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.affiliation_rep?.map((item) => <h3 className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item.display_name}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.wikimedia_project_rep?.map((item) => <h3 className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item.display_name}</h3>)}
          </div>
          <h3>{userData.team}</h3>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.skills_known_rep?.map((item) => <h3 className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item.display_name}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.skills_available_rep?.map((item) => <h3 className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item.display_name}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.skills_wanted_project_rep?.map((item) => <h3 className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item.display_name}</h3>)}
          </div>
        </div>
      </div>
    </section>
  )
}