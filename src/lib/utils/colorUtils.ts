import OrganizationalIcon from "@/public/static/images/corporate_fare.svg";
import CommunicationIcon from "@/public/static/images/communication.svg";
import LearningIcon from "@/public/static/images/local_library.svg";
import CommunityIcon from "@/public/static/images/communities.svg";
import SocialIcon from "@/public/static/images/cheer.svg";
import StrategicIcon from "@/public/static/images/chess_pawn.svg";
import TechnologyIcon from "@/public/static/images/wifi_tethering.svg";

const colorMap: Record<string, string> = {
  organizational: "#0078D4",
  communication: "#BE0078",
  learning: "#00965A",
  community: "#8E44AD",
  social: "#D35400",
  strategic: "#3498DB",
  technology: "#27AE60",
};

export const getHueRotate = (color: string | undefined): string => {
  if (!color) return "0deg";

  // Se a cor for uma das strings predefinidas, pega o hex correspondente
  const hexColor = colorMap[color as keyof typeof colorMap] || color;

  // Remove o # se existir e garante que é uma string
  const hex = String(hexColor).replace("#", "");

  // Verifica se é um código hex válido
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return "0deg";
  }

  // Converte hex para RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Encontra os valores máximo e mínimo
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calcula a matiz
  let h = 0;

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * ((g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h += 360;
  }

  // Retorna o valor em graus
  return `${h}deg`;
};

export const getCapacityColor = (code: string | number): string => {
  // Map capacity codes to their respective colors
  const rootColorMap: Record<string, string> = {
    "10": "capx-directory-blue", // organizational
    "36": "capx-directory-pink", // communication
    "50": "capx-directory-green", // learning
    "56": "capx-directory-purple", // community
    "65": "capx-directory-orange", // social
    "74": "capx-directory-light-blue", // strategic
    "106": "capx-directory-light-green", // technology
  };

  // Return default color if no mapping exists
  return rootColorMap[String(code)] || "#666666";
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
