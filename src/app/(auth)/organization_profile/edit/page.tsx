"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useOrganization } from "@/hooks/useOrganizationProfile";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import BaseButton from "@/components/BaseButton";
import Image from "next/image";
import UserCircleIcon from "@/public/static/images/supervised_user_circle.svg";
import UserCircleIconWhite from "@/public/static/images/supervised_user_circle_white.svg";
import WMBLogo from "@/public/static/images/wmb_logo.svg";
import SaveIcon from "@/public/static/images/save_as.svg";
import CancelIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import ReportIcon from "@/public/static/images/report.svg";
import ReportIconWhite from "@/public/static/images/report_white.svg";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import TargetIcon from "@/public/static/images/target.svg";
import CloseIcon from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import CloseIconWhite from "@/public/static/images/close_mobile_menu_icon_dark_mode.svg";
import AddIcon from "@/public/static/images/add_dark.svg";
import AddIconWhite from "@/public/static/images/add.svg";
import WikimediaIcon from "@/public/static/images/wikimedia_logo_black.svg";
import AvatarIcon from "@/public/static/images/avatar.svg";
import { ContactsSection } from "../components/ContactsSection";
import NeurologyIconWhite from "@/public/static/images/neurology_white.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import WikimediaIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import AddLinkIcon from "@/public/static/images/add_link.svg";
import ImagesModeIcon from "@/public/static/images/images_mode.svg";

export default function EditOrganizationProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user?.name;
  const token = session?.user?.token;
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const {
    organization,
    isLoading,
    error,
    fetchOrganization,
    updateOrganization,
  } = useOrganization(token);

  const [formData, setFormData] = useState({
    name: "AMartins (WMB)",
    description: "Grupo de usuários Wiki Movimento Brasil",
    logo_url: "",
    report_link: "",
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

  const [organizationData, setOrganizationData] = useState({
    name: "Wiki Movimento Brasil",
    description: "Grupo de usuários Wiki Movimento Brasil",
    logo_url: "",
    report_link: "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (isMobile) {
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between gap-4 items-center">
                <div className="flex flex-col gap-2">
                  <h1
                    className={`font-[Montserrat] text-[16px] not-italic font-normal leading-[29px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Welcome!
                  </h1>
                  <h2
                    className={`font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    {user}
                  </h2>
                </div>
                <Image
                  src={AvatarIcon}
                  alt="Avatar"
                  width={70}
                  height={70}
                  className="w-auto h-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? UserCircleIconWhite : UserCircleIcon}
                  alt="User circle icon"
                  width={32}
                  height={32}
                />
                <span
                  className={`text-start font-[Montserrat] text-[16px] font-extrabold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  {organizationData?.name}
                </span>
              </div>

              <p
                className={`font-[Montserrat] text-[12px] text-gray-600 ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                {organizationData?.description}
              </p>

              {/* Logo Section */}
              <div className="w-full h-[78px] bg-[#EFEFEF] flex items-center justify-center">
                <div className="relative h-[51px] w-[127px]">
                  <Image
                    src={WMBLogo}
                    alt="Organization logo"
                    width={127}
                    height={51}
                    className="w-full rounded-lg"
                    objectFit="contain"
                    priority
                  />
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex flex-col">
                <BaseButton
                  onClick={() => {}}
                  label="Save profile"
                  customClass="flex bg-[#851970] items-center justify-between text-white px-4 py-2 rounded-md font-[Montserrat] text-[14px] font-bold pb-[6px] w-auto h-auto"
                  imageUrl={SaveIcon}
                  imageAlt="Save icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <BaseButton
                  onClick={() => router.back()}
                  label="Cancel edit"
                  customClass="flex border rounded-[4px] !mb-0 border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#FFF] items-center justify-between text-capx-dark-box-bg px-4 py-2 rounded-md font-[Montserrat] text-[14px] font-bold pb-[6px]"
                  imageUrl={darkMode ? CancelIconWhite : CancelIcon}
                  imageAlt="Cancel icon"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
            </div>
            {/* Report of Activities Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? ReportIconWhite : ReportIcon}
                    alt="Report icon"
                    objectFit="contain"
                  />
                </div>
                <h2 className={`font-[Montserrat] text-[14px] font-bold`}>
                  Report of activities
                </h2>
              </div>
              <input
                type="text"
                placeholder="Insert link"
                className={`w-full p-2 text-[12px] border rounded-md ${
                  darkMode
                    ? "bg-transparent border-white text-white placeholder-gray-400"
                    : "border-gray-300 text-gray-700"
                }`}
                value={formData.report_link}
                onChange={(e) =>
                  setFormData({ ...formData, report_link: e.target.value })
                }
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Please provide a meta link to your report of activities.
              </p>
            </div>

            {/* Capacities Sections */}
            <div className="space-y-6">
              {/* Known Capacities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={darkMode ? NeurologyIconWhite : NeurologyIcon}
                      alt="Neurology icon"
                      objectFit="contain"
                    />
                  </div>
                  <h2
                    className={`font-[Montserrat] text-[14px] font-bold flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Known capacities
                  </h2>
                </div>
                <div
                  className={`flex flex-wrap gap-2 mt-2 px-1 py-[6px] rounded-[4px] ${
                    darkMode
                      ? "text-white bg-[#04222F]"
                      : "text-[#053749] bg-transparent"
                  }`}
                >
                  {formData.capacities.known.map((capacity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-md"
                    >
                      <BaseButton
                        onClick={() => {}}
                        label={capacity}
                        customClass="rounded-[4px] border-[1px] border-[solid] border-[#0070B9] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                        imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                        imageAlt="Close icon"
                        imageWidth={16}
                        imageHeight={16}
                      />
                    </div>
                  ))}
                </div>

                <BaseButton
                  onClick={() => {}}
                  label="Add capacities"
                  customClass={`rounded-[4px] mt-2 flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                    darkMode
                      ? "text-[#053749] bg-[#EFEFEF]"
                      : "text-white bg-capx-dark-box-bg"
                  }`}
                  imageUrl={darkMode ? AddIcon : AddIconWhite}
                  imageAlt="Add icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <p
                  className={`text-[12px] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  } mt-1`}
                >
                  Select skills you already have from the Capacity Directory.
                  Try to choose the most specific ones
                </p>
              </div>

              {/* Available Capacities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={darkMode ? EmojiIconWhite : EmojiIcon}
                      alt="Emoji icon"
                      objectFit="contain"
                    />
                  </div>
                  <h2
                    className={`font-[Montserrat] text-[14px] font-bold flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Available capacities
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div
                    className={`flex flex-wrap gap-2 mt-2 px-1 py-[6px] rounded-[4px] ${
                      darkMode
                        ? "text-white bg-[#04222F]"
                        : "text-[#053749] bg-transparent"
                    }`}
                  >
                    {formData.capacities.available.map((capacity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md"
                      >
                        <BaseButton
                          onClick={() => {}}
                          label={capacity}
                          customClass="rounded-[4px] border-[1px] border-[solid] border-[#05A300] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                          imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                          imageAlt="Close icon"
                          imageWidth={16}
                          imageHeight={16}
                        />
                      </div>
                    ))}
                  </div>
                  <BaseButton
                    onClick={() => {}}
                    label="Add capacities"
                    customClass={`rounded-[4px] mt-2 flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                      darkMode
                        ? "text-[#053749] bg-[#EFEFEF]"
                        : "text-white bg-[#053749]"
                    }`}
                    imageUrl={darkMode ? AddIcon : AddIconWhite}
                    imageAlt="Add icon"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <p
                    className={`text-[12px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    } mt-1`}
                  >
                    Choose the skills you are available to share from your known
                    capacities
                  </p>
                </div>
              </div>

              {/* Wanted Capacities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={darkMode ? TargetIconWhite : TargetIcon}
                      alt="Target icon"
                      objectFit="contain"
                    />
                  </div>
                  <h2
                    className={`font-[Montserrat] text-[14px] font-bold flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Wanted capacities
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div
                    className={`flex flex-wrap gap-2 mt-2 px-1 py-[6px] rounded-[4px] ${
                      darkMode
                        ? "text-white bg-[#04222F]"
                        : "text-[#053749] bg-transparent"
                    }`}
                  >
                    {formData.capacities.wanted.map((capacity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md"
                      >
                        <BaseButton
                          onClick={() => {}}
                          label={capacity}
                          customClass="rounded-[4px] border-[1px] border-[solid] border-[#D43831] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                          imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                          imageAlt="Close icon"
                          imageWidth={16}
                          imageHeight={16}
                        />
                      </div>
                    ))}
                  </div>
                  <BaseButton
                    onClick={() => {}}
                    label="Add capacities"
                    customClass={`rounded-[4px] mt-2 flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                      darkMode
                        ? "text-[#053749] bg-[#EFEFEF]"
                        : "text-white bg-[#053749]"
                    }`}
                    imageUrl={darkMode ? AddIcon : AddIconWhite}
                    imageAlt="Add icon"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <p
                    className={`text-[12px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    } `}
                  >
                    Select skills you are willing to learn from the Capacity
                    Directory. Try to choose the most specific ones
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="Project icon"
                    width={24}
                    height={24}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Main Projects
                </h2>
              </div>

              <div className="flex w-full gap-2 mb-2">
                <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                  <Image
                    src={ImagesModeIcon}
                    alt="Project image icon"
                    width={16}
                    height={16}
                    className="opacity-50"
                  />
                  <input
                    type="text"
                    placeholder="Project Image"
                    className={`w-full bg-transparent border-none outline-none ${
                      darkMode
                        ? "text-white placeholder-gray-400"
                        : "text-[#829BA4] placeholder-[#829BA4]"
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={AddLinkIcon}
                      alt="Add link icon"
                      objectFit="contain"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Link of project"
                    className={`w-full bg-transparent border-none outline-none ${
                      darkMode
                        ? "text-white placeholder-gray-400"
                        : "text-[#829BA4] placeholder-[#829BA4]"
                    }`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-md">
                <BaseButton
                  onClick={() => {}}
                  label="Add projects"
                  customClass={`rounded-[4px] !mb-2 flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                    darkMode
                      ? "text-capx-dark-box-bg bg-[#EFEFEF]"
                      : "text-white bg-capx-dark-box-bg"
                  }`}
                  imageUrl={darkMode ? AddIcon : AddIconWhite}
                  imageAlt="Add icon"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Show the community what your organization is working on. Share
                up to four wikimedia links and their illustrative images' links
                on commons.
              </p>
            </div>

            {/* Events Section */}
            <div className="">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="Event icon"
                    objectFit="contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Events
                </h2>
              </div>

              <div className="flex w-full mb-2 gap-2">
                <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={ImagesModeIcon}
                      alt="Project image icon"
                      objectFit="contain"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Event Image"
                    className={`w-full bg-transparent border-none outline-none ${
                      darkMode
                        ? "text-white placeholder-gray-400"
                        : "text-[#829BA4] placeholder-[#829BA4]"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={AddLinkIcon}
                      alt="Add link icon"
                      objectFit="contain"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Link of project"
                    className={`w-full bg-transparent border-none outline-none ${
                      darkMode
                        ? "text-white placeholder-gray-400"
                        : "text-[#829BA4] placeholder-[#829BA4]"
                    }`}
                  />
                </div>
              </div>

              <BaseButton
                onClick={() => {}}
                label="Add events"
                customClass={`rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] md:text-[16px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-capx-dark-box-bg bg-white"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={20}
                imageHeight={20}
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Display your organization main events. Share up to four
                wikimedia links and their illustrative images' links on commons.
              </p>
            </div>

            {/* News Section */}
            <div className="">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="News icon"
                    objectFit="contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  News
                </h2>
              </div>

              <input
                type="text"
                placeholder="Add a Diff Tag"
                className="w-full p-2 text-[12px] text-[#829BA4] border border-white bg-transparent rounded-md mb-2"
              />

              <BaseButton
                onClick={() => {}}
                label="Add Diff tags"
                customClass={`rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-capx-dark-box-bg bg-white"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={20}
                imageHeight={20}
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Enter Diff tags related to your organization.
              </p>
            </div>

            {/* Documents Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="Document icon"
                    objectFit="contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Documents
                </h2>
              </div>

              <input
                type="text"
                placeholder="Insert link"
                className="w-full p-2 text-[12px] text-[#829BA4] border border-white bg-transparent rounded-md mb-2"
              />

              <BaseButton
                onClick={() => {}}
                label="Add link"
                customClass={`rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-capx-dark-box-bg bg-white"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={20}
                imageHeight={20}
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                You can share up to four links of your organization's documents
                from Wikimedia Commons.
              </p>
            </div>

            {/* Contacts Section */}
            <ContactsSection />

            {/* Save/Cancel Buttons */}
            <div className="flex flex-col gap-2">
              <BaseButton
                onClick={() => {}}
                label="Save profile"
                customClass="flex bg-[#851970] items-center justify-between text-white px-4 py-2 rounded-md font-[Montserrat] text-[14px] font-bold pb-[6px] h-auto w-auto"
                imageUrl={SaveIcon}
                imageAlt="Save icon"
                imageWidth={24}
                imageHeight={24}
              />
              <BaseButton
                onClick={() => router.back()}
                label="Cancel edit"
                customClass="flex border rounded-[4px] border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#FFF] items-center justify-between text-capx-dark-box-bg px-4 py-2 rounded-md font-[Montserrat] text-[14px] font-bold pb-[6px]"
                imageUrl={CancelIcon}
                imageAlt="Cancel icon"
                imageWidth={24}
                imageHeight={24}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div
      className={`relative w-full overflow-x-hidden min-h-screen bg-white dark:bg-[#04222F] ${
        darkMode ? "bg-[#053749] text-white" : "bg-white text-[#053749]"
      }`}
    >
      <section
        className={`w-full mx-auto px-4 py-8 ${
          isMobile ? "mt-[80px]" : "mt-[64px]"
        }`}
      >
        <div className="flex flex-col gap-6 mx-auto">
          {/* Header */}
          <div className="flex flex-row gap-12">
            {/* Logo Section */}
            <div className="w-1/2">
              <div className="rounded-[16px] h-full items-center justify-center flex bg-[#EFEFEF]">
                <div className="relative w-[300px] h-[165px]">
                  <Image
                    src={WMBLogo}
                    alt="Organization logo"
                    objectFit="contain"
                    className="w-full rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="relative w-[114px] h-[114px] mb-[24px]">
                <Image
                  src={AvatarIcon}
                  alt="Avatar"
                  objectFit="contain"
                  className="w-full rounded-lg"
                />
              </div>
              <div
                className={`flex flex-col gap-2 text-[30px] mb-[24px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                <h1
                  className={`font-[Montserrat] not-italic font-normal leading-[29px] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Welcome!
                </h1>
                <h2
                  className={`font-[Montserrat] not-italic font-extrabold leading-[normal] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  {user}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-[42px] h-[42px]">
                  <Image
                    src={darkMode ? UserCircleIconWhite : UserCircleIcon}
                    alt="User circle icon"
                    objectFit="contain"
                  />
                </div>

                <span
                  className={`text-start font-[Montserrat] text-[24px] font-extrabold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  {organizationData?.name}
                </span>
              </div>

              <p
                className={`font-[Montserrat] text-[20px] mt-3 mb-6 ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                {organizationData?.description}
              </p>

              {/* Save/Cancel Buttons */}
              <div className="flex flex-col gap-4">
                <BaseButton
                  onClick={() => {}}
                  label="Save profile"
                  customClass="flex bg-[#851970] items-center justify-between text-white px-4 py-2 rounded-[8px] font-[Montserrat] text-[24px] font-bold !px-[32px] !py-[16px] !w-3/4 h-auto !mb-0"
                  imageUrl={SaveIcon}
                  imageAlt="Save icon"
                  imageWidth={32}
                  imageHeight={32}
                />
                <BaseButton
                  onClick={() => router.back()}
                  label="Cancel edit"
                  customClass="flex border rounded-[4px] border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#FFF] items-center justify-between text-capx-dark-box-bg !px-[32px] !py-[16px] rounded-[8px] font-[Montserrat] text-[24px] w-3/4 font-bold pb-[6px]"
                  imageUrl={CancelIcon}
                  imageAlt="Cancel icon"
                  imageWidth={32}
                  imageHeight={32}
                />
              </div>
            </div>
          </div>
          {/* Report of Activities Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? ReportIconWhite : ReportIcon}
                  alt="Report icon"
                  fill
                  objectFit="contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold`}
              >
                Report of activities
              </h2>
            </div>
            <input
              type="text"
              placeholder="Insert link"
              className={`w-full p-2 md:p-3 text-[24px] border rounded-md ${
                darkMode
                  ? "bg-transparent border-white text-white placeholder-gray-400"
                  : "border-gray-300 text-[#829BA4]"
              }`}
              value={formData.report_link}
              onChange={(e) =>
                setFormData({ ...formData, report_link: e.target.value })
              }
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Please provide a meta link to your report of activities.
            </p>
          </div>

          {/* Capacities Sections */}
          <div className="space-y-6 mt-8">
            {/* Known Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[48px] h-[48px]">
                  <Image
                    src={darkMode ? NeurologyIconWhite : NeurologyIcon}
                    alt="Neurology icon"
                    objectFit="contain"
                    fill
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Known capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 mt-2 px-[12px] py-[24px] rounded-[16px] ${
                  darkMode
                    ? "text-white bg-[#04222F]"
                    : "text-[#053749] bg-transparent"
                }`}
              >
                {formData.capacities.known.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => {}}
                      label={capacity}
                      customClass={`rounded-[4px] border-[1px] border-[solid] border-[#0070B9] flex p-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[24px] not-italic font-normal leading-[normal]`}
                      imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>

              <BaseButton
                onClick={() => {}}
                label="Add capacities"
                customClass={`rounded-[8px] !w-fit mt-2 flex !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
              <p
                className={`text-[20px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Select skills you already have from the Capacity Directory. Try
                to choose the most specific ones
              </p>
            </div>

            {/* Available Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[48px] h-[48px]">
                  <Image
                    src={darkMode ? EmojiIconWhite : EmojiIcon}
                    alt="Emoji icon"
                    objectFit="contain"
                    fill
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Available capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 mt-2 px-[12px] py-[24px] rounded-[16px] ${
                  darkMode
                    ? "text-white bg-[#04222F]"
                    : "text-[#053749] bg-transparent"
                }`}
              >
                {formData.capacities.available.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => {}}
                      label={capacity}
                      customClass={`rounded-[4px] border-[1px] border-[solid] border-[#05A300] flex p-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[24px] not-italic font-normal leading-[normal]`}
                      imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>

              <BaseButton
                onClick={() => {}}
                label="Add capacities"
                customClass={`rounded-[8px] w-fit mt-2 flex !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
              <p
                className={`text-[20px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Choose the skills you are available to share from your known
                capacities
              </p>
            </div>

            {/* Wanted Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[48px] h-[48px]">
                  <Image
                    src={darkMode ? TargetIconWhite : TargetIcon}
                    alt="Target icon"
                    fill
                    objectFit="contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Wanted capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 mt-2 px-[12px] py-[24px] rounded-[16px] ${
                  darkMode
                    ? "text-white bg-[#04222F]"
                    : "text-[#053749] bg-transparent"
                }`}
              >
                {formData.capacities.wanted.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => {}}
                      label={capacity}
                      customClass={`rounded-[4px] border-[1px] border-[solid] border-[#D43831] flex p-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[24px] not-italic font-normal leading-[normal]`}
                      imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>

              <BaseButton
                onClick={() => {}}
                label="Add capacities"
                customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
              <p
                className={`text-[20px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Select skills you are willing to learn from the Capacity
                Directory. Try to choose the most specific ones
              </p>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="Project icon"
                  fill
                  objectFit="contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Main Projects
              </h2>
            </div>

            <div className="flex w-full gap-2 mb-2">
              <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                <div className="relative w-[32px] h-[32px]">
                  <Image
                    src={ImagesModeIcon}
                    alt="Project image icon"
                    objectFit="contain"
                    fill
                  />
                </div>
                <input
                  type="text"
                  placeholder="Project Image"
                  className={`w-full bg-transparent border-none outline-none text-[24px] ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-[#829BA4] placeholder-[#829BA4]"
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                <div className="relative w-[32px] h-[32px]">
                  <Image
                    src={AddLinkIcon}
                    alt="Add link icon"
                    objectFit="contain"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Link of project"
                  className={`w-full bg-transparent border-none outline-none text-[24px] ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-[#829BA4] placeholder-[#829BA4]"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-md">
              <BaseButton
                onClick={() => {}}
                label="Add projects"
                customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
            </div>
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Show the community what your organization is working on. Share up
              to four wikimedia links and their illustrative images' links on
              commons.
            </p>
          </div>

          {/* Events Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="Event icon"
                  fill
                  objectFit="contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Events
              </h2>
            </div>

            <div className="flex w-full mb-2 gap-2">
              <div className="flex items-center gap-2 p-2 text-[12px] md:text-[14px] border rounded-md w-1/2 bg-transparent">
                <div className="relative w-[32px] h-[32px]">
                  <Image
                    src={ImagesModeIcon}
                    alt="Event image icon"
                    objectFit="contain"
                    fill
                  />
                </div>
                <input
                  type="text"
                  placeholder="Event Image"
                  className={`w-full bg-transparent border-none outline-none text-[24px] ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-[#829BA4] placeholder-[#829BA4]"
                  }`}
                />
              </div>
              <div className="flex items-center gap-2 p-2 text-[12px] md:text-[14px] border rounded-md w-1/2 bg-transparent">
                <div className="relative w-[32px] h-[32px]">
                  <Image
                    src={AddLinkIcon}
                    alt="Add link icon"
                    objectFit="contain"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Link of project"
                  className={`w-full bg-transparent border-none outline-none text-[24px] ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-[#829BA4] placeholder-[#829BA4]"
                  }`}
                />
              </div>
            </div>

            <BaseButton
              onClick={() => {}}
              label="Add events"
              customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                darkMode
                  ? "text-[#053749] bg-[#EFEFEF]"
                  : "text-white bg-capx-dark-box-bg"
              }`}
              imageUrl={darkMode ? AddIcon : AddIconWhite}
              imageAlt="Add icon"
              imageWidth={32}
              imageHeight={32}
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Display your organization main events. Share up to four wikimedia
              links and their illustrative images' links on commons.
            </p>
          </div>

          {/* News Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="News icon"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                News
              </h2>
            </div>

            <input
              type="text"
              placeholder="Add a Diff Tag"
              className={`w-full p-2 md:p-3 text-[24px] border rounded-md mb-2 ${
                darkMode
                  ? "bg-transparent border-white text-white placeholder-gray-400"
                  : "border-white text-[#829BA4] placeholder-[#829BA4]"
              }`}
            />

            <BaseButton
              onClick={() => {}}
              label="Add Diff tags"
              customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                darkMode
                  ? "text-[#053749] bg-[#EFEFEF]"
                  : "text-white bg-capx-dark-box-bg"
              }`}
              imageUrl={darkMode ? AddIcon : AddIconWhite}
              imageAlt="Add icon"
              imageWidth={32}
              imageHeight={32}
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Enter Diff tags related to your organization.
            </p>
          </div>

          {/* Documents Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="Document icon"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Documents
              </h2>
            </div>

            <input
              type="text"
              placeholder="Insert link"
              className={`w-full p-2 md:p-3 text-[24px] border rounded-md mb-2 ${
                darkMode
                  ? "bg-transparent border-white text-white placeholder-gray-400"
                  : "border-white text-[#829BA4] placeholder-[#829BA4]"
              }`}
            />

            <BaseButton
              onClick={() => {}}
              label="Add link"
              customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                darkMode
                  ? "text-[#053749] bg-[#EFEFEF]"
                  : "text-white bg-capx-dark-box-bg"
              }`}
              imageUrl={darkMode ? AddIcon : AddIconWhite}
              imageAlt="Add icon"
              imageWidth={32}
              imageHeight={32}
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              You can share up to four links of your organization's documents
              from Wikimedia Commons.
            </p>
          </div>

          {/* Contacts Section */}
          <ContactsSection />

          {/* Save/Cancel Buttons */}
          <div className="flex flex-row gap-2 mt-6 w-1/2">
            <BaseButton
              onClick={() => {}}
              label="Save profile"
              customClass="flex border w-1/2 rounded-[4px] border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#851970]  items-center justify-between text-white !px-[32px] !py-[16px] rounded-md font-[Montserrat] text-[24px] font-bold pb-[6px]"
              imageUrl={SaveIcon}
              imageAlt="Save icon"
              imageWidth={32}
              imageHeight={32}
            />
            <BaseButton
              onClick={() => router.back()}
              label="Cancel edit"
              customClass="flex border w-1/2 rounded-[4px] border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#FFF] items-center justify-between text-capx-dark-box-bg !px-[32px] !py-[16px] rounded-md font-[Montserrat] text-[24px] font-bold pb-[6px]"
              imageUrl={CancelIcon}
              imageAlt="Cancel icon"
              imageWidth={32}
              imageHeight={32}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
