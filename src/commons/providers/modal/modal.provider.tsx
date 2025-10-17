'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

interface Modal {
  id: string;
  content: ReactNode;
  zIndex: number;
}

interface ModalContextType {
  modals: Modal[];
  openModal: (content: ReactNode) => string;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<Modal[]>([]);

  // Body 스크롤 제어
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modals.length]);

  const openModal = (content: ReactNode): string => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    const zIndex = 50 + modals.length * 10; // 각 모달마다 z-index 증가
    
    setModals(prev => [...prev, { id, content, zIndex }]);
    return id;
  };

  const closeModal = (id?: string) => {
    if (id) {
      // 특정 모달 닫기
      setModals(prev => prev.filter(modal => modal.id !== id));
    } else {
      // 가장 최근 모달 닫기
      setModals(prev => prev.slice(0, -1));
    }
  };

  const closeAllModals = () => {
    setModals([]);
  };

  const value = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {typeof window !== 'undefined' && 
        modals.map((modal, index) => 
          createPortal(
            <div 
              key={modal.id}
              className={styles.modalOverlay}
              style={{ zIndex: modal.zIndex }}
            >
              {/* Backdrop - 각 모달마다 개별 backdrop */}
              <div 
                className={styles.backdrop}
                onClick={() => closeModal(modal.id)}
              />
              
              {/* Modal Content */}
              <div className={styles.modalContent}>
                {modal.content}
              </div>
            </div>,
            document.body
          )
        )
      }
    </ModalContext.Provider>
  );
}
