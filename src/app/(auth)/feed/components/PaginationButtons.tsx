import { useTheme } from '@/contexts/ThemeContext';
import { useApp } from '@/contexts/AppContext';
import SimpleButton from '../../profile/edit/components/SimpleButton';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationButtons({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationButtonsProps) {
  const { darkMode } = useTheme();
  const { pageContent } = useApp();

  return (
    <div className="flex items-center justify-center gap-4 mt-6 mb-8">
      <SimpleButton
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        class_name={`
          px-4 py-2 rounded-lg transition-colors
          ${darkMode 
            ? 'hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600' 
            : 'hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400'
          }
        `}
      >
        {pageContent["pagination-previous"] || "Previous"}
      </SimpleButton>

      <div className={`
        flex items-center gap-3 text-sm font-medium
        ${darkMode ? 'text-white' : 'text-gray-700'}
      `}>
        <span className="font-semibold">{pageContent["pagination-page"]}</span>
        <span className="font-bold text-lg">{currentPage}</span>
        <span className="text-gray-400 mx-1">{pageContent["pagination-of"]}</span>
        <span className="font-bold text-lg">{totalPages}</span>
      </div>

      <SimpleButton
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        class_name={`
          px-4 py-2 rounded-lg transition-colors
          ${darkMode 
            ? 'hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600' 
            : 'hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400'
          }
        `}
      >
        {pageContent["pagination-next"] || "Next"}
      </SimpleButton>
    </div>
  );
}
