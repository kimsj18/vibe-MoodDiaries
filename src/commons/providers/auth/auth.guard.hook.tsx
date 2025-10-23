'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth.provider';
import { useModal } from '../modal/modal.provider';
import { URLS } from '@/commons/constants/url';
import Modal from '@/commons/components/modal';

// 테스트 환경 변수 확인
const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === 'test';

// 전역 변수 타입 선언
declare global {
  interface Window {
    __TEST_BYPASS__?: boolean;
  }
}

// 권한 검증 GUARD 훅
export const useAuthGuard = () => {
  const { checkAuthStatus } = useAuth();
  const { openModal, closeAllModals } = useModal();
  const router = useRouter();
  const modalShownRef = useRef<boolean>(false);

  // 로그인 상태를 확인하는 함수
  const checkLoginStatus = useCallback((): boolean => {
    // 테스트 환경에서 전역 변수가 설정된 경우
    if (isTestEnv && typeof window !== 'undefined') {
      // window.__TEST_BYPASS__가 명시적으로 true인 경우만 로그인 상태로 간주
      return window.__TEST_BYPASS__ === true;
    }

    // 실제 환경에서는 항상 인증 상태를 검사
    return checkAuthStatus();
  }, [checkAuthStatus]);

  // 로그인 모달을 표시하는 함수
  const showLoginModal = useCallback(() => {
    if (modalShownRef.current) {
      return; // 이미 모달이 표시된 경우 중복 표시 방지
    }

    modalShownRef.current = true;

    const modalContent = (
      <Modal
        variant="info"
        actions="dual"
        title="로그인이 필요합니다"
        message="이 기능을 사용하려면 로그인이 필요합니다. 로그인하시겠습니까?"
        confirmText="로그인하러가기"
        cancelText="취소"
        onConfirm={() => {
          // 모든 모달 닫기
          closeAllModals();
          // 로그인 페이지로 이동
          router.push(URLS.AUTH.LOGIN);
          // 모달 표시 상태 초기화
          modalShownRef.current = false;
        }}
        onCancel={() => {
          // 모든 모달 닫기
          closeAllModals();
          // 모달 표시 상태 초기화
          modalShownRef.current = false;
        }}
      />
    );

    openModal(modalContent);
  }, [closeAllModals, router, openModal]);

  // 권한 검증 함수
  const guardAuth = useCallback((): boolean => {
    const isAuthenticated = checkLoginStatus();
    
    if (!isAuthenticated) {
      showLoginModal();
      return false;
    }

    return true;
  }, [checkLoginStatus, showLoginModal]);

  // 권한 검증을 위한 액션 함수
  const guardAction = useCallback(
    <T extends (...args: unknown[]) => unknown>(
      action: T
    ): T => {
      return ((...args: Parameters<T>) => {
        const hasPermission = guardAuth();
        
        if (hasPermission) {
          return action(...args);
        }
        
        // 권한이 없는 경우 함수 실행하지 않음
        return undefined;
      }) as T;
    },
    [guardAuth]
  );

  // 모달 표시 상태 초기화
  const resetModalState = useCallback(() => {
    modalShownRef.current = false;
  }, []);

  return {
    guardAuth,
    guardAction,
    checkLoginStatus,
    resetModalState,
    isLoggedIn: checkLoginStatus(),
  };
};

export default useAuthGuard;
