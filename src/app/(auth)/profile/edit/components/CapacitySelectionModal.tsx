import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCapacityList } from "@/hooks/useCapacityList";
import { Capacity } from "@/types/capacity";
import React from "react";
import BaseButton from "@/components/BaseButton";
import { useApp } from "@/contexts/AppContext";
import Image from "next/image";
import ArrowDownIcon from "@/public/static/images/keyboard_arrow_down.svg";
import { getCapacityColor, getHueRotate } from "@/lib/utils/capacitiesUtils";
import InfoIcon from "@/public/static/images/info.svg";
import InfoFilledIcon from "@/public/static/images/info_filled.svg";
import Link from "next/link";

interface CapacitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (capacity: Capacity) => void;
  title: string;
}

export default function CapacitySelectionModal({
  isOpen,
  onClose,
  onSelect,
  title,
}: CapacitySelectionModalProps) {
  const { darkMode } = useTheme();
  const { data: session } = useSession();
  const { pageContent } = useApp();
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<Capacity | null>(
    null
  );
  const [showInfoMap, setShowInfoMap] = useState<Record<number, boolean>>({});
  const [capacityDescriptions, setCapacityDescriptions] = useState<
    Record<string, string>
  >({});

  const {
    rootCapacities,
    childrenCapacities,
    isLoading,
    fetchRootCapacities,
    fetchCapacitiesByParent,
    descriptions,
    wdCodes,
    fetchCapacityDescription,
  } = useCapacityList(session?.user?.token);

  useEffect(() => {
    if (isOpen && session?.user?.token) {
      fetchRootCapacities();
      setSelectedPath([]);
      setSelectedCapacity(null);
    }
  }, [isOpen, session?.user?.token, fetchRootCapacities]);

  const handleCategorySelect = async (category: Capacity) => {
    try {
      const categoryId = category.code;
      const currentPathIndex = selectedPath.indexOf(categoryId);

      if (currentPathIndex !== -1) {
        setSelectedPath((prev) => prev.slice(0, currentPathIndex + 1));
        setSelectedCapacity(null);
        return;
      }

      if (!childrenCapacities[categoryId.toString()]) {
        const children = await fetchCapacitiesByParent(categoryId.toString());

        if (children && children.length > 0) {
          setSelectedPath((prev) => [...prev, categoryId]);
          setSelectedCapacity(null);
          return;
        }
      }

      if (childrenCapacities[categoryId.toString()]?.length > 0) {
        setSelectedPath((prev) => [...prev, categoryId]);
        setSelectedCapacity(null);
      } else {
        setSelectedCapacity(category);
      }
    } catch (err) {
      console.error("Erro ao selecionar categoria:", err);
    }
  };

  const handleConfirm = () => {
    if (selectedCapacity) {
      const capacityToReturn: Capacity = {
        ...selectedCapacity,
        skill_type: selectedPath.map((id) => id.toString()),
      };
      onSelect(capacityToReturn);
      onClose();
    }
  };

  const getCurrentCapacities = useCallback(() => {
    if (selectedPath.length === 0) {
      return rootCapacities;
    }

    const currentParentId = selectedPath[selectedPath.length - 1];
    const currentCapacities = childrenCapacities[currentParentId.toString()];

    if (!currentCapacities) {
      return [];
    }

    return currentCapacities;
  }, [selectedPath, childrenCapacities, rootCapacities]);

  // Function to find the capacity by code
  const findCapacityByCode = useCallback(
    (code: number): Capacity | undefined => {
      // Search in the root capacities
      const rootCapacity = rootCapacities.find((cap) => cap.code === code);
      if (rootCapacity) return rootCapacity;

      // Search in the children capacities
      for (const parentCode in childrenCapacities) {
        const children = childrenCapacities[parentCode];
        const childCapacity = children?.find((cap) => cap.code === code);
        if (childCapacity) return childCapacity;
      }

      return undefined;
    },
    [rootCapacities, childrenCapacities]
  );

  // Function to capitalize the first letter of a text
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Function to toggle the display of the capacity description
  const toggleCapacityInfo = async (
    e: React.MouseEvent,
    capacity: Capacity
  ) => {
    e.stopPropagation(); // Prevent the click event from propagating to the card

    const capacityCode = capacity.code;

    // If the description is not loaded, search for it
    if (
      !capacityDescriptions[capacityCode] &&
      !showInfoMap[capacityCode] &&
      fetchCapacityDescription
    ) {
      const description = await fetchCapacityDescription(capacityCode);
      if (description) {
        setCapacityDescriptions((prev) => ({
          ...prev,
          [capacityCode]: description,
        }));
      }
    }

    // Toggle the display of the description
    setShowInfoMap((prev) => ({
      ...prev,
      [capacityCode]: !prev[capacityCode],
    }));
  };

  // Function to render a custom capacity card for the modal
  const renderCapacityCard = (capacity: Capacity, isRoot: boolean) => {
    const isSelected = selectedCapacity?.code === capacity.code;
    const showInfo = showInfoMap[capacity.code] || false;
    const description =
      capacityDescriptions[capacity.code] ||
      descriptions[capacity.code.toString()] ||
      "";
    const wd_code = wdCodes[capacity.code.toString()] || "";

    // Get the parent capacity to color the icons of the child cards
    const parentCapacity = isRoot
      ? undefined
      : selectedPath.length > 0
      ? findCapacityByCode(selectedPath[selectedPath.length - 1])
      : undefined;

    // Style for root cards (simplified for the modal)
    if (isRoot) {
      return (
        <div
          className={`flex flex-col w-full bg-${
            capacity.color
          } rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full
            ${isSelected ? "ring-2 ring-capx-primary-green" : ""}`}
          onClick={() => handleCategorySelect(capacity)}
        >
          <div className="flex p-3 h-[80px] items-center justify-between">
            {capacity.icon && (
              <div className="relative w-[24px] h-[24px] flex-shrink-0 mr-2">
                <Image
                  src={capacity.icon}
                  alt={capacity.name}
                  width={24}
                  height={24}
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            )}
            <div className="flex-1 mx-2 overflow-hidden">
              <Link
                href={`/feed/${capacity.code}`}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-bold text-white text-base truncate hover:underline">
                  {capitalizeFirstLetter(capacity.name)}
                </h3>
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => toggleCapacityInfo(e, capacity)}
                className="p-1 flex-shrink-0 mr-1"
              >
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={showInfo ? InfoFilledIcon : InfoIcon}
                    alt="Info"
                    width={20}
                    height={20}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              </button>
              {capacity.hasChildren && (
                <div className="flex-shrink-0 cursor-pointer w-[20px] h-[20px]">
                  <Image
                    src={ArrowDownIcon}
                    alt="Expand"
                    width={20}
                    height={20}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              )}
            </div>
          </div>

          {showInfo && description && (
            <div className="bg-white p-3 text-sm rounded-b-lg flex-grow">
              <p className="text-gray-700 text-xs leading-relaxed">
                {capitalizeFirstLetter(description)}
              </p>
              {wd_code && (
                <a
                  href={wd_code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  {pageContent["capacity-selection-modal-see-more-information"]}
                </a>
              )}
            </div>
          )}
        </div>
      );
    }

    // Style for child cards
    return (
      <div
        className={`flex flex-col w-full bg-capx-light-box-bg rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full
          ${isSelected ? "ring-2 ring-capx-primary-green" : ""}`}
        onClick={() => handleCategorySelect(capacity)}
      >
        <div className="flex p-3 h-[80px] items-center justify-between">
          {capacity.icon && (
            <div className="relative w-[24px] h-[24px] flex-shrink-0 mr-2">
              <Image
                src={capacity.icon}
                alt={capacity.name}
                width={24}
                height={24}
                style={{
                  filter: parentCapacity
                    ? getHueRotate(parentCapacity.color)
                    : "",
                }}
              />
            </div>
          )}
          <div className="flex-1 mx-2 overflow-hidden">
            <Link
              href={`/feed/${capacity.code}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="font-bold text-base truncate hover:underline"
                style={{
                  color: capacity.color
                    ? getCapacityColor(capacity.color)
                    : "#000000",
                }}
              >
                {capitalizeFirstLetter(capacity.name)}
              </h3>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={(e) => toggleCapacityInfo(e, capacity)}
              className="p-1 flex-shrink-0 mr-1"
            >
              <div className="relative w-[20px] h-[20px]">
                <Image
                  src={showInfo ? InfoFilledIcon : InfoIcon}
                  alt="Info"
                  width={20}
                  height={20}
                  style={{
                    filter: parentCapacity
                      ? getHueRotate(parentCapacity.color)
                      : "",
                  }}
                />
              </div>
            </button>
            {capacity.hasChildren && (
              <div className="flex-shrink-0 cursor-pointer w-[20px] h-[20px]">
                <Image
                  src={ArrowDownIcon}
                  alt="Expand"
                  width={20}
                  height={20}
                  style={{
                    filter: parentCapacity
                      ? getHueRotate(parentCapacity.color)
                      : "",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {showInfo && description && (
          <div className="bg-white p-3 text-sm rounded-b-lg flex-grow">
            <p className="text-gray-700 text-xs leading-relaxed">
              {capitalizeFirstLetter(description)}
            </p>
            {wd_code && (
              <a
                href={wd_code}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                {pageContent["capacity-selection-modal-see-more-information"]}
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-lg md:max-w-3xl lg:max-w-4xl rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-4 md:p-6`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg md:text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className={`p-1 hover:bg-gray-100 rounded ${
                darkMode ? "text-white hover:bg-gray-700" : "text-gray-500"
              }`}
            >
              ✕
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-sm md:text-base overflow-x-auto whitespace-nowrap pb-2">
            <span
              className={`cursor-pointer hover:text-blue-500 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
              onClick={() => setSelectedPath([])}
            >
              {pageContent["capacity-selection-modal-root-capacities"]}
            </span>
            {selectedPath.map((pathId, index) => {
              const capacity = findCapacityByCode(pathId);

              return (
                <React.Fragment key={pathId}>
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-500"}
                  >
                    /
                  </span>
                  <span
                    className={`cursor-pointer hover:text-blue-500 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    onClick={() =>
                      setSelectedPath((prev) => prev.slice(0, index + 1))
                    }
                  >
                    {capacity?.name ||
                      `${pageContent["capacity-selection-modal-select-capacity"]} ${pathId}`}
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          {/* Capacity list */}
          <div className="space-y-2 max-h-[60vh] md:max-h-[65vh] overflow-y-auto p-1">
            <h3
              className={`font-medium mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              {selectedPath.length === 0
                ? pageContent["capacity-selection-modal-root-capacities"]
                : `${pageContent["capacity-selection-modal-select-capacity"]} ${
                    findCapacityByCode(selectedPath[selectedPath.length - 1])
                      ?.name || ""
                  }`}
            </h3>
            {isLoading?.root ? (
              <div
                className={`text-center py-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {pageContent["loading"]}
              </div>
            ) : getCurrentCapacities().length > 0 ? (
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {getCurrentCapacities().map((capacity) => {
                  const isRoot = selectedPath.length === 0;
                  return (
                    <div key={capacity.code} className="flex flex-col h-full">
                      {renderCapacityCard(capacity, isRoot)}
                      {selectedCapacity?.code === capacity.code && (
                        <div
                          className={`text-sm mt-1 text-center ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {pageContent["capacity-selection-modal-selected"]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className={`text-center py-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {pageContent["capacity-selection-modal-no-capacities-found"]}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex w-full justify-center gap-2 mt-4">
            <BaseButton
              label={
                pageContent[
                  "capacity-selection-modal-select-capacity-button-cancel"
                ]
              }
              customClass="bg-[#F6F6F6] w-1/2 md:w-1/3 rounded-[6px] !py-2 !px-4 font-extrabold text-[14px] text-capx-dark-bg border border-capx-dark-bg hover:bg-gray-600"
              onClick={onClose}
            />
            <BaseButton
              label={
                pageContent["capacity-selection-modal-select-capacity-button"]
              }
              customClass={`bg-capx-secondary-purple rounded-[6px] !py-2 !px-4 font-extrabold text-[14px] text-white hover:bg-capx-primary-green w-1/2 md:w-1/3 ${
                !selectedCapacity ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleConfirm}
              disabled={!selectedCapacity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
