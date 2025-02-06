import { useState, useMemo } from 'react';
import { PaginationState } from '../types/PaginationState';

function usePaginationArray<T>(data: T[], pageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const total = data.length;

  const paginationState: PaginationState<T> = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    const prev = currentPage > 1;
    const next = currentPage * pageSize < total;
    return {
      data: paginatedData,
      total,
      loading: false,
      error: null,
      size: pageSize,
      prev,
      next,
    };
  }, [data, currentPage, pageSize, total]);

  const fetchNextPage = () => {
    if (currentPage * pageSize < total) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    paginationState,
    currentPage,
    fetchNextPage,
    fetchPrevPage,
  };
}

export default usePaginationArray;
