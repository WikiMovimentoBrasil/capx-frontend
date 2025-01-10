import { Language, LanguageProficiency } from "@/types/language";

export const fetchLanguages = async (token: string): Promise<Language[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/languages/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }

  return response.json();
};

export const updateLanguageProficiency = async (
  token: string,
  userId: number,
  languages: LanguageProficiency[]
): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/${userId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ language: languages }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update language proficiency");
  }
};
