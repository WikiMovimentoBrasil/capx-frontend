interface UserProfileViewBoxTitleProps {
  children: React.ReactNode;
}

export default function UserProfileViewBoxTitle({
  children,
}: UserProfileViewBoxTitleProps) {
  return (
    <h2 className="w-full text-2xl font-extrabold text-center">{children}</h2>
  );
}
