import CapacityUserList from "./CapacityUserList";

export default function CapacityProfile({ darkMode, selectedCapacity, selectedCapacityData, pageContent, fetchUserData }) {
  return (
    <div className="w-full space-y-8 pt-10">
      <div>
        <h1 className="text-4xl font-extrabold">{selectedCapacity.name} [<a href={`https://www.wikidata.org/wiki/${selectedCapacity.wd_code}`} target="_blank" className="text-capx-primary-green underline">{selectedCapacity.wd_code}</a>]</h1>
      </div>
      <div className="space-y-14">
        {selectedCapacityData.wanted?.length > 0 ? (
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
        )}
        {selectedCapacityData.known?.length > 0 ? (
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
        }
        {selectedCapacityData.available?.length > 0 ? (
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
        }
      </div>
    </div>
  )
}