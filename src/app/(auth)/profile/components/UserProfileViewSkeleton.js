export default function UserProfileViewSkeleton({ darkMode }) {
  return (
    <section className={"w-10/12 sm:w-8/12 h-screen mx-auto py-32"}>
      <div className="grid grid-cols-1 sm:grid-cols-1 w-full sm:w-7/12 h-fit mx-auto text-center text-xl space-y-14">
        <div>
          <div className={"w-48 h-48 mx-auto rounded-full ring-offset-4 ring-8 animate-pulse" + (darkMode ? " bg-capx-dark-box-bg ring-offset-capx-dark-box-bg ring-capx-dark-box-bg" : " bg-capx-light-box-bg ring-offset-capx-light-box-bg ring-capx-light-box-bg")}></div>
        </div>
        <div className="grid w-full place-items-center space-y-10">
          <div className="w-full space-y-2">
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/2 h-10 mx-auto rounded-lg animate-pulse"}></div>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/4 h-6 mx-auto rounded-lg animate-pulse"}></div>
          </div>
          <div className="w-full space-y-8">
            <div className="w-full space-y-2">
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 mx-auto rounded-lg animate-pulse"}></div>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 mx-auto rounded-lg animate-pulse"}></div>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
            </div>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/2 h-8 mx-auto rounded-lg animate-pulse"}></div>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
          </div>
          <div className="w-full space-y-2">
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-1/2 h-8 mx-auto rounded-lg animate-pulse"}></div>
            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-8 mx-auto rounded-lg animate-pulse"}></div>
          </div>
        </div>
      </div>
    </section>
  )
}