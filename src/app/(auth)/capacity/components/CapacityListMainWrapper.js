"use client";
import axios from "axios";
import CapacityListView from "./CapacityListView";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
// import CapacityListSearchBar from "./CapacityListSearchBar";
import LoadingSection from "./LoadingSection";
import { TreeView, ThemeProvider, BaseStyles } from '@primer/react';
import Link from 'next/link';
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function CapacityListMainWrapper() {
  const { pageContent, language } = useApp();
  const { status, data: session } = useSession();
  const { darkMode } = useTheme();
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [capacityList, setCapacityList] = useState(undefined);
  const [asyncItems, setAsyncItems] = useState({});
  const [expandedItems, setExpandedItems] = useState({"0": true});
  const [loadingStates, setLoadingStates] = useState({"0": true});

  const getCapacityList = async (queryData) => {
    const queryResponse = await axios.get('/api/capacity', queryData);
    const result = queryResponse.data.reduce((acc, item) => {
      acc[item.code] = item.name;
      return acc;
    }, {});
    setCapacityList(result);
    setLoadingStates(prev => ({...prev, 0: false}));
  };

  const loadItems = useCallback(async (type) => {
    const queryData = {
      headers: {
        'Authorization': `Token ${session?.user?.token}`,
      }
    }
    const queryResponse = await axios.get('/api/capacity/type/' + type, queryData);
    console.log("loadItems queryResponse", queryResponse);
    return queryResponse.data;
  }, [session?.user?.token])

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${session?.user?.token}`,
        }
      }
      getCapacityList(queryData).catch((error) =>
        console.error('Failed to fetch data:', error)
      );
    }
  }, [status, session?.user?.token, language]);

  useEffect(() => {
    setCapacityList(undefined);
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${session?.user?.token}`,
        }
      }
      getCapacityList(queryData).catch((error) =>
        console.error('Failed to fetch data:', error)
      );
    }
  }, [session?.user?.token, language, status]);

  const handleExpandedChange = useCallback(async (itemId, isExpanded) => {
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
  }, [asyncItems, capacityList, loadItems]);

  useEffect(() => {
    if (capacityList) {
      handleExpandedChange("0", true);
    }
  }, [capacityList, handleExpandedChange]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />
  }

  const renderSubTree = (itemId) => {
    const isLoading = loadingStates[itemId];
    const state = isLoading ? 'loading' : 'done';
    console.log("renderSubTree isLoading", isLoading);
    
    let subtree = (
        <TreeView.SubTree state={state}>
          {asyncItems[itemId] ? (
              Object.entries(asyncItems[itemId]).map(([key, value]) => (
                  <TreeView.Item
                      id={`item-${key}`}
                      key={key}
                      onExpandedChange={(isExpanded) => handleExpandedChange(key, isExpanded)}
                  >
                    <TreeView.LeadingVisual>
                      <TreeView.DirectoryIcon/>
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
        </TreeView.SubTree>);
    return subtree;
  };

  return (
    <section className="grid grid-cols-1 place-content-start w-10/12 sm:w-8/12 min-h-screen py-32 mx-auto space-y-8">
      <nav aria-label="Files">
        <ThemeProvider colorMode={darkMode ? "night" : "day"}>
          <BaseStyles>
            <TreeView aria-label="Files">
              <TreeView.Item
                id="async-directory"
                expanded={true}
                onExpandedChange={(isExpanded) => handleExpandedChange('0', isExpanded)}
                current={true}
              >
                <TreeView.LeadingVisual>
                  <TreeView.DirectoryIcon />
                </TreeView.LeadingVisual>
                {pageContent["navbar-link-capacities"]}
                {renderSubTree('0')}
              </TreeView.Item>
            </TreeView>
          </BaseStyles>
        </ThemeProvider>
      </nav>
    </section>
  )
}
