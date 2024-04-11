import Link from "next/link";

export default function Footer({ darkMode }) {
  return (
    <section className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex flex-wrap w-full h-fit px-6 py-14 font-medium text-xl"}>
      <div className="flex flex-wrap w-full h-full space-y-8 mb-14">
        <div className="flex w-full text-center">
          <Link
            href="/"
            target="_blank"
            className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ") + "w-fit mx-auto my-auto border-b"}>
            Documentation
          </Link>
        </div>
        <div className="flex w-full text-center">
          <Link
            href="https://github.com/WikiMovimentoBrasil"
            target="_blank"
            className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ") + "w-fit mx-auto my-auto border-b"}>
            GitHub
          </Link>
        </div>
        <div className="flex w-full text-center">
          <Link
            href="https://meta.wikimedia.org/wiki/Capacity_Exchange"
            target="_blank"
            className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ") + "w-fit mx-auto my-auto border-b"}>
            Meta-wikimedia
          </Link>
        </div>
      </div>
      <div className="flex w-full h-full text-base text-center">
        <p className="mx-auto my-auto">For and by the Wikimedia Movement</p>
      </div>
    </section>
  )
}