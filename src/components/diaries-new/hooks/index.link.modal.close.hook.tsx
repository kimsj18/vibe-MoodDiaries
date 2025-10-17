import React from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

/**
 * 일기쓰기 모달의 닫기 기능을 관리하는 훅
 * 2중 모달 구조로 등록취소 확인 기능을 제공
 */
export const useModalClose = () => {
  const { openModal, closeModal, closeAllModals } = useModal();

  /**
   * 닫기 버튼 클릭 핸들러
   * 등록취소 확인 모달을 2중 모달로 표시
   */
  const handleClose = () => {
    const modalId = openModal(
      <div data-testid="cancel-confirmation-modal">
        <Modal
          variant="info"
          actions="dual"
          title="등록 취소"
          message="작성중인 내용이 사라집니다. 정말로 취소하시겠습니까?"
          confirmText="등록취소"
          cancelText="계속작성"
          onConfirm={handleCancelRegistration}
          onCancel={handleContinueWriting}
          confirmTestId="cancel-registration-button"
          cancelTestId="continue-writing-button"
        />
      </div>
    );

    return modalId;
  };

  /**
   * 계속작성 버튼 클릭 핸들러
   * 등록취소 모달(자식)만 닫기
   */
  const handleContinueWriting = () => {
    closeModal();
  };

  /**
   * 등록취소 버튼 클릭 핸들러
   * 모든 모달 닫기 (등록취소 모달 + 일기쓰기 모달)
   */
  const handleCancelRegistration = () => {
    closeAllModals();
  };

  return {
    handleClose,
    handleContinueWriting,
    handleCancelRegistration,
  };
};
