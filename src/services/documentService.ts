import axios from "axios";
import { Document } from "@/types/document";

export const documentService = {
  async fetchAllDocuments(token: string): Promise<Document[]> {
    const response = await axios.get<Document[]>("/api/documents/", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async fetchSingleDocument(token: string, id: number): Promise<Document> {
    const response = await axios.get<Document>(`/api/documents/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async createDocument(
    token: string,
    document: Partial<Document>
  ): Promise<Document> {
    const response = await axios.post<Document>("/api/documents/", document, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async deleteDocument(token: string, id: number): Promise<void> {
    await axios.delete(`/api/documents/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
  },
};
