"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CapacitySection from "./CapacitySection";
import BaseWrapper from "@/components/BaseWrapper";
import CapacityListSearchBar from "./CapacityListSearchBar";
import LoadingSection from "@/components/LoadingSection";
import { TreeView, ThemeProvider, BaseStyles } from '@primer/react';
import Link from 'next/link';

export default function CapacityListMainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [capacityList, setCapacityList] = useState(undefined);
  const [asyncItems, setAsyncItems] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  const getCapacityList = async (queryData) => {
    const queryResponse = await axios.get('/api/capacity', queryData);
    const result = queryResponse.data.reduce((acc, item) => {
      acc[item.code] = item.name;
      return acc;
    }, {});
    setCapacityList(result);
  };

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

  const handleExpandedChange = async (itemId, isExpanded) => {
    setExpandedItems(prev => ({ ...prev, [itemId]: isExpanded }));
    if (isExpanded && !asyncItems[itemId]) {
      setLoadingStates(prev => ({ ...prev, [itemId]: true }));
      while (!capacityList) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      const items = await loadItems(itemId);
      const names = {};
      for (const key in items) {
        if (capacityList.hasOwnProperty(key)) {
          names[key] = capacityList[key];
        }
      }
      setAsyncItems(prev => ({ ...prev, [itemId]: names }));
      setLoadingStates(prev => ({ ...prev, [itemId]: false }));
    }
  };

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />
  }

  const renderSubTree = (itemId) => {
    const isLoading = loadingStates[itemId];
    const state = isLoading ? 'loading' : 'done';

    return (
      <TreeView.SubTree state={state}>
        {asyncItems[itemId] ? (
          Object.entries(asyncItems[itemId]).map(([key, value]) => (
            <TreeView.Item 
              id={`item-${key}`} 
              key={key}
              onExpandedChange={(isExpanded) => handleExpandedChange(key, isExpanded)}
            >
              <TreeView.LeadingVisual>
                <TreeView.DirectoryIcon />
              </TreeView.LeadingVisual>
              <Link href={`/capacity/${key}`}>
                {value}
              </Link>
              {renderSubTree(key)}
            </TreeView.Item>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </TreeView.SubTree>
    );
  };

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
        <nav aria-label="Files">
          <ThemeProvider colorMode={darkMode ? "night" : "day"}>
            <BaseStyles>
              <TreeView aria-label="Files">
                <TreeView.Item
                  id="async-directory"
                  onExpandedChange={(isExpanded) => handleExpandedChange('0', isExpanded)}
                >
                  <TreeView.LeadingVisual>
                    <TreeView.DirectoryIcon />
                  </TreeView.LeadingVisual>
                  Directory
                  {renderSubTree('0')}
                </TreeView.Item>
              </TreeView>
            </BaseStyles>
          </ThemeProvider>
        </nav>
      </CapacitySection>
    </BaseWrapper>
  )
}
