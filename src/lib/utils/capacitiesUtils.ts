import OrganizationalIcon from "@/public/static/images/corporate_fare.svg";
import CommunicationIcon from "@/public/static/images/communication.svg";
import LearningIcon from "@/public/static/images/local_library.svg";
import CommunityIcon from "@/public/static/images/communities.svg";
import SocialIcon from "@/public/static/images/cheer.svg";
import StrategicIcon from "@/public/static/images/chess_pawn.svg";
import TechnologyIcon from "@/public/static/images/wifi_tethering.svg";
import { Dispatch, SetStateAction } from "react";

const colorMap: Record<string, string> = {
  organizational: "#0078D4",
  communication: "#BE0078",
  learning: "#00965A",
  community: "#8E44AD",
  social: "#D35400",
  strategic: "#3498DB",
  technology: "#27AE60",
};

const filterMap: Record<string, string> = {
  "#0078D4":
    "invert(46%) sepia(66%) saturate(2299%) hue-rotate(187deg) brightness(102%) contrast(101%)", // organizational
  "#BE0078":
    "invert(21%) sepia(91%) saturate(3184%) hue-rotate(297deg) brightness(89%) contrast(96%)", // communication - novo ajuste para rosa
  "#00965A":
    "invert(48%) sepia(85%) saturate(385%) hue-rotate(115deg) brightness(97%) contrast(101%)", // learning
  "#8E44AD":
    "invert(29%) sepia(67%) saturate(860%) hue-rotate(225deg) brightness(89%) contrast(88%)", // community
  "#D35400":
    "invert(45%) sepia(95%) saturate(1480%) hue-rotate(347deg) brightness(98%) contrast(96%)", // social
  "#3498DB":
    "invert(50%) sepia(80%) saturate(850%) hue-rotate(187deg) brightness(95%) contrast(92%)", // strategic
  "#27AE60":
    "invert(56%) sepia(75%) saturate(436%) hue-rotate(93deg) brightness(132%) contrast(98%)", // technology
};

export const getHueRotate = (color: string | undefined): string => {
  if (!color) return "";

  if (color.startsWith("#")) {
    return filterMap[color];
  }
  // Pegar o filtro baseado no nome da categoria
  const filter = filterMap[colorMap[color]];

  if (filter) {
    return filter;
  }

  return "";
};

export const getCapacityColor = (color: string): string => {
  // Se a cor for uma categoria (ex: "communication"), pegue o hex do colorMap
  const hexColor = colorMap[color];

  return hexColor || color || "#000000";
};

export const getCapacityIcon = (code: number): string => {
  // Pega apenas o código base (antes do ponto, se houver)
  const baseCode = String(code).split(".")[0];

  const iconMap: Record<string, string> = {
    "10": OrganizationalIcon,
    "36": CommunicationIcon,
    "50": LearningIcon,
    "56": CommunityIcon,
    "65": SocialIcon,
    "74": StrategicIcon,
    "106": TechnologyIcon,
  };

  return iconMap[baseCode] || "";
};

export const toggleChildCapacities = async (
  parentCode: string,
  expandedCapacities: Record<string, boolean>,
  setExpandedCapacities: Dispatch<SetStateAction<Record<string, boolean>>>,
  fetchCapacitiesByParent: (code: string) => Promise<any[]>,
  fetchCapacityDescription?: (code: number) => Promise<void>
) => {
  if (expandedCapacities[parentCode]) {
    setExpandedCapacities((prev) => ({ ...prev, [parentCode]: false }));
    return;
  }

  const children = await fetchCapacitiesByParent(parentCode);

  if (fetchCapacityDescription) {
    for (const child of children) {
      if (child.code) {
        fetchCapacityDescription(Number(child.code));
      }
    }
  }

  setExpandedCapacities((prev) => ({ ...prev, [parentCode]: true }));
};
