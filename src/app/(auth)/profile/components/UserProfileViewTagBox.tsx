import Link from "next/link";
import capitalizeFirstLetter from "@/lib/utils/string";

interface UserProfileViewTagBoxProps {
  darkMode: boolean;
  data: any[]; //TODO: Define data type
  tagList: any[]; //TODO: Define tagList type
  endpoint: string;
}

export default function UserProfileViewTagBox({
  darkMode,
  data,
  tagList,
  endpoint,
}: UserProfileViewTagBoxProps) {
  return (
    <div
      className={
        (darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") +
        "flex flex-wrap w-full place-content-center gap-y-4 gap-x-4 px-8 py-6 rounded-lg"
      }
    >
      {data?.map((item, index) => (
        <Link
          key={index}
          href={`/${endpoint}/${item}`}
          className="bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-widest text-base sm:text-base px-4 sm:px-5 py-3 rounded-lg"
        >
          {capitalizeFirstLetter(tagList[item])}
        </Link>
      ))}
    </div>
  );
}
