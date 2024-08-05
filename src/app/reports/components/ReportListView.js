import Link from "next/link";
import {capitalizeFirstLetter} from "@/components/StringUtils";
import {localDate} from "@/components/DateUtils"

export default function ReportListView({darkMode, reportList, pageContent, language}) {
    if (reportList === undefined) {
        const skeletonItems = Array.from({length: 10});
        return (
            <div className="grid grid-cols-2 gap-8 w-full">
                <ul className="space-y-3">
                    {skeletonItems.map((_, index) => (
                        <li key={index}>
                            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 rounded-lg animate-pulse"}></div>
                        </li>
                    ))}
                </ul>
                <ul className="space-y-3">
                    {skeletonItems.map((_, index) => (
                        <li key={index}>
                            <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 rounded-lg animate-pulse"}></div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    if (Object.keys(reportList).length > 0) {
        return (
            <div className="grid grid-cols-1 gap-8 w-10/12 h-fit text-xl mx-auto text-center sm:w-8/12 pt-36">
                <h1 className="text-4xl font-extrabold leading-tight">
                    {pageContent["navbar-link-reports"]}
                </h1>
                <div className="flex flex-wrap w-full text-sm gap-8 justify-evenly">
                    {reportList?.map((report, index) => (
                        <Link href={"/reports/" + report.id} key={"report-" + report.id}>
                            <div className="block max-w-sm p-6 rounded-lg bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg space-y-4 py-12">
                                <h2 className="mb-2 text-2xl font-bold tracking-tight truncate">{capitalizeFirstLetter(report.title)}</h2>
                                <p className="text-base">{report.author} | {localDate(report.updated_at, language) ?? ""}</p>
                                <p className="text-base truncate">{report.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}