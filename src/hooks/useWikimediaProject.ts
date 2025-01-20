import { useState, useEffect } from "react";
import { WikimediaProjects } from "@/types/wikimediaProject";
import {
  fetchWikimediaProjects,
  fetchWikimediaProjectImages,
} from "@/services/wikimediaProjectService";

export const useWikimediaProject = (
  token: string | undefined,
  projectIds?: string[]
) => {
  console.log("projectIds", projectIds);
  const [wikimediaProjects, setWikimediaProjects] = useState<WikimediaProjects>(
    {}
  );
  const [wikimediaProjectImages, setWikimediaProjectImages] = useState<
    Record<string, string>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWikimediaProjects = async () => {
      try {
        const data = await fetchWikimediaProjects(token);
        setWikimediaProjects(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load wikimedia projects"
        );
      } finally {
        setLoading(false);
      }
    };

    loadWikimediaProjects();
  }, [token]);

  console.log("wikimediaProjects", wikimediaProjects);
  useEffect(() => {
    if (projectIds?.length) {
      const loadWikimediaProjectImages = async () => {
        try {
          const images: Record<string, string> = {};
          for (const projectId of projectIds) {
            if (projectId) {
              const image = await fetchWikimediaProjectImages(projectId, token);
              console.log("image", image);
              images[projectId] = image;
            }
          }
          setWikimediaProjectImages(images);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load wikimedia project images"
          );
        }
      };
      loadWikimediaProjectImages();
    }
  }, [token, projectIds]);

  return { wikimediaProjects, loading, error, wikimediaProjectImages };
};
