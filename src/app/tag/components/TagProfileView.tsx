import TagProfileUserList from "./TagProfileUserList";
import TagProfileNoUserBox from "./TagProfileNoUserBox";
import TagProfileViewSkeleton from "./TagProfileViewSkeleton";
import { capitalizeFirstLetter } from "@/lib/utils/stringUtils";

interface TagProfileViewProps {
  darkMode: boolean;
  selectedTagData: any;
  pageContent: any;
  userId: any;
}

export default function TagProfileView({
  darkMode,
  selectedTagData,
  pageContent,
  userId,
}: TagProfileViewProps) {
  if (!selectedTagData) {
    return <TagProfileViewSkeleton darkMode={darkMode} />;
  }

  return (
    <section className="grid grid-cols-1 w-10/12 sm:w-8/12 min-h-screen py-44 place-content-start mx-auto space-y-20">
      <h1 className="text-4xl font-extrabold leading-tight">
        {capitalizeFirstLetter(selectedTagData.name)}
      </h1>
      {selectedTagData.users?.length === 0 ? (
        <TagProfileNoUserBox
          darkMode={darkMode}
          title={pageContent["body-tag-user-list-title"]}
          noUserMessage={pageContent["body-tag-user-list-fallback-message"]}
        />
      ) : // Checking if there is only one person and it is the user himself
      selectedTagData.users.length === 1 &&
        selectedTagData.users[0].id === userId ? (
        <TagProfileNoUserBox
          darkMode={darkMode}
          title={pageContent["body-tag-user-list-title"]}
          noUserMessage={pageContent["body-tag-user-list-fallback-message"]}
        />
      ) : (
        <TagProfileUserList
          darkMode={darkMode}
          title={pageContent["body-tag-user-list-title"]}
          data={selectedTagData.users}
          userId={userId}
        />
      )}
    </section>
  );
}
