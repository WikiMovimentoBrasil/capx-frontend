import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCapacityList } from "@/hooks/useCapacityList";
import { Capacity } from "@/types/capacity";
import React from "react";
import BaseButton from "@/components/BaseButton";
import { useApp } from "@/contexts/AppContext";
import { CapacityCard } from "@/app/(auth)/capacity/components/CapacityCard";
import Image from "next/image";
import ArrowDownIcon from "@/public/static/images/keyboard_arrow_down.svg";
import { getCapacityColor } from "@/lib/utils/capacitiesUtils";

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

  const {
    rootCapacities,
    childrenCapacities,
    isLoading,
    error,
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

  const handleCapacitySelect = (capacity: Capacity) => {
    setSelectedCapacity(capacity);
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

  // Função para encontrar a capacidade pelo código
  const findCapacityByCode = useCallback(
    (code: number): Capacity | undefined => {
      // Procurar nas capacidades raiz
      const rootCapacity = rootCapacities.find((cap) => cap.code === code);
      if (rootCapacity) return rootCapacity;

      // Procurar nas capacidades filhas
      for (const parentCode in childrenCapacities) {
        const children = childrenCapacities[parentCode];
        const childCapacity = children?.find((cap) => cap.code === code);
        if (childCapacity) return childCapacity;
      }

      return undefined;
    },
    [rootCapacities, childrenCapacities]
  );

  // Função para capitalizar a primeira letra de um texto
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Função para renderizar um card de capacidade customizado para o modal
  const renderCapacityCard = (capacity: Capacity, isRoot: boolean) => {
    const isSelected = selectedCapacity?.code === capacity.code;

    // Estilo para cards raiz (simplificado para o modal)
    if (isRoot) {
      return (
        <div
          className={`flex flex-col w-full bg-${
            capacity.color
          } rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden
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
              <h3 className="font-bold text-white text-base truncate">
                {capitalizeFirstLetter(capacity.name)}
              </h3>
            </div>
            {capacity.hasChildren && (
              <div className="flex-shrink-0 w-[20px] h-[20px] ml-2">
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
      );
    }

    // Estilo para cards filhos
    return (
      <div
        className={`flex flex-col w-full bg-capx-light-box-bg rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden
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
              />
            </div>
          )}
          <div className="flex-1 mx-2 overflow-hidden">
            <h3
              className="font-bold text-base truncate"
              style={{
                color: capacity.color
                  ? getCapacityColor(capacity.color)
                  : "#000000",
              }}
            >
              {capitalizeFirstLetter(capacity.name)}
            </h3>
          </div>
          {capacity.hasChildren && (
            <div className="flex-shrink-0 w-[20px] h-[20px] ml-2">
              <Image src={ArrowDownIcon} alt="Expand" width={20} height={20} />
            </div>
          )}
        </div>
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
          className={`w-full max-w-md rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg font-semibold ${
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
          <div className="flex items-center gap-2 mb-4 text-sm">
            <span
              className={`cursor-pointer hover:text-blue-500 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
              onClick={() => setSelectedPath([])}
            >
              Root
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
                    {capacity?.name || `Capacity ${pathId}`}
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          {/* Capacity list */}
          <div className="space-y-2 max-h-[65vh] overflow-y-auto p-1">
            {isLoading?.root ? (
              <div
                className={`text-center py-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {pageContent["loading"]}
              </div>
            ) : getCurrentCapacities().length > 0 ? (
              <div className="grid gap-2">
                {getCurrentCapacities().map((capacity) => {
                  const isRoot = selectedPath.length === 0;
                  return (
                    <div key={capacity.code}>
                      {renderCapacityCard(capacity, isRoot)}
                      {selectedCapacity?.code === capacity.code && (
                        <div
                          className={`text-sm mt-1 text-center ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Selected
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
                No capacities found for this category
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex w-full justify-center gap-2 mt-4">
            <BaseButton
              label={pageContent["form-profile-cancel"]}
              customClass="bg-[#F6F6F6] w-1/2 rounded-[6px] !py-2 !px-4 font-extrabold text-[14px] text-capx-dark-bg border border-capx-dark-bg hover:bg-gray-600"
              onClick={onClose}
            />
            <BaseButton
              label={pageContent["edit-profile-confirm"]}
              customClass={`bg-capx-secondary-purple rounded-[6px] !py-2 !px-4 font-extrabold text-[14px] text-white hover:bg-capx-primary-green w-1/2 ${
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
