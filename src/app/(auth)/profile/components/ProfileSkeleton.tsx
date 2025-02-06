"use client";
import { useTheme } from "@/contexts/ThemeContext";

export default function ProfileSkeleton() {
  const { darkMode } = useTheme();
  
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center">
        {/* Avatar skeleton */}
        <div className={`w-[200px] h-[200px] rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        
        {/* Username skeleton */}
        <div className={`h-8 w-48 mt-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
      </div>

      {/* Bio skeleton */}
      <div className="mt-8">
        <div className={`h-4 w-3/4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className={`h-4 w-1/2 mt-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
      </div>

      {/* Skills skeleton */}
      <div className="mt-8">
        <div className={`h-6 w-48 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className="flex gap-2 mt-2">
          <div className={`h-8 w-24 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-8 w-24 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  );
}