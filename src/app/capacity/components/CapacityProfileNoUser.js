export default function CapacityProfileNoUser({ darkMode, title, noUserMessage = undefined }) {
  return (
    <div>
      <h2 className="text-xl font-extrabold mb-4">{title}</h2>
      <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full p-5 border-2 rounded-lg"}>{noUserMessage}</div>
    </div >
  )
}