interface CapacityProfileNoUserProps {
  darkMode: boolean;
  pageContent: Record<string, string>;
}

export default function CapacityProfileNoUser({
  darkMode,
  pageContent,
}: CapacityProfileNoUserProps) {
  return (
    <div
      className={`w-full ${
        darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
      } px-8 py-6 rounded-lg`}
    >
      <p className="text-center">
        {pageContent["body-capacity-user-list-fallback-message"]}
      </p>
    </div>
  );
}
