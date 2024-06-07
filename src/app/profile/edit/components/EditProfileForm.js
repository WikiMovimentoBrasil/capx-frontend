"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import SingleSelectInput from "./SingleSelectInput";
import SubmitButton from "./SubmitButton";
import LoadingSection from "../../components/LoadingSection";
import MultiSelectInput from "./MultiSelectInput";

const fetchData = async (queryData) => {
  try {
    const [userData, formData, territoryData, languageData, affiliationData, wikiProjectData, skillData] = await Promise.all([
      axios.get("/api/profile", queryData),
      axios.options("/api/profile", queryData),
      axios.get('/api/list/territory', queryData),
      axios.get('/api/list/language', queryData),
      axios.get('/api/list/organizations', queryData),
      axios.get('/api/list/wikimedia_project', queryData),
      axios.get('/api/list/skills', queryData)
    ]);

    return {
      userData: userData.data,
      formData: formData.data,
      territoryData: territoryData.data,
      languageData: languageData.data,
      affiliationData: affiliationData.data,
      wikiProjectData: wikiProjectData.data,
      skillData: skillData.data
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { userData: null, formData: null, affiliationData: null };
  }
};

export default function EditProfileForm({ session, language, pageContent, darkMode }) {
  const router = useRouter();
  const { status, data } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [updatingData, setUpdatingData] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [myData, setMyData] = useState({ userData: null, FormData: null, territoryData: null, languageData: null, affiliationData: null, wikiProjectData: null, skillData: null });

  const pronouns = [
    { value: "he-him", label: "He/Him" },
    { value: "she-her", label: "She/Her" },
    { value: "they-them", label: "They/Them" },
    { value: "not-specified", label: "Not Specified" },
    { value: "other", label: "Other" }
  ]

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { userId: data.user.id },
        headers: { 'Authorization': `Token ${data.user.token}` }
      }

      const getData = async (queryData) => {
        const fetchedData = await fetchData(queryData);
        setMyData(fetchedData);
        setIsLoading(false);
      };

      getData(queryData);

    }
  }, [status]);

  const handleTextInputChange = (e, chosenState = null) => {
    const { name, value } = e.target;

    if (chosenState == null) {
      const newUserData = {
        ...myData.userData,
        [name]: value
      };
      setMyData({ ...myData, userData: newUserData });
    }
  };

  const handleSingleSelectInputChange = (selectedOption, element) => {
    setCurrentUserData({ ...newUserData, [element.name]: selectedOption.value });
  };

  const handleMultiSelectInputChange = (selectedOptions, element) => {
    const newUserData = {
      ...myData.userData,
      affiliation: selectedOptions.map(option => option.value)
    };
    setMyData({ ...myData, userData: newUserData })
  }

  const handleSubmit = async (e) => {
    setUpdatingData(true);
    if (status == "authenticated") {
      e.preventDefault();
      const queryResponse = await axios.post("/api/profile",
        myData.userData,
        {
          headers: {
            'Authorization': `Token ${data.user.token}`,
          }
        }
      ).then(() => {
        router.push("/profile");
      });
    }
  };

  if (status === "authenticated") {
    return (
      <section className={"flex flex-wrap flex-col w-10/12 h-fit mx-auto place-content-start py-32"}>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Profile Picture */}
          <TextInput
            id={"profile_image"}
            key={"profile_image"}
            data={myData.userData.profile_image ?? ""}
            placeholder={"e.g. https://upload.wikimedia.org/..."}
            onChange={handleTextInputChange}
            type={"url"}
            maxLength={200}
          >
            Profile Picture
          </TextInput>
          {/* Display Name */}
          <TextInput
            id={"display_name"}
            key={"display_name"}
            data={myData.userData.display_name ?? ""}
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
            defaultValue={pronouns.filter((option) => option.value === myData.userData.pronoun)}
            onChange={handleSingleSelectInputChange}
          >
            Pronouns
          </SingleSelectInput>
          {/* Short Bio */}
          <TextArea
            id={"about"}
            key={"about"}
            data={myData.userData.about ?? ""}
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
            data={myData.userData.wikidata_qid ?? ""}
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
            data={myData.userData.wiki_alt ?? ""}
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
            options={Object.entries(myData.territoryData).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
            selectedOptions={myData.userData.territory.map((option) => ({ value: option, label: myData.territoryData[option] }))}
            onChange={handleMultiSelectInputChange}
          >
            Territory
          </MultiSelectInput>
          {/* Language */}
          <MultiSelectInput
            id={"language"}
            key={"language"}
            options={Object.entries(myData.languageData).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
            selectedOptions={myData.userData.language.map((option) => ({ value: option, label: myData.languageData[option] }))}
            onChange={handleMultiSelectInputChange}
          >
            Language
          </MultiSelectInput>
          {/* Affilitation */}
          <MultiSelectInput
            id={"affiliation"}
            key={"affiliation"}
            options={Object.entries(myData.affiliationData).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
            selectedOptions={myData.userData.affiliation.map((option) => ({ value: option, label: myData.affiliationData[option] }))}
            onChange={handleMultiSelectInputChange}
          >
            Affilitation
          </MultiSelectInput>
          {/* Wikimedia Project */}
          <MultiSelectInput
            id={"wikimedia_project"}
            key={"wikimedia_project"}
            options={Object.entries(myData.wikiProjectData).map((option) => ({ value: parseInt(option[0]), label: option[1] }))}
            selectedOptions={myData.userData.wikimedia_project.map((option) => ({ value: option, label: myData.wikiProjectData[option] }))}
            onChange={handleMultiSelectInputChange}
          >
            Wikimedia Project
          </MultiSelectInput>
          <SubmitButton updatingData={updatingData}>Update</SubmitButton>
        </form>
      </section>
    )
  }
}