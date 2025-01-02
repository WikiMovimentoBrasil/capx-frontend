import Image from "next/image";
import TabletIllustration from "@/public/static/images/tablet_illustration.svg";
import CapxPencilIllustration from "@/public/static/images/capx_pencil_illustration.svg";
import { useApp } from "@/contexts/AppContext";

interface VideoSectionProps {
  pageContent: any;
}

export default function VideoSection({ pageContent }: VideoSectionProps) {
  const { isMobile } = useApp();

  const videoUrl =
    "https://upload.wikimedia.org/wikipedia/commons/c/cd/Capacity_Exchange_-_Launch_Video.webm";

  if (isMobile) {
    return (
      <section
        className="w-full pt-12 border-b border-capx-secondary-purple bg-[var(--Backgrounds-light-box-bg,_#EFEFEF)]"
        id="video-section"
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg mb-8">
            {pageContent["body-home-video-section-title"]}
          </h1>
        </div>
        <div className="flex justify-center items-center mx-4 relative">
          <Image
            src={TabletIllustration}
            alt="Tablet illustration"
            className="w-[600px] h-[300px] -mt-8"
          />
          <div className="absolute inset-0 flex items-center justify-center mb-10">
            <div className="w-[80%] h-[70%] relative">
              <video
                controls
                className="w-full h-full object-fill rounded-lg"
                playsInline
                preload="metadata"
              >
                <source src={videoUrl} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-12 border-b border-capx-secondary-purple bg-[var(--Backgrounds-light-box-bg,_#EFEFEF)]">
      <div className="flex flex-col justify-center items-center sm:items-start sm:justify-start ml-0 sm:ml-20">
        <h1 className="font-[Montserrat] text-[36px] not-italic font-extrabold leading-[normal] text-capx-dark-box-bg">
          {pageContent["body-home-video-section-title"]}
        </h1>
      </div>
      <div className="w-full flex justify-center items-center xl:mb-8">
        <div className="w-full flex justify-center items-center">
          <Image
            src={CapxPencilIllustration}
            alt="Capx pencil illustration"
            className="w-[250px] h-[450px]"
          />
        </div>
        <div className="w-full flex justify-center items-center mr-0 sm:mr-10 relative">
          <Image
            src={TabletIllustration}
            alt="Tablet illustration"
            className="w-[1000px] h-[500px] -mt-8"
          />
          <div className="absolute inset-0 flex items-center justify-center mb-10">
            <div className="w-[80%] h-[70%] relative">
              <video
                controls
                className="w-full h-full object-fill rounded-lg"
                playsInline
                preload="metadata"
              >
                <source src={videoUrl} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
