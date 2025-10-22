import { useAuth } from '@/commons/providers/auth/auth.provider';
import { useRouter } from 'next/navigation';
import { URLS } from '@/commons/constants/url';

/**
 * 인증 상태 관리 훅
 * 로그인 상태에 따른 UI 제어 및 인증 관련 기능을 제공
 */
export const useAuthStatus = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  /**
   * 로그인 페이지로 이동하는 함수
   * 비로그인 상태에서 로그인 버튼 클릭 시 호출
   */
  const handleLoginClick = () => {
    router.push(URLS.AUTH.LOGIN);
  };

  /**
   * 로그아웃 처리 함수
   * 로그인 상태에서 로그아웃 버튼 클릭 시 호출
   */
  const handleLogoutClick = () => {
    logout();
  };

  /**
   * 유저 이름 반환 함수
   * 사용자 정보에서 이름을 추출하여 반환
   * @returns 사용자 이름 또는 기본값
   */
  const getUserName = () => {
    if (!user) return '';
    return user.name || user.email || '사용자';
  };

  return {
    isLoggedIn,
    user,
    handleLoginClick,
    handleLogoutClick,
    getUserName,
  };
};
