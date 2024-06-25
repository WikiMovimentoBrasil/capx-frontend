import CapacityUserList from "./CapacityUserList";

export default function CapacityProfile({ darkMode, selectedCapacity, selectedCapacityData, pageContent, fetchUserData }) {
  const skeletonItems = (
    <div className="space-y-4">
      <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-2/6 h-8 rounded-lg animate-pulse"}></div>
      <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "grid grid-cols-10 w-full min-h-40 p-8 rounded-lg animate-pulse"}>
      </div>
    </div>
  )

  return (
    <div className="w-full space-y-20 pt-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold">{selectedCapacity.name} [<a href={`https://www.wikidata.org/wiki/${selectedCapacity.wd_code}`} target="_blank" className="text-capx-primary-green underline">{selectedCapacity.wd_code}</a>]</h1>
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full px-8 py-4 rounded-lg"}>
          <p>{selectedCapacity.description}</p>
        </div>
      </div>
      <div className="space-y-14">
        {selectedCapacityData === undefined ? (
          skeletonItems
        ) : (
          selectedCapacityData.wanted?.length > 0 ? (
            <CapacityUserList
              darkMode={darkMode}
              title={pageContent["body-capacity-wanted-user-list-title"]}
              data={selectedCapacityData.wanted}
              fetchUserData={fetchUserData}
            />
          ) : (
            <CapacityUserList
              darkMode={darkMode}
              title={pageContent["body-capacity-wanted-user-list-title"]}
              noUserMessage={pageContent["body-capacity-user-list-fallback"]}
            />
          )
        )}
        {selectedCapacityData === undefined ? (
          skeletonItems
        ) : (
          selectedCapacityData.known?.length > 0 ? (
            <CapacityUserList
              darkMode={darkMode}
              title={pageContent["body-capacity-known-user-list-title"]}
              data={selectedCapacityData.known}
              fetchUserData={fetchUserData}
            />
          ) : (
            <CapacityUserList
              darkMode={darkMode}
              title={pageContent["body-capacity-known-user-list-title"]}
              noUserMessage={pageContent["body-capacity-user-list-fallback"]}
            />
          )
        )}
        {selectedCapacityData === undefined ? (
          skeletonItems
        ) : (
          selectedCapacityData.available?.length > 0 ? (
            <CapacityUserList
              darkMode={darkMode}
              title={pageContent["body-capacity-available-user-list-title"]}
              data={selectedCapacityData.available}
              fetchUserData={fetchUserData}
            />
          ) : (
            <CapacityUserList
              darkMode={darkMode}
              title={pageContent["body-capacity-available-user-list-title"]}
              noUserMessage={pageContent["body-capacity-user-list-fallback"]}
            />
          )
        )}
      </div>
    </div>
  )
}