import Link from "next/link";
import { localDate } from "@/components/DateUtils";
import ViewBoxTitle from "@/components/ViewBoxTitle";
import ViewTextBox from "@/components/ViewTextBox";
import ReportViewSkeleton from "@/app/[lang]/(auth)/reports/components/ReportViewSkeleton";
import ReportEditButton from "@/app/[lang]/(auth)/reports/components/ReportEditButton";

export default function ReportView({
  darkMode,
  reportData,
  showEditButton,
  pageContent,
  language,
}) {
  if (reportData === undefined) {
    return <ReportViewSkeleton darkMode={darkMode} />;
  }
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-1 w-10/12 sm:w-8/12 h-fit text-xl mx-auto text-center pt-36 pb-16 space-y-20"
      }
    >
      <div className="w-full sm:w-8/12 mx-auto space-y-28">
        {/* Section: Report */}
        <section className="space-y-14 sm:space-y-8">
          {/* Author */}
          <div className="space-y-6 sm:space-y-4">
            <div className="flex-none sm:flex sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
              <h1 className="text-4xl font-extrabold leading-tight">
                {pageContent["form-report-number"]} {reportData?.id}
              </h1>
              {showEditButton ? (
                <ReportEditButton to={"/reports/" + reportData?.id + "/edit"}>
                  {pageContent["form-report-edit-button"]}
                </ReportEditButton>
              ) : null}
            </div>
          </div>
          {/* Author */}
          {reportData?.author === 0 ? null : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>{pageContent["form-report-author"]}</ViewBoxTitle>
              <ViewTextBox
                darkMode={darkMode}
                info={reportData?.author ?? ""}
              />
            </div>
          )}
          {/* Title */}
          {reportData?.title === 0 ? null : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>{pageContent["form-report-title"]}</ViewBoxTitle>
              <ViewTextBox darkMode={darkMode} info={reportData?.title ?? ""} />
            </div>
          )}
          {/* Description */}
          {reportData?.description === 0 ? null : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>
                {pageContent["form-report-description"]}
              </ViewBoxTitle>
              <ViewTextBox
                darkMode={darkMode}
                info={reportData?.description ?? ""}
              />
            </div>
          )}
          {/* Date */}
          {reportData?.created_at === 0 ? null : (
            <div className="space-y-6 sm:space-y-4">
              <ViewBoxTitle>{pageContent["form-report-date"]}</ViewBoxTitle>
              <ViewTextBox
                darkMode={darkMode}
                info={localDate(reportData?.created_at, language) ?? ""}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
