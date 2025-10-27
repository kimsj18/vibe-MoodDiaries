'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import SelectBox from '@/commons/components/selectbox';
import SearchBar from '@/commons/components/searchbar';
import Button from '@/commons/components/button';
import Pagination from '@/commons/components/pagination';
import Image from 'next/image';
import { getEmotionDisplayText, getEmotionColor } from '@/commons/constants/enum';
import { useDiaryModal } from './hooks/index.link.modal.hook';
import { useDiaryBinding, getEmotionImages, truncateTitle } from './hooks/index.binding.hook';
import { useDiaryLinkRouting } from './hooks/index.link.routing.hook';
import { useDiarySearch } from './hooks/index.search.hook';
import { useDiaryFilter } from './hooks/index.filter.hook';
import { usePagination } from './hooks/index.pagination.hook';
import { useDiaryDelete } from './hooks/index.delete.hook';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';

// 기존 Diary 타입은 DiaryData로 대체됨 (hooks/index.binding.hook.ts에서 import)

// emotionTypeToImage는 hooks/index.binding.hook.ts의 getEmotionImages 함수로 대체됨

// mockDiaries는 제거됨 - 실제 로컬스토리지 데이터를 사용

const Diaries: React.FC = () => {
  // 모달 훅 사용
  const { openDiaryModal } = useDiaryModal();
  
  // 데이터 바인딩 훅 사용
  const { diaries, loading, error } = useDiaryBinding();
  
  // 링크 라우팅 훅 사용
  const { handleCardClick } = useDiaryLinkRouting();
  
  // 삭제 훅 사용
  const { handleDeleteClick: deleteDiary } = useDiaryDelete();
  
  // 권한 체크 훅 사용
  const { isLoggedIn } = useAuthGuard();
  
  // 검색 훅 사용
  const { searchTerm, filteredDiaries: searchFilteredDiaries, isSearching, handleSearch, handleClearSearch } = useDiarySearch(diaries);
  
  // 필터 훅 사용 (검색된 결과에 필터 적용)
  const { selectedFilter, filteredDiaries, filterOptions, handleFilterChange, isFiltered } = useDiaryFilter(searchFilteredDiaries);
  
  // 페이지네이션 훅 사용
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    resetPagination,
    startIndex,
    endIndex
  } = usePagination(filteredDiaries.length, 12);
  
  // 검색 시 페이지를 첫 페이지로 리셋
  const handleSearchWithPageReset = (term: string) => {
    handleSearch(term);
    resetPagination();
  };

  // 현재 페이지에 해당하는 일기 데이터 (검색된 결과 기준)
  const getCurrentPageDiaries = () => {
    return filteredDiaries.slice(startIndex, endIndex);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className={styles.container} data-testid="diaries-page">
        <div className={styles.gap1}></div>
        <div className={styles.search}>
          <div className={styles.searchContent}>
            <div className={styles.searchLeftGroup}>
              <SelectBox
                variant="primary"
                theme="light"
                size="large"
                options={filterOptions}
                defaultValue={selectedFilter}
                value={selectedFilter}
                onChange={handleFilterChange}
                className={styles.selectWidth}
                data-testid="emotion-filter-select"
              />
              <SearchBar
                variant="primary"
                theme="light"
                size="large"
                placeholder="검색어를 입력해 주세요."
                className={styles.searchWidth}
                onSearch={handleSearchWithPageReset}
                onClear={handleClearSearch}
                loading={isSearching}
              />
            </div>
            <Button
              variant="primary"
              theme="light"
              size="large"
              className={styles.buttonWidth}
              onClick={openDiaryModal}
              data-testid="diary-write-button"
            >
              일기쓰기
            </Button>
          </div>
          <div className={styles.searchContentMobile}>
            <SearchBar
              variant="primary"
              theme="light"
              size="large"
              placeholder="검색어를 입력해 주세요."
              className={styles.searchBarMobile}
              onSearch={handleSearchWithPageReset}
              onClear={handleClearSearch}
              loading={isSearching}
            />
            <div className={styles.searchRightGroup}>
              <SelectBox
                variant="primary"
                theme="light"
                size="large"
                options={filterOptions}
                defaultValue={selectedFilter}
                value={selectedFilter}
                onChange={handleFilterChange}
                className={styles.selectWidthMobile}
                data-testid="emotion-filter-select-mobile"
              />
              <Button
                variant="primary"
                theme="light"
                size="large"
                className={styles.buttonWidthMobile}
                onClick={openDiaryModal}
                data-testid="diary-write-button-mobile"
              >
                일기쓰기
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.gap2}></div>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <p>일기를 불러오는 중...</p>
            </div>
          </div>
        </div>
        <div className={styles.gap3}></div>
        <div className={styles.pagination}>
          <div className={styles.paginationContent}>
            <Pagination
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              variant="primary"
              theme="light"
              size="medium"
              className={styles.paginationWidth}
            />
          </div>
        </div>
        <div className={styles.gap4}></div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className={styles.container} data-testid="diaries-page">
        <div className={styles.gap1}></div>
        <div className={styles.search}>
          <div className={styles.searchContent}>
            <div className={styles.searchLeftGroup}>
              <SelectBox
                variant="primary"
                theme="light"
                size="large"
                options={filterOptions}
                defaultValue={selectedFilter}
                value={selectedFilter}
                onChange={handleFilterChange}
                className={styles.selectWidth}
                data-testid="emotion-filter-select"
              />
              <SearchBar
                variant="primary"
                theme="light"
                size="large"
                placeholder="검색어를 입력해 주세요."
                className={styles.searchWidth}
                onSearch={handleSearchWithPageReset}
                onClear={handleClearSearch}
                loading={isSearching}
              />
            </div>
            <Button
              variant="primary"
              theme="light"
              size="large"
              className={styles.buttonWidth}
              onClick={openDiaryModal}
              data-testid="diary-write-button"
            >
              일기쓰기
            </Button>
          </div>
          <div className={styles.searchContentMobile}>
            <SearchBar
              variant="primary"
              theme="light"
              size="large"
              placeholder="검색어를 입력해 주세요."
              className={styles.searchBarMobile}
              onSearch={handleSearchWithPageReset}
              onClear={handleClearSearch}
              loading={isSearching}
            />
            <div className={styles.searchRightGroup}>
              <SelectBox
                variant="primary"
                theme="light"
                size="large"
                options={filterOptions}
                defaultValue={selectedFilter}
                value={selectedFilter}
                onChange={handleFilterChange}
                className={styles.selectWidthMobile}
                data-testid="emotion-filter-select-mobile"
              />
              <Button
                variant="primary"
                theme="light"
                size="large"
                className={styles.buttonWidthMobile}
                onClick={openDiaryModal}
                data-testid="diary-write-button-mobile"
              >
                일기쓰기
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.gap2}></div>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <p style={{ color: 'red', marginBottom: '16px' }}>오류가 발생했습니다: {error}</p>
              <p>일기를 불러올 수 없습니다.</p>
            </div>
          </div>
        </div>
        <div className={styles.gap3}></div>
        <div className={styles.pagination}>
          <div className={styles.paginationContent}>
            <Pagination
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              variant="primary"
              theme="light"
              size="medium"
              className={styles.paginationWidth}
            />
          </div>
        </div>
        <div className={styles.gap4}></div>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid="diaries-page">
      {/* 첫 번째 gap: 1168 * 32 */}
      <div className={styles.gap1}></div>

      {/* Search 영역: 1168 * 48 */}
      <div className={styles.search}>
        {/* 데스크톱 버전 */}
        <div className={styles.searchContent}>
          <div className={styles.searchLeftGroup}>
            <SelectBox
              variant="primary"
              theme="light"
              size="large"
              options={filterOptions}
              defaultValue={selectedFilter}
              value={selectedFilter}
              onChange={handleFilterChange}
              className={styles.selectWidth}
              data-testid="emotion-filter-select"
            />

            <SearchBar
              variant="primary"
              theme="light"
              size="large"
              placeholder="검색어를 입력해 주세요."
              className={styles.searchWidth}
              onSearch={handleSearchWithPageReset}
              onClear={handleClearSearch}
              loading={isSearching}
            />
          </div>

          <Button
            variant="primary"
            theme="light"
            size="large"
            className={styles.buttonWidth}
            onClick={openDiaryModal}
            data-testid="diary-write-button"
          >
            일기쓰기
          </Button>
        </div>

        {/* 모바일 버전 */}
        <div className={styles.searchContentMobile}>
          <SearchBar
            variant="primary"
            theme="light"
            size="large"
            placeholder="검색어를 입력해 주세요."
            className={styles.searchBarMobile}
            onSearch={handleSearchWithPageReset}
            onClear={handleClearSearch}
            loading={isSearching}
          />
          <div className={styles.searchRightGroup}>
            <SelectBox
              variant="primary"
              theme="light"
              size="large"
              options={filterOptions}
              defaultValue={selectedFilter}
              value={selectedFilter}
              onChange={handleFilterChange}
              className={styles.selectWidthMobile}
              data-testid="emotion-filter-select-mobile"
            />
            <Button
              variant="primary"
              theme="light"
              size="large"
              className={styles.buttonWidthMobile}
              onClick={openDiaryModal}
              data-testid="diary-write-button-mobile"
            >
              일기쓰기
            </Button>
          </div>
        </div>
      </div>

      {/* 두 번째 gap: 1168 * 42 */}
      <div className={styles.gap2}></div>

      {/* Main 영역: 1168 * 936 */}
      <div className={styles.main}>
        <div className={styles.mainContent}>
          {filteredDiaries.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <p>
                {searchTerm ? 
                  `"${searchTerm}"에 대한 검색 결과가 없습니다.` : 
                  '작성된 일기가 없습니다. 새로운 일기를 작성해보세요!'
                }
              </p>
            </div>
          ) : (
            <div className={styles.cardGrid}>
              {getCurrentPageDiaries().map((diary) => {
                const emotionImages = getEmotionImages(diary.emotion);
                return (
                  <div 
                    key={diary.id} 
                    className={styles.styles_diaryCard}
                    onClick={handleCardClick(diary.id)}
                    data-testid={`diary-card-${diary.id}`}
                  >
                    <div className={styles.styles_cardImageWrapper}>
                      {isLoggedIn && (
                        <button
                          type="button"
                          className={styles.styles_closeButton}
                          aria-label="카드 닫기"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            deleteDiary(diary.id, diary.title);
                          }}
                          data-testid={`delete-button-${diary.id}`}
                        >
                          <Image
                            src="/icons/close_outline_light_s.svg"
                            alt="닫기"
                            width={20}
                            height={20}
                            className={styles.styles_closeIcon}
                          />
                        </button>
                      )}
                      <Image
                        src={emotionImages.medium}
                        alt={getEmotionDisplayText(diary.emotion)}
                        fill
                        sizes="(max-width: 1168px) 100vw, 1168px"
                        className={styles.styles_cardImage}
                      />
                    </div>
                    <div className={styles.styles_cardContent}>
                      <div className={styles.styles_cardHeader}>
                        <span 
                          className={`${styles.styles_emotionChip} typography-caption-01`}
                          style={{ color: getEmotionColor(diary.emotion) }}
                        >
                          {getEmotionDisplayText(diary.emotion)}
                        </span>
                        <span className={`${styles.styles_dateText} typography-caption-02-s`}>
                          {diary.createdAt}
                        </span>
                      </div>
                      <p className={`${styles.styles_cardBody} typography-body-02_s`}>
                        {truncateTitle(diary.title)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 세 번째 gap: 1168 * 40 */}
      <div className={styles.gap3}></div>

      {/* Pagination 영역: 1168 * 32 */}
      <div className={styles.pagination}>
        <div className={styles.paginationContent}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            variant="primary"
            theme="light"
            size="medium"
            className={styles.paginationWidth}
          />
        </div>
      </div>

      {/* 네 번째 gap: 1168 * 40 */}
      <div className={styles.gap4}></div>
    </div>
  );
};

export default Diaries;
