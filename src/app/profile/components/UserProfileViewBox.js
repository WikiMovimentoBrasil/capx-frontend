export default function UserProfileViewBox({ darkMode, title = undefined, info }) {
  return (
    <div className="w-full space-y-4">
      <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full px-8 py-6 space-y-2 mx-auto rounded-lg break-words"}>
        {title !== undefined ? (<p><span className="text-xl font-extrabold">{title}</span> | {info}</p>) : (<p>{info}</p>)}
      </div>
    </div>
  )
}