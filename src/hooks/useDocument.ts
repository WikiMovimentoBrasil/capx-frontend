"use client";

import { useState, useEffect } from "react";
import { documentService } from "@/services/documentService";
import {
  OrganizationDocument,
  WikimediaDocumentResponse,
  WikimediaDocument,
} from "@/types/document";

export const useDocument = (token?: string, id?: number) => {
  const [documents, setDocuments] = useState<WikimediaDocument[]>([]);
  const [document, setDocument] = useState<WikimediaDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWikimediaData = async (document: OrganizationDocument) => {
    try {
      // Extrair o nome do arquivo da URL
      let fileName = "";

      if (document.url?.includes("commons.wikimedia.org/wiki/File:")) {
        fileName = document.url?.split("File:")[1];
      } else if (
        document.url?.includes("upload.wikimedia.org/wikipedia/commons/")
      ) {
        const parts = document.url?.split("/");
        fileName = parts[parts.length - 1];
      } else {
        fileName = document.url || "";
      }

      // Adicionar o formato=json e origin=* para CORS
      const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&formatversion=2&format=json&iiprop=url%7Cmetadata&iiurlheight=200&titles=File:${encodeURIComponent(
        fileName
      )}&origin=*`;

      const response = await fetch(apiUrl);
      const data: WikimediaDocumentResponse = await response.json();

      if (data.query?.pages?.[0]) {
        const page = data.query.pages[0];
        const imageInfo = page.imageinfo?.[0];

        return {
          ...document,
          title: page.title.replace("File:", ""),
          imageUrl: imageInfo?.thumburl,
          fullUrl: imageInfo?.url,
          metadata: imageInfo?.metadata,
          thumburl: imageInfo?.thumburl,
        };
      }
      return document;
    } catch (error) {
      console.error("Error fetching Wikimedia data:", error);
      return document;
    }
  };

  const fetchAllDocuments = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const basicDocuments = await documentService.fetchAllDocuments(token);
      const enrichedDocuments = await Promise.all(
        basicDocuments.map((doc) => fetchWikimediaData(doc))
      );
      setDocuments(enrichedDocuments);
      return enrichedDocuments;
    } catch (error) {
      console.error("Error fetching all documents:", error);
      setError("Failed to fetch documents");
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
        const enrichedDocument = await fetchWikimediaData(basicDocument);
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
        const enrichedDocument = await fetchWikimediaData(response);
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
