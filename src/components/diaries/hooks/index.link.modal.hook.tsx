'use client';

import { useModal } from '@/commons/providers/modal/modal.provider';
import DiariesNew from '@/components/diaries-new';

export const useDiaryModal = () => {
  const { openModal, closeModal } = useModal();

  const openDiaryModal = () => {
    openModal(<DiariesNew />);
  };

  return {
    openDiaryModal,
    closeModal,
  };
};
