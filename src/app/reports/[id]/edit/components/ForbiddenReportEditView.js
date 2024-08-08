import MainImage from "../../../../../../public/static/images/main_image.svg";
import UserProfileImage from "@/app/profile/components/UserProfileImage";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

export default function ForbiddenReportEditView({ darkMode, pageContent }) {
  return (
    <div className={"grid grid-cols-1 sm:grid-cols-1 w-10/12 sm:w-8/12 h-fit text-xl mx-auto text-center pt-36 pb-16 space-y-20"}>
      <div className="w-full sm:w-8/12 mx-auto space-y-28">
        <section className="space-y-14 sm:space-y-16">
          <div>
            <UserProfileImage darkMode={darkMode} imageUrl={MainImage} />
          </div>
          <div className="space-y-6 sm:space-y-4">
            <div className="flex-none sm:flex sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
              <h3 className={"w-full sm:w-fit text-3xl " + (darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ")}>
                <div
                    className="bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-widest px-4 sm:px-5 py-3 rounded-lg">
                  <span className="font-extrabold">
                    {pageContent["oh-no-message"]}
                  </span>
                </div>
              </h3>
            </div>
            <div
                className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-fit px-4 py-2 mx-auto my-auto rounded-lg"}>
              <h4 className="text-base">{pageContent["no-report-rights"]}</h4>
            </div>
          </div>
        </section>
        {/* Section: Redirect */}
        <section className="space-y-14 sm:space-y-14">
          <div className="flex flex-wrap w-full sm:flex-nowrap justify-center sm:justify-between gap-4 mb-6">
            <ButtonRedirectToPage to={"/"} style="w-fit h-fit tracking-widest text-sm px-4 sm:px-5 py-2 rounded-full bg-capx-secondary-grey hover:bg-capx-secondary-dark-grey text-[#F6F6F6] hover:text-capx-dark-bg">{pageContent["navbar-link-homepage"]}</ButtonRedirectToPage>
            <ButtonRedirectToPage to={"/profile"} style="w-fit h-fit tracking-widest text-sm px-4 sm:px-5 py-2 rounded-full bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg">{pageContent["navbar-link-profile"]}</ButtonRedirectToPage>
            <ButtonRedirectToPage to={"/capacity"} style="w-fit h-fit tracking-widest text-sm px-4 sm:px-5 py-2 rounded-full bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg">{pageContent["navbar-link-capacities"]}</ButtonRedirectToPage>
            <ButtonRedirectToPage to={"/reports"} style="w-fit h-fit tracking-widest text-sm px-4 sm:px-5 py-2 rounded-full bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg">{pageContent["navbar-link-reports"]}</ButtonRedirectToPage>
          </div>
        </section>
      </div>
    </div>
  )
}