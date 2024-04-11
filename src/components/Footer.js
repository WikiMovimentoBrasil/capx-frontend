export default function Footer({ darkMode }) {
  return (
    <section className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-16"}></section>
  )
}