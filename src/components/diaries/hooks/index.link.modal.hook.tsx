'use client';

import { useModal } from '@/commons/providers/modal/modal.provider';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import DiariesNew from '@/components/diaries-new';

export const useDiaryModal = () => {
  const { openModal, closeModal } = useModal();
  const { guardAction } = useAuthGuard();

  // 권한 검사를 포함한 일기쓰기 모달 열기 함수
  const openDiaryModal = guardAction(() => {
    openModal(<DiariesNew />);
  });

  return {
    openDiaryModal,
    closeModal,
  };
};
