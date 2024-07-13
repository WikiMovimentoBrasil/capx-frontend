"use client";
import axios from "axios";
import { useState, useMemo} from "react";
import { useRouter } from 'next/navigation';
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import SingleSelectInput from "./SingleSelectInput";
import SubmitButton from "./SubmitButton";
import MultiSelectInput from "./MultiSelectInput";
import TextDoubleInput from "./TextDoubleInput";
import CommonsSelect from "./CommonsSelect";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

export default function EditProfileForm({ darkMode, session, formData, setFormData }) {
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

  if (session.sessionStatus === "authenticated") {
    if (formData.userData != undefined) {
      return (
        <section className={"flex flex-wrap flex-col w-10/12 h-fit mx-auto place-content-start py-32"}>
          <form onSubmit={handleSubmit} className="w-full">
            {/* Profile Picture */}
            <CommonsSelect
              id={"profile_image"}
              data={formData.userData?.profile_image ? {
                label: extractImageName(formData.userData.profile_image),
                thumbnail: formData.userData.profile_image 
              } : null}
              onChange={(selectedOption) => handleSingleSelectInputChange(selectedOption, { name: "profile_image" })}
              loadOptions={debouncedLoadPictures}
              formatOptionLabel={formatOptionLabel}
            >
              Profile Picture
            </CommonsSelect>
            {/* Display Name */}
            <TextInput
              id={"display_name"}
              key={"display_name"}
              data={formData.userData?.display_name ?? ""}
              placeholder={"e.g. Name Surname"}
              onChange={handleTextInputChange}
              type={"text"}
              maxLength={300}
            >
              Display Name
            </TextInput>
            {/* Pronouns */}
            <SingleSelectInput
              id={"pronoun"}
              key={"pronoun"}
              data={pronouns.map((option) => option)}
              defaultValue={pronouns.find((option) => option.value === formData.userData?.pronoun)}
              onChange={handleSingleSelectInputChange}
            >
              Pronouns
            </SingleSelectInput>
            {/* Short Bio */}
            <TextArea
              id={"about"}
              key={"about"}
              data={formData.userData?.about ?? ""}
              placeholder={"briefly introduce and describe yourself"}
              onChange={handleTextInputChange}
              type={"text"}
              maxLength={500}
            >
              Short Bio
            </TextArea>
            {/* Wikidata Item */}
            <TextInput
              id={"wikidata_qid"}
              key={"wikidata_qid"}
              data={formData.userData?.wikidata_qid ?? ""}
              placeholder={"e.g. Q125816201"}
              onChange={handleTextInputChange}
              type={"text"}
              maxLength={10}
            >
              Wikidata Item
            </TextInput>
            {/* Alternative Wikimedia Account */}
            <TextInput
              id={"wiki_alt"}
              key={"wiki_alt"}
              data={formData.userData?.wiki_alt ?? ""}
              placeholder={"e.g. Username"}
              onChange={handleTextInputChange}
              type={"text"}
              maxLength={128}
            >
              Alternative Wikimedia Account
            </TextInput>
            {/* Territory */}
            <MultiSelectInput
              id={"territory"}
              key={"territory"}
              options={Object.entries(formData.territoryData ?? {}).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
              selectedOptions={formData.userData?.territory?.map((option) => ({ value: option, label: formData.territoryData?.[option] })) ?? []}
              onChange={handleMultiSelectInputChange}
            >
              Territory
            </MultiSelectInput>
            {/* Language */}
            <MultiSelectInput
              id={"language"}
              key={"language"}
              options={Object.entries(formData.languageData ?? {}).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
              selectedOptions={formData.userData?.language?.map((option) => ({ value: option, label: formData.languageData[option] })) ?? []}
              onChange={handleMultiSelectInputChange}
            >
              Language
            </MultiSelectInput>
            {/* Affilitation */}
            <MultiSelectInput
              id={"affiliation"}
              key={"affiliation"}
              options={Object.entries(formData.affiliationData ?? {}).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
              selectedOptions={formData.userData?.affiliation?.map((option) => ({ value: option, label: formData.affiliationData[option] })) ?? []}
              onChange={handleMultiSelectInputChange}
            >
              Affilitation
            </MultiSelectInput>
            {/* Wikimedia Project */}
            <MultiSelectInput
              id={"wikimedia_project"}
              key={"wikimedia_project"}
              options={Object.entries(formData.wikiProjectData ?? {}).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
              selectedOptions={formData.userData?.wikimedia_project?.map((option) => ({ value: option, label: formData.wikiProjectData[option] })) ?? []}
              onChange={handleMultiSelectInputChange}
            >
              Wikimedia Project
            </MultiSelectInput>
            {/* Known Skills */}
            <MultiSelectInput
              id={"skills_known"}
              key={"skills_known"}
              options={Object.entries(formData.skillData ?? {}).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
              selectedOptions={formData.userData?.skills_known?.map((option) => ({ value: option, label: formData.skillData[option] })) ?? []}
              onChange={handleMultiSelectInputChange}
            >
              Known Capacities
            </MultiSelectInput>
            {/* Available Skills */}
            <MultiSelectInput
              id={"skills_available"}
              key={"skills_available"}
              options={formData.userData?.skills_known?.map((option) => ({ value: option, label: formData.skillData[option] }))}
              selectedOptions={formData.userData?.skills_available?.map((option) => ({ value: option, label: formData.skillData[option] })) ?? []}
              onChange={handleMultiSelectInputChange}
            >
              Available Capacities
            </MultiSelectInput>
            {/* Wanted Skills */}
            <MultiSelectInput
              id={"skills_wanted"}
              key={"skills_wanted"}
              options={Object.entries(formData.skillData ?? {}).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
              selectedOptions={formData.userData?.skills_wanted?.map((option) => ({ value: option, label: formData.skillData[option] })) ?? []}
              onChange={handleMultiSelectInputChange}
            >
              Wanted Capacities
            </MultiSelectInput>
            {/* Team */}
            <TextInput
              id={"team"}
              key={"team"}
              data={formData.userData?.team ?? ""}
              placeholder={"e.g. Staff Team"}
              onChange={handleTextInputChange}
              type={"text"}
              maxLength={128}
            >
              Team
            </TextInput>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-10 mb-8">
              <TextDoubleInput
                field={"contact"}
                darkMode={darkMode}
                formData={formData}
                setFormData={setFormData}
                placeholderDisplayName={"eg. E-mail, Talk Page, Strategy Forum, Telegram, Whatsapp"}
                placeholderValue={"eg. name@email.com, url, your username"}
                maxLength={200}
              >
                Contact
              </TextDoubleInput>
              <TextDoubleInput
                field={"social"}
                darkMode={darkMode}
                formData={formData}
                setFormData={setFormData}
                placeholderDisplayName={"eg. Facebook, Instagram, Linkedin, Mastodon"}
                placeholderValue={"Your username"}
                maxLength={200}
              >
                Social Media
              </TextDoubleInput>
            </div>
            <div className="flex items-start space-x-20">
              <SubmitButton updatingData={updatingData}>Update Profile</SubmitButton>
              <ButtonRedirectToPage to={"/profile"}>
                Cancel
              </ButtonRedirectToPage>
            </div>
          </form>
        </section>
      )
    }
  }
}