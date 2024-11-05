import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { SessionUser } from "@/types/session";

interface ReportDataProps {
  reportId?: string;
  language: string;
}

export function useReportData({ reportId, language }: ReportDataProps) {
  const { status, data: sessionData } = useSession();
  const [reportData, setReportData] = useState<any>();
  const [showEditButton, setShowEditButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      if (status === "authenticated") {
        try {
          const response = await axios.get("/api/report", {
            params: { reportId, language },
            headers: {
              Authorization: `Token ${
                // TODO: Fix this type casting
                (sessionData?.user as SessionUser).token
              }`,
            },
          });
          setReportData(response.data);
          setShowEditButton(response.data?.author === sessionData?.user?.name);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchReport();
  }, [reportId, language, status, sessionData?.user]);

  return {
    reportData,
    showEditButton,
    isLoading,
    isAuthenticated: status === "authenticated",
  };
}
