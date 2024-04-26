export default function BlankSection(props) {
  return (
    <main className={(props.darkMode ? "bg-capx-dark-bg text-capx-light-bg " : "bg-capx-light-bg text-capx-dark-bg ") + " w-full h-screen"}></main>
  )
}