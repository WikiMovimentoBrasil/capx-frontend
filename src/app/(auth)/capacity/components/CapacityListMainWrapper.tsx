"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BaseWrapper from "@/components/BaseWrapper";
import CapacitySection from "./CapacitySection";
import LoadingSection from "@/components/LoadingSection";
import { TreeView, ThemeProvider, BaseStyles } from "@primer/react";
import { useCapacityList } from "@/hooks/useCapacityList";

interface CapacityListMainWrapperProps {
  session: boolean;
  language: string;
  darkMode: { value: string };
  pageContent: Record<string, string>;
}

export default function CapacityListMainWrapper({
  session,
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
}: CapacityListMainWrapperProps) {
  const { status, data: sessionData } = useSession();
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);

  const {
    capacityList,
    asyncItems,
    expandedItems,
    loadingStates,
    fetchCapacityList,
    handleExpandedChange,
  } = useCapacityList({
    token: sessionData?.user?.token,
    language,
    initialExpanded: "0",
  });

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user?.token) {
      fetchCapacityList();
    }
  }, [status, sessionData?.user?.token, fetchCapacityList]);

  const renderSubTree = (itemId: string) => {
    const isLoading = loadingStates[itemId];
    const state = isLoading ? "loading" : "done";
    const items = asyncItems[itemId];

    if (!items || Object.keys(items).length === 0) {
      return null;
    }

    return (
      <TreeView.SubTree state={state}>
        {Object.entries(items).map(([key, value]) => {
          if (key === itemId) return null;

          return (
            <TreeView.Item
              id={`item-${key}`}
              key={key}
              onExpandedChange={(isExpanded) =>
                handleExpandedChange(key, isExpanded)
              }
            >
              <TreeView.LeadingVisual>
                <TreeView.DirectoryIcon />
              </TreeView.LeadingVisual>
              <Link
                href={`/capacity/${key}`}
                className="hover:text-capx-primary-green"
              >
                {value}
              </Link>
              {asyncItems[key] && renderSubTree(key)}
            </TreeView.Item>
          );
        })}
      </TreeView.SubTree>
    );
  };

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />;
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
      <CapacitySection>
        <nav aria-label="Files">
          <ThemeProvider colorMode={darkMode ? "night" : "day"}>
            <BaseStyles>
              <TreeView aria-label="Files">
                <TreeView.Item
                  id="async-directory"
                  expanded={true}
                  onExpandedChange={(isExpanded) =>
                    handleExpandedChange("0", isExpanded)
                  }
                >
                  <TreeView.LeadingVisual>
                    <TreeView.DirectoryIcon />
                  </TreeView.LeadingVisual>
                  {pageContent["navbar-link-capacities"]}
                  {asyncItems["0"] && renderSubTree("0")}
                </TreeView.Item>
              </TreeView>
            </BaseStyles>
          </ThemeProvider>
        </nav>
      </CapacitySection>
    </BaseWrapper>
  );
}
