"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import LoadingSection from "@/components/LoadingSection";
import { TreeView, ThemeProvider, BaseStyles } from '@primer/react';
import Link from 'next/link';
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";

interface CapacityList {
  [key: string]: string;
}

interface AsyncItems {
  [key: string]: Record<string, string>;
}

interface LoadingStates {
  [key: string]: boolean;
}

export default function CapacityListMainWrapper() {
  const { status, data: session } = useSession();
    const { darkMode } = useTheme();
    const { pageContent, language } = useApp();
    const token = session?.user?.token;
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({ "0": true });
  
  const [capacityList, setCapacityList] = useState<CapacityList | undefined>(undefined);
  const [asyncItems, setAsyncItems] = useState<AsyncItems>({});
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({ "0": true });

  // Função para buscar a lista de capacidade
  const getCapacityList = async (queryData: { params: { language: string }, headers: { Authorization: string } }) => {
    const queryResponse = await axios.get('/api/capacity', queryData);
    const result = queryResponse.data.reduce((acc: CapacityList, item: { code: string, name: string }) => {
      acc[item.code] = item.name;
      return acc;
    }, {});
    setCapacityList(result);
    setLoadingStates(prev => ({ ...prev, 0: false }));
  };

  // Função para carregar os itens de um tipo específico
  const loadItems = useCallback(async (type: string) => {
    const queryData = {
      headers: {
        'Authorization': `Token ${token}`,
      }
    };
    const queryResponse = await axios.get(`/api/capacity/type/${type}`, queryData);
    return queryResponse.data;
  }, [token]);

  // Efeitos para carregar a lista de capacidade quando o status de sessão mudar
  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${token}`,
        }
      };
      getCapacityList(queryData).catch((error) =>
        console.error('Failed to fetch data:', error)
      );
    }
  }, [status, token, language]);

  useEffect(() => {
    setCapacityList(undefined);
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${token}`,
        }
      };
      getCapacityList(queryData).catch((error) =>
        console.error('Failed to fetch data:', error)
      );
    }
  }, [token, language, status]);

  const handleExpandedChange = useCallback(async (itemId: string, isExpanded: boolean) => {
    setExpandedItems(prev => ({ ...prev, [itemId]: isExpanded }));
    if (isExpanded && !asyncItems[itemId]) {
      setLoadingStates(prev => ({ ...prev, [itemId]: true }));
      while (!capacityList) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      const items = await loadItems(itemId);
      const names: Record<string, string> = {};
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
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />;
  }

  const renderSubTree = (itemId: string) => {
    const isLoading = loadingStates[itemId];
    const state = isLoading ? 'loading' : 'done';
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
    return subtree;
  };

  return (
    <section className="grid grid-cols-1 place-content-start w-10/12 sm:w-8/12 min-h-screen py-32 mx-auto space-y-8">
        <nav aria-label="Files">
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
        </nav>
    </section>
  );
}
