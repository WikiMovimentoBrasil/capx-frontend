"use client";

import { useState, useEffect } from "react";
import { documentService } from "@/services/documentService";
import { OrganizationDocument, WikimediaDocument } from "@/types/document";
import { fetchWikimediaData } from "@/lib/utils/fetchWikimediaData";

export const useDocument = (token?: string, id?: number) => {
  const [documents, setDocuments] = useState<WikimediaDocument[]>([]);
  const [document, setDocument] = useState<WikimediaDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllDocuments = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await documentService.fetchAllDocuments(token);

      // Map para garantir que os IDs e URLs estejam corretos
      const formattedDocs = response.map((doc) => ({
        ...doc,
        id: doc.id || 0,
        url: doc.url || "",
      }));

      setDocuments(formattedDocs);
      console.log("Fetched documents:", formattedDocs); // Debug log
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleDocument = async () => {
    if (!token || !id) return;

    setLoading(true);
    try {
      const basicDocument = await documentService.fetchSingleDocument(
        token,
        id
      );
      if (basicDocument) {
        const enrichedDocument = await fetchWikimediaData(
          basicDocument.url || ""
        );
        setDocument(enrichedDocument);
        return enrichedDocument;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      setError("Failed to fetch document");
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async (data: Partial<OrganizationDocument>) => {
    if (!token) {
      console.error("createDocument: No token provided");
      return;
    }
    try {
      const documentPayload = {
        url: data.url,
      };

      const response = await documentService.createDocument(
        token,
        documentPayload
      );

      if (response && response.id) {
        const enrichedDocument = await fetchWikimediaData(response.url || "");
        setDocument(enrichedDocument);
      }

      return response;
    } catch (error) {
      console.error("useDocument - Error:", error);
      throw error;
    }
  };

  const deleteDocument = async (id: number) => {
    if (!token) return;

    try {
      await documentService.deleteDocument(token, id);
      setDocument(null);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  };

  // Carregar todos os documentos ao inicializar
  useEffect(() => {
    if (token && !id) {
      console.log("Fetching documents with token:", token);
      fetchAllDocuments();
    }
  }, [token]);

  // Carregar documento específico quando o ID mudar
  useEffect(() => {
    if (id) {
      fetchSingleDocument();
    }
  }, [id, token]);

  return {
    documents, // Lista completa de documentos
    document, // Documento único quando ID é fornecido
    loading,
    error,
    fetchAllDocuments,
    fetchSingleDocument,
    createDocument,
    deleteDocument,
  };
};
