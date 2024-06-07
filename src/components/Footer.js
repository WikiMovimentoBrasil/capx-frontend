import Link from "next/link";

export default function Footer({ darkMode, pageContent }) {
  const footerLinks = [
    { "title": pageContent["footer-link-documentation"], "to": "/" },
    { "title": pageContent["footer-link-github"], "to": "https://github.com/WikiMovimentoBrasil" },
    { "title": pageContent["footer-link-wikimedia"], "to": "https://meta.wikimedia.org/wiki/Capacity_Exchange" }
  ]

  return (
    <section className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex flex-wrap sm:flex-nowrap w-full h-fit sm:h-16 px-6 py-14 sm:py-0 sm:place-content-between font-medium text-xl sm:text-lg"}>
      <div className="flex flex-wrap w-full sm:w-fit sm:flex-nowrap h-full space-y-8 sm:space-y-0 sm:space-x-10 mb-14 sm:mb-0">
        {footerLinks.map((link, index) => {
          return (
            <div
              key={"footer-link-" + index.toString()}
              className="flex w-full sm:w-fit text-center sm:text-left"
            >
              <Link
                href={link.to}
                target="_blank"
                className={(darkMode ? "text-capx-dark-link border-capx-dark-link " : "text-capx-light-link border-capx-light-link ") + "w-fit mx-auto my-auto border-b"}
              >
                {link.title}
              </Link>
            </div>
          )
        })}
      </div>
      <div className="flex w-full sm:w-fit h-full text-base sm:text-lg text-center">
        <p className="mx-auto my-auto">{pageContent["footer-message"]}</p>
      </div>
    </section>
  )
}