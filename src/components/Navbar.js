import Link from 'next/link';
import Image from 'next/image';
import capXLogo from "../../public/static/images/capx_logo.png";

export default function Navbar() {
  return (
    <nav className="absolute w-10/12 h-fit m-auto left-0 right-0 mt-10">
      <div className="flex w-full place-content-between place-items-end sm:items-center">
        {/* Capacity Exchange Logo */}
        <Link href="/" className="w-8/12 sm:w-1/2">
          <Image
            priority={true}
            src={capXLogo}
            alt="Logo do projeto Capacity Exchange"
            className="w-full sm:w-48"
          />
        </Link>
      </div>
    </nav>
  );
}
