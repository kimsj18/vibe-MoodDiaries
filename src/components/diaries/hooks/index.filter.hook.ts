import React, { useState, useMemo } from 'react';
import { EmotionType, getAllEmotionTypes, getEmotionDisplayText } from '@/commons/constants/enum';

// DiaryData 타입 정의 (기존 binding hook과 동일)
export type DiaryData = {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
};

// 필터 옵션 타입
export type FilterOption = 'all' | EmotionType;

// 필터 훅의 반환 타입
export interface UseDiaryFilterReturn {
  selectedFilter: FilterOption;
  filteredDiaries: DiaryData[];
  filterOptions: Array<{ value: FilterOption; label: string }>;
  handleFilterChange: (filter: string | number | (string | number)[]) => void;
  isFiltered: boolean;
}

/**
 * 일기 필터링 기능을 제공하는 훅
 * @param diaries - 필터링할 일기 데이터 배열
 * @returns 필터링 관련 상태와 함수들
 */
export const useDiaryFilter = (diaries: DiaryData[]): UseDiaryFilterReturn => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');

  // 필터 옵션 생성
  const filterOptions = useMemo(() => {
    const options = [
      { value: 'all' as FilterOption, label: '전체' }
    ];
    
    // 모든 emotion 타입에 대한 옵션 추가
    getAllEmotionTypes().forEach(emotionType => {
      options.push({
        value: emotionType as FilterOption,
        label: getEmotionDisplayText(emotionType)
      });
    });
    
    return options;
  }, []);

  // 필터링된 일기 데이터
  const filteredDiaries = useMemo(() => {
    if (selectedFilter === 'all') {
      return diaries;
    }
    
    return diaries.filter(diary => diary.emotion === selectedFilter);
  }, [diaries, selectedFilter]);

  // 필터 변경 핸들러
  const handleFilterChange = (filter: string | number | (string | number)[]) => {
    const filterValue = Array.isArray(filter) ? filter[0] : filter;
    setSelectedFilter(filterValue as FilterOption);
  };

  // 필터가 적용되었는지 확인
  const isFiltered = selectedFilter !== 'all';

  return {
    selectedFilter,
    filteredDiaries,
    filterOptions,
    handleFilterChange,
    isFiltered
  };
};
