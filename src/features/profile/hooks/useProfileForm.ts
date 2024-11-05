import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";

export function useProfileForm({ session, formData, setFormData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationUsername, setConfirmationUsername] = useState("");
  const [updatingData, setUpdatingData] = useState(false);
  const router = useRouter();

  const handleTextInputChange = (e, chosenState = null) => {
    if (chosenState === null) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        userData: { ...prev.userData, [name]: value },
      }));
    }
  };

  const handleSingleSelectInputChange = (selectedOption, element) => {
    setFormData((prev) => ({
      ...prev,
      userData: { ...prev.userData, [element.name]: selectedOption.value },
    }));
  };

  const handleMultiSelectInputChange = (selectedOptions, element) => {
    const newUserData = {
      ...formData.userData,
      [element.name]: selectedOptions.map((option) => option.value),
    };

    if (element.name === "skills_known") {
      const previousSkillsKnown = formData.userData.skills_known;
      const removedSkills = previousSkillsKnown.filter(
        (skill) => !newUserData.skills_known.includes(skill)
      );

      if (removedSkills.length > 0) {
        newUserData.skills_available =
          formData.userData.skills_available.filter(
            (skill) => !removedSkills.includes(skill)
          );
      }
    }

    setFormData((prev) => ({ ...prev, userData: newUserData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingData(true);

    if (session.sessionStatus === "authenticated") {
      formData.userData.user = session.sessionData.user;
      try {
        await axios.post("/api/profile", formData.userData, {
          headers: {
            Authorization: `Token ${session.sessionData.user.token}`,
          },
        });
        router.push("/profile");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    formData.userData = session.sessionData;

    if (
      formData.userData.user.username === confirmationUsername &&
      session.sessionStatus === "authenticated"
    ) {
      try {
        const response = await axios.delete("/api/profile", {
          headers: {
            Authorization: `Token ${session.sessionData.user.token}`,
          },
          data: {
            userId: formData.userData.user.id,
          },
        });

        if (response.status === 200) {
          setIsModalOpen(false);
          await signOut();
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    } else {
      alert("Usernames do not match");
    }
  };

  const loadPictures = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    const encodedInputValue = encodeURIComponent(inputValue);
    const response = await axios.get(
      `/api/profile_image?query=${encodedInputValue}`
    );
    const images = response.data.map((image) => ({
      value: image,
      label: image,
      thumbnail: null,
    }));
    callback(images);

    images.forEach(async (image, index) => {
      const encodedImageValue = encodeURIComponent(image.value);
      const thumbnailResponse = await axios.get(
        `/api/profile_image?thumb=true&title=${encodedImageValue}`
      );
      images[index].thumbnail = thumbnailResponse.data.image;
      const valueResponse = await axios.get(
        `/api/profile_image?title=${encodedImageValue}`
      );
      images[index].value = valueResponse.data.image;
      callback([...images]);
    });
  };

  const debouncedLoadPictures = useMemo(() => debounce(loadPictures, 500), []);

  const formatOptionLabel = ({ value, label, thumbnail }) => (
    <div className="flex items-center">
      {thumbnail ? (
        <Image src={thumbnail} className="w-8 h-8 rounded-full" alt={label} />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      )}
      <span className="ml-2">{label}</span>
    </div>
  );

  return {
    isModalOpen,
    updatingData,
    handleSubmit,
    handleDelete,
    handleTextInputChange,
    handleSingleSelectInputChange,
    handleMultiSelectInputChange,
    debouncedLoadPictures,
    formatOptionLabel,
    setIsModalOpen,
    confirmationUsername,
    setConfirmationUsername,
  };
}
