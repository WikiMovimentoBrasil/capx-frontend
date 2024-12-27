"use client";
import { useRouter } from "next/navigation";
import AuthenticatedMainSection from "./AuthenticatedMainSection";
import Popup from "@/components/Popup";
import FirstLoginImage from "@/public/static/images/capx_complete_profile.svg";

interface AuthenticatedHomeWrapperProps {
  pageContent: any;
  isFirstLogin: boolean;
}

export default function AuthenticatedHomeWrapper({
  pageContent,
}: AuthenticatedHomeWrapperProps) {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/auth/profile/edit");
  };

  const isFirstLogin = true;

  return (
    <>
      <AuthenticatedMainSection pageContent={pageContent} />
      {isFirstLogin && (
        <Popup
          onContinue={handleContinue}
          onClose={() => {}}
          image={FirstLoginImage}
          title="Complete your profile for a better experience"
          closeButtonLabel="Close tab"
          continueButtonLabel="Continue"
        />
      )}
    </>
  );
}
