"use client";

import { useState, useEffect, useCallback } from "react";
import { Profile } from "@/types/profile";
import { fetchWikidataQid, fetchWikidataImage } from "@/lib/utils/wikidata";
import { useAvatars } from "@/hooks/useAvatars";
import ImageProfileSection from "./ImageProfileSection";
import CapacitySection from "./CapacitySection";
import ProfileFields from "./ProfileFields";
import { Avatar } from "@/types/avatar";
import { Territory } from "@/types/territory";
import { Language } from "@/types/language";
import { Affiliation } from "@/types/affiliation";
import { WikimediaProject } from "@/types/wikimediaProject";
import { Capacity } from "@/types/capacity";
import CapacitySelectionModal from "./CapacitySelectionModal";
import MiniBio from "../../components/MiniBio";

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
  const [formData, setFormData] = useState<Partial<Profile>>(() => ({
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
  }));

  const [selectedAvatar, setSelectedAvatar] = useState({
    id: 0,
    avatar_url: "",
  });
  const [isWikidataSelected, setIsWikidataSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCapacityType, setSelectedCapacityType] = useState<
    "known" | "available" | "wanted"
  >("known");
  const [showCapacityModal, setShowCapacityModal] = useState(false);

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

  const handleCapacitySelect = useCallback(
    (capacity: Capacity) => {
      setFormData((prev) => {
        const newFormData = { ...prev };
        const capacityId = Number(capacity.code);
        const key = `skills_${selectedCapacityType}` as
          | "skills_known"
          | "skills_available"
          | "skills_wanted";
        newFormData[key] = [...((prev[key] as number[]) || []), capacityId];
        return newFormData;
      });
      setShowCapacityModal(false);
    },
    [selectedCapacityType]
  );

  const handleAddCapacity = useCallback(
    (type: "known" | "available" | "wanted") => {
      setSelectedCapacityType(type);
      setShowCapacityModal(true);
    },
    []
  );

  const handleRemoveCapacity = (
    type: "known" | "available" | "wanted",
    index: number
  ) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      const key = `skills_${type}` as
        | "skills_known"
        | "skills_available"
        | "skills_wanted";

      if (Array.isArray(newFormData[key])) {
        newFormData[key] = (newFormData[key] as number[]).filter(
          (_, i) => i !== index
        );
      }
      return newFormData;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageProfileSection
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        avatars={avatars}
        darkMode={darkMode}
        isMobile={isMobile}
        username={profile?.user.username || ""}
        onSave={handleSubmit}
        onCancel={() => {}}
        refetch={refetch}
        isWikidataSelected={isWikidataSelected}
        onWikidataClick={handleWikidataClick}
        isSubmitting={isSubmitting}
        handleFieldChange={handleFieldChange}
      />
      <MiniBio about={formData.about || ""} onFieldChange={handleFieldChange} />
      <CapacitySection
        formData={formData}
        onFieldChange={handleFieldChange}
        skills={skills}
        darkMode={darkMode}
        handleAddCapacity={handleAddCapacity}
        handleRemoveCapacity={handleRemoveCapacity}
      />
      <CapacitySelectionModal
        isOpen={showCapacityModal}
        onClose={() => setShowCapacityModal(false)}
        onSelect={handleCapacitySelect}
        title={`Choose ${selectedCapacityType} capacity`}
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
    </form>
  );
}
