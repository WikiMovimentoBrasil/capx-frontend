import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Report {
  id: string;
}

interface UseReportReturn {
  report: Report | null;
  isLoading: boolean;
  updateReport: (data: Partial<Report>) => Promise<void>;
  error?: Error;
}

export function useReport(id?: string): UseReportReturn {
  const { data: session } = useSession();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const fetchReport = useCallback(async () => {
    if (!id || !session?.user) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/reports/${id}`, {
        headers: { Authorization: `Token ${session?.user.token}` },
      });
      setReport(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [id, session?.user?.token]);

  const updateReport = useCallback(
    async (data: Partial<Report>) => {
      if (!id || !session?.user?.token) return;

      try {
        setIsLoading(true);
        const response = await axios.patch(`/api/reports/${id}`, data, {
          headers: { Authorization: `Token ${session.user.token}` },
        });
        setReport(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [id, session?.user?.token]
  );

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return {
    report,
    isLoading,
    updateReport,
    error,
  };
}
