import React from 'react';
import { PaginationState } from '../types/PaginationState';

interface PaginationProps {
  paginationState: PaginationState<string>;
  currentPage: number;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  paginationState,
  currentPage,
  fetchPrevPage,
  fetchNextPage,
}) => {
  const { prev, next, total, size } = paginationState;

  // Calculate total pages
  const totalPages = Math.ceil(total / size);

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="text-sm text-gray-600">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={fetchPrevPage}
          disabled={!prev}
          className={`py-2 px-4 bg-gray-200 text-gray-700 rounded-lg 
            ${prev ? 'hover:bg-blue-500 hover:text-white' : 'cursor-not-allowed bg-gray-100 text-gray-400'} transition-all duration-300`}
        >
          Previous
        </button>

        <button
          onClick={fetchNextPage}
          disabled={!next}
          className={`py-2 px-4 bg-gray-200 text-gray-700 rounded-lg 
            ${next ? 'hover:bg-blue-500 hover:text-white' : 'cursor-not-allowed bg-gray-100 text-gray-400'} transition-all duration-300`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
