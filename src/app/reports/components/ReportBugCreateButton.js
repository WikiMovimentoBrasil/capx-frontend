import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import ActionButton from "@/components/ActionButton";

export default function ReportBugCreateButton({ children }) {
  const router = useRouter();
  const { data } = useSession();
  const buttonStyle =
    "bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg w-fit text-base px-4 sm:px-8 py-3 rounded-full";

  const handleCreateReport = async () => {
    try {
      const response = await axios.post(
        "/api/report",
        {
          title: "New Report",
          description: "New Report Description",
          author: data.user.username,
        },
        {
          headers: {
            Authorization: `Token ${data.user.token}`,
          },
        }
      );

      if (response.data && response.data.id) {
        router.push(`/reports/${response.data.id}/edit`);
      }
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  return (
    <ActionButton customClass={buttonStyle} onClick={handleCreateReport}>
      {children}
    </ActionButton>
  );
}
