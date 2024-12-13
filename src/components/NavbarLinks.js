import NextLink from "next/link";
import { Link } from "react-scroll";

export default function NavbarLinks({ session, pageContent }) {
  const menuDataLoggedIn = [
    { title: pageContent["navbar-link-profile"], to: "/profile", active: true },
    {
      title: pageContent["navbar-link-capacities"],
      to: "/capacity",
      active: true,
    },
    {
      title: pageContent["navbar-link-reports"],
      to: "/reports",
      active: false,
    },
    { title: pageContent["navbar-link-events"], to: "/events", active: false },
  ];

  const menuDataNotLoggedIn = [
    { title: pageContent["navbar-link-about"], to: "section02", active: true },
  ];

  // User is logged in
  if (session) {
    return (
      <div className="hidden sm:flex space-x-12">
        {menuDataLoggedIn.map((item, index) => {
          if (item.active) {
            return (
              <NextLink
                key={"navbar-link-" + index.toString()}
                href={item.to}
                className="flex my-auto cursor-pointer hover:border-b hover:border-current"
              >
                {item.title}
              </NextLink>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div className="flex space-x-12">
      {menuDataNotLoggedIn.map((item, index) => {
        if (item.active) {
          return (
            <Link
              key={"navbar-link-" + index.toString()}
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
          );
        }
      })}
    </div>
  );
}
