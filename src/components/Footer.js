import Link from "next/link";

export default function Footer({ darkMode }) {
  return (
    <section className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex flex-wrap sm:flex-nowrap w-full h-fit sm:h-16 px-6 py-14 sm:py-0 sm:place-content-between font-medium text-xl sm:text-lg"}>
      <div className="flex flex-wrap w-full sm:w-fit sm:flex-nowrap h-full space-y-8 sm:space-y-0 sm:space-x-10 mb-14 sm:mb-0">
        <div className="flex w-full sm:w-fit text-center sm:text-left">
          <Link
            href="/"
            target="_blank"
            className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ") + "w-fit mx-auto my-auto border-b"}>
            Documentation
          </Link>
        </div>
        <div className="flex w-full sm:w-fit text-center sm:text-left">
          <Link
            href="https://github.com/WikiMovimentoBrasil"
            target="_blank"
            className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ") + "w-fit mx-auto my-auto border-b"}>
            GitHub
          </Link>
        </div>
        <div className="flex w-full sm:w-fit text-center sm:text-left">
          <Link
            href="https://meta.wikimedia.org/wiki/Capacity_Exchange"
            target="_blank"
            className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ") + "w-fit mx-auto my-auto border-b"}>
            Meta-wikimedia
          </Link>
        </div>
      </div>
      <div className="flex w-full sm:w-fit h-full text-base sm:text-lg text-center">
        <p className="mx-auto my-auto">For and by the Wikimedia Movement</p>
      </div>
    </section>
  )
}