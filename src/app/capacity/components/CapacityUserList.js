export default function CapacityUserList({ title, data }) {
  return (
    <div>
      <h2 className="mb-4">{title}</h2>
      <div className="grid grid-cols-10 w-full p-5 bg-gray-100 border-2 rounded-lg">
        {data.map((user, index) => { return (<CapacityUserPreview userId={user} fetchUserData={fetchUserData} />) })}
      </div>
    </div>
  )
}