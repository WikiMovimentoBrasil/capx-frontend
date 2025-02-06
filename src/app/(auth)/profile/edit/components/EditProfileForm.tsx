"use client";

import { useState, useEffect } from "react";
import { Profile } from "@/types/profile";
import { fetchWikidataQid, fetchWikidataImage } from "@/lib/utils/wikidata";
import { useAvatars } from "@/hooks/useAvatars";
import AvatarSelector from "./AvatarSelector";
import WikidataSection from "./WikidataSection";
import CapacitySection from "./CapacitySection";
import ProfileFields from "./ProfileFields";
import { Avatar } from "@/types/avatar";
import { Territory } from "@/types/territory";
import { Language } from "@/types/language";
import { Affiliation } from "@/types/affiliation";
import { WikimediaProject } from "@/types/wikimediaProject";
import { Capacity } from "@/types/capacity";

interface EditProfileFormProps {
  profile: Profile;
  updateProfile: (data: any) => Promise<void>;
  refetch: () => Promise<void>;
  skills: Capacity[];
  territories: Territory[];
  languages: Language[];
  affiliations: Affiliation[];
  wikimediaProjects: WikimediaProject[];
  avatars: Avatar[];
  darkMode: boolean;
  isMobile: boolean;
}

export default function EditProfileForm({
  profile,
  updateProfile,
  refetch,
  skills,
  territories,
  languages,
  affiliations,
  wikimediaProjects,
  avatars,
  darkMode,
  isMobile,
}: EditProfileFormProps) {
  const [formData, setFormData] = useState<Partial<Profile>>({
    about: "",
    affiliation: [],
    contact: "",
    display_name: "",
    language: [],
    profile_image: "",
    pronoun: "",
    skills_available: [],
    skills_known: [],
    skills_wanted: [],
    social: [],
    team: "",
    territory: undefined,
    wiki_alt: "",
    wikidata_qid: "",
    wikimedia_project: [],
    avatar: null,
  });

  const [selectedAvatar, setSelectedAvatar] = useState({
    id: 0,
    avatar_url: "",
  });
  const [isWikidataSelected, setIsWikidataSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getAvatarById } = useAvatars();

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        territory: profile.territory || undefined,
      });
      setIsWikidataSelected(!!profile.wikidata_qid);
      if (profile.avatar) {
        getAvatarById(profile.avatar).then((avatar) => {
          setSelectedAvatar({
            id: avatar?.id || 0,
            avatar_url: avatar?.avatar_url || "",
          });
        });
      } else if (profile.profile_image) {
        setSelectedAvatar({
          id: -1,
          avatar_url: profile.profile_image,
        });
      }
    }
  }, [profile]);

  const handleWikidataClick = async () => {
    const newWikidataSelected = !isWikidataSelected;
    setIsWikidataSelected(newWikidataSelected);

    if (profile?.user.username) {
      const wikidataQid = await fetchWikidataQid(profile.user.username);

      if (newWikidataSelected && wikidataQid) {
        const wikidataImage = await fetchWikidataImage(wikidataQid);

        if (wikidataImage) {
          setSelectedAvatar({
            id: -1,
            avatar_url: wikidataImage,
          });

          const updatedData = {
            ...formData,
            profile_image: wikidataImage,
            wikidata_qid: wikidataQid,
            avatar: null,
          };

          setFormData(updatedData);

          try {
            await updateProfile(updatedData);
            await refetch();
          } catch (error) {
            console.error("Error updating profile with Wikidata image:", error);
          }
        }
      } else {
        const updatedData = {
          ...formData,
          profile_image: "",
          wikidata_qid: "",
          avatar: null,
        };

        setSelectedAvatar({
          id: 0,
          avatar_url: "",
        });

        setFormData(updatedData);

        try {
          await updateProfile(updatedData);
          await refetch();
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      await refetch();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: keyof Profile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AvatarSelector
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        avatars={avatars}
        darkMode={darkMode}
        onAvatarSelect={(avatar) => {
          handleFieldChange("avatar", avatar);
          handleFieldChange("profile_image", "");
          handleFieldChange("wikidata_qid", "");
        }}
      />

      <WikidataSection
        isWikidataSelected={isWikidataSelected}
        onWikidataClick={handleWikidataClick}
        darkMode={darkMode}
      />

      <ProfileFields
        formData={formData}
        onFieldChange={handleFieldChange}
        territories={territories}
        languages={languages}
        affiliations={affiliations}
        wikimediaProjects={wikimediaProjects}
        darkMode={darkMode}
        isMobile={isMobile}
      />

      <CapacitySection
        formData={formData}
        onFieldChange={handleFieldChange}
        skills={skills}
        darkMode={darkMode}
      />

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-md transition-colors ${
            darkMode
              ? "bg-white text-black hover:bg-gray-200 disabled:bg-gray-400"
              : "bg-[#053749] text-white hover:bg-[#032836] disabled:bg-gray-400"
          }`}
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
