import Link from "next/link";

export default function EditProfileButton() {
  return (
    <div className="mb-10">
      <Link
        href="/profile/edit"
        className="w-fit h-fit bg-capx-secondary-purple text-[#F6F6F6] tracking-widest font-extrabold text-sm px-4 sm:px-5 py-3 rounded-full"
      >
        Edit Profile
      </Link>
    </div>
  )
}