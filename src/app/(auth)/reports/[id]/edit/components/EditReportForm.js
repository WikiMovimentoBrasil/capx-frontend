"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextArea from "../../../../profile/edit/components/TextArea";
import TextInput from "../../../../profile/edit/components/TextInput";
import SubmitButton from "../../../../profile/edit/components/SubmitButton";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

export default function EditReportForm({
  darkMode,
  session,
  reportData,
  setReportData,
  pageContent,
}) {
  const router = useRouter();
  const [updatingData, setUpdatingData] = useState(false);

  const handleTextInputChange = (e, chosenState = null) => {
    const { name, value } = e.target;

    if (chosenState == null) {
      const newReportData = {
        ...reportData,
        [name]: value,
      };
      setReportData({ ...reportData, ...newReportData });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdatingData(true);

    const data = {
      report: reportData.id,
      author: session.sessionData.user.username,
      title: event.target.title.value,
      description: event.target.description.value,
    };

    try {
      const response = await axios.post("/api/report", data, {
        headers: {
          Authorization: `Token ${session.sessionData.user.token}`,
        },
      });
      console.log("Form submitted successfully:", response.data);
      router.push("/reports/" + reportData.id);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setUpdatingData(false);
    }
  };

  return (
    <section
      className={
        "flex flex-wrap flex-col w-10/12 h-fit mx-auto place-content-start py-32"
      }
    >
      <form className="w-full" id="report_form" onSubmit={handleSubmit}>
        {/* Author */}
        <TextInput
          id={"author"}
          key={"author"}
          data={reportData?.author ?? ""}
          type={"text"}
          maxLength={280}
          onChange={handleTextInputChange}
          readOnly={true}
          inputCustomClass="w-full h-12 text-capx-dark-bg pl-4 rounded-md bg-[#DCDCDC]"
        >
          {pageContent["form-report-author"]}
        </TextInput>
        {/* Title */}
        <TextInput
          id={"title"}
          key={"title"}
          data={reportData?.title ?? ""}
          placeholder={pageContent["form-report-description-placeholder"]}
          type={"text"}
          maxLength={280}
          onChange={handleTextInputChange}
        >
          {pageContent["form-report-title"]}
        </TextInput>
        {/* Description */}
        <TextArea
          id={"description"}
          key={"description"}
          data={reportData?.description ?? ""}
          placeholder={pageContent["form-profile-short-bio-placeholder"]}
          type={"text"}
          maxLength={1000}
          onChange={handleTextInputChange}
        >
          {pageContent["form-report-description"]}
        </TextArea>
      </form>
      <div className="flex items-start flex-wrap w-full sm:flex-nowrap">
        <div className="flex space-x-4 flex-wrap sm:w-fit w-full sm:flex-nowrap justify-between sm:justify-start mb-6">
          <SubmitButton updatingData={updatingData} form="report_form">
            {pageContent["form-report-update-button"]}
          </SubmitButton>
          <ButtonRedirectToPage to={"/reports/" + reportData.id}>
            Cancel{" "}
          </ButtonRedirectToPage>
        </div>
      </div>
    </section>
  );
}
