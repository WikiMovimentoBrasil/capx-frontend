import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { projectsService } from "@/services/projectsService";

export function useProject(projectId: number, token?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!token || !projectId) return;

      setIsLoading(true);
      try {
        const projectData = await projectsService.getProjectById(
          projectId,
          token
        );
        setProject(projectData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch project")
        );
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, token]);

  const updateProject = async (data: Partial<Project>) => {
    if (!token || !projectId) return;
    try {
      const updatedProject = await projectsService.updateProject(
        projectId,
        token,
        data
      );
      setProject(updatedProject);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update project")
      );
    }
  };

  return {
    project,
    isLoading,
    error,
    updateProject,
  };
}
