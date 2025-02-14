export const getCapacityColor = (code: string | number): string => {
  console.log("getCapacityColor input:", code, typeof code);

  // Map capacity codes to their respective colors
  const colorMap: Record<string, string> = {
    "1": "#0078D4", // organizational
    "2": "#BE0078", // communication
    "3": "#00965A", // learning
    "4": "#8E44AD", // community
    "5": "#D35400", // social
    "6": "#3498DB", // strategic
    "7": "#27AE60", // technology
  };

  // Return default color if no mapping exists
  return colorMap[String(code)] || "#666666";
};

export const getCapacityIcon = (code: string | number): string => {
  console.log("getCapacityIcon input:", code, typeof code);

  // Map capacity codes to their respective icon paths
  const iconMap: Record<string, string> = {
    "1": "/icons/organizational.svg",
    "2": "/icons/communication.svg",
    "3": "/icons/learning.svg",
    "4": "/icons/community.svg",
    "5": "/icons/social.svg",
    "6": "/icons/strategic.svg",
    "7": "/icons/technology.svg",
  };

  return iconMap[String(code)] || "";
};
