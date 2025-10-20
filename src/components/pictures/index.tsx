'use client';

import React, { useState } from 'react';
import { SelectBox, SelectOption } from '@/commons/components/selectbox';
import styles from './styles.module.css';

// Mock 데이터 - 강아지 사진 정보
const mockPictures = [
  { id: 1, src: '/images/dog-1.jpg', alt: '강아지 사진 1' },
  { id: 2, src: '/images/dog-1.jpg', alt: '강아지 사진 2' },
  { id: 3, src: '/images/dog-1.jpg', alt: '강아지 사진 3' },
  { id: 4, src: '/images/dog-1.jpg', alt: '강아지 사진 4' },
  { id: 5, src: '/images/dog-1.jpg', alt: '강아지 사진 5' },
  { id: 6, src: '/images/dog-1.jpg', alt: '강아지 사진 6' },
  { id: 7, src: '/images/dog-1.jpg', alt: '강아지 사진 7' },
  { id: 8, src: '/images/dog-1.jpg', alt: '강아지 사진 8' },
  { id: 9, src: '/images/dog-1.jpg', alt: '강아지 사진 9' },
  { id: 10, src: '/images/dog-1.jpg', alt: '강아지 사진 10' },
  { id: 11, src: '/images/dog-1.jpg', alt: '강아지 사진 11' },
  { id: 12, src: '/images/dog-1.jpg', alt: '강아지 사진 12' },
];

// 필터 옵션
const filterOptions: SelectOption[] = [
  { value: 'all', label: '전체' },
  { value: 'recent', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'name', label: '이름순' },
];

const Pictures: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | number>('all');

  const handleFilterChange = (value: string | number | (string | number)[]) => {
    setSelectedFilter(value as string | number);
  };

  return (
    <div className={styles.container}>
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
        <div className={styles.pictureGrid}>
          {mockPictures.map((picture) => (
            <div key={picture.id} className={styles.pictureItem}>
              <div className={styles.pictureWrapper}>
                <img
                  src={picture.src}
                  alt={picture.alt}
                  className={styles.pictureImage}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pictures;