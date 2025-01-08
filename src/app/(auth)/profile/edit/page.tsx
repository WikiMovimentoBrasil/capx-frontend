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
import { useState } from "react";
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
/* import Avatar2Icon from "@/public/static/images/capx_avatar_2.svg";
 */
import Avatar3Icon from "@/public/static/images/capx_avatar_3.svg";
import Avatar4Icon from "@/public/static/images/capx_avatar_4.svg";
import { text } from "stream/consumers";

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const username = session?.user?.name;

  const [formData, setFormData] = useState({
    name: username || "",
    useWikidataImage: false,
    languages: ["english", "portuguese"],
    alternativeAccount: "",
    affiliation: "",
    territory: "",
    wikidataItem: false,
    wikimediaProjects: ["wikipedia", "wiktionary", "wikiquote", "wikisource"],
    capacities: {
      known: [
        "communication",
        "advocacy",
        "social skill",
        "budgeting",
        "GLAM",
        "financial reporting",
        "research",
      ],
      available: [
        "communication",
        "advocacy",
        "social skill",
        "budgeting",
        "GLAM",
      ],
      wanted: [
        "communication",
        "advocacy",
        "social skill",
        "budgeting",
        "GLAM",
      ],
    },
  });

  const [selectedAvatar, setSelectedAvatar] = useState({
    id: 0,
    src: NoAvatarIcon,
  });
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const handleAvatarSelect = (avatarId: number) => {
    const avatarMap = {
      0: NoAvatarIcon,
      1: Avatar1Icon,
      3: Avatar3Icon,
      4: Avatar4Icon,
    };

    setSelectedAvatar({
      id: avatarId,
      src: avatarMap[avatarId as keyof typeof avatarMap],
    });
  };

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
        <div className="flex flex-col gap-6 max-w-[600px] mx-auto">
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
                  src={darkMode ? AccountCircleIconWhite : AccountCircleIcon}
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
                onClick={() => {}}
                label="Use Wikidata item image"
                customClass={`w-full flex px-[13px] py-[6px] pb-[6px] items-center rounded-[4px] ${
                  darkMode
                    ? "bg-transparent text-[#F6F6F6] border-[#F6F6F6] border-[2px]"
                    : "bg-[#F6F6F6] border-[#053749] text-[#053749]"
                } font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal]`}
                imageUrl={darkMode ? CheckIconWhite : CheckIcon}
                imageAlt="Check icon"
                imageWidth={20}
                imageHeight={20}
              />
              <span
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                I consent displaying my Wikidata item image on CapX profile (if
                existent).
              </span>
            </div>
            <div className="flex flex-col gap-[10px] mt-2">
              {/* Action Buttons */}
              <div className="flex flex-col gap-6 mt-0">
                <BaseButton
                  onClick={() => {}}
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
                <p
                  className={`font-[Montserrat] text-[13px] not-italic font-normal leading-[normal] p-2 ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Write a short description about yourself.
                </p>
              </div>
              <span
                className={`font-[Montserrat] text-[10px] not-italic font-normal leading-[15px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Select skills you already have from the Capacity Directory. Try
                to choose the most specific ones.{" "}
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
                {formData.capacities.known.map((capacity, index) => (
                  <BaseButton
                    key={index}
                    onClick={() => {}}
                    label={capacity}
                    customClass={`${
                      darkMode
                        ? "text-white bg-transparent"
                        : "text-[#053749] border-[#0070B9] bg-white"
                    } font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] flex p-[4px] justify-center items-center gap-[4px] rounded-[4px] border-[1px] border-[solid] pb-[4px] mb-0`}
                    imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                    imageAlt="Remove capacity"
                    imageWidth={16}
                    imageHeight={16}
                  />
                ))}
              </div>
              <BaseButton
                onClick={() => {}}
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
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
                {formData.capacities.available.map((capacity, index) => (
                  <BaseButton
                    key={index}
                    onClick={() => {}}
                    label={capacity}
                    customClass={`${
                      darkMode
                        ? "text-white bg-transparent"
                        : "text-[#053749] border-[#05A300] bg-white"
                    } font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] flex p-[4px] justify-center items-center gap-[4px] rounded-[4px] border-[1px] border-[solid] pb-[4px] mb-0`}
                    imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                    imageAlt="Remove capacity"
                    imageWidth={16}
                    imageHeight={16}
                  />
                ))}
              </div>
              <BaseButton
                onClick={() => {}}
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
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
                {formData.capacities.wanted.map((capacity, index) => (
                  <BaseButton
                    key={index}
                    onClick={() => {}}
                    label={capacity}
                    customClass={`${
                      darkMode
                        ? "text-white bg-transparent"
                        : "text-[#053749] border-[#D43831] bg-white"
                    } font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] flex p-[4px] justify-center items-center gap-[4px] rounded-[4px] border-[1px] border-[solid] pb-[4px] mb-0`}
                    imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                    imageAlt="Remove capacity"
                    imageWidth={16}
                    imageHeight={16}
                  />
                ))}
              </div>
              <BaseButton
                onClick={() => {}}
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
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
                  alt="Languages icon"
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
              <div
                className={`flex flex-wrap gap-2 rounded-[4px] ${
                  darkMode ? "bg-[#04222F]" : "bg-capx-light-bg"
                } flex w-full px-[4px] py-[6px] items-start gap-[12px] rounded-[4px] border-[1px] border-[solid] border-[#053749]`}
              >
                {["english", "portuguese"].map((language, index) => (
                  <BaseButton
                    key={index}
                    onClick={() => {}}
                    label={language}
                    customClass={`${
                      darkMode
                        ? "text-white border-white bg-transparent"
                        : "text-[#053749] border-capx-light-box-bg bg-capx-light-box-bg"
                    } font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] flex p-[4px] justify-center items-center gap-[4px] rounded-[4px] border-[1px] border-[solid] pb-[4px] mb-0`}
                    imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                    imageAlt="Remove language"
                    imageWidth={16}
                    imageHeight={16}
                  />
                ))}
              </div>
              <BaseButton
                onClick={() => {}}
                label="Add languages"
                customClass={`w-full flex ${
                  darkMode
                    ? "bg-capx-light-box-bg text-[#04222F]"
                    : "bg-[#053749] text-white"
                } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                imageUrl={darkMode ? AddIconDark : AddIcon}
                imageAlt="Add language"
                imageWidth={20}
                imageHeight={20}
              />
              <span
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Please list the languages in which you are able to connect.
              </span>
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
                value={formData.alternativeAccount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    alternativeAccount: e.target.value,
                  })
                }
                className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] ${
                  darkMode
                    ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                    : "border-[#053749] text-[#829BA4]"
                } border`}
              />
              <span
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
                  value={formData.affiliation}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliation: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                >
                  <option value="">Insert item</option>
                  {/* Adicionar opções dinâmicas aqui */}
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
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
                  value={formData.territory}
                  onChange={(e) =>
                    setFormData({ ...formData, territory: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-[4px] font-[Montserrat] text-[12px] appearance-none ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                >
                  <option value="">Insert item</option>
                  {/* Adicionar opções dinâmicas aqui */}
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
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
              <div className="flex items-center gap-2 py-[6px] border border-[#053749] rounded-[4px]">
                {/* <input
                  type="checkbox"
                  checked={formData.wikidataItem}
                  onChange={(e) =>
                    setFormData({ ...formData, wikidataItem: e.target.checked })
                  }
                  className="mr-2"
                />
                <span className="font-[Montserrat] text-[14px]">
                  Use Wikidata item
                </span> */}

                <BaseButton
                  onClick={() => {}}
                  label="Use Wikidata item"
                  customClass={`w-full flex justify-between items-center px-[13px] py-[6px] rounded-[4px] font-[Montserrat] text-[12px] appearance-none mb-0 pb-[6px] ${
                    darkMode
                      ? "bg-transparent border-white text-white opacity-50 placeholder-gray-400"
                      : "border-[#053749] text-[#829BA4]"
                  } border`}
                  imageUrl={darkMode ? CheckIconWhite : CheckIcon}
                  imageAlt="Check icon"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
              <span
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      setFormData({
                        ...formData,
                        wikimediaProjects: [
                          ...formData.wikimediaProjects,
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
                  {/* Adicionar opções dinâmicas aqui */}
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
              <BaseButton
                onClick={() => {}}
                label="Add projects"
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
                className={`text-[10px] font-[Montserrat] not-italic font-normal leading-[15px] ${
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
              onClick={() => {}}
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
