import { useTheme } from "@/contexts/ThemeContext";
import ImagesModeIcon from "@/public/static/images/images_mode.svg";
import AddLinkIcon from "@/public/static/images/add_link.svg";
import CancelIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import Image from "next/image";
import { Event } from "@/types/event";
import { useApp } from "@/contexts/AppContext";

interface EventFormItemProps {
  eventData: Event;
  index: number;
  onDelete: (id: number) => void;
  onChange: (index: number, field: keyof Event, value: string) => void;
}

console.log("event", event);

const validateImageUrl = (url: string) => {
  if (!url) return url;

  try {
    // Remove qualquer caractere @ do início da URL
    url = url.replace(/^@/, "");

    // Verifica se é uma URL válida
    const urlObj = new URL(url);

    // Verifica se é uma URL do Wikimedia Commons
    if (
      urlObj.hostname === "commons.wikimedia.org" &&
      url.includes("/wiki/File:")
    ) {
      return url;
    } else if (
      urlObj.hostname === "upload.wikimedia.org" &&
      url.includes("/wikipedia/commons/")
    ) {
      return url;
    }
    console.log("URL válida:", urlObj);
    // Se não for uma URL do Commons válida, retorna vazia
    return "";
  } catch {
    return "";
  }
};

const EventFormItem = ({
  eventData,
  index,
  onDelete,
  onChange,
}: EventFormItemProps) => {
  const { darkMode } = useTheme();
  const { isMobile } = useApp();

  if (isMobile) {
    return (
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-2 w-full items-center text-[12px] md:text-[24px] text-[16px] p-2 border rounded-md bg-transparent">
            <input
              type="text"
              placeholder="Event Name"
              value={eventData.name || ""}
              onChange={(e) => onChange(index, "name", e.target.value)}
              className={`w-full bg-transparent border-none outline-none text-[12px] md:text-[24px] ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-[#829BA4] placeholder-[#829BA4]"
              }`}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex items-center gap-2 p-2 text-[12px] md:text-[24px] border rounded-md w-full md:w-1/2 bg-transparent">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  src={ImagesModeIcon}
                  alt="Project image icon"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="text"
                placeholder="Project Image"
                className={`w-full bg-transparent border-none outline-none text-[12px] md:text-[24px] ${
                  darkMode
                    ? "text-white placeholder-gray-400"
                    : "text-[#829BA4] placeholder-[#829BA4]"
                }`}
                value={eventData.image_url}
                onChange={(e) => {
                  const validatedUrl = validateImageUrl(e.target.value);
                  onChange(index, "image_url", validatedUrl);
                }}
              />
            </div>
            <div className="flex items-center gap-2 p-2 text-[12px] md:text-[24px] border rounded-md w-full md:w-1/2 bg-transparent">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  src={AddLinkIcon}
                  alt="Add link icon"
                  className="object-contain"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="text"
                placeholder="Link of project"
                className={`w-full bg-transparent border-none outline-none text-[12px] md:text-[24px] ${
                  darkMode
                    ? "text-white placeholder-gray-400"
                    : "text-[#829BA4] placeholder-[#829BA4]"
                }`}
                value={eventData.url}
                onChange={(e) => onChange(index, "url", e.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={() => onDelete(eventData.id)}>
          <div className="relative w-[24px] h-[24px]">
            <Image
              src={darkMode ? CancelIconWhite : CancelIcon}
              alt="Delete icon"
              className="object-contain"
              width={24}
              height={24}
            />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row gap-2 w-full items-center text-[24px] p-2 border rounded-md bg-transparent">
          <input
            type="text"
            placeholder="Event Name"
            value={eventData.name || ""}
            onChange={(e) => onChange(index, "name", e.target.value)}
            className={`w-full bg-transparent border-none outline-none ${
              darkMode
                ? "text-white placeholder-gray-400"
                : "text-[#829BA4] placeholder-[#829BA4]"
            }`}
          />
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-2 p-2 text-[24px] border rounded-md w-1/2 bg-transparent">
            <Image
              src={ImagesModeIcon}
              alt="Project image icon"
              width={32}
              height={32}
              className="opacity-50"
            />
            <input
              type="text"
              placeholder="Project Image"
              className={`w-full text-[24px] bg-transparent border-none outline-none ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-[#829BA4] placeholder-[#829BA4]"
              }`}
              value={eventData.image_url}
              onChange={(e) => {
                const validatedUrl = validateImageUrl(e.target.value);
                onChange(index, "image_url", validatedUrl);
              }}
            />
          </div>
          <div className="flex items-center gap-2 p-2 text-[24px] border rounded-md items-center w-1/2 bg-transparent">
            <div className="relative w-[32px] h-[32px]">
              <Image
                src={AddLinkIcon}
                alt="Add link icon"
                className="object-contain"
                width={32}
                height={32}
              />
            </div>
            <input
              type="text"
              placeholder="Link of project"
              className={`w-full bg-transparent border-none items-center text-[24px] outline-none ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-[#829BA4] placeholder-[#829BA4]"
              }`}
              value={eventData.url}
              onChange={(e) => onChange(index, "url", e.target.value)}
            />
          </div>
        </div>
      </div>
      <button onClick={() => onDelete(eventData.id)}>
        <div className="relative w-[32px] h-[32px] items-center">
          <Image
            src={darkMode ? CancelIconWhite : CancelIcon}
            alt="Delete icon"
            className="object-contain"
            width={32}
            height={32}
          />
        </div>
      </button>
    </div>
  );
};

export default EventFormItem;
