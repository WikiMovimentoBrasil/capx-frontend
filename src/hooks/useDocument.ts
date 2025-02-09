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

  const fetchAllDocuments = async (): Promise<WikimediaDocument[]> => {
    if (!token) return [];
    setLoading(true);
    try {
      const basicDocuments = await documentService.fetchAllDocuments(token);
      const enrichedDocuments = await Promise.all(
        basicDocuments.map((doc) => fetchWikimediaData(doc.url || ""))
      );

      const typedDocuments = enrichedDocuments.map((doc) => ({
        id: doc.id,
        url: doc.url,
        title: doc.title,
        imageUrl: doc.imageUrl,
        fullUrl: doc.fullUrl,
        metadata: doc.metadata,
        thumburl: doc.thumburl,
      })) as WikimediaDocument[];

      setDocuments(typedDocuments);
      return typedDocuments;
    } catch (error) {
      console.error("Error fetching all documents:", error);
      setError("Failed to fetch documents");
      return [];
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
