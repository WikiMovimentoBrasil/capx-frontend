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
import { useState } from "react";

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
  isSearch?: boolean;
  onInfoClick?: (code: number) => Promise<string | undefined>;
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
  isSearch,
  onInfoClick,
}: CapacityCardProps) {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = async () => {
    if (!showInfo && onInfoClick) {
      await onInfoClick(code);
    }
    setShowInfo(!showInfo);
  };

  const renderExpandedContent = () => {
    if (!showInfo) return null;

    return (
      <div className="flex flex-col gap-6 mt-6 mb-16 px-16">
        {wd_code && (
          <a href={wd_code}>
            <div className="flex flex-row items-center gap-2">
              <div className="relative w-[36px] h-[36px]">
                <Image src={BarCodeIcon} alt="BarCode" fill priority />
              </div>
              <p className="text-[20px] text-capx-light-link underline">
                {wd_code}
              </p>
            </div>
          </a>
        )}
        {description && (
          <p className="text-[20px] text-capx-dark-box-bg">
            {capitalizeFirstLetter(description)}
          </p>
        )}
        <BaseButton
          label="Explore capacity"
          customClass={`w-[224px] flex justify-center items-center gap-2 px-3 py-3 rounded-lg bg-${parentCapacity?.color} text-[#F6F6F6] font-extrabold text-3.5 sm:text-3.5 rounded-[4px] text-center text-[24px] not-italic leading-[normal]`}
          onClick={() => router.push(`/capacity/${code}`)}
        />
      </div>
    );
  };

  const renderIcon = (size: number, iconSrc: any) => {
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="relative"
      >
        <Image
          src={typeof iconSrc === "string" ? iconSrc : iconSrc.src}
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

  const renderInfoButton = (size: number, icon: string) => (
    <button
      onClick={handleInfoClick}
      className={`p-1 flex-shrink-0 ${isSearch ? "mr-12" : ""}`}
    >
      <div
        className="relative"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src={showInfo ? InfoFilledIcon : icon}
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
    </button>
  );

  const renderArrowButton = (size: number, icon: string) => (
    <button onClick={onExpand} className="p-2 flex-shrink-0">
      <div
        className={`relative w-[68px] h-[68px] mr-12 transition-transform duration-300 ${
          isExpanded ? "rotate-180" : ""
        }`}
      >
        <Image src={ArrowDownIcon} alt="Expand" fill priority />
      </div>
    </button>
  );

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  if (hasChildren) {
    return (
      <div
        className={`flex flex-col rounded-lg w-full bg-${color} shadow-sm hover:shadow-md transition-shadow`}
      >
        <div className="flex h-[326px] justify-between items-center p-4">
          <div className="flex items-center gap-8 ml-12">
            {icon && renderIcon(85, icon)}
            <div className="flex items-center w-[378px] h-full">
              <Link href={`/capacity/${code}`}>
                <h3 className="text-[48px] font-extrabold text-white">
                  {capitalizeFirstLetter(name)}
                </h3>
              </Link>
            </div>
          </div>

          {renderInfoButton(68, InfoIcon)}
          {!isSearch && renderArrowButton(68, ArrowDownIcon)}
        </div>
        {showInfo && (
          <div className="bg-white rounded-b-lg p-8">
            {renderExpandedContent()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full rounded-lg bg-capx-light-box-bg`}>
      <div className="flex flex-row items-center w-full h-[144px] justify-between px-16">
        <div className="flex items-center gap-4">
          {icon && renderIcon(68, icon)}
          <div className="flex flex-row items-center justify-between">
            <Link href={`/capacity/${code}`} className="w-full">
              <h3
                className="text-[36px] font-extrabold"
                style={{
                  color: parentCapacity?.color
                    ? getCapacityColor(parentCapacity.color)
                    : "#000000",
                }}
              >
                {capitalizeFirstLetter(name)}
              </h3>
            </Link>
          </div>
        </div>
        {renderInfoButton(40, InfoIcon)}
      </div>
      {showInfo && renderExpandedContent()}
    </div>
  );
}
