import { useEffect, useState } from "react";
import UserProfileImage from "./UserProfileImage";
import UserProfileViewTextBox from "./UserProfileViewTextBox";
import UserProfileEditButton from "./UserProfileEditButton";
import UserProfileViewTagBox from "./UserProfileViewTagBox";
import UserProfileViewSkeleton from "./UserProfileViewSkeleton";
import UserProfileViewBoxTitle from "./UserProfileViewBoxTitle";
import UserProfileViewCapacityBox from "./UserProfileViewCapacityBox";

export default function UserProfileView({ darkMode, userProfileData, showEditButton }) {
  const [wantedCapacities, setWantedCapacities] = useState(undefined);
  const [knownCapacities, setKnownCapacities] = useState(undefined);
  const [availableCapacities, setAvailableCapacities] = useState(undefined);
  const [socialMediaCount, setSocialMediaCount] = useState(undefined);
  const [contactCount, setContactCount] = useState(undefined);

  const pronouns = [
    { value: "he-him", label: "He/Him" },
    { value: "she-her", label: "She/Her" },
    { value: "they-them", label: "They/Them" },
    { value: "not-specified", label: "Not Specified" },
    { value: "other", label: "Other" }
  ]

  useEffect(() => {
    if (userProfileData?.skillData !== undefined && userProfileData?.userData !== undefined) {
      setWantedCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_wanted.includes(item.code))));
      setKnownCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_known.includes(item.code))));
      setAvailableCapacities(userProfileData.skillData.filter((item) => (userProfileData.userData.skills_available.includes(item.code))));
      setSocialMediaCount(userProfileData.userData.social.filter((item) => (item.display_name !== "" || item.value !== "")));
      setContactCount(userProfileData.userData.contact.filter((item) => (item.display_name !== "" || item.value !== "")));
    }
  }, [userProfileData]);

  if (userProfileData === undefined) {
    return (
      <UserProfileViewSkeleton darkMode={darkMode} />
    )
  }

  return (
    <main className={"grid grid-cols-1 sm:grid-cols-1 w-10/12 sm:w-8/12 h-fit text-xl mx-auto text-center py-36 space-y-20"}>
      <div className="w-full sm:w-8/12 mx-auto space-y-28">
        {/* Section: Personal */}
        <section className="space-y-14 sm:space-y-16">
          {/* Profile Image & Edit Profile Button */}
          <div>
            <UserProfileImage darkMode={darkMode} imageUrl={userProfileData.userData.profile_image} />
            {showEditButton ? (<UserProfileEditButton to={"/profile/edit"}>Edit Profile</UserProfileEditButton>) : (null)}
          </div>
          {/* Display Name & Pronoun & About & Wikidata Item & Aternative Wikimedia Account */}
          <div className="space-y-6 sm:space-y-4">
            <div className="flex-none sm:flex sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
              {/* Display Name */}
              <h3 className="w-full sm:w-fit text-3xl">
                <span className="font-extrabold">
                  {userProfileData.userData.display_name ?
                    (userProfileData.userData.display_name)
                    :
                    (userProfileData.userData.user.username)
                  }
                </span>
              </h3>
              {/* Pronoun */}
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-fit px-4 py-2 mx-auto my-auto rounded-lg"}>
                {userProfileData.userData.pronoun ?
                  (<h3 className="text-base">{pronouns.map((option) => option.value === userProfileData.userData.pronoun ? option.label : null)}</h3>)
                  :
                  (<h3 className="text-base">Not Specified</h3>)
                }
              </div>
            </div>
            {/* About */}
            {userProfileData.userData.about ? (
              <UserProfileViewTextBox
                darkMode={darkMode}
                info={userProfileData.userData.about ?? ""}
              />
            ) : (null)}
            {/* Wikidata Item */}
            {userProfileData.userData.wikidata_qid ? (
              <UserProfileViewTextBox
                darkMode={darkMode}
                title={"Wikidata Item"}
                info={userProfileData.userData.wikidata_qid ?? ""}
              />
            ) : (null)}
            {/* Alternative Wikimedia Account */}
            {userProfileData.userData.wiki_alt ? (
              <UserProfileViewTextBox
                darkMode={darkMode}
                title={"Alternative Wikimedia Account"}
                info={userProfileData.userData.wiki_alt ?? ""}
              />
            ) : (null)}
          </div>
        </section>
        {/* Checking if there is data to render */}
        {contactCount?.length === 0 && socialMediaCount?.length === 0 ? (null) : (
          // Section: Exchange
          <section className="space-y-6 sm:space-y-4">
            <UserProfileViewBoxTitle>Contact and Social Media</UserProfileViewBoxTitle>
            {/* Contact */}
            {userProfileData.userData.contact?.map((item, index) => item.display_name === "" || item.value === "" ? (null) : (
              <UserProfileViewTextBox
                key={index}
                darkMode={darkMode}
                title={item.display_name}
                info={item.value ?? ""}
              />
            ))}
            {/* Social Media */}
            {userProfileData.userData.social?.map((item, index) => item.display_name === "" || item.value === "" ? (null) : (
              <UserProfileViewTextBox
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
              <UserProfileViewBoxTitle>Territory</UserProfileViewBoxTitle>
              <UserProfileViewTagBox
                darkMode={darkMode}
                data={userProfileData.userData.territory}
                tagList={userProfileData.territoryData}
                endpoint={"tag/territory"}
              />
            </div>
          )}
          {userProfileData.userData.language.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <UserProfileViewBoxTitle>Language</UserProfileViewBoxTitle>
              <UserProfileViewTagBox
                darkMode={darkMode}
                data={userProfileData.userData.language}
                tagList={userProfileData.languageData}
                endpoint={"tag/language"}
              />
            </div>
          )}
          {userProfileData.userData.affiliation.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <UserProfileViewBoxTitle>Affiliation</UserProfileViewBoxTitle>
              <UserProfileViewTagBox
                darkMode={darkMode}
                data={userProfileData.userData.affiliation}
                tagList={userProfileData.affiliationData}
                endpoint={"tag/affiliation"}
              />
            </div>
          )}
        </section>
        {/* Section: Capacity */}
        <section className="space-y-14 sm:space-y-14">
          {userProfileData.userData.skills_wanted.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <UserProfileViewBoxTitle>Wanted Capacities</UserProfileViewBoxTitle>
              <UserProfileViewCapacityBox darkMode={darkMode} data={wantedCapacities} endpoint={"capacity"} />
            </div>
          )}
          {userProfileData.userData.skills_known.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <UserProfileViewBoxTitle>Known Capacities</UserProfileViewBoxTitle>
              <UserProfileViewCapacityBox darkMode={darkMode} data={knownCapacities} endpoint={"capacity"} />
            </div>
          )}
          {userProfileData.userData.skills_available.length === 0 ? (null) : (
            <div className="space-y-6 sm:space-y-4">
              <UserProfileViewBoxTitle>Available Capacities</UserProfileViewBoxTitle>
              <UserProfileViewCapacityBox darkMode={darkMode} data={availableCapacities} endpoint={"capacity"} />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}