'use client';

import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import Modal from '@/commons/components/modal';
import type { DiaryData } from './index.binding.hook';

/**
 * 일기 삭제 기능을 관리하는 훅
 * - 권한 검사 (로그인 상태)
 * - 삭제 확인 모달
 * - 로컬스토리지에서 일기 삭제
 */
export const useDiaryDelete = () => {
  const { openModal, closeModal, closeAllModals } = useModal();
  const { guardAction } = useAuthGuard();

  /**
   * 로컬스토리지에서 특정 일기를 삭제하는 함수
   * @param diaryId 삭제할 일기 ID
   */
  const deleteDiaryFromStorage = useCallback((diaryId: number) => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedDiaries = localStorage.getItem('diaries');
      
      if (!storedDiaries) {
        return;
      }

      const diaries: DiaryData[] = JSON.parse(storedDiaries);
      
      // 해당 ID의 일기를 제거
      const filteredDiaries = diaries.filter(diary => diary.id !== diaryId);
      
      // 로컬스토리지 업데이트
      localStorage.setItem('diaries', JSON.stringify(filteredDiaries));
    } catch (error) {
      console.error('일기 삭제 중 오류 발생:', error);
    }
  }, []);

  /**
   * 삭제 확인 버튼 클릭 핸들러
   * - 로컬스토리지에서 일기 삭제
   * - 페이지 새로고침
   */
  const handleDeleteConfirm = useCallback((diaryId: number) => {
    deleteDiaryFromStorage(diaryId);
    
    // 모든 모달 닫기
    closeAllModals();
    
    // 페이지 새로고침
    window.location.reload();
  }, [deleteDiaryFromStorage, closeAllModals]);

  /**
   * 삭제 취소 버튼 클릭 핸들러
   * 모달만 닫기
   */
  const handleDeleteCancel = useCallback(() => {
    closeModal();
  }, [closeModal]);

  /**
   * 권한 검증을 포함한 삭제 버튼 클릭 핸들러
   * @param diaryId 삭제할 일기 ID
   * @param diaryTitle 삭제할 일기 제목
   */
  const handleDeleteClick = useCallback((diaryId: number, diaryTitle: string) => {
    // 권한 검사를 포함한 액션
    const action = () => {
      const modalContent = (
        <div data-testid="diary-delete-modal">
          <Modal
            variant="danger"
            actions="dual"
            title="일기 삭제"
            message="일기를 삭제 하시겠어요?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={() => handleDeleteConfirm(diaryId)}
            onCancel={handleDeleteCancel}
            confirmTestId="diary-delete-confirm-button"
            cancelTestId="diary-delete-cancel-button"
          />
        </div>
      );

      openModal(modalContent);
    };

    guardAction(action)();
  }, [guardAction, openModal, handleDeleteConfirm, handleDeleteCancel]);

  return {
    handleDeleteClick,
    deleteDiaryFromStorage,
  };
};

