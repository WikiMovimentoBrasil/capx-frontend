import TagProfileViewSkeleton from "./TagProfileViewSkeleton";

export default function TagProfileView({ darkMode, selectedTagData, pageContent }) {
  if (selectedTagData === undefined) {
    return <TagProfileViewSkeleton darkMode={darkMode} />
  }

  return (
    <section className="grid grid-cols-1 w-10/12 sm:w-8/12 min-h-screen py-32 place-content-start mx-auto space-y-20"></section>
  )
}