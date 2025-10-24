import { useState, useCallback } from 'react';
import { DiaryData } from './index.binding.hook';

// 검색 훅의 반환 타입
export interface UseDiarySearchReturn {
  searchTerm: string;
  filteredDiaries: DiaryData[];
  isSearching: boolean;
  handleSearch: (term: string) => void;
  handleClearSearch: () => void;
}

/**
 * 일기 검색 기능을 제공하는 훅
 * 로컬스토리지에서 일기 데이터를 가져와서 제목 기준으로 검색 기능을 제공합니다.
 */
export const useDiarySearch = (allDiaries: DiaryData[]): UseDiarySearchReturn => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 검색어에 따라 일기를 필터링하는 함수
  const filterDiaries = useCallback((diaries: DiaryData[], term: string): DiaryData[] => {
    if (!term.trim()) {
      return diaries;
    }

    return diaries.filter(diary => 
      diary.title.toLowerCase().includes(term.toLowerCase())
    );
  }, []);

  // 검색 실행 함수
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // 검색 초기화 함수
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // 필터링된 일기 목록 계산
  const filteredDiaries = filterDiaries(allDiaries, searchTerm);

  return {
    searchTerm,
    filteredDiaries,
    isSearching,
    handleSearch,
    handleClearSearch,
  };
};
