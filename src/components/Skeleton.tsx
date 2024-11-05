interface SkeletonProps {
  darkMode: boolean;
  count?: number;
  columns?: number;
}

export function Skeleton({ darkMode, count = 10, columns = 2 }: SkeletonProps) {
  const skeletonItems = Array.from({ length: count });
  const baseClasses = darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg";

  return (
    <div className={`grid grid-cols-${columns} gap-8 w-full`}>
      {Array.from({ length: columns }).map((_, colIndex) => (
        <ul key={colIndex} className="space-y-3">
          {skeletonItems.map((_, index) => (
            <li key={index}>
              <div
                className={`${baseClasses} w-full h-8 rounded-lg animate-pulse`}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
