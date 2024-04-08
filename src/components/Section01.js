import Image from "next/image";
import WikimedianImage from "../../public/static/images/s01wikimedian.png";

export default function Section01() {
  return (
    <section className={"flex flex-wrap w-10/12 h-fit mx-auto my-auto place-content-start py-32 font-montserrat"}>
      <h1 className="w-full h-fit font-extrabold text-3xl leading-10 mb-8">A space for<br></br>knowledge exchange</h1>
      <div className="grid w-full justify-items-end">
        <Image
          src={WikimedianImage}
          alt="Wikimedians using Capacity Exchange."
          className="w-10/12 h-fit"
        />
      </div>
      <h3 className="w-full h-fit text-2xl font-regular leading-8 mb-8">
        Connect<br></br>with peers,<br></br>learn and share<br></br>capacity in a platform<br></br>made for and by the<br></br>Wikimedia Movement.
      </h3>
      <div className="w-full">
        <h2 className="w-fit bg-capx-primary-green font-extrabold text-xl text-[#F6F6F6] mx-auto px-10 py-4 rounded-full">Coming Soon</h2>
      </div>
    </section>
  )
}