import MainImage from "/static/images/main_image.svg";
import UserProfileImage from "./UserProfileImage";
import ButtonRedirectToPage from "@/components/ButtonRedirectToPage";

interface NoUserProfileViewProps {
  darkMode: boolean;
  pageContent: Record<string, string>;
}

interface NavigationButton {
  to: string;
  contentKey: string;
  isPrimary?: boolean;
}

export default function NoUserProfileView({
  darkMode,
  pageContent,
}: NoUserProfileViewProps) {
  const navigationButtons: NavigationButton[] = [
    {
      to: "/",
      contentKey: "navbar-link-homepage",
      isPrimary: false,
    },
    {
      to: "/profile",
      contentKey: "navbar-link-profile",
      isPrimary: true,
    },
    {
      to: "/capacity",
      contentKey: "navbar-link-capacities",
      isPrimary: true,
    },
  ];

  const getButtonStyle = (isPrimary = true) => {
    const baseStyle =
      "w-fit h-fit tracking-widest text-sm px-4 sm:px-5 py-2 rounded-full text-[#F6F6F6] hover:text-capx-dark-bg";
    return isPrimary
      ? `${baseStyle} bg-capx-secondary-purple hover:bg-capx-primary-green`
      : `${baseStyle} bg-capx-secondary-grey hover:bg-capx-secondary-dark-grey`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 w-10/12 sm:w-8/12 h-fit text-xl mx-auto text-center pt-36 pb-16 space-y-20">
      <div className="w-full sm:w-8/12 mx-auto space-y-28">
        {/* Profile Section */}
        <section className="space-y-14 sm:space-y-16">
          <div>
            <UserProfileImage
              darkMode={darkMode}
              imageUrl={MainImage}
              name={pageContent["no-user-profile"]}
            />
          </div>

          <div className="space-y-6 sm:space-y-4">
            <div className="flex-none sm:flex sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
              <h3
                className={`w-full sm:w-fit text-3xl ${
                  darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
                }`}
              >
                <div className="bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-widest px-4 sm:px-5 py-3 rounded-lg">
                  <span className="font-extrabold">
                    {pageContent["no-user-profile"]}
                  </span>
                </div>
              </h3>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="space-y-14">
          <div className="flex flex-wrap w-full sm:flex-nowrap justify-center sm:justify-between gap-4 mb-6">
            {navigationButtons.map(({ to, contentKey, isPrimary }) => (
              <ButtonRedirectToPage
                key={to}
                to={to}
                style={getButtonStyle(isPrimary)}
              >
                {pageContent[contentKey]}
              </ButtonRedirectToPage>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
