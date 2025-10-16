"use client";

import { usePathname } from 'next/navigation';
import { UrlHelpers, UIVisibility } from '../../constants/url';

/**
 * 현재 경로에 따른 UI 영역 노출 여부를 관리하는 hook
 * url.ts의 ROUTE_METADATA를 기반으로 각 영역의 가시성을 제어
 */
export const useAreaVisibility = () => {
  const pathname = usePathname();

  /**
   * 현재 경로의 UI 가시성 설정을 가져옴
   * 정의되지 않은 경로의 경우 기본값(모든 영역 노출)을 반환
   */
  const getUIVisibility = (): UIVisibility => {
    const visibility = UrlHelpers.getUIVisibility(pathname);
    
    // 정의되지 않은 경로의 경우 기본값 반환
    if (!visibility) {
      return {
        header: {
          show: true,
          logo: true,
          darkModeToggle: false,
        },
        banner: true,
        navigation: true,
        footer: true,
      };
    }
    
    return visibility;
  };

  const uiVisibility = getUIVisibility();

  /**
   * Header 영역 노출 여부
   */
  const isHeaderVisible = uiVisibility.header.show;

  /**
   * Header 내 로고 노출 여부
   */
  const isLogoVisible = uiVisibility.header.logo;

  /**
   * Banner 영역 노출 여부
   */
  const isBannerVisible = uiVisibility.banner;

  /**
   * Navigation 영역 노출 여부
   */
  const isNavigationVisible = uiVisibility.navigation;

  /**
   * Footer 영역 노출 여부
   */
  const isFooterVisible = uiVisibility.footer;

  /**
   * 현재 경로 정보
   */
  const currentPath = pathname;

  return {
    isHeaderVisible,
    isLogoVisible,
    isBannerVisible,
    isNavigationVisible,
    isFooterVisible,
    currentPath,
    uiVisibility,
  };
};
