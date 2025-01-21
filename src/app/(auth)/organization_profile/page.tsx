"use client";

import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import { useTheme } from "@/contexts/ThemeContext";
import EditIcon from "@/public/static/images/edit.svg";
import UserCircleIcon from "@/public/static/images/supervised_user_circle.svg";
import WMBLogo from "@/public/static/images/wmb_logo.svg";
import ReportActivityIcon from "@/public/static/images/report_of_activities.svg";
import { CapacitiesList } from "../../../components/CapacitiesList";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import TargetIcon from "@/public/static/images/target.svg";
import NeurologyIconWhite from "@/public/static/images/neurology_white.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import UserCircleIconWhite from "@/public/static/images/supervised_user_circle_white.svg";
import EditIconWhite from "@/public/static/images/edit_white.svg";
import { ProjectsEventsList } from "./components/ProjectsEventsList";
import { ContactsSection } from "./components/ContactsSection";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useOrganization } from "@/hooks/useOrganizationProfile";

export default function OrganizationProfilePage() {
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { organization, isLoading, error, isOrgManager } =
    useOrganization(token);

  useEffect(() => {
    if (error) {
      console.error("Error fetching organization:", error);
    }
  }, [error]);

  console.log("organization", organization);
  if (isMobile) {
    return (
      <>
        <div
          className={`relative w-full overflow-x-hidden ${
            darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
          }`}
        >
          <section
            className={`w-full max-w-screen-xl mx-auto px-4 py-8 mt-[80px]`}
          >
            <div className="flex flex-col gap-8">
              {/* Header Section */}
              <div className="flex flex-col gap-6">
                {/* Content */}
                <div className="w-full space-y-4">
                  <h1
                    className={`font-[Montserrat] text-[16px] md:text-[48px] not-italic font-normal leading-[normal] md:leading-[59px] mb-4 ${
                      darkMode ? "text-capx-dark-text" : "text-capx-light-text"
                    }`}
                  >
                    Welcome!
                  </h1>

                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src={darkMode ? UserCircleIconWhite : UserCircleIcon}
                      alt="User circle icon"
                      style={{ width: "auto", height: "auto" }}
                      width={isMobile ? 32 : 42}
                      height={isMobile ? 32 : 48}
                    />
                    <span
                      className={`text-start font-[Montserrat] text-[16px] not-italic font-extrabold leading-[normal] pl-2 ${
                        darkMode
                          ? "text-capx-dark-text"
                          : "text-capx-light-text"
                      }`}
                    >
                      {organization?.display_name || "Loading..."}
                    </span>
                  </div>

                  <p
                    className={`font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] md:leading-[29px] mb-4 ${
                      darkMode ? "text-white" : "text-capx-dark-box-bg"
                    }`}
                  >
                    Grupo de usuários Wiki Movimento Brasil
                  </p>

                  {/* Logo */}
                  <div className="w-full">
                    <div className="w-full h-[78px] bg-[#EFEFEF] flex items-center justify-center">
                      <div className="relative h-[51px] w-[127px]">
                        <Image
                          src={WMBLogo}
                          alt="Organization logo"
                          fill
                          priority
                          objectFit="contain"
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  {isOrgManager && (
                    <BaseButton
                      onClick={() => router.push("/organization_profile/edit")}
                      label="Edit org. profile"
                      customClass={`w-full font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] inline-flex px-[13px] py-[6px] pb-[6px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid] ${
                        darkMode
                          ? "border-white text-white"
                          : "border-capx-dark-box-bg text-capx-light-text"
                      }`}
                      imageUrl={darkMode ? EditIconWhite : EditIcon}
                      imageAlt="Edit icon"
                      imageWidth={20}
                      imageHeight={20}
                    />
                  )}
                </div>
              </div>

              {/* Report Activity Image */}
              <div className="w-full flex flex-col flex-shrink-0 rounded-[4px] bg-[#04222F] justify-center items-center p-6">
                <div className="relative w-[220px] h-[96px] mb-[30px]">
                  <Image
                    src={ReportActivityIcon}
                    alt="Report activity icon"
                    objectFit="contain"
                    fill
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <h2 className="text-[#FFF] font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] text-center">
                    Report of activities
                  </h2>
                  <BaseButton
                    onClick={() => {}}
                    label="Click here"
                    customClass="inline-flex h-[32px] px-[19px] py-[8px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[4px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
                  />
                </div>
              </div>

              {/* Capacities Lists */}
              <div className="space-y-6 mt-4">
                <CapacitiesList
                  items={organization?.known_capacities || []}
                  icon={darkMode ? NeurologyIconWhite : NeurologyIcon}
                  title="Known capacities"
                  customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]`}
                />
                <CapacitiesList
                  items={organization?.available_capacities || []}
                  icon={darkMode ? EmojiIconWhite : EmojiIcon}
                  title="Available capacities"
                  customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]
                    `}
                />
                <CapacitiesList
                  items={organization?.wanted_capacities || []}
                  icon={darkMode ? TargetIconWhite : TargetIcon}
                  title="Wanted capacities"
                  customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]
                    `}
                />
              </div>

              {/* Projects and Events */}
              <div className="space-y-6 mt-4">
                <ProjectsEventsList
                  title="Main projects"
                  projectIds={organization?.projects || []}
                  token={token}
                />
                {/*                 <ProjectsEventsList
                  title="Events"
                  items={organization?.events?.map((event) => ({
                    image: event.image,
                    link: event.link,
                  }))}
                /> */}
              </div>

              {/* Contacts Section */}
              <ContactsSection />
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`relative w-full overflow-x-hidden ${
          darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
        }`}
      >
        <section
          className={`w-full max-w-screen-xl mx-auto px-4 py-8 mt-[80px]`}
        >
          <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-row gap-6">
              {/* Logo */}
              <div className="w-full">
                <div className="relative h-[326px] w-[595px]">
                  <Image
                    src={WMBLogo}
                    alt="Organization logo"
                    objectFit="contain"
                    style={{ width: "auto", height: "auto" }}
                    priority
                    className="w-full rounded-lg"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full flex flex-col gap-4 justify-center">
                <h1
                  className={`font-[Montserrat] text-[32px] md:text-[48px] not-italic font-normal leading-[normal] md:leading-[59px] mb-4 ${
                    darkMode ? "text-capx-dark-text" : "text-capx-light-text"
                  }`}
                >
                  Welcome!
                </h1>

                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src={darkMode ? UserCircleIconWhite : UserCircleIcon}
                    alt="User circle icon"
                    style={{ width: "auto", height: "auto" }}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`text-center font-[Montserrat] text-[20px] md:text-[24px] not-italic font-extrabold leading-[normal] pl-2 ${
                      darkMode ? "text-white" : "text-capx-dark-box-bg"
                    }`}
                  >
                    Wiki Movimento Brasil
                  </span>
                </div>

                <p
                  className={`font-[Montserrat] text-[16px] md:text-[20px] not-italic font-normal leading-[normal] md:leading-[29px] mb-4 ${
                    darkMode ? "text-white" : "text-capx-dark-box-bg"
                  }`}
                >
                  Grupo de usuários Wiki Movimento Brasil
                </p>

                {isOrgManager && (
                  <BaseButton
                    onClick={() => router.push("/organization_profile/edit")}
                    label="Edit organization profile"
                    customClass={`w-2/3 font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid] ${
                      darkMode
                        ? "border-white text-white"
                        : "border-capx-dark-box-bg text-capx-light-text"
                    }`}
                    imageUrl={darkMode ? EditIconWhite : EditIcon}
                    imageAlt="Edit icon"
                    imageWidth={32}
                    imageHeight={32}
                  />
                )}
              </div>
            </div>

            {/* Report Activity Image */}
            <div className="flex flex-row justify-between px-[85px] py-[64px] items-center rounded-[4px] bg-[#04222F] w-full h-[399px] flex-shrink-0">
              <div className="relative w-[619px] h-[271px]">
                <Image
                  src={ReportActivityIcon}
                  alt="Report activity icon"
                  objectFit="contain"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-[#FFF] text-[30px] not-italic font-extrabold leading-[37px] mb-6">
                  Report of activities
                </h2>
                <BaseButton
                  onClick={() => {}}
                  label="Click here"
                  customClass="inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal]"
                />
              </div>
            </div>

            {/* Capacities Lists */}
            <div className="space-y-6 mt-4">
              <CapacitiesList
                items={organization?.known_capacities || []}
                icon={darkMode ? NeurologyIconWhite : NeurologyIcon}
                title="Known capacities"
                customClass={`text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat] ${
                  darkMode ? "text-white" : "text-capx-dark-box-bg"
                }`}
              />
              <CapacitiesList
                items={organization?.available_capacities || []}
                icon={darkMode ? EmojiIconWhite : EmojiIcon}
                title="Available capacities"
                customClass={`text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat] ${
                  darkMode ? "text-white" : "text-capx-dark-box-bg"
                }`}
              />
              <CapacitiesList
                items={organization?.wanted_capacities || []}
                icon={darkMode ? TargetIconWhite : TargetIcon}
                title="Wanted capacities"
                customClass={`text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat] ${
                  darkMode ? "text-white" : "text-capx-dark-box-bg"
                }`}
              />
            </div>

            {/* Projects and Events */}
            <div className="space-y-6 mt-4">
              <ProjectsEventsList title="Main projects" />
              <ProjectsEventsList title="Events" />
            </div>

            {/* Contacts Section */}
            <ContactsSection />
          </div>
        </section>
      </div>
    </>
  );
}
