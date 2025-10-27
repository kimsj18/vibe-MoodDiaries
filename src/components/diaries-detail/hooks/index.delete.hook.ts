import { useState, useCallback, useRef } from 'react';
import { EmotionType } from '@/commons/constants/enum';
import { URLS } from '@/commons/constants/url';
import { DiaryData } from './index.binding.hook';

/**
 * 삭제 Hook 반환 타입
 */
export interface UseDeleteHookReturn {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  deleteDiary: (diaryId: number) => void;
}

/**
 * 일기 삭제 기능을 위한 Hook
 * @param diaryId 삭제할 일기 ID
 * @returns 모달 상태 및 삭제 함수
 */
export const useDeleteHook = (diaryId: number, modalActions: {
  openModal: (content: React.ReactNode) => string;
  closeModal: (id?: string) => void;
}): UseDeleteHookReturn => {
  const modalIdRef = useRef<string | null>(null);

  /**
   * 모달 열기
   */
  const openModal = useCallback((content: React.ReactNode) => {
    const id = modalActions.openModal(content);
    modalIdRef.current = id;
  }, [modalActions]);

  /**
   * 모달 닫기
   */
  const closeModal = useCallback(() => {
    if (modalIdRef.current) {
      modalActions.closeModal(modalIdRef.current);
      modalIdRef.current = null;
    }
  }, [modalActions]);

  /**
   * 일기 삭제 처리
   * 로컬스토리지에서 해당 ID의 일기를 제거하고 /diaries로 이동
   */
  const deleteDiary = useCallback((diaryId: number) => {
    try {
      // 로컬스토리지에서 일기 데이터 가져오기
      const diariesJson = localStorage.getItem('diaries');
      
      if (!diariesJson) {
        throw new Error('일기 데이터를 찾을 수 없습니다.');
      }

      const diaries: DiaryData[] = JSON.parse(diariesJson);
      
      if (!Array.isArray(diaries)) {
        throw new Error('잘못된 일기 데이터 형식입니다.');
      }

      // 해당 ID의 일기 제거
      const filteredDiaries = diaries.filter(diary => diary.id !== diaryId);
      
      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(filteredDiaries));

      // 모달 닫기
      if (modalIdRef.current) {
        modalActions.closeModal(modalIdRef.current);
        modalIdRef.current = null;
      }

      // /diaries 페이지로 이동
      window.location.href = URLS.DIARIES.LIST;
    } catch (error) {
      console.error('일기 삭제 중 오류 발생:', error);
      alert('일기 삭제 중 오류가 발생했습니다.');
    }
  }, []);

  return {
    openModal,
    closeModal,
    deleteDiary,
  };
};

