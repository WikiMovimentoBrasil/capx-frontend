"use client";

import { Profile } from "@/types/profile";
import Select from "react-select";
import { Capacity } from "@/types/capacity";
interface CapacitySectionProps {
  formData: Partial<Profile>;
  onFieldChange: (field: keyof Profile, value: any) => void;
  skills: Capacity[];
  darkMode: boolean;
}

export default function CapacitySection({
  formData,
  onFieldChange,
  skills,
  darkMode,
}: CapacitySectionProps) {
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

  const skillOptions = skills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Capacidades que você conhece
        </h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Selecione habilidades que você já possui no Diretório de Capacidades.
          Tente escolher as mais específicas.
        </p>
        <Select
          isMulti
          options={skillOptions}
          value={skillOptions.filter((option) =>
            formData.skills_known?.includes(option.value)
          )}
          onChange={(selected) =>
            onFieldChange(
              "skills_known",
              selected ? selected.map((option) => option.value) : []
            )
          }
          styles={selectStyles}
          className="mt-1"
        />
      </div>

      <div className="space-y-2">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Capacidades disponíveis para compartilhar
        </h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Das suas capacidades conhecidas, escolha aquelas que você está
          disponível para compartilhar.
        </p>
        <Select
          isMulti
          options={skillOptions.filter((option) =>
            formData.skills_known?.includes(option.value)
          )}
          value={skillOptions.filter((option) =>
            formData.skills_available?.includes(option.value)
          )}
          onChange={(selected) =>
            onFieldChange(
              "skills_available",
              selected ? selected.map((option) => option.value) : []
            )
          }
          styles={selectStyles}
          className="mt-1"
        />
      </div>

      <div className="space-y-2">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-[#053749]"
          }`}
        >
          Capacidades que você quer aprender
        </h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Selecione habilidades que você está querendo aprender no Diretório de
          Capacidades. Tente escolher as mais específicas.
        </p>
        <Select
          isMulti
          options={skillOptions}
          value={skillOptions.filter((option) =>
            formData.skills_wanted?.includes(option.value)
          )}
          onChange={(selected) =>
            onFieldChange(
              "skills_wanted",
              selected ? selected.map((option) => option.value) : []
            )
          }
          styles={selectStyles}
          className="mt-1"
        />
      </div>
    </div>
  );
}
