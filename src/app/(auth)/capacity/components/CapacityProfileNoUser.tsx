interface CapacityProfileNoUserProps {
  darkMode: boolean;
  title: string;
  noUserMessage: string | undefined;
}

export default function CapacityProfileNoUser({
  darkMode,
  title,
  noUserMessage = undefined,
}: CapacityProfileNoUserProps) {
  return (
    <div>
      <h2 className="text-xl font-extrabold mb-4">{title}</h2>
      <div
        className={
          (darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") +
          "w-full text-xl sm:text-base p-5 rounded-lg"
        }
      >
        {noUserMessage}
      </div>
    </div>
  );
}
