import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCapacityList } from "@/hooks/useCapacityList";
import { Capacity } from "@/types/capacity";
import BaseButton from "@/components/BaseButton";
import { useApp } from "@/contexts/AppContext";
import { CapacityCard } from "@/app/(auth)/capacity/components/CapacityCard";

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
  const [expandedCapacities, setExpandedCapacities] = useState<
    Record<string, boolean>
  >({});
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});
  const [selectedCapacity, setSelectedCapacity] = useState<Capacity | null>(
    null
  );

  const {
    rootCapacities,
    isLoading,
    error,
    fetchRootCapacities,
    fetchCapacityDescription,
  } = useCapacityList(session?.user?.token);

  useEffect(() => {
    if (isOpen && session?.user?.token) {
      fetchRootCapacities();
      setExpandedCapacities({});
      setSelectedCapacity(null);
    }
  }, [isOpen, session?.user?.token, fetchRootCapacities]);

  const toggleChildCapacities = (code: string) => {
    setExpandedCapacities((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleCapacitySelect = (capacity: Capacity) => {
    setSelectedCapacity(capacity);
  };

  const handleConfirm = () => {
    if (selectedCapacity) {
      onSelect(selectedCapacity);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4`}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {isLoading?.root ? (
            <div className="text-center py-4">{pageContent["loading"]}</div>
          ) : (
            <div className="grid gap-[40px] w-full">
              {rootCapacities.map((capacity) => (
                <CapacityCard
                  key={capacity.code}
                  {...capacity}
                  isExpanded={!!expandedCapacities[capacity.code]}
                  onExpand={() =>
                    toggleChildCapacities(capacity.code.toString())
                  }
                  hasChildren={true}
                  isRoot={true}
                  description={descriptions[capacity.code] || ""}
                  onInfoClick={fetchCapacityDescription}
                  isSelectable={true}
                  isSelected={selectedCapacity?.code === capacity.code}
                  onSelect={() => handleCapacitySelect(capacity)}
                />
              ))}
            </div>
          )}
        </div>

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
  );
}
