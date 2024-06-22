import CapacityUserPreview from "./CapacityUserPreview";

export default function CapacityUserList({ title, data = undefined, fetchUserData = undefined, noUserMessage = undefined }) {
  return (
    <div>
      <h2 className="mb-4">{title}</h2>
      {data ? (
        <div className="grid grid-cols-10 w-full p-4 bg-gray-100 border-2 rounded-lg">
          {data.map((user, index) => { return (<CapacityUserPreview key={index} userId={user} fetchUserData={fetchUserData} />) })}
        </div>
      ) : (
        <div className="w-full bg-gray-100 p-5 border-2 rounded-lg">{noUserMessage}</div>
      )
      }
    </div >
  )
}