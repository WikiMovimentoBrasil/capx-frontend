export default function ReportViewSkeleton({darkMode}) {
    return (
        <section className={"w-10/12 sm:w-8/12 h-screen mx-auto py-32"}>
            <div className={"grid grid-cols-1 sm:grid-cols-1 w-full sm:w-7/12 h-fit text-xl mx-auto text-center text-xl space-y-14"}>
                <div>
                    <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-2/4 h-16 mx-auto rounded-lg animate-pulse"}></div>
                </div>
                <div className="grid w-full place-items-center space-y-10">
                    <div className="w-full space-y-4">
                        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-12 mx-auto rounded-lg animate-pulse"}></div>
                        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-12 mx-auto rounded-lg animate-pulse"}></div>
                        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-12 mx-auto rounded-lg animate-pulse"}></div>
                        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-3/4 h-12 mx-auto rounded-lg animate-pulse"}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}