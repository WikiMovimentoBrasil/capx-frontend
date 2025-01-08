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
                <h1 className="text-[#053749] font-[Montserrat] text-[16px] not-italic font-normal leading-[29px]">
                  Welcome!
                </h1>
                <h2 className="text-[#053749] font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal]">
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
                src={UserCircleIcon}
                alt="User circle icon"
                width={32}
                height={32}
              />
              <span className="text-start font-[Montserrat] text-[16px] font-extrabold text-[#053749]">
                {organizationData?.name}
              </span>
            </div>

            <p className="font-[Montserrat] text-[12px] text-gray-600">
              {organizationData?.description}
            </p>

            {/* Logo Section */}
            <div className="w-full">
              <Image
                src={WMBLogo}
                alt="Organization logo"
                width={300}
                height={165}
                className="w-full rounded-lg"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>

            {/* Save/Cancel Buttons */}
            <div className="flex flex-col gap-2">
              <BaseButton
                onClick={() => {}}
                label="Save profile"
                customClass="flex bg-[#851970] items-center justify-between text-white px-4 py-2 rounded-md font-[Montserrat] text-[14px] font-bold pb-[6px] w-auto h-auto"
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
          {/* Report of Activities Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={darkMode ? ReportIconWhite : ReportIcon}
                alt="Report icon"
                width={36}
                height={36}
                style={{ width: "auto", height: "auto" }}
              />
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
            <p className="text-[12px] text-gray-500 mt-1">
              Please provide a meta link to your report of activities.
            </p>
          </div>

          {/* Capacities Sections */}
          <div className="space-y-6">
            {/* Known Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={NeurologyIcon}
                  alt="Neurology icon"
                  width={24}
                  height={24}
                />
                <h2 className="font-[Montserrat] text-[14px] font-bold flex items-center gap-2">
                  Known capacities
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.capacities.known.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => {}}
                      label={capacity}
                      customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                      imageUrl={CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
                <BaseButton
                  onClick={() => {}}
                  label="Add capacities"
                  customClass="rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white"
                  imageUrl={AddIcon}
                  imageAlt="Add icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <p className="text-[12px] text-gray-500">
                  Select skills you already have from the Capacity Directory.
                  Try to choose the most specific ones
                </p>
              </div>
            </div>

            {/* Available Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={EmojiIcon}
                  alt="Emoji icon"
                  width={24}
                  height={24}
                />
                <h2 className="font-[Montserrat] text-[14px] font-bold flex items-center gap-2">
                  Available capacities
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.capacities.available.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => {}}
                      label={capacity}
                      customClass="rounded-[4px] border-[1px] border-[solid] border-[#05A300] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                      imageUrl={CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
                <BaseButton
                  onClick={() => {}}
                  label="Add capacities"
                  customClass="rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white"
                  imageUrl={AddIcon}
                  imageAlt="Add icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <p className="text-[12px] text-gray-500">
                  Choose the skills you are available to share from your known
                  capacities
                </p>
              </div>
            </div>

            {/* Wanted Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={TargetIcon}
                  alt="Target icon"
                  width={24}
                  height={24}
                />
                <h2 className="font-[Montserrat] text-[14px] font-bold flex items-center gap-2">
                  Wanted capacities
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.capacities.wanted.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() => {}}
                      label={capacity}
                      customClass="rounded-[4px] border-[1px] border-[solid] border-[#05A300] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                      imageUrl={CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
                <BaseButton
                  onClick={() => {}}
                  label="Add capacities"
                  customClass="rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white"
                  imageUrl={AddIcon}
                  imageAlt="Add icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <p className="text-[12px] text-gray-500">
                  Select skills you are willing to learn from the Capacity
                  Directory. Try to choose the most specific ones
                </p>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={WikimediaIcon}
                alt="Project icon"
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }}
              />
              <h2 className="font-[Montserrat] text-[14px] font-bold">
                Main Projects
              </h2>
            </div>

            <div className="flex w-full gap-4 mb-2">
              <input
                type="text"
                placeholder="Project Image"
                className="flex-1 p-2 text-[12px] border border-capx-dark-box-bg rounded-md w-1/2"
              />
              <input
                type="text"
                placeholder="Link of project"
                className="flex-1 p-2 text-[12px] border border-capx-dark-box-bg rounded-md w-1/2"
              />
            </div>
            <div className="flex items-center gap-1 rounded-md">
              <BaseButton
                onClick={() => {}}
                label="Add projects"
                customClass="rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white"
                imageUrl={AddIcon}
                imageAlt="Add icon"
                imageWidth={20}
                imageHeight={20}
              />
            </div>
            <p className="text-[12px] text-gray-500 mt-1">
              Show the community what your organization is working on. Share up
              to four wikimedia links and their illustrative images' links on
              commons.
            </p>
          </div>

          {/* Events Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={WikimediaIcon}
                alt="Event icon"
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }}
              />
              <h2 className="font-[Montserrat] text-[14px] font-bold">
                Events
              </h2>
            </div>

            <div className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Event image"
                className="flex-1 p-2 text-[12px] border border-capx-dark-box-bg rounded-md w-1/2"
              />
              <input
                type="text"
                placeholder="Link of event"
                className="flex-1 p-2 text-[12px] 
                border border-capx-dark-box-bg rounded-md w-1/2"
              />
            </div>

            <BaseButton
              onClick={() => {}}
              label="Add events"
              customClass="rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white"
              imageUrl={AddIcon}
              imageAlt="Add icon"
              imageWidth={20}
              imageHeight={20}
            />
            <p className="text-[12px] text-gray-500 mt-1">
              Display your organization main events. Share up to four wikimedia
              links and their illustrative images' links on commons.
            </p>
          </div>

          {/* News Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={WikimediaIcon}
                alt="News icon"
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }}
              />
              <h2 className="font-[Montserrat] text-[14px] font-bold">News</h2>
            </div>

            <input
              type="text"
              placeholder="Add a Diff Tag"
              className="w-full p-2 text-[12px] border border-capx-dark-box-bg rounded-md mb-2"
            />

            <BaseButton
              onClick={() => {}}
              label="Add Diff tags"
              customClass="rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white"
              imageUrl={AddIcon}
              imageAlt="Add icon"
              imageWidth={20}
              imageHeight={20}
            />
            <p className="text-[12px] text-gray-500 mt-1">
              Enter Diff tags related to your organization.
            </p>
          </div>

          {/* Documents Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={WikimediaIcon}
                alt="Document icon"
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }}
              />
              <h2 className="font-[Montserrat] text-[14px] font-bold">
                Documents
              </h2>
            </div>

            <input
              type="text"
              placeholder="Insert link"
              className="w-full p-2 text-[12px] border border-capx-dark-box-bg rounded-md mb-2"
            />

            <BaseButton
              onClick={() => {}}
              label="Add link"
              customClass="rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] text-white"
              imageUrl={AddIcon}
              imageAlt="Add icon"
              imageWidth={20}
              imageHeight={20}
            />
            <p className="text-[12px] text-gray-500 mt-1">
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
