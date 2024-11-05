interface ViewBoxProps {
  title: string;
  content: string;
  darkMode: boolean;
}

export function ViewBox({ title, content, darkMode }: ViewBoxProps) {
  return (
    <div className="space-y-6 sm:space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div
        className={`p-4 rounded-lg ${
          darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
