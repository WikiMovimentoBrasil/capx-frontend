import Image from "next/image";
import PersonBookIcon from "@/public/static/images/person_book.svg";
import PersonBookIconWhite from "@/public/static/images/person_book_white.svg";
import { useTheme } from "@/contexts/ThemeContext";
interface MiniBioProps {
  about: string;
}

export default function MiniBio({ about }: MiniBioProps) {
  const { darkMode } = useTheme();
  return (
    <div
      className={`flex flex-col gap-4 ${
        darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={darkMode ? PersonBookIconWhite : PersonBookIcon}
          alt="Mini bio"
          width={20}
          height={20}
        />
        <h2
          className={`text-[14px] font-[Montserrat] font-bold ${
            darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
          }`}
        >
          Mini bio
        </h2>
      </div>
      <p
        className={`text-[14px] font-[Montserrat] leading-relaxed ${
          darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"
        }`}
      >
        {about}
      </p>
    </div>
  );
}
