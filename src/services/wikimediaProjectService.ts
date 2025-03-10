import { WikimediaProjects } from "@/types/wikimediaProject";
import axios from "axios";

export const fetchWikimediaProjects = async (
  token: string | undefined
): Promise<WikimediaProjects> => {
  const response = await axios.get<WikimediaProjects>(
    `/api/list/wikimedia_project/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchWikimediaProjectImages = async (
  projectId: number,
  token: string | undefined
): Promise<string> => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  const response = await axios.get<{
    wikimedia_project_picture: string;
  }>(`/api/wikimedia_project/${projectId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.data.wikimedia_project_picture) {
    throw new Error("No image found for project");
  }

  return response.data.wikimedia_project_picture;
};
