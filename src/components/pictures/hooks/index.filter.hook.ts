/**
 * Pictures Filter Hook
 * 
 * 강아지 사진 필터 기능을 관리하는 커스텀 훅
 * - 필터 옵션 관리 (기본, 가로형, 세로형)
 * - 선택된 필터에 따른 이미지 크기 조정
 * - 필터 변경 핸들러
 */

import { useState, useMemo } from 'react';
import { 
  PictureFilterType, 
  getAllPictureFilterData, 
  getPictureFilterData 
} from '@/commons/constants/enum';

// 필터 옵션 인터페이스
export interface FilterOption {
  value: string;
  label: string;
}

// 이미지 크기 인터페이스
export interface ImageSize {
  width: number;
  height: number;
}

// Hook 반환 타입
export interface UseFilterReturn {
  selectedFilter: PictureFilterType;
  filterOptions: FilterOption[];
  currentImageSize: ImageSize;
  handleFilterChange: (value: string) => void;
}

/**
 * 강아지 사진 필터 기능을 관리하는 커스텀 훅
 * 
 * @returns {UseFilterReturn} 필터 관련 상태와 핸들러
 */
export const useFilter = (): UseFilterReturn => {
  // 선택된 필터 상태 (기본값: DEFAULT)
  const [selectedFilter, setSelectedFilter] = useState<PictureFilterType>(
    PictureFilterType.DEFAULT
  );

  // 필터 옵션 목록 생성
  const filterOptions: FilterOption[] = useMemo(() => {
    const allData = getAllPictureFilterData();
    console.log('getAllPictureFilterData 결과:', allData);
    const options = allData.map(filterData => ({
      value: filterData.type as string,
      label: filterData.displayText,
    }));
    console.log('생성된 filterOptions:', options);
    return options;
  }, []);

  // 현재 선택된 필터에 따른 이미지 크기 계산
  const currentImageSize: ImageSize = useMemo(() => {
    const filterData = getPictureFilterData(selectedFilter);
    console.log('이미지 크기 계산:', selectedFilter, filterData.imageSize);
    return filterData.imageSize;
  }, [selectedFilter]);

  // 필터 변경 핸들러
  const handleFilterChange = (value: string): void => {
    console.log('필터 변경:', value, '이전:', selectedFilter);
    setSelectedFilter(value as PictureFilterType);
  };

  return {
    selectedFilter,
    filterOptions,
    currentImageSize,
    handleFilterChange,
  };
};