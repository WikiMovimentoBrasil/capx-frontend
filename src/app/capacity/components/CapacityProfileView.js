import CapacityProfileUserList from "./CapacityProfileUserList";

export default function CapacityProfileView({ darkMode, selectedCapacityData, pageContent, fetchUserData }) {
  if (selectedCapacityData === undefined) {
    return (
      <div className="w-full space-y-20 pt-10">
        <div className="space-y-4">
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
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold">{selectedCapacityData.name} [<a href={`https://www.wikidata.org/wiki/${selectedCapacityData.wd_code}`} target="_blank" className="text-capx-primary-green underline">{selectedCapacityData.wd_code}</a>]</h1>
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
            fetchUserData={fetchUserData}
          />
        ) : (
          <CapacityProfileUserList
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
            fetchUserData={fetchUserData}
          />
        ) : (
          <CapacityProfileUserList
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
            fetchUserData={fetchUserData}
          />
        ) : (
          <CapacityProfileUserList
            darkMode={darkMode}
            title={pageContent["body-capacity-available-user-list-title"]}
            noUserMessage={pageContent["body-capacity-user-list-fallback"]}
          />
        )}
      </div>
    </div>
  )
}