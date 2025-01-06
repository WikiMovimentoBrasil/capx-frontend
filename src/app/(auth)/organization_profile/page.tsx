"use client";

import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import { useTheme } from "@/contexts/ThemeContext";
import EditIcon from "@/public/static/images/edit.svg";
import UserCircleIcon from "@/public/static/images/supervised_user_circle.svg";
import WMBLogo from "@/public/static/images/wmb_logo.svg";
import ReportActivityIcon from "@/public/static/images/report_of_activities.svg";
import { CapacitiesList } from "./components/CapacitiesList";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import TargetIcon from "@/public/static/images/target.svg";
import { ProjectsEventsList } from "./components/ProjectsEventsList";
import { ContactsSection } from "./components/ContactsSection";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { organizationService } from "@/services/organizationProfileService";
import { Organization } from "@/types/organization";
import { useManagerStatus } from "@/hooks/useManagerStatus";

export default function OrganizationProfilePage() {
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user?.name;
  const token = session?.user?.token;
  const { managedOrganizations, isLoading: managerLoading } =
    useManagerStatus(token);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isOrgManager, setIsOrgManager] = useState(false);

  useEffect(() => {
    if (token && managedOrganizations.length > 0) {
      // Pega a primeira organização que o usuário gerencia
      const managedOrg = managedOrganizations[0];

      // Busca os detalhes completos dessa organização
      organizationService
        .fetchOrganization(managedOrg.id, token)
        .then((orgData) => {
          setOrganization(orgData);
          setIsOrgManager(true);
        })
        .catch((error) => {
          console.error(
            "Error fetching organization details:",
            error.response?.data
          );
        });
    }
  }, [token, managedOrganizations]);

  // Se ainda está carregando os dados de manager
  if (managerLoading) {
    return <div>Loading...</div>;
  }

  // Se não é manager de nenhuma organização
  if (!managerLoading && managedOrganizations.length === 0) {
    return <div>You are not a manager of any organization</div>;
  }

  console.log("organization", organization);
  console.log("managedOrganizations", managedOrganizations);

  if (isMobile) {
    return (
      <>
        {/* Wrapper para garantir que o conteúdo não afete a navbar */}
        <div className="relative w-full overflow-x-hidden">
          <section
            className={`w-full max-w-screen-xl mx-auto px-4 py-8 ${
              isMobile ? "mt-[80px]" : "mt-[64px]"
            }`}
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
                      src={UserCircleIcon}
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

                  <p className="font-[Montserrat] text-[12px] not-italic font-normal leading-[normal] md:leading-[29px] mb-4">
                    Grupo de usuários Wiki Movimento Brasil
                  </p>

                  {/* Logo */}
                  <div className="w-full">
                    <Image
                      src={WMBLogo}
                      alt="Organization logo"
                      width={isMobile ? 300 : 595}
                      height={isMobile ? 165 : 326}
                      priority
                      style={{ width: "auto", height: "auto" }}
                      className="w-full rounded-lg"
                    />
                  </div>
                  {isOrgManager && (
                    <BaseButton
                      onClick={() => router.push("/organization_profile/edit")}
                      label="Edit org. profile"
                      customClass={`w-full font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] inline-flex px-[13px] py-[6px] pb-[6px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid] border-capx-dark-box-bg text-capx-light-text`}
                      imageUrl={EditIcon}
                      imageAlt="Edit icon"
                      imageWidth={20}
                      imageHeight={20}
                    />
                  )}
                </div>
              </div>

              {/* Report Activity Image */}
              <div className="w-full h-[242px] flex-shrink-0 rounded-[4px] bg-[var(--Backgrounds-dark-bg,_#04222F)]">
                <Image
                  src={ReportActivityIcon}
                  alt="Report activity icon"
                  width={isMobile ? 343 : 1179}
                  height={isMobile ? 116 : 399}
                  style={{ width: "auto", height: "auto" }}
                  className="w-full p-6"
                />
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
                  icon={NeurologyIcon}
                  title="Known capacities"
                  customClass="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
                />
                <CapacitiesList
                  icon={EmojiIcon}
                  title="Available capacities"
                  customClass="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
                />
                <CapacitiesList
                  icon={TargetIcon}
                  title="Wanted capacities"
                  customClass="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal]"
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

  return (
    <>
      {/* Wrapper para garantir que o conteúdo não afete a navbar */}
      <div className="relative w-full overflow-x-hidden">
        <section
          className={`w-full max-w-screen-xl mx-auto px-4 py-8 ${
            isMobile ? "mt-[80px]" : "mt-[64px]"
          }`}
        >
          <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-row gap-6">
              {/* Logo */}
              <div className="w-full">
                <Image
                  src={WMBLogo}
                  alt="Organization logo"
                  width={isMobile ? 300 : 595}
                  height={isMobile ? 165 : 326}
                  style={{ width: "auto", height: "auto" }}
                  priority
                  className="w-full rounded-lg"
                />
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
                    src={UserCircleIcon}
                    alt="User circle icon"
                    style={{ width: "auto", height: "auto" }}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`text-center font-[Montserrat] text-[20px] md:text-[24px] not-italic font-extrabold leading-[normal] pl-2 ${
                      darkMode ? "text-capx-dark-text" : "text-capx-light-text"
                    }`}
                  >
                    Wiki Movimento Brasil
                  </span>
                </div>

                <p className="font-[Montserrat] text-[16px] md:text-[20px] not-italic font-normal leading-[normal] md:leading-[29px] mb-4">
                  Grupo de usuários Wiki Movimento Brasil
                </p>

                {isOrgManager && (
                  <BaseButton
                    onClick={() => router.push("/organization_profile/edit")}
                    label="Edit organization profile"
                    customClass={`w-2/3 font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid] border-capx-dark-box-bg text-capx-light-text`}
                    imageUrl={EditIcon}
                    imageAlt="Edit icon"
                    imageWidth={32}
                    imageHeight={32}
                  />
                )}
              </div>
            </div>

            {/* Report Activity Image */}
            <div className="flex flex-row justify-between px-[85px] py-[64px] items-center rounded-[4px] bg-[#04222F] w-full h-[399px] flex-shrink-0">
              <div className="w-[619px] h-[271px]">
                <Image
                  src={ReportActivityIcon}
                  alt="Report activity icon"
                  width={619}
                  height={271}
                  style={{ width: "auto", height: "auto" }}
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
                icon={NeurologyIcon}
                title="Known capacities"
                customClass="text-[#003649] text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat]"
              />
              <CapacitiesList
                icon={EmojiIcon}
                title="Available capacities"
                customClass="text-[#003649] text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat]"
              />
              <CapacitiesList
                icon={TargetIcon}
                title="Wanted capacities"
                customClass="text-[#003649] text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat]"
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
