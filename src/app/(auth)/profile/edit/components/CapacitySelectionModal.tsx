import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCapacityList } from "@/hooks/useCapacityList";
import { Capacity } from "@/types/capacity";
import React from "react";
import BaseButton from "@/components/BaseButton";
import { useApp } from "@/contexts/AppContext";

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
  const { data: session, status } = useSession();
  const { pageContent } = useApp();
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

  // Fetch root capacities only when modal opens and we have a token
  useEffect(() => {
    if (!isOpen || !session?.user?.token) return;

    const fetchData = async () => {
      if (rootCapacities.length === 0) {
        await fetchRootCapacities();
      }
    };

    fetchData();
  }, [isOpen, session?.user?.token]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedPath([]);
      setSelectedCapacity(null);
    }
  }, [isOpen]);

  const handleCategorySelect = async (category: Capacity) => {
    try {
      const categoryId = category.id || Number(category.code);

      // Se já tem filhos no hierarchy, apenas navega
      if (capacityHierarchy[categoryId]?.length > 0) {
        setSelectedPath((prev) => [...prev, categoryId]);
        setSelectedCapacity(null);
        return;
      }

      // Tenta buscar filhos
      const children = await fetchCapacitiesByParent(categoryId);

      // Se encontrou filhos, navega para eles
      if (children && children.length > 0) {
        setSelectedPath((prev) => [...prev, categoryId]);
        setSelectedCapacity(null);
        return;
      }

      // Se não tem filhos, seleciona como capacidade final
      setSelectedCapacity(category);
    } catch (err) {
      console.error("Erro ao selecionar categoria:", err);
    }
  };

  const handleConfirm = () => {
    if (selectedCapacity) {
      const capacityToReturn = {
        ...selectedCapacity,
        skill_type: [...selectedPath, selectedCapacity.id].map((id) =>
          id.toString()
        ),
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

    const currentCapacities = capacityHierarchy[currentParentId];

    if (!currentCapacities) {
      return [];
    }

    return currentCapacities;
  }, [selectedPath, capacityHierarchy, rootCapacities]);

  // Renderizar loading enquanto a sessão carrega
  if (status === "loading" || !session) {
    return (
      <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

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
