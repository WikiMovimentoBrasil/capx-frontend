import CapacityProfileUserPreview from "./CapacityProfileUserPreview";

export default function CapacityProfileUserList({ darkMode, title, data = undefined, fetchUserData = undefined, noUserMessage = undefined }) {
  return (
    <div>
      <h2 className="text-xl font-extrabold mb-4">{title}</h2>
      {data ? (
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "grid grid-cols-10 w-full p-4 rounded-lg"}>
          {data.map((user, index) => { return (<CapacityProfileUserPreview key={index} darkMode={darkMode} userId={user} fetchUserData={fetchUserData} />) })}
        </div>
      ) : (
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full p-5 border-2 rounded-lg"}>{noUserMessage}</div>
      )
      }
    </div >
  )
}