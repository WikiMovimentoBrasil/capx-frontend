import { useMemo } from "react";
import axios from "axios";

export function useCommonsImage() {
  const loadPictures = async (
    inputValue: string,
    callback: (images: any[]) => void
  ) => {
    if (!inputValue) {
      callback([]);
      return;
    }

    const encodedInputValue = encodeURIComponent(inputValue);
    const response = await axios.get(
      `/api/profile_image?query=${encodedInputValue}`
    );

    const images = response.data.map((image: string) => ({
      value: image,
      label: image,
      thumbnail: null,
    }));

    callback(images);

    // Load thumbnails asynchronously
    images.forEach(async (image: any, index: number) => {
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

  return { debouncedLoadPictures };
}

// Utility function
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
