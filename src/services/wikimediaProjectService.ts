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
  projectId: string,
  token: string | undefined
): Promise<string> => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  const response = await axios.get<{ project_image: string }>(
    `/api/projects/${projectId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  if (!response.data.project_image) {
    throw new Error("No image found for project");
  }

  return response.data.project_image;
};
