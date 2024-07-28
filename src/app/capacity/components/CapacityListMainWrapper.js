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
  const [asyncItems, setAsyncItems] = useState({});
  const [expandedItems, setExpandedItems] = useState({});

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

  const handleExpandedChange = async (itemId, isExpanded) => {
    if (isExpanded && !expandedItems[itemId]) {
      setIsLoading(true);
      const items = await loadItems(itemId);
      const names = {};
      for (const key in items) {
        if (capacityList.hasOwnProperty(key)) {
          names[key] = capacityList[key];
        }
      }
      setAsyncItems(prev => ({ ...prev, [itemId]: names }));
      setExpandedItems(prev => ({ ...prev, [itemId]: true }));
      setIsLoading(false);
    } else if (!isExpanded && expandedItems[itemId]) {
      setExpandedItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />
  }

  const renderSubTree = (itemId) => {
    let state = 'initial';
    if (isLoading) {
      state = 'loading';
    } else if (asyncItems[itemId] && Object.keys(asyncItems[itemId]).length > 0) {
      state = 'done';
    }

    if (expandedItems[itemId] && asyncItems[itemId]) {
      return (
        <TreeView.SubTree state={state}>
          {Object.entries(asyncItems[itemId]).map(([key, value]) => (
            <TreeView.Item 
              id={`item-${key}`} 
              key={key}
              onExpandedChange={(isExpanded) => handleExpandedChange(key, isExpanded)}
            >
              {value}
              {renderSubTree(key)}
            </TreeView.Item>
          ))}
        </TreeView.SubTree>
      );
    }
    return null;
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
        <CapacityListSearchBar
          darkMode={darkMode}
          capacityList={capacityList}
          pageContent={pageContent}
        />
        <nav aria-label="Files">
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
        </nav>
      </CapacitySection>
    </BaseWrapper>
  )
}
