"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TagProfileView from "./TagProfileView";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";
import { tagService } from "@/services/tagService";
import { QueryData } from "@/types/capacity";

interface TagProfileMainWrapperProps {
  selectedTagId: string;
  selectedTagCategory: string;
  language: string;
  darkMode: { value: string };
  pageContent: any;
}

export default function TagProfileMainWrapper(
  props: TagProfileMainWrapperProps
) {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [selectedTagData, setSelectedTagData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTagData() {
      if (status === "authenticated" && session?.user?.token) {
        try {
          const queryData: QueryData = {
            params: {
              language: props.language,
              id: props.selectedTagId,
            },
            headers: {
              Authorization: `Token ${session.user.token}`,
            },
          };

          const response = await tagService.fetchTagById(
            props.selectedTagId,
            props.selectedTagCategory,
            queryData
          );
          setSelectedTagData(response);
        } catch (error) {
          console.error("Failed to fetch tag data:", error);
          router.push("/profile");
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchTagData();
  }, [
    props.selectedTagId,
    props.selectedTagCategory,
    status,
    session?.user?.token,
    router,
  ]);

  if (status === "loading" || isLoading) {
    return <LoadingSection darkMode={darkMode} message="TAG DATA" />;
  }

  return (
    <BaseWrapper
      session={session}
      language={language}
      setLanguage={setLanguage}
      pageContent={pageContent}
      setPageContent={setPageContent}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      mobileMenuStatus={mobileMenuStatus}
      setMobileMenuStatus={setMobileMenuStatus}
    >
      <TagProfileView
        darkMode={darkMode}
        selectedTagData={selectedTagData}
        pageContent={pageContent}
        userId={session?.user?.id}
      />
    </BaseWrapper>
  );
}
