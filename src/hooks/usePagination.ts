import { useState, useEffect, useCallback } from 'react';
import { PaginatedResponse } from '../types/PaginatedResponse';

type PaginationState<T> = {
  data: T[];
  total: number;
  next: string | null;
  prev: string | null;
  loading: boolean;
  error: string | null;
  size: number;
};

type FetchDataFunction<T> = (params: any) => Promise<PaginatedResponse<T>>;

function usePagination<T>(
  fetchData: FetchDataFunction<T>,
  initialParams: any
) {
  const [paginationState, setPaginationState] = useState<PaginationState<T>>({
    data: [],
    total: 0,
    next: null,
    prev: null,
    loading: false,
    error: null,
    size: initialParams.size || 25,
  });

  const [params, setParams] = useState(initialParams);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDataAndUpdateState = useCallback(async (url: string | null) => {
    setPaginationState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = url ? await fetchData({ url }) : await fetchData(params);
      setPaginationState({
        data: response.resultIds || [],
        total: response.total || 0,
        next: response.next,
        prev: response.prev,
        loading: false,
        error: null,
        size: params.size, // Ensure that `size` is part of the state
      });
    } catch (error) {
      setPaginationState((prev) => ({
        ...prev,
        loading: false,
        error: 'Error fetching data',
      }));
    }
  }, [fetchData, params]);

  useEffect(() => {
    fetchDataAndUpdateState(null);
  }, [fetchDataAndUpdateState]);

  const fetchNextPage = () => {
    if (paginationState.next) {
      setCurrentPage((prev) => prev + 1);
      fetchDataAndUpdateState(paginationState.next);
    }
  };

  const fetchPrevPage = () => {
    if (paginationState.prev) {
      setCurrentPage((prev) => prev - 1);
      fetchDataAndUpdateState(paginationState.prev);
    }
  };

  const updateParams = (newParams: any) => {
    setParams((prevParams: any) => {
      if (JSON.stringify(prevParams) !== JSON.stringify(newParams)) {
        return newParams;
      }
      return prevParams;
    });
  };

  return {
    paginationState,
    currentPage,
    fetchNextPage,
    fetchPrevPage,
    setParams: updateParams,
  };
}


export default usePagination;
