'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { URLS } from '@/commons/constants/url';

// 인증 컨텍스트 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (userData: any, accessToken: string) => void;
  logout: () => void;
  checkAuthStatus: () => boolean;
  getUserInfo: () => any | null;
}

// 인증 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 인증 프로바이더 컴포넌트
interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  // 로그인 상태 검증 함수
  const checkAuthStatus = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const accessToken = localStorage.getItem('accessToken');
    const hasToken = !!accessToken;
    
    setIsLoggedIn(hasToken);
    return hasToken;
  };

  // 로그인 유저 정보 조회 함수
  const getUserInfo = (): any | null => {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        return parsedUser;
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
        return null;
      }
    }
    return null;
  };

  // 로그인 함수
  const login = (userData: any, accessToken: string): void => {
    if (typeof window === 'undefined') return;
    
    // 로컬스토리지에 사용자 정보와 토큰 저장
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
    
    // 상태 업데이트
    setUser(userData);
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const logout = (): void => {
    if (typeof window === 'undefined') return;
    
    // 로컬스토리지에서 토큰과 사용자 정보 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    // 상태 초기화
    setUser(null);
    setIsLoggedIn(false);
    
    // 로그인 페이지로 이동
    router.push(URLS.AUTH.LOGIN);
  };

  // 컴포넌트 마운트 시 초기 인증 상태 확인
  useEffect(() => {
    const initializeAuth = () => {
      const hasToken = checkAuthStatus();
      if (hasToken) {
        getUserInfo();
      }
    };

    initializeAuth();
  }, []);

  // 로컬스토리지 변경 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'user') {
        const hasToken = checkAuthStatus();
        if (hasToken) {
          getUserInfo();
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    };

    // 다른 탭에서의 로컬스토리지 변경 감지
    window.addEventListener('storage', handleStorageChange);

    // 현재 탭에서의 로컬스토리지 변경 감지를 위한 커스텀 이벤트
    const handleCustomStorageChange = () => {
      const hasToken = checkAuthStatus();
      if (hasToken) {
        getUserInfo();
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    window.addEventListener('authChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleCustomStorageChange);
    };
  }, []);

  // 로그인/로그아웃 시 커스텀 이벤트 발생
  const loginWithEvent = (userData: any, accessToken: string): void => {
    login(userData, accessToken);
    window.dispatchEvent(new Event('authChange'));
  };

  const logoutWithEvent = (): void => {
    logout();
    window.dispatchEvent(new Event('authChange'));
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    login: loginWithEvent,
    logout: logoutWithEvent,
    checkAuthStatus,
    getUserInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 인증 컨텍스트 사용을 위한 커스텀 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};
