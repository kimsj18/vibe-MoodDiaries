'use client';

import React from 'react';
import { SelectBox } from '@/commons/components/selectbox';
import { Button } from '@/commons/components/button';
import { PictureFilterType } from '@/commons/constants/enum';
import { useDogPictures } from './hooks/index.binding.hook';
import { useFilter } from './hooks/index.filter.hook';
import styles from './styles.module.css';

// 스플래시 스크린 컴포넌트
const SplashScreen: React.FC = () => (
  <div className={styles.splashScreen} data-testid="splash-screen">
    <div className={styles.splashLine} />
  </div>
);

const Pictures: React.FC = () => {
  const { 
    pictures, 
    isLoading, 
    isError, 
    error, 
    isFetchingNextPage,
    getItemRef 
  } = useDogPictures();

  const {
    selectedFilter,
    filterOptions,
    currentImageSize,
    handleFilterChange,
  } = useFilter();

  // 디버깅용 콘솔 출력
  console.log('Pictures 컴포넌트 - 현재 필터:', selectedFilter, '이미지 크기:', currentImageSize);
  console.log('필터 옵션들:', filterOptions);

  return (
    <div className={styles.container} data-testid="pictures-container">
      {/* Filter 영역 */}
      <div className={styles.filterContainer}>
        {/* 임시 테스트용 간단한 select */}
        <select
          value={selectedFilter as string}
          onChange={(e) => {
            console.log('HTML select onChange 호출됨:', e.target.value);
            handleFilterChange(e.target.value);
          }}
          className={styles.filterSelectBox}
          data-testid="filter-select-box"
          style={{ width: '120px', height: '48px' }}
        >
          {filterOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div data-testid="current-filter" style={{ display: 'none' }}>
          {filterOptions.find(option => option.value === selectedFilter)?.label}
        </div>
      </div>

      {/* Main 영역 - 사진 그리드 */}
      <div className={styles.mainContainer}>
        {/* 에러 상태 */}
        {isError && (
          <div className={styles.errorContainer} data-testid="error-message">
            <div className={styles.errorMessage}>
              사진을 불러오는데 실패했습니다. {error?.message}
            </div>
            <Button
              variant="primary"
              theme="light"
              size="medium"
              onClick={() => window.location.reload()}
              className={styles.retryButton}
              data-testid="retry-button"
            >
              다시 시도
            </Button>
          </div>
        )}

        {/* 로딩 상태 - 스플래시 스크린 */}
        {isLoading && (
          <div className={styles.pictureGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SplashScreen key={`splash-${index}`} />
            ))}
          </div>
        )}

        {/* 사진 그리드 */}
        {!isLoading && !isError && (
          <div 
            className={styles.pictureGrid} 
            data-testid="pictures-grid"
            data-filter={selectedFilter}
            style={{
              gridTemplateColumns: selectedFilter === 'vertical' 
                ? `repeat(1, ${currentImageSize.width}px)`
                : `repeat(auto-fit, minmax(${currentImageSize.width}px, 1fr))`,
              maxWidth: '100%',
              overflow: 'hidden',
              justifyContent: selectedFilter === 'vertical' ? 'center' : 'stretch'
            }}
          >
            {pictures.map((picture, index) => (
              <div 
                key={picture.id} 
                className={styles.pictureItem}
                data-testid="picture-item"
                ref={getItemRef(index)}
              >
                <div className={styles.pictureWrapper}>
                  <img
                    src={picture.src}
                    alt={picture.alt}
                    className={styles.pictureImage}
                  />
                </div>
              </div>
            ))}
            
            {/* 추가 로딩 중 스플래시 스크린 */}
            {isFetchingNextPage && 
              Array.from({ length: 6 }).map((_, index) => (
                <SplashScreen key={`next-splash-${index}`} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Pictures;