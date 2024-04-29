import NextLink from "next/link";
import { Link } from "react-scroll";

export default function NavbarLinks({ session }) {
  const menuData = [
    { title: "My Profile", to: "/profile" },
    { title: "Skills", to: "/skills" },
    { title: "Events", to: "/events" },
  ];

  // User is logged in
  if (session) {
    return (
      <div className="flex space-x-12">
        {menuData.map((item, index) => {
          return (
            <NextLink
              href={item.to}
              className="hidden sm:block flex my-auto cursor-pointer hover:border-b hover:border-current"
            >
              {item.title}
            </NextLink>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex space-x-12">
      {/* 'About' button */}
      <Link
        activeClass="active"
        to="section02"
        spy={true}
        smooth={true}
        duration={500}
        delay={150}
        className="hidden sm:block flex my-auto cursor-pointer hover:border-b hover:border-current"
      >
        About
      </Link>
    </div>
  )
}