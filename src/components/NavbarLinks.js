import NextLink from "next/link";
import { Link } from "react-scroll";

export default function NavbarLinks({ session }) {
  // User is logged in
  if (session) {
    return (
      <div className="flex space-x-12">
        {/* 'Skills' button */}
        <NextLink
          href="/profile"
          className="hidden sm:block flex my-auto cursor-pointer hover:border-b hover:border-current"
        >
          My Profile
        </NextLink>
        <NextLink
          href="/skills"
          className="hidden sm:block flex my-auto cursor-pointer hover:border-b hover:border-current"
        >
          Skills
        </NextLink>
        <NextLink
          href="/events"
          className="hidden sm:block flex my-auto cursor-pointer hover:border-b hover:border-current"
        >
          Events
        </NextLink>
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