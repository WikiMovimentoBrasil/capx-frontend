"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CapacityList from "./CapacityList";
import { useSession } from "next-auth/react";
import CapacityProfile from "./CapacityProfile";
import CapacitySection from "./CapacitySection";
import BaseWrapper from "@/components/BaseWrapper";
import CapacitySearchBar from "./CapacitySearchBar";
import LoadingSection from "@/components/LoadingSection";

export default function MainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [capacityList, setCapacityList] = useState(undefined);
  const [selectedCapacity, setSelectedCapacity] = useState({ code: "", wd_code: "", name: "" });
  const [selectedCapacityData, setSelectedCapacityData] = useState(undefined);
  const [searchBarQuery, setSearchBarQuery] = useState("");
  const [searchBarResultList, setSearchBarResultList] = useState([]);

  const fetchUserData = async (userId, setCustomState) => {
    try {
      const queryData = {
        params: { userId: userId },
        headers: { 'Authorization': `Token ${data.user.token}` }
      }
      const queryResponse = await axios.get("/api/users", queryData);
      setCustomState(queryResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  useEffect(() => {
    try {
      if (status === "authenticated") {
        const fetchCapacityList = async (queryData) => {
          const queryResponse = await axios.get('/api/capacity', queryData);
          setCapacityList(queryResponse.data.data);
        };
        const queryData = {
          params: { language: props.language },
          headers: { 
            'Authorization': `Token ${data.user.token}`,
          }
        }
        fetchCapacityList(queryData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, [status]);

  useEffect(() => {
    if (selectedCapacity.code !== "") {
      const fetchCapacityData = async (queryData) => {
        const queryResponse = await axios.get("/api/capacity/" + selectedCapacity.code, queryData);
        setSelectedCapacityData(queryResponse.data);
      };
      const queryData = {
        headers: { 'Authorization': `Token ${data.user.token}` }
      }
      fetchCapacityData(queryData);
    }
    else {
      setSelectedCapacityData(undefined);
    }
  }, [selectedCapacity]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />
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
      <CapacitySection>
        <CapacitySearchBar
          darkMode={darkMode}
          capacityList={capacityList}
          selectedCapacity={selectedCapacity}
          setSelectedCapacity={setSelectedCapacity}
          searchBarQuery={searchBarQuery}
          setSearchBarQuery={setSearchBarQuery}
          searchBarResultList={searchBarResultList}
          setSearchBarResultList={setSearchBarResultList}
          pageContent={pageContent}
        />
        {selectedCapacity.code === "" ? (
          <CapacityList
            darkMode={darkMode}
            capacityList={capacityList}
            setSelectedCapacity={setSelectedCapacity}
            setSearchBarQuery={setSearchBarQuery}
            setSearchBarResultList={setSearchBarResultList}
          />
        ) : (
          <CapacityProfile
            darkMode={darkMode}
            selectedCapacity={selectedCapacity}
            selectedCapacityData={selectedCapacityData}
            pageContent={pageContent}
            fetchUserData={fetchUserData}
          />
        )}
      </CapacitySection>
    </BaseWrapper>
  )
}