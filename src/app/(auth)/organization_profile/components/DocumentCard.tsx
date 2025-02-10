import { useDocument } from "@/hooks/useDocument";
import Image from "next/image";
import BaseButton from "@/components/BaseButton";
import { useTheme } from "@/contexts/ThemeContext";
import { WikimediaDocument } from "@/types/document";
import { useApp } from "@/contexts/AppContext";

interface DocumentCardProps {
  documentId: number;
  token?: string;
}

export const DocumentCard = ({ documentId, token }: DocumentCardProps) => {
  const { document, loading, error } = useDocument(token, documentId);
  const { darkMode } = useTheme();
  const { pageContent } = useApp();

  if (loading) {
    return <div className="loading-skeleton">{pageContent["loading"]}</div>;
  }

  if (error || !document) {
    return null;
  }

  return (
    <div
      className={`rounded-[16px] w-[350px] flex-shrink-0 flex flex-col h-fit ${
        darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
      }`}
    >
      <div className="p-6 flex items-center justify-center h-[250px]">
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          {document.thumburl ? (
            <div className="relative w-[200px] h-[200px]">
              <Image
                src={document.thumburl}
                alt={document.title || "Document preview"}
                style={{ objectFit: "contain" }}
                className="p-4"
                fill
                sizes="200px"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              {pageContent["organization-profile-no-image-available"]}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3
          className={`mb-4 font-[Montserrat] text-lg font-bold ${
            darkMode ? "text-white" : "text-[#003649]"
          }`}
        >
          {document.title}
        </h3>
        <BaseButton
          customClass="inline-flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal]"
          label={pageContent["organization-profile-view-document"]}
          onClick={() =>
            window.open(document.fullUrl || document.url, "_blank")
          }
        />
      </div>
    </div>
  );
};
