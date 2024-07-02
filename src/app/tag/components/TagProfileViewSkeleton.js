export default function TagProfileViewSkeleton({ darkMode }) {
  return (
    <section className="grid grid-cols-1 w-10/12 sm:w-8/12 min-h-screen py-44 place-content-start mx-auto space-y-20">
      <div className="w-full space-y-14">
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 sm:w-2/6 h-10 rounded-lg animate-pulse"}></div>
        <div className="space-y-4">
          <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 sm:w-2/6 h-8 rounded-lg animate-pulse"}></div>
          <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "grid grid-cols-10 w-full min-h-96 sm:min-h-60 p-8 rounded-lg animate-pulse"}>
          </div>
        </div>
      </div>
    </section>
  )
}