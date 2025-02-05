import illustration01 from "@/public/static/images/learn_capacities_illustration.svg";
import illustration02 from "@/public/static/images/connect_wikimedians_illustration.svg";
import illustration03 from "@/public/static/images/exchange_knowledge_illustration.svg";
import Image, { StaticImageData } from "next/image";
import { useTheme } from "@/providers/ThemeProvider";

const Row = (
  illustration: StaticImageData,
  description: string,
  index: number,
  total: number
) => {
  const getBorderClass = () => {
    if (index === 0) return "border-t border-b";
    if (index === total - 1) return "border-t border-b";
    return "";
  };

  const { darkMode } = useTheme();

  return (
    <div
      className={`flex flex-row w-full border-solid ${getBorderClass()} ${
        darkMode ? "border-capx-light-bg" : "border-capx-secondary-purple"
      } px-4 sm:px-4 lg:px-10`}
    >
      <div className="flex flex-row items-center w-full">
        <div className="shrink-0 w-[150px] md:w-[200px] h-[150px] md:h-[200px] lg:w-[300px] lg:h-[300px] flex items-center justify-center py-8 md:py-12">
          <div className="relative w-full h-full">
            <Image
              src={illustration}
              alt={description}
              className="object-contain"
              fill
            />
          </div>
        </div>
        <div className="shrink-0 sm:w-[20px] md:w-[100px]"></div>
        <p
          className={`font-[Montserrat] text-[20px] md:text-[36px] not-italic font-extrabold leading-[normal] ${
            darkMode ? "text-capx-dark-text" : "text-capx-light-text"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};


interface FeaturesSectionnProps {
  pageContent: any;
}

export default function FeaturesSection({ pageContent }: FeaturesSectionnProps) {
  const features = [
    { illustration: illustration01, description: pageContent["body-home-feature-section-capacity"] },
    { illustration: illustration02, description: pageContent["body-home-feature-section-connect"] },
    { illustration: illustration03, description: pageContent["body-home-feature-section-knowledge"] },
  ];
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex flex-col w-full mx-auto ${
        darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-bg"
      }`}
    >
      {features.map((feature, index) => (
        <div key={`feature-${index}`}>
          {Row(
            feature.illustration,
            feature.description,
            index,
            features.length
          )}
        </div>
      ))}
    </div>
  );
}
