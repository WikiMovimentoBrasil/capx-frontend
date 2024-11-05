import type { DarkModeCookie } from "@/types/cookie";

export const parseDarkMode = (darkMode: DarkModeCookie): boolean => {
  if (typeof darkMode === "object" && "value" in darkMode) {
    return darkMode.value === "true";
  }
  return darkMode === "true";
};
