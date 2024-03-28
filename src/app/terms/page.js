import Image from 'next/image';
import Link from "next/link";
import capXLogo from "../../../public/static/images/capx_logo.png";

export default function Terms() {
  return (
    <main className="flex flex-wrap flex-col w-full h-screen bg-zinc-50 font-montserrat text-capx-secondary-gray">
      <div className="flex flex-wrap w-1/3 mx-auto mt-36 font-montserrat text-justify">
        <Link href="/" className="w-full mb-8">
          <Image
            priority={true}
            src={capXLogo}
            alt="Logo do projeto Capacity Exchange"
            className="w-full sm:w-32"
          />
        </Link>
      </div>
    </main>
  )
}