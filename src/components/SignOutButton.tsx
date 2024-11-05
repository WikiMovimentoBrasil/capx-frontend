import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  message: string;
}

export default function SignOutButton({ message }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut()}
      className="flex w-fit h-fit my-auto bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg px-4 sm:px-5 py-2 rounded-full"
    >
      {message}
    </button>
  );
}
