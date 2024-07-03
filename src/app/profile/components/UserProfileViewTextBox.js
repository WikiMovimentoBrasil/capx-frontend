export default function UserProfileViewTextBox({ darkMode, title = undefined, info }) {
  return (
    <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full px-8 py-6 space-y-2 mx-auto rounded-lg break-words"}>
      {title !== undefined ? (
        <div className="flex-none sm:flex space-x-4 space-y-2 sm:space-y-0 place-content-center">
          <p className="text-xl font-extrabold">{title}</p>
          <p className="hidden sm:block">|</p>
          <p>{info}</p>
        </div>
      ) : (
        <p>{info}</p>
      )}
    </div>
  )
}