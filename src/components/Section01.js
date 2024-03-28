import Image from "next/image";
import WikimediansImage from "../../public/static/images/s01wikimedians.png";

export default function Section01() {
  return (
    <section className="flex w-10/12 h-screen mx-auto my-auto">
      <div className="flex flex-wrap place-content-center sm:w-1/2 sm:h-5/6">
        <h1 className="font-chunkfive mb-2 sm:text-5xl">
          Exchanging capacities, from wikimedians to wikimedians
        </h1>
        <p className="sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo sollicitudin lectus non rhoncus. In hac habitasse platea dictumst. Fusce porttitor facilisis scelerisque.
        </p>
      </div>
      <div className="flex flex-wrap sm:w-1/2 sm:h-full">
        <Image
          src={WikimediansImage}
          alt="Three wikimedians using Capacity Exchange."
          className="flex mx-auto my-auto sm:w-full sm:pl-24 sm:max-w-[650px] drop-shadow-md"
        />
      </div>
    </section>
  )
}