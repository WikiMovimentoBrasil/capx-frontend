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
      </ContentBoxSingleColumn>
    </section>
  )
}