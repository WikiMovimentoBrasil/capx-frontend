import CapacityUserPreview from "./CapacityUserPreview";

export default function CapacityUserList({ darkMode, title, data = undefined, fetchUserData = undefined, noUserMessage = undefined }) {
  return (
    <div>
      <h2 className="mb-4">{title}</h2>
      {data ? (
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "grid grid-cols-10 w-full p-4 rounded-lg"}>
          {data.map((user, index) => { return (<CapacityUserPreview key={index} darkMode={darkMode} userId={user} fetchUserData={fetchUserData} />) })}
        </div>
      ) : (
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full p-5 border-2 rounded-lg"}>{noUserMessage}</div>
      )
      }
    </div >
  )
}