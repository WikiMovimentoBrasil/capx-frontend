"use client";
import { useApp } from "@/providers/AppProvider";
import BaseWrapper from "./BaseWrapper";
import MainSection from "@/components/MainSection";
import FeaturesSection from "@/components/FeaturesSection";
import CallToActionSection from "@/components/CallToActionSection";
import VideoSection from "@/components/VideoSection";

interface ApplicationWrapperProps {
  pageContent: any;
  initialLang: string;
}

export default function ApplicationWrapper({
  pageContent,
  initialLang,
}: ApplicationWrapperProps) {
  return (
    <BaseWrapper>
      <MainSection pageContent={pageContent} />
      <FeaturesSection />
      <VideoSection pageContent={pageContent} />
      <CallToActionSection pageContent={pageContent} />
    </BaseWrapper>
  );
}
