import { Link } from "react-scroll";
import Image from "next/image";
import BackToTopIconLightMode from "../../public/static/images/back_to_top_icon_light_mode.svg";
import BackToTopIconDarkMode from "../../public/static/images/back_to_top_icon_dark_mode.svg";

export default function BackToTopButton({ darkMode }) {
  return (
    <Link
      activeClass="active"
      to="section01"
      spy={true}
      smooth={true}
      duration={500}
      delay={150}
      className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "fixed bottom-10 left-10 cursor-pointer z-50 rounded-full"}
    >
    </Link>
  )
}