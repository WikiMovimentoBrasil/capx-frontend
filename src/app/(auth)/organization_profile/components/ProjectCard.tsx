import { useProject } from "@/hooks/useProjects";
import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";

interface ProjectCardProps {
  projectId: number;
  token?: string;
}

export const ProjectCard = ({ projectId, token }: ProjectCardProps) => {
  const { project, isLoading, error } = useProject(projectId, token);
  const { darkMode } = useTheme();
  const { pageContent } = useApp();

  if (isLoading) {
    return <div className="loading-skeleton">Loading...</div>;
  }

  if (error || !project) {
    return null;
  }

  // Convert Commons file page URL to direct image URL if needed
  const getImageUrl = (url: string) => {
    if (url.includes("commons.wikimedia.org/wiki/File:")) {
      const fileName = url.split("File:").pop();
      if (fileName) {
        return `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${encodeURIComponent(
          fileName
        )}`;
      }
    }
    return url;
  };

  const imageUrl = project.profile_image
    ? getImageUrl(project.profile_image)
    : null;

  return (
    <div
      className={`rounded-[16px] w-[350px] flex-shrink-0 flex flex-col h-[400px] ${
        darkMode ? "bg-[#EFEFEF]" : "bg-[#EFEFEF]"
      }`}
    >
      <div className="p-6 flex items-center justify-center h-[250px]">
        <div className="relative w-full h-[200px] flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.display_name}
              fill
              style={{ objectFit: "contain" }}
              className="p-4"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              {pageContent["organization-profile-no-image-available"]}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <BaseButton
          customClass="inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal]"
          label={pageContent["organization-profile-open-project"]}
          onClick={() => window.open(project.url, "_blank")}
        />
      </div>
    </div>
  );
};
