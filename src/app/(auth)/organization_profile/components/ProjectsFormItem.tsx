import { useTheme } from "@/contexts/ThemeContext";
import ImagesModeIcon from "@/public/static/images/images_mode.svg";
import AddLinkIcon from "@/public/static/images/add_link.svg";
import CancelIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectFormItemProps {
  project: Project;
  index: number;
  onDelete: (id: number) => void;
  onChange: (index: number, field: keyof Project, value: string) => void;
}

const ProjectFormItem = ({
  project,
  index,
  onDelete,
  onChange,
}: ProjectFormItemProps) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-row gap-2 w-1/2 items-center text-[12px] p-2 border rounded-md bg-transparent">
        <input
          type="text"
          placeholder="Project Name"
          value={project.display_name || ""}
          onChange={(e) => onChange(index, "display_name", e.target.value)}
          className={`w-full bg-transparent border-none outline-none ${
            darkMode
              ? "text-white placeholder-gray-400"
              : "text-[#829BA4] placeholder-[#829BA4]"
          }`}
        />
      </div>

      <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
        <Image
          src={ImagesModeIcon}
          alt="Project image icon"
          width={16}
          height={16}
          className="opacity-50"
        />
        <input
          type="text"
          placeholder="Project Image"
          className={`w-full bg-transparent border-none outline-none ${
            darkMode
              ? "text-white placeholder-gray-400"
              : "text-[#829BA4] placeholder-[#829BA4]"
          }`}
          value={project.profile_image}
          onChange={(e) => onChange(index, "profile_image", e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
        <div className="relative w-[20px] h-[20px]">
          <Image
            src={AddLinkIcon}
            alt="Add link icon"
            className="object-contain"
          />
        </div>
        <input
          type="text"
          placeholder="Link of project"
          className={`w-full bg-transparent border-none outline-none ${
            darkMode
              ? "text-white placeholder-gray-400"
              : "text-[#829BA4] placeholder-[#829BA4]"
          }`}
          value={project.url}
          onChange={(e) => onChange(index, "url", e.target.value)}
        />
      </div>

      <button onClick={() => onDelete(project.id)}>
        <div className="relative w-[20px] h-[20px]">
          <Image
            src={darkMode ? CancelIconWhite : CancelIcon}
            alt="Delete icon"
            className="object-contain"
          />
        </div>
      </button>
    </div>
  );
};

export default ProjectFormItem;
