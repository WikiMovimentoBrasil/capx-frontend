"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CapacitySection from "./CapacitySection";
import BaseWrapper from "@/components/BaseWrapper";
import CapacityListSearchBar from "./CapacityListSearchBar";
import LoadingSection from "@/components/LoadingSection";
import { TreeView } from '@primer/react';

export default function CapacityListMainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [capacityList, setCapacityList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [asyncItems, setAsyncItems] = useState([]);

  const getCapacityList = async (queryData) => {
    const queryResponse = await axios.get('/api/capacity', queryData);
    const result = queryResponse.data.reduce((acc, item) => {
      acc[item.code] = item.name;
      return acc;
    }, {});
    setCapacityList(result);
  };

  // Define const loadItems using API endpoint '/api/capacity/type/' + type
  const loadItems = async (type) => {
    const queryData = {
      headers: {
        'Authorization': `Token ${data.user.token}`,
      }
    }
    const queryResponse = await axios.get('/api/capacity/type/' + type, queryData);
    return queryResponse.data;
  }

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language: props.language },
        headers: {
          'Authorization': `Token ${data.user.token}`,
        }
      }
      getCapacityList(queryData).catch((error) => 
        console.error('Failed to fetch data:', error)
      );
    }
  }, [status]);

  useEffect(() => {
    setCapacityList(undefined);
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${data.user.token}`,
        }
      }
      getCapacityList(queryData).catch((error) =>
        console.error('Failed to fetch data:', error)
      );
    }
  }, [language]);

  const handleExpandedChange = async (isExpanded) => {
    if (asyncItems.length === 0 && isExpanded) {
      setIsLoading(true);
      const items = await loadItems('0');

      const names = {};
      for (const key in items) {
        if (capacityList.hasOwnProperty(key)) {
          names[key] = capacityList[key];
        }
      }

      setIsLoading(false);
      setAsyncItems(names);
    }
  };

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />
  }

  let state = 'initial';
  if (isLoading) {
    state = 'loading';
  } else if (asyncItems.length > 0) {
    state = 'done';
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
        <CapacityListSearchBar
          darkMode={darkMode}
          capacityList={capacityList}
          pageContent={pageContent}
        />
        <nav aria-label="Files">
          <TreeView aria-label="Files">
            <TreeView.Item
              id="async-directory"
              onExpandedChange={handleExpandedChange}
            >
              <TreeView.LeadingVisual>
                <TreeView.DirectoryIcon />
              </TreeView.LeadingVisual>
              Directory
              <TreeView.SubTree state={state}>
                {Object.entries(asyncItems).map(([key, value]) => (
                  <TreeView.Item id={`item-${key}`} key={key}>
                    {value}
                  </TreeView.Item>
                ))}
              </TreeView.SubTree>
            </TreeView.Item>
          </TreeView>
        </nav>
      </CapacitySection>
    </BaseWrapper>
  )
}
