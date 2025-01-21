import Image from "next/image";
import WikimediaIcon from "@/public/static/images/wikimedia_logo_black.svg";
import WikimediaIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ProjectCard } from "./ProjectCard";

interface ProjectsEventsListProps {
  title: string;
  projectIds?: number[];
  token?: string;
}

export const ProjectsEventsList = ({
  title,
  projectIds = [],
  token,
}: ProjectsEventsListProps) => {
  const { darkMode } = useTheme();
  const { isMobile } = useApp();

  if (projectIds.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 mt-24">
      <div className="flex flex-row gap-4">
        <Image
          src={darkMode ? WikimediaIconWhite : WikimediaIcon}
          alt="Wikimedia icon"
          width={36}
          height={36}
          style={{ width: "auto", height: "auto" }}
        />
        <h2
          className={`text-center not-italic font-extrabold leading-[29px] font-[Montserrat] ${
            darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
          } ${isMobile ? "text-[14px]" : "text-[24px]"}`}
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-row gap-8 justify-start overflow-x-auto">
        {projectIds.map((projectId) => (
          <ProjectCard key={projectId} projectId={projectId} token={token} />
        ))}
      </div>
    </section>
  );
};
