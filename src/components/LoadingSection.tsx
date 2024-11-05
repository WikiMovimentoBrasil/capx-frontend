interface LoadingSectionProps {
  darkMode: boolean;
  message?: string;
}

export default function LoadingSection({
  darkMode,
  message = "Loading...",
}: LoadingSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div
        className={`animate-spin rounded-full h-12 w-12 border-4 ${
          darkMode
            ? "border-gray-600 border-t-gray-200"
            : "border-gray-200 border-t-gray-600"
        }`}
      />
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}
