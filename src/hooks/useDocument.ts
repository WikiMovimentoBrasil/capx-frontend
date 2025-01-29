"use client";

import { useState } from "react";
import { documentService } from "@/services/documentService";
import { Document } from "@/types/document";

export const useDocument = (token?: string, id?: number) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token || !id) {
    return {
      documents: [],
      loading: false,
      error: null,
      fetchDocuments: () => {},
      fetchSingleDocument: () => {},
      createDocument: () => {},
      deleteDocument: () => {},
    };
  }

  const fetchDocuments = async () => {
    setLoading(true);
    const documents = await documentService.fetchAllDocuments(token);
    setDocuments(documents);
    setLoading(false);
  };

  const fetchSingleDocument = async () => {
    setLoading(true);
    const document = await documentService.fetchSingleDocument(token, id);
    setDocuments((prevDocuments) => [...prevDocuments, document]);
    setLoading(false);
  };

  const createDocument = async (document: Partial<Document>) => {
    const newDocument = await documentService.createDocument(token, document);
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
  };

  const deleteDocument = async (id: number) => {
    await documentService.deleteDocument(token, id);
    setDocuments((prevDocuments) => prevDocuments.filter((d) => d.id !== id));
  };

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    fetchSingleDocument,
    createDocument,
    deleteDocument,
  };
};
