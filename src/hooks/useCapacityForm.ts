import { useState } from "react";
import { capacityService } from "@/services/capacityService";

export function useCapacityForm(initialData: any, session: any) {
  const [capacityData, setCapacityData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleCapacityChange = (
    selectedOptions: any[],
    type: "skills_known" | "skills_available" | "skills_wanted"
  ) => {
    const newCapacities = selectedOptions.map((option) => option.value);

    let updatedData = {
      ...capacityData,
      [type]: newCapacities,
    };

    // Handle skills_available dependency on skills_known
    if (type === "skills_known") {
      const removedSkills = capacityData.skills_known.filter(
        (skill) => !newCapacities.includes(skill)
      );

      if (removedSkills.length > 0) {
        updatedData.skills_available = capacityData.skills_available.filter(
          (skill) => !removedSkills.includes(skill)
        );
      }
    }

    setCapacityData(updatedData);
  };

  const updateCapacities = async () => {
    if (session.sessionStatus === "authenticated") {
      setIsLoading(true);
      try {
        await capacityService.updateCapacities(
          session.sessionData.user.id,
          capacityData,
          session.sessionData.user.token
        );
      } catch (error) {
        console.error("Error updating capacities:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    capacityData,
    isLoading,
    handleCapacityChange,
    updateCapacities,
  };
}
