"use client";

import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import { useTheme } from "@/contexts/ThemeContext";
import EditIcon from "@/public/static/images/edit.svg";
import UserCircleIcon from "@/public/static/images/supervised_user_circle.svg";
import ReportActivityIcon from "@/public/static/images/report_of_activities.svg";
import { ProfileItem } from "@/components/ProfileItem";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import TargetIcon from "@/public/static/images/target.svg";
import NeurologyIconWhite from "@/public/static/images/neurology_white.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import UserCircleIconWhite from "@/public/static/images/supervised_user_circle_white.svg";
import EditIconWhite from "@/public/static/images/edit_white.svg";
import { ProjectsEventsList } from "../components/ProjectsEventsList";
import { ContactsSection } from "../components/ContactsSection";
import { NewsSection } from "../components/NewsSection";
import { useApp } from "@/contexts/AppContext";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useOrganization } from "@/hooks/useOrganizationProfile";
import { DocumentsList } from "../components/DocumentsList";
import NoAvatarIcon from "@/public/static/images/no_avatar.svg";
import { formatWikiImageUrl } from "@/lib/utils/fetchWikimediaData";
import LoadingState from "@/components/LoadingState";
import { useUserProfile } from "@/hooks/useUserProfile";
import capxPersonIcon from "@/public/static/images/capx_person_icon.svg";
import Popup from "@/components/Popup";

export default function OrganizationProfilePage() {
  const { darkMode } = useTheme();
  const { isMobile, pageContent } = useApp();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [showPopup, setShowPopup] = useState(false);

  const params = useParams();
  const organizationId = Number(params.id);

  const {
    organizations,
    isLoading: isOrganizationLoading,
    error,
    isOrgManager,
    refetch,
  } = useOrganization(token, organizationId);

  const organization = organizations.find((org) => org.id === organizationId);

  useEffect(() => {
    const refreshData = async () => {
      await refetch();
    };

    refreshData();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching organization:", error);
    }
  }, [error, organization]);

  if (isOrganizationLoading) {
    return <LoadingState />;
  }

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
            <div className="flex flex-col gap-6">
              {/* Header Section */}
              <div className="flex flex-col gap-6">
                {/* Content */}
                <div className="w-full space-y-4">
                  <h1
                    className={`font-[Montserrat] text-[16px] md:text-[48px] not-italic font-normal leading-[normal] md:leading-[59px] mb-4 ${
                      darkMode ? "text-capx-dark-text" : "text-capx-light-text"
                    }`}
                  >
                    {pageContent["edit-profile-welcome"]}
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
                      {organization?.display_name || pageContent["loading"]}
                    </span>
                  </div>

                  <p
                    className={`font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] md:leading-[29px] mb-4 ${
                      darkMode ? "text-white" : "text-capx-dark-box-bg"
                    }`}
                  >
                    {/* TODO {pageContent["organization-profile-wiki-subtitle"]}` */}
                  </p>

                  {/* Logo */}
                  <div className="w-full">
                    <div className="w-full h-[78px] bg-[#EFEFEF] flex items-center justify-center">
                      <div className="relative h-[51px] w-[127px]">
                        <Image
                          src={
                            formatWikiImageUrl(
                              organization?.profile_image || ""
                            ) || NoAvatarIcon
                          }
                          alt="Organization logo"
                          fill
                          priority
                          className="object-contain w-full rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  {isOrgManager && (
                    <BaseButton
                      onClick={() =>
                        router.push(
                          `/organization_profile/${organizationId}/edit`
                        )
                      }
                      label={
                        pageContent["body-profile-edit-organization-button"]
                      }
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
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <h2 className="text-[#FFF] font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] text-center">
                    {
                      pageContent[
                        "organization-profile-report-activities-title"
                      ]
                    }
                  </h2>
                  <BaseButton
                    onClick={() => setShowPopup(true)}
                    label={pageContent["organization-profile-click-here"]}
                    customClass="inline-flex h-[32px] px-[19px] py-[8px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[4px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
                  />
                </div>
              </div>

              {/* Capacities Lists */}
              <div className="space-y-6 mt-4">
                <ProfileItem
                  items={organization?.known_capacities || []}
                  icon={darkMode ? NeurologyIconWhite : NeurologyIcon}
                  title={pageContent["body-profile-known-capacities-title"]}
                  customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]`}
                />
                <ProfileItem
                  items={organization?.available_capacities || []}
                  icon={darkMode ? EmojiIconWhite : EmojiIcon}
                  title={pageContent["body-profile-available-capacities-title"]}
                  customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]
                    `}
                />
                <ProfileItem
                  items={organization?.wanted_capacities || []}
                  icon={darkMode ? TargetIconWhite : TargetIcon}
                  title={pageContent["body-profile-wanted-capacities-title"]}
                  customClass={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]
                    `}
                />
              </div>

              {/* Projects and Events */}
              <div className="space-y-6 mt-4">
                <ProjectsEventsList
                  title={pageContent["body-profile-section-title-main-projects"]}
                  type="projects"
                  itemIds={organization?.projects || []}
                  token={token}
                />
                <ProjectsEventsList
                  title={pageContent["body-profile-section-title-events"]}
                  type="events"
                  itemIds={organization?.events || []}
                  token={token}
                />
              </div>

              {/* News Section */}
              <NewsSection ids={organization?.tag_diff || []} />

              {/* Documents Section */}
              <DocumentsList
                title="Documents"
                type="documents"
                items={organization?.documents || []}
                token={token}
              />
              {/* Contacts Section */}
              <ContactsSection
                email={organization?.email || ""}
                meta_page={organization?.meta_page || ""}
                website={organization?.website || ""}
              />
            </div>
          </section>
          {showPopup && (
            <Popup
              onContinue={() => setShowPopup(false)}
              onClose={() => setShowPopup(false)}
              image={capxPersonIcon}
              title={pageContent["component-under-development-dialog"]}
              closeButtonLabel={pageContent["auth-dialog-button-close"]}
              customClass={`${darkMode ? "bg-[#005B3F]" : "bg-white"}`}
            />
          )}
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
                <div className="relative h-[326px] w-[595px] bg-[#EFEFEF] rounded-[16px] flex items-center justify-center">
                  {organization?.profile_image ? (
                    <Image
                      src={
                        formatWikiImageUrl(organization.profile_image) ||
                        NoAvatarIcon
                      }
                      alt="Organization logo"
                      className="object-contain p-24"
                      fill
                      priority
                    />
                  ) : (
                    <div className="w-[595px] h-[326px] bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">
                        {pageContent["logo-not-available"]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="w-full flex flex-col gap-4 justify-center">
                <h1
                  className={`font-[Montserrat] text-[32px] md:text-[48px] not-italic font-normal leading-[normal] md:leading-[59px] mb-4 ${
                    darkMode ? "text-capx-dark-text" : "text-capx-light-text"
                  }`}
                >
                  {pageContent["edit-profile-welcome"]}
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
                    {organization?.display_name}
                  </span>
                </div>

                {/* <p
                  className={`font-[Montserrat] text-[16px] md:text-[20px] not-italic font-normal leading-[normal] md:leading-[29px] mb-4 ${
                    darkMode ? "text-white" : "text-capx-dark-box-bg"
                  }`}
                >
                  TODO
                </p> */}

                {isOrgManager && (
                  <BaseButton
                    onClick={() =>
                      router.push(
                        `/organization_profile/${organizationId}/edit`
                      )
                    }
                    label={pageContent["body-profile-edit-organization-button"]}
                    customClass={`w-full md:w-2/3 sm:w-full font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid] ${
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
                  className="object-contain"
                  width={619}
                  height={271}
                  priority
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-[#FFF] text-[30px] not-italic font-extrabold leading-[37px] mb-6">
                  {pageContent["organization-profile-report-activities-title"]}
                </h2>
                <BaseButton
                  onClick={() => setShowPopup(true)}
                  label={pageContent["organization-profile-click-here"]}
                  customClass="inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal]"
                />
              </div>
            </div>

            {/* Capacities Lists */}
            <div className="space-y-6 mt-4">
              <ProfileItem
                items={organization?.known_capacities || []}
                icon={darkMode ? NeurologyIconWhite : NeurologyIcon}
                title={pageContent["body-profile-known-capacities-title"]}
                customClass={`text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat] ${
                  darkMode ? "text-white" : "text-capx-dark-box-bg"
                }`}
              />
              <ProfileItem
                items={organization?.available_capacities || []}
                icon={darkMode ? EmojiIconWhite : EmojiIcon}
                title={
                  pageContent["body-profile-section-title-available-capacity"]
                }
                customClass={`text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat] ${
                  darkMode ? "text-white" : "text-capx-dark-box-bg"
                }`}
              />
              <ProfileItem
                items={organization?.wanted_capacities || []}
                icon={darkMode ? TargetIconWhite : TargetIcon}
                title={pageContent["body-profile-wanted-capacities-title"]}
                customClass={`text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat] ${
                  darkMode ? "text-white" : "text-capx-dark-box-bg"
                }`}
              />
            </div>

            {/* Projects and Events */}
            <div className="space-y-6 mt-4">
              <ProjectsEventsList
                title={pageContent["body-profile-section-title-main-projects"]}
                type="projects"
                itemIds={organization?.projects || []}
                token={token}
              />
              <ProjectsEventsList
                title={pageContent["body-profile-section-title-events"]}
                type="events"
                itemIds={organization?.events || []}
                token={token}
              />
            </div>

            {/* News Section */}
            <NewsSection ids={organization?.tag_diff || []} />

            {/* Documents Section */}
            <DocumentsList
              title={pageContent["body-profile-section-title-documents"]}
              type="documents"
              items={organization?.documents || []}
              token={token}
            />

            {/* Contacts Section */}
            <ContactsSection
              email={organization?.email || ""}
              meta_page={organization?.meta_page || ""}
              website={organization?.website || ""}
            />
          </div>
        </section>
        {showPopup && (
          <Popup
            onContinue={() => setShowPopup(false)}
            onClose={() => setShowPopup(false)}
            image={capxPersonIcon}
            title={pageContent["component-under-development-dialog"]}
            closeButtonLabel={pageContent["auth-dialog-button-close"]}
            customClass={`${darkMode ? "bg-[#005B3F]" : "bg-white"}`}
          />
        )}
      </div>
    </>
  );
}
