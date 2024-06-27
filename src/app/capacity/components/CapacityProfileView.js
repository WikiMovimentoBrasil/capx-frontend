import Link from "next/link";
import CapacityProfileNoUser from "./CapacityProfileNoUser";
import CapacityProfileUserList from "./CapacityProfileUserList";

export default function CapacityProfileView({ darkMode, selectedCapacityData, pageContent, userId }) {
  if (selectedCapacityData === undefined) {
    return (
      <div className="w-full space-y-20 pt-10">
        <div className="space-y-6">
          <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-2/6 h-10 rounded-lg animate-pulse"}></div>
          <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full px-8 py-4 rounded-lg animate-pulse"}>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-2/6 h-8 rounded-lg animate-pulse"}></div>
          </div>
        </div>
        <div className="space-y-14">
          <div className="space-y-4">
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-2/6 h-8 rounded-lg animate-pulse"}></div>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "grid grid-cols-10 w-full min-h-40 p-8 rounded-lg animate-pulse"}>
            </div>
          </div>
          <div className="space-y-4">
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-2/6 h-8 rounded-lg animate-pulse"}></div>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "grid grid-cols-10 w-full min-h-40 p-8 rounded-lg animate-pulse"}>
            </div>
          </div>
          <div className="space-y-4">
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-2/6 h-8 rounded-lg animate-pulse"}></div>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "grid grid-cols-10 w-full min-h-40 p-8 rounded-lg animate-pulse"}>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-20 pt-10">
      <div className="space-y-6">
        <div className="flex justify-between">
          <h1 className="text-4xl font-extrabold">{selectedCapacityData.name} [<a href={`https://www.wikidata.org/wiki/${selectedCapacityData.wd_code}`} target="_blank" className="text-capx-primary-green underline">{selectedCapacityData.wd_code}</a>]</h1>
          <Link href={"/capacity"}>
            <div className="border-2 rounded-full p-2">
              <svg className={"w-6 h-6 " + (darkMode ? "text-capx-primary-yellow" : "text-capx-primary-red")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>
            </div>
          </Link>
        </div>
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full px-8 py-4 rounded-lg"}>
          <p>{selectedCapacityData.description}</p>
        </div>
      </div>
      <div className="space-y-14">
        {selectedCapacityData.users.wanted?.length > 0 ? (
          <CapacityProfileUserList
            darkMode={darkMode}
            title={pageContent["body-capacity-wanted-user-list-title"]}
            data={selectedCapacityData.users.wanted}
            userId={userId}
          />
        ) : (
          <CapacityProfileNoUser
            darkMode={darkMode}
            title={pageContent["body-capacity-wanted-user-list-title"]}
            noUserMessage={pageContent["body-capacity-user-list-fallback"]}
          />
        )}
        {selectedCapacityData.users.known?.length > 0 ? (
          <CapacityProfileUserList
            darkMode={darkMode}
            title={pageContent["body-capacity-known-user-list-title"]}
            data={selectedCapacityData.users.known}
            userId={userId}
          />
        ) : (
          <CapacityProfileNoUser
            darkMode={darkMode}
            title={pageContent["body-capacity-known-user-list-title"]}
            noUserMessage={pageContent["body-capacity-user-list-fallback"]}
          />
        )}
        {selectedCapacityData.users.available?.length > 0 ? (
          <CapacityProfileUserList
            darkMode={darkMode}
            title={pageContent["body-capacity-available-user-list-title"]}
            data={selectedCapacityData.users.available}
            userId={userId}
          />
        ) : (
          <CapacityProfileNoUser
            darkMode={darkMode}
            title={pageContent["body-capacity-available-user-list-title"]}
            noUserMessage={pageContent["body-capacity-user-list-fallback"]}
          />
        )}
      </div>
    </div>
  )
}