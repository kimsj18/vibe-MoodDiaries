"use client";

import React from "react";
import styles from "./styles.module.css";

interface PaginationProps {
  /** 현재 페이지 번호 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 시 호출되는 함수 */
  onPageChange: (page: number) => void;
  /** 페이지네이션 변형 */
  variant?: "primary" | "secondary" | "tertiary";
  /** 페이지네이션 크기 */
  size?: "small" | "medium" | "large";
  /** 테마 */
  theme?: "light" | "dark";
  /** 한 번에 표시할 페이지 번호 개수 */
  visiblePages?: number;
  /** width만 허용되는 className */
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "primary",
  size = "medium",
  theme = "light",
  visiblePages = 5,
  className,
}: PaginationProps) {
  // 표시할 페이지 번호들 계산
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // 끝에서 시작 조정
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePageNumbers = getVisiblePages();

  // 이전 페이지로 이동
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 특정 페이지로 이동
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div 
      className={`${styles.pagination} ${styles[`pagination--${variant}`]} ${styles[`pagination--${size}`]} ${styles[`pagination--${theme}`]} ${className || ''}`}
    >
      {/* 이전 버튼 */}
      <button
        className={`${styles.navigationButton} ${styles.previousButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* 페이지 번호들 */}
      <div className={styles.pageNumbers}>
        {visiblePageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${styles.pageButton} ${
              pageNumber === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageClick(pageNumber)}
            aria-label={`페이지 ${pageNumber}`}
            aria-current={pageNumber === currentPage ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        className={`${styles.navigationButton} ${styles.nextButton} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

// 타입 내보내기
export type { PaginationProps };
