import Image from "next/image";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

export default function UserProfile({ darkMode, userData }) {
  return (
    <section className={"w-10/12 mx-auto py-32 place-content-start"}>
      <div className="w-full text-center mb-8 place-content-center">
        <div>
          <Image
            src={userData.profile_image ?? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='}
            width={200}
            height={200}
            alt="User Profile Photo"
            className={"mx-auto rounded-full ring-offset-2 ring-8 ring-capx-secondary-purple" + (darkMode ? " ring-offset-capx-dark-box-bg" : " ring-offset-capx-light-box-bg")}
          />
        </div>
        <ButtonRedirectToPage to={"/profile/edit"}>
          Edit Profile
        </ButtonRedirectToPage>
        <div className="w-full text-xl space-y-4">
          <h3>Hello, <span className="font-extrabold">{(userData.display_name && userData.display_name.trim() !== '') ? userData.display_name : userData.user.username}</span>!</h3>
          <h3>{userData.pronoun}</h3>
          <h3>{userData.about}</h3>
          <h3>{userData.wikidata_qid}</h3>
          <h3>{userData.wiki_alt}</h3>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.territory?.map((item, index) => <h3 key={"territory" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.language?.map((item, index) => <h3 key={"language" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.affiliation?.map((item, index) => <h3 key={"affiliation" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.wikimedia_project?.map((item, index) => <h3 key={"wikimedia_project" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item}</h3>)}
          </div>
          <h3>{userData.team}</h3>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.skills_known?.map((item, index) => <h3 key={"skills_known" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.skills_available?.map((item, index) => <h3 key={"skills_available" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item}</h3>)}
          </div>
          <div className="flex flex-wrap place-content-center pt-4">
            {userData.skills_wanted_project?.map((item, index) => <h3 key={"skills_wanted_project" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-base px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{item}</h3>)}
          </div>
        </div>
      </div>
    </section>
  )
}