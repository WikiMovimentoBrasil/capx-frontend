import Modal from "react-modal";
import TextInput from "./components/TextInput";
import SimpleButton from "./components/SimpleButton";
import SubmitButton from "./components/SubmitButton";

interface DeleteProfileModalProps {
  isOpen: boolean;
  darkMode: boolean;
  pageContent: any;
  confirmationUsername: string;
  setConfirmationUsername: (value: string) => void;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteProfileModal({
  isOpen,
  darkMode,
  pageContent,
  confirmationUsername,
  setConfirmationUsername,
  onClose,
  onDelete,
}: DeleteProfileModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Profile Deletion"
      className={`modal ${
        darkMode
          ? "!bg-capx-dark-box-bg text-capx-light-box-bg"
          : "!bg-capx-light-box-bg text-capx-dark-bg"
      }`}
      overlayClassName="overlay"
    >
      <h2 className="w-full text-2xl font-extrabold text-center mb-6">
        {pageContent["body-profile-delete-confirmation"]}
      </h2>
      <form onSubmit={onDelete} className="w-full" id="delete_profile_form">
        <TextInput
          type="text"
          id="delete_profile"
          placeholder={pageContent["body-profile-delete-message"]}
          data={confirmationUsername}
          onChange={(e: any) => setConfirmationUsername(e.target.value)}
          maxLength={200}
        >
          {pageContent["body-profile-delete-warning"]}
        </TextInput>
      </form>
      <div className="flex flex-wrap w-full sm:flex-nowrap justify-center sm:justify-between gap-4 mb-6">
        <SimpleButton
          type="button"
          onClick={onClose}
          bg_color="bg-capx-secondary-grey hover:bg-capx-secondary-dark-grey"
          text_color="text-[#FFFFFF]"
          //children={undefined}
          to={undefined}
          class_name={undefined}
        >
          {pageContent["form-profile-delete-cancel-button"]}
        </SimpleButton>
        <SubmitButton
          updatingData={false}
          form="delete_profile_form"
          bg_color="bg-capx-primary-red hover:bg-capx-secondary-red"
        >
          {pageContent["form-profile-delete-button"]}
        </SubmitButton>
      </div>
    </Modal>
  );
}
