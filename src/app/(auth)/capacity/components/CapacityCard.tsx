import Image from "next/image";
import Link from "next/link";
import ArrowDownIcon from "@/public/static/images/keyboard_arrow_down.svg";
import { getCapacityColor, getHueRotate } from "@/lib/utils/capacitiesUtils";
import BarCodeIcon from "@/public/static/images/barcode.svg";
import BaseButton from "@/components/BaseButton";
import { useRouter } from "next/navigation";
import InfoIcon from "@/public/static/images/info.svg";
import InfoFilledIcon from "@/public/static/images/info_filled.svg";
import { Capacity } from "@/types/capacity";

interface CapacityCardProps {
  code: number;
  name: string;
  icon: string;
  color: string;
  parentCapacity?: Capacity;
  onExpand: () => void;
  isExpanded: boolean;
  hasChildren: boolean;
  description?: string;
  wd_code?: string;
  isRoot?: boolean;
}

export function CapacityCard({
  code,
  name,
  icon,
  color,
  parentCapacity,
  onExpand,
  isExpanded,
  hasChildren,
  description,
  wd_code,
  isRoot,
}: CapacityCardProps) {
  const router = useRouter();

  const renderExpandedContent = () => {
    if (!isExpanded) return null;

    return (
      <div className="flex flex-col ml-12 gap-6 mt-6 mb-16">
        {wd_code && (
          <a href={wd_code}>
            <div className="flex flex-row items-center gap-2">
              <div className="relative w-[36px] h-[36px]">
                <Image src={BarCodeIcon} alt="BarCode" fill priority />
              </div>
              <p className="text-[20px] text-capx-light-link">{wd_code}</p>
            </div>
          </a>
        )}
        {description && (
          <p className="text-[20px] text-capx-dark-box-bg">{description}</p>
        )}
        <BaseButton
          label="Explore capacity"
          customClass={`w-[224px] flex justify-center items-center gap-2 px-3 py-3 rounded-lg bg-${parentCapacity?.color} hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg font-extrabold text-3.5 sm:text-3.5 rounded-[4px] text-center text-[24px] not-italic leading-[normal]`}
          onClick={() => router.push(`/capacity/${code}`)}
        />
      </div>
    );
  };

  const renderIcon = (size: number, icon: string) => {
    console.log("Rendering icon with color:", parentCapacity?.color);

    return (
      <div className={`relative w-[${size}px] h-[${size}px]`}>
        <Image
          src={icon}
          alt={name}
          fill
          priority
          style={{
            filter: isRoot
              ? "brightness(0) invert(1)"
              : getHueRotate(parentCapacity?.color),
          }}
        />
      </div>
    );
  };

  const renderInfoButton = (size: number, customStyle?: string) => (
    <button onClick={onExpand} className="p-2 flex-shrink-0">
      <div
        className={`relative w-[${size}px] h-[${size}px] ${customStyle || ""}`}
      >
        <Image src={InfoIcon} alt="Info" fill priority />
      </div>
    </button>
  );

  if (hasChildren) {
    return (
      <div
        className={`flex h-[326px] justify-between items-center p-4 rounded-lg w-full bg-${color} shadow-sm hover:shadow-md transition-shadow`}
      >
        <div className="flex items-center gap-8 ml-12">
          {icon && renderIcon(135, icon)}
          <div className="flex items-center w-[378px] h-full">
            <Link href={`/capacity/${code}`}>
              <h3 className="text-[48px] font-extrabold text-white">{name}</h3>
            </Link>
          </div>
        </div>

        {renderInfoButton(68)}

        <button onClick={onExpand} className="p-2 flex-shrink-0">
          <div
            className={`relative w-[68px] h-[68px] mr-12 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <Image src={ArrowDownIcon} alt="Expand" fill priority />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col w-[450px] justify-evenly p-4 pb-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-capx-light-box-bg ${
        isExpanded ? "h-auto" : "h-[326px]"
      }`}
    >
      <div className="flex gap-8 ml-12 mt-6">
        {icon && renderIcon(68, icon)}
      </div>
      <div className="flex flex-row items-center ml-12 mt-24 justify-between">
        <Link href={`/capacity/${code}`} className="w-[224px]">
          <h3
            className="text-[36px] font-extrabold"
            style={{
              color: parentCapacity?.color
                ? getCapacityColor(parentCapacity.color)
                : "#000000",
            }}
          >
            {name}
          </h3>
        </Link>
        {renderInfoButton(32)}
      </div>
      {renderExpandedContent()}
    </div>
  );
}
