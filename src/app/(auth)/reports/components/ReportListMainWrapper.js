"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";
import ReportListView from "@/app/(auth)/reports/components/ReportListView";
import { localDate } from "@/components/DateUtils";

export default function ReportListMainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [reportList, setReportList] = useState(undefined);

  const getReportList = useCallback(
    async (queryData) => {
      const queryResponse = await axios.get("/api/report", queryData);
      const result = queryResponse.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        author: item.author,
        created_at: localDate(item.created_at, language) ?? "",
        updated_at: localDate(item.updated_at, language) ?? "",
      }));

      setReportList(result);
    },
    [language]
  );

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language: props.language },
        headers: {
          Authorization: `Token ${data.user.token}`,
        },
      };
      getReportList(queryData).catch((error) =>
        console.error("Failed to fetch data:", error)
      );
    }
  }, [data?.user?.token, getReportList, props.language, status]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="REPORTS" />;
  }

  if (reportList !== undefined) {
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
        <ReportListView
          darkMode={darkMode}
          reportList={reportList}
          pageContent={pageContent}
          language={language}
        />
      </BaseWrapper>
    );
  }
}
