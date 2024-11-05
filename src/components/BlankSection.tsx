interface BlankSectionProps {
  darkMode: boolean;
}

export default function BlankSection({ darkMode }: BlankSectionProps) {
  return (
    <main
      className={`${
        darkMode
          ? "bg-capx-dark-bg text-capx-light-bg"
          : "bg-capx-light-bg text-capx-dark-bg"
      } w-full h-screen`}
    />
  );
}
