"use client";
import axios from "axios";
import { useState, useMemo} from "react";
import { useRouter } from 'next/navigation';
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import SingleSelectInput from "./SingleSelectInput";
import SubmitButton from "./SubmitButton";
import SimpleButton from "./SimpleButton";
import MultiSelectInput from "./MultiSelectInput";
import TextDoubleInput from "./TextDoubleInput";
import CommonsSelect from "./CommonsSelect";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";
import Modal from 'react-modal';
import { signOut } from "next-auth/react";

Modal.setAppElement(document.getElementById("root"));

export default function EditProfileForm({ darkMode, session, formData, setFormData, pageContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationUsername, setConfirmationUsername] = useState('');
  const router = useRouter();
  const [updatingData, setUpdatingData] = useState(false);

  const pronouns = [
    { value: "he-him", label: "He/Him" },
    { value: "she-her", label: "She/Her" },
    { value: "they-them", label: "They/Them" },
    { value: "not-specified", label: "Not Specified" },
    { value: "other", label: "Other" }
  ]

  const handleTextInputChange = (e, chosenState = null) => {
    const { name, value } = e.target;

    if (chosenState == null) {
      const newUserData = {
        ...formData.userData,
        [name]: value
      };
      setFormData({ ...formData, userData: newUserData });
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const loadPictures = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    const encodedInputValue = encodeURIComponent(inputValue);
    const response = await axios.get(`/api/profile_image?query=${encodedInputValue}`);
    const images = response.data.map(image => ({ value: image, label: image, thumbnail: null }));
    callback(images);

    // Asynchronously load thumbnails
    images.forEach(async (image, index) => {
      const encodedImageValue = encodeURIComponent(image.value);
      const thumbnailResponse = await axios.get(`/api/profile_image?thumb=true&title=${encodedImageValue}`);
      images[index].thumbnail = thumbnailResponse.data.image;
      const valueResponse = await axios.get(`/api/profile_image?title=${encodedImageValue}`);
      images[index].value = valueResponse.data.image;
      callback([...images]); // Trigger re-render with the updated thumbnails
    });
  };

  const debouncedLoadPictures = useMemo(() => debounce(loadPictures, 500), []);

  const formatOptionLabel = ({ value, label, thumbnail }) => (
    <div className="flex items-center">
      {thumbnail ? (
        <img src={thumbnail} className="w-8 h-8 rounded-full" alt={label} />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200" /> // Placeholder for loading image
      )}
      <span className="ml-2">{label}</span>
    </div>
  );

  const extractImageName = (url) => {
    const splitUrl = url.split("/");
    const fileName = splitUrl[splitUrl.length - 2];
    const imageName = fileName ? "File:" + fileName.replace(/_/g, " ") : false;
    return imageName;
  }

  const handleSingleSelectInputChange = (selectedOption, element) => {
    const newUserData = {
      ...formData.userData,
      [element.name]: selectedOption.value
    };
    setFormData({ ...formData, userData: newUserData });
  };

  const handleMultiSelectInputChange = (selectedOptions, element) => {
    const newUserData = {
      ...formData.userData,
      [element.name]: selectedOptions.map(option => option.value)
    };
  
    if (element.name === "skills_known") {
      const previousSkillsKnown = formData.userData.skills_known;
      const removedSkills = previousSkillsKnown.filter(skill => !newUserData.skills_known.includes(skill));
      
      if (removedSkills.length > 0) {
        const updatedSkillsAvailable = formData.userData.skills_available.filter(skill => !removedSkills.includes(skill));
        newUserData.skills_available = updatedSkillsAvailable;
      }
    }
  
    setFormData({ ...formData, userData: newUserData });
  }

  const handleSubmit = async (e) => {
    setUpdatingData(true);
    if (session.sessionStatus == "authenticated") {
      e.preventDefault();
      const queryResponse = await axios.post("/api/profile",
        formData.userData,
        {
          headers: {
            'Authorization': `Token ${session.sessionData.user.token}`,
          }
        }
      ).then(() => {
        router.push("/profile");
      });
    }
  };

  const handleDelete = async (e) => {
    if (formData.userData.user.username === confirmationUsername && session.sessionStatus == "authenticated") {
      e.preventDefault();
      try {
        const queryResponse = await axios.delete("/api/profile",
            {
              headers: {
                "Authorization": `Token ${session.sessionData.user.token}`
              },
              data: {
                userId: formData.userData.user.id,
              }
            });
        if (queryResponse.status !== 200) {
          throw new Error(`Could not delete profile!`);
        }

        setIsModalOpen(false);
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
      await signOut();
      window.location.href = "/";
    } else {
      alert ("Usernames do not match");
    }
  };

  if (session.sessionStatus === "authenticated") {
    if (formData.userData != undefined) {
      return (
          <section className={"flex flex-wrap flex-col w-10/12 h-fit mx-auto place-content-start py-32"}>
            <form onSubmit={handleSubmit} className="w-full" id="profile_form">
              {/* Profile Picture */}
              <CommonsSelect
                  id={"profile_image"}
                  data={formData.userData?.profile_image ? {
                    label: extractImageName(formData.userData.profile_image),
                    thumbnail: formData.userData.profile_image
                  } : null}
                  onChange={(selectedOption) => handleSingleSelectInputChange(selectedOption, {name: "profile_image"})}
                  loadOptions={debouncedLoadPictures}
                  formatOptionLabel={formatOptionLabel}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-picture"]}
              </CommonsSelect>
              {/* Pronouns */}
              <SingleSelectInput
                  id={"pronoun"}
                  key={"pronoun"}
                  data={pronouns.map((option) => option)}
                  defaultValue={pronouns.find((option) => option.value === formData.userData?.pronoun)}
                  onChange={handleSingleSelectInputChange}
              >
                {pageContent["form-profile-pronouns"]}
              </SingleSelectInput>
              {/* Short Bio */}
              <TextArea
                  id={"about"}
                  key={"about"}
                  data={formData.userData?.about ?? ""}
                  placeholder={pageContent["form-profile-short-bio-placeholder"]}
                  onChange={handleTextInputChange}
                  type={"text"}
                  maxLength={500}
              >
                {pageContent["form-profile-short-bio"]}
              </TextArea>
              {/* Wikidata Item */}
              <TextInput
                  id={"wikidata_qid"}
                  key={"wikidata_qid"}
                  data={formData.userData?.wikidata_qid ?? ""}
                  placeholder={pageContent["form-profile-wikidata-item-placeholder"]}
                  onChange={handleTextInputChange}
                  type={"text"}
                  maxLength={10}
              >
                {pageContent["form-profile-wikidata-item"]}
              </TextInput>
              {/* Alternative Wikimedia Account */}
              <TextInput
                  id={"wiki_alt"}
                  key={"wiki_alt"}
                  data={formData.userData?.wiki_alt ?? ""}
                  placeholder={pageContent["form-profile-alternative-wikimedia-account-placeholder"]}
                  onChange={handleTextInputChange}
                  type={"text"}
                  maxLength={128}
              >
                {pageContent["form-profile-alternative-wikimedia-account"]}
              </TextInput>
              {/* Territory */}
              <MultiSelectInput
                  id={"territory"}
                  key={"territory"}
                  options={Object.entries(formData.territoryData ?? {}).map((option) => ({
                    value: parseInt(option[0]),
                    label: option[1]
                  }))}
                  selectedOptions={formData.userData?.territory?.map((option) => ({
                    value: option,
                    label: formData.territoryData?.[option]
                  })) ?? []}
                  onChange={handleMultiSelectInputChange}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-territory"]}
              </MultiSelectInput>
              {/* Language */}
              <MultiSelectInput
                  id={"language"}
                  key={"language"}
                  options={Object.entries(formData.languageData ?? {}).map((option) => ({
                    value: parseInt(option[0]),
                    label: option[1]
                  }))}
                  selectedOptions={formData.userData?.language?.map((option) => ({
                    value: option,
                    label: formData.languageData[option]
                  })) ?? []}
                  onChange={handleMultiSelectInputChange}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-languages"]}
              </MultiSelectInput>
              {/* Affilitation */}
              <MultiSelectInput
                  id={"affiliation"}
                  key={"affiliation"}
                  options={Object.entries(formData.affiliationData ?? {}).map((option) => ({
                    value: parseInt(option[0]),
                    label: option[1]
                  }))}
                  selectedOptions={formData.userData?.affiliation?.map((option) => ({
                    value: option,
                    label: formData.affiliationData[option]
                  })) ?? []}
                  onChange={handleMultiSelectInputChange}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-affiliation"]}
              </MultiSelectInput>
              {/* Team */}
              <TextInput
                  id={"team"}
                  key={"team"}
                  data={formData.userData?.team ?? ""}
                  placeholder={pageContent["form-profile-team-placeholder"]}
                  onChange={handleTextInputChange}
                  type={"text"}
                  maxLength={128}
              >
                {pageContent["form-profile-team"]}
              </TextInput>
              {/* Wikimedia Project */}
              <MultiSelectInput
                  id={"wikimedia_project"}
                  key={"wikimedia_project"}
                  options={Object.entries(formData.wikiProjectData ?? {}).map((option) => ({
                    value: parseInt(option[0]),
                    label: option[1]
                  }))}
                  selectedOptions={formData.userData?.wikimedia_project?.map((option) => ({
                    value: option,
                    label: formData.wikiProjectData[option]
                  })) ?? []}
                  onChange={handleMultiSelectInputChange}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-wikimedia-projects"]}
              </MultiSelectInput>
              {/* Known Skills */}
              <MultiSelectInput
                  id={"skills_known"}
                  key={"skills_known"}
                  options={formData.skillData?.map((skill) => ({value: skill.code, label: skill.name}))}
                  selectedOptions={formData.userData?.skills_known?.map((option) => {
                    const skill = formData.skillData.find(skill => skill.code === option);
                    return {value: skill.code, label: skill.name};
                  }) ?? []}
                  onChange={(selectedOptions) => handleMultiSelectInputChange(selectedOptions, {name: "skills_known"})}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-known-capacities"]}
              </MultiSelectInput>
              {/* Available Skills */}
              <MultiSelectInput
                  id={"skills_available"}
                  key={"skills_available"}
                  options={
                      formData.userData?.skills_known?.map((knownSkill) => {
                        const skill = formData.skillData.find(skill => skill.code === knownSkill);
                        return {value: skill.code, label: skill.name};
                      }) ?? []
                  }
                  selectedOptions={formData.userData?.skills_available?.map((option) => {
                    const skill = formData.skillData.find(skill => skill.code === option);
                    return {value: skill.code, label: skill.name};
                  }) ?? []}
                  onChange={handleMultiSelectInputChange}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-available-capacities"]}
              </MultiSelectInput>
              {/* Wanted Skills */}
              <MultiSelectInput
                  id={"skills_wanted"}
                  key={"skills_wanted"}
                  options={formData.skillData?.map((skill) => ({value: skill.code, label: skill.name}))}
                  selectedOptions={formData.userData?.skills_wanted?.map((option) => {
                    const skill = formData.skillData.find(skill => skill.code === option);
                    return {value: skill.code, label: skill.name};
                  }) ?? []}
                  onChange={handleMultiSelectInputChange}
                  placeholder={pageContent["form-profile-select"]}
              >
                {pageContent["form-profile-wanted-capacities"]}
              </MultiSelectInput>
            </form>
            <div className="flex items-start flex-wrap w-full sm:flex-nowrap">
              <div className="flex space-x-4 flex-wrap sm:w-fit w-full sm:flex-nowrap justify-between sm:justify-start mb-6">
                <SubmitButton updatingData={updatingData} form="profile_form">Update
                  Profile</SubmitButton>
                <ButtonRedirectToPage to={"/profile"}>
                  Cancel
                </ButtonRedirectToPage>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="w-fit h-fit bg-capx-primary-red hover:bg-capx-secondary-red text-[#F6F6F6] tracking-widest font-extrabold text-sm px-4 sm:px-5 py-2 rounded-full ml-auto mr-auto sm:mr-0">Delete Profile</button>
            </div>
            <div id="modal">
              <Modal
                  isOpen={isModalOpen}
                  onRequestClose={() => setIsModalOpen(false)}
                  contentLabel="Confirm Profile Deletion"
                  className={"modal " + (darkMode ? "!bg-capx-dark-box-bg text-capx-light-box-bg" : "!bg-capx-light-box-bg text-capx-dark-bg")}
                  overlayClassName="overlay"
              >
                <h2 className="w-full text-2xl font-extrabold text-center mb-6">{pageContent["body-profile-delete-confirmation"]}</h2>
                <TextInput
                    type="text"
                    id="delete_profile"
                    placeholder={pageContent["body-profile-delete-message"]}
                    data={confirmationUsername}
                    onChange={(e) => setConfirmationUsername(e.target.value)}
                    maxLength="200"
                >
                  {pageContent["body-profile-delete-warning"]}
                </TextInput>
                <div className="flex flex-wrap w-full sm:flex-nowrap justify-center sm:justify-between gap-4 mb-6">
                  <SimpleButton type="button" onClick={() => setIsModalOpen(false)} bg_color="bg-capx-secondary-grey hover:bg-capx-secondary-dark-grey" text_color="text-[#FFFFFF]">{pageContent["form-profile-delete-cancel-button"]}</SimpleButton>
                  <SimpleButton type="button" onClick={handleDelete} bg_color="bg-capx-primary-red hover:bg-capx-secondary-red">{pageContent["form-profile-delete-button"]}</SimpleButton>
                </div>
              </Modal>
            </div>
          </section>
      )
    }
  }
}