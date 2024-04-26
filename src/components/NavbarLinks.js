import { Link } from "react-scroll";

export default function NavbarLinks({ session }) {
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