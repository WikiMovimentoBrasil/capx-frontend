"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CapacityProfileView from "../components/CapacityProfileView";
import LoadingSection from "@/components/LoadingSection";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { User } from "next-auth";
import { usePathname } from "next/navigation";

interface CapacityData {
    name: string;
    wd_code: string;
    description?: string;
    users: {
      wanted?: User[];
      known?: User[];
      available?: User[];
    };
  }
  
export default function CapacityProfileMainWrapper() {
  const [selectedCapacityData, setSelectedCapacityData] = useState<CapacityData | null>();

const { status, data: session } = useSession();
    const { darkMode } = useTheme();
    const { pageContent, language } = useApp();
    const token = session?.user?.token;

    const pathname = usePathname();
    const selectedCapacityId = pathname.split("/").slice(-1)[0]; // Obtendo o ID da URL

  const getCapacityData = useCallback(async (queryData) => {
    const queryResponse = await axios.get("/api/capacity/" + selectedCapacityId, queryData);
    setSelectedCapacityData(queryResponse.data);
  }, [selectedCapacityId]);

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${token}`,
        }
      }
      getCapacityData(queryData);
    }
  }, [token, getCapacityData, language, status]);

  useEffect(() => {
    setSelectedCapacityData(undefined);
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${token}`,
        }
      }
      getCapacityData(queryData);
    }
  }, [token, getCapacityData, language, status]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITY DATA" />
  }

  return (
    <section className="grid grid-cols-1 place-content-start w-10/12 sm:w-8/12 min-h-screen py-32 mx-auto space-y-8">
    <CapacityProfileView
        selectedCapacityData={selectedCapacityData}
    />
    </section>
  )
}
