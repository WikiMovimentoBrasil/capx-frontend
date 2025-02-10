import { signOut } from "next-auth/react";

export async function handleApiResponse(response: Response) {
  const data = await response.json();

  if (response.status === 401 && data.shouldLogout) {
    await signOut({ redirect: true, callbackUrl: "/" });
    return null;
  }

  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }

  return data;
}

export async function fetchFromApi(url: string, options: RequestInit = {}) {
  const response = await fetch(url, options);
  return handleApiResponse(response);
}
