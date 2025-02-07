"use client";

import Image from "next/image";
import { Profile } from "@/types/profile";
import CloseIcon from "@/public/static/images/cancel.svg";
import CloseIconWhite from "@/public/static/images/cancel_white.svg";
import ArrowDownIcon from "@/public/static/images/arrow_drop_down_circle.svg";
import ArrowDownIconWhite from "@/public/static/images/arrow_drop_down_circle_white.svg";
import { Language } from "@/types/language";

interface LanguageListProps {
  formData: Partial<Profile>;
  languages: Language[];
  darkMode: boolean;
  onUpdateFormData: (field: keyof Profile, value: any) => void;
  onRemoveLanguage: (index: number) => void;
}

export default function LanguageList({
  formData,
  languages,
  darkMode,
  onUpdateFormData,
  onRemoveLanguage,
}: LanguageListProps) {
  return (
    <div>
      {/* Language List */}
      <div className="flex flex-wrap gap-2">
        {formData.language?.map((lang, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-2 rounded ${
              darkMode ? "bg-capx-dark-bg" : "bg-[#EFEFEF]"
            }`}
          >
            <span className="font-[Montserrat] text-[12px]">
              {languages.find((l) => l.id === lang.id)?.language_name}
            </span>
            <select
              value={lang.proficiency}
              onChange={(e) => {
                const newLanguages = [...(formData.language || [])];
                newLanguages[index] = {
                  ...newLanguages[index],
                  proficiency: e.target.value,
                };
                onUpdateFormData("language", newLanguages);
              }}
              className={`ml-2 p-1 rounded border ${
                darkMode
                  ? "bg-transparent border-white text-white"
                  : "border-[#053749] text-[#829BA4]"
              }`}
            >
              <option value="0">Not proficient</option>
              <option value="1">Basic</option>
              <option value="2">Intermediate</option>
              <option value="3">Advanced</option>
              <option value="4">Almost native</option>
              <option value="5">Professional proficiency</option>
              <option value="n">Native</option>
            </select>
            <button onClick={() => onRemoveLanguage(index)} className="ml-2">
              <Image
                src={darkMode ? CloseIconWhite : CloseIcon}
                alt="Remove language"
                width={16}
                height={16}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Add Language Select */}
      <div className="relative">
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              onUpdateFormData("language", [
                ...(formData.language || []),
                { id: Number(e.target.value), proficiency: "3" },
              ]);
            }
          }}
          className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
            darkMode
              ? "bg-transparent border-white text-white opacity-50"
              : "border-[#053749] text-[#829BA4]"
          } border`}
        >
          <option value="">Add language...</option>
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.language_name}
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
    </div>
  );
}
