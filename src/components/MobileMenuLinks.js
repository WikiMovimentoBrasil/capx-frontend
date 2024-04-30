import NextLink from "next/link";
import { Link } from "react-scroll";

export default function MobileMenuLinks({ session, handleMenuStatus }) {
  const menuDataLoggedIn = [
    { title: "My Profile", to: "/profile" },
    { title: "Skills", to: "/skills" },
    { title: "Events", to: "/events" },
  ];

  const menuDataNotLoggedIn = [
    { title: "About", to: "section02" },
  ];

  // User is logged in
  if (session) {
    return (
      <div className="flex flex-wrap w-10/12 text-2xl mx-auto space-y-4 mb-8">
        {menuDataLoggedIn.map((item, index) => {
          return (
            <NextLink
              href={item.to}
              className="w-full cursor-pointer border-b py-3"
            >
              {item.title}
            </NextLink>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap w-10/12 text-2xl mx-auto space-y-4 mb-8">
      {menuDataNotLoggedIn.map((item, index) => {
        return (
          <Link
            activeClass="active"
            to={item.to}
            spy={true}
            smooth={true}
            hashSpy={true}
            duration={500}
            delay={150}
            isDynamic={true}
            ignoreCancelEvents={false}
            spyThrottle={500}
            onClick={handleMenuStatus}
            key={"menuLink" + index.toString()}
            className="w-full cursor-pointer border-b py-3"
          >
            {item.title}
          </Link>
        )
      })}
    </div>
  )
}