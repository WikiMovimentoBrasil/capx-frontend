import React, { useState } from "react";
import BaseButton from "./BaseButton";
import capxPersonIcon from "../../public/static/images/capx_person_icon.svg";
import Image from "next/image";

interface RedirectPopupProps {
  onContinue: () => void;
  onClose: () => void;
}

const RedirectPopup = ({ onContinue, onClose }: RedirectPopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const onCloseTab = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 w-[880px] h-[543px] rounded-t-lg">
          <div className="flex flex-row gap-4 items-center">
            <Image src={capxPersonIcon} alt="Person Icon" />
            <h2 className="text-[#053749] text-5xl not-italic font-extrabold leading-[59px]">
              You were redirected to the unified login on Meta-Wiki
            </h2>
          </div>
          <div className="flex flex-row gap-4 mt-16">
            <BaseButton
              customClass="bg-capx-light-bg hover:bg-capx-primary-green border-capx-dark-box-bg border-2 text-capx-dark-box-bg font-extrabold rounded-lg text-center text-xl leading-normal py-2 px-4"
              label="Close Tab"
              onClick={onCloseTab}
            />
            <BaseButton
              customClass="bg-capx-secondary-purple hover:bg-capx-primary-green text-white hover:text-capx-dark-bg font-extrabold rounded-lg text-center text-xl leading-normal py-2 px-4"
              label="Continue"
              onClick={onContinue}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RedirectPopup;
