import { useTheme } from "@/contexts/ThemeContext";
import CancelIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import Image from "next/image";
import { Post } from "@/types/news";

interface NewsFormItemProps {
  news: Post;
  index: number;
  onDelete: (index: number) => void;
  onChange: (index: number, field: keyof Post, value: string) => void;
}

const NewsFormItem = ({
  news,
  index,
  onDelete,
  onChange,
}: NewsFormItemProps) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row gap-2 w-full items-center text-[24px] md:text-[24px] text-[16px] p-2 border rounded-md bg-transparent">
          <input
            type="text"
            placeholder="Add a Diff Tag"
            value={news.title || ""}
            onChange={(e) => onChange(index, "title", e.target.value)}
            className={`w-full bg-transparent border-none outline-none text-[16px] md:text-[24px] ${
              darkMode
                ? "text-white placeholder-gray-400"
                : "text-[#829BA4] placeholder-[#829BA4]"
            }`}
          />
        </div>
      </div>
      <button onClick={() => onDelete(index)}>
        <div className="relative md:w-[32px] md:h-[32px] w-[24px] h-[24px]">
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
};

export default NewsFormItem;
