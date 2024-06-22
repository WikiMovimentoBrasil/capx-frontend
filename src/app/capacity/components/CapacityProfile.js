import CapacityUserList from "./CapacityUserList";

export default function CapacityProfile({ selectedCapacity, selectedCapacityData, pageContent, fetchUserData }) {
  return (
    <div className="w-full space-y-8 pt-10">
      <div>
        <h1 className="text-4xl font-extrabold">{selectedCapacity.name} [<a href={`https://www.wikidata.org/wiki/${selectedCapacity.wd_code}`} target="_blank" className="text-capx-primary-green underline">{selectedCapacity.wd_code}</a>]</h1>
      </div>
      <div className="space-y-14">
        {selectedCapacityData.wanted?.length > 0 ? (
          <CapacityUserList
            title={"Users who want to learn this capacity"}
            data={selectedCapacityData.wanted}
            fetchUserData={fetchUserData}
          />
        ) : (null)}
        {selectedCapacityData.known?.length > 0 ? (
          <CapacityUserList
            title={"Users who know this capacity"}
            data={selectedCapacityData.known}
            fetchUserData={fetchUserData}
          />
        ) : (null)
        }
      </div>
    </div>
  )
}