import Link from "next/link";

export default function EditProfileButton() {
  return (
    <div className="mb-10">
      <Link
        href="/profile/edit"
      >
        Edit Profile
      </Link>
    </div>
  )
}