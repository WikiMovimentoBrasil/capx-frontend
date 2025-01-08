import Image from "next/image";
import PersonBookIcon from "@/public/static/images/person_book.svg";

interface MiniBioProps {
  about: string;
}

export default function MiniBio({ about }: MiniBioProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image src={PersonBookIcon} alt="Mini bio" width={20} height={20} />
        <h2 className="text-[#003649] text-[14px] font-[Montserrat] font-bold">
          Mini bio
        </h2>
      </div>
      <p className="text-[#003649] text-[14px] font-[Montserrat] leading-relaxed">
        {about}
      </p>
    </div>
  );
}
