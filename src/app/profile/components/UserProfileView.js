import { useEffect, useState } from "react";
import Link from "next/link";
import UserProfileImage from "./UserProfileImage";
import UserProfileEditButton from "./UserProfileEditButton";
import UserProfileViewTagBox from "./UserProfileViewTagBox";
import UserProfileViewSkeleton from "./UserProfileViewSkeleton";
import UserProfileViewCapacityBox from "./UserProfileViewCapacityBox";
import NoUserProfileView from "./NoUserProfileView";
import ViewBoxTitle from "@/components/ViewBoxTitle";
import ViewTextBox from "@/components/ViewTextBox";

export default function UserProfileView({ darkMode, userProfileData, showEditButton, pageContent }) {
  const [wantedCapacities, setWantedCapacities] = useState(undefined);
  const [knownCapacities, setKnownCapacities] = useState(undefined);
  const [availableCapacities, setAvailableCapacities] = useState(undefined);
  const [socialMediaCount, setSocialMediaCount] = useState(undefined);
  const [contactCount, setContactCount] = useState(undefined);

  const pronouns = [
    { value: "he-him", label: pageContent["body-profile-gender-hehim"] },
    { value: "she-her", label: pageContent["body-profile-gender-sheher"] },
    { value: "they-them", label: pageContent["body-profile-gender-theythem"] },
    { value: "not-specified", label: pageContent["body-profile-gender-notespecified"] },
    { value: "other", label: pageContent["body-profile-gender-other"] }
  ]

  useEffect(() => {
    if (userProfileData?.skillData !== undefined && userProfileData?.userData !== undefined && userProfileData.userData !== "") {
      setWantedCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_wanted.includes(item.code))));
      setKnownCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_known.includes(item.code))));
      setAvailableCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_available.includes(item.code))));
      setContactCount(userProfileData.userData.contact?.filter((item) => (item.display_name !== "" || item.value !== "")) ?? []);
    }
  }, [userProfileData]);

  if (userProfileData === undefined) {
    return (
      <UserProfileViewSkeleton darkMode={darkMode} />
    )
  }
  if (userProfileData.userData === "") {
    return (
      <NoUserProfileView darkMode={darkMode} pageContent={pageContent}/>
    )
  }

  return (
    <div className={"grid grid-cols-1 sm:grid-cols-1 w-10/12 sm:w-8/12 h-fit text-xl mx-auto text-center pt-36 pb-16 space-y-20"}>
      <div className="w-full sm:w-8/12 mx-auto space-y-28">
        {/* Section: Personal */}
        <section className="space-y-14 sm:space-y-16">
          {/* Profile Image & Edit Profile Button */}
          <div>
            <UserProfileImage darkMode={darkMode} imageUrl={userProfileData.userData.profile_image} />
            {showEditButton ? (
              <UserProfileEditButton to={"/profile/edit"}>
                {pageContent["body-profile-edit-button"]}
              </UserProfileEditButton>
            ) : (null)}
          </div>
          {/* Username & Pronoun & About & Wikidata Item & Aternative Wikimedia Account */}
          <div className="space-y-6 sm:space-y-4">
            <div className="flex-none sm:flex sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
              {/* Username */}
              <h3 className={"w-full sm:w-fit text-3xl " + (darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ")}>
                <Link href={"https://meta.wikimedia.org/wiki/User:" + userProfileData.userData.user.username}
                      className="bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-widest px-4 sm:px-5 py-3 rounded-lg">
                  <span className="font-extrabold">
                    {userProfileData.userData.user.username ? (userProfileData.userData.user.username) : ""}
                  </span>
                </Link>
              </h3>
            </div>
            <div className="space-y-6 sm:space-y-4">
              {/* Pronoun */}
              <div
                  className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-fit px-4 py-2 mx-auto my-auto rounded-lg"}>
                {userProfileData.userData.pronoun ?
                    (
                        <h3 className="text-base">{pronouns.map((option) => option.value === userProfileData.userData.pronoun ? option.label : null)}</h3>)
                    :
                    (<h3 className="text-base">{pageContent["body-profile-gender-notespecified"]}</h3>)
                }
              </div>
            </div>
            {/* About */}
            {userProfileData.userData.about ? (
                <ViewTextBox
                    darkMode={darkMode}
                    info={userProfileData.userData.about ?? ""}
                />
            ) : (null)}
            {/* Wikidata Item */}
            {userProfileData.userData.wikidata_qid ? (
                <ViewTextBox
                    darkMode={darkMode}
                    title={pageContent["body-profile-box-title-wikidata-item"]}
                    info={userProfileData.userData.wikidata_qid ?? ""}
                />
            ) : (null)}
            {/* Alternative Wikimedia Account */}
            {userProfileData.userData.wiki_alt ? (
                <ViewTextBox
                    darkMode={darkMode}
                    title={pageContent["body-profile-box-title-alt-wiki-acc"]}
                info={userProfileData.userData.wiki_alt ?? ""}
              />
            ) : (null)}
          </div>
        </section>
        {/* Checking if there is data to render */}
        {contactCount?.length === 0 && socialMediaCount?.length === 0 ? (null) : (
          // Section: Exchange
          <section className="space-y-6 sm:space-y-4">
            <ViewBoxTitle>
              {pageContent["body-profile-section-title-contact-social"]}
            </ViewBoxTitle>
            {/* Contact */}
            {userProfileData.userData.contact?.map((item, index) => item.display_name === "" || item.value === "" ? (null) : (
              <ViewTextBox
                key={index}
                darkMode={darkMode}
                title={item.display_name}
                info={item.value ?? ""}
              />
            ))}
          </section>
        )}
        {/* Section: Community */}
        <section className="space-y-14 sm:space-y-14">
          {userProfileData.userData.territory.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["body-profile-section-title-territory"]}
              </ViewBoxTitle>
              <UserProfileViewTagBox
                darkMode={darkMode}
                data={userProfileData.userData.territory}
                tagList={userProfileData.territoryData}
                endpoint={"tag/territory"}
              />
            </div>
          )}
          {userProfileData.userData.affiliation.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["body-profile-section-title-affiliation"]}
              </ViewBoxTitle>
              <UserProfileViewTagBox
                darkMode={darkMode}
                data={userProfileData.userData.affiliation}
                tagList={userProfileData.affiliationData}
                endpoint={"tag/affiliation"}
              />
            </div>
          )}
          {userProfileData.userData.team.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["body-profile-section-title-team"]}
              </ViewBoxTitle>
              <ViewTextBox
                  darkMode={darkMode}
                  info={userProfileData.userData.team ?? ""}
              />
            </div>
          )}
          {userProfileData.userData.wikimedia_project.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["body-profile-section-title-wikimedia-project"]}
              </ViewBoxTitle>
              <UserProfileViewTagBox
                darkMode={darkMode}
                data={userProfileData.userData.wikimedia_project}
                tagList={userProfileData.wikiProjectData}
                endpoint={"tag/wikimedia_project"}
              />
            </div>
          )}
        </section>
        {/* Section: Capacity */}
        <section className="space-y-14 sm:space-y-14">
          {userProfileData.userData.skills_wanted.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["body-profile-section-title-wanted-capacity"]}
              </ViewBoxTitle>
              <UserProfileViewCapacityBox darkMode={darkMode} data={wantedCapacities} endpoint={"capacity"} />
            </div>
          )}
          {userProfileData.userData.skills_known.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["body-profile-section-title-known-capacity"]}
              </ViewBoxTitle>
              <UserProfileViewCapacityBox darkMode={darkMode} data={knownCapacities} endpoint={"capacity"} />
            </div>
          )}
          {userProfileData.userData.skills_available.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["body-profile-section-title-available-capacity"]}
              </ViewBoxTitle>
              <UserProfileViewCapacityBox darkMode={darkMode} data={availableCapacities} endpoint={"capacity"} />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}