import SubmitButton from "./SubmitButton";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

interface ProfileFormActionsProps {
  updatingData: boolean;
  onDelete: () => void;
}

export function ProfileFormActions({
  updatingData,
  onDelete,
}: ProfileFormActionsProps) {
  return (
    <div className="flex items-start flex-wrap w-full sm:flex-nowrap">
      <div className="flex space-x-4 flex-wrap sm:w-fit w-full sm:flex-nowrap justify-between sm:justify-start mb-6">
        <SubmitButton updatingData={updatingData} form="profile_form">
          Update Profile
        </SubmitButton>
        <ButtonRedirectToPage to="/profile">Cancel</ButtonRedirectToPage>
      </div>
      <button
        onClick={onDelete}
        className="w-fit h-fit bg-capx-primary-red hover:bg-capx-secondary-red text-[#F6F6F6] tracking-widest font-extrabold text-sm px-4 sm:px-5 py-2 rounded-full ml-auto mr-auto sm:mr-0"
      >
        Delete Profile
      </button>
    </div>
  );
}
