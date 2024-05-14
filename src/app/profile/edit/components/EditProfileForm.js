"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function EditProfileForm(props) {
  const router = useRouter();
  const { status, data } = useSession();
  const [userData, setUserData] = useState({});
  const [formRules, setFormRules] = useState({});
  const [updatingData, setUpdatingData] = useState(false);

  useEffect(() => {
    if (status == "authenticated") {
      const queryData = {
        params: { userId: data.user.id },
        headers: { 'Authorization': `Token ${data.user.token}` }
      }

      async function getUserData() {
        const queryResponse = await axios.get("/api/profile", queryData);
        setUserData(queryResponse.data);
      }
      async function getFormRules() {
        const queryResponse = await axios.options("/api/profile", queryData);
        setFormRules(queryResponse.data);
      }
      getFormRules();
      getUserData();
    }
  }, [status]);

  const handleSubmit = async (e) => {
    setUpdatingData(true);
    if (status == "authenticated") {
      e.preventDefault();
      const queryResponse = await axios.post("/api/profile",
        userData,
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
    if (Object.keys(userData).length > 0) {
      return (
        <section className={"flex flex-wrap flex-col w-10/12 h-fit mx-auto place-content-start py-32"}>
          <form onSubmit={handleSubmit} className="w-full">
            <button type="submit" disabled={updatingData}>Update</button>
          </form>
        </section>
      )
    }
  }
}