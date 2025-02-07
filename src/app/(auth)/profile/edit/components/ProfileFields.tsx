"use client";

import { Profile } from "@/types/profile";
import Select from "react-select";
import { Territory } from "@/types/territory";
import { Language } from "@/types/language";
import { Affiliation } from "@/types/affiliation";
import { WikimediaProject } from "@/types/wikimediaProject";
import LanguageList from "./LanguageList";
import Image from "next/image";
import WikiIcon from "@/public/static/images/wikimedia_logo_black.svg";
import WikiIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import AffiliationIcon from "@/public/static/images/affiliation.svg";
import AffiliationIconWhite from "@/public/static/images/affiliation_white.svg";
import ArrowDownIcon from "@/public/static/images/arrow_drop_down_circle.svg";
import ArrowDownIconWhite from "@/public/static/images/arrow_drop_down_circle_white.svg";
import TerritoryIcon from "@/public/static/images/territory.svg";
import TerritoryIconWhite from "@/public/static/images/territory_white.svg";
import AddIcon from "@/public/static/images/add.svg";
import AddIconDark from "@/public/static/images/add_dark.svg";
import BaseButton from "@/components/BaseButton";

interface LanguageProficiency {
  id: number;
  proficiency: string;
}

interface ProfileFieldsProps {
  formData: Partial<Profile>;
  onFieldChange: (field: keyof Profile, value: any) => void;
  territories: Territory[];
  languages: Language[];
  affiliations: Affiliation[];
  wikimediaProjects: WikimediaProject[];
  darkMode: boolean;
  isMobile: boolean;
}

export default function ProfileFields({
  formData,
  onFieldChange,
  territories,
  languages,
  affiliations,
  wikimediaProjects,
  darkMode,
  isMobile,
}: ProfileFieldsProps) {
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: darkMode ? "#1F2937" : "white",
      borderColor: darkMode ? "#4B5563" : "#D1D5DB",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: darkMode ? "#1F2937" : "white",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? darkMode
          ? "#374151"
          : "#F3F4F6"
        : "transparent",
      color: darkMode ? "white" : "#053749",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: darkMode ? "white" : "#053749",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: darkMode ? "#374151" : "#E5E7EB",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: darkMode ? "white" : "#053749",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: darkMode ? "white" : "#053749",
      ":hover": {
        backgroundColor: darkMode ? "#4B5563" : "#D1D5DB",
      },
    }),
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...(formData.language || [])];
    newLanguages.splice(index, 1);
    onFieldChange("language", newLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <LanguageList
          formData={formData}
          languages={languages}
          darkMode={darkMode}
          onUpdateFormData={onFieldChange}
          onRemoveLanguage={handleRemoveLanguage}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={darkMode ? WikiIconWhite : WikiIcon}
            alt="Alternative account icon"
            width={20}
            height={20}
          />
          <h2
            className={`font-[Montserrat] text-[14px] font-bold ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            Alternative Wikimedia Account
          </h2>
        </div>
        <input
          type="text"
          id="wiki_alt"
          placeholder="Insert item"
          value={formData.wiki_alt || ""}
          onChange={(e) => onFieldChange("wiki_alt", e.target.value)}
          className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] ${
            darkMode
              ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
              : "border-[#053749] text-[#829BA4]"
          } border`}
        />
        <span
          className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Share another Wikimedia username if you have one.
        </span>
      </div>
      {/* Affiliation */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={darkMode ? AffiliationIconWhite : AffiliationIcon}
            alt="Affiliation icon"
            width={20}
            height={20}
          />
          <h2
            className={`font-[Montserrat] text-[14px] font-bold ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            Affiliation
          </h2>
        </div>
        <div className="relative">
          <select
            value={formData.affiliation?.[0] || ""}
            onChange={(e) =>
              onFieldChange(
                "affiliation",
                e.target.value ? [e.target.value] : []
              )
            }
            className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
              darkMode
                ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                : "border-[#053749] text-[#829BA4]"
            } border`}
          >
            <option value="">Insert item</option>
            {affiliations.map((affiliation) => (
              <option key={affiliation.id} value={affiliation.id}>
                {affiliation.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Image
              src={darkMode ? ArrowDownIconWhite : ArrowDownIcon}
              alt="Select"
              width={20}
              height={20}
            />
          </div>
        </div>
        <span
          className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Select your organization from the dropdown menu.
        </span>
      </div>
      <div className="space-y-2">
        {/* Territory */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={darkMode ? TerritoryIconWhite : TerritoryIcon}
              alt="Territory icon"
              width={20}
              height={20}
            />
            <h2
              className={`font-[Montserrat] text-[14px] font-bold ${
                darkMode ? "text-white" : "text-[#053749]"
              }`}
            >
              Territory
            </h2>
          </div>
          <div className="relative">
            <select
              value={formData.territory?.[0] || ""}
              onChange={(e) =>
                onFieldChange(
                  "territory",
                  e.target.value ? [e.target.value] : []
                )
              }
              className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                darkMode
                  ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                  : "border-[#053749] text-[#829BA4]"
              } border`}
            >
              <option value="">Insert item</option>
              {territories.map((territory) => (
                <option key={territory.id} value={territory.id}>
                  {territory.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src={darkMode ? ArrowDownIconWhite : ArrowDownIcon}
                alt="Select"
                width={20}
                height={20}
              />
            </div>
          </div>
          <span
            className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            Inform your geographic location by region or country.
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {/* Wikimedia Projects */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={darkMode ? WikiIconWhite : WikiIcon}
              alt="Wikimedia projects icon"
              width={20}
              height={20}
            />
            <h2
              className={`font-[Montserrat] text-[14px] font-bold ${
                darkMode ? "text-white" : "text-[#053749]"
              }`}
            >
              Wikimedia Projects
            </h2>
          </div>
          <div className="relative">
            <select
              value={formData.wikimedia_project?.[0] || ""}
              onChange={(e) => {
                if (e.target.value) {
                  onFieldChange("wikimedia_project", [
                    ...(formData.wikimedia_project || []),
                    e.target.value,
                  ]);
                }
              }}
              className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                darkMode
                  ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                  : "border-[#053749] text-[#829BA4]"
              } border`}
            >
              <option value="">Insert project</option>
              {wikimediaProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src={darkMode ? ArrowDownIconWhite : ArrowDownIcon}
                alt="Select"
                width={20}
                height={20}
              />
            </div>
          </div>

          {formData.wikimedia_project?.slice(1).map((project, index) => (
            <div key={index} className="relative">
              <select
                value={project || ""}
                onChange={(e) => {
                  const newProjects = [...(formData.wikimedia_project || [])];
                  newProjects[index + 1] = e.target.value;
                  onFieldChange("wikimedia_project", newProjects);
                }}
                className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                  darkMode
                    ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                    : "border-[#053749] text-[#829BA4]"
                } border`}
              >
                <option value="">Insert project</option>
                {wikimediaProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Image
                  src={darkMode ? ArrowDownIconWhite : ArrowDownIcon}
                  alt="Select"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          ))}

          <BaseButton
            onClick={() => {
              onFieldChange("wikimedia_project", [
                ...(formData.wikimedia_project || []),
                "",
              ]);
            }}
            label="Add more projects"
            customClass={`w-full flex ${
              darkMode
                ? "bg-capx-light-box-bg text-[#04222F]"
                : "bg-[#053749] text-white"
            } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
            imageUrl={darkMode ? AddIconDark : AddIcon}
            imageAlt="Add project"
            imageWidth={20}
            imageHeight={20}
          />
          <span
            className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
              darkMode ? "text-white" : "text-[#053749]"
            }`}
          >
            Inform the Wikimedia Projects you have interest in.
          </span>
        </div>
      </div>
    </div>
  );
}
