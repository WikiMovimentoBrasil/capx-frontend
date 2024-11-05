import { Link } from "react-scroll";
import NextLink from "next/link";

interface MenuItem {
  title: string;
  to: string;
  active: boolean;
}

interface NavbarLinksProps {
  session: boolean;
  pageContent: Record<string, string>;
}

export function NavbarLinks({ session, pageContent }: NavbarLinksProps) {
  const menuDataLoggedIn: MenuItem[] = [
    { title: pageContent["navbar-link-profile"], to: "/profile", active: true },
    {
      title: pageContent["navbar-link-capacities"],
      to: "/capacity",
      active: true,
    },
    { title: pageContent["navbar-link-reports"], to: "/reports", active: true },
    { title: pageContent["navbar-link-events"], to: "/events", active: false },
  ];

  const menuDataNotLoggedIn: MenuItem[] = [
    { title: pageContent["navbar-link-about"], to: "section02", active: true },
  ];

  if (session) {
    return (
      <div className="hidden sm:flex space-x-12">
        {menuDataLoggedIn
          .filter((item) => item.active)
          .map((item, index) => (
            <NextLink
              key={`navbar-link-${index}`}
              href={item.to}
              className="flex my-auto cursor-pointer hover:border-b hover:border-current"
            >
              {item.title}
            </NextLink>
          ))}
      </div>
    );
  }

  return (
    <div className="flex space-x-12">
      {menuDataNotLoggedIn
        .filter((item) => item.active)
        .map((item, index) => (
          <Link
            key={`navbar-link-${index}`}
            activeClass="active"
            to={item.to}
            spy={true}
            smooth={true}
            duration={500}
            delay={150}
            className="hidden sm:block flex my-auto cursor-pointer hover:border-b hover:border-current"
          >
            {item.title}
          </Link>
        ))}
    </div>
  );
}
