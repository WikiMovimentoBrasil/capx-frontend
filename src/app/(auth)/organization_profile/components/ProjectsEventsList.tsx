import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import WikimediaIcon from "@/public/static/images/wikimedia_logo_black.svg";
import CapacityExchangeIcon from "@/public/static/images/capx_most_detailed_logo.svg";
import CalibraLogo from "@/public/static/images/logo_calibra.svg";
import { useApp } from "@/contexts/AppContext";
interface ProjectsEventsCardProps {
  title: string;
  image: string;
}

interface ProjectsEventsListProps {
  title: string;
}

const projects = [
  {
    title: "Capacity Exchange",
    image: CapacityExchangeIcon,
    category: "Main projects",
  },
  {
    title: "Calibra",
    image: CalibraLogo,
    category: "Main projects",
  },
];

const events = [
  {
    title: "Wikimedia",
    image: WikimediaIcon,
    category: "Events",
  },
];

const ProjectsEventsCard = ({ title, image }: ProjectsEventsCardProps) => {
  const { isMobile } = useApp();
  return (
    <div className="rounded-[16px] bg-[#EFEFEF] w-[350px] flex-shrink-0 flex flex-col h-[400px]">
      <div className="p-6 flex items-center justify-center h-[250px]">
        <div className="relative w-full h-[200px] flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            className="p-4"
          />
        </div>
      </div>
      <div className="p-6">
        <BaseButton
          customClass="inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal]"
          label={`${title === "Main projects" ? "Open project" : "View event"}`}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export const ProjectsEventsList = ({ title }: ProjectsEventsListProps) => {
  const { isMobile } = useApp();
  return (
    <section className="flex flex-col gap-4 mt-24">
      <div className="flex flex-row gap-4">
        <Image
          src={WikimediaIcon}
          alt="Wikimedia icon"
          width={36}
          height={36}
        />
        <h2
          className={`text-[#003649] text-center not-italic font-extrabold leading-[29px] font-[Montserrat] ${
            isMobile ? "text-[14px]" : "text-[24px]"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-row gap-8 justify-start">
        {title === "Main projects" &&
          projects.map((project) => (
            <ProjectsEventsCard
              key={project.title}
              title={project.category}
              image={project.image}
            />
          ))}
      </div>
      <div className="flex flex-row gap-8 justify-start">
        {title === "Events" &&
          events.map((event) => (
            <ProjectsEventsCard
              key={event.title}
              title={event.category}
              image={event.image}
            />
          ))}
      </div>
    </section>
  );
};
