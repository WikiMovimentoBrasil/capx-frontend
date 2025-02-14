import OrganizationalIcon from "@/public/static/images/corporate_fare.svg";
import CommunicationIcon from "@/public/static/images/communication.svg";
import LearningIcon from "@/public/static/images/local_library.svg";
import CommunityIcon from "@/public/static/images/communities.svg";
import SocialIcon from "@/public/static/images/cheer.svg";
import StrategicIcon from "@/public/static/images/chess_pawn.svg";
import TechnologyIcon from "@/public/static/images/wifi_tethering.svg";

export const getCapacityColor = (code: string | number): string => {
  // Map capacity codes to their respective colors
  const colorMap: Record<string, string> = {
    "10": "capx-directory-blue", // organizational
    "36": "capx-directory-pink", // communication
    "50": "capx-directory-green", // learning
    "56": "capx-directory-purple", // community
    "65": "capx-directory-orange", // social
    "74": "capx-directory-light-blue", // strategic
    "106": "capx-directory-light-green", // technology
  };

  // Return default color if no mapping exists
  return colorMap[String(code)] || "#666666";
};

export const getCapacityIcon = (code: string | number): string => {
  // Map capacity codes to their respective icon paths
  const iconMap: Record<string, string> = {
    "10": OrganizationalIcon,
    "36": CommunicationIcon,
    "50": LearningIcon,
    "56": CommunityIcon,
    "65": SocialIcon,
    "74": StrategicIcon,
    "106": TechnologyIcon,
  };

  return iconMap[String(code)] || "";
};
