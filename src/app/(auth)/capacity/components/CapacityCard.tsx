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
import { useApp } from "@/contexts/AppContext";

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
  const { isMobile } = useApp();

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
              : getHueRotate(parentCapacity?.color || color),
          }}
        />
      </div>
    </button>
  );

  const renderArrowButton = (size: number, icon: string) => (
    <button onClick={onExpand} className="p-2 flex-shrink-0">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`relative mr-12 transition-transform duration-300 ${
          isExpanded ? "rotate-180" : ""
        }`}
      >
        <Image
          src={icon}
          alt="Expand"
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

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  if (isRoot && hasChildren) {
    return (
      <div
        className={`flex flex-col w-full bg-${color} shadow-sm hover:shadow-md transition-shadow
          ${isMobile ? "rounded-[4px]" : "rounded-lg"}
          `}
      >
        <div
          className={`flex p-4 ${
            isMobile
              ? "h-[191px] flex-col mt-12 mx-6 gap-6"
              : "flex-row justify-between h-[326px] items-center"
          }`}
        >
          {icon && isMobile ? renderIcon(48, icon) : renderIcon(85, icon)}

          <div className={`flex items-center gap-6 flex-row`}>
            <div className="flex items-center w-[378px] h-full">
              <Link href={`/capacity/${code}`}>
                <h3
                  className={`font-extrabold text-white ${
                    isMobile ? "text-[20px]" : "text-[48px]"
                  }`}
                >
                  {capitalizeFirstLetter(name)}
                </h3>
              </Link>
            </div>

            {isMobile
              ? renderInfoButton(24, InfoIcon)
              : renderInfoButton(68, InfoIcon)}
            {!isSearch && isMobile
              ? renderArrowButton(24, ArrowDownIcon)
              : renderArrowButton(68, ArrowDownIcon)}
          </div>
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
      <div
        className={`flex flex-row items-center w-full h-[144px] py-4 justify-between gap-4 ${
          isMobile ? "px-4 mx-6" : "px-16"
        }`}
      >
        <div className="flex items-center gap-4">
          {icon && isMobile ? renderIcon(48, icon) : renderIcon(68, icon)}
          <div className="flex flex-row items-center justify-between">
            <Link href={`/capacity/${code}`} className="w-full">
              <h3
                className={`font-extrabold ${
                  isMobile ? "text-[20px]" : "text-[36px]"
                }`}
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
        <div className="flex items-center gap-4">
          {isMobile
            ? renderInfoButton(24, InfoIcon)
            : renderInfoButton(40, InfoIcon)}
          {hasChildren && !isRoot && !isSearch && isMobile
            ? renderArrowButton(24, ArrowDownIcon)
            : renderArrowButton(40, ArrowDownIcon)}
        </div>
      </div>
      {showInfo && renderExpandedContent()}
    </div>
  );
}
