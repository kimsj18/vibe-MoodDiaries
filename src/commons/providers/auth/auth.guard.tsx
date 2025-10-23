'use client';

import React, { useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './auth.provider';
import { useModal } from '../modal/modal.provider';
import Modal from '@/commons/components/modal';
import { UrlHelpers, URLS } from '@/commons/constants/url';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, checkAuthStatus } = useAuth();
  const { openModal, closeAllModals } = useModal();

  // 환경변수 확인 - 클라이언트 사이드에서 안전하게 처리
  const isTestEnv = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return process.env.NEXT_PUBLIC_TEST_ENV === 'test';
  }, []);

  // 현재 경로의 접근 권한 확인
  const getAccessLevel = useCallback((): string | null => {
    return UrlHelpers.getAccessLevel(pathname);
  }, [pathname]);

  // 권한 검증이 필요한지 확인
  const needsAuth = useCallback((): boolean => {
    const accessLevel = getAccessLevel();
    return accessLevel === '회원전용';
  }, [getAccessLevel]);

  // 로그인 모달 표시
  const showLoginModal = useCallback(() => {
    if (hasShownModal) return;
    
    setHasShownModal(true);
    
    openModal(
      <Modal
        variant="info"
        actions="single"
        title="로그인이 필요합니다"
        message="이 페이지에 접근하려면 로그인해주세요."
        confirmText="확인"
        onConfirm={() => {
          closeAllModals();
          router.push(URLS.AUTH.LOGIN);
        }}
      />
    );
  }, [hasShownModal, openModal, closeAllModals, router]);

  // 인증 상태 초기화 및 검증
  useEffect(() => {
    const initializeAuth = async () => {
      // 테스트 환경에서는 즉시 초기화
      if (isTestEnv) {
        setIsInitialized(true);
        return;
      }

      // AuthProvider 초기화 대기 - 더 안전한 방식
      let retryCount = 0;
      const maxRetries = 50; // 500ms 최대 대기
      
      const waitForAuthInit = () => {
        return new Promise<void>((resolve) => {
          const checkAuth = () => {
            try {
              const hasToken = checkAuthStatus();
              // AuthProvider가 초기화되었는지 확인
              if (typeof hasToken === 'boolean' || retryCount >= maxRetries) {
                resolve();
              } else {
                retryCount++;
                setTimeout(checkAuth, 10);
              }
            } catch (error) {
              // 에러가 발생하면 재시도
              retryCount++;
              if (retryCount < maxRetries) {
                setTimeout(checkAuth, 10);
              } else {
                resolve();
              }
            }
          };
          checkAuth();
        });
      };

      await waitForAuthInit();
      
      // 인증 상태 확인
      const hasToken = checkAuthStatus();
      
      // 실제 환경에서 권한 검증
      if (needsAuth() && !hasToken) {
        showLoginModal();
      }
      
      setIsInitialized(true);
    };

    initializeAuth();
  }, [pathname, isTestEnv, checkAuthStatus, needsAuth, showLoginModal]);

  // 경로 변경 시 모달 상태 초기화
  useEffect(() => {
    setHasShownModal(false);
  }, [pathname]);

  // 로그인 상태 변경 감지
  useEffect(() => {
    if (!isInitialized) return;
    
    // 테스트 환경에서는 권한 검증 생략
    if (isTestEnv) return;
    
    // 권한이 필요한 페이지에서 로그아웃된 경우
    if (needsAuth() && !isLoggedIn && !hasShownModal) {
      showLoginModal();
    }
  }, [isLoggedIn, isInitialized, pathname, isTestEnv, needsAuth, hasShownModal, showLoginModal]);

  // 렌더링 조건을 useMemo로 최적화
  const shouldShowChildren = useMemo(() => {
    // 초기화되지 않았으면 빈 화면
    if (!isInitialized) return false;
    
    // 테스트 환경에서는 항상 children 표시
    if (isTestEnv) return true;
    
    // 실제 환경에서 권한 검증
    if (needsAuth() && !isLoggedIn) return false;
    
    return true;
  }, [isInitialized, isTestEnv, needsAuth, isLoggedIn]);

  // 초기화되지 않았거나 권한이 없는 경우 빈 화면 표시
  if (!shouldShowChildren) {
    return <div style={{ minHeight: '100vh' }} />;
  }

  return <>{children}</>;
}
