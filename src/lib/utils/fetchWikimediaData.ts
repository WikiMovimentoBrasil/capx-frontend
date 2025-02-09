import { WikimediaImage } from "@/types/wikidataImage";
import { WikimediaDocument } from "@/types/document";

export const fetchWikimediaData = async (
  url: string
): Promise<WikimediaDocument> => {
  try {
    let fileName = "";

    if (url?.includes("commons.wikimedia.org/wiki/File:")) {
      fileName = url?.split("File:")[1];
    } else if (url?.includes("upload.wikimedia.org/wikipedia/commons/")) {
      const parts = url?.split("/");
      fileName = parts[parts.length - 1];
    } else {
      fileName = url || "";
    }

    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&formatversion=2&format=json&iiprop=url%7Cmetadata&iiurlheight=200&titles=File:${encodeURIComponent(
      fileName
    )}&origin=*`;

    const response = await fetch(apiUrl);
    const data: WikimediaImage = await response.json();

    if (data.query?.pages?.[0]) {
      const page = data.query.pages[0];
      const imageInfo = page.imageinfo?.[0];

      return {
        id: 0,
        title: page.title.replace("File:", ""),
        imageUrl: imageInfo?.thumburl,
        fullUrl: imageInfo?.url,
        metadata: imageInfo?.metadata,
        thumburl: imageInfo?.thumburl,
      };
    }
    return {
      id: 0,
      title: "",
      imageUrl: "",
      fullUrl: "",
      metadata: [],
    };
  } catch (error) {
    console.error("Error fetching Wikimedia data:", error);
    return {
      id: 0,
      title: "",
      imageUrl: "",
      fullUrl: "",
      metadata: [],
    };
  }
};

export const formatWikiImageUrl = (url: string | undefined): string => {
  if (!url) return "";

  if (url.includes("upload.wikimedia.org")) {
    return url;
  }

  if (url.includes("commons.wikimedia.org")) {
    return url.replace("/wiki/File:", "/wiki/Special:FilePath/");
  }

  if (url.startsWith("File:")) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${url.replace(
      "File:",
      ""
    )}`;
  }

  return url;
};
