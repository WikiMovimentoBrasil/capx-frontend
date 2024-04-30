export default function LoadingSection({ darkMode }) {
  return (
    <section className="grid w-full h-screen place-content-center">
      <div className={(darkMode ? "border-l-white border-r-white border-b-white border-t-capx-primary-green " : "border-l-capx-light-box-bg border-r-capx-light-box-bg border-b-capx-light-box-bg border-t-capx-secondary-purple ") + "animate-spin ease-linear h-10 w-10 rounded-full border-8"}></div>
    </section>
  )
}