"use client";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import ReportView from "@/app/[lang]/(auth)/reports/components/ReportView";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";

export default function ReportViewMainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [reportData, setReportData] = useState(undefined);
  const [showEditButton, setShowEditButton] = useState(false);

  const getReportData = async (queryData) => {
    try {
      const response = await axios.get("/api/report", queryData);

      setReportData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: {
          reportId: props.reportId,
          language: props.language,
        },
        headers: { Authorization: `Token ${data.user.token}` },
      };
      getReportData(queryData);
    }
  }, [data?.user?.token, props.language, props.reportId, status]);

  useEffect(() => {
    if (reportData && data?.user?.username) {
      setShowEditButton(reportData.author === data.user.username);
    }
  }, [reportData, data?.user?.username]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="REPORT DATA" />;
  }

  return (
    <BaseWrapper
      session={props.session}
      language={language}
      setLanguage={setLanguage}
      pageContent={pageContent}
      setPageContent={setPageContent}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      mobileMenuStatus={mobileMenuStatus}
      setMobileMenuStatus={setMobileMenuStatus}
    >
      <ReportView
        darkMode={darkMode}
        reportData={reportData}
        showEditButton={showEditButton}
        pageContent={pageContent}
      />
    </BaseWrapper>
  );
}
