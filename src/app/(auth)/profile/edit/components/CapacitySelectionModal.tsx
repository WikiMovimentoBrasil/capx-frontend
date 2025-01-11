import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCapacityList } from "@/hooks/useCapacityList";
import { Capacity } from "@/types/capacity";
import React from "react";
import BaseButton from "@/components/BaseButton";

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
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<Capacity | null>(
    null
  );

  const {
    rootCapacities,
    capacityHierarchy,
    isLoading,
    error,
    fetchRootCapacities,
    fetchCapacitiesByParent,
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
      console.log("Selected category:", category);
      const categoryId = category.id || Number(category.code);
      const currentPathIndex = selectedPath.indexOf(categoryId);

      if (currentPathIndex !== -1) {
        setSelectedPath((prev) => prev.slice(0, currentPathIndex + 1));
        setSelectedCapacity(null);
        return;
      }

      if (!capacityHierarchy[categoryId]) {
        const children = await fetchCapacitiesByParent(categoryId);
        console.log("Fetched children:", children);

        if (children && children.length > 0) {
          setSelectedPath((prev) => [...prev, categoryId]);
          setSelectedCapacity(null);
          return;
        }
      }

      if (capacityHierarchy[categoryId]?.length > 0) {
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
    console.log("Capacity selected:", capacity);
    setSelectedCapacity(capacity);
  };

  const handleConfirm = () => {
    if (selectedCapacity) {
      const capacityToReturn = {
        ...selectedCapacity,
        skill_type: [...selectedPath, selectedCapacity.id].map((id) =>
          id.toString()
        ),
      };
      console.log("Confirming capacity selection:", capacityToReturn);
      onSelect(capacityToReturn);
      onClose();
    }
  };

  const getCurrentCapacities = useCallback(() => {
    if (selectedPath.length === 0) {
      console.log("Returning root capacities:", rootCapacities);
      return rootCapacities;
    }

    const currentParentId = selectedPath[selectedPath.length - 1];
    console.log("Getting capacities for parent:", currentParentId);
    console.log("Full hierarchy:", capacityHierarchy);

    const currentCapacities = capacityHierarchy[currentParentId];
    console.log("Found capacities for ID:", currentParentId, currentCapacities);

    if (!currentCapacities) {
      console.log("No capacities found in hierarchy for ID:", currentParentId);
      return [];
    }

    return currentCapacities;
  }, [selectedPath, capacityHierarchy, rootCapacities]);

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
              const capacity = [
                ...rootCapacities,
                ...Object.values(capacityHierarchy).flat(),
              ].find((cap) => cap.id === pathId);

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
                    {capacity?.name}
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          {/* Capacity list */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div
                className={`text-center py-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Loading...
              </div>
            ) : getCurrentCapacities().length > 0 ? (
              getCurrentCapacities().map((capacity) => (
                <div
                  key={capacity.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    darkMode
                      ? "hover:bg-gray-700 bg-gray-800 border"
                      : "hover:bg-gray-100 bg-gray-50 border"
                  } ${
                    selectedCapacity?.id === capacity.id
                      ? darkMode
                        ? "border-capx-primary-green shadow-lg"
                        : "border-capx-primary-green shadow-md"
                      : darkMode
                      ? "border-gray-700"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleCategorySelect(capacity)}
                >
                  <div
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {capacity.name}
                  </div>
                  {selectedCapacity?.id === capacity.id && (
                    <div
                      className={`text-sm mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Selected
                    </div>
                  )}
                </div>
              ))
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
              label="Cancel"
              customClass="bg-[#F6F6F6] w-1/2 rounded-[6px] !py-2 !px-4 font-extrabold text-[14px] text-capx-dark-bg border border-capx-dark-bg hover:bg-gray-600"
              onClick={onClose}
            />
            <BaseButton
              label="Confirm"
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
