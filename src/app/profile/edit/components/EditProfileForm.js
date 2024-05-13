"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function EditProfileForm(props) {
  const router = useRouter();
  const { status, data } = useSession();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (status == "authenticated") {
      async function getUserData() {
        const queryResponse = await axios.get("/api/profile", {
          params: {
            userId: data.user.id,
          },
          headers: {
            'Authorization': `Token ${data.user.token}`,
          }
        });
        setUserData(queryResponse.data);
      }
      getUserData();
    }
  }, [status]);

  const handleSubmit = async (e) => {
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
        router.push("/profile");
      });
    }
  };

  return (
    <section className={"flex flex-wrap flex-col w-10/12 h-fit mx-auto place-content-start py-32"}>
      <form onSubmit={handleSubmit}>
        <button type="submit">Update</button>
      </form>
    </section>
  )
}