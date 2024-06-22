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
    <div className="w-full space-y-8 pt-10">
      <div>
        <h1 className="text-4xl font-extrabold">{selectedCapacity.name} [<a href={`https://www.wikidata.org/wiki/${selectedCapacity.wd_code}`} target="_blank" className="text-capx-primary-green underline">{selectedCapacity.wd_code}</a>]</h1>
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
      </div>
    </div>
  )
}