import Image from "next/image";
import CapxPeopleLogo from "@/public/static/images/capx_people_illustration.svg";

export function CapacityBanner() {
  return (
    <section className="flex items-center justify-center h-[399px] w-full bg-capx-dark-bg rounded-[4px]">
      <div className="flex bg-capx-dark-bg max-w-[1440] gap-[120px] w-full h-full items-center justify-between">
        <div className="relative w-[500px] h-[500px] ml-[120px]">
          <Image src={CapxPeopleLogo} alt="CapX Logo" fill priority />
        </div>
        <div className="flex w-[324px] mr-[120px]">
          <h1 className="text-white text-[48px] font-extrabold leading-[59px]">
            Exchange Everything
          </h1>
        </div>
      </div>
    </section>
  );
}
