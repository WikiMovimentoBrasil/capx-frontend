import Link from "next/link";

interface FooterLink {
  title: string;
  to: string;
}
interface FooterProps {
  darkMode: boolean;
  pageContent: Record<string, string>;
}

export default function Footer({ darkMode, pageContent }: FooterProps) {
  const footerLinks = [
    {
      title: pageContent["footer-link-documentation"],
      to: "https://github.com/WikiMovimentoBrasil/capx-backend/wiki",
    },
    {
      title: pageContent["footer-link-github"],
      to: "https://github.com/WikiMovimentoBrasil/capx-backend",
    },
    {
      title: pageContent["footer-link-wikimedia"],
      to: "https://meta.wikimedia.org/wiki/Capacity_Exchange",
    },
  ] as FooterLink[];

  const baseClasses = {
    section: `flex flex-wrap sm:flex-nowrap w-full h-fit sm:h-16 px-6 py-14 sm:py-0 
      sm:place-content-between font-medium text-sm ${
        darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
      }`,
    linksContainer:
      "flex flex-wrap w-full sm:w-fit sm:flex-nowrap h-full space-y-8 sm:space-y-0 sm:space-x-10 mb-14 sm:mb-0",
    linkWrapper: "flex w-full sm:w-fit text-center sm:text-left",
    link: `w-fit mx-auto my-auto border-b ${
      darkMode
        ? "text-capx-dark-link border-capx-dark-link"
        : "text-capx-light-link border-capx-light-link"
    }`,
    messageContainer: "flex w-full sm:w-fit h-full text-base text-center",
  };

  return (
    <section className={baseClasses.section}>
      <div className={baseClasses.linksContainer}>
        {footerLinks.map((link, index) => (
          <div key={`footer-link-${index}`} className={baseClasses.linkWrapper}>
            <Link href={link.to} target="_blank" className={baseClasses.link}>
              {link.title}
            </Link>
          </div>
        ))}
      </div>
      <div className={baseClasses.messageContainer}>
        <p className="mx-auto my-auto">{pageContent["footer-message"]}</p>
      </div>
    </section>
  );
}
