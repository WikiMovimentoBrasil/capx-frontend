import Image from "next/image";
import Script from "next/script";
import { Link } from "react-scroll";
import BackToTopButtonScript from "../../public/static/script.js";
import BackToTopIconLightMode from "../../public/static/images/back_to_top_icon_light_mode.svg";
import BackToTopIconDarkMode from "../../public/static/images/back_to_top_icon_dark_mode.svg";

export default function BackToTopButton({ darkMode }) {
  return (
    <Link
      id="bbtbutton"
      activeClass="active"
      to="section01"
      spy={true}
      smooth={true}
      duration={500}
      delay={150}
      className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "hidden fixed bottom-10 left-2 cursor-pointer z-50 rounded-full"}
    >
      <Image
        priority={true}
        src={darkMode ? BackToTopIconDarkMode : BackToTopIconLightMode}
        alt="Back to top button."
        className="max-w-12 p-1"
      />
      <Script src={BackToTopButtonScript} />
    </Link>
  )
}