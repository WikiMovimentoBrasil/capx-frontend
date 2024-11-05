import Link from "next/link";
import CapacityProfileNoUser from "./CapacityProfileNoUser";
import CapacityProfileUserList from "./CapacityProfileUserList";
import capitalizeFirstLetter from "@/lib/utils/string";

interface CapacityData {
  name: string;
  wd_code: string;
  description?: string;
  users: {
    wanted?: User[];
    known?: User[];
  };
}

interface User {
  id: string;
  name: string;
}

interface CapacityProfileViewProps {
  darkMode: boolean;
  selectedCapacityData?: CapacityData;
  pageContent: Record<string, string>;
  userId?: string;
}

export default function CapacityProfileView({
  darkMode,
  selectedCapacityData,
  pageContent,
  userId,
}: CapacityProfileViewProps) {
  if (!selectedCapacityData) {
    return <SkeletonView darkMode={darkMode} />;
  }

  return (
    <div className="w-full space-y-20 pt-10">
      <Header
        darkMode={darkMode}
        name={selectedCapacityData.name}
        wdCode={selectedCapacityData.wd_code}
        description={selectedCapacityData.description}
      />
      <CapacityProfileUserList
        darkMode={darkMode}
        users={selectedCapacityData.users}
        pageContent={pageContent}
        userId={userId}
      />
    </div>
  );
}

function Header({
  darkMode,
  name,
  wdCode,
  description,
}: {
  darkMode: boolean;
  name: string;
  wdCode: string;
  description?: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold leading-tight">
          {capitalizeFirstLetter(name)} [
          <a
            href={`https://www.wikidata.org/wiki/${wdCode}`}
            target="_blank"
            className="text-capx-primary-green underline"
          >
            {wdCode}
          </a>
          ]
        </h1>
        <CloseButton darkMode={darkMode} />
      </div>
      {description && (
        <div
          className={`${
            darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
          } w-full px-8 py-4 rounded-lg`}
        >
          <p className="text-xl sm:text-base">{description}</p>
        </div>
      )}
    </div>
  );
}

function CloseButton({ darkMode }: { darkMode: boolean }) {
  return (
    <Link className="my-auto" href="/capacity">
      <div className="rounded-full p-2">
        <svg
          className={`w-6 h-6 ${
            darkMode ? "text-capx-primary-yellow" : "text-capx-primary-red"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </div>
    </Link>
  );
}

function SkeletonView({ darkMode }: { darkMode: boolean }) {
  const baseClass = darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg";

  return (
    <div className="w-full space-y-20 pt-10">
      {/* Header skeleton */}
      <div className="space-y-6">
        <div className={`${baseClass} w-2/6 h-10 rounded-lg animate-pulse`} />
        <div
          className={`${baseClass} w-full px-8 py-4 rounded-lg animate-pulse`}
        >
          <div className={`${baseClass} w-2/6 h-8 rounded-lg animate-pulse`} />
        </div>
      </div>
      {/* User lists skeleton */}
      <div className="space-y-14">
        {[1, 2, 3].map((index) => (
          <div key={index} className="space-y-4">
            <div
              className={`${baseClass} w-2/6 h-8 rounded-lg animate-pulse`}
            />
            <div
              className={`${baseClass} grid grid-cols-10 w-full min-h-40 p-8 rounded-lg animate-pulse`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
