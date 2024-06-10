import Image from "next/image";
import ContentBoxSingleColumn from "./ContentBoxSingleColumn";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

export default function UserProfile({ darkMode, profileData }) {
  const pronouns = [
    { value: "he-him", label: "He/Him" },
    { value: "she-her", label: "She/Her" },
    { value: "they-them", label: "They/Them" },
    { value: "not-specified", label: "Not Specified" },
    { value: "other", label: "Other" }
  ]

  return (
    <section className={"w-10/12 sm:w-8/12 mx-auto py-32 place-content-start"}>
      <ContentBoxSingleColumn>
        <div>
          <Image
            src={profileData.userData.profile_image ?? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='}
            width={200}
            height={200}
            alt="User Profile Photo"
            className={"mx-auto rounded-full ring-offset-4 ring-8 ring-capx-secondary-purple" + (darkMode ? " ring-offset-capx-dark-box-bg" : " ring-offset-capx-light-box-bg")}
          />
          <ButtonRedirectToPage to={"/profile/edit"}>
            Edit Profile
          </ButtonRedirectToPage>
        </div>
        <div className="grid place-items-center space-y-10 mb-14">
          <div className="space-y-2">
            <h3>Hello, <span className="font-extrabold">{(profileData.userData.display_name && profileData.userData.display_name.trim() !== '') ? profileData.userData.display_name : profileData.userData.user.username}</span>!</h3>
            {profileData.userData.pronoun ? (<h3 className="text-base">[{pronouns.map((option) => option.value === profileData.userData.pronoun ? option.label : null)}]</h3>) : (null)}
          </div>
          <div className="space-y-8">
            {profileData.userData.about ? (<h3>{profileData.userData.about}</h3>) : (null)}
            {profileData.userData.wikidata_qid ? (<h3>Your Wikidata Item is <span className="font-extrabold">{profileData.userData.wikidata_qid}</span>.</h3>) : (null)}
            {profileData.userData.wiki_alt ? (<h3>Your alternative Wikimedia Account is <span className="font-extrabold">{profileData.userData.wiki_alt}</span>.</h3>) : (null)}
          </div>
        </div>
        <div className="space-y-14">
          {profileData.userData.territory.length > 0 ? (
            <div className="flex flex-wrap place-content-center pt-4">
              <h2 className="w-full text-center font-extrabold mb-6">Your Territories</h2>
              {profileData.userData.territory?.map((item, index) => <h3 key={"territory" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{profileData.territoryData[item]}</h3>)}
            </div>
          ) : (null)
          }
          {profileData.userData.language.length > 0 ? (
            <div className="flex flex-wrap place-content-center pt-4">
              <h2 className="w-full text-center font-extrabold mb-6">Your Languages</h2>
              {profileData.userData.language?.map((item, index) => <h3 key={"language" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{profileData.languageData[item]}</h3>)}
            </div>
          ) : (null)
          }
          {profileData.userData.affiliation.length > 0 ? (
            <div className="flex flex-wrap place-content-center pt-4">
              <h2 className="w-full text-center font-extrabold mb-6 font-extrabold mb-6">Your Affiliations</h2>
              {profileData.userData.affiliation?.map((item, index) => <h3 key={"affiliation" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{profileData.affiliationData[item]}</h3>)}
            </div>
          ) : (null)
          }
          {profileData.userData.wikimedia_project.length > 0 ? (
            <div className="flex flex-wrap place-content-center pt-4">
              <h2 className="w-full text-center font-extrabold mb-6">Your Wikimedia Projects</h2>
              {profileData.userData.wikimedia_project?.map((item, index) => <h3 key={"wikimedia_project" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{profileData.wikiProjectData[item]}</h3>)}
            </div>
          ) : (null)
          }
        </div>
      </ContentBoxSingleColumn>
    </section>
  )
}