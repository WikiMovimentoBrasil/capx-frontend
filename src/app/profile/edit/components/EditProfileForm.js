"use client";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function EditProfileForm(props) {
  const { status, data } = useSession();

  const handleSubmit = async (e) => {
    if (status == "authenticated") {
      e.preventDefault();
      const queryResponse = await axios.post("/api/profile",
        {},
        {
          headers: {
            'Authorization': `Token ${data.user.token}`,
          }
        }
      );
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