"use client";

import { useState } from "react";
import { documentService } from "@/services/documentService";
import { OrganizationDocument } from "@/types/document";

export const useDocument = (token?: string, id?: number) => {
  const [documents, setDocuments] = useState<OrganizationDocument[]>([]);
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

  const createDocument = async (data: Partial<OrganizationDocument>) => {
    if (!token) {
      console.error("createDocument: No token provided");
      return;
    }
    try {
      console.log("useDocument - Creating document with:", data);
      const response = await documentService.createDocument(token, data);
      console.log("useDocument - Response:", response);
      return response;
    } catch (error) {
      console.error("useDocument - Error:", error);
      throw error;
    }
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
