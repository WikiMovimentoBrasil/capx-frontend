import Image from "next/image";
import Link from "next/link";
import ChevronRightIcon from "@/public/static/images/arrow_drop_down_circle_white.svg";
import { getHueRotate } from "@/lib/utils/colorUtils";
import BarCodeIcon from "@/public/static/images/barcode.svg";
import BaseButton from "@/components/BaseButton";
import { useRouter } from "next/navigation";

interface CapacityItem {
  code: string;
  name: string;
  color: string;
  icon: string;
  wdCode?: string;
}

interface CapacityCardProps {
  code: string;
  name: string;
  icon: string;
  color: string;
  parentCapacity?: CapacityItem;
  onExpand: () => void;
  isExpanded: boolean;
  hasChildren: boolean;
  description?: string;
  wdCode?: string;
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
  wdCode,
}: CapacityCardProps) {
  const router = useRouter();

  return hasChildren ? (
    <div
      className={`flex h-[326px] justify-between items-center p-4 rounded-lg w-full bg-${color} shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center gap-8 ml-12">
        {icon && (
          <div className="relative w-[135px] h-[135px]">
            <div className="relative w-[135px] h-[135px]">
              <Image src={icon} alt={name} fill />
            </div>
          </div>
        )}
        <div className="flex items-center w-[378px] h-full">
          <Link href={`/capacity/${code}`} className="">
            <h3 className={`text-[48px] font-extrabold text-white`}>{name}</h3>
          </Link>
        </div>
      </div>

      <button onClick={onExpand} className="p-2 rounded-full flex-shrink-0">
        <div
          className={`relative w-[68px] h-[68px] mr-12 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <Image src={ChevronRightIcon} alt="Expand" fill />
        </div>
      </button>
    </div>
  ) : (
    <div
      className={`flex flex-col w-[450px] justify-evenly p-4 pb-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-capx-light-box-bg ${
        isExpanded ? "h-auto" : "h-[326px]"
      }
        `}
    >
      <div className="flex gap-8 ml-12 mt-6">
        {icon && (
          <div
            className="relative w-[68px] h-[68px]"
            style={{
              filter: `invert(1) sepia(1) saturate(10000%) hue-rotate(${getHueRotate(
                parentCapacity?.color
              )})`,
            }}
          >
            <Image src={icon} alt={name} fill />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center ml-12 mt-24 justify-between">
        <Link href={`/capacity/${code}`} className="w-[224px]">
          <h3
            className={`text-[36px] font-extrabold text-${parentCapacity?.color}`}
          >
            {name}
          </h3>
        </Link>

        <button
          onClick={onExpand}
          className="p-2 focus:outline-none flex-shrink-0"
        >
          <div
            className={`relative w-8 h-8 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            style={{
              filter: `invert(1) sepia(1) saturate(10000%) hue-rotate(${getHueRotate(
                parentCapacity?.color
              )})`,
            }}
          >
            <Image src={ChevronRightIcon} alt="Expand" fill />
          </div>
        </button>
      </div>
      {/* Seção de descrição expandida */}

      {isExpanded && (
        <div className="flex flex-col ml-12 gap-6 mt-6 mb-16">
          <a href={`${wdCode}`}>
            <div className="flex flex-row items-center gap-2">
              <div className="relative w-[36px] h-[36px]">
                <Image src={BarCodeIcon} alt="BarCode" fill />
              </div>
              <p className="text-[20px] text-capx-light-link">{wdCode}</p>
            </div>
          </a>
          <p className="text-[20px] text-capx-dark-box-bg">{description}</p>
          <BaseButton
            label="Explore capacity"
            customClass={`w-[224px] flex justify-center items-center gap-2 px-3 py-3 rounded-lg bg-${parentCapacity?.color} hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg font-extrabold text-3.5 sm:text-3.5 rounded-[4px] text-center text-[24px] not-italic leading-[normal]`}
            onClick={() => {
              router.push(`/capacity/${code}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
