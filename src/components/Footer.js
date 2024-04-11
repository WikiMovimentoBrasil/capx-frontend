import Link from "next/link";

export default function Footer({ darkMode }) {
  return (
    <section className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-16"}>
      <div className="">
        <div className="">
          <Link
            href="/"
            target="_blank"
            className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ")}>
            Documentation
          </Link>
        </div>
      </div>
    </section>
  )
}