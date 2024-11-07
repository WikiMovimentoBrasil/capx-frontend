"use client";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";
import EditReportForm from "@/app/(auth)/reports/[id]/edit/components/EditReportForm";
import ForbiddenReportEditView from "@/app/(auth)/reports/[id]/edit/components/ForbiddenReportEditView";

export default function ReportMainWrapper(props) {
  let pageComponent;
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [reportData, setReportData] = useState(undefined);
  const [authorIsUser, setAuthorIsUser] = useState(false);
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
      const authorshipCheck = reportData.author === data.user.username;
      setShowEditButton(authorshipCheck);
      setAuthorIsUser(authorshipCheck);
    }
  }, [reportData, data?.user?.username]);

  if (status === "loading") {
    pageComponent = (
      <LoadingSection
        darkMode={darkMode}
        message="THE REPORT DATA FOR EDITING"
      />
    );
  }

  if (status === "authenticated") {
    if (!authorIsUser && reportData?.id) {
      pageComponent = (
        <ForbiddenReportEditView
          darkMode={darkMode}
          pageContent={pageContent}
        />
      );
    } else if (reportData !== undefined) {
      pageComponent = (
        <EditReportForm
          darkMode={darkMode}
          session={{ sessionstatus: status, sessionData: data }}
          reportData={reportData}
          setReportData={setReportData}
          pageContent={pageContent}
        />
      );
    } else {
      pageComponent = (
        <LoadingSection
          darkMode={darkMode}
          message="THE REPORT DATA FOR EDITING"
        />
      );
    }
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
      {pageComponent}
    </BaseWrapper>
  );
}
