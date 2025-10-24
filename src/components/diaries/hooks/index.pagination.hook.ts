/**
 * Pagination Hook
 * 
 * 페이지네이션 기능을 관리하는 커스텀 훅
 * - 현재 페이지 상태 관리
 * - 페이지 변경 핸들러
 * - 페이지네이션 계산 로직
 */

import { useState, useCallback, useMemo } from 'react';

// 페이지네이션 훅의 반환 타입
export interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  resetPagination: () => void;
  getPageRange: () => number[];
  getVisiblePages: (maxVisiblePages?: number) => number[];
}

/**
 * 페이지네이션 훅
 * @param totalItems 총 아이템 수
 * @param itemsPerPage 페이지당 아이템 수 (기본값: 12)
 * @param initialPage 초기 페이지 (기본값: 1)
 * @returns 페이지네이션 상태 및 액션
 */
export const usePagination = (
  totalItems: number,
  itemsPerPage: number = 12,
  initialPage: number = 1
): UsePaginationReturn => {

  const [currentPage, setCurrentPage] = useState(initialPage);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  // 현재 페이지가 유효한 범위인지 확인
  const validCurrentPage = useMemo(() => {
    if (totalPages === 0) return 1;
    return Math.min(Math.max(currentPage, 1), totalPages);
  }, [currentPage, totalPages]);

  // 페이지네이션 정보
  const hasNextPage = validCurrentPage < totalPages;
  const hasPreviousPage = validCurrentPage > 1;

  // 현재 페이지의 시작/끝 인덱스
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // 페이지 변경 액션들
  const handleSetCurrentPage = useCallback((page: number) => {
    const validPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(validPage);
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    if (validCurrentPage < totalPages) {
      setCurrentPage(validCurrentPage + 1);
    }
  }, [validCurrentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (validCurrentPage > 1) {
      setCurrentPage(validCurrentPage - 1);
    }
  }, [validCurrentPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // 페이지 범위 계산 (1부터 totalPages까지)
  const getPageRange = useCallback((): number[] => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  // 보이는 페이지 번호들 계산 (5개 단위로 노출)
  const getVisiblePages = useCallback((maxVisiblePages: number = 5): number[] => {
    if (totalPages <= maxVisiblePages) {
      return getPageRange();
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, validCurrentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 끝 페이지가 totalPages에 가까우면 시작 페이지 조정
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [validCurrentPage, totalPages, getPageRange]);

  return {
    currentPage: validCurrentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    setCurrentPage: handleSetCurrentPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    getPageRange,
    getVisiblePages
  };
};

export default usePagination;
