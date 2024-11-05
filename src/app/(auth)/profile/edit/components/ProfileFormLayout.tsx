import CommonsSelect from "./CommonsSelect";
import { extractImageName } from "@/lib/utils/helpers";

interface ProfileFormLayoutProps {
  formData: any;
  pageContent: any;
  handleTextInputChange: (e: any) => void;
  handleSingleSelectInputChange: (selectedOption: any, name: string) => void;
  debouncedLoadPictures: () => void;
  formatOptionLabel: (option: any) => React.ReactNode;
  onSubmit: (e: any) => void;
}

export function ProfileFormLayout({
  formData,
  pageContent,
  handleTextInputChange,
  handleSingleSelectInputChange,
  //handleMultiSelectInputChange, TODO: Remove if unused
  debouncedLoadPictures,
  formatOptionLabel,
  onSubmit,
}: ProfileFormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className="w-full" id="profile_form">
      <CommonsSelect
        id="profile_image"
        data={
          formData.userData?.profile_image
            ? {
                label: extractImageName(formData.userData.profile_image),
                thumbnail: formData.userData.profile_image,
              }
            : null
        }
        onChange={(selectedOption) =>
          handleSingleSelectInputChange(selectedOption, "profile_image")
        }
        darkmode={true}
        loadOptions={async () => debouncedLoadPictures()}
        formatOptionLabel={(option: any): string => {
          const node = formatOptionLabel(option);
          return typeof node === "string" ? node : "";
        }}
        maxLength={100}
        key="profile_image"
        placeholder={pageContent["form-profile-select"]}
      >
        {pageContent["form-profile-picture"]}
      </CommonsSelect>
    </form>
  );
}
