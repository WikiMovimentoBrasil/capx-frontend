"use client";
import { useRouter } from "next/navigation";
import AuthenticatedMainSection from "./AuthenticatedMainSection";
import Popup from "@/components/Popup";
import FirstLoginImage from "@/public/static/images/capx_complete_profile.svg";
import { useTheme } from "@/contexts/ThemeContext";

interface AuthenticatedHomeWrapperProps {
  pageContent: any;
  isFirstLogin: boolean;
}

export default function AuthenticatedHomeWrapper({
  pageContent,
}: AuthenticatedHomeWrapperProps) {
  const router = useRouter();
  const { darkMode } = useTheme();
  const handleContinue = () => {
    router.push("/profile/edit");
  };

  const isFirstLogin = true; // TODO: remove this

  return (
    <>
      <AuthenticatedMainSection pageContent={pageContent} />
      {isFirstLogin && (
        <Popup
          onContinue={handleContinue}
          onClose={() => {}}
          image={FirstLoginImage}
          title={pageContent["complete-your-profile"]}
          closeButtonLabel="Close tab"
          continueButtonLabel="Continue"
          customClass={`${
            darkMode ? "bg-[#005B3F] text-white" : "bg-white text-[#053749]"
          }`}
        />
      )}
    </>
  );
}
