import axios from "axios";
import { OrganizationDocument } from "@/types/document";

export const documentService = {
  async fetchAllDocuments(token: string): Promise<OrganizationDocument[]> {
    const response = await axios.get<OrganizationDocument[]>("/api/documents", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async fetchSingleDocument(
    token: string,
    id: number
  ): Promise<OrganizationDocument> {
    const response = await axios.get<OrganizationDocument>(
      `/api/documents/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  async createDocument(
    token: string,
    document: Partial<OrganizationDocument>
  ): Promise<OrganizationDocument> {
    try {
      console.log("Creating document with payload:", document);
      const response = await axios.post<OrganizationDocument>(
        "/api/documents",
        document,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Create document response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error details:", error.response?.data);
      throw error;
    }
  },

  async deleteDocument(token: string, id: number): Promise<void> {
    await axios.delete(`/api/documents/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
