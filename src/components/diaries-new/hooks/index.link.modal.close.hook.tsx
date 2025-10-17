import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

export const useModalClose = () => {
  const { openModal, closeModal, closeAllModals } = useModal();

  const handleClose = () => {
    // 등록취소 확인 모달을 2중 모달로 표시
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

    // 모달 ID를 저장하여 개별 제어 가능하도록 함
    return modalId;
  };

  const handleContinueWriting = () => {
    // 등록취소 모달(자식)만 닫기
    closeModal();
  };

  const handleCancelRegistration = () => {
    // 모든 모달 닫기 (등록취소 모달 + 일기쓰기 모달)
    closeAllModals();
  };

  return {
    handleClose,
    handleContinueWriting,
    handleCancelRegistration
  };
};
