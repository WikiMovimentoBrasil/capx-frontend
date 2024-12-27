"use client";
import { useApp } from "@/contexts/AppContext";
import BaseWrapper from "./BaseWrapper";
import MainSection from "@/components/MainSection";
import FeaturesSection from "@/components/FeaturesSection";
import CallToActionSection from "@/components/CallToActionSection";
import VideoSection from "@/components/VideoSection";

interface ApplicationWrapperProps {
  pageContent: any;
}

export default function ApplicationWrapper({
  pageContent,
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
