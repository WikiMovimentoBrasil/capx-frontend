import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCapacityList } from "@/hooks/useCapacityList";
import BaseButton from "@/components/BaseButton";
import { Capacity } from "@/types/capacity";

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
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<Capacity | null>(
    null
  );

  const {
    rootCapacities,
    childCapacities,
    isLoading,
    error,
    fetchRootCapacities,
    fetchChildCapacities,
  } = useCapacityList(session?.user?.token);

  useEffect(() => {
    if (isOpen && session?.user?.token) {
      fetchRootCapacities();
      setSelectedCategory(null);
      setSelectedCapacity(null);
    }
  }, [isOpen, session?.user?.token, fetchRootCapacities]);

  const handleCategorySelect = async (category: Capacity) => {
    try {
      if (selectedCategory === category.id) {
        setSelectedCategory(null);
        setSelectedCapacity(null);
        return;
      }

      setSelectedCategory(category.id);
      setSelectedCapacity(null);
      await fetchChildCapacities(category.id);
    } catch (err) {
      console.error("Erro ao selecionar categoria:", err);
    }
  };

  const handleCapacitySelect = (capacity: Capacity) => {
    setSelectedCapacity(capacity);
  };

  const handleConfirm = () => {
    if (selectedCapacity) {
      const capacityToReturn = {
        ...selectedCapacity,
        skill_type: [selectedCategory?.toString() || ""],
      };
      onSelect(capacityToReturn);
      onClose();
    }
  };

  if (!isOpen) return null;

  const getCategoryColor = (categoryId: number) => {
    const colors = {
      1: "bg-[#0070B9]", // Organizational structure
      2: "bg-[#9B1C8D]", // Communication
      3: "bg-[#00A88F]", // Learning and Evaluation
      4: "bg-[#B15700]", // Social skill
    };
    return colors[categoryId] || "bg-gray-500";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4">
          <h2 className="text-[#053749] text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="space-y-3">
            {rootCapacities.map((category) => (
              <div key={category.id}>
                <BaseButton
                  onClick={() => handleCategorySelect(category)}
                  customClass={`w-full text-left p-4 rounded-md text-white font-semibold flex items-center justify-between ${getCategoryColor(
                    category.id
                  )}`}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>{category.name || ""}</span>
                      <span className="transform transition-transform duration-200 ml-2">
                        {selectedCategory === category.id ? "▼" : "▶"}
                      </span>
                    </div>
                  }
                />

                {selectedCategory === category.id &&
                  childCapacities[category.id] && (
                    <div className="ml-4 mt-2 space-y-2">
                      {childCapacities[category.id].map((capacity) => (
                        <button
                          key={capacity.id}
                          onClick={() => handleCapacitySelect(capacity)}
                          className={`w-full text-left p-2 rounded ${
                            selectedCapacity?.id === capacity.id
                              ? "bg-gray-100"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {capacity.name}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between sticky bottom-0 bg-white pt-4">
          <BaseButton
            label="Close tab"
            onClick={onClose}
            customClass="px-6 py-2 border border-[#053749] text-[#053749] rounded-md font-semibold"
          />
          <BaseButton
            label="Confirm"
            onClick={handleConfirm}
            customClass="px-6 py-2 bg-[#9B1C8D] text-white rounded-md font-semibold"
            disabled={!selectedCapacity}
          />
        </div>
      </div>
    </div>
  );
}
