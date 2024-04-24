import Image from "next/image";
import CapXLogo from "../../../public/static/images/capx_logo.svg";

export default function OAuth() {
  return (
    <section className="flex w-screen h-screen font-montserrat">
      <div className="flex flex-wrap w-1/2 mx-auto my-auto">
        <div className="flex w-fit mx-auto mb-4">
          <Image
            src={CapXLogo}
            alt="Capacity Exchange logo image."
            className="w-16"
          />
        </div>
        <div className="flex w-full text-center mb-4">
          <h1 className="w-full">FINISHING LOGIN</h1>
        </div>
      </div>
    </section>
  )
}