"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { TreeView, ThemeProvider, BaseStyles } from "@primer/react";
import Link from "next/link";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";
import CapacitySection from "./CapacitySection";
import { DarkModeCookie } from "@/types/cookie";

interface CapacityListMainWrapperProps {
  session: boolean;
  language: string;
  darkMode: DarkModeCookie;
  pageContent: Record<string, string>;
}

interface CapacityData {
  [key: string]: string;
}

interface LoadingStates {
  [key: string]: boolean;
}

interface ExpandedItems {
  [key: string]: boolean;
}

export default function CapacityListMainWrapper({
  session,
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
}: CapacityListMainWrapperProps) {
  const { status, data: sessionData } = useSession();

  // State management
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);
  const [capacityList, setCapacityList] = useState<CapacityData | undefined>();
  const [asyncItems, setAsyncItems] = useState<Record<string, CapacityData>>(
    {}
  );
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({
    "0": true,
  });
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    "0": true,
  });

  const getCapacityList = useCallback(async () => {
    if (!sessionData?.user?.token) return;

    try {
      const response = await axios.get("/api/capacity", {
        params: { language },
        headers: {
          Authorization: `Token ${sessionData.user.token}`,
        },
      });

      const result = response.data.reduce(
        (acc: CapacityData, item: { code: string; name: string }) => {
          acc[item.code] = item.name;
          return acc;
        },
        {}
      );

      setCapacityList(result);
      setLoadingStates((prev) => ({ ...prev, 0: false }));
    } catch (error) {
      console.error("Failed to fetch capacity list:", error);
      setLoadingStates((prev) => ({ ...prev, 0: false }));
    }
  }, [sessionData?.user?.token, language]);

  const loadItems = useCallback(
    async (type: string) => {
      if (!sessionData?.user?.token) return {};

      try {
        const response = await axios.get(`/api/capacity/type/${type}`, {
          headers: {
            Authorization: `Token ${sessionData.user.token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Failed to load items:", error);
        return {};
      }
    },
    [sessionData?.user?.token]
  );

  const handleExpandedChange = useCallback(
    async (itemId: string, isExpanded: boolean) => {
      setExpandedItems((prev) => ({ ...prev, [itemId]: isExpanded }));

      if (isExpanded && !asyncItems[itemId]) {
        setLoadingStates((prev) => ({ ...prev, [itemId]: true }));

        while (!capacityList) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const items = await loadItems(itemId);
        const names: CapacityData = {};

        for (const key in items) {
          if (capacityList.hasOwnProperty(key)) {
            names[key] = capacityList[key];
          }
        }

        setAsyncItems((prev) => ({ ...prev, [itemId]: names }));
        setLoadingStates((prev) => ({ ...prev, [itemId]: false }));
      }
    },
    [asyncItems, capacityList, loadItems]
  );

  // Initial data fetch
  useEffect(() => {
    if (status === "authenticated") {
      getCapacityList();
    }
  }, [status, getCapacityList]);

  // Handle initial expansion
  useEffect(() => {
    if (capacityList) {
      handleExpandedChange("0", true);
    }
  }, [capacityList, handleExpandedChange]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />;
  }

  const renderSubTree = (itemId: string) => {
    const isLoading = loadingStates[itemId];

    return (
      <TreeView.SubTree state={isLoading ? "loading" : "done"}>
        {asyncItems[itemId] ? (
          Object.entries(asyncItems[itemId]).map(([key, value]) => (
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
              <Link href={`/capacity/${key}`}>{value}</Link>
              {renderSubTree(key)}
            </TreeView.Item>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </TreeView.SubTree>
    );
  };

  const baseWrapperProps = {
    session,
    language,
    setLanguage,
    pageContent,
    setPageContent,
    darkMode,
    setDarkMode,
    mobileMenuStatus,
    setMobileMenuStatus,
  };

  return (
    <BaseWrapper {...baseWrapperProps}>
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
                  current={true}
                >
                  <TreeView.LeadingVisual>
                    <TreeView.DirectoryIcon />
                  </TreeView.LeadingVisual>
                  {pageContent["navbar-link-capacities"]}
                  {renderSubTree("0")}
                </TreeView.Item>
              </TreeView>
            </BaseStyles>
          </ThemeProvider>
        </nav>
      </CapacitySection>
    </BaseWrapper>
  );
}
