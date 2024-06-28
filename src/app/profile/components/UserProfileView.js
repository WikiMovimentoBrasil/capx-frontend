import Image from "next/image";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

export default function UserProfileView({ darkMode, profileData }) {
  const pronouns = [
    { value: "he-him", label: "He/Him" },
    { value: "she-her", label: "She/Her" },
    { value: "they-them", label: "They/Them" },
    { value: "not-specified", label: "Not Specified" },
    { value: "other", label: "Other" }
  ]

  if (profileData === undefined) {
    return (
      <section className={"w-10/12 sm:w-8/12 h-screen mx-auto py-32"}>
        <div className="grid grid-cols-1 sm:grid-cols-1 w-full sm:w-7/12 h-fit mx-auto text-center text-xl space-y-14">
          <div>
            <div className={"w-48 h-48 mx-auto rounded-full ring-offset-4 ring-8 animate-pulse" + (darkMode ? " bg-capx-dark-box-bg ring-offset-capx-dark-box-bg ring-capx-dark-box-bg" : " bg-capx-light-box-bg ring-offset-capx-light-box-bg ring-capx-light-box-bg")}></div>
          </div>
          <div className="grid w-full place-items-center space-y-10">
            <div className="w-full space-y-2">
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/2 h-10 mx-auto rounded-lg animate-pulse"}></div>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/4 h-6 mx-auto rounded-lg animate-pulse"}></div>
            </div>
            <div className="w-full space-y-8">
              <div className="w-full space-y-2">
                <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 mx-auto rounded-lg animate-pulse"}></div>
                <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
                <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 mx-auto rounded-lg animate-pulse"}></div>
                <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
              </div>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/2 h-8 mx-auto rounded-lg animate-pulse"}></div>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
            </div>
            <div className="w-full space-y-2">
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/2 h-8 mx-auto rounded-lg animate-pulse"}></div>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={"w-10/12 sm:w-8/12 mx-auto py-32"}>
      <div className="grid grid-cols-1 sm:grid-cols-1 w-full sm:w-7/12 h-fit mx-auto text-center text-xl">
        <div>
          <Image
            src={profileData.userData.profile_image ?? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='}
            width={192}
            height={192}
            alt="User Profile Photo"
            className={"w-48 h-48 mx-auto rounded-full ring-offset-4 ring-8 ring-capx-secondary-purple" + (darkMode ? " ring-offset-capx-dark-box-bg" : " ring-offset-capx-light-box-bg")}
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
        <div className="space-y-10 mb-10">
          {profileData.userData.contact !== null ? (
            (profileData.userData.contact.filter((item) => item.display_name !== "" && item.value !== "").length === 0) ? (null) : (
              <div className="flex flex-wrap place-content-center pt-4">
                <h2 className="w-full text-center font-extrabold mb-6">Your Contact</h2>
                {profileData.userData.contact?.map((item, index) => item.display_name !== "" ? (<h3 key={"contact" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2"><span className="font-extrabold">{item.display_name}</span> | {item.value}</h3>) : (null))}
              </div>
            )
          ) : (null)
          }
          {profileData.userData.social !== null ? (
            (profileData.userData.social.filter((item) => item.display_name !== "" && item.value !== "").length === 0) ? (null) : (
              <div className="flex flex-wrap place-content-center pt-4">
                <h2 className="w-full text-center font-extrabold mb-6">Social Media</h2>
                {profileData.userData.social?.map((item, index) => item.display_name !== "" ? (<h3 key={"social" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2"><span className="font-extrabold">{item.display_name}</span> | {item.value}</h3>) : (null))}
              </div>
            )
          ) : (null)
          }
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
        <div className="space-y-14">
          {profileData.userData.skills_known.length > 0 ? (
            <div className="flex flex-wrap place-content-center pt-4">
              <h2 className="w-full text-center font-extrabold mb-6">Known Skills</h2>
              {profileData.userData.skills_known?.map((item, index) => <h3 key={"skills_known" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{profileData.skillData[item]}</h3>)}
            </div>
          ) : (null)
          }
          {profileData.userData.skills_available.length > 0 ? (
            <div className="flex flex-wrap place-content-center pt-4">
              <h2 className="w-full text-center font-extrabold mb-6">Available Skills</h2>
              {profileData.userData.skills_available?.map((item, index) => <h3 key={"skills_available" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{profileData.skillData[item]}</h3>)}
            </div>
          ) : (null)
          }
          {profileData.userData.skills_wanted.length > 0 ? (
            <div className="flex flex-wrap place-content-center pt-4">
              <h2 className="w-full text-center font-extrabold mb-6">Wanted Skills</h2>
              {profileData.userData.skills_wanted?.map((item, index) => <h3 key={"skills_wanted" + index.toString()} className="bg-capx-secondary-purple text-[#F6F6F6] tracking-widest text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full mb-2 mr-2">{profileData.skillData[item]}</h3>)}
            </div>
          ) : (null)
          }
        </div>
      </div>
    </section>
  )
}