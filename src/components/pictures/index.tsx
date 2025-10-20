'use client';

import React, { useState } from 'react';
import { SelectBox, SelectOption } from '@/commons/components/selectbox';
import { useDogPictures } from './hooks/index.binding.hook';
import styles from './styles.module.css';

// 필터 옵션
const filterOptions: SelectOption[] = [
  { value: 'all', label: '전체' },
  { value: 'recent', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'name', label: '이름순' },
];

// 스플래시 스크린 컴포넌트
const SplashScreen: React.FC = () => (
  <div className={styles.splashScreen} data-testid="splash-screen">
    <div className={styles.splashLine} />
  </div>
);

const Pictures: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | number>('all');
  const { 
    pictures, 
    isLoading, 
    isError, 
    error, 
    isFetchingNextPage,
    getItemRef 
  } = useDogPictures();

  const handleFilterChange = (value: string | number | (string | number)[]) => {
    setSelectedFilter(value as string | number);
  };

  return (
    <div className={styles.container} data-testid="pictures-container">
      {/* Filter 영역 */}
      <div className={styles.filterContainer}>
        <SelectBox
          variant="primary"
          theme="light"
          size="medium"
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          className={styles.filterSelectBox}
        />
      </div>

      {/* Main 영역 - 사진 그리드 */}
      <div className={styles.mainContainer}>
        {/* 에러 상태 */}
        {isError && (
          <div className={styles.errorMessage} data-testid="error-message">
            사진을 불러오는데 실패했습니다. {error?.message}
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
          <div className={styles.pictureGrid} data-testid="pictures-grid">
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