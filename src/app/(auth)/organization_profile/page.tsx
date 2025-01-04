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

export default function OrganizationProfilePage() {
  const { darkMode } = useTheme();

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 py-8">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left column - Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={WMBLogo}
            alt="Organization logo"
            width={595}
            height={326}
            className="w-full rounded-lg"
          />
        </div>

        {/* Right column - Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1
                className={`font-[Montserrat] text-[48px] not-italic font-normal leading-[59px] mb-6 ${
                  darkMode ? "text-capx-dark-text" : "text-capx-light-text"
                }`}
              >
                Welcome!
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={UserCircleIcon}
                  alt="User circle icon"
                  width={42}
                  height={48}
                />
                <span
                  className={`text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[29px] pl-2 ${
                    darkMode ? "text-capx-dark-text" : "text-capx-light-text"
                  }`}
                >
                  Wiki Movimento Brasil
                </span>
              </div>
              <p className="font-[Montserrat] text-[20px] not-italic font-normal leading-[29px] mb-6">
                Grupo de usuários Wiki Movimento Brasil
              </p>

              <BaseButton
                onClick={() => {}}
                label="Edit organization profile"
                customClass="text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border-[2px] border-[solid] border-capx-dark-box-bg text-capx-light-text"
                imageUrl={EditIcon}
                imageAlt="Edit icon"
                imageWidth={32}
                imageHeight={32}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Image
            src={ReportActivityIcon}
            alt="Report activity icon"
            width={1179}
            height={399}
          />
        </div>
      </div>
      <CapacitiesList icon={NeurologyIcon} title="Known capacities" />
      <CapacitiesList icon={EmojiIcon} title="Available capacities" />
      <CapacitiesList icon={TargetIcon} title="Wanted capacities" />
      <ProjectsEventsList title="Main projects" />
      <ProjectsEventsList title="Events" />
    </section>
  );
}
