"use client";

import { Profile } from "@/types/profile";
import Select from "react-select";
import { Territory } from "@/types/territory";
import { Language } from "@/types/language";
import { Affiliation } from "@/types/affiliation";
import { WikimediaProject } from "@/types/wikimediaProject";

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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="display_name"
          className={`block text-sm font-medium ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Nome de exibição
        </label>
        <input
          type="text"
          id="display_name"
          value={formData.display_name || ""}
          onChange={(e) => onFieldChange("display_name", e.target.value)}
          className={`w-full rounded-md ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-[#053749]"
          } focus:ring-[#053749] focus:border-[#053749]`}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="about"
          className={`block text-sm font-medium ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Sobre
        </label>
        <textarea
          id="about"
          value={formData.about || ""}
          onChange={(e) => onFieldChange("about", e.target.value)}
          rows={4}
          className={`w-full rounded-md ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-[#053749]"
          } focus:ring-[#053749] focus:border-[#053749]`}
          placeholder="Escreva uma breve descrição sobre você."
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="territory"
          className={`block text-sm font-medium ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Território
        </label>
        <Select
          id="territory"
          options={territories.map((territory) => ({
            value: territory.id,
            label: territory.name,
          }))}
          value={
            territories
              .filter(
                (territory) => territory.id === String(formData.territory)
              )
              .map((territory) => ({
                value: territory.id,
                label: territory.name,
              }))[0]
          }
          onChange={(selected) =>
            onFieldChange("territory", selected ? selected.value : null)
          }
          styles={selectStyles}
          isClearable
          placeholder="Selecione seu território"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="languages"
          className={`block text-sm font-medium ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Idiomas
        </label>
        <Select
          isMulti
          id="languages"
          options={languages.map((language) => ({
            value: language.id,
            label: language.language_name,
          }))}
          value={languages
            .filter((language) =>
              formData.language?.some(
                (lang) => (lang as LanguageProficiency).id === language.id
              )
            )
            .map((language) => ({
              value: language.id,
              label: language.language_name,
            }))}
          onChange={(selected) =>
            onFieldChange(
              "language",
              selected ? selected.map((option) => option.value) : []
            )
          }
          styles={selectStyles}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="affiliations"
          className={`block text-sm font-medium ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Afiliações
        </label>
        <Select
          isMulti
          id="affiliations"
          options={affiliations.map((affiliation) => ({
            value: affiliation.id,
            label: affiliation.name,
          }))}
          value={affiliations
            .filter((affiliation) =>
              formData.affiliation?.includes(affiliation.id.toString())
            )
            .map((affiliation) => ({
              value: affiliation.id,
              label: affiliation.name,
            }))}
          onChange={(selected) =>
            onFieldChange(
              "affiliation",
              selected ? selected.map((option) => option.value) : []
            )
          }
          styles={selectStyles}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="wikimedia_projects"
          className={`block text-sm font-medium ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Projetos Wikimedia
        </label>
        <Select
          isMulti
          id="wikimedia_projects"
          options={wikimediaProjects.map((project) => ({
            value: project.id,
            label: project.name,
          }))}
          value={wikimediaProjects
            .filter((project) =>
              formData.wikimedia_project?.includes(project.id.toString())
            )
            .map((project) => ({
              value: project.id,
              label: project.name,
            }))}
          onChange={(selected) =>
            onFieldChange(
              "wikimedia_project",
              selected ? selected.map((option) => option.value) : []
            )
          }
          styles={selectStyles}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="wiki_alt"
          className={`block text-sm font-medium ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Nome de usuário alternativo
        </label>
        <input
          type="text"
          id="wiki_alt"
          value={formData.wiki_alt || ""}
          onChange={(e) => onFieldChange("wiki_alt", e.target.value)}
          className={`w-full rounded-md ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-[#053749]"
          } focus:ring-[#053749] focus:border-[#053749]`}
          placeholder="Outro nome de usuário Wikimedia"
        />
      </div>
    </div>
  );
}
