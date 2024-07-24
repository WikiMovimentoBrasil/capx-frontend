import Link from "next/link";
import {capitalizeFirstLetter} from "@/app/capacity/components/utils";

export default function UserProfileViewCapacityBox({ darkMode, data, endpoint }) {
  return (
    <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex flex-wrap w-full place-content-center gap-y-4 gap-x-4 px-8 py-6 rounded-lg"}>
      {data?.map((item, index) => (
        <Link
          key={index} href={`/${endpoint}/${item.code}`}
          className="bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] tracking-widest text-base sm:text-base px-4 sm:px-5 py-3 rounded-lg">
          {capitalizeFirstLetter(item.name)}
        </Link>
      ))}
    </div>
  )
}