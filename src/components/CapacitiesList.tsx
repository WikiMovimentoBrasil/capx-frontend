import { useCapacityDetails } from "@/hooks/useCapacityDetails";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";

import ArrowDownIcon from "@/public/static/images/arrow_drop_down_circle.svg";
import ArrowDownIconWhite from "@/public/static/images/arrow_drop_down_circle_white.svg";

const CAPACITY_STYLES = {
  known: {
    backgroundColor: "bg-[#0070B9]",
    textColor: "text-white"
  },
  available: {
    backgroundColor: "bg-[#05A300]",
    textColor: "text-white"
  },
  wanted: {
    backgroundColor: "bg-[#D43831]",
    textColor: "text-white"
  },
  default: {
    backgroundColor: "bg-[#EFEFEF]",
    textColor: "text-black"
  }
} as const;

interface CapacitiesListProps {
  icon: string;
  title: string;
  items: (number | string)[];
  customClass?: string;
}

export function CapacitiesList({
  icon,
  title,
  items,
  customClass = "",
}: CapacitiesListProps) {
  const { getCapacityName } = useCapacityDetails(items);
  const { darkMode } = useTheme();
  const { pageContent } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [needsToggle, setNeedsToggle] = useState(false);
  const noDataMessage = pageContent["no-data-available"];

  console.log("items", items)

  // Check items overflow to show or hide expand button
  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (container && items.length > 0) {
        // Temporariamente remove a restrição de altura para medir corretamente
        container.style.height = 'auto';
        container.style.overflow = 'visible';
        
        // Pega a altura natural do container com todos os itens
        const naturalHeight = container.getBoundingClientRect().height;
        
        // Pega a altura de uma linha (usando o primeiro item como referência)
        const firstItem = container.querySelector('.capacity-item');
        const singleLineHeight = firstItem ? firstItem.getBoundingClientRect().height : 0;
        
        // Restaura as propriedades originais do container
        container.style.removeProperty('height');
        container.style.removeProperty('overflow');

        // Se a altura natural for maior que a altura de uma única linha (com uma pequena margem de tolerância),
        // significa que os itens estão quebrando para múltiplas linhas
        const tolerance = 5;
        setNeedsToggle(naturalHeight > (singleLineHeight + tolerance));
        
        console.log('Natural height:', naturalHeight);
        console.log('Single line height:', singleLineHeight);
      }
    };

    // Executa a verificação após o layout estar completamente renderizado
    const timer = setTimeout(checkOverflow, 0);
    
    // Adiciona verificação em caso de resize
    window.addEventListener('resize', checkOverflow);
    
    // Executa novamente após um tempo maior para garantir que fontes e imagens foram carregadas
    const secondTimer = setTimeout(checkOverflow, 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [items]);

  const getCapacityStyle = (title: string) => {
    if (title === pageContent["body-profile-known-capacities-title"]) {
      return CAPACITY_STYLES.known;
    }
    if (title === pageContent["body-profile-available-capacities-title"]) {
      return CAPACITY_STYLES.available;
    }
    if (title === pageContent["body-profile-wanted-capacities-title"]) {
      return CAPACITY_STYLES.wanted;
    }
    return CAPACITY_STYLES.default;
  };

  const capacityStyle = getCapacityStyle(title);

  return (
    <div className="flex flex-col gap-2 md:gap-4 mb-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5 md:h-[42px] md:w-[42px]">
            <Image
              src={icon}
              alt={`${title} icon`}
              className="object-contain"
              fill
            />
          </div>
          <h2
            className={`
              ${customClass}
              font-extrabold
              text-base
              md:text-[24px]
              ${darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"}
            `}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Items Container */}
      <div
        className={`
          flex justify-between items-center
          ${darkMode ? "bg-capx-dark-bg" : "bg-[#EFEFEF]"}
          rounded-[4px]
          p-3
          md:py-6
          md:px-3
        `}
      >
        {/* Container dos itens */}
        <div
          ref={containerRef}
          className={`
            flex flex-wrap gap-2 flex-1
            ${!isExpanded && needsToggle ? 'max-h-[38px] overflow-hidden' : ''}
            transition-all duration-300
          `}
        >
          {items.length > 0 ? items.map((item, index) => {
            const name = getCapacityName(item) || item;
            return (
              <div
                key={index}
                className={`
                  capacity-item
                  rounded-[4px]
                  inline-flex
                  px-[4px]
                  py-[6px]
                  items-center
                  gap-[8px]
                  ${capacityStyle.backgroundColor}
                  ${capacityStyle.textColor}
                `}
              >
                <p className={`
                  ${customClass}
                  font-normal
                  text-sm
                  md:text-[24px]
                `}>
                  {name}
                </p>
              </div>
            );
          }) : <p className={`
            ${customClass}
            font-normal
            text-sm
            md:text-[24px]
            ${darkMode ? "text-capx-light-bg" : "text-capx-dark-box-bg"}
          `}>
            {noDataMessage}
          </p>}
        </div>

        {/* Expand/hide button */}
        {needsToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Show less" : "Show more"}
            className="ml-2 self-start"
          >
            <Image
              src={darkMode ? ArrowDownIconWhite : ArrowDownIcon}
              alt={`${title} icon`}
              className="object-contain"
              height={20}
              width={20}
            />
          </button>
        )}
      </div>
    </div>
  );
}
