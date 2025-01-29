"use client";

import { useState } from "react";
import { newsService } from "@/services/newsService";
import { News } from "@/types/news";

export const useNews = (token?: string, id?: number) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!token || !id) {
    return {
      news: [],
      loading: false,
      error: null,
      fetchNews: async () => {},
      fetchSingleNews: async () => {},
      createNews: async () => {},
      deleteNews: async () => {},
    };
  }
  const fetchNews = async () => {
    setLoading(true);
    const news = await newsService.fetchAllNews(token);
    setNews(news);
    setLoading(false);
  };

  const fetchSingleNews = async () => {
    setLoading(true);
    const news = await newsService.fetchSingleNews(token, id);
    setNews((prevNews) => [...prevNews, news]);
    setLoading(false);
  };

  const createNews = async (news: Partial<News>) => {
    const newNews = await newsService.createNews(token, news);
    setNews((prevNews) => [...prevNews, newNews]);
  };

  const deleteNews = async (id: number) => {
    await newsService.deleteNews(token, id);
    setNews((prevNews) => prevNews.filter((n) => n.id !== id));
  };

  return {
    news,
    loading,
    error,
    fetchNews,
    fetchSingleNews,
    createNews,
    deleteNews,
  };
};
