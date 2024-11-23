"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BaseWrapper from "@/components/BaseWrapper";
import CapacitySection from "./CapacitySection";
import LoadingSection from "@/components/LoadingSection";
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
    setAsyncItems,
    expandedItems,
    setExpandedItems,
    loadingStates,
    setLoadingStates,
    fetchCapacityList,
    loadCapacityItems,
  } = useCapacityList({ token: sessionData?.user?.token, language });

  const handleExpandedChange = useCallback(
    async (itemId: string) => {
      setExpandedItems((prev) => ({
        ...prev,
        [itemId]: !prev[itemId],
      }));

      if (!asyncItems[itemId] && !loadingStates[itemId]) {
        setLoadingStates((prev) => ({ ...prev, [itemId]: true }));

        try {
          const items = await loadCapacityItems(itemId);
          if (items && Object.keys(items).length > 0) {
            const names = Object.entries(items).reduce(
              (acc: Record<string, string>, [key, value]) => {
                acc[key] = value as string;
                return acc;
              },
              {}
            );
            setAsyncItems((prev) => ({ ...prev, [itemId]: names }));
          }
        } catch (error) {
          console.error("Error loading capacity items:", error);
        } finally {
          setLoadingStates((prev) => ({ ...prev, [itemId]: false }));
        }
      }
    },
    [
      asyncItems,
      loadingStates,
      loadCapacityItems,
      setAsyncItems,
      setLoadingStates,
    ]
  );

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user?.token) {
      fetchCapacityList();
    }
  }, [status, sessionData?.user?.token, fetchCapacityList]);

  const renderTreeItem = (itemId: string, label: string, isRoot = false) => {
    const isLoading = loadingStates[itemId];
    const isExpanded = expandedItems[itemId];

    return (
      <div key={itemId} className="w-full">
        <button
          onClick={() => handleExpandedChange(itemId)}
          className={`flex items-center w-full p-2 ${
            darkMode
              ? "hover:bg-gray-700 text-white"
              : "hover:bg-gray-100 text-gray-900"
          } rounded-lg ${isRoot ? "font-semibold" : ""}`}
          aria-expanded={isExpanded}
        >
          <span
            className={`mr-2 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
          {label}
        </button>

        {isExpanded && (
          <div className="ml-4">
            {isLoading ? (
              <div className="p-2">Loading...</div>
            ) : (
              asyncItems[itemId] &&
              Object.entries(asyncItems[itemId]).map(([key, value]) => (
                <div key={key} className="p-2">
                  <Link
                    href={`/capacity/${key}`}
                    className={`${
                      darkMode
                        ? "hover:text-capx-secondary-purple"
                        : "hover:text-capx-primary-green"
                    }`}
                  >
                    {value}
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
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
        <nav aria-label="Capacities" className="w-full max-w-2xl mx-auto p-4">
          {renderTreeItem("0", pageContent["navbar-link-capacities"], true)}
        </nav>
      </CapacitySection>
    </BaseWrapper>
  );
}
