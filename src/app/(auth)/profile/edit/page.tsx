"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import CloseIcon from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import CloseIconWhite from "@/public/static/images/close_mobile_menu_icon_dark_mode.svg";
import AddIcon from "@/public/static/images/add.svg";
import AddIconDark from "@/public/static/images/add_dark.svg";
import ChangeCircleIcon from "@/public/static/images/change_circle.svg";
import ChangeCircleIconWhite from "@/public/static/images/change_circle_white.svg";
import CheckIcon from "@/public/static/images/check_box_outline_blank.svg";
import CheckIconWhite from "@/public/static/images/check_box_outline_blank_light.svg";
import CheckBoxFilledIcon from "@/public/static/images/check_box.svg";
import CheckBoxFilledIconWhite from "@/public/static/images/check_box_light.svg";
import { useState, useEffect, useMemo } from "react";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import NeurologyIconWhite from "@/public/static/images/neurology_white.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIcon from "@/public/static/images/target.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import LanguageIcon from "@/public/static/images/language.svg";
import LanguageIconWhite from "@/public/static/images/language_white.svg";
import WikiIcon from "@/public/static/images/wikimedia_logo_black.svg";
import WikiIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import AffiliationIcon from "@/public/static/images/affiliation.svg";
import AffiliationIconWhite from "@/public/static/images/affiliation_white.svg";
import TerritoryIcon from "@/public/static/images/territory.svg";
import TerritoryIconWhite from "@/public/static/images/territory_white.svg";
import BarCodeIcon from "@/public/static/images/barcode.svg";
import BarCodeIconWhite from "@/public/static/images/barcode_white.svg";
import ArrowDownIcon from "@/public/static/images/arrow_drop_down_circle.svg";
import ArrowDownIconWhite from "@/public/static/images/arrow_drop_down_circle_white.svg";
import AccountBoxIcon from "@/public/static/images/account_box.svg";
import AccountBoxIconWhite from "@/public/static/images/account_box_white.svg";
import AccountCircleIcon from "@/public/static/images/account_circle.svg";
import AccountCircleIconWhite from "@/public/static/images/account_circle_white.svg";
import UploadIcon from "@/public/static/images/upload.svg";
import CancelIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import AvatarSelectionPopup from "../components/AvatarSelectionPopup";
import NoAvatarIcon from "@/public/static/images/no_avatar.svg";
import Avatar1Icon from "@/public/static/images/capx_avatar_1.svg";
import PersonIcon from "@/public/static/images/person_book.svg";
import PersonIconWhite from "@/public/static/images/person_book_white.svg";
import Avatar3Icon from "@/public/static/images/capx_avatar_3.svg";
import Avatar4Icon from "@/public/static/images/capx_avatar_4.svg";
import { useProfile } from "@/hooks/useProfile";
import { useSkills } from "@/hooks/useSkills";
import { useTerritories } from "@/hooks/useTerritories";
import { Profile } from "@/types/profile";
import { useCapacityDetails } from "@/hooks/useCapacityDetails";
import CapacitySelectionModal from "./components/CapacitySelectionModal";
import { Capacity } from "@/types/capacity";
import { useLanguage } from "@/hooks/useLanguage";
import { useAffiliation } from "@/hooks/useAffiliation";
import { useWikimediaProject } from "@/hooks/useWikimediaProject";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const AVATAR_URLS = {
  0: {
    src: NoAvatarIcon.src,
    url: `${BASE_URL}/static/images/no_avatar.svg`,
  },
  1: {
    src: Avatar1Icon.src,
    url: `${BASE_URL}/static/images/capx_avatar_1.svg`,
  },
  3: {
    src: Avatar3Icon.src,
    url: `${BASE_URL}/static/images/capx_avatar_3.svg`,
  },
  4: {
    src: Avatar4Icon.src,
    url: `${BASE_URL}/static/images/capx_avatar_4.svg`,
  },
};

const fetchWikidataQid = async (name: string) => {
  try {
    const wikidataQuery = `
      SELECT ?item ?names ?p18 WHERE {
      VALUES ?names {
        "${name}"
      }
      ?item wdt:P4174 ?names.
      OPTIONAL { ?item wdt:P18 ?p18. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "pt-br,pt,en". }
    }`;
    const encodedQuery = encodeURIComponent(wikidataQuery);
    const response = await fetch(
      `https://query.wikidata.org/sparql?query=${encodedQuery}&format=json`
    );
    const data = await response.json();

    if (data.results.bindings.length > 0) {
      return data.results.bindings[0].item.value.split("/").pop();
    }
    return null;
  } catch (error) {
    console.error("Error fetching Wikidata Qid:", error);
  }
};

const fetchWikidataImage = async (qid: string) => {
  try {
    // First, search for the Wikidata item image
    const sparqlQuery = `
      SELECT ?image WHERE {
        wd:${qid} wdt:P18 ?image.
      }
    `;
    const encodedQuery = encodeURIComponent(sparqlQuery);
    const response = await fetch(
      `https://query.wikidata.org/sparql?query=${encodedQuery}&format=json`
    );
    const data = await response.json();

    if (data.results.bindings.length > 0) {
      return data.results.bindings[0].image.value;
    }
    return null;
  } catch (error) {
    console.error("Error fetching Wikidata image:", error);
    return null;
  }
};

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const username = session?.user?.name;
  const token = session?.user?.token;
  const userId = session?.user?.id;

  console.log(" EditProfilePage session", session);

  const { profile, isLoading, error, updateProfile } = useProfile(
    token,
    Number(userId)
  );
  const { fetchSkills } = useSkills();
  const [skills, setSkills] = useState(null);
  const { territories } = useTerritories(token);
  const { languages, loading: languagesLoading } = useLanguage(token);
  const { affiliations } = useAffiliation(token);
  const { wikimediaProjects } = useWikimediaProject(token);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({
    id: 0,
    src: NoAvatarIcon,
  });
  const [isWikidataSelected, setIsWikidataSelected] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [selectedCapacityType, setSelectedCapacityType] = useState<
    "known" | "available" | "wanted"
  >("known");
  const [formData, setFormData] = useState<Partial<Profile>>({
    about: "",
    affiliation: [],
    contact: "",
    display_name: "",
    language: [],
    profile_image: `${process.env.NEXT_PUBLIC_API_URL}${AVATAR_URLS[0].url}`,
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
  });

  useEffect(() => {
    if (!token || !userId) {
      router.push("/");
    }
  }, [token, userId, router]);

  useEffect(() => {
    const getSkills = async () => {
      const skillsData = await fetchSkills();
      setSkills(skillsData);
    };
    getSkills();
  }, [fetchSkills]);

  // Update formData when profile data is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        affiliation: profile.affiliation ? profile.affiliation : [],
        territory: profile.territory ? profile.territory : undefined,
        profile_image: profile.profile_image || AVATAR_URLS[0].url,
        wikidata_qid: profile.wikidata_qid,
        wikimedia_project: profile.wikimedia_project || [],
        language: profile.language || [],
        skills_known: profile.skills_known || [],
        skills_available: profile.skills_available || [],
        skills_wanted: profile.skills_wanted || [],
      });

      if (profile.profile_image) {
        setSelectedAvatar({
          id: -1,
          src: profile.profile_image,
        });
      } else {
        setSelectedAvatar({
          id: 0,
          src: AVATAR_URLS[0].src,
        });
      }
    }
  }, [profile]);

  const handleSubmit = async () => {
    if (!token) {
      console.error("No token available");
      return;
    }

    try {
      await updateProfile(formData);
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarSelect = (avatarId: number) => {
    const selected = AVATAR_URLS[avatarId as keyof typeof AVATAR_URLS];

    setSelectedAvatar({
      id: avatarId,
      src: selected.src,
    });

    setFormData({
      ...formData,
      profile_image: selected.url,
    });
  };

  const handleWikidataClick = async () => {
    const newWikidataSelected = !isWikidataSelected;
    setIsWikidataSelected(newWikidataSelected);

    if (profile?.user.username) {
      const wikidataQid = await fetchWikidataQid(profile.user.username);

      if (newWikidataSelected && wikidataQid) {
        // Show loading state if necessary
        const wikidataImage = await fetchWikidataImage(wikidataQid); // Usando wikidataQid aqui

        if (wikidataImage) {
          setSelectedAvatar({
            id: -1,
            src: wikidataImage,
          });
          setFormData((prev) => ({
            ...prev,
            profile_image: wikidataImage,
            wikidata_qid: wikidataQid, // Atualiza o campo wikidata_qid
          }));
        } else {
          // If no image found in Wikidata, keep the current image
          console.log("No Wikidata image found");
        }
      } else {
        // Reverting to profile image or default avatar
        if (profile?.profile_image) {
          setSelectedAvatar({
            id: -1,
            src: profile.profile_image,
          });
          setFormData((prev) => ({
            ...prev,
            profile_image: profile.profile_image,
            wikidata_qid: "",
          }));
        } else {
          setSelectedAvatar({
            id: 0,
            src: AVATAR_URLS[0].src,
          });
          setFormData((prev) => ({
            ...prev,
            profile_image: AVATAR_URLS[0].src,
            wikidata_qid: "",
          }));
        }
      }
    }
  };

  useEffect(() => {
    const loadWikidataImage = async () => {
      if (profile?.wikidata_qid && isWikidataSelected) {
        const wikidataImage = await fetchWikidataImage(profile.wikidata_qid);
        if (wikidataImage) {
          setSelectedAvatar({
            id: -1,
            src: wikidataImage,
          });
          setFormData((prev) => ({
            ...prev,
            profile_image: wikidataImage,
          }));
        }
      }
    };

    loadWikidataImage();
  }, [profile?.wikidata_qid, isWikidataSelected]);

  const capacityIds = useMemo(
    () =>
      [
        ...(formData?.skills_known || []),
        ...(formData?.skills_available || []),
        ...(formData?.skills_wanted || []),
      ].map((id) => Number(id)),
    [formData]
  );

  const { getCapacityName } = useCapacityDetails(capacityIds);

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

  const handleRemoveLanguage = (index: number) => {
    if (!formData.language) return;

    setFormData({
      ...formData,
      language: formData.language.filter((_, i) => i !== index),
    });
  };

  const handleAddCapacity = (type: "known" | "available" | "wanted") => {
    setSelectedCapacityType(type);
    setShowCapacityModal(true);
  };

  const handleCapacitySelect = (capacity: Capacity) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      const capacityId = Number(capacity.code);

      switch (selectedCapacityType) {
        case "known":
          newFormData.skills_known = [
            ...(prev.skills_known || []),
            capacityId,
          ] as number[];
          break;
        case "available":
          newFormData.skills_available = [
            ...(prev.skills_available || []),
            capacityId,
          ] as number[];
          break;
        case "wanted":
          newFormData.skills_wanted = [
            ...(prev.skills_wanted || []),
            capacityId,
          ] as number[];
          break;
      }
      return newFormData;
    });
    setShowCapacityModal(false);
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      wikimedia_project: [...(prev.wikimedia_project || []), ""],
    }));
  };

  if (isMobile) {
    return (
      <>
        <div
          className={`relative w-full overflow-x-hidden min-h-screen ${
            darkMode ? "bg-[#053749] text-white" : "bg-white text-[#053749]"
          }`}
        >
          <section
            className={`w-full max-w-screen-xl mx-auto px-4 py-8 ${
              isMobile ? "mt-[80px]" : "mt-[64px]"
            }`}
          >
            <div
              className={`flex flex-col gap-6 ${
                isMobile ? "" : "mx-[80px]"
              } mx-auto`}
            >
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1
                  className={`font-[Montserrat] text-[16px] not-italic font-normal leading-[29px] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Welcome!
                </h1>
                <div className="flex items-center gap-[6px]">
                  <div className="relative w-[24px] h-[24px]">
                    <Image
                      src={
                        darkMode ? AccountCircleIconWhite : AccountCircleIcon
                      }
                      alt="User circle icon"
                      fill
                      objectFit="contain"
                    />
                  </div>

                  <span
                    className={`text-start ${
                      darkMode ? "text-white" : "text-[#053749]"
                    } font-[Montserrat] text-[20px] font-extrabold`}
                  >
                    {username}
                  </span>
                </div>
              </div>

              {/* Image Profile Section */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-1 items-center">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={darkMode ? AccountBoxIconWhite : AccountBoxIcon}
                      alt="Account box icon"
                      fill
                      objectFit="contain"
                    />
                  </div>
                  <h2
                    className={`${
                      darkMode ? "text-white" : "text-[#053749]"
                    } font-[Montserrat] text-[16px] font-bold`}
                  >
                    Image profile
                  </h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <Image
                      src={selectedAvatar.src}
                      alt="Selected avatar"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <BaseButton
                  onClick={() => setShowAvatarPopup(true)}
                  label="Choose avatar"
                  customClass={`w-full flex px-[13px] py-[6px] pb-[6px] items-center rounded-[4px] ${
                    darkMode
                      ? "bg-capx-light-bg text-[#053749]"
                      : "bg-[#053749] text-[#F6F6F6]"
                  } font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0`}
                  imageUrl={darkMode ? ChangeCircleIconWhite : ChangeCircleIcon}
                  imageAlt="Change circle icon"
                  imageWidth={20}
                  imageHeight={20}
                />

                {showAvatarPopup && (
                  <AvatarSelectionPopup
                    onClose={() => setShowAvatarPopup(false)}
                    onSelect={handleAvatarSelect}
                    selectedAvatarId={selectedAvatar.id}
                  />
                )}

                <div className="flex flex-col items-center gap-0">
                  <BaseButton
                    onClick={handleWikidataClick}
                    label="Use Wikidata item"
                    customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-0 pb-[6px] ${
                      darkMode
                        ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                        : "border-[#053749] text-[#829BA4]"
                    } border`}
                    imageUrl={
                      isWikidataSelected
                        ? darkMode
                          ? CheckBoxFilledIconWhite
                          : CheckBoxFilledIcon
                        : darkMode
                        ? CheckIconWhite
                        : CheckIcon
                    }
                    imageAlt="Check icon"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <span
                    className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    I consent displaying my Wikidata item image on CapX profile
                    (if existent).
                  </span>
                </div>
                <div className="flex flex-col gap-[10px] mt-2">
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-[10px] mt-0">
                    <BaseButton
                      onClick={handleSubmit}
                      label="Save profile"
                      customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold !mb-0"
                      imageUrl={UploadIcon}
                      imageAlt="Upload icon"
                      imageWidth={20}
                      imageHeight={20}
                    />
                    <BaseButton
                      onClick={() => router.back()}
                      label="Cancel edit"
                      customClass={`w-full flex items-center px-[13px] py-[6px] pb-[6px] border border-[#053749] text-[#053749] rounded-md py-3 font-bold mb-0 ${
                        darkMode
                          ? "bg-transparent text-[#F6F6F6] border-[#F6F6F6] border-[2px]"
                          : "bg-[#F6F6F6] border-[#053749] text-[#053749]"
                      }`}
                      imageUrl={darkMode ? CancelIconWhite : CancelIcon}
                      imageAlt="Cancel icon"
                      imageWidth={20}
                      imageHeight={20}
                    />
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="relative w-[20px] h-[20px]">
                      <Image
                        src={darkMode ? PersonIconWhite : PersonIcon}
                        alt="Person icon"
                        fill
                        objectFit="contain"
                      />
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <h2
                        className={`font-[Montserrat] text-[14px] font-bold ${
                          darkMode ? "text-white" : "text-[#053749]"
                        }`}
                      >
                        Mini bio
                      </h2>
                    </div>
                  </div>
                  <div className="flex w-full px-[4px] py-[6px] flex-col items-start gap-[14px] rounded-[4px] border-[1px] border-[solid] border-capx-light-bg">
                    <textarea
                      value={formData.about || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, about: e.target.value })
                      }
                      placeholder="Write a short description about yourself."
                      className={`w-full font-[Montserrat] text-[13px] not-italic font-normal leading-[normal] bg-transparent resize-none min-h-[100px] rounded-[4px] border-[1px] border-[solid] border-[#053749] px-[4px] ${
                        darkMode
                          ? "text-white placeholder-gray-400"
                          : "text-[#053749] placeholder-[#829BA4]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-[Montserrat] text-[12px] not-italic font-normal leading-[15px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Select skills you already have from the Capacity Directory.
                    Try to choose the most specific ones.{" "}
                  </span>
                </div>
              </div>

              {/* Capacities Sections */}
              <div className="space-y-6">
                {/* Known Capacities */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={darkMode ? NeurologyIconWhite : NeurologyIcon}
                      alt="Neurology icon"
                      width={20}
                      height={20}
                    />
                    <h2
                      className={`font-[Montserrat] text-[14px] font-bold ${
                        darkMode ? "text-white" : "text-[#053749]"
                      }`}
                    >
                      Known capacities
                    </h2>
                  </div>
                  <div
                    className={`flex flex-wrap gap-2 rounded-[4px] ${
                      darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
                    } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
                  >
                    {formData?.skills_known?.map((capacity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md"
                      >
                        <BaseButton
                          onClick={() => handleRemoveCapacity("known", index)}
                          label={getCapacityName(capacity)}
                          customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                          imageUrl={CloseIcon}
                          imageAlt="Close icon"
                          imageWidth={16}
                          imageHeight={16}
                        />
                      </div>
                    ))}
                  </div>
                  <BaseButton
                    onClick={() => handleAddCapacity("known")}
                    label="Add capacities"
                    customClass={`w-full flex ${
                      darkMode
                        ? "bg-capx-light-box-bg text-[#04222F]"
                        : "bg-[#053749] text-white"
                    } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                    imageUrl={darkMode ? AddIconDark : AddIcon}
                    imageAlt="Add capacity"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <span
                    className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Select skills you already have from the Capacity Directory.
                    Try to choose the most specific ones.
                  </span>
                </div>

                {/* Available Capacities */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={darkMode ? EmojiIconWhite : EmojiIcon}
                      alt="Available capacities icon"
                      width={20}
                      height={20}
                    />
                    <h2
                      className={`font-[Montserrat] text-[14px] font-bold ${
                        darkMode ? "text-white" : "text-[#053749]"
                      }`}
                    >
                      Available capacities
                    </h2>
                  </div>
                  <div
                    className={`flex flex-wrap gap-2 rounded-[4px] ${
                      darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
                    } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
                  >
                    {formData?.skills_available?.map((capacity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md"
                      >
                        <BaseButton
                          onClick={() =>
                            handleRemoveCapacity("available", index)
                          }
                          label={getCapacityName(capacity)}
                          customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                          imageUrl={CloseIcon}
                          imageAlt="Close icon"
                          imageWidth={16}
                          imageHeight={16}
                        />
                      </div>
                    ))}
                  </div>
                  <BaseButton
                    onClick={() => handleAddCapacity("available")}
                    label="Add capacities"
                    customClass={`w-full flex ${
                      darkMode
                        ? "bg-capx-light-box-bg text-[#04222F]"
                        : "bg-[#053749] text-white"
                    } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                    imageUrl={darkMode ? AddIconDark : AddIcon}
                    imageAlt="Add capacity"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <span
                    className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    From your known capacities, choose those you are available
                    to share.
                  </span>
                </div>

                {/* Wanted Capacities */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={darkMode ? TargetIconWhite : TargetIcon}
                      alt="Wanted capacities icon"
                      width={20}
                      height={20}
                    />
                    <h2
                      className={`font-[Montserrat] text-[14px] font-bold ${
                        darkMode ? "text-white" : "text-[#053749]"
                      }`}
                    >
                      Wanted capacities
                    </h2>
                  </div>
                  <div
                    className={`flex flex-wrap gap-2 rounded-[4px] ${
                      darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
                    } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
                  >
                    {formData?.skills_wanted?.map((capacity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md"
                      >
                        <BaseButton
                          onClick={() => handleRemoveCapacity("wanted", index)}
                          label={getCapacityName(capacity)}
                          customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                          imageUrl={CloseIcon}
                          imageAlt="Close icon"
                          imageWidth={16}
                          imageHeight={16}
                        />
                      </div>
                    ))}
                  </div>
                  <BaseButton
                    onClick={() => handleAddCapacity("wanted")}
                    label="Add capacities"
                    customClass={`w-full flex ${
                      darkMode
                        ? "bg-capx-light-box-bg text-[#04222F]"
                        : "bg-[#053749] text-white"
                    } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                    imageUrl={darkMode ? AddIconDark : AddIcon}
                    imageAlt="Add capacity"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <span
                    className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Select skills you are willing to learn from the Capacity
                    Directory. Try to choose the most specific ones.
                  </span>
                </div>

                {/* Languages Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={darkMode ? LanguageIconWhite : LanguageIcon}
                      alt="Language icon"
                      width={20}
                      height={20}
                    />
                    <h2
                      className={`font-[Montserrat] text-[14px] font-bold ${
                        darkMode ? "text-white" : "text-[#053749]"
                      }`}
                    >
                      Languages
                    </h2>
                  </div>

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
                          {languages[lang.id]}
                        </span>
                        <select
                          value={lang.proficiency}
                          onChange={(e) => {
                            const newLanguages = [...(formData.language || [])];
                            newLanguages[index] = {
                              ...newLanguages[index],
                              proficiency: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              language: newLanguages,
                            });
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
                        <button
                          onClick={() => handleRemoveLanguage(index)}
                          className="ml-2"
                        >
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
                          setFormData({
                            ...formData,
                            language: [
                              ...(formData.language || []),
                              { id: Number(e.target.value), proficiency: "3" },
                            ],
                          });
                        }
                      }}
                      className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                        darkMode
                          ? "bg-transparent border-white text-white opacity-50"
                          : "border-[#053749] text-[#829BA4]"
                      } border`}
                    >
                      <option value="">Add language...</option>
                      {Object.entries(languages).map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
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

                {/* Alternative Wikimedia Account */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={darkMode ? WikiIconWhite : WikiIcon}
                      alt="Alternative account icon"
                      width={20}
                      height={20}
                    />
                    <h2
                      className={`font-[Montserrat] text-[12px] font-bold ${
                        darkMode ? "text-white" : "text-[#053749]"
                      }`}
                    >
                      Alternative Wikimedia Account
                    </h2>
                  </div>
                  <input
                    type="text"
                    placeholder="Insert item"
                    value={formData.wiki_alt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wiki_alt: e.target.value,
                      })
                    }
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
                      className={`font-[Montserrat] text-[12px] font-bold ${
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
                        setFormData({
                          ...formData,
                          affiliation: e.target.value ? [e.target.value] : [],
                        })
                      }
                      className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                        darkMode
                          ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                          : "border-[#053749] text-[#829BA4]"
                      } border`}
                    >
                      <option value="">Insert item</option>
                      {Object.entries(affiliations).map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
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
                        setFormData({
                          ...formData,
                          territory: e.target.value ? [e.target.value] : [],
                        })
                      }
                      className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                        darkMode
                          ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                          : "border-[#053749] text-[#829BA4]"
                      } border`}
                    >
                      <option value="">Insert item</option>
                      {Object.entries(territories).map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
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

                {/* Wikidata Item */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={darkMode ? BarCodeIconWhite : BarCodeIcon}
                      alt="Wikidata item icon"
                      width={20}
                      height={20}
                    />
                    <h2
                      className={`font-[Montserrat] text-[14px] font-bold ${
                        darkMode ? "text-white" : "text-[#053749]"
                      }`}
                    >
                      Wikidata Item
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 py-[6px] ">
                    {/* <input
                    type="checkbox"
                    checked={formData.wikidata_qid}
                    onChange={(e) =>
                      setFormData({ ...formData, wikidata_qid: e.target.value })
                    }
                    className="mr-2"
                  />
                  <span className="font-[Montserrat] text-[14px]">
                    Use Wikidata item
                  </span> */}

                    <BaseButton
                      onClick={handleWikidataClick}
                      label="Use Wikidata item"
                      customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-0 pb-[6px] ${
                        darkMode
                          ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                          : "border-[#053749] text-[#829BA4]"
                      } border`}
                      imageUrl={
                        isWikidataSelected
                          ? darkMode
                            ? CheckBoxFilledIconWhite
                            : CheckBoxFilledIcon
                          : darkMode
                          ? CheckIconWhite
                          : CheckIcon
                      }
                      imageAlt="Check icon"
                      imageWidth={20}
                      imageHeight={20}
                    />
                  </div>
                  <span
                    className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    I consent displaying my Wikidata item on CapX profile (if
                    existent).
                  </span>
                </div>

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
                          setFormData({
                            ...formData,
                            wikimedia_project: [
                              ...(formData.wikimedia_project || []),
                              e.target.value,
                            ],
                          });
                        }
                      }}
                      className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                        darkMode
                          ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                          : "border-[#053749] text-[#829BA4]"
                      } border`}
                    >
                      <option value="">Insert project</option>
                      {Object.entries(wikimediaProjects).map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
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

                  {formData.wikimedia_project
                    ?.slice(1)
                    .map((project, index) => (
                      <div key={index} className="relative">
                        <select
                          value={project || ""}
                          onChange={(e) => {
                            const newProjects = [
                              ...(formData.wikimedia_project || []),
                            ];
                            newProjects[index + 1] = e.target.value;
                            setFormData({
                              ...formData,
                              wikimedia_project: newProjects,
                            });
                          }}
                          className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                            darkMode
                              ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                              : "border-[#053749] text-[#829BA4]"
                          } border`}
                        >
                          <option value="">Insert project</option>
                          {Object.entries(wikimediaProjects).map(
                            ([id, name]) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            )
                          )}
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
                    onClick={handleAddProject}
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

              {/* Action Buttons */}
              <div className="flex flex-col gap-[10px] mt-0">
                <BaseButton
                  onClick={handleSubmit}
                  label="Save profile"
                  customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold mb-0"
                  imageUrl={UploadIcon}
                  imageAlt="Upload icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <BaseButton
                  onClick={() => router.back()}
                  label="Cancel edit"
                  customClass={`w-full flex items-center px-[13px] py-[6px] pb-[6px] border ${
                    darkMode
                      ? "border-white text-white"
                      : "border-[#053749] text-[#053749]"
                  } rounded-md py-3 font-bold mb-0`}
                  imageUrl={darkMode ? CancelIconWhite : CancelIcon}
                  imageAlt="Cancel icon"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
            </div>
          </section>
        </div>
        <CapacitySelectionModal
          isOpen={showCapacityModal}
          onClose={() => setShowCapacityModal(false)}
          onSelect={handleCapacitySelect}
          title={`Choose ${selectedCapacityType} capacity`}
        />
      </>
    );
  }

  return (
    <div
      className={`relative w-full overflow-x-hidden min-h-screen ${
        darkMode ? "bg-[#053749] text-white" : "bg-white text-[#053749]"
      }`}
    >
      <section
        className={`w-full max-w-screen-xl mx-auto px-4 py-8 ${
          isMobile ? "mt-[80px]" : "mt-[64px]"
        }`}
      >
        <div
          className={`flex flex-col gap-6 ${
            isMobile ? "" : "mx-[80px]"
          } mx-auto`}
        >
          {/* Image Profile Section */}

          <div className="flex flex-row gap-12">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-row gap-1 items-center">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? AccountBoxIconWhite : AccountBoxIcon}
                    alt="Account box icon"
                    fill
                    objectFit="contain"
                  />
                </div>
                <h2
                  className={`${
                    darkMode ? "text-white" : "text-[#053749]"
                  } font-[Montserrat] text-[16px] font-bold`}
                >
                  Image profile
                </h2>
              </div>

              <div className="flex bg-gray-100 p-4 rounded-lg h-full items-center justify-center">
                <div className="w-48 h-48 mx-auto mb-4 relative flex items-center justify-center">
                  <Image
                    src={selectedAvatar.src}
                    alt="Selected avatar"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-col gap-2">
                <h1
                  className={`font-[Montserrat] text-[24px] not-italic font-normal leading-[29px] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Welcome!
                </h1>
                <div className="flex items-start gap-[6px]">
                  <div className="relative w-[24px] h-[24px]">
                    <Image
                      src={
                        darkMode ? AccountCircleIconWhite : AccountCircleIcon
                      }
                      alt="User circle icon"
                      fill
                      objectFit="contain"
                    />
                  </div>

                  <span
                    className={`text-start ${
                      darkMode ? "text-white" : "text-[#053749]"
                    } font-[Montserrat] text-[20px] font-extrabold`}
                  >
                    {username}
                  </span>
                </div>
              </div>
              <BaseButton
                onClick={() => setShowAvatarPopup(true)}
                label="Choose avatar"
                customClass={`w-full flex px-[13px] py-[6px] pb-[6px] items-center rounded-[4px] ${
                  darkMode
                    ? "bg-capx-light-bg text-[#053749]"
                    : "bg-[#053749] text-[#F6F6F6]"
                } font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0`}
                imageUrl={darkMode ? ChangeCircleIconWhite : ChangeCircleIcon}
                imageAlt="Change circle icon"
                imageWidth={20}
                imageHeight={20}
              />

              {showAvatarPopup && (
                <AvatarSelectionPopup
                  onClose={() => setShowAvatarPopup(false)}
                  onSelect={handleAvatarSelect}
                  selectedAvatarId={selectedAvatar.id}
                />
              )}
              <div className="flex flex-col items-start gap-6">
                <BaseButton
                  onClick={handleWikidataClick}
                  label="Use Wikidata item"
                  customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-0 pb-[6px] ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                  imageUrl={
                    isWikidataSelected
                      ? darkMode
                        ? CheckBoxFilledIconWhite
                        : CheckBoxFilledIcon
                      : darkMode
                      ? CheckIconWhite
                      : CheckIcon
                  }
                  imageAlt="Check icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <span
                  className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  I consent displaying my Wikidata item image on CapX profile
                  (if existent).
                </span>
                <div className="flex flex-col gap-6 mt-0 w-full">
                  <BaseButton
                    onClick={handleSubmit}
                    label="Save profile"
                    customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold mb-0"
                    imageUrl={UploadIcon}
                    imageAlt="Upload icon"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <BaseButton
                    onClick={() => router.back()}
                    label="Cancel edit"
                    customClass={`w-full flex items-center px-[13px] py-[6px] pb-[6px] border border-[#053749] text-[#053749] rounded-md py-3 font-bold mb-0 ${
                      darkMode
                        ? "bg-transparent text-[#F6F6F6] border-[#F6F6F6] border-[2px]"
                        : "bg-[#F6F6F6] border-[#053749] text-[#053749]"
                    }`}
                    imageUrl={darkMode ? CancelIconWhite : CancelIcon}
                    imageAlt="Cancel icon"
                    imageWidth={20}
                    imageHeight={20}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-[10px] mt-2">
            <div className="flex flex-row gap-2 mt-4">
              <div className="relative w-[20px] h-[20px]">
                <Image
                  src={darkMode ? PersonIconWhite : PersonIcon}
                  alt="Person icon"
                  fill
                  objectFit="contain"
                />
              </div>
              <div className="flex flex-row gap-1 items-center">
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Mini bio
                </h2>
              </div>
            </div>
            <div className="flex w-full px-[4px] py-[6px] flex-col items-start gap-[14px] rounded-[4px] border-[1px] border-[solid] border-capx-light-bg">
              <textarea
                value={formData.about || ""}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                placeholder="Write a short description about yourself."
                className={`w-full font-[Montserrat] text-[13px] not-italic font-normal leading-[normal] p-2 bg-transparent resize-none min-h-[100px] rounded-[4px] border-[1px] border-[solid] border-[#053749] px-[4px] ${
                  darkMode
                    ? "text-white placeholder-gray-400"
                    : "text-[#053749] placeholder-[#829BA4]"
                }`}
              />
            </div>
            <span
              className={`font-[Montserrat] text-[12px] not-italic font-normal leading-[15px] ${
                darkMode ? "text-white" : "text-[#053749]"
              }`}
            >
              Select skills you already have from the Capacity Directory. Try to
              choose the most specific ones.{" "}
            </span>
          </div>

          {/* Capacities Sections */}
          <div className="space-y-6">
            {/* Known Capacities */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? NeurologyIconWhite : NeurologyIcon}
                  alt="Neurology icon"
                  width={20}
                  height={20}
                />
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Known capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 rounded-[4px] ${
                  darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
                } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
              >
                {formData?.skills_known?.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => handleRemoveCapacity("known", index)}
                      label={getCapacityName(capacity)}
                      customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                      imageUrl={CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>
              <BaseButton
                onClick={() => handleAddCapacity("known")}
                label="Add capacities"
                customClass={`w-full flex ${
                  darkMode
                    ? "bg-capx-light-box-bg text-[#04222F]"
                    : "bg-[#053749] text-white"
                } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                imageUrl={darkMode ? AddIconDark : AddIcon}
                imageAlt="Add capacity"
                imageWidth={20}
                imageHeight={20}
              />
              <span
                className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Select skills you already have from the Capacity Directory. Try
                to choose the most specific ones.
              </span>
            </div>

            {/* Available Capacities */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? EmojiIconWhite : EmojiIcon}
                  alt="Available capacities icon"
                  width={20}
                  height={20}
                />
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Available capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 rounded-[4px] ${
                  darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
                } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
              >
                {formData?.skills_available?.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => handleRemoveCapacity("available", index)}
                      label={getCapacityName(capacity)}
                      customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                      imageUrl={CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>
              <BaseButton
                onClick={() => handleAddCapacity("available")}
                label="Add capacities"
                customClass={`w-full flex ${
                  darkMode
                    ? "bg-capx-light-box-bg text-[#04222F]"
                    : "bg-[#053749] text-white"
                } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                imageUrl={darkMode ? AddIconDark : AddIcon}
                imageAlt="Add capacity"
                imageWidth={20}
                imageHeight={20}
              />
              <span
                className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                From your known capacities, choose those you are available to
                share.
              </span>
            </div>

            {/* Wanted Capacities */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? TargetIconWhite : TargetIcon}
                  alt="Wanted capacities icon"
                  width={20}
                  height={20}
                />
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Wanted capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 rounded-[4px] ${
                  darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
                } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
              >
                {formData?.skills_wanted?.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => handleRemoveCapacity("wanted", index)}
                      label={getCapacityName(capacity)}
                      customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                      imageUrl={CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>
              <BaseButton
                onClick={() => handleAddCapacity("wanted")}
                label="Add capacities"
                customClass={`w-full flex ${
                  darkMode
                    ? "bg-capx-light-box-bg text-[#04222F]"
                    : "bg-[#053749] text-white"
                } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                imageUrl={darkMode ? AddIconDark : AddIcon}
                imageAlt="Add capacity"
                imageWidth={20}
                imageHeight={20}
              />
              <span
                className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Select skills you are willing to learn from the Capacity
                Directory. Try to choose the most specific ones.
              </span>
            </div>

            {/* Languages Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? LanguageIconWhite : LanguageIcon}
                  alt="Language icon"
                  width={20}
                  height={20}
                />
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Languages
                </h2>
              </div>

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
                      {languages[lang.id]}
                    </span>
                    <select
                      value={lang.proficiency}
                      onChange={(e) => {
                        const newLanguages = [...(formData.language || [])];
                        newLanguages[index] = {
                          ...newLanguages[index],
                          proficiency: e.target.value,
                        };
                        setFormData({
                          ...formData,
                          language: newLanguages,
                        });
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
                    <button
                      onClick={() => handleRemoveLanguage(index)}
                      className="ml-2"
                    >
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
                      setFormData({
                        ...formData,
                        language: [
                          ...(formData.language || []),
                          { id: Number(e.target.value), proficiency: "3" },
                        ],
                      });
                    }
                  }}
                  className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                >
                  <option value="">Add language...</option>
                  {Object.entries(languages).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
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

            {/* Alternative Wikimedia Account */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? WikiIconWhite : WikiIcon}
                  alt="Alternative account icon"
                  width={20}
                  height={20}
                />
                <h2
                  className={`font-[Montserrat] text-[12px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Alternative Wikimedia Account
                </h2>
              </div>
              <input
                type="text"
                placeholder="Insert item"
                value={formData.wiki_alt}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wiki_alt: e.target.value,
                  })
                }
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
                  className={`font-[Montserrat] text-[12px] font-bold ${
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
                    setFormData({
                      ...formData,
                      affiliation: e.target.value ? [e.target.value] : [],
                    })
                  }
                  className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                >
                  <option value="">Insert item</option>
                  {Object.entries(affiliations).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
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
                    setFormData({
                      ...formData,
                      territory: e.target.value ? [e.target.value] : [],
                    })
                  }
                  className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                >
                  <option value="">Insert item</option>
                  {Object.entries(territories).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
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

            {/* Wikidata Item */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? BarCodeIconWhite : BarCodeIcon}
                  alt="Wikidata item icon"
                  width={20}
                  height={20}
                />
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Wikidata Item
                </h2>
              </div>
              <div className="flex items-center gap-2 py-[6px] ">
                {/* <input
                  type="checkbox"
                  checked={formData.wikidata_qid}
                  onChange={(e) =>
                    setFormData({ ...formData, wikidata_qid: e.target.value })
                  }
                  className="mr-2"
                />
                <span className="font-[Montserrat] text-[14px]">
                  Use Wikidata item
                </span> */}

                <BaseButton
                  onClick={handleWikidataClick}
                  label="Use Wikidata item"
                  customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-0 pb-[6px] ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                  imageUrl={
                    isWikidataSelected
                      ? darkMode
                        ? CheckBoxFilledIconWhite
                        : CheckBoxFilledIcon
                      : darkMode
                      ? CheckIconWhite
                      : CheckIcon
                  }
                  imageAlt="Check icon"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
              <span
                className={`text-[12px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                I consent displaying my Wikidata item on CapX profile (if
                existent).
              </span>
            </div>

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
                      setFormData({
                        ...formData,
                        wikimedia_project: [
                          ...(formData.wikimedia_project || []),
                          e.target.value,
                        ],
                      });
                    }
                  }}
                  className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                >
                  <option value="">Insert project</option>
                  {Object.entries(wikimediaProjects).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
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

              {/* Renderiza os campos de seleção adicionais para projetos */}
              {formData.wikimedia_project?.slice(1).map((project, index) => (
                <div key={index} className="relative">
                  <select
                    value={project || ""}
                    onChange={(e) => {
                      const newProjects = [
                        ...(formData.wikimedia_project || []),
                      ];
                      newProjects[index + 1] = e.target.value;
                      setFormData({
                        ...formData,
                        wikimedia_project: newProjects,
                      });
                    }}
                    className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                      darkMode
                        ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                        : "border-[#053749] text-[#829BA4]"
                    } border`}
                  >
                    <option value="">Insert project</option>
                    {Object.entries(wikimediaProjects).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
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
                onClick={handleAddProject}
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

          {/* Action Buttons */}
          <div className="flex flex-row gap-[10px] mt-0">
            <BaseButton
              onClick={handleSubmit}
              label="Save profile"
              customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold mb-0"
              imageUrl={UploadIcon}
              imageAlt="Upload icon"
              imageWidth={20}
              imageHeight={20}
            />
            <BaseButton
              onClick={() => router.back()}
              label="Cancel edit"
              customClass={`w-full flex items-center px-[13px] py-[6px] pb-[6px] border ${
                darkMode
                  ? "border-white text-white"
                  : "border-[#053749] text-[#053749]"
              } rounded-md py-3 font-bold mb-0`}
              imageUrl={darkMode ? CancelIconWhite : CancelIcon}
              imageAlt="Cancel icon"
              imageWidth={20}
              imageHeight={20}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
