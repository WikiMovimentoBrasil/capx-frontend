"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface CookieData {
  name: string;
  value: string;
  options?: {
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
  };
}

export async function setCookie(data: CookieData) {
  try {
    cookies().set(data.name, data.value, data.options);
    // Revalidate the path that uses this cookie
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error setting cookie:", error);
    return { success: false, error: "Failed to set cookie" };
  }
}

export async function getCookie(name: string) {
  try {
    const cookieValue = cookies().get(name);
    return { success: true, value: cookieValue };
  } catch (error) {
    console.error("Error getting cookie:", error);
    return { success: false, error: "Failed to get cookie" };
  }
}

export async function deleteCookie(name: string) {
  try {
    cookies().delete(name);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting cookie:", error);
    return { success: false, error: "Failed to delete cookie" };
  }
}
