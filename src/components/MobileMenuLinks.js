import NextLink from "next/link";
import { Link } from "react-scroll";

export default function MobileMenuLinks({ session }) {
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
      <div className="flex flex-wrap w-10/12 text-2xl mx-auto space-y-4">
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
    <div className="flex flex-wrap w-10/12 text-2xl mx-auto space-y-4">
    {menuDataNotLoggedIn.map((item, index) => {
      return (
        <Link
          href={item.to}
          className="w-full cursor-pointer border-b py-3"
        >
          {item.title}
        </Link>
      )
    })}
  </div>
  )
}