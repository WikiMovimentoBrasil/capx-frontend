"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import TextInput from "./TextInput";

export default function EditProfileForm(props) {
  const router = useRouter();
  const { status, data } = useSession();
  const [currentUserData, setCurrentUserData] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [updatingData, setUpdatingData] = useState(false);

  useEffect(() => {
    if (status == "authenticated") {
      const queryData = {
        params: { userId: data.user.id },
        headers: { 'Authorization': `Token ${data.user.token}` }
      }

      async function getUserData() {
        const queryResponse = await axios.get("/api/profile", queryData);
        setCurrentUserData(queryResponse.data);
        setNewUserData(queryResponse.data);
      }
      async function getFormRules() {
        const queryResponse = await axios.options("/api/profile", queryData);
        setFormFields(queryResponse.data);
      }
      getFormRules();
      getUserData();
    }
  }, [status]);

  const defineFormComponent = (field) => {
    if (field.type === "string" || field.type === "url" || field.type === "email") {
      return (
        <TextInput
          id={field.key}
          data={newUserData[field.key] ?? ""}
          placeholder={""}
          onChange={handleTextInputChange}
          type={field.type === "string" ? "text" : field.type}
        >
          {field.label}
        </TextInput>
      )
    }
  }

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSelectInputChange = (selectedOption, element) => {
    setNewUserData({ ...newUserData, [element.name]: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    setUpdatingData(true);
    if (status == "authenticated") {
      e.preventDefault();
      const queryResponse = await axios.post("/api/profile",
        newUserData,
        {
          headers: {
            'Authorization': `Token ${data.user.token}`,
          }
        }
      ).then(() => {
        setUpdatingData(false);
        router.push("/profile");
      });
    }
  };

  if (status === "authenticated") {
    return (
      <section className={"flex flex-wrap flex-col w-10/12 h-fit mx-auto place-content-start py-32"}>
        <form onSubmit={handleSubmit} className="w-full">
          {formFields.map(field => (
            defineFormComponent(field)
          ))}
          <button type="submit" disabled={updatingData}>Update</button>
        </form>
      </section>
    )
  }
}