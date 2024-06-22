import CapacityUserPreview from "./CapacityUserPreview"

export default function CapacityProfile({ selectedCapacity, selectedCapacityData, pageContent, fetchUserData }) {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold">{selectedCapacity.name} [<a href={`https://www.wikidata.org/wiki/${selectedCapacity.wd_code}`} target="_blank" className="text-capx-primary-green underline">{selectedCapacity.wd_code}</a>]</h1>
      </div>
    </div>
  )
}