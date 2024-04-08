import Image from "next/image";
import WikimedianImage from "../../public/static/images/s01wikimedian.png";

export default function Section01() {
  return (
    <section className={"flex flex-wrap sm:flex-nowrap w-10/12 h-fit sm:h-screen mx-auto place-content-start py-32 font-montserrat"}>
      {/* Mobile Title */}
      <h1 className="block sm:hidden w-full h-fit font-extrabold text-3xl leading-10 mb-8">A space to<br></br>exchange knowledge</h1>
      <div className="grid w-full justify-items-end sm:w-1/3 sm:place-content-center">
        <Image
          src={WikimedianImage}
          alt="Wikimedians using Capacity Exchange."
          className="w-10/12 sm:w-full h-fit"
        />
      </div>
      <h3 className="w-full h-fit text-2xl font-regular leading-8 mb-8">
        Connect<br></br>with peers,<br></br>learn and share<br></br>capacity in a platform<br></br>made for and by the<br></br>Wikimedia Movement.
      </h3>
      <div className="w-full">
        <h2 className="w-fit bg-capx-primary-green font-extrabold text-xl sm:text-2xl text-[#F6F6F6] mx-auto px-10 py-4 rounded-full">Coming Soon</h2>
      </div>
    </section>
  )
}